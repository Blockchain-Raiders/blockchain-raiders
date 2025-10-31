// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import PepeDuelClash from '@/components/PepeDuelClash';
import { useEffect, useRef, useState } from 'react';
import HeaderLogo from '@/components/HeaderLogo';
import Countdown from '@/components/Countdown';
import ReadyRaidButton from '@/components/ReadyRaidButton';
import Topbar from '@/components/Topbar';
import ModesRail from '@/components/ModesRail';
import Divider from '@/components/Divider';

// ===== Shared Step-style Tile (custom corner color & image size) =====
const Tile = ({
  border = 'rgba(236,72,153,0.45)',
  aura = 'rgba(236,72,153,0.25)',
  underline = 'rgba(236,72,153,0.8)',
  cornerColor = 'rgba(236,72,153,0.6)',
  imageMax = 384, // uniform image size
  className = '',
  badge,
  image,
  title,
  subtitle,
  children,
}) => (
  <div
    className={`relative overflow-hidden rounded-xl border bg-transparent text-center ${className}`}
    style={{
      borderColor: border,
      boxShadow: `0 0 0 1px ${border.replace('0.45', '0.30')}, 0 0 40px 12px ${border.replace(
        '0.45',
        '0.18'
      )}`,
    }}
  >
    {/* Corner pixels */}
    <div className="pointer-events-none absolute inset-0">
      {['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'].map(
        (pos) => (
          <div
            key={pos}
            className={`absolute ${pos} h-2 w-2`}
            style={{ background: cornerColor }}
          />
        )
      )}
    </div>

    {/* Badge */}
    {badge && (
      <div className="absolute left-3 top-3 z-10 rounded px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-raidMagenta bg-black/50 border border-raidMagenta/40">
        {badge}
      </div>
    )}

    {/* Image */}
    {image && (
      <div className="relative flex items-center justify-center p-6 pt-10">
        <div
          className="relative w-full mx-auto"
          style={{ maxWidth: `${imageMax}px` }}
        >
          {image}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-2xl"
            style={{
              background: `radial-gradient(60% 60% at 50% 50%, ${aura}, transparent 70%)`,
            }}
          />
        </div>
      </div>
    )}

    {/* Text */}
    {(title || subtitle || children) && (
      <div className="px-5 pb-6 text-center">
        {title && (
          <div className="font-pixel text-white text-base md:text-lg">
            {title}
          </div>
        )}
        {subtitle && (
          <div className="text-raidText/70 text-sm mt-1">{subtitle}</div>
        )}
        {children}
      </div>
    )}

    {/* Bottom underline */}
    <div
      aria-hidden
      className="absolute left-0 right-0 bottom-0 h-[3px]"
      style={{
        background: `linear-gradient(90deg, transparent, ${underline}, transparent)`,
        boxShadow: `0 0 24px ${underline.replace('0.8', '0.6')}`,
      }}
    />
  </div>
);

export default function Home() {
  const containerRef = useRef(null);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const title = 'Blockchain Raiders: Battle for Vitality — Official Teaser';
  const description =
    'A fully web-native, provably-fair PvP experience on Solana. Play. Plunder. Vitality.';
  const ogImage = `${siteUrl}/og.jpg`;

  // ---------- HYDRATION-SAFE: client-only countdown target ----------
const [mounted, setMounted] = useState(false);
const [countTarget, setCountTarget] = useState(null);

useEffect(() => {
  setMounted(true);

  const now = new Date();

  // today 23:00 local
  const today2300 = new Date();
  today2300.setHours(23, 0, 0, 0);

  // tomorrow 23:00 local
  const tomorrow2300 = new Date(today2300);
  tomorrow2300.setDate(tomorrow2300.getDate() + 1);

  // pick the right target
  const targetDate = now < today2300 ? today2300 : tomorrow2300;

  setCountTarget(targetDate.toISOString());
}, []);

  // ---------- HYDRATION-SAFE: fairness demo values generated after mount ----------
  const randHex = (n) =>
    Array.from({ length: n }, () =>
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
  const [serverSeedHash, setServerSeedHash] = useState('');
  const [clientSeed, setClientSeed] = useState('');
  const [nonce, setNonce] = useState('');
  useEffect(() => {
    setServerSeedHash(randHex(64));
    setClientSeed(`raid-${randHex(12)}`);
    setNonce(String(Math.floor(1000 + Math.random() * 9000)));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.location.hash && containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    }
  }, []);

  const copy = (text) => {
    try {
      navigator.clipboard?.writeText(text);
    } catch {}
  };

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="Solana, provably fair, PvP, on-chain games, RAID, blockchain"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f0f0f" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        {siteUrl && <meta property="og:url" content={siteUrl} />}
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>

      {/* BACKGROUND */}
      <img
        src="/img/torch_bg_4k.png"
        alt="Pixel dungeon wall"
        className="fixed inset-0 w-full h-full object-cover object-top"
        style={{ imageRendering: 'pixelated' }}
      />

      <Topbar />

      {/* SCROLL WRAPPER
          mobile/tablet/short height: normal flow
          desktop lg+: fullscreen snapping
      */}
      <div
        id="mainScroll"
        ref={containerRef}
        className="relative z-10 h-auto lg:h-screen overflow-y-auto lg:snap-y lg:snap-mandatory"
      >
        {/* HERO */}
        <section
          className="relative overflow-hidden py-16 lg:py-0 lg:svh lg:min-h-screen lg:snap-start lg:flex lg:items-center"
          aria-label="Hero"
        >
 
          <main className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-12 flex flex-col items-center gap-6">
            <HeaderLogo />
            <p className="font-ui text-raidText/90 text-lg md:text-xl text-center max-w-2xl">
              In the ruins of Web3, a new order rises…{' '}
              <span className="text-raidLime font-semibold">
                The Raiders
              </span>
              .
            </p>
            <div className="flex flex-col items-center gap-4">
  {mounted && countTarget && (
    <div className="text-center">
      <span className="block font-pixel text-raidLime text-lg mb-1">CA DROP:</span>
      <Countdown target={countTarget} />
    </div>
  )}
  <ReadyRaidButton />
</div>
            <div
              className="mt-4 flex items-center gap-3"
              aria-hidden="true"
            >
              <Image
                src="/img/token_coin.png"
                width={32}
                height={32}
                className="glow"
                alt=""
              />
              <span className="font-pixel text-raidGold text-base md:text-lg">
                Play. Plunder. Vitality.
              </span>
            </div>
            <a
              href="#how"
              className="mt-6 font-pixel text-raidLime text-xs opacity-70 hover:opacity-100"
            >
              ▼ Scroll
            </a>
          </main>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how"
          className="py-16 lg:py-0 lg:svh lg:min-h-screen lg:snap-start lg:flex lg:items-center"
          aria-label="How It Works"
        >
          <div className="w-full max-w-6xl mx-auto px-6">
            <h2 className="font-pixel text-raidLime text-2xl mb-3 lore-glow text-center">
              HOW IT WORKS
            </h2>
            <p className="font-ui text-raidText/80 text-center mb-6">
              Three simple steps — then you raid.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Connect Wallet',
                  subtitle: 'Link your Solana wallet.',
                  img: '/img/how/connectsol.png',
                },
                {
                  title: 'Choose $RAID',
                  subtitle: 'Pick your wager and mode.',
                  img: '/img/how/choose.png',
                },
                {
                  title: 'Raid & Earn!',
                  subtitle: 'Play. Plunder. Vitality.',
                  img: '/img/how/win.png',
                },
              ].map((s, idx) => (
                <Tile
                  key={s.title}
                  badge={`Step ${idx + 1}`}
                  image={
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-auto select-none"
                      style={{ imageRendering: 'pixelated' }}
                      draggable={false}
                    />
                  }
                  title={s.title}
                  subtitle={s.subtitle}
                />
              ))}
            </div>
          </div>
        </section>

      {/* GAME MODES + FAIRNESS */}
<section
  id="modes"
  className="py-16 lg:py-0 lg:svh lg:min-h-screen lg:snap-start lg:flex lg:items-center"
  aria-label="Game Modes"
>
  <div className="w-full max-w-7xl mx-auto px-6">
    <h2 className="font-pixel text-raidLime text-2xl mb-3 lore-glow text-center">
      GAME MODES
    </h2>
    <p className="font-ui text-raidText/80 text-center mb-6">
      PvP-first, fast, and fair.
    </p>

    {/* ModesRail: ONLY show this on desktop (lg and up),
       because on mobile it's the huge single-mode block */}
    <div className="hidden lg:block">
      <ModesRail />
    </div>

  {/* MOBILE/TABLET LIST (<lg) */}
<div className="grid grid-cols-1 gap-6 lg:hidden mt-8">
  {[
    {
      title: 'Treasure Drop',
      subtitle: 'Provably-fair Plinko',
      img: '/img/modes/TreasureDrop.png',
    },
    {
      title: 'Wheel of Fate',
      subtitle: 'Spin. Pray.',
      img: '/img/modes/wof.png',
    },
   {
          title: 'Raid Duels',
          subtitle: 'Provably Fair PvP',
          img: '/img/modes/duel.png',
        },
    {
      title: 'Rocket Raid',
      subtitle: 'Ride or Rekt.',
      img: '/img/modes/RocketRaid.png',
    },
    {
      title: 'Temple Trials',
      subtitle: 'Chain Memory.',
      img: '/img/modes/TempleTrials.png',
    },
  ].map((m) => (
    <Tile
      key={m.title}
      imageMax={384} // match Relic sizing
      className="mx-auto w-full max-w-[384px]" // same card width
      image={
        <img
          src={m.img}
          alt={m.title}
          className="w-full h-auto select-none"
          style={{ imageRendering: 'pixelated' }}
          draggable={false}
        />
      }
      title={m.title}
      subtitle={m.subtitle}
    >
      <div className="mt-2 font-pixel text-raidMagenta text-[11px] opacity-80 tracking-wide">
        COMING SOON
      </div>
    </Tile>
  ))}
</div>


    {/* DESKTOP GRID (lg+) */}
    <div className="hidden lg:grid lg:grid-cols-5 gap-6 mt-8">
      {[
        {
          title: 'Treasure Drop',
          subtitle: 'Provably-fair Plinko',
          img: '/img/modes/TreasureDrop.png',
        },
        {
          title: 'Raid Duels',
          subtitle: 'PvP fair coinflip',
          img: '/img/modes/duel.png',
        },
        {
          title: 'Wheel of Fate',
          subtitle: 'Spin. Pray.',
          img: '/img/modes/wof.png',
        },
        {
          title: 'Rocket Raid',
          subtitle: 'Ride or Rekt.',
          img: '/img/modes/RocketRaid.png',
        },
        {
          title: 'Temple Trials',
          subtitle: 'Chain Memory.',
          img: '/img/modes/TempleTrials.png',
        },
      ].map((m) => (
        <Tile
          key={m.title}
          imageMax={384}
          image={
            <img
              src={m.img}
              alt={m.title}
              className="w-full h-auto select-none"
              style={{ imageRendering: 'pixelated' }}
              draggable={false}
            />
          }
          title={m.title}
          subtitle={m.subtitle}
        >
          <div className="mt-2 font-pixel text-raidMagenta text-[11px] opacity-80 tracking-wide">
            COMING SOON
          </div>
        </Tile>
      ))}
    </div>

    {/* === PROVABLE FAIRNESS === */}
    <div id="fair" className="mt-10">
      <h3 className="font-pixel text-raidLime text-xl mb-3 lore-glow text-center">
        PROVABLE FAIRNESS
      </h3>
      <p className="font-ui text-raidText/80 text-center mb-5">
        Each result uses a committed{' '}
        <span className="text-raidMagenta">server seed hash</span> + your
        client seed + nonce.
      </p>

      <Tile
        badge="HASH"
        imageMax={680}
        title={
          <span className="font-mono text-raidLime text-sm">
            Commit–Reveal Scheme
          </span>
        }
        subtitle={
          <span className="font-ui text-raidText/70">
            Verify independently — before or after any game.
          </span>
        }
      >
        <div className="mt-3 mx-auto w-full max-w-3xl text-left">
          {/* Server seed hash */}
          <div className="grid grid-cols-12 gap-3 items-center py-2 px-3 rounded bg-black/30 border border-raidMagenta/20">
            <div className="col-span-12 md:col-span-3 font-mono text-[11px] text-raidText/60">
              SERVER SEED HASH
            </div>
            <div className="col-span-10 md:col-span-8">
              <div
                className="font-mono text-xs md:text-sm break-all text-raidText/90"
                suppressHydrationWarning
              >
                {serverSeedHash || '—'}
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-end">
              <button
                onClick={() =>
                  serverSeedHash && copy(serverSeedHash)
                }
                disabled={!serverSeedHash}
                className="font-mono text-[10px] px-2 py-1 border border-raidMagenta/40 hover:border-raidMagenta/70 rounded disabled:opacity-40"
              >
                COPY
              </button>
            </div>
          </div>

          {/* Client seed */}
          <div className="grid grid-cols-12 gap-3 items-center py-2 px-3 mt-3 rounded bg-black/30 border border-raidMagenta/20">
            <div className="col-span-12 md:col-span-3 font-mono text-[11px] text-raidText/60">
              CLIENT SEED
            </div>
            <div className="col-span-10 md:col-span-8">
              <div
                className="font-mono text-xs md:text-sm break-all text-raidText/90"
                suppressHydrationWarning
              >
                {clientSeed || '—'}
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-end">
              <button
                onClick={() => clientSeed && copy(clientSeed)}
                disabled={!clientSeed}
                className="font-mono text-[10px] px-2 py-1 border border-raidMagenta/40 hover:border-raidMagenta/70 rounded disabled:opacity-40"
              >
                COPY
              </button>
            </div>
          </div>

          {/* Nonce */}
          <div className="grid grid-cols-12 gap-3 items-center py-2 px-3 mt-3 rounded bg-black/30 border border-raidMagenta/20">
            <div className="col-span-12 md:col-span-3 font-mono text-[11px] text-raidText/60">
              NONCE
            </div>
            <div className="col-span-10 md:col-span-8">
              <div
                className="font-mono text-xs md:text-sm break-all text-raidText/90"
                suppressHydrationWarning
              >
                {nonce || '—'}
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-end">
              <button
                onClick={() => nonce && copy(String(nonce))}
                disabled={!nonce}
                className="font-mono text-[10px] px-2 py-1 border border-raidMagenta/40 hover:border-raidMagenta/70 rounded disabled:opacity-40"
              >
                COPY
              </button>
            </div>
          </div>

          {/* Verify links */}
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <a
              href="/verify"
              className="block text-center font-pixel px-4 py-3 border rounded border-raidLime/50 hover:border-raidLime/80 text-raidLime"
            >
              VERIFY A ROUND
            </a>
            <a
              href="/how-it-works/"
              className="block text-center font-pixel px-4 py-3 border rounded border-raidGold/50 hover:border-raidGold/80 text-raidGold"
            >
              HOW IT WORKS
            </a>
          </div>

          {/* Mini recipe */}
          <div className="mt-5 font-mono text-[11px] text-raidText/70">
            <div>// Deterministic outcome (example):</div>
            <div>H = SHA256(serverSeed)</div>
            <div>R = HMAC_SHA256(serverSeed, clientSeed:nonce)</div>
            <div>result = parseFloat('0x' + R.slice(0,8)) / 2^32</div>
          </div>
        </div>
      </Tile>
    </div>
    {/* === /PROVABLE FAIRNESS === */}
  </div>
</section>


        <Divider />

        {/* RELICS */}
        <section
          id="relics"
          className="py-16 pb-24 lg:py-0 lg:pb-0 lg:svh lg:min-h-screen lg:snap-start lg:flex lg:items-center"
          aria-label="Relics"
        >
          <div className="w-full max-w-6xl mx-auto px-6 text-center">
            <h2 className="font-pixel text-raidLime text-2xl mb-2 lore-glow">
              RELICS
            </h2>
            <p className="font-ui text-raidText/80 mb-8">
              Relics are limited NFTs granting buffs, crafting paths, and
              visual effects.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: 'Amulet of Fire',
                  tier: 'Legendary Craft Item',
                  img: '/img/amuletoffire.png',
                  border: 'rgba(255,204,0,0.7)',
                  aura: 'rgba(255,204,0,0.35)',
                  underline: 'rgba(255,204,0,0.9)',
                  corner: 'rgba(255,204,0,0.8)',
                },
                {
                  title: 'Pepe Talisman',
                  tier: 'Epic Craft Item',
                  img: '/img/pepetal.png',
                  border: 'rgba(220,38,38,0.55)',
                  aura: 'rgba(220,38,38,0.35)',
                  underline: 'rgba(220,38,38,0.9)',
                  corner: 'rgba(220,38,38,0.75)',
                },
                {
                  title: 'Magic Amulet',
                  tier: 'Diamond Craft Item',
                  img: '/img/magicamulet.png',
                  border: 'rgba(59,130,246,0.55)',
                  aura: 'rgba(59,130,246,0.35)',
                  underline: 'rgba(59,130,246,0.9)',
                  corner: 'rgba(59,130,246,0.75)',
                },
                {
                  title: 'Coin Crown',
                  tier: 'Unreal Craft Item',
                  img: '/img/coincrown.png',
                  border: 'rgba(236,72,153,0.8)',
                  aura: 'rgba(236,72,153,0.45)',
                  underline: 'rgba(236,72,153,0.95)',
                  corner: 'rgba(236,72,153,0.75)',
                },
              ].map((r) => (
                <Tile
                  key={r.title}
                  imageMax={384}
                  border={r.border}
                  aura={r.aura}
                  underline={r.underline}
                  cornerColor={r.corner}
                  image={
                    <img
                      src={r.img}
                      alt={r.title}
                      className="w-full h-auto select-none"
                      style={{ imageRendering: 'pixelated' }}
                      draggable={false}
                    />
                  }
                  title={
                    <span className="font-pixel text-lg text-white">
                      {r.title}
                    </span>
                  }
                  subtitle={
                    <span className="text-raidText/70">{r.tier}</span>
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* COMMUNITY */}
        <section
          id="community"
          className="pt-16 pb-24 lg:pt-0 lg:pb-0 lg:svh lg:min-h-screen lg:snap-start lg:flex lg:items-center"
          aria-label="Community"
        >
          <div className="w-full max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-pixel text-raidLime text-2xl mb-2 lore-glow">
              BECOME A RAIDER
            </h2>
            <p className="font-ui text-raidText/80 mb-8">
              JOIN THE TELEGRAM!
            </p>

            <a
              href="https://t.me/+2XQ3CRHbRGc4YmY0"
              target="_blank"
              rel="noreferrer"
              className="inline-block select-none"
              aria-label="Join the Blockchain Raiders Telegram"
            >
              <div
                className="relative mx-auto"
                style={{ width: 256, imageRendering: 'pixelated' }}
              >
                <div
                  className="relative"
                  style={{
                    width: 256,
                    height: 256,
                    background: '#27A7E7',
                    boxShadow:
                      '0 0 0 4px #0B6FAE, 0 0 0 8px #073B5C, 0 0 0 12px rgba(7,59,92,0.6), 0 0 48px rgba(39,167,231,0.45)',
                    borderRadius: 8,
                  }}
                >
                  {[
                    'left-0 top-0',
                    'right-0 top-0',
                    'left-0 bottom-0',
                    'right-0 bottom-0',
                  ].map((pos) => (
                    <div
                      key={pos}
                      className={`absolute ${pos} w-3 h-3`}
                      style={{ background: '#0B6FAE' }}
                    />
                  ))}

                  <svg
                    viewBox="0 0 512 512"
                    className="absolute inset-0 m-auto"
                    style={{
                      width: 192,
                      height: 192,
                      filter:
                        'drop-shadow(0 0 12px rgba(255,255,255,0.6))',
                    }}
                  >
                    <path
                      d="M476.5 35.5L22.8 214.2c-22.9 9.1-22.6 41.8.5 50.2l116.7 42.6 44.8 142.2c7.2 23 36.5 29.8 53.3 12.3l65.4-66.9 112.2 85.4c20.2 15.4 49.5 4.1 54.5-21l64.5-392.4c4.8-26.8-19.6-48.6-46.7-40.7z"
                      fill="#ffffff"
                    />
                    <path
                      d="M206 338l16.2 99.5c2.5 15.6 23.4 21.5 33.8 9.7l58.8-67.7 99.9 75.6c13.4 10.2 33 2.8 36.3-13.5l52.8-321.9c3.1-16.8-13-30.4-28.7-24.8L89.2 255.6c-15.9 5.6-15.7 28.9.4 34.3l91 29.7c9.3 3 19.5 1.2 27.2-4.7l246.6-188.5c7.6-5.8 16.1 4.8 9.2 11.3L232.4 329.4c-7.8 7.2-18.8 9.8-29.1 8.6l2.7-.1z"
                      fill="#e6f6ff"
                    />
                  </svg>

                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(60% 60% at 50% 50%, rgba(39,167,231,0.35), transparent 70%)',
                      filter: 'blur(10px)',
                    }}
                  />
                </div>

                <div className="mt-4 font-pixel text-white text-lg text-center">
                  BECOME A RAIDER —{' '}
                  <span className="text-raidLime">
                    JOIN THE TELEGRAM
                  </span>
                </div>
              </div>
            </a>

            <div className="mt-10 text-raidText/50 text-xs">
              © {new Date().getFullYear()} Blockchain Raiders — Built
              on Solana
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
