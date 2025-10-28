// pages/roadmap.js
import Head from 'next/head';
import Topbar from '@/components/Topbar';

function Mono({ children }) { return <span className="font-mono">{children}</span>; }
function Redacted() {
  // Hard redaction: no hidden content in DOM.
  return <span className="text-raidMagenta/90 font-mono">[REDACTED]</span>;
}

/* Reusable Tile — matches how-it-works look */
function Tile({
  border = 'rgba(236,72,153,0.45)',
  aura = 'rgba(236,72,153,0.22)',
  underline = 'rgba(236,72,153,0.8)',
  cornerColor = 'rgba(236,72,153,0.6)',
  title,
  subtitle,
  badge,
  children,
  className = '',
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-transparent ${className}`}
      style={{
        borderColor: border,
        boxShadow: `0 0 0 1px ${border.replace('0.45','0.30')}, 0 0 40px 12px ${border.replace('0.45','0.16')}`,
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
      <div aria-hidden className="pointer-events-none absolute inset-0 blur-2xl"
           style={{ background: `radial-gradient(60% 60% at 50% 50%, ${aura}, transparent 70%)` }} />

      <div className="relative z-[1] p-6 md:p-8">
        {(title || subtitle) && (
          <div className="text-center mb-4">
            {title && <div className="font-pixel text-white text-lg">{title}</div>}
            {subtitle && <div className="text-raidText/70 text-sm mt-1">{subtitle}</div>}
          </div>
        )}
        {children}
      </div>

      {/* Underline */}
      <div aria-hidden className="absolute left-0 right-0 bottom-0 h-[3px]"
           style={{ background: `linear-gradient(90deg, transparent, ${underline}, transparent)`,
                    boxShadow: `0 0 24px ${underline.replace('0.8','0.6')}` }} />
    </div>
  );
}

export default function RoadmapPage() {
  const title = 'Blockchain Raiders — Roadmap';
  const description = 'Sequenced plans with a few redacted beats for surprise drops.';

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

      <Topbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24">
        <header className="text-center mb-10">
          <h1 className="font-pixel text-raidLime text-2xl lore-glow">ROADMAP</h1>
          <p className="font-ui text-raidText/80 mt-2">
            Focused, PvP-first development. Some items are <span className="text-raidMagenta">redacted</span> until reveal.
          </p>
          <p className="text-raidText/60 text-xs mt-2">Last updated: <Mono>Today</Mono></p>
        </header>

        {/* Phase 0 — Foundation */}
        <Tile
          badge="PHASE 0"
          title="Foundation & Reveal"
          subtitle="Brand, community, and first-look teasers."
        >
          <ul className="list-disc list-inside text-sm text-raidText/85 space-y-1.5">
            <li>Official launch of the <Mono>$RAID</Mono> brand and core visual identity.</li>
            <li>Community hub online: Telegram growth + early access crew (“Raiders Ready”).</li>
            <li>First Relic teasers (non-final art), rarity language, and lore fragments.</li>
            <li><Redacted /> limited airdrop criteria for day-one Raiders.</li>
          </ul>
        </Tile>

        {/* Phase I — Coin Launch on Pump.fun + announce Relic drop date */}
        <div className="mt-8">
          <Tile
            badge="PHASE I"
            title="Coin Launch — Pump.fun"
            subtitle="Kickstarting the economy and rewarding earliest Raiders."
            border="rgba(147,197,253,0.45)"
            aura="rgba(147,197,253,0.20)"
            underline="rgba(147,197,253,0.85)"
            cornerColor="rgba(147,197,253,0.65)"
          >
            <ul className="list-disc list-inside text-sm text-raidText/85 space-y-1.5">
              <li>
                <strong>Launch:</strong> <Mono>Friday, 31 October 2025 @ 11:00 PM (UK)</Mono> on <Mono>Pump.fun</Mono>.
              </li>
              <li>During Phase I: announce the official <strong>NFT / Relic collection</strong> drop date.</li>
              <li>Liquidity + guardrails communicated ahead of launch (summary & doxxed receipts).</li>
              <li><Redacted /> community quest tied to first 48 hours.</li>
            </ul>
          </Tile>
        </div>

        {/* Phase II — Relics go live (exact timing confidential) */}
        <div className="mt-8">
          <Tile
            badge="PHASE II"
            title="Relics: Crafting & Buffs"
            subtitle="Capped-supply NFTs acting as buffs, materials, and visual power-ups."
            border="rgba(4,245,165,0.45)"
            aura="rgba(4,245,165,0.18)"
            underline="rgba(4,245,165,0.85)"
            cornerColor="rgba(4,245,165,0.65)"
          >
            <ul className="list-disc list-inside text-sm text-raidText/85 space-y-1.5">
              <li><strong>Release window:</strong> <Redacted /></li>
              <li>Relic mint (staged caps) with fairlist for earliest Raiders.</li>
              <li>Crafting loop: combine materials to unlock tiered buffs.</li>
              <li>Cosmetic auras & on-win VFX tied to equipped relic.</li>
              <li>Sink mechanics: controlled burn/merge for long-term balance.</li>
            </ul>
          </Tile>
        </div>

        {/* Phase III — Public Demo (limited modes, not all games) */}
        <div className="mt-8">
          <Tile
            badge="PHASE III"
            title="Public Demo"
            subtitle="Playable slice — limited modes to prove the loop."
            border="rgba(250,204,21,0.45)"
            aura="rgba(250,204,21,0.20)"
            underline="rgba(250,204,21,0.85)"
            cornerColor="rgba(250,204,21,0.65)"
          >
            <ul className="list-disc list-inside text-sm text-raidText/85 space-y-1.5">
              <li>Single-lobby flow with synchronized rounds.</li>
              <li>Small set of curated modes to test pacing & UX (not the full roster).</li>
              <li>Live telemetry + feedback loop to tune feel and fairness.</li>
              <li><Redacted /> micro-event during Demo window.</li>
            </ul>
          </Tile>
        </div>

        {/* Phase IV — Core PvP (Beta) — lighter details */}
        <div className="mt-8">
          <Tile
            badge="PHASE IV"
            title="Core PvP (Beta)"
            subtitle="Systems online, head-to-head tuned — more polish than scope."
          >
            <ul className="list-disc list-inside text-sm text-raidText/85 space-y-1.5">
              <li>Queueing/lobbies, fair matchmaking, and session persistence.</li>
              <li>Provable fairness hooks across active modes (+ <Mono>/verify</Mono> tooling).</li>
              <li>Mode roster expands from Demo; select teasers withheld.</li>
              <li>Light economy & rewards; competitive tuning continues.</li>
              <li><Redacted /> new PvP twist revealed mid-Beta.</li>
            </ul>
          </Tile>
        </div>

        {/* Phase V — Progression, Ladders & Jackpots */}
        <div className="mt-8">
          <Tile
            badge="PHASE V"
            title="Progression, Ladders & Jackpots"
            subtitle="Retention mechanics without pay-to-win."
          >
            <ul className="list-disc list-inside text-sm text-raidText/85 space-y-1.5">
              <li>Daily/weekly ladders with anti-smurf protections.</li>
              <li>Shared pot jackpots seeded by rakeback allocations.</li>
              <li>Rakeback tiers with transparent % and on-chain claims.</li>
              <li>Session quests (skill-gated, not grindy).</li>
            </ul>
          </Tile>
        </div>

        {/* Always-On — contracts & /verify */}
        <div className="mt-8">
          <Tile
            badge="ALWAYS-ON"
            title="Trust, Security & Perf"
            subtitle="Provable fairness, stability and low-latency first."
            border="rgba(147,197,253,0.45)"
            aura="rgba(147,197,253,0.20)"
            underline="rgba(147,197,253,0.85)"
            cornerColor="rgba(147,197,253,0.65)"
          >
            <ul className="list-disc list-inside text-sm text-raidText/85 space-y-1.5">
              <li><Mono>/verify</Mono> upgrades: batched proofs, exportable JSON, seed archives.</li>
              <li>Smart contract rollouts aligned with milestones (public notes follow).</li>
              <li>Third-party reviews/audits (timeline shared post-engagement).</li>
              <li>Latency budgets across modes; synchronized round clocks.</li>
              <li>Wallet UX passes (signing hints, failed-tx recovery, timeouts).</li>
            </ul>
          </Tile>
        </div>

        <p className="mt-10 text-center font-ui text-raidText/60 text-xs">
          Roadmap is directional and may shift to prioritize stability, fairness, and community feedback.
        </p>
      </main>
    </div>
  );
}
