import { useState } from 'react';

function randId() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const b = new Uint8Array(8); crypto.getRandomValues(b);
    return Array.from(b).map(x=>x.toString(16).padStart(2,'0')).join('');
  }
  return Math.random().toString(36).slice(2);
}
function randSeed(){return Math.random().toString(36).slice(2)+'-'+Date.now().toString(36);}

export default function TreasureDrop(){
  const [rows,setRows]=useState(12);
  const [result,setResult]=useState(null);
  const [status,setStatus]=useState('');

  async function play(){
    setStatus('Committing…');setResult(null);
    const roundId=randId(), clientSeed=randSeed();

    const c=await fetch('/api/plinko/commit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({roundId,clientSeed,rows})}).then(r=>r.json());
    if(!c.ok){setStatus('Commit failed');return;}

    setStatus('Revealing…');
    const r=await fetch('/api/plinko/reveal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({roundId})}).then(r=>r.json());
    if(!r.ok){setStatus('Reveal failed: '+r.error);return;}
    setStatus('');setResult(r);
  }

  return(
    <div className="min-h-screen bg-dungeon text-raidText">
      <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/70">
        <main className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="font-pixel text-raidLime text-2xl mb-4">TREASURE DROP</h1>
          <p className="text-raidText/70 mb-4">Provably-fair Plinko built on the Blockchain Raiders engine.</p>

          <button onClick={play} className="btn-pixel bg-raidGold text-black font-pixel px-6 py-3 w-fit">
            Drop the Coin
          </button>

          {status && <div className="mt-3 text-raidMagenta">{status}</div>}

          {result && (
            <div className="mt-6 p-4 bg-black/40 rounded card-border">
              <div className="font-pixel text-raidGold">Path: {result.outcome.path.join(' ')}</div>
              <div className="font-pixel">Rights: {result.outcome.rightCount} → Mult x{result.outcome.multiplier}</div>
              <div className="font-pixel text-raidLime">Winnings: {result.outcome.winnings.toFixed(2)} credits</div>

              <div className="mt-3 text-xs font-mono text-raidText/70 break-all">
                <div>serverSeedHash: {result.reveal.serverSeedHash}</div>
                <div>serverSeed: {result.reveal.serverSeed}</div>
                <div>clientSeed: {result.reveal.clientSeed}</div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
