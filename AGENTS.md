# Design Vault : guide pour les agents

Ce repo est la bibliothèque de design d'Evey : un site statique (zéro build à l'exécution, GitHub Pages) et, pour chaque projet, un DESIGN.md versionné que les agents lisent. La fiabilité vient de la vérification, pas du prompt : suis la boucle ci-dessous.

## Où est quoi

| Chemin | Contenu |
|---|---|
| `projects/<projet>/DESIGN.md` | Le design system du projet au format DESIGN.md de Google : tokens en YAML (normatifs), puis la prose qui dit pourquoi. **Source de vérité.** |
| `projects/<projet>/tokens/<projet>.tokens.json` | Les mêmes tokens au format W3C Design Tokens 2025.10. Généré. |
| `projects/<projet>/references/` | Les visuels « golden » et ce qui marche dans chacun. README généré depuis `data/ds.js`. |
| `projects/<projet>/components/README.md` | Le catalogue des vrais composants : où vit leur code, un rendu de référence pour chacun. |
| `projects/<projet>/decisions.md` | Décisions, questions ouvertes, ce qui a été essayé puis abandonné. |
| `projects/_template/DESIGN.md` | Modèle pour un nouveau projet. |
| `skills/design-vault/SKILL.md` | La méthode : défauts à éviter, plancher de qualité, vérification. |
| `data/*.js` | Les données du site ; le format de chaque entrée est dans `README.md`. `data/designmd.js` est généré. |
| `lib/designmd.js` | Lecture, vérification et exports des DESIGN.md, partagés par le site et les outils. |
| `tools/` | `build.mjs` (fichiers générés), `check.mjs` (vérification), `shots.mjs` (captures et comparaison), `hardcoded.mjs` (couleurs hors tokens dans un projet). |
| `.github/` | La CI (`workflows/design.yml`) et `CODEOWNERS` (revue obligatoire des design systems, si la protection de `main` l'exige). |
| `decisions.md` | Journal des décisions sur le vault lui-même. |

Orivo a son DESIGN.md. Evey, Tribos et Findy n'en ont pas encore : prompt « Extraire le DESIGN.md d'un repo » (onglet Prompts, ou bouton de leur page).

## Travailler sur le design d'un projet

1. **Avant de coder :** lis `projects/<projet>/DESIGN.md`. Écris ton plan (palette, typo, mise en page) et compare-le au DESIGN.md et aux défauts de `skills/design-vault/SKILL.md`. Le brief et le DESIGN.md l'emportent sur les conseils généraux.
2. **Pendant :** uniquement les tokens et les composants existants, aucune valeur en dur. Sur un projet existant, garde ses patterns et son langage visuel. `node tools/hardcoded.mjs <repo> --project <projet>` liste les couleurs du code absentes des tokens.
3. **Après :** `node tools/shots.mjs <url> --project <projet>` capture en 390, 768 et 1440 px. Regarde les captures, compare-les aux références, corrige, recapture. Pour une page déjà validée, `--compare <dossier>` mesure l'écart avec les captures précédentes (code 1 au-delà de `--max` %).
4. **Une fois validé :** mets à jour le DESIGN.md et le `decisions.md` du projet.

Thèmes et marques : la spec DESIGN.md n'a pas encore de thèmes. Le thème principal va dans les tokens, l'autre (clair ou sombre) dans la section Colors ; le jour où un projet en a besoin en code, on ajoute `tokens/<projet>.resolver.json` au format W3C (sets et modifiers), qui gère thèmes et multi-marque.

Exports Tailwind : `npx @google/design.md export --format css-tailwind projects/<projet>/DESIGN.md` (v4) ou `--format json-tailwind` (v3). Les variables CSS et les tokens W3C se copient aussi depuis la page du projet.

## Modifier le vault

- **Un DESIGN.md :** édite-le, puis `node tools/build.mjs` et `node tools/check.mjs`. Le front matter suit un sous-ensemble strict de YAML : hex et références entre guillemets (`"#0B0B0D"`, `"{colors.void}"`). Chaque couleur a sa ligne `- **Nom (#HEX):** rôle et pourquoi` dans la section Colors. Les composants déclarent `backgroundColor` et `textColor` pour que les contrastes soient vérifiés.
- **Les données :** une palette déclare ses couples texte/fond dans `pairs`, vérifiés à 4,5:1 (3:1 si le rôle contient « grand »). Un look connu comme défaut des pages générées porte un champ `defaut` qui le dit, sans être supprimé.
- **Le cache :** après un changement de `app.js`, `ds.js`, `style.css`, `lib/` ou `data/`, incrémente son `?v=N` dans les pages HTML qui le chargent.
- **Avant de livrer :** `node tools/check.mjs` à zéro erreur (`--json` pour un rapport d'agent, `--strict` pour compter les avertissements). La CI le relance à chaque PR avec le lint et le diff officiels de Google.
- **Une décision :** une entrée datée dans `decisions.md` ou `projects/<projet>/decisions.md`, avec le pourquoi.
- **Ne rien publier :** pas de push, de déploiement ni de post sans accord explicite.

## Brancher un projet

Dans le `AGENTS.md` ou le `CLAUDE.md` du repo du projet (le bouton « Brancher à un repo » de sa page copie ce bloc) :

```md
## Design

Le design system de ce projet est dans le Design Vault : ~/repos/design-vault/projects/<projet>/DESIGN.md.
Lis-le avant tout travail visuel. Utilise ses tokens et ses composants, aucune valeur en dur. Vérifie le rendu par captures : node ~/repos/design-vault/tools/shots.mjs <url> --project <projet>.
@~/repos/design-vault/projects/<projet>/DESIGN.md
```

La ligne `@…` fait charger le fichier par Claude Code ; les autres agents suivent la phrase.
