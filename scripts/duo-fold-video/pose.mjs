// Drives the local iphone-duo fold study (Apple's model + the reference shader) in headless Chrome:
// loads one inner-screen capture through Custom mode, then renders the hinge angle frame by frame.
//   node record.mjs <image.png> <out-dir> <angles.json | "stills"> [azimuthDeg] [elevationDeg]
import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [image, outDir, spec, cover] = process.argv.slice(2);
const az = '0', el = '0';
const out = path.resolve(outDir);
mkdirSync(out, { recursive: true });
const poses = JSON.parse(readFileSync(spec, 'utf8'));
const W = 1600, H = 1100;
const URL_ = `http://127.0.0.1:8766/?dpr=2&ppu=56`;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9500 + Math.floor(Math.random() * 300);
const profile = mkdtempSync(path.join(os.tmpdir(), 'duo-rec-'));
const chrome = spawn(CHROME, ['--headless=new', '--hide-scrollbars', '--enable-gpu', '--use-angle=metal', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws;
for (let i = 0; i < 60 && !ws; i++) {
  try {
    const page = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((e) => e.type === 'page');
    if (page) ws = page.webSocketDebuggerUrl;
  } catch {}
  await sleep(200);
}
const socket = new WebSocket(ws);
await new Promise((r) => socket.addEventListener('open', r, { once: true }));
let id = 1;
const waiting = new Map();
socket.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && waiting.has(m.id)) {
    const { resolve, reject } = waiting.get(m.id);
    waiting.delete(m.id);
    m.error ? reject(new Error(m.error.message)) : resolve(m.result);
  } else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') console.error('page:', JSON.stringify(m.params.args.map((a) => a.value)));
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const n = id++;
  waiting.set(n, { resolve, reject });
  socket.send(JSON.stringify({ id: n, method, params }));
});
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 400));
  return r.result.value;
};

await send('Page.enable');
await send('Runtime.enable');
await send('DOM.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 2, mobile: false });
await send('Page.navigate', { url: URL_ });
for (let i = 0; i < 480; i++) {
  await sleep(250);
  if (await evaluate('Boolean(window.__duo && window.__duo.ready())').catch(() => false)) break;
}
await evaluate(`(() => { const s = document.createElement('style'); s.textContent = ':root,body{background:#fff!important}.control-dock,.github-link{display:none!important}'; document.head.appendChild(s); return 1 })()`);
const { root } = await send('DOM.getDocument', { depth: -1, pierce: true });
const { nodeId } = await send('DOM.querySelector', { nodeId: root.nodeId, selector: '#ui-upload' });
await send('DOM.setFileInputFiles', { files: [path.resolve(image)], nodeId });
await sleep(2500);
await evaluate(`(() => {
  window.__duo.stop();
  const { camera, controls } = window.__duo;
  const r = camera.position.distanceTo(controls.target);
  const a = ${Number(az)} * Math.PI / 180, e = ${Number(el)} * Math.PI / 180;
  camera.position.set(controls.target.x + r * Math.sin(a) * Math.cos(e), controls.target.y + r * Math.sin(e), controls.target.z + r * Math.cos(a) * Math.cos(e));
  controls.enableDamping = false;
  controls.update();
  return 1;
})()`);


if (cover) await evaluate(`window.__duo.loadCover(${JSON.stringify('/cover/' + path.basename(cover))}).then(() => 1)`);
const base = await evaluate(`(() => { const c = window.__duo.camera; return [c.position.x, c.position.y, c.position.z] })()`);
const frame = () => evaluate('new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(1))))');
for (const [i, p] of poses.entries()) {
  await evaluate(`(() => {
    const d = window.__duo, p = ${JSON.stringify(p)};
    d.setAngle(p.angle ?? 180);
    d.phone.rotation.set((p.rx ?? 0) * Math.PI / 180, (p.ry ?? 0) * Math.PI / 180, (p.rz ?? 0) * Math.PI / 180, p.order ?? 'ZXY');
    d.phone.position.set(p.px ?? 0, p.py ?? 0, p.pz ?? 0);
    const r = p.dist ?? 40, a = (p.az ?? 0) * Math.PI / 180, e = (p.el ?? 0) * Math.PI / 180, t = d.controls.target;
    d.camera.position.set(t.x + r * Math.sin(a) * Math.cos(e), t.y + r * Math.sin(e), t.z + r * Math.cos(a) * Math.cos(e));
    d.camera.lookAt(t);
    d.setCoverMix(p.cover ?? 0, p.turn ?? -90);
    d.setSurface(p.surface ?? 0);
    return 1;
  })()`);
  await frame();
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(path.join(out, p.out ?? `f${String(i).padStart(4, '0')}.png`), Buffer.from(data, 'base64'));
}
console.log(`${poses.length} frames → ${out}`);
socket.close();
chrome.kill();
