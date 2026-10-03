// Data behind the two chart scenes (titles are translated in src/i18n).
const CHARTS = {
  // Nikkei 225, year-end close (Nikkei Inc.). The all-time high of 38,915.87 on 29 Dec 1989 stood until 2024.
  nikkei: { from: 1984, values: [11543, 13113, 18701, 21564, 30159, 38916, 23849, 22984, 16925, 17417, 19723, 19868], peak: 1989, source: 'nikkei' },
  // Nominal GDP 2023, US$ trillion (IMF World Economic Outlook, April 2024)
  gdp: { bars: [['US', 27.36], ['CN', 17.66], ['DE', 4.46, 'de'], ['JP', 4.21, 'jp'], ['IN', 3.57]], max: 5.5, source: 'imf' },
};
