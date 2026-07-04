"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding-config";
import { Section } from "./ui/Section";

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diff(target: number): TimeParts {
  const ms = Math.max(0, target - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/** A single flip-in digit group that re-animates whenever its value changes. */
function Unit({ value, label }: { value: number; label: string }) {
  const display = value.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="glass relative flex h-20 w-16 items-center justify-center overflow-hidden rounded-2xl sm:h-28 sm:w-24">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: "-70%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "70%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute font-display text-3xl font-light tabular-nums text-gradient-champagne sm:text-5xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 font-display text-[0.65rem] uppercase tracking-[0.3em] text-mist-dim sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const target = new Date(wedding.dateISO).getTime();
  // Start null to avoid a server/client hydration mismatch on time.
  const [time, setTime] = useState<TimeParts | null>(null);

  useEffect(() => {
    // First tick on the next frame (not synchronously in the effect body),
    // then update every second. Starting client-side avoids a hydration
    // mismatch on the time.
    const raf = requestAnimationFrame(() => setTime(diff(target)));
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [target]);

  const isHere =
    time !== null &&
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0;

  return (
    <Section id="countdown" eyebrow="Counting down" title="The Moment Approaches">
      {isHere ? (
        <p className="text-center font-display text-2xl tracking-wide text-champagne">
          Today is the day.
        </p>
      ) : (
        <div className="flex items-start justify-center gap-3 sm:gap-6">
          <Unit value={time?.days ?? 0} label="Days" />
          <Separator />
          <Unit value={time?.hours ?? 0} label="Hours" />
          <Separator />
          <Unit value={time?.minutes ?? 0} label="Minutes" />
          <Separator />
          <Unit value={time?.seconds ?? 0} label="Seconds" />
        </div>
      )}
      <p className="mt-12 text-center text-sm text-mist-dim">
        until we say &ldquo;I do&rdquo; in {wedding.location}
      </p>
    </Section>
  );
}

function Separator() {
  return (
    <span className="mt-6 font-display text-2xl text-champagne-dim/40 sm:mt-9 sm:text-4xl">
      :
    </span>
  );
}
