// pages/index.js
import FireOverlay from '@/components/FireOverlay';
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
  const ogImage = `${siteUrl}/og.jpg`; // ensure this exists in /public/og.jpg

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasHash = !!window.location.hash;
    if (!hasHash && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        {siteUrl && <meta property="og:url" content={siteUrl} />}
        {siteUrl && <meta property="twitter:url" content={siteUrl} />}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:image" content={ogImage} />
        <link rel="preload" as="image" href="/img/torch_bg_4k.png" />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>  
      {/* Fixed background + gradient stays put while sections scroll */}
      <img
        src="/img/torch_bg_4k.png"
        alt="Pixel dungeon wall with torches"
        className="pointer-events-none fixed inset-0 w-full h-full object-cover object-top"
        style={{ imageRendering: 'pixelated' }}
        draggable={false}
      />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

      {/* Snap scroll container */}
      <div ref={containerRef} className="relative z-10 h-screen overflow-y-auto snap-y snap-mandatory" role="main">
      <FireOverlay scope="section" z="z-10" density={32} speed={9} />
 {/* SECTION 1: HERO */}
        <section className="svh min-h-screen snap-start flex items-center relative overflow-hidden" aria-label="Hero">
          {/* Fighters behind the hero content */}
         <PepeDuelClash
  className="absolute inset-0 z-0"
  leftSrc="/img/pepeswordknightleftleft.png"
  rightSrc="/img/pepeswordknightright.png"
  clashAt={1.1}     // rush-in
  hold={12}         // keep them in place ~12s
  retreat={6}       // slow slide off
  safePercent={18}  // stop before hero content
  rightNudge={5}    // bring right closer to center
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

            <div className="mt-6 flex items-center gap-3" aria-hidden="true">
              <Image src="/img/token_coin.png" width={32} height={32} className="glow" alt="" />
              <span className="font-pixel text-raidGold text-base md:text-lg">Play. Plunder. Vitality.</span>
            </div>

            <a href="#lore" className="mt-8 font-pixel text-raidLime text-xs opacity-70 hover:opacity-100">
              ▼ Scroll
            </a>
          </main>
        </section>

        {/* SECTION 2: LORE */}

        <section id="lore" className="svh min-h-screen snap-start flex items-center" aria-label="Our Story">
          <div className="w-full">
            <section className="max-w-4xl mx-auto px-6 pb-24 relative text-center overflow-hidden">
              {/* floating embers */}
              <div className="absolute inset-0 pointer-events-none motion-safe:block motion-reduce:hidden">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-raidGold rounded-full opacity-70"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: 'floatDrift 6s ease-in-out infinite',
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>


              <h2 className="font-pixel text-raidLime text-2xl mb-6 lore-glow relative z-10">OUR STORY</h2>

              <div className="font-ui text-raidText/90 leading-relaxed space-y-5 relative z-10">
                <p>
                  When the old chains cracked, we watched the markets fall silent. Everything that once held value turned to dust, but we saw something left behind in the ruins.
                </p>
                <p>
                  We are the <span className="text-raidLime font-bold">Raiders</span>. We built from memes, coded through chaos, and forged relics of <span className="text-raidMagenta">Vitality</span> from broken blocks.
                </p>
                <p>
                  Every duel is a risk, every relic tells a story. When we win, we grow stronger. When we lose, we learn — and we raid again.
                </p>
                <p>
                  This isn’t just another game to us. It’s a new frontier for those bold enough to <span className="text-raidGold font-bold">play, plunder, and rebuild the future</span> from what was lost.
                </p>
              </div>
            </section>
          </div>
        </section>
 
        {/* SECTION 3: MODES */}
        <section className="svh min-h-screen snap-start flex items-center" aria-label="Game Modes">
          <div className="w-full max-w-6xl mx-auto px-6">
            <h2 className="font-pixel text-raidLime text-2xl mb-8 lore-glow text-center">GAME MODES</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { title: 'Treasure Drop', desc: 'Provably-fair Plinko' },
                { title: 'Raid Duels', desc: 'PvP fair coinflip' },
                { title: 'Wheel of Fate', desc: 'Spin. Pray.' },
                { title: 'Rocket Raid', desc: 'Ride or rekt' },
                { title: 'Temple Trials', desc: 'Memory of the chain' },
              ].map((m) => (
                <div key={m.title} className="p-4 rounded card-border bg-black/40 text-center">
                  <div className="font-pixel text-raidGold text-sm mb-2">{m.title}</div>
                  <div className="text-raidText/70 text-sm">{m.desc}</div>
                  <div className="mt-3 text-raidMagenta text-xs font-pixel opacity-75">Coming soon</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: FOOTER / COMMUNITY */}
        <section className="svh min-h-screen snap-start flex items-center" aria-label="Community">
          <footer className="w-full max-w-4xl mx-auto px-6 text-center">
            <h3 className="font-pixel text-raidLime text-xl mb-6 lore-glow">JOIN THE RAID</h3>
            <p className="font-ui text-raidText/80 mb-6">
              Follow the campaign, claim early relics, and be first to play.
            </p>
            <div className="flex items-center justify-center gap-6">
              <a href="#" className="font-pixel text-raidGold hover:neon">Discord</a>
              <a href="#" className="font-pixel text-raidGold hover:neon">X / Twitter</a>
              <a href="/hub" className="font-pixel text-raidGold hover:neon">Game Hub</a>
            </div>
            <div className="mt-10 text-raidText/50 text-xs">© 2025 Blockchain Raiders — Built on Solana</div>
          </footer>
        </section>
      </div>
    </div>
  );
}
