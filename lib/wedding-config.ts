/**
 * ─────────────────────────────────────────────────────────────────────────
 *  WEDDING CONTENT — single source of truth
 * ─────────────────────────────────────────────────────────────────────────
 *  Edit everything about the couple, date, venues, story and gallery here.
 *  All values below are PLACEHOLDERS — swap them for the real details.
 *  See the "What to replace" checklist in the README after building.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface Venue {
  /** Display name of the venue, e.g. "The Glasshouse" */
  name: string;
  /** Full street address shown on the card */
  address: string;
  /** Human-readable time, e.g. "4:00 PM" */
  time: string;
  /**
   * Query used to build the Google Maps directions link.
   * Use the venue name + address, or a plus-code / lat,lng.
   */
  mapQuery: string;
}

export interface StoryChapter {
  /** Small eyebrow label, e.g. a year or a place */
  eyebrow: string;
  /** Chapter heading */
  title: string;
  /** One short paragraph */
  body: string;
  /** Optional image path (from /public). Omit for a text-only chapter. */
  image?: string;
  /** Alt text for the image */
  imageAlt?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  /** "tall" spans two rows in the masonry grid; "wide" spans two columns. */
  span?: "tall" | "wide";
}

export interface WeddingConfig {
  couple: {
    /** First partner's display name */
    one: string;
    /** Second partner's display name */
    two: string;
    /** How the two names are joined in the hero, e.g. "&" or "and" */
    joiner: string;
  };
  /** ISO 8601 date-time of the ceremony start, with timezone offset. */
  dateISO: string;
  /** Pre-formatted date string for display (kept separate so you control it). */
  dateDisplay: string;
  /** City / region line under the date */
  location: string;
  /** One-line hero tagline */
  tagline: string;

  story: {
    intro: string;
    chapters: StoryChapter[];
  };

  events: {
    ceremony: Venue;
    reception: Venue;
  };

  gallery: GalleryImage[];

  rsvp: {
    /** Deadline copy shown near the form */
    deadline: string;
    /** Max guests a single RSVP can bring (used by the number input) */
    maxGuests: number;
  };

  footer: {
    /** Warm closing line */
    message: string;
    /** Small credit line */
    credit: string;
  };
}

export const wedding: WeddingConfig = {
  couple: {
    one: "Aria",
    two: "Kai",
    joiner: "&",
  },

  // Ceremony starts 2026-09-19, 16:00, UTC+01:00. Change to your real date/tz.
  dateISO: "2026-09-19T16:00:00+01:00",
  dateDisplay: "September 19, 2026",
  location: "Lisbon, Portugal",
  tagline: "Two orbits, one gravity — join us as we begin.",

  story: {
    intro:
      "Every constellation starts with two points of light. Here is the short version of how ours found each other.",
    chapters: [
      {
        eyebrow: "2019 · The Meet",
        title: "A Chance Alignment",
        body: "We were seated next to each other at a friend's dinner neither of us wanted to attend. We stayed until the restaurant turned the lights off.",
        image: "/images/story-1.svg",
        imageAlt: "Placeholder photo of the couple, first chapter",
      },
      {
        eyebrow: "2022 · The Journey",
        title: "Building an Orbit",
        body: "Three cities, one very patient houseplant, and a thousand small mornings later, we realised we were already home wherever the other one was.",
        image: "/images/story-2.svg",
        imageAlt: "Placeholder photo of the couple, second chapter",
      },
      {
        eyebrow: "2025 · The Question",
        title: "A Fixed Point",
        body: "On a quiet rooftop under an unremarkable sky, one of us asked the only question that ever really mattered. The answer was never in doubt.",
      },
    ],
  },

  events: {
    ceremony: {
      name: "The Glasshouse Pavilion",
      address: "Rua das Estrelas 12, 1200-001 Lisbon",
      time: "4:00 PM",
      mapQuery: "The Glasshouse Pavilion, Rua das Estrelas 12, Lisbon",
    },
    reception: {
      name: "Aurora Rooftop",
      address: "Avenida do Horizonte 88, 1250-002 Lisbon",
      time: "7:00 PM",
      mapQuery: "Aurora Rooftop, Avenida do Horizonte 88, Lisbon",
    },
  },

  gallery: [
    { src: "/images/gallery-1.svg", alt: "Placeholder gallery photo 1", span: "tall" },
    { src: "/images/gallery-2.svg", alt: "Placeholder gallery photo 2" },
    { src: "/images/gallery-3.svg", alt: "Placeholder gallery photo 3" },
    { src: "/images/gallery-4.svg", alt: "Placeholder gallery photo 4", span: "wide" },
    { src: "/images/gallery-5.svg", alt: "Placeholder gallery photo 5" },
    { src: "/images/gallery-6.svg", alt: "Placeholder gallery photo 6", span: "tall" },
  ],

  rsvp: {
    deadline: "Kindly respond by August 15, 2026",
    maxGuests: 4,
  },

  footer: {
    message: "With love and light, we can't wait to see you there.",
    credit: "Made with care for our favourite people.",
  },
};

/** Builds a Google Maps directions URL from a venue's map query. */
export function directionsUrl(venue: Venue): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    venue.mapQuery,
  )}`;
}
