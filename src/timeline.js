// Three Clocks — timeline structure (language-independent).
// Every scene is keyed by its year; the text for each language lives in src/i18n/<lang>.js under the same year.
//   year  : where the rolling counter stops
//   order : which lanes slide in first (default jp, us, de)
//   link  : lanes joined by a bracket ("these happened together")
//   stamp : true when the scene gets a rubber stamp (its text is translated)
//   fx    : "shake" (earthquakes) or "dark" (World War II)
//   dur   : seconds on screen at 1× (default 6.6)
//   art   : illustration per lane, by name from src/art.js
const SCENES = [
  { year: 1027, art: { jp: "scroll", us: "mound", de: "crown" } },
  { year: 1077, order: ["de", "jp", "us"], art: { us: "mound", de: "snowfort" } },
  { year: 1185, art: { jp: "kabuto", us: "cliff", de: "drown" } },
  { year: 1241, order: ["de", "jp", "us"], link: ["jp", "de"], stamp: true, art: { jp: "storm", us: "corn", de: "bow" } },
  { year: 1348, order: ["de", "jp", "us"], art: { de: "skull" } },
  { year: 1455, order: ["de", "jp", "us"], art: { jp: "fire", us: "longhouse", de: "press" } },
  { year: 1492, order: ["us", "de", "jp"], link: ["us", "de"], stamp: true, art: { jp: "banners", us: "caravel", de: "globe" } },
  { year: 1521, order: ["de", "us", "jp"], link: ["us", "de"], stamp: true, art: { jp: "kabuto", us: "temple", de: "book" } },
  { year: 1543, link: ["jp", "de"], stamp: true, art: { jp: "musket", us: "compass", de: "orbit" } },
  { year: 1600, order: ["de", "us", "jp"], art: { jp: "castle", us: "fort", de: "scales" } },
  { year: 1618, art: { jp: "lock", us: "caravel", de: "swords" } },
  { year: 1683, order: ["us", "de", "jp"], link: ["us", "de"], stamp: true, art: { jp: "fan", us: "house", de: "shield" } },
  { year: 1701, order: ["de", "jp", "us"], art: { jp: "katana", us: "kite", de: "crown" } },
  { year: 1776, link: ["jp", "de"], stamp: true, art: { jp: "anatomy", us: "scroll", de: "heart" } },
  { year: 1806, order: ["de", "us", "jp"], link: ["jp", "de"], art: { jp: "wave", us: "map", de: "ruin" } },
  { year: 1848, order: ["de", "us", "jp"], link: ["jp", "us"], stamp: true, art: { jp: "steamship", us: "goldpan", de: "flag" } },
  { year: 1868, order: ["us", "jp", "de"], link: ["jp", "us", "de"], stamp: true, art: { jp: "sunrise", us: "cannon", de: "pickelhaube" } },
  { year: 1889, order: ["us", "de", "jp"], link: ["jp", "de"], stamp: true, art: { jp: "scroll", us: "train", de: "tophat" } },
  { year: 1905, link: ["jp", "us"], stamp: true, art: { jp: "warship", us: "dove", de: "atom" } },
  { year: 1918, order: ["de", "us", "jp"], link: ["jp", "de"], stamp: true, art: { jp: "notes" } },
  { year: 1923, fx: "shake", stamp: true, art: { jp: "crack", us: "skyscraper", de: "wheelbarrow" } },
  { year: 1941, order: ["de", "jp", "us"], fx: "dark", dur: 9 },
  { year: 1964, order: ["us", "de", "jp"], art: { jp: "shinkansen", us: "moon", de: "beetle" } },
  { year: 1989, order: ["de", "jp", "us"], link: ["jp", "de"], stamp: true, art: { jp: "bubble", de: "wall" } },
  { year: 2011, link: ["jp", "de"], fx: "shake", stamp: true, art: { jp: "wave", us: "aid", de: "turbine" } },
  { year: 2026, art: { jp: "blossom", us: "fireworks", de: "chart" } },
];

// Era bands per lane. s/e = start/end year, k = era name in kanji (shown next to the romanized name).
const ERAS = {
  jp: [
    { id: "heian", s: 1026, e: 1185, k: "平安" }, { id: "kamakura", s: 1185, e: 1333, k: "鎌倉" },
    { id: "kenmu", s: 1333, e: 1336, k: "建武" }, { id: "muromachi", s: 1336, e: 1467, k: "室町" },
    { id: "sengoku", s: 1467, e: 1603, k: "戦国" }, { id: "edo", s: 1603, e: 1868, k: "江戸" },
    { id: "meiji", s: 1868, e: 1912, k: "明治" }, { id: "taisho", s: 1912, e: 1926, k: "大正" },
    { id: "showa", s: 1926, e: 1989, k: "昭和" }, { id: "heisei", s: 1989, e: 2019, k: "平成" },
    { id: "reiwa", s: 2019, e: 2027, k: "令和" },
  ],
  us: [
    { id: "indigenous", s: 1026, e: 1492 }, { id: "arrival", s: 1492, e: 1607 },
    { id: "colonial", s: 1607, e: 1776 }, { id: "republic", s: 1776, e: 1861 },
    { id: "civilwar", s: 1861, e: 1865 }, { id: "industrial", s: 1865, e: 1917 },
    { id: "worldwars", s: 1917, e: 1945 }, { id: "coldwar", s: 1945, e: 1991 },
    { id: "superpower", s: 1991, e: 2027 },
  ],
  de: [
    { id: "hreMedieval", s: 1026, e: 1517 }, { id: "hreReformation", s: 1517, e: 1618 },
    { id: "hreThirty", s: 1618, e: 1648 }, { id: "hrePrussia", s: 1648, e: 1806 },
    { id: "unity", s: 1806, e: 1871 }, { id: "empire", s: 1871, e: 1918 },
    { id: "weimar", s: 1918, e: 1933 }, { id: "nazi", s: 1933, e: 1945 },
    { id: "divided", s: 1945, e: 1990 }, { id: "reunified", s: 1990, e: 2027 },
  ],
};

const I18N = {};
