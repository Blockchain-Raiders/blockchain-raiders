// pages/duel.js
import { useState } from 'react';

function randomClientSeed() {
  return Math.random().toString(36).slice(2) + '-' + Date.now().toString(36);
}
function randomId() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const b = new Uint8Array(8); crypto.getRandomValues(b);
    return Array.from(b).map(x=>x.toString(16).padStart(2,'0')).join('');
  }
  return Math.random().toString(36).slice(2);
}

export default function RaidDuels() {
  const [pick, setPick] = useState('HEADS');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState(null);

  async function start() {
    setStatus('Committing…'); setResult(null);

    const roundId = randomId();
    const clientSeed = randomClientSeed();

    const c = await fetch('/api/duel/commit', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ roundId, clientSeed })
    }).then(r=>r.json());
    if (!c.ok) { setStatus('Commit failed: ' + c.error); return; }

    setStatus('Revealing…');
    const r = await fetch('/api/duel/reveal', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ roundId, clientPick: pick })
    }).then(r=>r.json());
    if (!r.ok) { setStatus('Reveal failed: ' + r.error); return; }

    setStatus(''); setResult(r);
  }

  return (
    <div className="min-h-screen bg-dungeon text-raidText">
      <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/70">
        <main className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="font-pixel text-raidLime text-2xl mb-4">RAID DUELS</h1>
          <p className="text-raidText/80 mb-6">Provably-fair coinflip (commit → reveal).</p>

          <div className="flex gap-3 mb-4">
            {['HEADS','TAILS'].map(side=>(
              <button key={side} onClick={()=>setPick(side)}
                className={`px-4 py-3 rounded btn-pixel font-pixel ${pick===side?'bg-raidGold text-black':'bg-transparent text-raidGold'}`}>
                {side}
              </button>
            ))}
          </div>

          <button onClick={start} className="btn-pixel bg-raidLime text-black font-pixel px-6 py-3 w-fit">
            Flip the Chain
          </button>

          {status && <div className="mt-4 text-raidMagenta font-ui">{status}</div>}

          {result && (
            <div className="mt-6 p-4 rounded card-border bg-black/40">
              <div className="font-pixel">
                Outcome: <span className="text-raidGold">{result.outcome}</span> — {result.win ? 'YOU WIN' : 'you lose'}
              </div>
              <div className="mt-3 text-xs font-mono text-raidText/70 break-all">
                <div>serverSeedHash: {result.reveal.serverSeedHash}</div>
                <div>serverSeed: {result.reveal.serverSeed}</div>
                <div>clientSeed: {result.reveal.clientSeed}</div>
              </div>
              <p className="mt-2 text-sm text-raidText/70">
                Verify by recomputing HMAC(serverSeed, clientSeed) → first byte &lt; 128 = HEADS.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
