"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — the site-wide scroll-into-view animation.
 * Fades in with a slight upward drift the first time it enters the viewport.
 * Honours prefers-reduced-motion automatically via Framer Motion.
 */

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Stagger helper — seconds to wait before animating in. */
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "p" | "h2" | "h3";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * RevealGroup — staggers the reveal of its direct <Reveal> children.
 * Wrap a list and give each child `variants={childVariants}` OR just nest
 * <Reveal delay={i * 0.08}> items; this helper is for the container-driven case.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Child variant to hand to motion elements inside a RevealGroup. */
export const revealChild: Variants = variants;
