import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Section — consistent vertical rhythm, max-width and an optional
 * eyebrow + heading treatment shared across the page.
 * Eyebrows are tracked sans (Inter); titles are the display serif (Fraunces).
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
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.4em] text-accent">
                {eyebrow}
              </p>
            </Reveal>
          )}
          {title && (
            <Reveal delay={0.06}>
              <h2 className="font-display text-4xl font-light tracking-tight text-ink sm:text-5xl md:text-[3.25rem]">
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
