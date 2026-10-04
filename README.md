# Three Clocks, One Millennium

A four-minute animated film that runs the last 1,000 years of **Japan**, **America** and **Germany & Europe** side by side, so you can see what was happening in each place at the same moment.

**Watch it:** https://anoff.github.io/three-clocks/ (add `#de` or `#ja` to open it in German or Japanese)

- A rolling year counter spins from 1027 to 2026 across 33 fast scenes, each showing what was happening in all three places at that moment.
- Three lanes show each country's story at that moment; stamps and brackets mark the "same year, same emperor, same enemy" coincidences.
- **Real images for every event:** 91 period paintings, woodblock prints, portraits and historical photos from Wikimedia Commons (the Genji scroll, the Mongol invasion scroll, Luther at Worms, Hokusai's Great Wave, Einstein, Apollo 11 …) with a slow documentary-style pan and zoom and a credit line on each.
- **Animated maps** for Columbus' voyage, the Spanish expeditions and the Louisiana Purchase, plus gradient charts for the Nikkei bubble and the 2023 GDP ranking.
- A full credits screen (title card and end card) and [CREDITS.md](CREDITS.md) list every image with author and license.
- The era map at the bottom shows how Heian, the Holy Roman Empire, the Edo period, the American colonies and the rest overlap. Click any year to jump there.
- **Languages:** English, Deutsch, 日本語. The picker is on the title card and in the controls; the first visit follows the browser language.
- **Soundtrack:** an original groove synthesized live with the Web Audio API (no audio files). It drops to a quiet drone for World War II, with a stamp thud, earthquake rumble and a rewind whoosh. Toggle it with the speaker button or `M`.
- Works in landscape and portrait (phones get a vertical layout), light and dark mode, and respects reduced-motion settings.

Keyboard: `Space` play/pause · `←` `→` previous/next scene · `M` sound on/off.

## Project layout

```
src/
  timeline.js      years, scene order, links, effects, era boundaries (language-independent)
  media.js         image size, focus point and credit per scene lane (generated)
  maps.js          projected, simplified map shapes and routes (generated)
  charts.js        data for the Nikkei and GDP charts
  art.js           line-art fallbacks, used when a lane has no image
  i18n/en.js       all English text: UI, era names, every scene
  i18n/de.js       German
  i18n/ja.js       Japanese
  template.html    markup, styles, animation engine and soundtrack
assets/img/        the processed images, one per scene lane (<year>-<lane>.jpg)
build.mjs          stitches everything into dist/ (no dependencies)
tools/             image fetching, selection, map and credit generators (see below)
.github/workflows/pages.yml          builds and deploys to GitHub Pages on every push to master
.github/workflows/fetch-assets.yml   manual only: downloads image candidates from Wikimedia Commons
```

## Build locally

```sh
node build.mjs        # writes dist/index.html
open dist/index.html  # or just double-click it
```

Node 18 or newer, nothing to install.

## Editing the story

- **Change a scene's text:** edit the scene with the same year in each file under `src/i18n/`. Each lane is `[date tag, headline, detail]`.
- **Change an illustration:** set `art: { jp, us, de }` on the scene in `src/timeline.js` to any name from `src/art.js`, or draw a new one there (120×100 viewBox; plain shapes are stroked and animate in, class `f` is a soft fill).
- **Swap an image:** run the *Fetch image candidates* workflow (Actions tab) for the scene ids you want, which pushes candidates with license data to the `asset-candidates` branch. Pick one in `tools/image-picks.json` (candidate number and focus point), then run `python3 tools/process-images.py <candidates-dir>` and `node tools/make-credits.mjs`. Candidates come from the queries in `tools/assets-manifest.json`.
- **Change a map:** edit `SPECS` in `tools/make-maps.mjs` (bounding box, highlighted countries, route waypoints, pins) and run it with Natural Earth's `countries-50m.json`.
- **Add or move a scene:** add it to `SCENES` in `src/timeline.js`, then add text under the same year in every language file.
- **Add a language:** copy `src/i18n/en.js` to e.g. `src/i18n/fr.js`, change `I18N.en` to `I18N.fr`, and translate. The build picks it up and the picker shows it automatically.

Keep headlines short and details to about 90 characters (about 45 in Japanese) so they fit the lanes on a phone.

## Credits

Images: Wikimedia Commons contributors, see [CREDITS.md](CREDITS.md). Maps: Natural Earth. Chart data: Nikkei, IMF.

## A note on accuracy

Dates marked "c." (um / 頃) are approximate, and many stories are compressed to a single line. Corrections are welcome as issues or pull requests.
