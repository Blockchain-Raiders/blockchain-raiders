import Image from "next/image";

export default function Topbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40">
      {/* Background gradient behind logo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-[50vw] bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-[60px] sm:h-[72px] max-w-6xl items-center justify-between px-2 sm:px-4 overflow-visible">
        {/* LEFT: Logo */}
        <a
          href="/"
          className="relative flex shrink-0 items-center overflow-visible"
        >
          <Image
            src="/img/blockchainraiders.png"
            alt="Blockchain Raiders"
            width={540}
            height={180}
            priority
            className="h-[60px] sm:h-[90px] md:h-[108px] lg:h-[112px] w-auto object-contain"
          />
        </a>

        {/* CENTER: placeholder nav */}
        <nav className="hidden sm:flex items-center gap-6 text-[11px] font-pixel uppercase tracking-wide text-raidText/85">
          <span className="sr-only">nav</span>
        </nav>

        {/* RIGHT: Coin (hidden on smallest) + CTAs */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Hide coin on very small screens */}
          <div className="hidden xs:block sm:block">
            <Image
              src="/img/token_coin.png"
              alt="RAID Coin"
              width={24}
              height={24}
              priority
              className="h-[24px] w-[24px] sm:h-[32px] sm:w-[32px]"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* Buttons — tiny on mobile, pink base with green hover text */}
          {[
            { label: "ROAD MAP", href: "/roadmap" },
            { label: "HOW IT WORKS", href: "/how-it-works/" },
            { label: "VERIFY A ROUND", href: "/verify" },
          ].map((b) => (
            <a
              key={b.href}
              href={b.href}
              className="font-pixel uppercase border border-raidMagenta/50 text-raidMagenta transition-colors duration-200 hover:text-raidLime
                text-[8px] px-1.5 py-[3px] sm:text-[10px] sm:px-2.5 sm:py-[5px] md:text-[11px] md:px-3.5 md:py-2 rounded-md"
            >
              {b.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
