import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Section — consistent vertical rhythm, max-width and an optional
 * eyebrow + heading treatment shared across the page.
 */
export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
  contentClassName = "",
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 sm:py-32 ${className}`}
    >
      {(eyebrow || title) && (
        <header className="mb-14 text-center sm:mb-20">
          {eyebrow && (
            <Reveal>
              <p className="mb-4 font-display text-xs uppercase tracking-[0.42em] text-champagne-dim">
                {eyebrow}
              </p>
            </Reveal>
          )}
          {title && (
            <Reveal delay={0.06}>
              <h2 className="font-display text-3xl font-light tracking-tight text-ink sm:text-4xl md:text-5xl">
                {title}
              </h2>
            </Reveal>
          )}
          <Reveal delay={0.12}>
            <div className="rule-fade mx-auto mt-8 w-24" />
          </Reveal>
        </header>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
