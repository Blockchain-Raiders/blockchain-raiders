import Head from 'next/head';
import Topbar from '@/components/Topbar';

export default function AboutTheGame() {
  const title = 'About the Game — Blockchain Raiders';
  const description = 'Explore the upcoming PvP mechanics, relic buffs, and the future of Blockchain Raiders.';

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <img
        src="/img/torch_bg_4k.png"
        alt=""
        className="fixed inset-0 w-full h-full object-cover object-top"
        style={{ imageRendering: 'pixelated' }}
      />

      <Topbar />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24">
        <header className="text-center mb-12">
          <h1 className="font-pixel text-raidLime text-3xl lore-glow">ABOUT THE GAME</h1>
          <p className="font-ui text-raidText/80 mt-4">
            We are crafting a full breakdown of Blockchain Raiders PvP combat, relic synergies, and the systems that power every raid.
          </p>
        </header>

        <section className="space-y-6 font-ui text-raidText/85 bg-black/40 border border-raidMagenta/40 rounded-xl p-8">
          <p>
            This page will soon cover the competitive flow of matches, how buffs interact with player skill, and the strategic layer
            that makes each raid unique. Our team is refining combat loops and ensuring every mechanic is fair, transparent, and exhilarating.
          </p>
          <p>
            Check back for deep dives into PvP loadouts, relic crafting paths, and the long-term progression we are building for Raiders.
          </p>
          <p className="font-pixel text-raidLime text-sm uppercase tracking-wide">
            Full design reveal coming soon.
          </p>
        </section>
      </main>
    </div>
  );
}
