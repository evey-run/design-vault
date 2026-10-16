// Ce que build.mjs et check.mjs partagent : chemins, chargement des scripts du site, fichiers générés.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const read = (p) => readFileSync(join(ROOT, p), 'utf8');
export const exists = (p) => existsSync(join(ROOT, p));

/* exécute un script du site comme le navigateur, avec un faux window ; les numéros de ligne restent justes */
export function runScript(path, win = {}) {
  const code = read(path);
  new vm.Script('(function (window) { var DATA = window.DATA = window.DATA || {}; ' + code + '\n})', { filename: join(ROOT, path) })
    .runInThisContext()(win);
  return win;
}

export const DesignMD = runScript('lib/designmd.js').DesignMD;

export const DATA_FILES = ['taxonomy', 'templates', 'elements', 'ideas', 'palettes', 'prompts', 'systems', 'ds'];
export function loadData(onError) {
  const win = {};
  for (const n of DATA_FILES) {
    try { runScript(`data/${n}.js`, win); }
    catch (e) { if (onError) onError(`data/${n}.js`, e); else throw e; }
  }
  return win.DATA || {};
}

/* les dossiers de projects/ qui ont un DESIGN.md ; ceux qui commencent par _ sont des modèles */
export function projects() {
  if (!exists('projects')) return [];
  return readdirSync(join(ROOT, 'projects')).filter((d) => exists(`projects/${d}/DESIGN.md`)).sort();
}

function embed(map) {
  const body = Object.keys(map).map((k) => '  ' + JSON.stringify(k) + ': '
    + JSON.stringify(map[k]).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')).join(',\n');
  return '// Généré par tools/build.mjs à partir de projects/*/DESIGN.md : ne pas éditer à la main.\n'
    + 'window.DATA = window.DATA || {};\nDATA.designmd = {\n' + body + '\n};\n';
}

function referencesReadme(id, p) {
  const L = [
    '<!-- Généré par tools/build.mjs depuis data/ds.js (' + id + '.gallery) : modifier là-bas, puis relancer le build. -->',
    '',
    '# ' + (p.name || id).replace(/ Design System$/, '') + ' : références',
    '',
    'Les visuels « golden » : ce à quoi un rendu doit ressembler. ' + (p.galleryNote || ''),
    '',
    "Avant de livrer, mets ta capture à côté de la référence la plus proche et compare la lumière, les marges, la taille et la place du texte. Les règles sont dans [DESIGN.md](../DESIGN.md).",
    '',
  ];
  for (const g of p.gallery) {
    L.push('## ' + g.name, '', '![' + (g.alt || g.name) + '](' + basename(g.img) + ')', '');
    L.push([g.format ? '`' + g.format + '`' : '', g.desc || ''].filter(Boolean).join(' : ') + '.', '');
    if (g.why) L.push('**Ce qui marche :** ' + g.why, '');
    if (g.cmd) L.push('```bash', g.cmd, '```', '');
  }
  return L.join('\n').replace(/\.\.\n/g, '.\n').trimEnd() + '\n';
}

/* tout ce que le build écrit : [{ path, content }] */
export function outputs(DATA) {
  const out = [], all = {};
  for (const id of projects()) {
    const text = read(`projects/${id}/DESIGN.md`);
    all[id] = text;
    if (id.startsWith('_')) continue;
    const { tokens, problems } = DesignMD.toDTCG(DesignMD.parse(text).tokens, { source: `projects/${id}/DESIGN.md` });
    if (problems.length) console.warn(`projects/${id}/DESIGN.md : non exporté en W3C : ${problems.join(', ')}`);
    out.push({ path: `projects/${id}/tokens/${id}.tokens.json`, content: JSON.stringify(tokens, null, 2) + '\n' });
  }
  out.push({ path: 'data/designmd.js', content: embed(all) });
  for (const [id, p] of Object.entries((DATA && DATA.ds) || {})) {
    if (p.gallery && p.gallery.length) out.push({ path: `projects/${id}/references/README.md`, content: referencesReadme(id, p) });
  }
  return out;
}

/* les fichiers générés qui ne correspondent plus à leur source */
export function staleOutputs(DATA) {
  return outputs(DATA).filter((f) => !exists(f.path) || read(f.path) !== f.content);
}
