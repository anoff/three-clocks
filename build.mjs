// Builds the film into self-contained HTML. No dependencies: `node build.mjs`
//   dist/index.html     full page (GitHub Pages, or open it straight from disk)
//   dist/fragment.html  page body without <html>/<head>, for hosts that add their own document shell
//   dist/img/           the photos and paintings (from assets/img, see tools/process-images.py)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs';

const root = new URL('./', import.meta.url);
const read = p => readFileSync(new URL(p, root), 'utf8');

// Timeline first (it declares I18N), then illustrations, image credits, maps, charts and every translation in src/i18n/
const langs = readdirSync(new URL('src/i18n/', root)).filter(f => f.endsWith('.js')).sort((a, b) => (a === 'en.js' ? -1 : b === 'en.js' ? 1 : a.localeCompare(b)));
const data = [read('src/timeline.js'), read('src/art.js'), read('src/media.js'), read('src/maps.js'), read('src/charts.js'), ...langs.map(f => read(`src/i18n/${f}`))].join('\n');

// The lane wordmark and era chips use a few kanji in Shippori Mincho; ask Google Fonts for just those glyphs.
const kanji = [...new Set(('日本' + [...data.matchAll(/k: "([^"]+)"/g)].map(m => m[1]).join('')).split(''))].join('');
const kanjiFont = `https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@800&text=${encodeURIComponent(kanji)}&display=swap`;

const fragment = read('src/template.html')
  .replace('/*__DATA__*/', () => data)
  .replace('__KANJI_FONT__', kanjiFont);

const split = fragment.indexOf('<div class="app"');
const description = 'A three-minute animated film: 1,000 years of Japan, America and Germany side by side. English, Deutsch, 日本語.';
const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${description}">
<meta property="og:title" content="Three Clocks, One Millennium">
<meta property="og:description" content="${description}">
${fragment.slice(0, split).trim()}
</head>
<body>
${fragment.slice(split).trim()}
</body>
</html>
`;

mkdirSync(new URL('dist/img/', root), { recursive: true });
const images = readdirSync(new URL('assets/img/', root)).filter(f => f.endsWith('.jpg'));
for (const f of images) copyFileSync(new URL(`assets/img/${f}`, root), new URL(`dist/img/${f}`, root));
writeFileSync(new URL('dist/index.html', root), page);
writeFileSync(new URL('dist/fragment.html', root), fragment);
console.log(`Built dist/index.html (${(page.length / 1024).toFixed(1)} KB) + ${images.length} images with ${langs.length} languages: ${langs.map(f => f.replace('.js', '')).join(', ')}`);
