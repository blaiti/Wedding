import { EnvelopeHero } from "@/components/EnvelopeHero";
import { Countdown } from "@/components/Countdown";
import { OurStory } from "@/components/OurStory";
import { EventDetails } from "@/components/EventDetails";
import { Gallery } from "@/components/Gallery";
import { Rsvp } from "@/components/Rsvp";
import { Footer } from "@/components/Footer";

/**
 * Single-page scroll experience. The envelope hero opens as you scroll the
 * first screen, then the stacked sections follow, each with its own
 * scroll-into-view animation.
 */
export default function Home() {
  return (
    <main className="relative">
      <EnvelopeHero />
      <Countdown />
      <OurStory />
      <EventDetails />
      <Gallery />
      <Rsvp />
      <Footer />
    </main>
  );
}
