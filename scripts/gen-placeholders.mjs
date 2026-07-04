// One-off generator for on-brand placeholder images.
// Run with: node scripts/gen-placeholders.mjs
// Produces gradient + starfield SVGs so the layout looks real before you
// drop in the actual photos. Safe to delete once real images are in place.
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("public/images", { recursive: true });

const palettes = [
  ["#0b1220", "#1b2233", "#e6d2a8"],
  ["#0a0d14", "#241d16", "#f3e7c4"],
  ["#0c1016", "#14202a", "#afb8c9"],
  ["#100b14", "#241a2b", "#e6d2a8"],
  ["#0a1013", "#122320", "#cfe0d6"],
  ["#0d0c12", "#1e1b2a", "#f3e7c4"],
];

function stars(w, h, n, color) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = ((i * 97.13) % w).toFixed(1);
    const y = ((i * 57.31) % h).toFixed(1);
    const r = (((i % 3) + 1) * 0.6).toFixed(1);
    const o = (0.15 + ((i % 5) / 5) * 0.5).toFixed(2);
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${o}"/>`;
  }
  return s;
}

function svg(w, h, [c0, c1, accent], label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c0}"/>
      <stop offset="1" stop-color="${c1}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="70%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.28"/>
      <stop offset="0.6" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${stars(w, h, 60, accent)}
  <g fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="1">
    <circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * 0.16}"/>
  </g>
  <text x="50%" y="50%" dy="0.35em" text-anchor="middle"
    font-family="'Space Grotesk', system-ui, sans-serif" font-size="${Math.min(w, h) * 0.09}"
    letter-spacing="4" fill="${accent}" fill-opacity="0.8">A &amp; K</text>
  <text x="50%" y="${h - 18}" text-anchor="middle"
    font-family="system-ui, sans-serif" font-size="12" letter-spacing="3"
    fill="${accent}" fill-opacity="0.45">${label}</text>
</svg>`;
}

const jobs = [
  ["story-1", 1000, 750, 0],
  ["story-2", 1000, 750, 1],
  ["gallery-1", 800, 1000, 2],
  ["gallery-2", 800, 800, 3],
  ["gallery-3", 800, 800, 4],
  ["gallery-4", 1200, 750, 5],
  ["gallery-5", 800, 800, 0],
  ["gallery-6", 800, 1000, 1],
];

for (const [name, w, h, p] of jobs) {
  writeFileSync(`public/images/${name}.svg`, svg(w, h, palettes[p], "PLACEHOLDER"));
}

console.log(`Generated ${jobs.length} placeholder images in public/images/`);
