import { wedding } from "@/lib/wedding-config";
import { Reveal } from "./ui/Reveal";

/**
 * Footer — a warm closing line, the date once more, and small credits.
 */
export function Footer() {
  const { one, two, joiner } = wedding.couple;
  return (
    <footer className="relative overflow-hidden border-t border-line/60 px-6 py-20 text-center">
      {/* Faint closing glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(230,210,168,0.10),transparent_70%)]"
      />

      <Reveal>
        <p className="mx-auto max-w-lg text-balance font-display text-lg font-light leading-relaxed text-mist sm:text-xl">
          {wedding.footer.message}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mx-auto my-8 flex max-w-xs items-center justify-center gap-4">
          <span className="rule-fade h-px flex-1" />
          <span className="font-display text-2xl font-light tracking-[0.2em] text-gradient-champagne">
            {one} {joiner} {two}
          </span>
          <span className="rule-fade h-px flex-1" />
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="font-display text-xs uppercase tracking-[0.4em] text-champagne-dim">
          {wedding.dateDisplay}
        </p>
        <p className="mt-6 text-xs text-mist-dim">{wedding.footer.credit}</p>
      </Reveal>
    </footer>
  );
}
