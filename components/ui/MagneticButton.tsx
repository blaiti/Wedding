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
 * Solid variant is warm charcoal ink with an iridescent foil sheen on hover;
 * ghost variant is an accent outline. Falls back to static under reduced motion.
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
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-sans text-xs tracking-[0.16em] uppercase transition-colors duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory";

  const styles =
    variant === "solid"
      ? "bg-ink text-ivory hover:bg-ink/90"
      : "border border-accent/40 text-accent hover:border-accent/80 hover:text-accent-deep";

  const content = (
    <motion.span
      style={{ x: springX, y: springY }}
      className="relative z-10 inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  // Iridescent foil sheen that sweeps across the solid button on hover.
  const sheen =
    variant === "solid" ? (
      <span
        aria-hidden
        className="iridescent pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-30"
      />
    ) : null;

  const shared = {
    className: `${base} ${styles} ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: reset,
  };

  if (href) {
    return (
      <a href={href} target={target} rel={rel} {...shared}>
        {sheen}
        {content}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} {...shared}>
      {sheen}
      {content}
    </button>
  );
}
