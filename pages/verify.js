import { useState, useMemo } from 'react';
import Head from 'next/head';
import Topbar from '@/components/Topbar';

/* ---------- WebCrypto helpers ---------- */
async function sha256Hex(message) {
  const enc = new TextEncoder();
  const data = enc.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return buf2hex(hashBuffer);
}
async function hmacSha256Hex(keyStr, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(keyStr),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return buf2hex(sig);
}
function buf2hex(buffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
function copyToClipboard(text) {
  try { navigator.clipboard?.writeText(text); } catch {}
}

/* ---------- Pixel/Tile helpers ---------- */
function PixelCard({ title = '', subtitle = '', children, badge = '', border = 'rgba(236,72,153,0.45)', aura = 'rgba(236,72,153,0.25)', underline = 'rgba(236,72,153,0.8)', cornerColor='rgba(236,72,153,0.6)' }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border bg-transparent text-center"
      style={{
        borderColor: border,
        boxShadow: `0 0 0 1px ${border.replace('0.45','0.30')}, 0 0 40px 12px ${border.replace('0.45','0.18')}`,
      }}
    >
      {badge && (
        <div className="absolute left-3 top-3 z-10 rounded px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-raidMagenta bg-black/50 border border-raidMagenta/40">
          {badge}
        </div>
      )}
      <div className="pointer-events-none absolute inset-0">
        {['left-0 top-0','right-0 top-0','left-0 bottom-0','right-0 bottom-0'].map((pos)=>(
          <div key={pos} className={`absolute ${pos} h-2 w-2`} style={{ background: cornerColor }}/>
        ))}
      </div>
      <div className="relative w-full max-w-3xl mx-auto p-6 pt-8 text-left">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 blur-2xl"
          style={{ background: `radial-gradient(60% 60% at 50% 50%, ${aura}, transparent 70%)` }}
        />
        {(title || subtitle) && (
          <div className="text-center">
            <div className="font-pixel text-white text-base md:text-lg">{title}</div>
            {subtitle && <div className="text-raidText/70 text-sm mt-1">{subtitle}</div>}
          </div>
        )}
        <div className="mt-4">{children}</div>
      </div>
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${underline}, transparent)`,
          boxShadow: `0 0 24px ${underline.replace('0.8','0.6')}`,
        }}
      />
    </div>
  );
}

/* ---------- Page ---------- */
export default function VerifyPage() {
  const [serverSeed, setServerSeed] = useState('');
  const [committedHash, setCommittedHash] = useState('');
  const [clientSeed, setClientSeed] = useState('');
  const [nonce, setNonce] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState({
    serverSeedHash: '',
    hmacHex: '',
    uint32: null,
    float01: null,
    roll: null,
    hashMatches: null,
  });

  const canVerify = useMemo(
    () => Boolean(serverSeed && clientSeed && String(nonce).length > 0 && !busy),
    [serverSeed, clientSeed, nonce, busy]
  );

  const demoFill = () => {
    setServerSeed('server-seed-demo-000000000000000000000000');
    setCommittedHash('');
    setClientSeed('raid-abcdef123456');
    setNonce('1337');
    setError('');
    setOut({
      serverSeedHash: '',
      hmacHex: '',
      uint32: null,
      float01: null,
      roll: null,
      hashMatches: null,
    });
  };

  const onVerify = async (e) => {
    e?.preventDefault?.();
    setError('');
    setBusy(true);
    try {
      if (typeof window === 'undefined' || !window.crypto?.subtle) {
        throw new Error('WebCrypto not available.');
      }
      if (!/^\d+$/.test(String(nonce))) throw new Error('Nonce must be an integer.');

      const ssHash = await sha256Hex(serverSeed);
      let matches = null;
      if (committedHash.trim()) {
        matches = ssHash.toLowerCase() === committedHash.trim().toLowerCase();
      }

      const message = `${clientSeed}:${Number(nonce)}`;
      const hmacHex = await hmacSha256Hex(serverSeed, message);

      const first8 = hmacHex.slice(0, 8);
      const uint32 = parseInt(first8, 16) >>> 0;
      const float01 = uint32 / 2 ** 32;
      const roll = Math.floor(float01 * 10000) / 100;

      setOut({ serverSeedHash: ssHash, hmacHex, uint32, float01, roll, hashMatches: matches });
    } catch (err) {
      setError(err?.message || 'Verification failed.');
      setOut({ serverSeedHash: '', hmacHex: '', uint32: null, float01: null, roll: null, hashMatches: null });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>Verify a Round — Blockchain Raiders</title>
        <meta name="robots" content="noindex" />
      </Head>

      {/* Background */}
      <img
        src="/img/torch_bg_4k.png"
        alt=""
        className="fixed inset-0 w-full h-full object-cover object-top"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Top Navigation Bar */}
      <Topbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20">
        <h1 className="font-pixel text-raidLime text-2xl lore-glow text-center mb-2">
          VERIFY A ROUND
        </h1>
        <p className="font-ui text-raidText/80 text-center mb-8">
          Commit–Reveal: verify your outcome using the revealed{' '}
          <span className="text-raidMagenta">server seed</span>, your{' '}
          <span className="text-raidGold">client seed</span>, and{' '}
          <span className="text-raidLime">nonce</span>.
        </p>

        {/* INPUTS */}
        <PixelCard badge="INPUTS" title="Enter round data">
          <form onSubmit={onVerify} className="grid gap-4">
            <Input
              label="SERVER SEED (revealed)"
              placeholder="e.g., serverseed_9b1c..."
              value={serverSeed}
              onChange={setServerSeed}
            />
            <Input
              label="COMMITTED SERVER SEED HASH (optional)"
              placeholder="sha256(serverSeed) from commit phase"
              value={committedHash}
              onChange={setCommittedHash}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="CLIENT SEED"
                placeholder="e.g., raid-abcdef123456"
                value={clientSeed}
                onChange={setClientSeed}
              />
              <Input
                label="NONCE"
                placeholder="e.g., 0"
                value={nonce}
                onChange={setNonce}
                type="number"
              />
            </div>

            {error && <div className="text-raidMagenta/90 text-[12px]">{error}</div>}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={!canVerify}
                className="font-pixel px-4 py-2 border rounded border-raidLime/60 hover:border-raidLime/90 text-raidLime disabled:opacity-40"
              >
                {busy ? 'VERIFYING…' : 'VERIFY ROUND'}
              </button>
              <button
                type="button"
                onClick={demoFill}
                className="font-pixel px-4 py-2 border rounded border-raidGold/50 hover:border-raidGold/80 text-raidGold"
              >
                TRY DEMO VALUES
              </button>
              <a
                href="/how-it-works"
                className="font-pixel px-4 py-2 border rounded border-raidMagenta/50 hover:border-raidMagenta/80 text-raidMagenta"
              >
                HOW IT WORKS
              </a>
            </div>
          </form>
        </PixelCard>

        {/* OUTPUTS */}
        <div className="mt-8 grid gap-6">
          <PixelCard
            badge="HASH"
            title="Server Seed Hash"
            subtitle="Compare to the committed hash (if supplied earlier)."
          >
            <Row
              label="sha256(serverSeed)"
              value={out.serverSeedHash || '—'}
              onCopy={() => copyToClipboard(out.serverSeedHash)}
            />
            {committedHash ? (
              <div className="mt-3 font-ui text-sm">
                <span className="text-raidText/70">Matches committed?</span>{' '}
                {out.hashMatches == null ? (
                  <span className="text-raidText/50">—</span>
                ) : out.hashMatches ? (
                  <span className="text-raidLime font-semibold">YES</span>
                ) : (
                  <span className="text-raidMagenta font-semibold">NO</span>
                )}
              </div>
            ) : (
              <div className="mt-3 font-ui text-[12px] text-raidText/60">
                No committed hash provided. This check is optional.
              </div>
            )}
          </PixelCard>

          <PixelCard
            badge="RESULT"
            title="Deterministic Outcome"
            subtitle="R = HMAC_SHA256(serverSeed, `${clientSeed}:${nonce}`)"
          >
            <Row
              label="HMAC (hex)"
              value={out.hmacHex || '—'}
              onCopy={() => copyToClipboard(out.hmacHex)}
            />
            <Row
              label="uint32"
              value={out.uint32 ?? '—'}
              onCopy={() => copyToClipboard(String(out.uint32 ?? ''))}
            />
            <Row
              label="float (0..1)"
              value={out.float01 != null ? out.float01.toFixed(10) : '—'}
              onCopy={() =>
                out.float01 != null && copyToClipboard(String(out.float01))
              }
            />
            <Row
              label="roll (0–99.99)"
              value={out.roll != null ? out.roll.toFixed(2) : '—'}
              onCopy={() => out.roll != null && copyToClipboard(String(out.roll))}
            />
          </PixelCard>
        </div>
      </main>
    </div>
  );
}

/* Reusable input + row */
function Input({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block font-mono text-[11px] text-raidText/60 mb-1">
        {label}
      </label>
      <input
        type={type}
        className="w-full bg-black/40 border border-raidMagenta/30 rounded px-3 py-2 font-mono text-sm text-raidText/90 outline-none focus:border-raidMagenta/70"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Row({ label, value, onCopy }) {
  const isDash = value === '—';
  return (
    <div className="grid grid-cols-12 gap-3 items-center py-2 px-3 mt-3 first:mt-0 rounded bg-black/30 border border-raidMagenta/20">
      <div className="col-span-12 md:col-span-3 font-mono text-[11px] text-raidText/60">{label}</div>
      <div className="col-span-9 md:col-span-8 font-mono text-xs md:text-sm break-all text-raidText/90">{value}</div>
      <div className="col-span-3 md:col-span-1 flex justify-end">
        <button
          disabled={isDash}
          onClick={!isDash ? onCopy : undefined}
          className="font-mono text-[10px] px-2 py-1 border border-raidMagenta/40 hover:border-raidMagenta/70 rounded disabled:opacity-40"
        >
          COPY
        </button>
      </div>
    </div>
  );
}
