import Head from 'next/head';
import Topbar from '@/components/Topbar';

const keyPillars = [
  {
    title: 'PvP-First Gameplay',
    description: 'Real opponents, high-stakes clashes, zero house edge.'
  },
  {
    title: 'Provable Fairness',
    description: 'Every battle outcome is transparently verifiable on-chain.'
  },
  {
    title: 'Progression',
    description: 'Earn Vitality and Relics to strengthen your Raider over time.'
  },
  {
    title: 'Instant Accessibility',
    description: 'Fully web-based experience — no downloads, no wallet popups.'
  },
  {
    title: 'Sustainable Token Loop',
    description: '$RAID fuels wagers, rewards, upgrades, and crafting.'
  }
];

const gameModes = [
  {
    mode: 'Raid Duels',
    description: '1v1 PvP battles with Relic modifiers and provable fairness.',
    type: 'PvP'
  },
  {
    mode: 'Treasure Drop',
    description: 'Precision-based Plinko descent for loot.',
    type: 'PvE / PvP'
  },
  {
    mode: 'Wheel of Fate',
    description: 'Roulette-style PvP spin with shared pots.',
    type: 'PvP'
  },
  {
    mode: 'Temple Trials',
    description: 'Hi-Lo ladder for skillful prediction runs.',
    type: 'PvE'
  },
  {
    mode: 'Rocket Raid',
    description: 'Multiplayer crash mode where players must eject before impact.',
    type: 'PvP'
  },
  {
    mode: 'Jackpot',
    description: 'Progressive prize pool that builds across modes.',
    type: 'PvP'
  }
];

const futurePipeline = [
  {
    feature: 'Live PvP with Deposits',
    description: 'Full backend integration with Solana deposits and withdrawals.',
    status: 'In Progress'
  },
  {
    feature: 'Relic Crafting System',
    description: 'Combine Relics + Vitality to upgrade items.',
    status: 'In Design'
  },
  {
    feature: 'Armies / Guilds',
    description: 'Group-based leaderboards and tournaments.',
    status: 'In Design'
  },
  {
    feature: 'Jackpot Pools',
    description: 'Global prize pot fed by each duel.',
    status: 'Planned'
  },
  {
    feature: 'Rakeback System',
    description: 'Reward active Raiders with rake returns.',
    status: 'Planned'
  },
  {
    feature: 'Arena Tournaments',
    description: 'Scheduled large-scale PvP events.',
    status: 'Planned'
  },
  {
    feature: 'Daily Quests & Rewards',
    description: 'Missions granting Vitality or Relic shards.',
    status: 'Planned'
  },
  {
    feature: 'Player Marketplace',
    description: 'Trade, buy, and sell Relics.',
    status: 'Planned'
  },
  {
    feature: 'Lore Codex',
    description: 'Expand world narrative with collectible storylines.',
    status: 'Ongoing'
  }
];

const vitalityGain = [
  { action: 'Winning a Duel', gain: 'Moderate' },
  { action: 'Participating in Matches', gain: 'Small' },
  { action: 'Crafting or Upgrading Relics', gain: 'Medium' },
  { action: 'Seasonal Achievements', gain: 'Large' }
];

const tokenUtility = [
  {
    utility: 'Primary Currency',
    description: 'All wagers, deposits, and rewards are in $RAID.'
  },
  {
    utility: 'Crafting Material',
    description: 'Required for Relic fusion and upgrades.'
  },
  {
    utility: 'Staking & Yield',
    description: 'Future Relic staking and jackpot contribution system.'
  },
  {
    utility: 'Governance (Future)',
    description: 'Voting rights on economy and season balancing.'
  }
];

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

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 space-y-16">
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-raidMagenta/60 bg-black/70 px-5 py-2 font-pixel text-raidLime text-xs tracking-[0.3em] uppercase">
            ⚔️ Blockchain Raiders: Battle for Vitality
          </div>
          <h1 className="font-pixel text-5xl md:text-6xl text-white lore-glow">Play. Plunder. Vitality.</h1>
          <p className="font-ui text-base md:text-lg text-raidText/80 max-w-3xl mx-auto">
            A browser-based on-chain PvP world forged on Solana where Raiders fight for honor, $RAID, and relics in a dark, meme-fueled medieval frontier.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-pixel uppercase text-raidText/70">
            <span className="rounded-full border border-raidText/30 bg-black/60 px-4 py-2">Network: Solana</span>
            <span className="rounded-full border border-raidText/30 bg-black/60 px-4 py-2">Token: $RAID</span>
          </div>
        </header>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl shadow-xl shadow-raidMagenta/10 backdrop-blur-lg overflow-hidden">
          <div className="grid md:grid-cols-[3fr_2fr] gap-0">
            <div className="p-10 space-y-6">
              <h2 className="font-pixel text-raidLime text-3xl">1. Introduction</h2>
              <p className="font-ui text-raidText/85">
                In the ruins of Web3, a new order rises. Blockchain Raiders: Battle for Vitality ($RAID) delivers a high-impact PvP experience straight to your browser — no downloads, no wallet popups. Create an account, deposit $RAID directly, and drop into the arena in seconds.
              </p>
              <p className="font-ui text-raidText/80">
                The mandate is simple: defeat rivals, earn Vitality, and climb the Raider ladder while carving a legend across the Solana frontier.
              </p>
            </div>
            <div className="bg-gradient-to-br from-raidMagenta/10 via-raidMagenta/5 to-transparent p-10 border-t md:border-l border-raidMagenta/20">
              <h3 className="font-pixel text-raidLime text-xl mb-4">Core Facts</h3>
              <ul className="space-y-3 font-ui text-sm text-raidText/75">
                <li><span className="font-semibold text-white">Platform:</span> Browser-based, Solana-powered PvP.</li>
                <li><span className="font-semibold text-white">Focus:</span> Skill-driven combat with real value on the line.</li>
                <li><span className="font-semibold text-white">Access:</span> Instant account creation, seamless deposits & withdrawals.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-10 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <header className="space-y-3">
            <h2 className="font-pixel text-raidLime text-3xl">2. Core Vision</h2>
            <p className="font-ui text-raidText/85">
              Blockchain Raiders fuses competitive PvP gameplay, provably fair wagering, and collectible-driven progression into a unified, living ecosystem.
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

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">3. Account & Economy System</h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-pixel text-white text-xl">3.1 Player Accounts</h3>
              <p className="font-ui text-raidText/80">
                Every Raider operates from a secure, on-site account designed for instant play and transparent bankroll management.
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 font-ui text-sm text-raidText/75">
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Username &amp; Password Login (no email required)</li>
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Balance tracking for deposited $RAID</li>
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Vitality progression metrics</li>
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Relics &amp; inventory management</li>
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Battle history &amp; leaderboard stats</li>
                <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Frictionless deposits &amp; withdrawals</li>
              </ul>
            </div>
            <p className="font-ui text-raidText/75">
              Direct $RAID deposits eliminate browser wallet prompts while maintaining on-chain verifiability for every match and wager.
            </p>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-6 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">4. Core Gameplay Loop</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-pixel text-white text-xl">4.1 The Objective</h3>
              <p className="font-ui text-raidText/80">
                Challenge other Raiders in duels and modes to win $RAID and Vitality — the lifeblood that fuels crafting, unlocks features, and elevates your standing.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-pixel text-white text-xl">4.2 Game Flow</h3>
              <ol className="font-ui text-sm text-raidText/75 space-y-2 list-decimal list-inside">
                <li>Deposit $RAID into your account.</li>
                <li>Enter a Duel or Mini-Game mode.</li>
                <li>Select your wager amount.</li>
                <li>Battle to a win, loss, or draw.</li>
                <li>Earn Vitality &amp; rewards.</li>
                <li>Ascend the leaderboards.</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <header className="space-y-3">
            <h2 className="font-pixel text-raidLime text-3xl">5. PvP Duels (⚔️ Raid Duels)</h2>
            <p className="font-ui text-raidText/80">
              The core experience features high-intensity 1v1 auto-battles starring animated 8-bit Raiders, slash effects, shields, and blood-splattered finishes.
            </p>
          </header>
          <ul className="font-ui text-sm text-raidText/75 space-y-3">
            <li><span className="font-semibold text-white">Matchmaking:</span> Pairings based on wager size and availability.</li>
            <li><span className="font-semibold text-white">Fairness:</span> Server-side provably fair rolls remove human bias.</li>
            <li><span className="font-semibold text-white">Spectacle:</span> Battles unfold in the Arena Viewport with crisp pixel art FX.</li>
            <li><span className="font-semibold text-white">Rewards:</span> Victors earn $RAID and Vitality, with future Relic modifiers unlocking deeper strategy.</li>
          </ul>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">6. Game Modes</h2>
          <div className="overflow-hidden rounded-xl border border-raidText/20">
            <table className="min-w-full divide-y divide-raidText/20 text-sm">
              <thead className="bg-black/70 text-raidText/70 uppercase tracking-widest font-pixel text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Mode</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Type</th>
                </tr>
              </thead>
              <tbody className="bg-black/40">
                {gameModes.map(({ mode, description, type }) => (
                  <tr key={mode} className="divide-x divide-raidText/10">
                    <td className="px-4 py-4 font-pixel text-white">{mode}</td>
                    <td className="px-4 py-4 font-ui text-raidText/75">{description}</td>
                    <td className="px-4 py-4 font-ui text-raidText/60">{type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">7. Relics &amp; Crafting</h2>
          <p className="font-ui text-raidText/80">
            Relics are limited-supply NFTs unearthed from the ruins of Web3. They deliver combat buffs, passive bonuses, cosmetic flair, and even Vitality yield.
          </p>
          <ul className="grid md:grid-cols-2 gap-4 font-ui text-sm text-raidText/75">
            <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Buffs: increase win probability or reward multipliers.</li>
            <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Crafting: combine materials + Vitality to forge higher-tier Relics.</li>
            <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Cosmetics: customize your Raider’s armor, weaponry, and aura.</li>
            <li className="bg-black/40 border border-raidText/20 rounded-lg p-4">Yield: stakeable Relics generate Vitality over time.</li>
          </ul>
          <p className="font-ui text-raidText/70">
            Every Relic can be traded, upgraded, or burned as part of the evolving item economy.
          </p>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-6 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">8. Vitality System</h2>
          <p className="font-ui text-raidText/80">
            Vitality measures your Raider’s progression. It gates tournaments, powers crafting, and signals guild strength across seasons.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {vitalityGain.map(({ action, gain }) => (
              <div key={action} className="bg-black/40 border border-raidText/20 rounded-lg p-4">
                <p className="font-pixel text-white text-sm">{action}</p>
                <p className="font-ui text-xs text-raidText/60 uppercase tracking-widest">{gain} Vitality Gain</p>
              </div>
            ))}
          </div>
          <p className="font-ui text-raidText/70">
            Accumulate Vitality to unlock exclusive events, high-stakes arenas, and Relic crafting blueprints.
          </p>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-6 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">9. Leaderboards &amp; Seasons</h2>
          <p className="font-ui text-raidText/80">
            Seasonal resets keep the competition fresh, rewarding both individual dominance and collective guild supremacy.
          </p>
          <ul className="font-ui text-sm text-raidText/75 space-y-3">
            <li><span className="font-semibold text-white">Individual Rankings:</span> Track PvP win streaks, Vitality, and $RAID earnings.</li>
            <li><span className="font-semibold text-white">Army (Guild) Rankings:</span> Aggregate performance from every member.</li>
            <li><span className="font-semibold text-white">Seasonal Rewards:</span> Unique Relics, $RAID bonuses, and prestige titles await top Raiders.</li>
          </ul>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <header className="space-y-3">
            <h2 className="font-pixel text-raidLime text-3xl">10. The Demo (MVP Build)</h2>
            <p className="font-ui text-raidText/80">
              Our MVP highlights the combat feel, UI language, and 8-bit aesthetic of Blockchain Raiders while backend integrations lock into place.
            </p>
          </header>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-black/40 border border-raidText/20 rounded-xl p-6 space-y-3">
              <h3 className="font-pixel text-white text-xl">Features Included</h3>
              <ul className="font-ui text-sm text-raidText/75 space-y-2">
                <li>Arena battle viewport with animated Pepe warriors.</li>
                <li>Player vs Player matchmaking (local / mock).</li>
                <li>Combat FX: slash, shield, and blood splatter.</li>
                <li>Result banner with victory or defeat outcomes.</li>
                <li>HUD showcasing XP, balance, and battle history.</li>
                <li>Static leaderboard and username/password login.</li>
              </ul>
            </div>
            <div className="bg-black/40 border border-raidText/20 rounded-xl p-6 space-y-3">
              <h3 className="font-pixel text-white text-xl">Features Reserved for Full Launch</h3>
              <ul className="font-ui text-sm text-raidText/75 space-y-2">
                <li>On-chain match logging.</li>
                <li>Live $RAID wagers &amp; deposits.</li>
                <li>NFT Relic integration and progression.</li>
                <li>Guilds / Army systems.</li>
                <li>Rakeback and jackpot pools.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">11. Future Development Pipeline</h2>
          <div className="grid gap-4">
            {futurePipeline.map(({ feature, description, status }) => (
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

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-8 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <header className="space-y-3">
            <h2 className="font-pixel text-raidLime text-3xl">12. Token Utility ($RAID)</h2>
            <p className="font-ui text-raidText/80">
              $RAID is the lifeblood of Blockchain Raiders — the currency, the upgrade material, and the reward structure that sustains the arena.
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
            <h3 className="font-pixel text-white text-lg">Token Flow Example</h3>
            <ol className="font-ui text-sm text-raidText/75 space-y-2 list-decimal list-inside">
              <li>Player deposits $RAID.</li>
              <li>Enters duels or modes.</li>
              <li>Portions of fees feed jackpot and burn pools.</li>
              <li>Winners receive $RAID + Vitality.</li>
              <li>The loop fuels ongoing ecosystem growth.</li>
            </ol>
          </div>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-6 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">13. Lore Snapshot</h2>
          <blockquote className="bg-black/40 border border-raidLime/40 rounded-xl p-6 font-pixel text-xl text-raidLime leading-relaxed">
            “In the ashes of the old Web3 world, Raiders rise. They fight not for glory, but for Vitality — the only power that endures.”
          </blockquote>
          <p className="font-ui text-raidText/80">
            Blockchain Raiders unfolds across a medieval-metaverse hybrid where meme-forged warriors battle through forgotten chains in search of lost energy. Each duel, Relic, and victory unlocks another shard of this fractured digital kingdom.
          </p>
        </section>

        <section className="bg-black/60 border border-raidMagenta/30 rounded-2xl p-10 space-y-6 shadow-xl shadow-raidMagenta/10 backdrop-blur-lg">
          <h2 className="font-pixel text-raidLime text-3xl">14. Conclusion</h2>
          <p className="font-ui text-raidText/80">
            Blockchain Raiders is a competitive on-chain arena — not a casino. By prioritizing PvP combat, player progression, and provable fairness, it bridges the best of Web3 and traditional competitive gaming directly in your browser.
          </p>
          <p className="font-pixel text-white text-lg uppercase tracking-[0.35em]">
            This is the beginning of a new order. Play. Plunder. Vitality.
          </p>
        </section>
      </main>
    </div>
  );
}
