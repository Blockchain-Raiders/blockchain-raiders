// components/FireOverlay.js
import { useEffect, useMemo, useRef } from "react";

/**
 * SAFE MODE: Stable embers & scroll-grown hearth glow
 * - Embers spawn only from bottom, constant upward rise, slight per-ember sway
 * - No reseeding, no wind, no rAF loops touching embers
 * - Hearth glow scales/brightens with scroll depth (rAF-throttled on scroll)
 */
export default function FireOverlay({
  density = 30,          // start conservative; raise to taste
  scope = "page",
  z = "z-10",
  baseSpeed = 11,        // avg seconds per rise loop
  scrollTargetId = "mainScroll",
}) {
  const containerClass =
    scope === "page"
      ? `fixed inset-0 pointer-events-none ${z}`
      : `absolute inset-0 pointer-events-none ${z}`;

  const overlayRef = useRef(null);

  // one-time randomized particles (NO reseeding)
  const embers = useMemo(() => {
    const rnd = (a, b) => Math.random() * (b - a) + a;
    const hues = [38, 22, 8]; // gold/orange/red
    return Array.from({ length: density }).map((_, i) => {
      const left = rnd(2, 98);                 // %
      const size = rnd(2, 7.5);                // px
      const hue  = hues[i % hues.length];      // distribute hues
      const delay = rnd(0, 7.5);               // s
      const dur = Math.max(7, baseSpeed + rnd(-3, 3.5)); // s (bounded)
      const driftX = (Math.random() < 0.5 ? -1 : 1) * rnd(6, 18); // px
      const swayDur = rnd(1.2, 2.0);           // s
      const opacity = rnd(0.75, 0.95);
      return { id: i, left, size, hue, delay, dur, driftX, swayDur, opacity };
    });
  }, [density, baseSpeed]);

  // Hearth glow: grow with scroll (rAF-throttled on scroll only)
  useEffect(() => {
    const root = overlayRef.current;
    if (!root) return;

    const target = document.getElementById(scrollTargetId) || window;
    const getY = () => (target === window ? window.scrollY : target.scrollTop);
    const getMax = () =>
      target === window
        ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        : Math.max(1, target.scrollHeight - target.clientHeight);

    let scheduled = false;
    const update = () => {
      scheduled = false;
      const prog = Math.min(1, Math.max(0, getY() / getMax())); // 0..1
      const sY = 1 + prog * 0.9;   // taller as you go down
      const sX = 1 + prog * 0.15;  // tiny widen
      const br = 0.95 + prog * 0.35;
      root.style.setProperty("--hearthScaleY", sY.toFixed(3));
      root.style.setProperty("--hearthScaleX", sX.toFixed(3));
      root.style.setProperty("--hearthBright", br.toFixed(3));
    };

    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    };

    // initial + listen
    update();
    (target === window ? window : target).addEventListener("scroll", onScroll, { passive: true });
    return () => (target === window ? window : target).removeEventListener("scroll", onScroll);
  }, [scrollTargetId]);

  return (
    <div
      ref={overlayRef}
      className={containerClass}
      aria-hidden="true"
      style={{
        ["--hearthScaleY"]: 1,
        ["--hearthScaleX"]: 1,
        ["--hearthBright"]: 1,
      }}
    >
      {/* 🔥 Hearth Glow (grows with scroll) */}
      <div
        className="absolute inset-x-0 bottom-0 h-[28vh] pointer-events-none origin-bottom"
        style={{
          transform: "scaleX(var(--hearthScaleX)) scaleY(var(--hearthScaleY)) translateZ(0)",
          filter: "brightness(var(--hearthBright))",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(255,90,0,0.35),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_100%,rgba(255,120,40,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_100%,rgba(200,0,40,0.18),transparent_52%)]" />
      </div>

      {/* subtle vignette shimmer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/0 animate-[pulse_8s_ease-in-out_infinite]" />

      {/* Embers (stable, no reseed) */}
      <div className="absolute inset-0 overflow-hidden">
        {embers.map((e) => (
          <div
            key={e.id}
            className="ember"
            style={{
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              opacity: e.opacity,
              // constants per ember (no changes after mount)
              ["--emberDelay"]: `${e.delay}s`,
              ["--emberDur"]: `${e.dur}s`,
              ["--driftX"]: `${e.driftX}px`,
              ["--swayDur"]: `${e.swayDur}s`,
              backgroundColor: `hsl(${e.hue}, 100%, 60%)`,
              boxShadow: `0 0 6px 2px hsl(${e.hue}, 100%, 70%)`,
            }}
          >
            <div className="ember__sway" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .ember {
          position: absolute;
          bottom: -10px;        /* always spawn from bottom */
          border-radius: 9999px;
          will-change: transform, opacity;
          animation: emberRise var(--emberDur) linear var(--emberDelay) infinite;
          transform: translateZ(0);
        }

        .ember__sway {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          animation: emberSway var(--swayDur) ease-in-out 0s infinite alternate;
          background: inherit;
          box-shadow: inherit;
          transform: translateZ(0);
        }

        @keyframes emberRise {
          0%   { transform: translateY(0vh) scale(0.7);  opacity: 0; }
          12%  { opacity: 0.95; }
          88%  { opacity: 0.85; }
          100% { transform: translateY(-112vh) scale(1.25); opacity: 0; }
        }

        @keyframes emberSway {
          0%   { transform: translateX(0); }
          100% { transform: translateX(var(--driftX)); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ember__sway { animation: none; }
        }
      `}</style>
    </div>
  );
}
