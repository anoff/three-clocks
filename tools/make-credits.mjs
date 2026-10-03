// Writes CREDITS.md from src/media.js: `node tools/make-credits.mjs`
import { readFileSync, writeFileSync } from 'node:fs';
const src = readFileSync(new URL('../src/media.js', import.meta.url), 'utf8');
const MEDIA = new Function(src + '; return MEDIA;')();
const lane = { jp: 'Japan', us: 'America', de: 'Germany & Europe' };
const rows = Object.entries(MEDIA).map(([id, m]) => {
  const [year, r] = id.split('-');
  return `| ${year} | ${lane[r]} | [${m.file.replace(/\|/g, '\\|')}](${m.source}) | ${m.artist || 'Unknown'} | ${m.licenseUrl ? `[${m.license}](${m.licenseUrl})` : m.license} |`;
});
writeFileSync(new URL('../CREDITS.md', import.meta.url), `# Image credits

All photos, paintings and prints come from [Wikimedia Commons](https://commons.wikimedia.org/) and are used under the license shown. They were resized and cropped for the film; click a file name for the original and its full attribution.

| Year | Lane | File | Author | License |
|---|---|---|---|---|
${rows.join('\n')}

Maps are drawn from [Natural Earth](https://www.naturalearthdata.com/) data (public domain) via [world-atlas](https://github.com/topojson/world-atlas); routes are approximate.
Chart data: Nikkei 225 year-end closes (Nikkei Inc.); 2023 nominal GDP (IMF World Economic Outlook, April 2024).
`);
console.log('CREDITS.md', rows.length, 'images');
