import Head from 'next/head';
import Topbar from '@/components/Topbar';

const supplyBreakdown = [
  {
    allocation: 'Public Supply (Unlocked)',
    amount: '780,000,000',
    percentage: '78%',
    purpose:
      'Freely circulating supply for players, liquidity, exchanges, and community markets.'
  },
  {
    allocation: 'Streamflow-Locked Dev Fund',
    amount: '120,000,000',
    percentage: '12%',
    purpose:
      'Locked for 1 month to fund future development, scaling, audits, and marketing.'
  },
  {
    allocation: 'Core Team Allocation',
    amount: '100,000,000',
    percentage: '10%',
    purpose:
      'Distributed among core developers and operations wallet for sustainability and stability.'
  }
];

const teamAllocation = [
  {
    wallet: 'Founder (Private Wallet)',
    amount: '10,000,000',
    purpose:
      'Founder compensation, community initiatives, and strategic liquidity support.'
  },
  {
    wallet: 'Developer A',
    amount: '34,000,000',
    purpose: 'Technical development, server operations, and system architecture.'
  },
  {
    wallet: 'Developer B',
    amount: '46,000,000',
    purpose: 'Frontend, gameplay systems, and infrastructure scalability.'
  },
  {
    wallet: 'Dev Operations Wallet',
    amount: '10,000,000',
    purpose: 'Central maintenance wallet for emergencies, fixes, and liquidity backup.'
  }
];

const tokenUtility = [
  {
    utility: 'Battle Currency',
    description: 'Used for PvP duels, tournaments, and in-game staking.'
  },
  {
    utility: 'Crafting Material',
    description: 'Required for Relic upgrades, forging, and item fusion.'
  },
  {
    utility: 'Vitality Conversion',
    description: 'Certain upgrades consume $RAID alongside Vitality to unlock power spikes.'
  },
  {
    utility: 'Player Rewards',
    description: 'Distributed through events, leaderboards, and Army warfare.'
  },
  {
    utility: 'Governance (Future)',
    description: 'Holders can propose or vote on ecosystem decisions.'
  }
];

const supplyManagement = [
  {
    mechanism: 'Burns',
    purpose:
      'Portions of $RAID spent on upgrades and crafting are permanently removed from circulation.'
  },
  {
    mechanism: 'Redistribution',
    purpose:
      'Select fees recycle into reward pools for future events and seasonal ladders.'
  },
  {
    mechanism: 'Treasury Control',
    purpose: 'Streamflow and core wallets remain transparent and publicly trackable.'
  },
  {
    mechanism: 'No Additional Minting',
    purpose: 'Supply is hard capped at 1B $RAID — zero future inflation.'
  }
];

const summaryTable = [
  {
    category: 'Public Supply',
    allocation: '780,000,000',
    percentage: '78%',
    status: 'Circulating',
    description: 'Community, players, exchanges, and liquidity provisioning.'
  },
  {
    category: 'Streamflow Locked Fund',
    allocation: '120,000,000',
    percentage: '12%',
    status: 'Locked (1 month)',
    description: 'Development, growth, marketing, and audits.'
  },
  {
    category: 'Core Team Wallets',
    allocation: '100,000,000',
    percentage: '10%',
    status: 'Held',
    description: 'Founder, developers, and operational sustainability.'
  }
];

const tokenStrategy = [
  'No VC allocation — Blockchain Raiders remains 100% community-owned and team-built.',
  'Streamflow-locked development fund keeps reserves transparent and accountable.',
  'Majority public ownership with 780M tokens fueling players, liquidity, and open markets.',
  'Sustainability-driven allocations ensure future development without outside dependence.'
];

export default function Tokenomics() {
  const title = '$RAID Tokenomics — Blockchain Raiders';
  const description =
    'Explore the $RAID economy, supply breakdowns, and the philosophy powering Blockchain Raiders.';

  return (
    <div className="relative min-h-screen text-raidText">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <img
        src="/img/torch_bg_4k.png"
        alt=""
        className="fixed inset-0 w-full h-full object-cover object-top"
        style={{ imageRendering: 'pixelated' }}
      />

      <div className="fixed inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95" aria-hidden="true" />

      <Topbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24 space-y-12 sm:space-y-16">
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-raidGold/60 bg-black/70 px-4 sm:px-5 py-2 font-pixel text-raidLime text-[0.65rem] sm:text-xs tracking-[0.3em] uppercase">
            💰 Tokenomics
          </div>
          <h1 className="font-pixel text-3xl sm:text-4xl md:text-6xl text-white lore-glow">$RAID Supply Doctrine</h1>
          <p className="font-ui text-sm sm:text-base md:text-lg text-raidText/80 max-w-3xl mx-auto">
            $RAID is the lifeblood of Blockchain Raiders: Battle for Vitality — fueling duels, progression, crafting,
            and the evolving PvP world forged on Solana.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-[0.65rem] sm:text-xs font-pixel uppercase text-raidText/70">
            <span className="rounded-full border border-raidText/30 bg-black/60 px-3 sm:px-4 py-1.5 sm:py-2">Token: $RAID</span>
            <span className="rounded-full border border-raidText/30 bg-black/60 px-3 sm:px-4 py-1.5 sm:py-2">Network: Solana</span>
            <span className="rounded-full border border-raidText/30 bg-black/60 px-3 sm:px-4 py-1.5 sm:py-2">
              Total Supply: 1,000,000,000
            </span>
          </div>
        </header>

        <section className="bg-black/60 border border-raidGold/30 rounded-2xl shadow-xl shadow-raidGold/10 backdrop-blur-lg overflow-hidden">
          <div className="grid md:grid-cols-[3fr_2fr] gap-0">
            <div className="p-6 sm:p-8 lg:p-10 space-y-6">
              <h2 className="font-pixel text-raidLime text-3xl">1. Overview</h2>
              <p className="font-ui text-raidText/85">
                $RAID powers every battle inside Blockchain Raiders: Battle for Vitality, the browser-based PvP RPG built on
                Solana. It fuels duels, progression, crafting, and upgrades while anchoring the entire player economy.
              </p>
              <p className="font-ui text-raidText/80">
                The tokenomics are structured for transparency, self-sustainability, and player fairness, ensuring the
                majority of supply remains accessible to the community from day one.
              </p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-raidGold/20 bg-black/40 p-6 sm:p-8 lg:p-10 space-y-4">
              <h3 className="font-pixel text-raidGold text-xl">Circulation Snapshot</h3>
              <ul className="space-y-3 text-sm sm:text-base font-ui text-raidText/75">
                <li className="flex items-start gap-3">
                  <span className="font-pixel text-raidLime text-xs mt-1">•</span>
                  <span>78% unlocked for players, liquidity, and community markets.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-pixel text-raidLime text-xs mt-1">•</span>
                  <span>12% locked via Streamflow to fund growth after launch.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-pixel text-raidLime text-xs mt-1">•</span>
                  <span>10% allocated to the core team for sustainable development.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-8 bg-black/50 border border-raidGold/20 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur">
          <div className="space-y-4">
            <h2 className="font-pixel text-raidLime text-3xl">2. Supply Breakdown</h2>
            <p className="font-ui text-raidText/80">
              Supply is distributed across three primary pillars that balance accessibility, responsible reserves, and team
              sustainability.
            </p>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full divide-y divide-raidGold/20 text-left text-sm sm:text-base">
              <thead className="font-pixel uppercase text-raidText/60">
                <tr>
                  <th className="px-4 sm:px-6 py-3">Allocation</th>
                  <th className="px-4 sm:px-6 py-3">Amount</th>
                  <th className="px-4 sm:px-6 py-3">% of Supply</th>
                  <th className="px-4 sm:px-6 py-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-raidGold/10">
                {supplyBreakdown.map((row) => (
                  <tr key={row.allocation} className="bg-black/40">
                    <td className="px-4 sm:px-6 py-4 font-pixel text-raidGold text-xs sm:text-sm uppercase tracking-wide">
                      {row.allocation}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-ui text-raidText/85">{row.amount}</td>
                    <td className="px-4 sm:px-6 py-4 font-ui text-raidText/75">{row.percentage}</td>
                    <td className="px-4 sm:px-6 py-4 font-ui text-raidText/70">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-pixel text-raidGold text-sm uppercase tracking-[0.35em]">Total Supply: 1,000,000,000 $RAID</p>
        </section>

        <section className="space-y-8">
          <div className="bg-black/50 border border-raidGold/20 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6 backdrop-blur">
            <div className="space-y-4">
              <h2 className="font-pixel text-raidLime text-3xl">3. Core Team Allocation</h2>
              <p className="font-ui text-raidText/80">
                Team wallets hold 10% of supply, balancing builder incentives with community-first distribution. Every wallet
                remains publicly visible on-chain for real-time accountability.
              </p>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="min-w-full divide-y divide-raidGold/20 text-left text-sm sm:text-base table-fixed">
                <thead className="font-pixel uppercase text-raidText/60">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 align-top">Wallet</th>
                    <th className="px-4 sm:px-6 py-3 align-top">Amount</th>
                    <th className="px-4 sm:px-6 py-3 align-top md:w-1/2">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-raidGold/10">
                  {teamAllocation.map((row) => (
                    <tr key={row.wallet} className="bg-black/40">
                      <td className="px-4 sm:px-6 py-4 font-pixel text-raidGold text-xs sm:text-sm uppercase tracking-wide align-top">
                        {row.wallet}
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-ui text-raidText/85 align-top">{row.amount}</td>
                      <td className="px-4 sm:px-6 py-4 font-ui text-raidText/70 align-top whitespace-normal leading-relaxed md:w-1/2">
                        {row.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-black/40 border border-raidGold/20 rounded-xl p-5 space-y-3 font-ui text-raidText/75">
              <h3 className="font-pixel text-raidGold text-lg">Why the Team Holds 10%</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>Independent funding — Blockchain Raiders is self-built with no VC or private rounds.</li>
                <li>Operational sustainability for servers, audits, bounties, and production pipelines.</li>
                <li>Aligned incentives — builders win only when the ecosystem thrives.</li>
                <li>Transparent, on-chain wallets with zero hidden allocations or mint functions.</li>
              </ul>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-black/50 border border-raidGold/20 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-4 backdrop-blur">
              <h2 className="font-pixel text-raidLime text-3xl">4. Streamflow-Locked Fund</h2>
              <p className="font-ui text-raidText/80">
                120M $RAID is locked via Streamflow for 1 month, acting as a transparent reserve dedicated to development,
                scaling, marketing, and security.
              </p>
              <p className="font-ui text-raidText/70">
                After the lock period, releases are earmarked for backend upgrades, Relic and Army systems, tournaments,
                marketing pushes, audits, listings, and infrastructure hardening — accelerating growth without compromising
                trust.
              </p>
            </div>

            <div className="bg-black/50 border border-raidGold/20 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-4 backdrop-blur">
              <h2 className="font-pixel text-raidLime text-3xl">5. Public Supply</h2>
              <p className="font-ui text-raidText/80">
                780M $RAID — 78% of total supply — lives in the hands of the community. This massive allocation ensures active
                players, Armies, and markets remain liquid and empowered.
              </p>
              <ul className="space-y-3 text-sm sm:text-base font-ui text-raidText/75">
                <li className="flex items-start gap-3">
                  <span className="font-pixel text-raidLime text-xs mt-1">•</span>
                  <span>Player balances for duels, crafting, upgrades, and PvP wagers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-pixel text-raidLime text-xs mt-1">•</span>
                  <span>Liquidity for Solana DEXes and upcoming exchange listings.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-pixel text-raidLime text-xs mt-1">•</span>
                  <span>Community events, Army competitions, and seasonal Vitality bonuses.</span>
                </li>
              </ul>
              <p className="font-ui text-raidText/70">
                Keeping the majority of tokens in active circulation maintains a fair economy and long-term ecosystem health.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8 bg-black/50 border border-raidGold/20 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur">
          <div className="space-y-4">
            <h2 className="font-pixel text-raidLime text-3xl">6. Token Purpose & Utility</h2>
            <p className="font-ui text-raidText/80">
              $RAID underpins every meaningful interaction inside Blockchain Raiders, ensuring gameplay and progression feed
              directly back into the economy.
            </p>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full divide-y divide-raidGold/20 text-left text-sm sm:text-base">
              <thead className="font-pixel uppercase text-raidText/60">
                <tr>
                  <th className="px-4 sm:px-6 py-3">Utility</th>
                  <th className="px-4 sm:px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-raidGold/10">
                {tokenUtility.map((row) => (
                  <tr key={row.utility} className="bg-black/40">
                    <td className="px-4 sm:px-6 py-4 font-pixel text-raidGold text-xs sm:text-sm uppercase tracking-wide">
                      {row.utility}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-ui text-raidText/75">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-8 bg-black/50 border border-raidGold/20 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur">
          <div className="space-y-4">
            <h2 className="font-pixel text-raidLime text-3xl">7. Supply Management</h2>
            <p className="font-ui text-raidText/80">
              Supply mechanisms keep $RAID balanced between utility, rewards, and long-term sustainability.
            </p>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full divide-y divide-raidGold/20 text-left text-sm sm:text-base">
              <thead className="font-pixel uppercase text-raidText/60">
                <tr>
                  <th className="px-4 sm:px-6 py-3">Mechanism</th>
                  <th className="px-4 sm:px-6 py-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-raidGold/10">
                {supplyManagement.map((row) => (
                  <tr key={row.mechanism} className="bg-black/40">
                    <td className="px-4 sm:px-6 py-4 font-pixel text-raidGold text-xs sm:text-sm uppercase tracking-wide">
                      {row.mechanism}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-ui text-raidText/75">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-black/50 border border-raidGold/20 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6 backdrop-blur">
          <h2 className="font-pixel text-raidLime text-3xl">8. Economic Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm sm:text-base font-ui text-raidText/80">
            <div className="space-y-4">
              <p className="bg-black/40 border border-raidGold/20 rounded-xl p-5">
                <span className="font-pixel text-raidGold block text-sm uppercase tracking-[0.3em] mb-2">
                  Player-First
                </span>
                78% of tokens belong to the community — no hidden locks, no opaque vesting schedules.
              </p>
              <p className="bg-black/40 border border-raidGold/20 rounded-xl p-5">
                <span className="font-pixel text-raidGold block text-sm uppercase tracking-[0.3em] mb-2">
                  Builder-Funded
                </span>
                Blockchain Raiders is entirely self-built. Team allocations remain modest yet mission-critical.
              </p>
            </div>
            <div className="space-y-4">
              <p className="bg-black/40 border border-raidGold/20 rounded-xl p-5">
                <span className="font-pixel text-raidGold block text-sm uppercase tracking-[0.3em] mb-2">
                  Transparent Locks
                </span>
                120M $RAID locked on Streamflow demonstrates accountability and operational runway.
              </p>
              <p className="bg-black/40 border border-raidGold/20 rounded-xl p-5">
                <span className="font-pixel text-raidGold block text-sm uppercase tracking-[0.3em] mb-2">
                  Closed-Loop Design
                </span>
                Every $RAID spent feeds back through rewards, burns, or upgrades — never an extractive sink.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8 bg-black/50 border border-raidGold/20 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur">
          <div className="space-y-4">
            <h2 className="font-pixel text-raidLime text-3xl">9. Summary Table</h2>
            <p className="font-ui text-raidText/80">
              A snapshot of how the 1B $RAID supply anchors public access, transparent reserves, and builder sustainability.
            </p>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full divide-y divide-raidGold/20 text-left text-sm sm:text-base">
              <thead className="font-pixel uppercase text-raidText/60">
                <tr>
                  <th className="px-4 sm:px-6 py-3">Category</th>
                  <th className="px-4 sm:px-6 py-3">Allocation</th>
                  <th className="px-4 sm:px-6 py-3">%</th>
                  <th className="px-4 sm:px-6 py-3">Status</th>
                  <th className="px-4 sm:px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-raidGold/10">
                {summaryTable.map((row) => (
                  <tr key={row.category} className="bg-black/40">
                    <td className="px-4 sm:px-6 py-4 font-pixel text-raidGold text-xs sm:text-sm uppercase tracking-wide">
                      {row.category}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-ui text-raidText/85">{row.allocation}</td>
                    <td className="px-4 sm:px-6 py-4 font-ui text-raidText/75">{row.percentage}</td>
                    <td className="px-4 sm:px-6 py-4 font-ui text-raidText/75">{row.status}</td>
                    <td className="px-4 sm:px-6 py-4 font-ui text-raidText/70">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-pixel text-raidGold text-sm uppercase tracking-[0.35em]">Total Supply: 1,000,000,000 $RAID</p>
        </section>

        <section className="bg-black/60 border border-raidGold/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6 text-center shadow-xl shadow-raidGold/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">10. Token Strategy Summary</h2>
          <ul className="space-y-4 font-ui text-sm sm:text-base text-raidText/80 max-w-3xl mx-auto">
            {tokenStrategy.map((item) => (
              <li key={item} className="bg-black/40 border border-raidGold/20 rounded-xl px-6 py-4">
                {item}
              </li>
            ))}
          </ul>
          <p className="font-pixel text-raidGold text-sm uppercase tracking-[0.35em]">
            Majority Public Ownership • Transparent Reserves • Sustainable Growth
          </p>
        </section>
      </main>
    </div>
  );
}

