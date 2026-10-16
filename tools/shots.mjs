#!/usr/bin/env node
// Captures pleine page en mobile, tablette et desktop : l'étape « après » de la boucle.
//   node tools/shots.mjs <url|fichier.html> [--out dossier] [--dark] [--project orivo]
//   node tools/shots.mjs <url> --compare dossier-de-référence [--max 1]
// --compare met chaque capture en face de celle du même nom dans le dossier (mobile.png…) et dit quelle part
// des pixels a changé ; code 1 au-delà de --max %. Une capture validée devient la référence de la suivante.
// Passe par la CLI Playwright (npx playwright screenshot) : rien à installer dans le repo.
// La première fois : npx playwright install chromium
import { spawnSync } from 'node:child_process';
import { mkdirSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './vault.mjs';

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
let url = args.find((a, i) => !a.startsWith('--') && !['--out', '--project', '--compare', '--max'].includes(args[i - 1]));
if (!url) { console.error('Usage : node tools/shots.mjs <url|fichier.html> [--out dossier] [--dark] [--project orivo] [--compare dossier] [--max 1]'); process.exit(2); }
if (!/^[a-z]+:\/\//i.test(url)) url = pathToFileURL(resolve(url)).href;
const out = resolve(opt('--out') || 'shots');
const dark = args.includes('--dark');
const sizes = [['mobile', 390, 844], ['tablette', 768, 1024], ['desktop', 1440, 900]];
mkdirSync(out, { recursive: true });

for (const [name, w, h] of sizes) {
  const file = join(out, name + (dark ? '-sombre' : '') + '.png');
  const r = spawnSync('npx', ['--yes', 'playwright', 'screenshot', '--viewport-size', `${w},${h}`, '--full-page',
    '--wait-for-timeout', '500', ...(dark ? ['--color-scheme', 'dark'] : []), url, file], { stdio: ['ignore', 'ignore', 'inherit'] });
  if (r.status !== 0) { console.error('\nCapture impossible. Si le navigateur manque : npx playwright install chromium'); process.exit(1); }
  console.log(`${name} ${w}×${h} → ${file}`);
}

/* PNG 8 bits RGB ou RGBA, non entrelacé : ce que produit Playwright */
function png(file) {
  const b = readFileSync(file), idat = [];
  let p = 8, w, h, depth, type, lace;
  while (p < b.length) {
    const len = b.readUInt32BE(p), t = b.toString('ascii', p + 4, p + 8), d = b.subarray(p + 8, p + 8 + len);
    if (t === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); depth = d[8]; type = d[9]; lace = d[12]; }
    else if (t === 'IDAT') idat.push(d);
    else if (t === 'IEND') break;
    p += 12 + len;
  }
  if (depth !== 8 || lace || (type !== 2 && type !== 6)) throw new Error('PNG non pris en charge : ' + file);
  const bpp = type === 6 ? 4 : 3, stride = w * bpp, raw = inflateSync(Buffer.concat(idat)), px = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], src = y * (stride + 1) + 1, row = y * stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? px[row + x - bpp] : 0, up = y ? px[row - stride + x] : 0, c = x >= bpp && y ? px[row - stride + x - bpp] : 0;
      let v = raw[src + x];
      if (f === 1) v += a;
      else if (f === 2) v += up;
      else if (f === 3) v += (a + up) >> 1;
      else if (f === 4) { const q = a + up - c, pa = Math.abs(q - a), pb = Math.abs(q - up), pc = Math.abs(q - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? up : c; }
      px[row + x] = v & 255;
    }
  }
  return { w, h, bpp, px };
}
function compare(a, b) {
  const w = Math.min(a.w, b.w), h = Math.min(a.h, b.h);
  let n = 0, top = -1, bottom = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * a.w + x) * a.bpp, j = (y * b.w + x) * b.bpp;
    if (Math.abs(a.px[i] - b.px[j]) + Math.abs(a.px[i + 1] - b.px[j + 1]) + Math.abs(a.px[i + 2] - b.px[j + 2]) > 48) {
      n++; if (top < 0) top = y; bottom = y;
    }
  }
  return { share: 100 * n / (w * h), top, bottom };
}

const ref = opt('--compare'), max = Number(opt('--max') || 1);
let over = false;
if (ref) {
  console.log('\nComparaison avec ' + resolve(ref) + ' :');
  for (const [name] of sizes) {
    const f = name + (dark ? '-sombre' : '') + '.png', before = join(resolve(ref), f);
    if (!existsSync(before)) { console.log(`  ${name} : pas de référence ${f}`); continue; }
    const a = png(before), b = png(join(out, f)), d = compare(a, b);
    if (d.share > max) over = true;
    console.log(`  ${name} : ${d.share.toFixed(2).replace('.', ',')} % des pixels changent`
      + (d.top >= 0 ? ` (lignes ${d.top} à ${d.bottom})` : '') + (a.h !== b.h ? `, hauteur ${a.h} → ${b.h} px` : '')
      + (d.share > max ? `  ✗ au-dessus de ${max} %` : ''));
  }
}

const project = opt('--project'), dir = project && join(ROOT, 'projects', project, 'references');
if (dir && existsSync(dir)) {
  console.log('\nRéférences à regarder à côté :');
  readdirSync(dir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).forEach((f) => console.log('  ' + join(dir, f)));
}
process.exit(over ? 1 : 0);
