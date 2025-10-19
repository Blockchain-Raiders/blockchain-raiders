// components/FireOverlay.js
import { useMemo } from "react";

/**
 * Embers-only overlay (no flames).
 * - pointer-events: none (doesn't block clicks)
 * - mix-blend-mode additive for a nice glow
 *
 * Props:
 *  - density: how many embers to render
 *  - scope: "page" | "section" (fixed vs absolute)
 *  - z: Tailwind z-index class
 *  - speed: base rise duration in seconds (lower = faster)
 */
export default function FireOverlay({
  density = 28,
  scope = "section",
  z = "z-10",
  speed = 8,
}) {
  const embers = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const left = (i * (100 / density) + (i * 7) % 12) % 100;
      const delay = (i * 0.33) % 6;                 // 0..6s
      const dur = speed + ((i * 97) % 40) / 10;     // ~speed..speed+4s
      const size = 2 + ((i * 31) % 7);              // 2..8 px
      return { id: i, left, delay, dur, size };
    });
  }, [density, speed]);

  const containerClass =
    scope === "page"
      ? `fixed inset-0 pointer-events-none ${z}`
      : `absolute inset-0 pointer-events-none ${z}`;

  return (
    <div className={containerClass} aria-hidden="true">
      {/* subtle heat flicker */}
      <div className="absolute inset-0 overlay-flicker" />

      {/* embers */}
      <div className="absolute inset-0">
        {embers.map(({ id, left, delay, dur, size }) => (
          <div
            key={id}
            className="ember"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
