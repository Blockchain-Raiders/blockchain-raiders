// pages/how-it-works.js
import Head from 'next/head';
import Topbar from '@/components/Topbar';
import { useEffect, useState } from 'react';

/* ---------- Small helpers ---------- */
function copy(text) { try { navigator.clipboard?.writeText(text); } catch {} }
function Mono({ children }) { return <span className="font-mono">{children}</span>; }

/* Reusable Tile matching index */
function Tile({
  border = 'rgba(236,72,153,0.45)',
  aura = 'rgba(236,72,153,0.25)',
  underline = 'rgba(236,72,153,0.8)',
  cornerColor = 'rgba(236,72,153,0.6)',
  title,
  subtitle,
  children,
  badge,
  className = '',
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-transparent ${className}`}
      style={{
        borderColor: border,
        boxShadow: `0 0 0 1px ${border.replace('0.45', '0.30')}, 0 0 40px 12px ${border.replace('0.45','0.18')}`,
      }}
    >
      {badge && (
        <div className="absolute left-3 top-3 z-10 rounded px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-raidMagenta bg-black/50 border border-raidMagenta/40">
          {badge}
        </div>
      )}
      {/* Corner pixels */}
      <div className="pointer-events-none absolute inset-0">
        {['left-0 top-0','right-0 top-0','left-0 bottom-0','right-0 bottom-0'].map((pos) => (
          <div key={pos} className={`absolute ${pos} h-2 w-2`} style={{ background: cornerColor }} />
        ))}
      </div>
      {/* Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 blur-2xl"
        style={{ background: `radial-gradient(60% 60% at 50% 50%, ${aura}, transparent 70%)` }}
      />
      <div className="relative z-[1] p-6 md:p-8">
        {(title || subtitle) && (
          <div className="text-center mb-4">
            {title && <div className="font-pixel text-white text-lg">{title}</div>}
            {subtitle && <div className="text-raidText/70 text-sm mt-1">{subtitle}</div>}
          </div>
        )}
        {children}
      </div>
      {/* Bottom underline */}
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

/* --- Hydration-safe demo values (client-only) --- */
const randHex = (n) =>
  Array.from({ length: n }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');

export default function FairnessPage() {
  const title = 'Provable Fairness — How it Works';
  const description = 'Commit–reveal with SHA-256 and HMAC-SHA256 for deterministic, verifiable outcomes.';

  // Client-only demo values; SSR shows em-dash placeholders so HTML matches
  const [demo, setDemo] = useState({ serverSeed: '', clientSeed: '', nonce: '' });
  useEffect(() => {
    setDemo({
      serverSeed: `serverseed_${randHex(24)}`,
      clientSeed: `raid-${randHex(12)}`,
      nonce: String(Math.floor(Math.random() * 2000)),
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
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

      {/* Content */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20">
        <header className="text-center mb-8">
          <h1 className="font-pixel text-raidLime text-2xl lore-glow">PROVABLE FAIRNESS</h1>
          <p className="font-ui text-raidText/80 mt-2">
            Transparent, deterministic results using a <span className="text-raidMagenta">commit–reveal</span> scheme.
          </p>
        </header>

        {/* 1) Commit Phase */}
        <Tile
          badge="STEP 1"
          title="Commit Phase — Server seed hash"
          subtitle="Before any round starts, we commit to the server seed by publishing only its SHA-256 hash."
        >
          <div className="space-y-3 text-raidText/85">
            <p className="font-ui">
              We generate a secret <Mono>serverSeed</Mono>. We post its hash:
              <br />
              <Mono>serverSeedHash = SHA256(serverSeed)</Mono>
            </p>
            <div className="grid grid-cols-12 gap-3 items-center py-2 px-3 rounded bg-black/30 border border-raidMagenta/20">
              <div className="col-span-12 md:col-span-4 font-mono text-[11px] text-raidText/60">SERVER SEED (kept secret)</div>
              <div className="col-span-10 md:col-span-7 font-mono text-xs md:text-sm break-all text-raidText/90" suppressHydrationWarning>
                {demo.serverSeed || '—'}
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-end">
                <button
                  className="font-mono text-[10px] px-2 py-1 border border-raidMagenta/40 hover:border-raidMagenta/70 rounded"
                  onClick={() => demo.serverSeed && copy(demo.serverSeed)}
                  disabled={!demo.serverSeed}
                >
                  COPY
                </button>
              </div>
            </div>
            <p className="font-ui">
              Only <Mono>serverSeedHash</Mono> is public at this time; the seed stays hidden to prevent prediction or manipulation.
            </p>
          </div>
        </Tile>

        {/* 2) Player Input */}
        <div className="mt-8">
          <Tile
            badge="STEP 2"
            title="Player input — Client seed & nonce"
            subtitle="Your browser or wallet provides entropy that we cannot predict."
          >
            <div className="space-y-3 text-raidText/85">
              <p className="font-ui">
                You provide a <Mono>clientSeed</Mono>. Each bet/round increases a <Mono>nonce</Mono> (starting from 0).
              </p>

              <div className="grid md:grid-cols-3 gap-3">
                {[
                  ['CLIENT SEED', demo.clientSeed, () => copy(demo.clientSeed)],
                  ['NONCE', demo.nonce, () => copy(String(demo.nonce))],
                  ['TIP', 'Use the same client seed; nonce increments per round.', null],
                ].map(([label, value, onCopy], i) => (
                  <div key={i} className="py-2 px-3 rounded bg-black/30 border border-raidMagenta/20">
                    <div className="font-mono text-[11px] text-raidText/60 mb-1">{label}</div>
                    <div className="font-mono text-xs md:text-sm break-all text-raidText/90" suppressHydrationWarning>
                      {value || '—'}
                    </div>
                    {onCopy && (
                      <div className="mt-2 text-right">
                        <button
                          className="font-mono text-[10px] px-2 py-1 border border-raidMagenta/40 hover:border-raidMagenta/70 rounded"
                          onClick={onCopy}
                          disabled={!value}
                        >
                          COPY
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Tile>
        </div>

        {/* 3) Deterministic Result */}
        <div className="mt-8">
          <Tile
            badge="STEP 3"
            title="Deterministic outcome — HMAC_SHA256"
            subtitle="Combine both parties’ entropy and derive the result deterministically."
          >
            <div className="space-y-4 text-raidText/85">
              <p className="font-ui">
                Compute <Mono>R = HMAC_SHA256(serverSeed, `${'{'}clientSeed{'}'}:${'{'}nonce{'}'}`)</Mono>.
              </p>
              <div className="font-mono text-[12px] bg-black/40 rounded border border-raidMagenta/30 p-3 overflow-auto">
{`// Pseudocode
H  = SHA256(serverSeed)
R  = HMAC_SHA256(serverSeed, clientSeed + ":" + nonce)
u32 = parseInt(R[0..8], 16) >>> 0
x   = u32 / 2^32   // float in [0,1)
roll = floor(x * 10000) / 100 // 0–99.99`}
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <a href="/verify" className="block text-center font-pixel px-4 py-3 border rounded border-raidLime/60 hover:border-raidLime/90 text-raidLime">
                  VERIFY A ROUND
                </a>
                <a href="/#modes" className="block text-center font-pixel px-4 py-3 border rounded border-raidGold/60 hover:border-raidGold/90 text-raidGold">
                  VIEW GAME MODES
                </a>
              </div>
            </div>
          </Tile>
        </div>

        {/* 4) Reveal & Check */}
        <div className="mt-8">
          <Tile
            badge="STEP 4"
            title="Reveal & audit"
            subtitle="After rounds conclude, we reveal serverSeed so anyone can verify outcomes."
          >
            <div className="space-y-3 text-raidText/85">
              <p className="font-ui">
                Once revealed, anyone can recompute <Mono>SHA256(serverSeed)</Mono> and confirm it matches the original commitment (<Mono>serverSeedHash</Mono>).
              </p>
              <ul className="list-disc list-inside text-sm text-raidText/80">
                <li>Recreate the HMAC using your <Mono>clientSeed</Mono> and <Mono>nonce</Mono>.</li>
                <li>Confirm the numeric transform (uint32 → float → roll) matches the UI.</li>
                <li>Check <Mono>serverSeedHash</Mono> matches the original commit.</li>
              </ul>
            </div>
          </Tile>
        </div>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="font-pixel text-raidLime text-xl text-center mb-4 lore-glow">FAQ</h2>
          <div className="grid gap-4">
            <Tile title="Why HMAC with the server seed as key?">
              <p className="font-ui text-raidText/80">
                Using the secret <Mono>serverSeed</Mono> as the HMAC key ensures outcomes can’t be predicted from the public
                <Mono> serverSeedHash</Mono>. After reveal, everyone can recompute the same output.
              </p>
            </Tile>
            <Tile title="Can the server choose a lucky seed?">
              <p className="font-ui text-raidText/80">
                The server commits to <Mono>serverSeedHash</Mono> before your inputs exist for that round. Player entropy
                (<Mono>clientSeed</Mono>, <Mono>nonce</Mono>) is unknown to the server at commit time, removing selection bias.
              </p>
            </Tile>
            <Tile title="What if I reuse my client seed?">
              <p className="font-ui text-raidText/80">
                That’s fine; the <Mono>nonce</Mono> increments each round, changing the message for HMAC and producing new, unpredictable outputs.
              </p>
            </Tile>
          </div>
        </section>

        {/* Tiny note */}
        <p className="mt-10 text-center font-ui text-raidText/60 text-sm">
          Want to test live data? Use <a href="/verify" className="text-raidMagenta underline underline-offset-2">Verify a Round</a>.
        </p>
      </main>
    </div>
  );
}
