// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import PepeDuelClash from '@/components/PepeDuelClash';
import { useEffect, useRef } from 'react';
import HeaderLogo from '@/components/HeaderLogo';
import Countdown from '@/components/Countdown';
import JoinRaidlist from '@/components/JoinRaidlist';

export default function Home() {
  const containerRef = useRef(null);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const title = 'Blockchain Raiders: Battle for Vitality — Official Teaser';
  const description = 'A fully web-native, provably-fair PvP experience on Solana. Play. Plunder. Vitality.';
  const ogImage = `${siteUrl}/og.jpg`;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasHash = !!window.location.hash;
    if (!hasHash && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, []);

  // Clean, minimal card container — flat and consistent
  const CardShell = ({ children }) => (
    <div className="p-4 rounded-xl border border-white/10 bg-transparent text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-raidMagenta/40">
      {children}
    </div>
  );

  const ImageWell = ({ src, alt, size = 200 }) => (
    <div className="flex items-center justify-center mb-3">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ imageRendering: 'pixelated', height: 'auto', maxWidth: `${size}px` }}
      />
    </div>
  );

  const HowStep = ({ title, color, img, desc }) => (
    <CardShell>
      <ImageWell src={img} alt={title} size={180} />
      <div className={`font-pixel ${color} text-base tracking-wide mb-1`}>{title}</div>
      <p className="text-raidText/70 text-sm font-ui">{desc}</p>
    </CardShell>
  );

  const ModeCard = ({ title, desc, img }) => (
    <CardShell>
      <ImageWell src={img} alt={title} size={200} />
      <div className="font-pixel text-raidGold text-sm mb-1">{title}</div>
      <div className="text-raidText/70 text-sm">{desc}</div>
      <div className="mt-2 font-pixel text-raidMagenta text-[11px] opacity-80 tracking-wide">Coming soon</div>
    </CardShell>
  );

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f0f0f" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        {siteUrl && <meta property="og:url" content={siteUrl} />}
        {siteUrl && <meta property="twitter:url" content={siteUrl} />}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:image" content={ogImage} />
        <link rel="icon" href="/img/favicon.ico" />
        <link rel="icon" href="/img/favicon.webp" type="image/webp" />
        <link rel="preload" as="image" href="/img/torch_bg_4k.png" />
      </Head>

      {/* Background */}
      <img
        src="/img/torch_bg_4k.png"
        alt="Pixel dungeon wall"
        className="fixed inset-0 w-full h-full object-cover object-top"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Scroll container */}
      <div
        id="mainScroll"
        ref={containerRef}
        className="relative z-10 h-screen overflow-y-auto snap-y snap-mandatory"
        role="main"
      >
        {/* HERO */}
        <section className="svh min-h-screen snap-start flex items-center relative overflow-hidden" aria-label="Hero">
          <PepeDuelClash
            className="absolute inset-0 z-0"
            leftSrc="/img/pepeswordknightleftleft.png"
            rightSrc="/img/pepeswordknightright.png"
            clashAt={1.1}
            hold={12}
            retreat={6}
            safePercent={18}
            rightNudge={5}
          />
          <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-8">
            <HeaderLogo />
            <p className="font-ui text-raidText/90 text-lg md:text-xl text-center max-w-2xl">
              In the ruins of Web3, a new order rises…{' '}
              <span className="text-raidLime font-semibold">The Raiders</span>.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Countdown target={new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString()} />
              <JoinRaidlist />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Image src="/img/token_coin.png" width={32} height={32} className="glow" alt="" />
              <span className="font-pixel text-raidGold text-base md:text-lg">Play. Plunder. Vitality.</span>
            </div>
            <a href="#how" className="mt-8 font-pixel text-raidLime text-xs opacity-70 hover:opacity-100">
              ▼ Scroll
            </a>
          </main>
        </section>

        {/* HOW IT WORKS + FAIRNESS + GAME MODES */}
        <section id="how" className="svh min-h-screen snap-start flex items-center" aria-label="How It Works">
          <div className="w-full max-w-6xl mx-auto px-6">
            <h2 className="font-pixel text-raidLime text-3xl mb-6 lore-glow text-center">HOW IT WORKS</h2>

            <div className="grid gap-4 sm:grid-cols-3 place-items-center max-w-5xl mx-auto">
              <HowStep
                title="CONNECT"
                color="text-raidLime"
                img="/img/how/connectsol.png"
                desc="Link your Solana wallet or campaign login."
              />
              <HowStep
                title="CHOOSE & STAKE"
                color="text-raidGold"
                img="/img/how/choose.png"
                desc="Pick a mode, set your $RAID stake, and ready up."
              />
              <HowStep
                title="PLAY & VERIFY"
                color="text-raidMagenta"
                img="/img/how/win.png"
                desc="Outcomes are instant and provably fair on-chain."
              />
            </div>

            {/* PROVABLE FAIRNESS */}
            <div id="fairness" className="text-center max-w-4xl mx-auto mt-8">
              <h3 className="font-pixel text-raidLime text-xl mb-3 lore-glow">PROVABLE FAIRNESS</h3>
              <p className="font-ui text-raidText/80 mb-4 text-sm">
                Each round is generated using a verifiable <strong>server seed</strong>, <strong>client seed</strong>, and{' '}
                <strong>nonce</strong>. The server seed is hashed before play and revealed after, so anyone can verify fairness.
              </p>
              <CardShell>
                <div className="font-mono text-raidText/70 text-xs text-left">
                  serverSeedHash: <span className="text-raidGold">"b3f...8e9"</span><br />
                  clientSeed:&nbsp;&nbsp;&nbsp;<span className="text-raidLime">"raider123"</span><br />
                  nonce:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-raidMagenta">42</span>
                </div>
              </CardShell>
              <p className="text-xs mt-2 opacity-60">Verify results in-game or independently.</p>
            </div>

            {/* GAME MODES */}
            <div aria-label="Game Modes" className="mt-8">
              <h3 className="font-pixel text-raidLime text-2xl mb-8 lore-glow text-center">GAME MODES</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { title: 'Treasure Drop', desc: 'Provably-fair Plinko', img: '/img/modes/TreasureDrop.png' },
                  { title: 'Raid Duels', desc: 'PvP fair coinflip', img: '/img/modes/duel.png' },
                  { title: 'Wheel of Fate', desc: 'Spin. Pray.', img: '/img/modes/wof.png' },
                  { title: 'Rocket Raid', desc: 'Ride or rekt', img: '/img/modes/RocketRaid.png' },
                  { title: 'Temple Trials', desc: 'Memory of the chain', img: '/img/modes/TempleTrials.png' },
                ].map((m) => (
                  <ModeCard key={m.title} {...m} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RELICS */}
        <section id="relics" className="svh min-h-screen snap-start flex items-center" aria-label="Relics">
          <div className="w-full max-w-6xl mx-auto px-6 text-center">
            <h2 className="font-pixel text-raidLime text-2xl mb-8 lore-glow">RELICS</h2>
            <p className="font-ui text-raidText/80 mb-10">
              Relics are limited NFTs granting buffs, crafting paths, and visual effects.&nbsp;
              Buffs are <span className="text-raidGold font-semibold">capped</span> and{' '}
              <span className="text-raidMagenta font-semibold">transparent</span>.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {['flame_sigil', 'ember_talisman', 'void_ring', 'coin_crown'].map((r) => (
                <CardShell key={r}>
                  <img
                    src={`/img/relics/${r}.png`}
                    alt={r}
                    className="mx-auto w-24 h-24 object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div className="font-pixel text-raidGold mt-3 capitalize">{r.replace('_', ' ')}</div>
                  <div className="text-raidText/70 text-xs">Legendary Craft Item</div>
                </CardShell>
              ))}
            </div>
          </div>
        </section>

        {/* COMMUNITY */}
        <section className="svh min-h-screen snap-start flex items-center" aria-label="Community">
          <footer className="w-full max-w-4xl mx-auto px-6 text-center">
            <h3 className="font-pixel text-raidLime text-xl mb-6 lore-glow">JOIN THE RAID</h3>
            <p className="font-ui text-raidText/80 mb-6">
              Follow the campaign, claim early relics, and be first to play.
            </p>
            <div className="flex items-center justify-center gap-6">
              <a href="https://discord.gg/3xUCP2nH" target="_blank" rel="noreferrer" className="font-pixel text-raidGold hover:neon">Discord</a>
              <a href="https://t.me/+2XQ3CRHbRGc4YmY0" target="_blank" rel="noreferrer" className="font-pixel text-raidGold hover:neon">Telegram</a>
              <a href="/hub" className="font-pixel text-raidGold hover:neon">Game Hub</a>
            </div>
            <div className="mt-10 text-raidText/50 text-xs">© 2025 Blockchain Raiders — Built on Solana</div>
          </footer>
        </section>
      </div>
    </div>
  );
}
