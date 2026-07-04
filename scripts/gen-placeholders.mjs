// One-off generator for warm, clearly-labeled PHOTO placeholders.
// Run with: node scripts/gen-placeholders.mjs
// These stand in for real photos so the layout looks right before you drop
// your images in. Each is obviously a placeholder ("YOUR PHOTO" + filename).
// Safe to delete this script and the /public/photos SVGs once real photos are in.
import { writeFileSync, mkdirSync, rmSync } from "node:fs";

rmSync("public/images", { recursive: true, force: true }); // remove old monogram set
mkdirSync("public/photos", { recursive: true });

// Warm pastel pairs on ivory (lilac / peach / mint / sand blooms).
const palettes = [
  ["#f7f4ef", "#efe3f3", "#dcc9f2"], // lilac
  ["#f7f4ef", "#f6e6dc", "#f8d8c4"], // peach
  ["#f7f4ef", "#e2f0e8", "#c8ecd8"], // mint
  ["#f7f4ef", "#efe9df", "#e4d8c6"], // sand
];

// A small "photo" glyph (mountains + sun) drawn in soft accent.
function glyph(cx, cy, s, color) {
  return `<g transform="translate(${cx - s / 2}, ${cy - s / 2})" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" opacity="0.55">
    <rect x="0" y="0" width="${s}" height="${s}" rx="${s * 0.12}"/>
    <circle cx="${s * 0.32}" cy="${s * 0.34}" r="${s * 0.08}"/>
    <path d="M ${s * 0.1} ${s * 0.8} L ${s * 0.4} ${s * 0.48} L ${s * 0.62} ${s * 0.68} L ${s * 0.78} ${s * 0.52} L ${s * 0.9} ${s * 0.66} L ${s * 0.9} ${s * 0.9} L ${s * 0.1} ${s * 0.9} Z"/>
  </g>`;
}

function svg(w, h, [c0, c1, accent], filename) {
  const g = Math.min(w, h) * 0.16;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c0}"/>
      <stop offset="0.55" stop-color="${c1}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
    <radialGradient id="bloom" cx="70%" cy="22%" r="70%">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.5"/>
      <stop offset="0.6" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#bloom)"/>
  <rect x="10" y="10" width="${w - 20}" height="${h - 20}" rx="14" fill="none" stroke="#ffffff" stroke-opacity="0.6"/>
  ${glyph(w / 2, h / 2 - 14, g, "#8a7a6c")}
  <text x="50%" y="${h / 2 + g * 0.55}" text-anchor="middle"
    font-family="system-ui, sans-serif" font-size="13" letter-spacing="4"
    fill="#8a7a6c" fill-opacity="0.85">YOUR PHOTO</text>
  <text x="50%" y="${h - 18}" text-anchor="middle"
    font-family="ui-monospace, monospace" font-size="11" letter-spacing="1"
    fill="#8a7a6c" fill-opacity="0.5">${filename}</text>
</svg>`;
}

const jobs = [
  // story milestones (landscape 4:3)
  ["story-01", 1000, 750, 0],
  ["story-02", 1000, 750, 1],
  ["story-03", 1000, 750, 2],
  // gallery (mixed aspects to match the masonry spans)
  ["gallery-01", 800, 1000, 1],
  ["gallery-02", 800, 800, 2],
  ["gallery-03", 800, 800, 0],
  ["gallery-04", 1200, 750, 3],
  ["gallery-05", 800, 800, 1],
  ["gallery-06", 800, 1000, 2],
];

for (const [name, w, h, p] of jobs) {
  writeFileSync(`public/photos/${name}.svg`, svg(w, h, palettes[p], `${name}.jpg`));
}

console.log(`Generated ${jobs.length} photo placeholders in public/photos/`);
