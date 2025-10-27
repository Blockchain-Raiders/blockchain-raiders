// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import PepeDuelClash from '@/components/PepeDuelClash';
import HeaderLogo from '@/components/HeaderLogo';
import Topbar from '@/components/Topbar';

export default function ComingSoon() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const title = 'Blockchain Raiders: Battle for Vitality — Coming Soon';
  const description = 'A fully web-native, provably-fair PvP experience on Solana. Play. Plunder. Vitality.';
  const ogImage = `${siteUrl}/og.jpg`;

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Solana, provably fair, PvP, on-chain games, RAID, blockchain" />
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

      {/* Background */}
      <img
        src="/img/torch_bg_4k.png"
        alt="Pixel dungeon wall"
        className="fixed inset-0 w-full h-full object-cover object-top"
        style={{ imageRendering: 'pixelated' }}
      />

      <Topbar />

      {/* HEADER ONLY */}
      <section className="svh min-h-screen snap-start flex items-center relative overflow-hidden" aria-label="Hero">
       
        <main className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-12 flex flex-col items-center gap-6">
          {/* Leave the logo exactly as it is */}
          <HeaderLogo />

          {/* COMING SOON — 8bit lime with glow */}
          <h1 className="font-pixel text-raidLime text-2xl md:text-3xl lore-glow drop-shadow-[0_0_16px_rgba(184,255,54,0.85)] text-center mt-2">
            COMING SOON!
          </h1>

          {/* Telegram tile moved up from footer */}
          <a
            href="https://t.me/+2XQ3CRHbRGc4YmY0"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block select-none"
            aria-label="Join the Blockchain Raiders Telegram"
          >
            <div className="relative mx-auto" style={{ width: 220, imageRendering: 'pixelated' }}>
              <div
                className="relative"
                style={{
                  width: 220,
                  height: 220,
                  background: '#27A7E7',
                  boxShadow:
                    '0 0 0 4px #0B6FAE, 0 0 0 8px #073B5C, 0 0 0 12px rgba(7,59,92,0.6), 0 0 48px rgba(39,167,231,0.45)',
                  borderRadius: 8,
                }}
              >
                {['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'].map((pos) => (
                  <div key={pos} className={`absolute ${pos} w-3 h-3`} style={{ background: '#0B6FAE' }} />
                ))}
                <svg
                  viewBox="0 0 512 512"
                  className="absolute inset-0 m-auto"
                  style={{ width: 168, height: 168, filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.6))' }}
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
                    background: 'radial-gradient(60% 60% at 50% 50%, rgba(39,167,231,0.35), transparent 70%)',
                    filter: 'blur(10px)',
                  }}
                />
              </div>
              <div className="mt-4 font-pixel text-white text-sm sm:text-base text-center">
                <span className="text-raidLime">JOIN THE TELEGRAM</span>
              </div>
            </div>
          </a>
        </main>
      </section>
    </div>
  );
}
