// pages/api/duel/commit.js
import crypto from 'crypto';
import roundStore from '@/lib/roundStore';
import { hashSeed } from '@/lib/fair';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { roundId, clientSeed } = req.body || {};
  if (!roundId || !clientSeed) {
    return res.status(400).json({ ok: false, error: 'roundId and clientSeed required' });
  }

  // Secure server seed (Node)
  const serverSeed = crypto.randomBytes(32).toString('hex');
  const serverSeedHash = hashSeed(serverSeed);

  // Save to shared store with a short expiry (e.g., 2 minutes)
  roundStore.set(roundId, {
    serverSeed,
    serverSeedHash,
    clientSeed,
    createdAt: Date.now(),
    expiresAt: Date.now() + 2 * 60 * 1000
  });

  return res.status(200).json({ ok: true, serverSeedHash });
}
