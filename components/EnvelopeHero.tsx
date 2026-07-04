"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  animate,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/wedding-config";

/**
 * EnvelopeHero — the signature moment.
 *
 * A sealed, iridescent-foil envelope that opens to reveal the invitation card.
 * Everything is driven by a single 0→1 `progress` MotionValue so the exact same
 * visual is reused across three modes:
 *
 *   • scroll   (desktop / fine pointer) — progress is scroll-linked over a tall
 *              sticky section; the reveal completes within ~one screen of scroll
 *              and then releases into normal page scroll. No scroll hijacking.
 *   • tap      (touch / coarse pointer) — progress is animated on tap, so the
 *              reveal can never jank against fragile mobile scroll.
 *   • reduced  (prefers-reduced-motion) — progress is pinned to 1: the opened
 *              card is shown immediately, no animation.
 */

type Mode = "scroll" | "tap" | "reduced";

export function EnvelopeHero() {
  const reduce = useReducedMotion();
  // SSR + first client paint render the scroll version (sealed envelope) so
  // hydration matches; the real mode is decided after mount.
  const [mode, setMode] = useState<Mode>("scroll");

  useEffect(() => {
    // Decide the mode on the next frame (not synchronously in the effect body)
    // so the first client paint matches the SSR "scroll" markup, then enhances.
    const raf = requestAnimationFrame(() => {
      if (reduce) {
        setMode("reduced");
        return;
      }
      const coarse =
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768;
      setMode(coarse ? "tap" : "scroll");
    });
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  if (mode === "reduced") return <ReducedHero />;
  if (mode === "tap") return <TapHero />;
  return <ScrollHero />;
}

/* ── Mode: scroll-linked (desktop) ─────────────────────────────────────── */
function ScrollHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // The 200vh section over a 100vh sticky pane means the reveal plays across
  // ~one screen of scrolling, then the pane unpins and normal scroll resumes.
  // Hide the hint the moment scrolling begins (state, so it never flickers back).
  const [hintHidden, setHintHidden] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.03) setHintHidden(true);
  });

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <EnvelopeStage progress={scrollYProgress} />
        <motion.p
          animate={{ opacity: hintHidden ? 0 : 1, y: hintHidden ? 6 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-muted"
        >
          {wedding.hero.scrollHint}
        </motion.p>
      </div>
    </section>
  );
}

/* ── Mode: tap-to-open (mobile) ────────────────────────────────────────── */
function TapHero() {
  const progress = useMotionValue(0);
  const [opened, setOpened] = useState(false);

  function open() {
    if (opened) return;
    setOpened(true);
    animate(progress, 1, { duration: 1.7, ease: [0.22, 1, 0.36, 1] });
  }

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <button
        type="button"
        onClick={open}
        aria-label="Open the invitation"
        className="relative cursor-pointer focus-visible:outline-none"
      >
        <EnvelopeStage progress={progress} />
      </button>

      <motion.p
        animate={{ opacity: opened ? 0 : 1, y: opened ? 8 : 0 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full border border-line bg-paper/70 px-5 py-2 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-taupe backdrop-blur"
      >
        {wedding.hero.tapPrompt}
      </motion.p>
    </section>
  );
}

/* ── Mode: reduced motion ──────────────────────────────────────────────── */
function ReducedHero() {
  // Pinned open — the card is shown immediately with no animation.
  const progress = useMotionValue(1);
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <EnvelopeStage progress={progress} />
    </section>
  );
}

/* ── The shared visual, driven entirely by `progress` (0 → 1) ──────────── */
function EnvelopeStage({ progress }: { progress: MotionValue<number> }) {
  const { one, two, joiner } = wedding.couple;
  const { sealInitials, tagline } = wedding.hero;

  // Flap swings open about its top hinge.
  const flapRotate = useTransform(progress, [0.06, 0.32], [0, -178]);
  // Seal breaks free as the flap lifts.
  const sealOpacity = useTransform(progress, [0.04, 0.2], [1, 0]);
  const sealScale = useTransform(progress, [0.04, 0.24], [1, 0.62]);
  // Card slides up and out of the pocket, growing slightly as it settles.
  const cardY = useTransform(progress, [0.24, 0.64], ["14%", "-50%"]);
  const cardScale = useTransform(progress, [0.24, 0.7], [0.9, 1]);
  // The envelope itself fades once the card is clear of it.
  const bodyOpacity = useTransform(progress, [0.5, 0.72], [1, 0]);
  // Invitation copy fades in last.
  const contentOpacity = useTransform(progress, [0.6, 0.86], [0, 1]);
  const contentY = useTransform(progress, [0.6, 0.86], [18, 0]);

  return (
    <div
      className="relative h-[min(66vh,460px)] w-[min(86vw,380px)]"
      style={{ perspective: "1400px" }}
    >
      {/* Soft contact shadow grounding the envelope */}
      <motion.div
        aria-hidden
        style={{ opacity: bodyOpacity }}
        className="absolute inset-x-6 bottom-[-4%] z-0 h-10 rounded-[50%] blur-xl"
      >
        <div className="h-full w-full rounded-[50%] bg-[rgba(120,100,80,0.28)]" />
      </motion.div>

      {/* Envelope back / inside — behind the card */}
      <motion.div
        aria-hidden
        style={{
          opacity: bodyOpacity,
          background: "linear-gradient(170deg, #f1e9db 0%, #e9dfcd 100%)",
        }}
        className="absolute inset-x-0 bottom-0 z-10 h-[60%] rounded-[16px] border border-[#dccdb6] shadow-[0_26px_60px_-30px_rgba(110,90,68,0.55)]"
      />

      {/* The invitation card — rises up out of the envelope */}
      <motion.article
        style={{
          x: "-50%",
          y: cardY,
          scale: cardScale,
          boxShadow: "0 30px 70px -34px rgba(90,72,56,0.6)",
        }}
        className="glass absolute bottom-[12%] left-1/2 z-20 w-[min(78vw,318px)] origin-bottom overflow-hidden rounded-2xl px-7 pb-9 pt-8 text-center"
      >
        {/* Iridescent foil hairline along the top edge */}
        <div className="iridescent animate-sheen absolute inset-x-0 top-0 h-[3px]" />

        <motion.div style={{ opacity: contentOpacity, y: contentY }}>
          <p className="mb-5 font-sans text-[0.62rem] uppercase tracking-[0.4em] text-accent">
            Together with our families
          </p>

          <h1 className="font-display text-5xl font-light leading-[0.95] tracking-tight text-ink sm:text-6xl">
            {one}
            <span className="text-iridescent animate-sheen mx-2 inline-block align-middle text-3xl font-normal sm:text-4xl">
              {joiner}
            </span>
            {two}
          </h1>

          <div className="mx-auto my-6 flex max-w-[15rem] items-center justify-center gap-3">
            <span className="rule-fade h-px flex-1" />
            <span className="whitespace-nowrap font-sans text-[0.72rem] uppercase tracking-[0.28em] text-taupe">
              {wedding.dateDisplay}
            </span>
            <span className="rule-fade h-px flex-1" />
          </div>

          <p className="font-sans text-[0.68rem] uppercase tracking-[0.32em] text-muted">
            {wedding.location}
          </p>

          <p className="mx-auto mt-6 max-w-[16rem] text-balance font-display text-[0.95rem] italic leading-relaxed text-taupe">
            {tagline}
          </p>
        </motion.div>
      </motion.article>

      {/* Envelope front + flap + seal — in front of the card */}
      <motion.div
        aria-hidden
        style={{ opacity: bodyOpacity, perspective: "1400px" }}
        className="absolute inset-0 z-30"
      >
        {/* Front pocket — a full-width, straight-topped opaque panel. It hides
            the lower part of the card so the card can rise cleanly up and out
            of the top (no side gaps peeking through). */}
        <div
          className="absolute inset-x-0 bottom-0 h-[67%] overflow-hidden rounded-[16px]"
          style={{
            background:
              "linear-gradient(160deg, #efe7d8 0%, #e5dac5 58%, #d9cbb2 100%)",
            borderTop: "1px solid rgba(255,255,255,0.55)",
            boxShadow: "0 -6px 18px -14px rgba(90,72,56,0.4)",
          }}
        >
          {/* Envelope seams — two folds converging up to the centre */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "linear-gradient(to top right, transparent calc(50% - 1px), rgba(198,178,224,0.55) 50%, transparent calc(50% + 1px)), linear-gradient(to top left, transparent calc(50% - 1px), rgba(236,190,164,0.5) 50%, transparent calc(50% + 1px))",
            }}
          />
          {/* Iridescent glint along the pocket's top edge */}
          <div className="iridescent animate-sheen absolute inset-x-0 top-0 h-[2px] opacity-70" />
        </div>

        {/* Flap — hinged at the top, swings open */}
        <motion.div
          style={{
            rotateX: flapRotate,
            transformOrigin: "50% 0%",
            transformStyle: "preserve-3d",
            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
            background:
              "linear-gradient(200deg, #f3ecdf 0%, #e8ddc9 68%, #dccdb5 100%)",
            backfaceVisibility: "hidden",
            borderTop: "1px solid rgba(255,255,255,0.5)",
          }}
          className="absolute inset-x-0 top-0 h-[50%] shadow-[0_14px_26px_-16px_rgba(90,72,56,0.5)]"
        />

        {/* Iridescent wax seal with the couple's initials */}
        <motion.div
          style={{ x: "-50%", opacity: sealOpacity, scale: sealScale }}
          className="glow-iris absolute left-1/2 top-[38%] z-40 flex h-[72px] w-[72px] items-center justify-center rounded-full shadow-[0_8px_18px_-8px_rgba(90,72,56,0.6)]"
        >
          <div className="iridescent animate-sheen absolute inset-0 rounded-full" />
          <div className="absolute inset-0 rounded-full ring-1 ring-white/50" />
          <div className="absolute inset-[4px] rounded-full border border-white/40" />
          <span className="relative font-display text-[0.95rem] font-medium tracking-[0.12em] text-ink/75">
            {sealInitials}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
