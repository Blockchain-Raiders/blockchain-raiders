// components/ModesRail.jsx
import Image from 'next/image';

const MODES = [
  { title: 'Treasure Drop', desc: 'Provably-fair Plinko', img: '/img/modes/TrasureDrop.png' }, // file name as provided
  { title: 'Raid Duels', desc: 'PvP fair coinflip', img: '/img/modes/duel.png' },
  { title: 'Wheel of Fate', desc: 'Spin. Pray.', img: '/img/modes/wof.png' },
  { title: 'Rocket Raid', desc: 'Ride or Rekt.', img: '/img/modes/RocketRaid.png' },
  { title: 'Temple Trials', desc: 'Chain Memory.', img: '/img/modes/TempleTrials.png' },
];

export default function ModesRail() {
  return (
    <div className="-mx-6 sm:hidden">
      <div className="flex gap-3 overflow-x-auto px-6 pb-2 snap-x snap-mandatory">
        {MODES.map((m) => (
          <div key={m.title} className="min-w-[210px] snap-center p-4 rounded-xl border border-white/12 hover:-translate-y-0.5 hover:border-raidMagenta/50 transition">
            <div className="flex items-center justify-center mb-2">
              <Image
                src={m.img}
                alt={m.title}
                width={180}
                height={180}
                sizes="(max-width: 640px) 60vw, 180px"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <div className="font-pixel text-raidGold text-sm">{m.title}</div>
            <div className="text-raidText/70 text-xs">{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
