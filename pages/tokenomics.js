import Head from 'next/head';
import Topbar from '@/components/Topbar';

export default function Tokenomics() {
  const title = '$RAID Tokenomics — Blockchain Raiders';
  const description = 'Discover how $RAID powers the Blockchain Raiders ecosystem.';

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
          <h1 className="font-pixel text-raidLime text-3xl lore-glow">$RAID TOKENOMICS</h1>
          <p className="font-ui text-raidText/80 mt-4">
            A refreshed tokenomics brief is on the way as we finalize the updated roadmap for Blockchain Raiders.
          </p>
        </header>

        <section className="space-y-6 font-ui text-raidText/85 bg-black/40 border border-raidGold/40 rounded-xl p-8">
          <p>
            We are rebalancing emissions, in-game sinks, and reward structures to match the new direction of the game. The figures and charts you saw before are being replaced with an accurate breakdown of how $RAID fuels every battle.
          </p>
          <p>
            Stay tuned for treasury allocations, player incentive loops, and the staking flows that support sustainable raids.
          </p>
          <p className="font-pixel text-raidGold text-sm uppercase tracking-wide">
            Updated tokenomics report coming soon.
          </p>
        </section>
      </main>
    </div>
  );
}
