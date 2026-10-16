#!/usr/bin/env node
// Vérifie tout le vault : les DESIGN.md (règles de la spec Google et celles du vault), les systèmes de
// l'onglet Design systems, les fichiers générés, les données du site, les contrastes de l'interface, les pages.
//   node tools/check.mjs            rapport lisible ; code 1 s'il y a une erreur
//   node tools/check.mjs --json     le même rapport en JSON, pour un agent
//   node tools/check.mjs --strict   les avertissements comptent comme des erreurs
//   node tools/check.mjs -v         affiche aussi les infos
import { readdirSync } from 'node:fs';
import { ROOT, read, exists, DesignMD as D, loadData, projects, staleOutputs } from './vault.mjs';

const argv = process.argv.slice(2);
const JSON_OUT = argv.includes('--json'), STRICT = argv.includes('--strict'), VERBOSE = argv.includes('-v');
const findings = [];
const add = (scope, file, severity, rule, path, message) => findings.push({ scope, file, severity, rule, path, message });

/* 1. DESIGN.md des projets */
for (const id of projects()) {
  const file = `projects/${id}/DESIGN.md`;
  const r = D.lint(read(file));
  for (const f of r.findings) add('DESIGN.md', file, f.severity, f.rule, f.path, f.message);
  for (const p of D.toDTCG(r.doc.tokens).problems) add('DESIGN.md', file, 'error', 'export', p, "Valeur absente de l'export W3C : le vault ne sait pas la convertir (utilise hex, rgb, hsl ou oklch, et px ou rem).");
}

/* 2. données du site */
const DATA = loadData((file, e) => add('Données', file, 'error', 'script', '', 'Le script ne se charge pas : ' + e.message));
const HEX = /^#[0-9A-Fa-f]{6}$/;
const LAYOUTS = ['dashboard', 'mobile', 'chart', 'cards', 'hero', 'split', 'table', 'kanban', 'map', 'report', 'mockup'];
const TONS = ['oled', 'dark', 'mid', 'light'];
const WIRE = /^(nav|hero|band|text|split|sidebar|list|grid[2-6]|footer)$/;
const facetTags = new Set(Object.values(DATA.facets || {}).flat());

function each(name, list, fn) {
  const file = `data/${name}.js`;
  if (!Array.isArray(list)) { add('Données', file, 'error', 'missing', '', `DATA.${name} est absent ou n'est pas un tableau.`); return; }
  const keys = new Set();
  list.forEach((it, i) => {
    const at = (it && (it.id || it.name)) ? `${name}[${JSON.stringify(it.id || it.name)}]` : `${name}[${i}]`;
    const err = (rule, msg) => add('Données', file, 'error', rule, at, msg);
    const warn = (rule, msg) => add('Données', file, 'warning', rule, at, msg);
    const info = (rule, msg) => add('Données', file, 'info', rule, at, msg);
    const key = String(it.id || it.name || '');
    if (!it.name) err('missing', 'Entrée sans name.');
    if (key && keys.has(key)) err('duplicate', `Clé en double : ${key} (elle sert d'adresse dans l'URL).`);
    keys.add(key);
    if (it.defaut != null && typeof it.defaut !== 'string') err('invalid', 'defaut doit être une phrase.');
    fn(it, { err, warn, info });
  });
}
const hexes = (cs, ctx, min) => {
  if (!Array.isArray(cs) || cs.length < min) ctx.err('colors', `Il faut au moins ${min} couleurs hex.`);
  else cs.filter((c) => !HEX.test(c)).forEach((c) => ctx.err('colors', `Couleur invalide : ${c}.`));
};

each('templates', DATA.templates, (t, c) => {
  if (!t.prompt) c.err('missing', 'Template sans prompt.');
  (t.wire || []).filter((w) => !WIRE.test(w)).forEach((w) => c.err('wire', `Bloc de wireframe inconnu : ${w}.`));
});
each('elements', DATA.elements, (e, c) => {
  if (!e.id) c.err('missing', 'Élément sans id.');
  if (!(DATA.cats || {})[e.cat]) c.warn('cat', `Catégorie inconnue de data/taxonomy.js : ${e.cat}.`);
  if (LAYOUTS.indexOf(e.layout) < 0) c.err('layout', `layout inconnu : ${e.layout}.`);
  if (TONS.indexOf(e.ton) < 0) c.err('ton', `ton inconnu : ${e.ton}.`);
  hexes(e.colors, c, 2);
  if (!e.prompt) c.err('missing', 'Élément sans prompt de reproduction.');
  if (!/^https:\/\//.test(e.img || '')) c.err('img', "Image absente ou pas en https.");
  (e.tags || []).filter((t) => !facetTags.has(t)).forEach((t) => c.info('tag', `Tag hors facettes (rangé dans « Divers ») : ${t}.`));
});
each('ideas', DATA.ideas, (i, c) => { if (!i.prompt && !i.code) c.err('missing', 'Idée sans prompt ni code.'); });
each('palettes', DATA.palettes, (p, c) => {
  hexes(p.colors, c, 2);
  if (!p.pairs || !p.pairs.length) c.info('pairs', 'Aucun couple texte/fond déclaré : contrastes non vérifiés.');
  (p.pairs || []).forEach(([fg, bg, role]) => {
    const x = D.contrast(fg, bg), min = /grand/i.test(role || '') ? 3 : 4.5;
    if (x === null) c.err('pairs', `Couple illisible : ${fg} sur ${bg}.`);
    else if (x < min) c.err('contrast', `${role || 'texte'} : ${fg} sur ${bg} = ${D.ratio(x)}, sous ${min === 3 ? '3:1 (grand texte)' : '4,5:1'}.`);
  });
});
each('prompts', DATA.prompts, (p, c) => { if (!p.body) c.err('missing', 'Prompt vide.'); });
each('systems', DATA.systems, (s, c) => { hexes(s.colors, c, 2); if (!s.css) c.warn('css', 'Pas de tokens CSS : le DESIGN.md généré sera pauvre.'); });

const ds = DATA.ds || {};
for (const [id, p] of Object.entries(ds)) {
  const file = 'data/ds.js', at = `ds.${id}`;
  if (!p.name) add('Données', file, 'error', 'missing', at, 'Projet sans name.');
  if (!exists(`${id}.html`)) add('Données', file, 'warning', 'page', at, `Pas de page ${id}.html pour ce projet.`);
  (p.gallery || []).forEach((g, i) => {
    if (!g.img || !exists(g.img)) add('Données', file, 'error', 'img', `${at}.gallery[${i}]`, `Image introuvable : ${g.img}.`);
    if (!g.why) add('Données', file, 'info', 'why', `${at}.gallery[${i}]`, `« ${g.name} » ne dit pas ce qui marche (why).`);
  });
  (p.links || []).forEach((l, i) => { if (!/^https?:\/\//.test(l.url || '')) add('Données', file, 'error', 'url', `${at}.links[${i}]`, 'Lien sans URL http(s).'); });
}
for (const id of projects().filter((x) => !x.startsWith('_'))) {
  if (!ds[id]) add('Données', 'data/ds.js', 'warning', 'missing', `ds.${id}`, `projects/${id}/DESIGN.md existe mais data/ds.js n'a pas d'entrée ${id}.`);
  const refDir = `projects/${id}/references`;
  if (exists(refDir)) {
    const listed = new Set(((ds[id] || {}).gallery || []).map((g) => g.img));
    readdirSync(`${ROOT}/${refDir}`).filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .filter((f) => !listed.has(`${refDir}/${f}`))
      .forEach((f) => add('Données', 'data/ds.js', 'warning', 'reference', `ds.${id}.gallery`, `${refDir}/${f} n'est décrite dans aucune entrée de la galerie.`));
  }
}

/* 3. les systèmes de l'onglet Design systems, exportés en DESIGN.md */
(DATA.systems || []).forEach((s) => {
  for (const f of D.lint(D.fromSystem(s)).findings) {
    if (f.severity === 'info') continue;
    add('Design systems', 'data/systems.js', f.severity, f.rule, `${s.name} → ${f.path}`, f.message);
  }
});

/* 4. fichiers générés */
for (const f of staleOutputs(DATA)) add('Fichiers générés', f.path, 'error', 'stale', '', 'Périmé : lance node tools/build.mjs.');

/* 5. contrastes de l'interface du vault (style.css, thèmes clair et sombre) */
const css = read('style.css');
const vars = (block) => { const v = {}; String(block || '').replace(/--([\w-]+)\s*:\s*([^;}]+)/g, (_, k, x) => { v[k] = x.trim(); }); return v; };
const light = vars((/:root\s*\{([^}]*)\}/.exec(css) || [])[1]);
const dark = { ...light, ...vars((/prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([^}]*)\}/.exec(css) || [])[1]) };
for (const [theme, v] of [['clair', light], ['sombre', dark]]) {
  for (const [fg, bg] of [['fg', 'bg'], ['mut', 'bg'], ['mut', 'soft'], ['fg', 'soft']]) {
    const x = D.contrast(v[fg], v[bg]);
    if (x === null) add('Interface', 'style.css', 'warning', 'contrast', `--${fg} / --${bg}`, `Thème ${theme} : contraste incalculable.`);
    else if (x < 4.5) add('Interface', 'style.css', 'error', 'contrast', `--${fg} sur --${bg}`, `Thème ${theme} : ${D.ratio(x)}, sous le minimum WCAG AA de 4,5:1.`);
  }
}

/* 6. pages : chaque script et feuille de style référencés existent */
for (const page of readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
  const html = read(page);
  for (const m of html.matchAll(/(?:src|href)="([^"#?]+)(\?[^"]*)?"/g)) {
    const p = m[1];
    if (/^(https?:|mailto:)/.test(p) || p.endsWith('.html')) continue;
    if (!exists(p)) add('Pages', page, 'error', 'missing', p, `Fichier introuvable : ${p}.`);
  }
}

/* rapport */
const count = (sev) => findings.filter((f) => f.severity === sev).length;
const errors = count('error') + (STRICT ? count('warning') : 0);
if (JSON_OUT) {
  console.log(JSON.stringify({ ok: errors === 0, summary: { errors: count('error'), warnings: count('warning'), infos: count('info') }, findings }, null, 2));
} else {
  const scopes = ['DESIGN.md', 'Design systems', 'Fichiers générés', 'Données', 'Interface', 'Pages'];
  const mark = { error: '✗', warning: '!', info: '·' };
  console.log('Design Vault : vérification\n');
  for (const scope of scopes) {
    const list = findings.filter((f) => f.scope === scope && (VERBOSE || f.severity !== 'info'));
    const e = list.filter((f) => f.severity === 'error').length, w = list.filter((f) => f.severity === 'warning').length;
    console.log((e ? '✗ ' : w ? '! ' : '✓ ') + scope + (e || w ? ` : ${e} erreur${e > 1 ? 's' : ''}, ${w} avertissement${w > 1 ? 's' : ''}` : ''));
    for (const f of list) console.log(`    ${mark[f.severity]} ${f.file}${f.path ? '  ' + f.path : ''}\n      ${f.message}`);
  }
  console.log(`\nTotal : ${count('error')} erreur${count('error') > 1 ? 's' : ''}, ${count('warning')} avertissement${count('warning') > 1 ? 's' : ''}`
    + (count('info') && !VERBOSE ? `, ${count('info')} info${count('info') > 1 ? 's' : ''} (-v pour les voir)` : ''));
}
process.exit(errors ? 1 : 0);
