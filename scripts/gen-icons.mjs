// Simple SVG-based placeholder icons
// Run: node scripts/gen-icons.mjs
import fs from 'fs';
import path from 'path';

const sizes = [192, 512];
const outDir = path.join(process.cwd(), 'public', 'icons');
fs.mkdirSync(outDir, { recursive: true });

for (const size of sizes) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7C3AED"/>
      <stop offset="100%" style="stop-color:#9333EA"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#g)"/>
  <text x="${size/2}" y="${size * 0.62}" font-size="${size * 0.45}" text-anchor="middle" fill="white">🌍</text>
</svg>`;
  fs.writeFileSync(path.join(outDir, `icon-${size}x${size}.svg`), svg);
  console.log(`Generated icon-${size}x${size}.svg`);
}
console.log('Done. Convert SVGs to PNG for production.');
