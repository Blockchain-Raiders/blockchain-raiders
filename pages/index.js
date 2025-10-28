import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Topbar from "@/components/Topbar";
import ReadyRaidButton from "@/components/ReadyRaidButton";

export default function ComingSoon() {
  const title = "Blockchain Raiders — Coming Soon";
  const description = "Blockchain Raiders: Battle for Vitality — Coming Soon";

  const [heroLogoSrc, setHeroLogoSrc] = useState("/img/logo_full.png");
  const [showTelegram, setShowTelegram] = useState(false);

  // Reveal Telegram link after button press
  const handleRaidPress = () => {
    setTimeout(() => setShowTelegram(true), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* === Background === */}
      <img
        src="/img/torch_bg_4k.png"
        alt="Pixel dungeon wall"
        className="fixed inset-0 -z-10 h-full w-full object-cover object-top"
        style={{ imageRendering: "pixelated" }}
      />

      <Topbar />

      {/* === Main Content === */}
      <main className="relative z-10 flex h-screen w-full items-center justify-center px-4 text-center">
        <div className="max-w-4xl w-full flex flex-col items-center">
          {/* BIG LOGO */}
          <Image
            src={heroLogoSrc}
            alt="Blockchain Raiders Full Logo"
            width={1600}
            height={640}
            priority
            onError={() => setHeroLogoSrc("/img/logofull.png")}
            className="mb-6 w-auto h-[280px] sm:h-[340px] md:h-[400px] object-contain"
            style={{ imageRendering: "pixelated" }}
          />

          {/* COMING SOON */}
          <h1 className="font-pixel text-raidLime text-2xl sm:text-3xl md:text-4xl lore-glow drop-shadow-[0_0_20px_rgba(184,255,54,0.9)] mb-8">
            COMING SOON!
          </h1>

          {/* PRESS TO RAID button (unchanged behavior) */}
          <div
            className="cursor-pointer select-none"
            onClick={handleRaidPress}
            role="button"
            aria-label="Press to Raid"
          >
            <ReadyRaidButton />
          </div>

          {/* existing Raiders Ready counter styled in pink */}
          <div className="mt-4 font-pixel text-raidMagenta text-sm sm:text-base drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]">
            {/* this line assumes your ReadyRaidButton or a global variable already renders "Raiders Ready:" with a number */}
            <span id="raiders-ready-counter"></span>
          </div>

          {/* reveal Telegram link after press */}
          {showTelegram && (
            <div className="mt-6 text-center animate-fade-in">
              <a
                href="https://t.me/+2XQ3CRHbRGc4YmY0"
                target="_blank"
                rel="noreferrer"
                className="font-pixel text-sm sm:text-base text-raidLime underline hover:text-raidGold transition"
              >
                JOIN THE TELEGRAM
              </a>
            </div>
          )}
        </div>
      </main>

      {/* fade-in animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        /* ensure any text inside #raiders-ready-counter inherits pink glow + font */
        #raiders-ready-counter {
          font-family: var(--font-pixel, 'Press Start 2P', monospace);
          color: #ec4899;
          text-shadow: 0 0 8px rgba(236, 72, 153, 0.6);
        }
      `}</style>
    </div>
  );
}
