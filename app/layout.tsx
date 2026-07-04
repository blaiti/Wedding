import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { wedding } from "@/lib/wedding-config";
import { MeshBackground } from "@/components/ui/MeshBackground";

// Display face — Fraunces, a warm high-contrast modern serif. All headings.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

// Body face — Inter, clean neutral sans. Body copy + tracked eyebrows.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${wedding.couple.one} ${wedding.couple.joiner} ${wedding.couple.two} — ${wedding.dateDisplay}`;

export const metadata: Metadata = {
  title,
  description: `${wedding.hero.tagline} Join us in ${wedding.location} on ${wedding.dateDisplay}.`,
  openGraph: {
    title,
    description: `Join us in ${wedding.location} on ${wedding.dateDisplay}.`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ef",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      {/* .grain paints a fixed, blended film-grain overlay over everything */}
      <body className="grain min-h-full bg-ivory text-ink">
        <MeshBackground />
        {children}
      </body>
    </html>
  );
}
