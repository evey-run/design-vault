#!/usr/bin/env node
// Repère, dans le code d'un projet, les couleurs écrites en dur qui ne sont pas dans ses tokens :
// l'étape « pendant » de la boucle (aucune valeur hors du système).
//   node tools/hardcoded.mjs <dossier-du-projet> --project orivo [--strict]
// Une variante translucide d'un token (rgba de la même teinte) compte comme le token. Code 1 avec --strict.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative, resolve } from 'node:path';
import { read, exists, DesignMD as D } from './vault.mjs';

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const dir = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--project');
const id = opt('--project');
if (!dir || !id || !exists(`projects/${id}/DESIGN.md`)) {
  console.error('Usage : node tools/hardcoded.mjs <dossier-du-projet> --project <projet> [--strict]');
  process.exit(2);
}
const T = D.parse(read(`projects/${id}/DESIGN.md`)).tokens;
const known = new Set(Object.keys(T.colors || {}).map((k) => D.parseColor(D.resolve(T, T.colors[k]))).filter(Boolean).map(D.toHex));

const EXT = new Set(['.css', '.scss', '.sass', '.less', '.html', '.js', '.jsx', '.mjs', '.ts', '.tsx', '.vue', '.svelte', '.astro']);
const SKIP = new Set(['node_modules', 'dist', 'build', 'out', 'coverage', 'vendor', 'target', 'public']);
const COLOR = /(?<!&)#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)/g;
const hits = new Map();

(function walk(d) {
  for (const f of readdirSync(d)) {
    if (f.startsWith('.') || SKIP.has(f)) continue;
    const p = join(d, f), s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (EXT.has(extname(f)) && s.size < 500000 && !/\.min\.|\.test\.|\.spec\./.test(f)) {
      readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        for (const m of line.matchAll(COLOR)) {
          const c = D.parseColor(m[0]);
          if (!c || known.has(D.toHex(c))) continue;
          const h = D.toHex(c), e = hits.get(h) || { value: m[0], at: [] };
          e.at.push(`${relative(resolve(dir), p)}:${i + 1}`);
          hits.set(h, e);
        }
      });
    }
  }
})(resolve(dir));

const list = [...hits.entries()].sort((a, b) => b[1].at.length - a[1].at.length);
const total = list.reduce((n, [, e]) => n + e.at.length, 0);
if (!list.length) console.log(`Aucune couleur en dur hors des tokens de ${id}.`);
else {
  console.log(`${list.length} couleurs hors des tokens de ${id} (${total} occurrences). Chacune : un token à ajouter au DESIGN.md, ou une valeur à remplacer.\n`);
  for (const [h, e] of list.slice(0, 40)) console.log(`  ${h}  ×${e.at.length}  ${e.at.slice(0, 3).join(', ')}${e.at.length > 3 ? ', …' : ''}`);
  if (list.length > 40) console.log(`  … et ${list.length - 40} autres`);
}
process.exit(args.includes('--strict') && list.length ? 1 : 0);
