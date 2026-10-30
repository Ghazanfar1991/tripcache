// One continuous iPhone Duo sequence at 30 fps: open flat → fold closed → turn landscape → open into a tent (the cover
// shows the tent screen) → hold → fold back → turn back → open flat. Writes poses for pose.mjs.
//   node timeline.mjs <out.json> [every]
import { writeFileSync } from 'node:fs';
const FPS = 30;
const OPEN = { angle: 180, rz: 0, rx: 0, az: 0, el: 0, lift: 0, cover: 0, surface: 0 };
const TENT = { angle: 78, rz: -90, rx: 38, az: -26, el: 12, lift: 0, cover: 1, surface: 1 };
const segments = [
  [1.2, {}],
  [2.4, { angle: 0 }],
  [0.6, {}],
  [1.8, { rz: -90, surface: 1, az: -10, el: 6, cover: 1 }, { cover: [0.25, 0.85] }],
  [2.0, { angle: TENT.angle, rx: TENT.rx, az: TENT.az, el: TENT.el, lift: 1.2 }],
  [3.6, { az: -18 }],
  [2.0, { angle: 0, rx: 0, az: -10, el: 6, lift: 0 }],
  [1.8, { rz: 0, surface: 0, az: 0, el: 0, cover: 0 }, { cover: [0.15, 0.75] }],
  [0.4, {}],
  [2.4, { angle: 180 }],
  [0.6, {}],
];
const ease = (t) => (1 - Math.cos(Math.PI * t)) / 2;
let state = { ...OPEN };
const frames = [];
for (const [seconds, to, windows = {}] of segments) {
  const from = { ...state };
  const n = Math.round(seconds * FPS);
  for (let i = 1; i <= n; i++) {
    const p = {};
    for (const key of Object.keys(OPEN)) {
      const [a, b] = windows[key] ?? [0, 1];
      const t = ease(Math.min(1, Math.max(0, (i / n - a) / (b - a))));
      p[key] = key in to ? from[key] + (to[key] - from[key]) * t : from[key];
    }
    // Keep the phone centred: folded, its body spans only the camera half (x 0..8), so shift it back by half the
    // folded width, turned with the phone.
    const folded = 4 * (1 - p.angle / 180), rz = (p.rz * Math.PI) / 180;
    frames.push({ ...p, px: -folded * Math.cos(rz), py: -folded * Math.sin(rz) + p.lift, order: 'XYZ' });
  }
  state = { ...from, ...to };
}
const [out, every = '1'] = process.argv.slice(2);
const picked = frames.map((f, i) => ({ ...f, out: `f${String(i).padStart(4, '0')}.png` })).filter((_, i) => i % Number(every) === 0);
writeFileSync(out, JSON.stringify(picked));
console.log(`${frames.length} frames (${(frames.length / FPS).toFixed(1)} s), wrote ${picked.length}`);
