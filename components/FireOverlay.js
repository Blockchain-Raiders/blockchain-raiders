// components/FireOverlay.js
import { useEffect, useMemo, useRef } from "react";

/**
 * Full-page ember overlay with scroll-reactive parallax and fiery bottom “hearth” glow.
 * - Bind to a scroll container via scrollTargetId (default: "mainScroll")
 * - Plays nicely with CSS scroll-snap (velocity smoothing + anti-spike)
 */
export default function FireOverlay({
  density = 36,
  scope = "page",
  z = "z-10",
  speed = 10,                 // base rise duration (s) — higher = slower
  scrollTargetId = "mainScroll",
}) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const embers = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const left  = (i * (100 / density) + (i * 13) % 17) % 100;
      const delay = (i * 0.35) % 8;                // 0..8s stagger
      const dur   = speed + ((i * 89) % 50) / 10;  // speed..speed+5s
      const size  = 2 + ((i * 29) % 6);            // 2–8px
      // warm ember hues (gold/orange/red) — no lime/magenta
      const hue   = [38, 22, 8][i % 3];            // ~gold→orange→red in HSL
      return { id: i, left, delay, dur, size, hue };
    });
  }, [density, speed]);

  const containerClass =
    scope === "page"
      ? `fixed inset-0 pointer-events-none ${z}`
      : `absolute inset-0 pointer-events-none ${z}`;

  const overlayRef = useRef(null);

  // Scroll-reactive parallax & speed — bound to the snap container
  useEffect(() => {
    if (prefersReduced) return;

    const el = overlayRef.current;
    if (!el) return;

    const target = document.getElementById(scrollTargetId) || window;
    const getY = () =>
      target === window ? window.scrollY : /** @type {HTMLElement} */ (target).scrollTop;

    let raf = 0;
    let lastY = getY();
    let lastT = performance.now();
    let yShift = 0;
    let vel = 0;         // px/sec (smoothed)
    let snapDecay = 1.0; // gentle over-slowing during snap jumps

    let endTimer = 0;
    const onScroll = () => {
      clearTimeout(endTimer);
      endTimer = setTimeout(() => {
        snapDecay = 1.0;
        el.style.setProperty("--scrollMul", "1.0");
      }, 300);
    };
    (target === window ? window : target).addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      const now = performance.now();
      const y = getY();
      const dt = Math.max(16, now - lastT);
      const instVel = ((y - lastY) / dt) * 1000; // px/sec

      // Low-pass filter velocity
      vel = vel * 0.9 + instVel * 0.1;

      // Subtle parallax (5% of scroll)
      yShift = y * 0.05;
      el.style.transform = `translateY(${yShift}px)`;

      // Map |vel| -> duration multiplier (faster scroll => slower embers)
      const absV = Math.min(1500, Math.abs(vel)); // clamp spikes
      let mul = 1.0 + absV / 2500;                // 1.0..1.6
      mul = Math.min(1.6, mul);

      // If we detect a snap (big instantaneous jump), briefly exaggerate slowing
      if (Math.abs(instVel) > 1200) {
        snapDecay = 1.35;
      } else {
        snapDecay = snapDecay * 0.92 + 1.0 * 0.08; // ease back toward 1
      }

      const finalMul = (mul * snapDecay).toFixed(3);
      el.style.setProperty("--scrollMul", finalMul);

      lastY = y;
      lastT = now;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      (target === window ? window : target).removeEventListener("scroll", onScroll);
      clearTimeout(endTimer);
    };
  }, [prefersReduced, scrollTargetId]);

  return (
    <div
      ref={overlayRef}
      className={containerClass}
      aria-hidden="true"
      style={{
        transform: prefersReduced ? "translateY(0px)" : undefined,
        ["--scrollMul"]: prefersReduced ? 1.0 : 1.0,
      }}
    >
      {/* 🔥 Bottom "hearth" gradient — warm fire hues */}
      <div className="absolute inset-x-0 bottom-0 h-[28vh] pointer-events-none">
        {/* deeper dark base for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        {/* ember core glow (hot orange) */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(255,90,0,0.35),transparent_65%)]" />
        {/* molten orange ring */}
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_100%,rgba(255,120,40,0.25),transparent_55%)]" />
        {/* faint crimson halo */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_100%,rgba(200,0,40,0.18),transparent_52%)]" />
      </div>

      {/* Very subtle vertical vignette shimmer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/0 animate-[pulse_8s_ease-in-out_infinite]" />

      {/* Embers (warm hues only) */}
      <div className="absolute inset-0 overflow-hidden">
        {embers.map(({ id, left, delay, dur, size, hue }) => (
          <div
            key={id}
            className="ember"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              ["--emberDelay"]: `${delay}s`,
              ["--emberDur"]: `${dur}s`,
              backgroundColor: `hsl(${hue}, 100%, 60%)`,
              boxShadow: `0 0 6px 2px hsl(${hue}, 100%, 70%)`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .ember {
          position: absolute;
          bottom: -8px; /* spawn just below bottom edge */
          border-radius: 9999px;
          opacity: 0.85;
          will-change: transform, opacity;
          animation: emberRise calc(var(--emberDur) * var(--scrollMul))
            linear var(--emberDelay) infinite;
        }

        @keyframes emberRise {
          0% {
            transform: translateY(0vh) scale(0.6);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          80% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-110vh) scale(1.3);
            opacity: 0;
          }
        }

        /* Reduced motion: constant timing */
        @media (prefers-reduced-motion: reduce) {
          .ember {
            animation-duration: var(--emberDur);
          }
        }
      `}</style>
    </div>
  );
}
