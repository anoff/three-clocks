// Downloads image candidates (with license + author) from Wikimedia Commons and map data from npm/jsdelivr.
// Runs in GitHub Actions (see .github/workflows/fetch-assets.yml): `node tools/fetch-assets.mjs <outDir>`
// Output: <outDir>/img/<id>-<n>.<ext>, <outDir>/index.json (metadata), <outDir>/data/*.json
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const out = process.argv[2] || 'out';
const manifest = JSON.parse(readFileSync(new URL('./assets-manifest.json', import.meta.url), 'utf8'));
const only = process.argv[3] ? new Set(process.argv[3].split(',')) : null; // optional: comma-separated ids
const UA = 'three-timelines/1.0 (https://github.com/anoff/three-timelines; build-time asset fetcher)';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function get(url, as = 'json') {
  for (let attempt = 0; attempt < 5; attempt++) {
    await sleep(350);
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Api-User-Agent': UA } });
    if (r.status === 429 || r.status >= 500) { await sleep(3000 * (attempt + 1)); continue; }
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return as === 'json' ? r.json() : Buffer.from(await r.arrayBuffer());
  }
  throw new Error(`gave up ${url}`);
}
const api = (host, params) => `https://${host}/w/api.php?` + new URLSearchParams({ format: 'json', formatversion: '2', ...params });
const clean = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

async function leadImage(lang, title) {
  const j = await get(api(`${lang}.wikipedia.org`, { action: 'query', prop: 'pageimages', piprop: 'name', pilicense: 'free', redirects: '1', titles: title }));
  const p = j.query && j.query.pages && j.query.pages[0];
  return p && p.pageimage ? [p.pageimage] : [];
}
async function search(q, n) {
  const j = await get(api('commons.wikimedia.org', { action: 'query', list: 'search', srnamespace: '6', srsearch: q, srlimit: String(n * 4) }));
  return ((j.query && j.query.search) || []).map(s => s.title.replace(/^File:/, '')).filter(f => /\.(jpe?g|png|tiff?)$/i.test(f)).slice(0, n);
}
async function info(file) {
  const j = await get(api('commons.wikimedia.org', { action: 'query', titles: 'File:' + file, prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '960' }));
  const p = j.query && j.query.pages && j.query.pages[0];
  const ii = p && p.imageinfo && p.imageinfo[0];
  if (!ii) return null;
  const m = ii.extmetadata || {}, v = k => clean(m[k] && m[k].value);
  return {
    file: p.title.replace(/^File:/, ''), page: ii.descriptionurl, thumb: ii.thumburl || ii.url, width: ii.width, height: ii.height,
    artist: v('Artist').slice(0, 160), license: v('LicenseShortName'), licenseUrl: v('LicenseUrl'), credit: v('Credit').slice(0, 160),
    date: v('DateTimeOriginal').slice(0, 60), desc: v('ImageDescription').slice(0, 240), objectName: v('ObjectName').slice(0, 120),
  };
}

async function resolve(cand) {
  if (cand.startsWith('file:')) return [cand.slice(5)];
  if (cand.startsWith('search:')) { const [q, n] = cand.slice(7).split('#'); return search(q, Number(n) || 1); }
  const m = cand.match(/^(\w\w):(.+)$/);
  if (m) return leadImage(m[1], m[2]);
  return [];
}

mkdirSync(`${out}/img`, { recursive: true });
mkdirSync(`${out}/data`, { recursive: true });
const index = [], log = [];
for (const item of manifest.images) {
  if (only && !only.has(item.id)) continue;
  const files = [];
  for (const cand of item.c) {
    try { for (const f of await resolve(cand)) if (!files.includes(f)) files.push(f); }
    catch (e) { log.push(`${item.id} ${cand}: ${e.message}`); }
  }
  let n = 0;
  for (const f of files.slice(0, 6)) {
    try {
      const meta = await info(f);
      if (!meta) { log.push(`${item.id} no imageinfo: ${f}`); continue; }
      const ext = (meta.thumb.match(/\.(jpe?g|png)$/i) || ['.jpg'])[0].toLowerCase().replace('jpeg', 'jpg');
      const name = `${item.id}-${++n}${ext}`;
      writeFileSync(`${out}/img/${name}`, await get(meta.thumb, 'buffer'));
      index.push({ id: item.id, n, name, ...meta });
      console.log('ok', name, meta.file, '|', meta.license);
    } catch (e) { log.push(`${item.id} ${f}: ${e.message}`); }
  }
  if (!n) log.push(`${item.id}: NO IMAGES`);
}
for (const d of manifest.data || []) {
  try { writeFileSync(`${out}/data/${d.name}`, await get(d.url, 'buffer')); console.log('ok data', d.name); }
  catch (e) { log.push(`data ${d.name}: ${e.message}`); }
}
writeFileSync(`${out}/index.json`, JSON.stringify(index, null, 1));
writeFileSync(`${out}/log.txt`, log.join('\n') + '\n');
console.log(`${index.length} images, ${log.length} problems`);
