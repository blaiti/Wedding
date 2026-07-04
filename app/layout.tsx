import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { wedding } from "@/lib/wedding-config";

// Display face — geometric, lightly futuristic. Used for all headings.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Body face — clean neutral sans.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${wedding.couple.one} ${wedding.couple.joiner} ${wedding.couple.two} — ${wedding.dateDisplay}`;
const joinLine = `Rejoignez-nous à ${wedding.location} le ${wedding.dateDisplay}.`;

export const metadata: Metadata = {
  title,
  description: `${wedding.tagline} ${joinLine}`,
  openGraph: {
    title,
    description: joinLine,
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#050609",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      {/* .grain paints a fixed, blend-mode film-grain overlay over everything */}
      <body className="grain min-h-full bg-void text-ink">{children}</body>
    </html>
  );
}
