"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

/**
 * AuroraBackground — the ambient hero backdrop.
 * Layers: deep radial vignette + two slow-drifting champagne aurora blobs +
 * a sparse field of faint drifting "stars". Purely decorative (aria-hidden).
 * Restraint is the point — everything is low-opacity and slow.
 */
export function AuroraBackground() {
  const reduce = useReducedMotion();

  // Deterministic-ish particle field generated once on mount.
  const stars = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: `${(i * 37.5) % 100}%`,
        top: `${(i * 53.7) % 100}%`,
        size: (i % 3) + 1,
        delay: (i % 7) * 0.6,
        duration: 4 + (i % 5),
      })),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Base vignette so the aurora reads as light from within the dark */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(230,210,168,0.10),transparent_55%)]" />

      {/* Aurora blob one */}
      <div
        className={`absolute left-1/2 top-[-20%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full blur-[120px] ${
          reduce ? "" : "animate-aurora"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(230,210,168,0.30), transparent 62%)",
        }}
      />

      {/* Aurora blob two — cooler, offset, counter-drift */}
      <div
        className={`absolute right-[8%] top-[8%] h-[52vh] w-[52vh] rounded-full blur-[130px] ${
          reduce ? "" : "animate-aurora"
        }`}
        style={{
          animationDirection: "reverse",
          animationDuration: "28s",
          background:
            "radial-gradient(circle at 50% 50%, rgba(175,184,201,0.16), transparent 60%)",
        }}
      />

      {/* Star / particle field */}
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-champagne"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          initial={{ opacity: 0.12 }}
          animate={
            reduce
              ? { opacity: 0.2 }
              : { opacity: [0.1, 0.7, 0.1], y: [0, -6, 0] }
          }
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Fade the aurora into the page below */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
    </div>
  );
}
