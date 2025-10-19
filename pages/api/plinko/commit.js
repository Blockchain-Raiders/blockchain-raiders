import crypto from 'crypto';
import roundStore from '@/lib/roundStore';
import { hashSeed } from '@/lib/fair';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { roundId, clientSeed, rows } = req.body;
  if (!roundId || !clientSeed) return res.status(400).json({ ok:false, error:'missing fields' });

  const serverSeed = crypto.randomBytes(32).toString('hex');
  const serverSeedHash = hashSeed(serverSeed);

  roundStore.set(roundId, { serverSeed, serverSeedHash, clientSeed, rows, createdAt: Date.now(), expiresAt: Date.now()+120000 });
  return res.status(200).json({ ok:true, serverSeedHash });
}
