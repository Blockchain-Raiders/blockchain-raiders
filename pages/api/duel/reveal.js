// pages/api/duel/reveal.js
import roundStore from '@/lib/roundStore';
import { fairFlip } from '@/lib/fair';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { roundId, clientPick } = req.body || {};
  const r = roundStore.get(roundId);
  if (!r) return res.status(404).json({ ok: false, error: 'round not found/expired' });
  if (Date.now() > r.expiresAt) {
    roundStore.delete(roundId);
    return res.status(404).json({ ok: false, error: 'round not found/expired' });
  }

  const outcome = fairFlip(r.serverSeed, r.clientSeed, '0');
  const win = clientPick === outcome;

  // Prevent replay
  roundStore.delete(roundId);

  return res.status(200).json({
    ok: true,
    outcome,
    win,
    reveal: {
      serverSeed: r.serverSeed,
      clientSeed: r.clientSeed,
      serverSeedHash: r.serverSeedHash
    }
  });
}
