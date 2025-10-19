import { useState } from 'react';

export default function JoinRaidlist(){
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const submit = async (e)=>{
    e.preventDefault();
    setErr('');
    if (!emailOk) { setErr('Enter a valid email'); return; }
    setLoading(true);
    try {
      const r = await fetch('/api/raidlist', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, wallet, raid_time: '' }), // honeypot stays empty
      });
      const j = await r.json().catch(()=>({}));
      if (!r.ok || j.ok === false) throw new Error(j.error || `Join failed (HTTP ${r.status})`);
      setOk(true);
    } catch (e) {
      setErr(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (ok) return <div className="font-pixel text-raidLime text-center" role="status">YOU'RE IN. ⚔️ SEE YOU AT DAWN.</div>;

  return (
    <form onSubmit={submit} className="w-full max-w-xl mx-auto grid gap-3" noValidate>
      {/* Honeypot (hidden) */}
      <label className="visually-hidden" htmlFor="raid_time">Leave this field empty</label>
      <input id="raid_time" name="raid_time" tabIndex={-1} autoComplete="off" className="hidden" />

      <input
        className="input-pixel rounded px-4 py-3 font-ui"
        placeholder="Email"
        type="email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        aria-invalid={!emailOk && email.length>0}
        aria-describedby="raidlist-help"
      />
      <input
        className="input-pixel rounded px-4 py-3 font-ui"
        placeholder="Wallet (optional)"
        value={wallet}
        onChange={e=>setWallet(e.target.value)}
      />
      <button
        className="btn-pixel bg-raidGold text-black font-pixel text-lg px-6 py-3 uppercase rounded"
        aria-busy={loading}
      >
        {loading ? 'Joining…' : 'Join the Raidlist'}
      </button>
      {err ? (
        <p className="text-raidDanger text-sm text-center" role="alert">{err}</p>
      ) : (
        <p id="raidlist-help" className="text-center text-raidText/70 text-sm">Secured via Supabase. No spam.</p>
      )}
    </form>
  );
}
