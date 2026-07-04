"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { wedding } from "@/lib/wedding-config";
import { Section } from "./ui/Section";
import { revealChild } from "./ui/Reveal";

/**
 * Gallery — a CSS masonry-style grid (some tiles span extra rows/cols) with a
 * keyboard-navigable lightbox. Real photos via next/image; tiles reveal with a
 * stagger on scroll.
 */
export function Gallery() {
  const images = wedding.gallery;
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );

  // Keyboard controls + scroll lock while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  const spanClass = (span?: "tall" | "wide") =>
    span === "tall"
      ? "sm:row-span-2 aspect-[3/4] sm:aspect-auto"
      : span === "wide"
        ? "sm:col-span-2 aspect-[16/10]"
        : "aspect-square";

  return (
    <Section
      id="gallery"
      eyebrow={wedding.sections.gallery.eyebrow}
      title={wedding.sections.gallery.title}
    >
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 sm:gap-4"
      >
        {images.map((img, i) => (
          <motion.li
            key={img.src}
            variants={revealChild}
            className={`group relative overflow-hidden rounded-2xl border border-white/50 ${spanClass(img.span)}`}
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              className="absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              aria-label={`Open image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 right-3 translate-y-1 text-white opacity-0 drop-shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ExpandIcon />
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full border border-white/60 bg-paper/70 p-2 text-ink transition-colors hover:border-accent/60 hover:text-accent"
            >
              <CloseIcon />
            </button>

            <NavButton side="left" onClick={prev} />

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[72vh] w-[92vw] max-w-4xl"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                sizes="92vw"
                className="rounded-2xl object-contain"
                priority
              />
            </motion.div>

            <NavButton side="right" onClick={next} />

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-paper/70 px-3 py-1 font-sans text-xs tracking-[0.3em] text-taupe">
              {active + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-paper/70 p-3 text-ink transition-colors hover:border-accent/60 hover:text-accent ${
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
        className={side === "right" ? "" : "rotate-180"}
      >
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function ExpandIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
