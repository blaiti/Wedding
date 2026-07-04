"use client";

import Image from "next/image";
import { wedding } from "@/lib/wedding-config";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";

/**
 * OurStory — a vertical timeline. A luminous spine runs down the centre (desktop)
 * or left edge (mobile); chapters alternate sides and reveal on scroll.
 */
export function OurStory() {
  const { intro, chapters } = wedding.story;

  return (
    <Section id="story" eyebrow="Our Story" title="How We Got Here">
      <Reveal>
        <p className="mx-auto mb-16 max-w-2xl text-balance text-center text-base leading-relaxed text-mist sm:mb-24">
          {intro}
        </p>
      </Reveal>

      <div className="relative">
        {/* The timeline spine */}
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-transparent via-champagne/25 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <ol className="space-y-16 sm:space-y-24">
          {chapters.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={c.title} className="relative">
                {/* Node on the spine */}
                <span className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2">
                  <span className="block h-3 w-3 rounded-full bg-champagne glow-champagne" />
                </span>

                <div
                  className={`grid gap-6 pl-12 md:grid-cols-2 md:items-center md:gap-12 md:pl-0 ${
                    flip ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Text */}
                  <Reveal
                    className={`[direction:ltr] ${flip ? "md:text-left" : "md:text-right"}`}
                  >
                    <p className="mb-2 font-display text-xs uppercase tracking-[0.3em] text-champagne-dim">
                      {c.eyebrow}
                    </p>
                    <h3 className="mb-3 font-display text-2xl font-light text-ink sm:text-3xl">
                      {c.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-mist sm:text-base">
                      {c.body}
                    </p>
                  </Reveal>

                  {/* Image (optional) */}
                  {c.image ? (
                    <Reveal delay={0.1} className="[direction:ltr]">
                      <div className="glass group relative aspect-[4/3] overflow-hidden rounded-2xl">
                        <Image
                          src={c.image}
                          alt={c.imageAlt ?? c.title}
                          fill
                          sizes="(max-width: 768px) 90vw, 45vw"
                          className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                      </div>
                    </Reveal>
                  ) : (
                    <div aria-hidden className="hidden md:block" />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
