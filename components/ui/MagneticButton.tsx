"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

/**
 * MagneticButton — a link/button that gently pulls toward the cursor on hover.
 * Falls back to a static button when the user prefers reduced motion.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  target,
  rel,
  type,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  function handleMove(e: MouseEvent<HTMLElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.28);
    y.set(relY * 0.28);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm tracking-[0.14em] uppercase transition-colors duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void";

  const styles =
    variant === "solid"
      ? "bg-champagne text-void hover:bg-champagne-hi glow-champagne"
      : "border border-champagne/30 text-champagne hover:border-champagne/70 hover:text-champagne-hi";

  const content = (
    <motion.span
      style={{ x: springX, y: springY }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  const shared = {
    className: `${base} ${styles} ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: reset,
  };

  if (href) {
    return (
      <a href={href} target={target} rel={rel} {...shared}>
        {content}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} {...shared}>
      {content}
    </button>
  );
}
