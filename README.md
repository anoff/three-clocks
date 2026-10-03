# Three Clocks, One Millennium

A three-minute animated film that runs the last 1,000 years of **Japan**, **America** and **Germany & Europe** side by side, so you can see what was happening in each place at the same moment.

**Watch it:** https://anoff.github.io/three-timelines/ (add `#de` or `#ja` to open it in German or Japanese)

- A rolling year counter spins from 1027 to 2026 across 26 fast scenes.
- Three lanes show each country's story at that moment; stamps and brackets mark the "same year, same emperor, same enemy" coincidences.
- About 60 original line-art illustrations (a samurai helmet, Gutenberg's press, the Black Ships, a bullet train …) draw themselves in as each event appears.
- The era map at the bottom shows how Heian, the Holy Roman Empire, the Edo period, the American colonies and the rest overlap. Click any year to jump there.
- **Languages:** English, Deutsch, 日本語. The picker is on the title card and in the controls; the first visit follows the browser language.
- **Soundtrack:** an original groove synthesized live with the Web Audio API (no audio files). It drops to a quiet drone for World War II, with a stamp thud, earthquake rumble and a rewind whoosh. Toggle it with the speaker button or `M`.
- Works in landscape and portrait (phones get a vertical layout), light and dark mode, and respects reduced-motion settings.

Keyboard: `Space` play/pause · `←` `→` previous/next scene · `M` sound on/off.

## Project layout

```
src/
  timeline.js      years, scene order, links, effects, era boundaries (language-independent)
  art.js           the line-art illustrations, one SVG snippet per name
  i18n/en.js       all English text: UI, era names, every scene
  i18n/de.js       German
  i18n/ja.js       Japanese
  template.html    markup, styles, animation engine and soundtrack
build.mjs          stitches everything into dist/index.html (no dependencies)
.github/workflows/pages.yml   builds and deploys to GitHub Pages on every push to master
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
- **Add or move a scene:** add it to `SCENES` in `src/timeline.js`, then add text under the same year in every language file.
- **Add a language:** copy `src/i18n/en.js` to e.g. `src/i18n/fr.js`, change `I18N.en` to `I18N.fr`, and translate. The build picks it up and the picker shows it automatically.

Keep headlines short and details to about 90 characters (about 45 in Japanese) so they fit the lanes on a phone.

## A note on accuracy

Dates marked "c." (um / 頃) are approximate, and many stories are compressed to a single line. Corrections are welcome as issues or pull requests.
