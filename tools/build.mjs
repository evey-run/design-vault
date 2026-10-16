#!/usr/bin/env node
// Régénère ce qui découle des DESIGN.md et de data/ds.js : les tokens W3C de chaque projet,
// la copie des DESIGN.md que lit le site (data/designmd.js) et le README des références.
//   node tools/build.mjs           écrit les fichiers
//   node tools/build.mjs --check   vérifie qu'ils sont à jour sans rien écrire (code 1 sinon)
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { ROOT, loadData, staleOutputs } from './vault.mjs';

const stale = staleOutputs(loadData());

if (process.argv.includes('--check')) {
  if (stale.length) {
    console.error('Fichiers générés périmés : ' + stale.map((f) => f.path).join(', ') + '\nLance : node tools/build.mjs');
    process.exit(1);
  }
  console.log('Fichiers générés à jour.');
} else {
  for (const f of stale) {
    mkdirSync(dirname(join(ROOT, f.path)), { recursive: true });
    writeFileSync(join(ROOT, f.path), f.content);
  }
  console.log(stale.length ? 'Écrit : ' + stale.map((f) => f.path).join(', ') : 'Tout est déjà à jour.');
}
