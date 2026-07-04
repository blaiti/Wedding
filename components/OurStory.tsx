"use client";

import Image from "next/image";
import { wedding } from "@/lib/wedding-config";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";

/**
 * OurStory — a vertical timeline. An iridescent spine runs down the centre
 * (desktop) or left edge (mobile); chapters alternate sides and reveal on
 * scroll. Every milestone has one real photo slot (next/image).
 */
export function OurStory() {
  const { intro, chapters } = wedding.story;

  return (
    <Section
      id="story"
      eyebrow={wedding.sections.story.eyebrow}
      title={wedding.sections.story.title}
    >
      <Reveal>
        <p className="mx-auto mb-16 max-w-2xl text-balance text-center text-base leading-relaxed text-taupe sm:mb-24">
          {intro}
        </p>
      </Reveal>

      <div className="relative">
        {/* The timeline spine */}
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-transparent via-iris-lilac to-transparent md:left-1/2 md:-translate-x-1/2" />

        <ol className="space-y-16 sm:space-y-24">
          {chapters.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={c.title} className="relative">
                {/* Node on the spine */}
                <span className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2">
                  <span className="iridescent glow-iris block h-3 w-3 rounded-full" />
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
                    <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-accent">
                      {c.eyebrow}
                    </p>
                    <h3 className="mb-3 font-display text-2xl font-light text-ink sm:text-3xl">
                      {c.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-taupe sm:text-base">
                      {c.body}
                    </p>
                  </Reveal>

                  {/* Photo */}
                  <Reveal delay={0.1} className="[direction:ltr]">
                    <div className="glass group relative aspect-[4/3] overflow-hidden rounded-2xl p-1.5">
                      <div className="relative h-full w-full overflow-hidden rounded-xl">
                        <Image
                          src={c.image}
                          alt={c.imageAlt}
                          fill
                          sizes="(max-width: 768px) 90vw, 45vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
