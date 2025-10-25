// components/PepeDuelClash.js
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

/**
 * Safe-zone duel (responsive):
 * - Both fighters RUSH IN → HOLD (no sliding) → SLOW RETREAT
 * - Right fighter slightly closer to center and larger
 * - Idle sway during HOLD only
 * - On mobile/tablet: smaller sprites, farther safe zone, slightly higher clash position, smaller FX
 */
export default function PepeDuelClash({
  className = "",
  leftSrc = "/img/pepeswordknightleftleft.png",
  rightSrc = "/img/pepeswordknightright.png",
  clashAt = 1.1,      // approach time
  hold = 12.0,        // time paused at boundary
  retreat = 6.0,      // slow exit duration
  safePercent = 18,   // desktop: left boundary distance from center
  rightNudge = 5,     // desktop: bring right closer (safePercent - rightNudge)
}) {
  const spark  = useAnimationControls();
  const wave   = useAnimationControls();
  const camera = useAnimationControls();

  // ---------- Responsive breakpoints ----------
  const [bp, setBp] = useState({ mobile: false, tablet: false, width: 1280 });
  useEffect(() => {
    const update = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1280;
      setBp({
        width: w,
        mobile: w < 640,          // < sm
        tablet: w >= 640 && w < 1024, // sm..md/lg-ish
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ---------- Derived responsive config ----------
  // Keep them farther from center and smaller on mobile so they don't overlap the middle.
  const cfg = useMemo(() => {
    if (bp.mobile) {
      return {
        leftH: 320 * 2.1,
        rightH: 320 * 1.7,
        safe: 28,           // farther from center
        nudge: 3,           // small nudge for right
        topLeft: "-1%",     // slightly higher
        topRight: "-1%",
        sparkTop: "26%",
        fxScale: 0.75,      // smaller FX bubble/ring
      };
    }
    if (bp.tablet) {
      return {
        leftH: 320 * 3.1,
        rightH: 320 * 2.3,
        safe: 22,
        nudge: 4,
        topLeft: "-2%",
        topRight: "-2%",
        sparkTop: "27%",
        fxScale: 0.9,
      };
    }
    // desktop (original feel)
    return {
      leftH: 320 * 4.0,
      rightH: 320 * 2.8,
      safe: safePercent,
      nudge: rightNudge,
      topLeft: "-3%",
      topRight: "-2%",
      sparkTop: "28%",
      fxScale: 1.0,
    };
  }, [bp, safePercent, rightNudge]);

  const rightStop = Math.max(0, cfg.safe - cfg.nudge);

  // Timeline: approach → HOLD → retreat
  const total = clashAt + hold + retreat;

  // Normalized keyframe times (no drift keyframe = no mid hold slide)
  const times = useMemo(() => {
    const tHit  = clashAt / total;          // arrival at boundary
    const tHold = (clashAt + hold) / total; // end of hold, start retreat
    return [0, tHit, tHold, 1];
  }, [clashAt, hold, total]);

  useEffect(() => {
    const trigger = async () => {
      await Promise.all([
        camera.start({
          scale: [1, 0.985, 1.01, 1],
          rotate: [0, -0.5, 0.5, 0],
          transition: { duration: 0.5, ease: "easeOut" },
        }),
        spark.start("burst"),
        wave.start("ripple"),
      ]);
    };
    trigger();
    const id = setInterval(trigger, total * 1000);
    return () => clearInterval(id);
  }, [camera, spark, wave, total]);

  const spriteStyle = { imageRendering: "pixelated", background: "transparent", opacity: 1 };

  // FX positioned at left boundary (the “clash” edge)
  const fxStyle = { left: `calc(50% - ${cfg.safe}%)` };

  // Idle sway applies only while holding (we animate the child, parent x stays fixed)
  const idleSway = {
    y: [0, -2, 0, 2, 0],
    rotate: [0, -0.6, 0, 0.6, 0],
    transition: { duration: 2.4, ease: "easeInOut", repeat: Infinity }
  };

  // FX sizes (scaled)
  const sparkSize = 210 * cfg.fxScale;
  const waveSize  = 240 * cfg.fxScale;

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 select-none ${className}`}
      aria-hidden="true"
      animate={camera}
      initial={{ scale: 1 }}
    >
      {/* LEFT — approach → HOLD (fixed) → SLOW retreat */}
      <motion.div
        initial={{ x: "-140%", opacity: 1, filter: "drop-shadow(0 0 14px #caeb32)" }}
        animate={{
          x: [
            `-140%`,       // offscreen
            `-${cfg.safe}%`,// arrive
            `-${cfg.safe}%`,// HOLD (no movement)
            `-140%`        // retreat
          ],
          opacity: [1,1,1,1],
          filter: [
            "drop-shadow(0 0 14px #caeb32)",
            "drop-shadow(0 0 22px #caeb32)",
            "drop-shadow(0 0 22px #caeb32)",
            "drop-shadow(0 0 16px #caeb32)",
          ],
          transition: {
            duration: total,
            ease: "easeInOut",
            times,
            repeat: Infinity,
            repeatDelay: 0.8
          },
        }}
        className="absolute left-[-4%]"
        style={{ transformOrigin: "60% 70%", top: cfg.topLeft }}
      >
        {/* sway only affects the sprite, not the x position */}
        <motion.div animate={idleSway}>
          <Image
            src={leftSrc}
            alt="Left knight"
            width={cfg.leftH}
            height={cfg.leftH}
            draggable={false}
            style={spriteStyle}
            priority
          />
        </motion.div>
      </motion.div>

      {/* RIGHT — approach (closer) → HOLD (fixed) → SLOW retreat */}
      <motion.div
        initial={{ x: "140%", opacity: 1, filter: "drop-shadow(0 0 14px #af409f)" }}
        animate={{
          x: [
            `140%`,        // offscreen
            `${rightStop}%`, // arrive closer to center
            `${rightStop}%`, // HOLD (no movement)
            `140%`         // retreat
          ],
          opacity: [1,1,1,1],
          filter: [
            "drop-shadow(0 0 14px #af409f)",
            "drop-shadow(0 0 22px #af409f)",
            "drop-shadow(0 0 22px #af409f)",
            "drop-shadow(0 0 16px #af409f)",
          ],
          transition: {
            duration: total,
            ease: "easeInOut",
            times,
            repeat: Infinity,
            repeatDelay: 0.8
          },
        }}
        className="absolute right-[-4%]"
        style={{ transformOrigin: "40% 70%", top: cfg.topRight }}
      >
        <motion.div animate={idleSway}>
          <Image
            src={rightSrc}
            alt="Right knight"
            width={cfg.rightH}
            height={cfg.rightH}
            draggable={false}
            style={spriteStyle}
            priority
          />
        </motion.div>
      </motion.div>

      {/* SPARK (blended) — fades out */}
      <motion.svg
        variants={{
          burst: {
            opacity: [0, 1, 0],
            scale: [0.7 * cfg.fxScale, 1.3 * cfg.fxScale, 1.9 * cfg.fxScale],
            transition: { duration: 0.55, ease: "easeOut" }
          }
        }}
        initial={{ opacity: 0, scale: 0.7 * cfg.fxScale }}
        animate={spark}
        viewBox="0 0 200 200"
        className="absolute -translate-y-1/2"
        style={{ ...fxStyle, top: cfg.sparkTop, mixBlendMode: "screen" }}
        width={sparkSize}
        height={sparkSize}
      >
        <defs>
          <radialGradient id="lime" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#CAEB32" stopOpacity="0.9"/>
            <stop offset="60%" stopColor="#CAEB32" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#CAEB32" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="magenta" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#AF409F" stopOpacity="0.9"/>
            <stop offset="60%" stopColor="#AF409F" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#AF409F" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="core" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFF8C2"/>
            <stop offset="40%" stopColor="#FFD86B"/>
            <stop offset="100%" stopColor="rgba(255,216,107,0)"/>
          </radialGradient>
        </defs>
        <circle cx="95" cy="100" r="70" fill="url(#lime)" />
        <circle cx="105" cy="100" r="70" fill="url(#magenta)" />
        <circle cx="100" cy="100" r="55" fill="url(#core)" />
      </motion.svg>

      {/* SHOCKWAVE */}
      <motion.svg
        variants={{
          ripple: {
            opacity: [0.35, 0.2, 0],
            scale: [0.8 * cfg.fxScale, 1.6 * cfg.fxScale, 2.4 * cfg.fxScale],
            transition: { duration: 0.75, ease: "easeOut" }
          }
        }}
        initial={{ opacity: 0, scale: 0.8 * cfg.fxScale }}
        animate={wave}
        viewBox="0 0 200 200"
        className="absolute -translate-y-1/2"
        style={{ ...fxStyle, top: cfg.sparkTop, mixBlendMode: "screen" }}
        width={waveSize}
        height={waveSize}
      >
        <defs>
          <radialGradient id="ringGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFF8C2" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="#FFD86B" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#FFD86B" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="72" fill="none" stroke="url(#ringGrad)" strokeWidth="6" />
      </motion.svg>
    </motion.div>
  );
}
