import { wedding } from "@/lib/wedding-config";
import { Reveal } from "./ui/Reveal";

/**
 * Footer — a warm closing line, the date once more, and small credits.
 */
export function Footer() {
  const { one, two, joiner } = wedding.couple;
  return (
    <footer className="relative overflow-hidden border-t border-line px-6 py-20 text-center">
      {/* Faint iridescent closing glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(220,201,242,0.35), rgba(248,216,196,0.2) 40%, transparent 70%)",
        }}
      />

      <Reveal>
        <p className="mx-auto max-w-lg text-balance font-display text-lg font-light italic leading-relaxed text-taupe sm:text-xl">
          {wedding.footer.message}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mx-auto my-8 flex max-w-xs items-center justify-center gap-4">
          <span className="rule-fade h-px flex-1" />
          <span className="text-iridescent animate-sheen font-display text-2xl font-normal tracking-[0.1em]">
            {one} {joiner} {two}
          </span>
          <span className="rule-fade h-px flex-1" />
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="font-sans text-xs uppercase tracking-[0.4em] text-accent">
          {wedding.dateDisplay}
        </p>
        <p className="mt-6 text-xs text-muted">{wedding.footer.credit}</p>
      </Reveal>
    </footer>
  );
}
