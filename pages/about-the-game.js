import Head from 'next/head';
import Topbar from '@/components/Topbar';

const keyPillars = [
  {
    title: 'PvP-First Gameplay',
    description: 'Every victory and defeat matters.'
  },
  {
    title: 'RPG Progression',
    description: 'Level up, earn Vitality, craft and equip Relics.'
  },
  {
    title: 'On-Chain Fairness',
    description: 'Outcomes and stats are verifiable on Solana.'
  },
  {
    title: 'Account-Based System',
    description: 'Deposit $RAID to fund battles and upgrades.'
  },
  {
    title: 'Community Warfare',
    description: 'Armies rise, clash, and control territory.'
  }
];

const relicTypes = [
  {
    type: 'Weapon Relics',
    detail: 'Boost attack or add special combat effects.'
  },
  {
    type: 'Armor Relics',
    detail: 'Increase defense or reduce loss penalties.'
  },
  {
    type: 'Vital Relics',
    detail: 'Boost Vitality gain or recovery rate.'
  },
  {
    type: 'Cosmetic Relics',
    detail: 'Purely aesthetic — unique skins and visuals.'
  }
];

const vitalityGain = [
  {
    action: 'Winning PvP duels',
    gain: 'Major Vitality surges that power progression.'
  },
  {
    action: 'Completing Army missions',
    gain: 'Shared boosts that strengthen your faction.'
  },
  {
    action: 'Participating in events & tournaments',
    gain: 'Seasonal rewards and exclusive unlocks.'
  }
];

const developmentPipeline = [
  {
    feature: 'Live PvP Duels',
    description: 'Fully functional real-time combat system.',
    status: '✅ Core'
  },
  {
    feature: 'Vitality System',
    description: 'XP-based progression and crafting energy.',
    status: '✅ Core'
  },
  {
    feature: 'Relic Crafting',
    description: 'Combine items and Vitality to forge upgrades.',
    status: '🧪 In Development'
  },
  {
    feature: 'Armies (Guilds)',
    description: 'Group-based warfare and shared relic pools.',
    status: '⚔️ In Design'
  },
  {
    feature: 'Matchmaking Backend',
    description: 'Automated pairing by skill and wager size.',
    status: '🔧 In Development'
  },
  {
    feature: 'Economy Integration',
    description: '$RAID deposit/withdraw and reward system.',
    status: '🔜 Planned'
  },
  {
    feature: 'Player Marketplace',
    description: 'Trade Relics and crafting materials.',
    status: '🔜 Planned'
  },
  {
    feature: 'Seasonal Wars',
    description: 'Timed world events and leaderboard resets.',
    status: '🔜 Planned'
  },
  {
    feature: 'Lore & Story Mode',
    description: 'Narrative expansion through quests.',
    status: '📜 Ongoing'
  }
];

const tokenUtility = [
  {
    utility: 'Battle Currency',
    description: 'Used for duels, wagers, and tournament entry.'
  },
  {
    utility: 'Crafting Material',
    description: 'Required for Relic creation and upgrades.'
  },
  {
    utility: 'Army Treasury',
    description: 'Guilds spend $RAID to fund wars and shared upgrades.'
  },
  {
    utility: 'Season Rewards',
    description: 'Distributed to top Raiders and Armies.'
  },
  {
    utility: 'Economy Sink',
    description: 'Burn mechanics tied to crafting and dueling.'
  }
];

const demoFeatures = {
  included: [
    'Arena viewport with idle and combat animations.',
    'Player vs Player battle simulation.',
    'Vitality and XP tracking HUD.',
    'Combat FX: slash, shield, and blood splatter.',
    'Victory banner, balance readout, and match history.',
    'Username/password login (no wallet popups).'
  ],
  excluded: [
    'On-chain wagering and deposits.',
    'Relic inventory management or crafting.',
    'Army coordination tools.',
    'Automated matchmaking backend.',
    'Live token economy and jackpots.'
  ]
};

export default function AboutTheGame() {
  const title = 'About the Game — Blockchain Raiders';
  const description = 'Dive into the PvP vision, systems, and lore behind Blockchain Raiders: Battle for Vitality.';

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
          <div className="inline-flex items-center gap-3 rounded-full border border-raidMagenta/60 bg-black/70 px-4 sm:px-5 py-2 font-pixel text-raidLime text-[0.65rem] sm:text-xs tracking-[0.3em] uppercase">
            ⚔️ Blockchain Raiders: Battle for Vitality
          </div>
          <h1 className="font-pixel text-3xl sm:text-4xl md:text-6xl text-white lore-glow">Play. Plunder. Vitality.</h1>
          <p className="font-ui text-sm sm:text-base md:text-lg text-raidText/80 max-w-3xl mx-auto">
            A browser-based PvP RPG built on Solana where customizable warriors clash in real-time battles, hunt Relics of the old world, and fight for fragments of Vitality.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-[0.65rem] sm:text-xs font-pixel uppercase text-raidText/70">
            <span className="rounded-full border border-raidText/30 bg-black/60 px-3 sm:px-4 py-1.5 sm:py-2">Network: Solana</span>
            <span className="rounded-full border border-raidText/30 bg-black/60 px-3 sm:px-4 py-1.5 sm:py-2">Token: $RAID</span>
          </div>
        </header>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl shadow-xl shadow-raidMagenta/10 backdrop-blur-lg overflow-hidden">
          <div className="grid md:grid-cols-[3fr_2fr] gap-0">
            <div className="p-6 sm:p-8 lg:p-10 space-y-6">
              <h2 className="font-pixel text-raidLime text-3xl">1. Intro</h2>
              <p className="font-ui text-raidText/85">
                In the aftermath of a fallen digital world, the last survivors — the Raiders — battle for fragments of Vitality, the energy that sustains existence on the chain.
              </p>
              <p className="font-ui text-raidText/80">
                Blockchain Raiders: Battle for Vitality ($RAID) is a browser-based PvP RPG forged on Solana. Command a customizable warrior, duel rivals in real-time, and claw your way up the leaderboards to claim relics of the old world.
              </p>
              <p className="font-ui text-raidText/80">
                The experience is fully web-based — no downloads, no wallet popups. Create an in-game account, fund it with $RAID, and step straight into combat.
              </p>
            </div>
            <div className="bg-gradient-to-br from-raidMagenta/10 via-raidMagenta/5 to-transparent p-6 sm:p-8 lg:p-10 border-t md:border-l border-raidMagenta/20">
              <h3 className="font-pixel text-raidLime text-xl mb-4">Core Facts</h3>
              <ul className="space-y-3 font-ui text-sm text-raidText/75">
                <li><span className="font-semibold text-white">Platform:</span> Browser-based PvP RPG on Solana.</li>
                <li><span className="font-semibold text-white">Tagline:</span> Play. Plunder. Vitality.</li>
                <li><span className="font-semibold text-white">Access:</span> Instant account creation, seamless $RAID deposits.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-10 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <header className="space-y-3">
            <h2 className="font-pixel text-raidLime text-3xl">2. Core Vision</h2>
            <p className="font-ui text-raidText/85">
              Blockchain Raiders merges on-chain competition with progression-heavy RPG systems so every duel, Relic, and shard of Vitality adds to your legend.
            </p>
            <p className="font-ui text-raidText/75">
              The aim: build a living, evolving PvP world that rewards mastery, ownership, and community warfare.
            </p>
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyPillars.map(({ title, description }) => (
              <div key={title} className="bg-black/40 border border-raidText/20 rounded-xl p-6 space-y-3">
                <h3 className="font-pixel text-raidLime text-lg">{title}</h3>
                <p className="font-ui text-sm text-raidText/75">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">3. Player Accounts &amp; Economy</h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="font-pixel text-white text-xl">3.1 Accounts</h3>
              <p className="font-ui text-raidText/80">
                Registration is frictionless: choose a username and password (no email required) and you can log in from any browser, desktop or mobile.
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 font-ui text-sm text-raidText/75">
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Balance of deposited $RAID</li>
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Character level &amp; Vitality totals</li>
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Equipped Relics and loadouts</li>
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Win/loss records &amp; duel history</li>
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Crafting inventory &amp; materials</li>
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Army membership &amp; shared perks</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-pixel text-white text-xl">3.2 Deposits &amp; Withdrawals</h3>
              <p className="font-ui text-raidText/80">
                Players deposit $RAID directly into their account wallet to fund duels, crafting, and upgrades. Balances remain verifiable through on-chain tracking, while the in-game ledger ensures instant matchmaking and payouts.
              </p>
              <p className="font-ui text-raidText/75">
                Withdrawals send $RAID straight back to the player’s Solana wallet, delivering the convenience of an account system without sacrificing token ownership.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">4. Gameplay Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-pixel text-white text-xl">4.1 The Core Loop</h3>
              <p className="font-ui text-raidText/80">
                Every action advances your Raider. Victories grant Vitality, losses drain it, and crafting transforms loot into enduring power.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-pixel text-white text-xl">4.2 Step-by-Step</h3>
              <ol className="font-ui text-sm text-raidText/75 space-y-2 list-decimal list-inside">
                <li>Create your Raider — choose a name, appearance, and starter gear.</li>
                <li>Fund your account with $RAID to enable battles and upgrades.</li>
                <li>Enter duels to challenge other players for Vitality and rewards.</li>
                <li>Earn Vitality, level up, and unlock new Relic slots.</li>
                <li>Craft and upgrade Relics to shape your combat style.</li>
                <li>Join an Army to wage seasonal wars for territory and prestige.</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <header className="space-y-3">
            <h2 className="font-pixel text-raidLime text-3xl">5. The Duel System</h2>
            <p className="font-ui text-raidText/80">
              The Duel Arena is the beating heart of Blockchain Raiders — stake $RAID, face a rival, and let your stats, Relics, and grit decide the outcome.
            </p>
          </header>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-pixel text-white text-lg">5.1 PvP Battles</h3>
              <ul className="font-ui text-sm text-raidText/75 space-y-3">
                <li><span className="font-semibold text-white">Combat Resolution:</span> Determined by character attributes, Relic buffs, and provable fairness on the backend.</li>
                <li><span className="font-semibold text-white">Arena Presentation:</span> 8-bit Pepe-style warriors clash across ruined castles, wastelands, and neon fortresses.</li>
                <li><span className="font-semibold text-white">Victory Rewards:</span> Winners seize $RAID and Vitality while losers forfeit their stake.</li>
                <li><span className="font-semibold text-white">Spectacle:</span> Slash trails, blood splatters, shields, and particle FX keep every duel cinematic.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-pixel text-white text-lg">5.2 Character Progression</h3>
              <ul className="font-ui text-sm text-raidText/75 space-y-3">
                <li><span className="font-semibold text-white">Leveling:</span> Vitality earned in battle levels up Attack, Defense, and Speed.</li>
                <li><span className="font-semibold text-white">Gear Unlocks:</span> Progress opens new weapon, armor, and Relic slots.</li>
                <li><span className="font-semibold text-white">Visual Evolution:</span> Raiders display upgraded gear, auras, and battle scars as they ascend.</li>
                <li><span className="font-semibold text-white">Future Relics:</span> Upcoming modifiers will introduce custom combat effects and strategic loadouts.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">6. Relics &amp; Crafting</h2>
          <div className="space-y-3">
            <h3 className="font-pixel text-white text-lg">6.1 What Are Relics?</h3>
            <p className="font-ui text-raidText/80">
              Relics are limited-supply NFTs salvaged from the ruins of Web3. Equip them for combat advantages, progression boosts, or pure flex value.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-raidText/20">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-raidText/20 text-sm">
                <thead className="bg-black/70 text-raidText/70 uppercase tracking-widest font-pixel text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Function</th>
                  </tr>
                </thead>
                <tbody className="bg-black/40">
                  {relicTypes.map(({ type, detail }) => (
                    <tr key={type} className="divide-x divide-raidText/10">
                      <td className="px-4 py-4 font-pixel text-white">{type}</td>
                      <td className="px-4 py-4 font-ui text-raidText/75">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/40 border border-raidText/20 rounded-xl p-6 space-y-3">
              <h3 className="font-pixel text-white text-lg">6.2 Crafting System</h3>
              <p className="font-ui text-sm text-raidText/75">
                Fuse Vitality, materials earned from duels, and sacrificial Relics to forge higher tiers. Crafting decisions branch into offensive, defensive, or utility builds.
              </p>
              <ul className="font-ui text-xs text-raidText/60 space-y-2 uppercase tracking-[0.2em]">
                <li>Costs Vitality + crafting materials</li>
                <li>Can consume lower-tier Relics for fusion</li>
                <li>Unlocks unique passives and visuals</li>
              </ul>
            </div>
            <div className="bg-black/40 border border-raidText/20 rounded-xl p-6 space-y-3">
              <h3 className="font-pixel text-white text-lg">6.3 Upgrading &amp; Durability</h3>
              <p className="font-ui text-sm text-raidText/75">
                Relics evolve alongside your Raider. Upgrades alter appearance, improve stats, and introduce durability that encourages ongoing crafting and market play.
              </p>
              <p className="font-ui text-xs text-raidText/60 uppercase tracking-[0.2em]">
                Trade, upgrade, or burn Relics to shape the economy.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">7. Vitality System</h2>
          <p className="font-ui text-raidText/80">
            Vitality is the energy that powers Blockchain Raiders. It fuels crafting, unlocks arenas, and determines your standing on leaderboards and within Armies.
          </p>
          <ul className="font-ui text-sm text-raidText/75 space-y-3">
            <li><span className="font-semibold text-white">Craft &amp; Upgrade:</span> Spend Vitality to forge and enhance Relics.</li>
            <li><span className="font-semibold text-white">Rank &amp; Access:</span> High Vitality unlocks advanced arenas, seasonal events, and guild privileges.</li>
            <li><span className="font-semibold text-white">Risk &amp; Reward:</span> Defeats can drain Vitality, making every duel meaningful.</li>
          </ul>
          <div className="grid sm:grid-cols-3 gap-4">
            {vitalityGain.map(({ action, gain }) => (
              <div key={action} className="bg-black/40 border border-raidText/20 rounded-lg p-4 space-y-2">
                <p className="font-pixel text-white text-sm">{action}</p>
                <p className="font-ui text-xs text-raidText/60 uppercase tracking-[0.3em]">{gain}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">8. Armies (Guilds)</h2>
          <p className="font-ui text-raidText/80">
            Armies are Raider collectives that coordinate strategy, share resources, and wage large-scale wars for territory control.
          </p>
          <ul className="font-ui text-sm text-raidText/75 space-y-3">
            <li><span className="font-semibold text-white">Collective Vitality Pool:</span> Contributions power shared buffs and unlock faction-wide perks.</li>
            <li><span className="font-semibold text-white">Army Battles:</span> Team-based PvP events pit guilds against one another for trophies and Relics.</li>
            <li><span className="font-semibold text-white">Army Relics:</span> Exclusive upgrades forged through group effort that alter the meta.</li>
            <li><span className="font-semibold text-white">Seasonal Wars:</span> Top Armies seize limited-time territories on the world map.</li>
          </ul>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">9. Leaderboards &amp; Seasons</h2>
          <p className="font-ui text-raidText/80">
            Every season refreshes the battlefield with new Relics, map shifts, and balance updates before crowning the top Raiders and Armies.
          </p>
          <ul className="font-ui text-sm text-raidText/75 space-y-3">
            <li><span className="font-semibold text-white">Individual Rankings:</span> Track PvP dominance through $RAID earned and Vitality secured.</li>
            <li><span className="font-semibold text-white">Army Rankings:</span> Aggregate results from every member to climb the faction ladder.</li>
            <li><span className="font-semibold text-white">Seasonal Rewards:</span> $RAID prizes, unique Relics, and on-chain titles immortalize champions.</li>
          </ul>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <header className="space-y-3">
            <h2 className="font-pixel text-raidLime text-3xl">10. The Demo (MVP)</h2>
            <p className="font-ui text-raidText/80">
              The demo showcases the feel of PvP combat, UI flow, and 8-bit art direction. It mirrors how the full release will play while the blockchain infrastructure comes online.
            </p>
          </header>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-black/40 border border-raidText/20 rounded-xl p-6 space-y-3">
              <h3 className="font-pixel text-white text-xl">Features Included</h3>
              <ul className="font-ui text-sm text-raidText/75 space-y-2">
                {demoFeatures.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-black/40 border border-raidText/20 rounded-xl p-6 space-y-3">
              <h3 className="font-pixel text-white text-xl">Not Included Yet</h3>
              <ul className="font-ui text-sm text-raidText/75 space-y-2">
                {demoFeatures.excluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">11. Development Pipeline</h2>
          <div className="grid gap-4">
            {developmentPipeline.map(({ feature, description, status }) => (
              <div key={feature} className="bg-black/40 border border-raidText/20 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-pixel text-white text-lg">{feature}</h3>
                  <p className="font-ui text-sm text-raidText/70">{description}</p>
                </div>
                <span className="font-pixel text-xs uppercase tracking-[0.35em] text-raidLime border border-raidLime/40 rounded-full px-4 py-2 text-center">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <header className="space-y-3">
            <h2 className="font-pixel text-raidLime text-3xl">12. Token Utility ($RAID)</h2>
            <p className="font-ui text-raidText/80">
              $RAID is the lifeblood of Blockchain Raiders — every duel, upgrade, and season funnels through this token to keep the ecosystem balanced and player-driven.
            </p>
          </header>
          <div className="grid md:grid-cols-2 gap-6">
            {tokenUtility.map(({ utility, description }) => (
              <div key={utility} className="bg-black/40 border border-raidText/20 rounded-xl p-6 space-y-3">
                <h3 className="font-pixel text-white text-lg">{utility}</h3>
                <p className="font-ui text-sm text-raidText/75">{description}</p>
              </div>
            ))}
          </div>
          <div className="bg-black/40 border border-raidText/20 rounded-xl p-6 space-y-3">
            <h3 className="font-pixel text-white text-lg">Token Flow Snapshot</h3>
            <ol className="font-ui text-sm text-raidText/75 space-y-2 list-decimal list-inside">
              <li>Players deposit $RAID to fund battles.</li>
              <li>Duels and crafting spend $RAID + Vitality.</li>
              <li>Fees feed Army treasuries, jackpots, and burn mechanics.</li>
              <li>Winners earn $RAID rewards alongside Vitality.</li>
              <li>The loop sustains growth while rewarding active Raiders.</li>
            </ol>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">13. Lore Snapshot</h2>
          <blockquote className="bg-black/40 border border-raidLime/40 rounded-xl p-6 font-pixel text-xl text-raidLime leading-relaxed">
            “In the ashes of broken blockchains, the last of humanity fights for what remains — Vitality, the power to exist.
            Raiders are the few who dare to wield it.
            Every victory gives life. Every defeat drains it.”
          </blockquote>
          <p className="font-ui text-raidText/80">
            The world of Blockchain Raiders is a medieval-metaverse hybrid where meme warriors reclaim forgotten servers. Each Relic unearthed, duel fought, and territory seized writes the next chapter of this on-chain saga.
          </p>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">14. Conclusion</h2>
          <p className="font-ui text-raidText/80">
            Blockchain Raiders: Battle for Vitality isn’t a casino — it’s an evolving PvP RPG that rewards strategy, progression, and courage. With Solana at its core, the game fuses competitive battles, Relic-based customization, and provable fairness into a seamless browser experience.
          </p>
          <p className="font-pixel text-white text-lg uppercase tracking-[0.35em]">
            Play. Plunder. Vitality. The battle for the chain has only begun.
          </p>
        </section>
      </main>
    </div>
  );
}
