import roundStore from '@/lib/roundStore';
import { fairPlinko, PLINKO_PAYOUTS } from '@/lib/fair';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { roundId, bet = 1 } = req.body;
  const r = roundStore.get(roundId);
  if (!r || Date.now() > r.expiresAt) {
    roundStore.delete(roundId);
    return res.status(404).json({ ok:false, error:'round not found/expired' });
  }

  const { path, rightCount } = fairPlinko(r.serverSeed, r.clientSeed, r.rows || 12);
  const payoutTable = PLINKO_PAYOUTS[12];
  const index = Math.min(rightCount, payoutTable.length - 1);
  const multiplier = payoutTable[index];
  const winnings = bet * multiplier;

  roundStore.delete(roundId);

  return res.status(200).json({
    ok:true,
    outcome:{ path, rightCount, multiplier, winnings },
    reveal:{ serverSeed:r.serverSeed, clientSeed:r.clientSeed, serverSeedHash:r.serverSeedHash },
  });
}
