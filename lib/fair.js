// lib/fair.js
import crypto from 'crypto';

export function hashSeed(seed) {
  return crypto.createHash('sha256').update(seed, 'utf8').digest('hex');
}

// Deterministic fair coin from serverSeed + clientSeed + nonce
export function fairFlip(serverSeed, clientSeed, nonce = '0') {
  const h = crypto.createHmac('sha256', serverSeed)
                  .update(`${clientSeed}:${nonce}`)
                  .digest('hex');
  const n = parseInt(h.slice(0, 2), 16); // 0..255
  return n < 128 ? 'HEADS' : 'TAILS';
}

export function fairPlinko(serverSeed, clientSeed, rows = 12) {
  const outcomes = [];
  const hmac = crypto.createHmac('sha256', serverSeed)
                     .update(`${clientSeed}:${rows}`)
                     .digest('hex');

  // convert every 2 hex chars into byte (0–255)
  for (let i = 0; i < rows; i++) {
    const byte = parseInt(hmac.slice(i * 2, i * 2 + 2), 16);
    outcomes.push(byte < 128 ? 'L' : 'R');
  }

  const rightCount = outcomes.filter(o => o === 'R').length;
  return { path: outcomes, rightCount };
}

// payout table (can tune)
export const PLINKO_PAYOUTS = {
  12: [0.2, 0.5, 1, 2, 5, 10, 2, 1, 0.5, 0.2],
};

