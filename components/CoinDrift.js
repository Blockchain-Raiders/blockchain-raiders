import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CoinDrift() {
  const [height, setHeight] = useState(600);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHeight(window.innerHeight);
    }
  }, []);

  const coins = new Array(10).fill(0).map((_, i) => ({
    x: Math.random() * 90 + 5,
    delay: Math.random() * 2,
    dur: Math.random() * 8 + 8,
    size: Math.random() * 20 + 12,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {coins.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: [0, 1, 0], y: [-40, height, -40] }}
          transition={{ delay: c.delay, duration: c.dur, repeat: Infinity }}
          className="absolute"
          style={{ left: `${c.x}%` }}
        >
          <div
            className="rounded-full"
            style={{
              width: c.size,
              height: c.size,
              background:
                'radial-gradient(circle, #FFD86B 0%, #D9A441 60%, #7a5a1a 100%)',
              boxShadow: '0 0 6px rgba(217,164,65,0.7)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
