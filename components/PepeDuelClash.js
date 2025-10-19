import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useMemo } from "react";
import Image from "next/image";

/**
 * Safe-zone duel:
 * - Both fighters RUSH IN → HOLD (no sliding) → SLOW RETREAT
 * - Right fighter slightly closer to center and larger
 * - Idle sway during HOLD only
 */
export default function PepeDuelClash({
  className = "",
  leftSrc = "/img/pepeswordknightleftleft.png",
  rightSrc = "/img/pepeswordknightright.png",
  clashAt = 1.1,      // approach time
  hold = 12.0,        // time paused at boundary
  retreat = 6.0,      // slow exit duration
  safePercent = 18,   // left boundary distance from center
  rightNudge = 5,     // bring right closer (safePercent - rightNudge)
}) {
  const spark  = useAnimationControls();
  const wave   = useAnimationControls();
  const camera = useAnimationControls();

  const rightStop = Math.max(0, safePercent - rightNudge);

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

  // Sizes
  const leftHeight  = 320 * 4.0;
  const rightHeight = 320 * 2.8; // right a bit larger

  const spriteStyle = { imageRendering: "pixelated", background: "transparent", opacity: 1 };

  // FX positioned at left boundary (the “clash” edge)
  const fxStyle = { left: `calc(50% - ${safePercent}%)` };

  // Idle sway applies only while holding (we animate the child, parent x stays fixed)
  const idleSway = {
    y: [0, -2, 0, 2, 0],
    rotate: [0, -0.6, 0, 0.6, 0],
    transition: { duration: 2.4, ease: "easeInOut", repeat: Infinity }
  };

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
            `-140%`,           // offscreen
            `-${safePercent}%`,// arrive
            `-${safePercent}%`,// HOLD (no movement)
            `-140%`            // retreat
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
        className="absolute left-[-4%] top-[-3%]"
        style={{ transformOrigin: "60% 70%" }}
      >
        {/* sway only affects the sprite, not the x position */}
        <motion.div animate={idleSway}>
          <Image src={leftSrc} alt="Left knight" width={leftHeight} height={leftHeight} draggable={false} style={spriteStyle}/>
        </motion.div>
      </motion.div>

      {/* RIGHT — approach (closer) → HOLD (fixed) → SLOW retreat */}
      <motion.div
        initial={{ x: "140%", opacity: 1, filter: "drop-shadow(0 0 14px #af409f)" }}
        animate={{
          x: [
            `140%`,          // offscreen
            `${rightStop}%`, // arrive closer to center
            `${rightStop}%`, // HOLD (no movement)
            `140%`           // retreat
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
        className="absolute right-[-4%] top-[-2%]"
        style={{ transformOrigin: "40% 70%" }}
      >
        <motion.div animate={idleSway}>
          <Image src={rightSrc} alt="Right knight" width={rightHeight} height={rightHeight} draggable={false} style={spriteStyle}/>
        </motion.div>
      </motion.div>

      {/* SPARK (blended) — fades out */}
      <motion.svg
        variants={{ burst: { opacity: [0, 1, 0], scale: [0.7, 1.3, 1.9], transition: { duration: 0.55, ease: "easeOut" } } }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={spark}
        viewBox="0 0 200 200"
        className="absolute top-[28%] -translate-y-1/2"
        style={{ ...fxStyle, mixBlendMode: "screen" }}
        width={210}
        height={210}
      >
        <defs>
          <radialGradient id="lime" cx="50%" cy="50%"><stop offset="0%" stopColor="#CAEB32" stopOpacity="0.9"/><stop offset="60%" stopColor="#CAEB32" stopOpacity="0.4"/><stop offset="100%" stopColor="#CAEB32" stopOpacity="0"/></radialGradient>
          <radialGradient id="magenta" cx="50%" cy="50%"><stop offset="0%" stopColor="#AF409F" stopOpacity="0.9"/><stop offset="60%" stopColor="#AF409F" stopOpacity="0.4"/><stop offset="100%" stopColor="#AF409F" stopOpacity="0"/></radialGradient>
          <radialGradient id="core" cx="50%" cy="50%"><stop offset="0%" stopColor="#FFF8C2"/><stop offset="40%" stopColor="#FFD86B"/><stop offset="100%" stopColor="rgba(255,216,107,0)"/></radialGradient>
        </defs>
        <circle cx="95" cy="100" r="70" fill="url(#lime)" />
        <circle cx="105" cy="100" r="70" fill="url(#magenta)" />
        <circle cx="100" cy="100" r="55" fill="url(#core)" />
      </motion.svg>

      {/* SHOCKWAVE */}
      <motion.svg
        variants={{ ripple: { opacity: [0.35, 0.2, 0], scale: [0.8, 1.6, 2.4], transition: { duration: 0.75, ease: "easeOut" } } }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={wave}
        viewBox="0 0 200 200"
        className="absolute top-[28%] -translate-y-1/2"
        style={{ ...fxStyle, mixBlendMode: "screen" }}
        width={240}
        height={240}
      >
        <defs>
          <radialGradient id="ringGrad" cx="50%" cy="50%"><stop offset="0%" stopColor="#FFF8C2" stopOpacity="0.9"/><stop offset="50%" stopColor="#FFD86B" stopOpacity="0.6"/><stop offset="100%" stopColor="#FFD86B" stopOpacity="0"/></radialGradient>
        </defs>
        <circle cx="100" cy="100" r="72" fill="none" stroke="url(#ringGrad)" strokeWidth="6" />
      </motion.svg>
    </motion.div>
  );
}
