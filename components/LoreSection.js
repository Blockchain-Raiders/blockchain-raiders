// components/LoreSection.js
import { motion } from 'framer-motion';

export default function LoreSection() {
  const lines = [
    "When the old chains cracked, we watched the markets fall silent.",
    "Everything that once held value turned to dust, but we saw something left behind in the ruins.",
    "We are the Raiders.",
    "We built from memes, coded through chaos, and forged relics of Vitality from broken blocks.",
    "Every duel is a risk, every relic tells a story.",
    "When we win, we grow stronger. When we lose, we learn, and we raid again.",
    "This isn’t just another game to us.",
    "It’s a new frontier for those bold enough to play, plunder, and rebuild the future from what was lost."
  ];

  return (
    <section className="relative py-32 bg-black/70 text-raidText overflow-hidden">
      {/* Ambient sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-raidGold rounded-full opacity-70"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative z-10 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-pixel text-raidLime text-2xl mb-8"
        >
          OUR STORY
        </motion.h2>

        <div className="space-y-6">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.25 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              className="text-lg leading-relaxed font-ui text-raidText/90"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
