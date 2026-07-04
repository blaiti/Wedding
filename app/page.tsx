import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { OurStory } from "@/components/OurStory";
import { EventDetails } from "@/components/EventDetails";
import { Gallery } from "@/components/Gallery";
import { Rsvp } from "@/components/Rsvp";
import { Footer } from "@/components/Footer";

/**
 * Single-page scroll experience. Sections are stacked vertically in order;
 * each one manages its own scroll-into-view animation.
 */
export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Countdown />
      <OurStory />
      <EventDetails />
      <Gallery />
      <Rsvp />
      <Footer />
    </main>
  );
}
