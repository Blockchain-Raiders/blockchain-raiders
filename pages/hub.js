import Link from 'next/link';

export default function Hub(){
  const modes = [
    { href:'/duel', title:'Raid Duels', desc:'PvP coinflip — provably fair' },
    // { href:'/treasure', title:'Treasure Drop', desc:'House plinko (coming soon)' },
    // etc…
  ];
  return (
    <div className="min-h-screen bg-dungeon text-raidText">
      <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/70">
        <main className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="font-pixel text-raidLime text-3xl mb-6">GAME HUB</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modes.map(m=>(
              <Link key={m.href} href={m.href} className="block p-5 rounded card-border bg-black/40 hover:shadow-neon transition">
                <div className="font-pixel text-raidGold text-xl">{m.title}</div>
                <div className="text-raidText/70">{m.desc}</div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
