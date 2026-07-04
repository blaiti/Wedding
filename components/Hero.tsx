"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { wedding } from "@/lib/wedding-config";
import { AuroraBackground } from "./ui/AuroraBackground";
import { Photo } from "./ui/Photo";

/**
 * Hero — full-viewport opening. Couple names, date, tagline over the ambient
 * aurora background, with a slow parallax as you scroll away and a scroll cue.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Parallax: background drifts slower than the foreground on scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const { one, two, joiner } = wedding.couple;
  const { hero } = wedding;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {/* Real wedding photo as the base layer… */}
        <Photo
          src={hero.photo.src}
          alt={hero.photo.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        {/* …a scrim so the headline stays legible over any photo… */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/55 to-void"
        />
        {/* …and the ambient aurora glow on top. */}
        <AuroraBackground />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="mb-8 font-display text-xs uppercase tracking-[0.5em] text-champagne-dim"
        >
          {hero.surtitle}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-gradient-champagne">{one}</span>
          <span className="mx-3 inline-block font-thin text-mist align-middle sm:mx-5">
            {joiner}
          </span>
          <span className="text-gradient-champagne">{two}</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mx-auto mt-10 flex max-w-md items-center justify-center gap-4"
        >
          <span className="rule-fade h-px flex-1" />
          <span className="whitespace-nowrap font-display text-sm uppercase tracking-[0.3em] text-ink">
            {wedding.dateDisplay}
          </span>
          <span className="rule-fade h-px flex-1" />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-4 font-display text-xs uppercase tracking-[0.3em] text-mist-dim"
        >
          {wedding.location}
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mt-10 max-w-xl text-balance text-base leading-relaxed text-mist sm:text-lg"
        >
          {wedding.tagline}
        </motion.p>

        {/* Mobile-only affordance: "opens" the invitation by scrolling in. */}
        <motion.div variants={item} className="mt-10 sm:hidden">
          <a
            href="#countdown"
            className="inline-flex items-center justify-center rounded-full border border-champagne/40 px-7 py-3.5 font-display text-sm uppercase tracking-[0.14em] text-champagne transition-colors hover:border-champagne/70 hover:text-champagne-hi"
          >
            {hero.openLabel}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#countdown"
        aria-label={hero.scrollAriaLabel}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="font-display text-[0.6rem] uppercase tracking-[0.35em] text-champagne-dim">
          {hero.scrollHint}
        </span>
        <span className="flex h-11 w-6 items-start justify-center rounded-full border border-champagne/30 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-champagne"
            animate={reduce ? {} : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
