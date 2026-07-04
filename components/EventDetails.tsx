"use client";

import { wedding, directionsUrl, type Venue } from "@/lib/wedding-config";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { MagneticButton } from "./ui/MagneticButton";

/** A single ceremony/reception card. */
function EventCard({
  kicker,
  venue,
  delay,
}: {
  kicker: string;
  venue: Venue;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="glass flex h-full flex-col items-center rounded-3xl p-8 text-center sm:p-10">
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-accent">
          {kicker}
        </span>

        <div className="my-6 flex items-center gap-3">
          <span className="rule-fade h-px w-8" />
          <ClockIcon />
          <span className="rule-fade h-px w-8" />
        </div>

        <p className="font-display text-xl tracking-[0.05em] text-ink">
          {venue.time}
        </p>

        <h3 className="mt-3 font-display text-2xl font-light text-ink sm:text-3xl">
          {venue.name}
        </h3>

        <p className="mt-3 max-w-xs text-sm leading-relaxed text-taupe">
          {venue.address}
        </p>

        <div className="mt-8">
          <MagneticButton
            href={directionsUrl(venue)}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            Get Directions
            <ArrowIcon />
          </MagneticButton>
        </div>
      </article>
    </Reveal>
  );
}

export function EventDetails() {
  const { ceremony, reception } = wedding.events;
  return (
    <Section
      id="details"
      eyebrow={wedding.sections.details.eyebrow}
      title={wedding.sections.details.title}
    >
      <div className="mx-auto grid max-w-4xl gap-6 sm:gap-8 md:grid-cols-2">
        <EventCard kicker="The Ceremony" venue={ceremony} delay={0} />
        <EventCard kicker="The Reception" venue={reception} delay={0.1} />
      </div>
    </Section>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="text-accent"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
