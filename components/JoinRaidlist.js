import { useState } from 'react';

export default function JoinRaidlist() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = emailOk && pw.length >= 6;

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!canSubmit) {
      setErr('Enter a valid email and a password (6+ chars).');
      return;
    }
    setLoading(true);
    try {
      // simulate success for now
      await new Promise(res => setTimeout(res, 600));
      setOk(true);
    } catch (e) {
      setErr(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (ok) {
    return (
      <div className="w-full max-w-sm mx-auto text-center">
        <div className="font-pixel text-raidGold text-lg">WELCOME BACK, RAIDER ⚔️</div>
        <p className="text-raidText/70 text-sm mt-2">You’re logged in.</p>
        <SocialLinks className="mt-4" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={onSubmit} className="grid gap-3" noValidate>
        <input
          className="input-pixel rounded px-4 py-3 font-ui"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!emailOk && email.length > 0}
        />
        <input
          className="input-pixel rounded px-4 py-3 font-ui"
          placeholder="Password"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          aria-invalid={pw.length > 0 && pw.length < 6}
        />

        <button
          className={`btn-pixel font-pixel text-lg px-6 py-3 uppercase rounded ${
            canSubmit ? 'bg-raidGold text-black hover:scale-105' : 'bg-raidText/30 text-raidText'
          } transition-transform`}
          disabled={!canSubmit || loading}
          aria-busy={loading}
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>

        {err ? (
          <p className="text-raidDanger text-sm text-center mt-1" role="alert">{err}</p>
        ) : (
          <p className="text-center text-raidText/70 text-xs mt-1">
            Use your campaign account to enter the hub.
          </p>
        )}
      </form>

      <SocialLinks className="mt-5" />
    </div>
  );
}

/** Discord + Telegram clickable icons */
function SocialLinks({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      <a
        href="https://discord.gg/3xUCP2nH"
        target="_blank"
        rel="noreferrer"
        aria-label="Join our Discord"
        className="group"
      >
        <DiscordIcon className="w-9 h-9 text-[#5865F2] group-hover:text-raidGold drop-shadow-[0_0_10px_rgba(255,140,40,0.6)] transition-all" />
      </a>
      <a
        href="https://t.me/+2XQ3CRHbRGc4YmY0"
        target="_blank"
        rel="noreferrer"
        aria-label="Join our Telegram"
        className="group"
      >
        <TelegramIcon className="w-9 h-9 text-[#229ED9] group-hover:text-raidGold drop-shadow-[0_0_10px_rgba(255,140,40,0.6)] transition-all" />
      </a>
    </div>
  );
}

/* High-fidelity Discord SVG */
function DiscordIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor" role="img">
      <path d="M216 72a199 199 0 0 0-47.8-15.6l-2.3 4.5a171 171 0 0 1 22.7 7.7 83.2 83.2 0 0 0-92.7 0 171 171 0 0 1 22.7-7.7l-2.3-4.5A199 199 0 0 0 40 72c-22.1 33.3-28.1 66.3-25.9 98.9a198.8 198.8 0 0 0 62 27.1l4.4-15.1a129.9 129.9 0 0 1-19.9-9.7c1.6-1.2 3.3-2.4 4.9-3.7 37.2 16.9 77.3 16.9 114.5 0 1.6 1.3 3.3 2.5 4.9 3.7a129.9 129.9 0 0 1-19.9 9.7l4.4 15.1a198.8 198.8 0 0 0 62-27.1C244.1 138.3 238.1 105.3 216 72zM105 144a13 13 0 1 1 0-26 13 13 0 0 1 0 26zm46 0a13 13 0 1 1 0-26 13 13 0 0 1 0 26z"/>
    </svg>
  );
}

/* Clean Telegram SVG */
function TelegramIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor" role="img">
      <circle cx="128" cy="128" r="128" fill="currentColor" opacity=".1"/>
      <path fill="currentColor" d="M186.6 79.1 165 176.8c-1.5 6.7-5.5 8.3-11.2 5.1l-31-22.9-15 14.4c-1.7 1.7-3.2 3.2-6.5 3.2l2.3-33.5 61-55.2c2.6-2.3-.6-3.6-4-1.3l-75.4 47.4-32.5-10.2c-7-2.2-7.1-7 1.5-10.3l127.2-49.1c5.8-2.1 10.9 1.3 9 9.4z"/>
    </svg>
  );
}
