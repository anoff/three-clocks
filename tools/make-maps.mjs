// Generates src/maps.js from Natural Earth country shapes (world-atlas TopoJSON).
// Usage: node tools/make-maps.mjs <countries-50m.json>  (https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json)
// Each map is a small equirectangular projection of one region (about 3.2:1, the shape of the film's image panels), simplified for the screen,
// with the routes, regions and pins that tell that scene's story.
import { readFileSync, writeFileSync } from 'node:fs';

const topo = JSON.parse(readFileSync(process.argv[2], 'utf8'));

// ---- map specs (lon/lat in degrees) ----
const SPECS = {
  // 1492: Palos → Canary Islands → San Salvador
  columbus: {
    bbox: [-112, 17, 2, 43], highlight: ['724'],
    routes: [[[-6.9, 37.2], [-11, 32.5], [-15.4, 28.1], [-28, 26.2], [-45, 26.5], [-62, 25.4], [-74.5, 24.1]]],
    pins: [{ at: [-6.9, 37.2], kind: 'origin' }, { at: [-74.5, 24.1] }],
  },
  // 1539–1542: De Soto (east) and Coronado (west), approximate
  explorers: {
    bbox: [-136, 22, -62, 41], highlight: [],
    routes: [
      [[-82.6, 27.7], [-84.3, 30.4], [-83, 32.6], [-81, 34.6], [-83.6, 35.4], [-85.6, 34.4], [-87.9, 32.4], [-88.6, 33.9], [-90.6, 34.6], [-92.6, 35.1], [-93.1, 33.4], [-91.5, 31.4]],
      [[-107.4, 24.8], [-109.4, 28.2], [-110.1, 31.3], [-109.5, 33.6], [-108.8, 35.0], [-106.6, 35.2], [-104.3, 35.1], [-101.6, 34.5], [-99.6, 36.6], [-98.2, 38.3]],
    ],
    pins: [{ at: [-82.6, 27.7], kind: 'origin' }, { at: [-107.4, 24.8], kind: 'origin' }, { at: [-91.5, 31.4] }, { at: [-98.2, 38.3] }],
  },
  // 1803: the Louisiana Purchase, approximate outline
  louisiana: {
    bbox: [-150, 24, -45, 50], highlight: ['840'],
    regions: [[[-89.4, 29.2], [-90.1, 29.95], [-91.4, 31.0], [-91.1, 32.3], [-91.2, 33.5], [-90.6, 34.6], [-89.6, 36.5], [-89.5, 37.3], [-90.2, 38.6],
      [-91.4, 40.4], [-91.0, 41.5], [-91.2, 43.0], [-92.0, 44.5], [-93.2, 45.0], [-94.3, 46.4], [-95.2, 47.2], [-95.2, 49.0], [-113.5, 49.0],
      [-113.5, 47.0], [-112.0, 45.5], [-111.0, 44.5], [-110.0, 43.5], [-107.5, 42.0], [-106.5, 40.5], [-106.0, 39.0], [-105.8, 38.2],
      [-100.0, 37.7], [-100.0, 34.5], [-94.0, 33.6], [-94.0, 32.0], [-93.8, 29.7], [-91.5, 29.5], [-89.4, 29.2]]],
    pins: [{ at: [-90.07, 29.95] }],
  },
};

const W = 640;

// ---- TopoJSON decoding ----
const [sx, sy] = topo.transform.scale, [tx, ty] = topo.transform.translate;
const arcs = topo.arcs.map(arc => { let x = 0, y = 0; return arc.map(([dx, dy]) => { x += dx; y += dy; return [x * sx + tx, y * sy + ty]; }); });
const ringOf = idxs => { const pts = []; for (const i of idxs) { const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i]; pts.push(...(pts.length ? a.slice(1) : a)); } return pts; };
const countries = topo.objects.countries.geometries.map(g => ({
  id: String(g.id), name: g.properties && g.properties.name,
  polys: g.type === 'Polygon' ? [g.arcs.map(ringOf)] : g.type === 'MultiPolygon' ? g.arcs.map(p => p.map(ringOf)) : [],
}));

function makeMap(name, spec) {
  const [lon0, lat0, lon1, lat1] = spec.bbox, mid = (lat0 + lat1) / 2, c = Math.cos(mid * Math.PI / 180);
  const lonC = (lon0 + lon1) / 2, k = W / ((lon1 - lon0) * c), H = Math.round((lat1 - lat0) * k);
  const norm = lon => { while (lon < lonC - 180) lon += 360; while (lon > lonC + 180) lon -= 360; return lon; };
  const pad = 3;
  const proj = ([lon, lat], clampIt = true) => {
    lon = norm(lon);
    if (clampIt) { lon = Math.min(lon1 + pad, Math.max(lon0 - pad, lon)); lat = Math.min(lat1 + pad, Math.max(lat0 - pad, lat)); }
    return [(lon - lon0) * c * k, (lat1 - lat) * k];
  };
  const r1 = v => Math.round(v * 10) / 10;
  // clip a projected ring to the view (Sutherland–Hodgman), then thin it out (radial + Douglas–Peucker)
  const M = 8, edges = [[0, -M, true], [0, W + M, false], [1, -M, true], [1, H + M, false]];
  const clip = pts => {
    for (const [axis, v, isMin] of edges) {
      const inside = p => isMin ? p[axis] >= v : p[axis] <= v, out = [];
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i], b = pts[(i + 1) % pts.length], ia = inside(a), ib = inside(b);
        if (ia) out.push(a);
        if (ia !== ib) { const t = (v - a[axis]) / (b[axis] - a[axis]); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); }
      }
      pts = out; if (!pts.length) break;
    }
    return pts;
  };
  const dp = (pts, tol) => {
    if (pts.length < 4) return pts;
    const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
    const stack = [[0, pts.length - 1]];
    while (stack.length) {
      const [i, j] = stack.pop(); let best = -1, bd = tol;
      const [x1, y1] = pts[i], [x2, y2] = pts[j], L = Math.hypot(x2 - x1, y2 - y1) || 1e-9;
      for (let k = i + 1; k < j; k++) { const d = Math.abs((x2 - x1) * (y1 - pts[k][1]) - (x1 - pts[k][0]) * (y2 - y1)) / L; if (d > bd) { bd = d; best = k; } }
      if (best > 0) { keep[best] = 1; stack.push([i, best], [best, j]); }
    }
    return pts.filter((_, k) => keep[k]);
  };
  const ringPath = ring => {
    let pts = clip(ring.map(p => proj(p, false)));
    if (pts.length < 3) return '';
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    if ((Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys)) < 6) return '';
    pts = dp(pts, .7);
    if (pts.length < 3) return '';
    return 'M' + pts.map(p => r1(p[0]) + ' ' + r1(p[1])).join('L') + 'Z';
  };
  const inView = poly => poly[0].some(([lon, lat]) => { lon = norm(lon); return lon > lon0 - 2 && lon < lon1 + 2 && lat > lat0 - 2 && lat < lat1 + 2; });
  const shapes = countries.map(ct => ({ id: ct.id, d: ct.polys.filter(inView).map(p => p.map(ringPath).join('')).join('') })).filter(s => s.d);
  // smooth route through waypoints (Catmull-Rom → cubic Bézier)
  const curve = pts => {
    const P = pts.map(p => proj(p, false));
    let d = `M${r1(P[0][0])} ${r1(P[0][1])}`;
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += `C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return d;
  };
  // graticule every 10°
  let grid = '';
  for (let lon = Math.ceil(lon0 / 10) * 10; lon <= lon1; lon += 10) { const x = r1(proj([lon, 0], false)[0]); grid += `M${x} 0V${H}`; }
  for (let lat = Math.ceil(lat0 / 10) * 10; lat <= lat1; lat += 10) { const y = r1(proj([0, lat], false)[1]); grid += `M0 ${y}H${W}`; }
  return {
    w: W, h: H, grid,
    land: shapes.filter(s => !(spec.highlight || []).includes(s.id)).map(s => s.d).join(''),
    hl: Object.fromEntries(shapes.filter(s => (spec.highlight || []).includes(s.id)).map(s => [s.id, s.d])),
    regions: (spec.regions || []).map(r => 'M' + r.map(p => proj(p, false).map(r1).join(' ')).join('L') + 'Z'),
    routes: (spec.routes || []).map(curve),
    pins: (spec.pins || []).map(p => { const [x, y] = proj(p.at, false); return { x: r1(x), y: r1(y), kind: p.kind || 'target' }; }),
  };
}

const maps = {};
for (const [name, spec] of Object.entries(SPECS)) maps[name] = makeMap(name, spec);
const js = `// Generated by tools/make-maps.mjs from Natural Earth data (world-atlas, public domain). Do not edit by hand.\nconst MAPS = ${JSON.stringify(maps)};\n`;
writeFileSync(new URL('../src/maps.js', import.meta.url), js);
console.log('src/maps.js', (js.length / 1024).toFixed(1) + ' KB', Object.entries(maps).map(([k, m]) => `${k} ${m.w}x${m.h}`).join(', '));
