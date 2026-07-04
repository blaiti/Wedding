/**
 * ─────────────────────────────────────────────────────────────────────────
 *  WEDDING CONTENT — single source of truth
 * ─────────────────────────────────────────────────────────────────────────
 *  Edit everything about the couple, date, venues, story, gallery and the
 *  section labels here. All values are PLACEHOLDERS — swap them for the real
 *  details. Photo slots point at /public/photos/*.svg placeholders; drop your
 *  real images in (see the "What to replace" checklist in the README).
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface Venue {
  /** Display name of the venue, e.g. "The Orangery" */
  name: string;
  /** Full street address shown on the card */
  address: string;
  /** Human-readable time, e.g. "4:00 PM" */
  time: string;
  /** Query used to build the Google Maps directions link. */
  mapQuery: string;
}

export interface StoryChapter {
  /** Small eyebrow label, e.g. a year or a place */
  eyebrow: string;
  /** Chapter heading */
  title: string;
  /** One short paragraph */
  body: string;
  /** Photo path (from /public). Every milestone has one real photo slot. */
  image: string;
  /** Alt text for the image */
  imageAlt: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  /** "tall" spans two rows in the masonry grid; "wide" spans two columns. */
  span?: "tall" | "wide";
}

export interface SectionLabel {
  eyebrow: string;
  title: string;
}

export interface WeddingConfig {
  couple: {
    one: string;
    two: string;
    /** How the names are joined in the reveal, e.g. "&" or "and" */
    joiner: string;
  };
  /** ISO 8601 date-time of the ceremony start, with timezone offset. */
  dateISO: string;
  /** Pre-formatted date string for display. */
  dateDisplay: string;
  /** City / region line. */
  location: string;

  hero: {
    /** One-line, warm tagline shown on the revealed invitation card. */
    tagline: string;
    /** Initials shown on the wax seal, e.g. "A & K" or "AK". */
    sealInitials: string;
    /** Prompt on the sealed envelope for the mobile tap-to-open fallback. */
    tapPrompt: string;
    /** Small hint shown on desktop before the scroll-open begins. */
    scrollHint: string;
  };

  /** Per-section eyebrow + title. Kept here so all copy lives in one place. */
  sections: {
    countdown: SectionLabel;
    story: SectionLabel;
    details: SectionLabel;
    gallery: SectionLabel;
    rsvp: SectionLabel;
  };

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
    deadline: string;
    maxGuests: number;
  };

  footer: {
    message: string;
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

  hero: {
    // Alternatives to try:
    //  · "The beginning of our forever — and we'd love you there."
    //  · "Two hearts, one home. Come be part of the day we begin."
    //  · "We're getting married — join us for a day of love and light."
    tagline: "Come celebrate the beginning of our forever.",
    sealInitials: "A & K",
    tapPrompt: "Tap to open",
    scrollHint: "Scroll to open",
  },

  sections: {
    // Softer, warmer labels. Swap freely.
    countdown: { eyebrow: "The Countdown", title: "Until We Say I Do" },
    story: { eyebrow: "Our Story", title: "How We Began" },
    details: { eyebrow: "The Celebration", title: "Where & When" },
    gallery: { eyebrow: "Us, Lately", title: "A Few Favourite Moments" },
    rsvp: { eyebrow: "Join Us", title: "Will You Celebrate With Us?" },
  },

  story: {
    intro:
      "A few of the moments that brought us here — the small beginnings that turned into a lifetime.",
    chapters: [
      {
        eyebrow: "2019 · The Meet",
        title: "The Night We Met",
        body: "Seated side by side at a friend's dinner neither of us wanted to attend, we stayed talking long after everyone else had gone home.",
        image: "/photos/story-01.svg",
        imageAlt: "PLACEHOLDER — replace with a photo of how you met",
      },
      {
        eyebrow: "2022 · The Journey",
        title: "Making a Home",
        body: "Three cities, one very patient houseplant, and a thousand ordinary mornings later, we realised we were already home wherever the other one was.",
        image: "/photos/story-02.svg",
        imageAlt: "PLACEHOLDER — replace with a photo from your years together",
      },
      {
        eyebrow: "2025 · The Question",
        title: "Forever, Please",
        body: "On a quiet evening with no grand plan, one of us asked the only question that ever really mattered. The answer was yes before it was even finished.",
        image: "/photos/story-03.svg",
        imageAlt: "PLACEHOLDER — replace with a photo from the proposal",
      },
    ],
  },

  events: {
    ceremony: {
      name: "The Orangery",
      address: "Rua das Flores 12, 1200-001 Lisbon",
      time: "4:00 PM",
      mapQuery: "The Orangery, Rua das Flores 12, Lisbon",
    },
    reception: {
      name: "Casa do Jardim",
      address: "Avenida da Liberdade 88, 1250-002 Lisbon",
      time: "7:00 PM",
      mapQuery: "Casa do Jardim, Avenida da Liberdade 88, Lisbon",
    },
  },

  gallery: [
    { src: "/photos/gallery-01.svg", alt: "PLACEHOLDER photo 1", span: "tall" },
    { src: "/photos/gallery-02.svg", alt: "PLACEHOLDER photo 2" },
    { src: "/photos/gallery-03.svg", alt: "PLACEHOLDER photo 3" },
    { src: "/photos/gallery-04.svg", alt: "PLACEHOLDER photo 4", span: "wide" },
    { src: "/photos/gallery-05.svg", alt: "PLACEHOLDER photo 5" },
    { src: "/photos/gallery-06.svg", alt: "PLACEHOLDER photo 6", span: "tall" },
  ],

  rsvp: {
    deadline: "Kindly respond by August 15, 2026",
    maxGuests: 4,
  },

  footer: {
    message: "With love and gratitude, we can't wait to celebrate with you.",
    credit: "Made with love for our favourite people.",
  },
};

/** Builds a Google Maps directions URL from a venue's map query. */
export function directionsUrl(venue: Venue): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    venue.mapQuery,
  )}`;
}
