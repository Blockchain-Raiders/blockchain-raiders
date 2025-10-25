// components/ModesRail.jsx
import Image from 'next/image';

const MODES = [
  { title: 'Treasure Drop', desc: 'Provably-fair Plinko', img: '/img/modes/TreasureDrop.png' },
  { title: 'Raid Duels', desc: 'PvP fair coinflip', img: '/img/modes/duel.png' },
  { title: 'Wheel of Fate', desc: 'Spin. Pray.', img: '/img/modes/wof.png' },
  { title: 'Rocket Raid', desc: 'Ride or Rekt.', img: '/img/modes/RocketRaid.png' },
  { title: 'Temple Trials', desc: 'Chain Memory.', img: '/img/modes/TempleTrials.png' },
];

export default function ModesRail() {
  return (
    <div className="-mx-6 sm:hidden">
      <div className="flex gap-4 overflow-x-auto px-6 pb-3 snap-x snap-mandatory">
        {MODES.map((m) => (
          <div
            key={m.title}
            className="min-w-[820px] snap-center relative overflow-hidden rounded-xl border bg-transparent text-center"
            style={{
              borderColor: 'rgba(236,72,153,0.45)',
              boxShadow: '0 0 0 1px rgba(236,72,153,0.3), 0 0 40px 12px rgba(236,72,153,0.18)',
            }}
          >
            {/* Corner pixels */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 top-0 h-2 w-2 bg-raidMagenta/60" />
              <div className="absolute right-0 top-0 h-2 w-2 bg-raidMagenta/60" />
              <div className="absolute left-0 bottom-0 h-2 w-2 bg-raidMagenta/60" />
              <div className="absolute right-0 bottom-0 h-2 w-2 bg-raidMagenta/60" />
            </div>

            {/* Image (double size) */}
            <div className="relative flex items-center justify-center p-6 pt-10">
              <div className="relative w-full max-w-[768px] mx-auto">
                <Image
                  src={m.img}
                  alt={m.title}
                  width={768}
                  height={768}
                  sizes="(max-width:640px)95vw,768px"
                  style={{ imageRendering: 'pixelated', height: 'auto', width: '100%' }}
                  draggable={false}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 blur-2xl"
                  style={{
                    background: 'radial-gradient(60% 60% at 50% 50%, rgba(236,72,153,0.25), transparent 70%)',
                  }}
                />
              </div>
            </div>

            {/* Text */}
            <div className="px-4 pb-5 text-center">
              <div className="font-pixel text-white text-lg mb-1">{m.title}</div>
              <div className="text-raidText/70 text-sm">{m.desc}</div>
            </div>

            {/* Bottom underline */}
            <div
              aria-hidden
              className="absolute left-0 right-0 bottom-0 h-[3px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.8), transparent)',
                boxShadow: '0 0 24px rgba(236,72,153,0.6)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
