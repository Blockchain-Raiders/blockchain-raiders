import Image from 'next/image';

export default function Topbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40">
      {/* Background gradient behind logo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-[50vw] bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 overflow-visible">
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
            className="h-[100px] md:h-[108px] lg:h-[112px] w-auto object-contain -mt-2"
          />
        </a>

        {/* CENTER: nav (anchors removed) */}
        <nav className="hidden sm:flex items-center gap-6 text-[11px] font-pixel uppercase tracking-wide text-raidText/85">
          {/* keep a stable child so SSR/CSR trees always match */}
          <span className="sr-only">nav</span>
        </nav>

        {/* RIGHT: Coin + CTAs */}
        <div className="flex items-center gap-3 shrink-0">
          <Image
            src="/img/token_coin.png"
            alt="RAID Coin"
            width={32}
            height={32}
            priority
            className="h-[32px] w-[32px]"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Unified pink base / lime hover text */}
          {[
            { label: 'ROAD MAP', href: '/roadmap' },
            { label: 'HOW IT WORKS', href: '/how-it-works/' },
            { label: 'VERIFY A ROUND', href: '/verify' },
          ].map((b) => (
            <a
              key={b.href}
              href={b.href}
              className="font-pixel text-[11px] uppercase px-3.5 py-2 rounded-lg border border-raidMagenta/50 text-raidMagenta transition-colors duration-200 hover:text-raidLime"
            >
              {b.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
