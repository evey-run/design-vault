# Design Vault

Ma bibliothèque personnelle pour concevoir des sites web : templates, idées d'UI, palettes, prompts et design systems. Tout est visuel, tout est copiable.

Site : https://evey-run.github.io/design-vault/

## Pages

| Page | Contenu |
|---|---|
| `index.html` | **Design Vault** — la bibliothèque (6 onglets ci-dessous) |
| `evey.html` | Evey Design System |
| `tribos.html` | Tribos Design System |
| `orivo.html` | Orivo Design System |
| `findy.html` | Findy Design System |

Les quatre pages de design system partagent un même gabarit (`ds.js`). Le système
lui-même vient de `projects/<projet>/DESIGN.md` (format ouvert de Google) : la page
en affiche les sections dans l'ordre de la spec, avec les couleurs, les styles de
texte, les échelles et le contraste de chaque composant, et permet de copier le
DESIGN.md, les tokens W3C, les variables CSS et le bloc à coller dans le
`AGENTS.md` d'un repo. Un projet sans DESIGN.md affiche le modèle et le prompt
d'extraction. Ajouter un projet : une entrée dans `data/ds.js`, une copie d'un des
fichiers `*.html` avec le bon `DS_PROJECT`, puis `projects/<projet>/DESIGN.md`.

`data/ds.js` garde ce que le DESIGN.md ne couvre pas : `name`, `tagline`, `repo`,
`links`, et trois sections facultatives : **Visuels de référence** (`gallery` :
`{ img, name, format, desc, why, cmd }`, et `galleryNote`), dont les images vivent
dans `projects/<projet>/references/` ; **Ton et écriture** (`voice` :
`{ name, desc, yes, no }`) ; **Prompt système** (`prompt`). Orivo les utilise : sa
page est la direction artistique de sa communication, produite avec le skill
`orivo-comms`.

## Onglets de Design Vault

| Onglet | Contenu | Fichier |
|---|---|---|
| Galerie | Toutes les images du tableau Pinterest, filtrables, chacune reliée aux autres onglets | `data/elements.js` |
| Templates | Structures de pages avec wireframe + prompt prêt à coller | `data/templates.js` |
| Éléments | 82 éléments graphiques issus de mon tableau Pinterest, catégorisés, avec prompt de reproduction | `data/elements.js` |
| Idées / UI | Éléments et effets de design, avec démo live et code | `data/ideas.js` |
| Couleurs | Palettes avec rôle de chaque couleur, hex copiables | `data/palettes.js` |
| Prompts | Prompts réutilisables (audit, responsive, a11y, perf…) | `data/prompts.js` |
| Design systems | Systèmes complets : typo, couleurs, espacement, règles | `data/systems.js` |

Recherche plein texte dans chaque onglet (raccourci `/`), filtres par tag cumulables (ET), favoris et panier de prompts. L'onglet actif est dans l'URL (`#palettes`).

## L'onglet Galerie

Le point d'entrée visuel : les 82 images du tableau en vignettes. Les images sont
affichées depuis le CDN de Pinterest (`i.pinimg.com`), aucune n'est copiée dans le repo.

Un clic sur une vignette l'ouvre en grand avec, à côté, tout ce qui a été produit à
partir d'elle — description, palette relevée, tags, prompt de reproduction —
et une rangée de **liens croisés** :

| Lien | Où il mène |
|---|---|
| Fiche élément | l'onglet Éléments, isolé sur cette fiche |
| Palette : *nom* | la palette de l'onglet Couleurs la plus proche des teintes de l'image (distance RVB moyenne) |
| Prompts liés | l'onglet Prompts filtré sur un tag partagé |
| Idées liées | l'onglet Idées / UI filtré sur un tag partagé |
| Templates liés | l'onglet Templates filtré sur un tag partagé |
| Systèmes liés | l'onglet Design systems filtré sur un tag partagé |

Les mêmes liens figurent sur les fiches de l'onglet Éléments, avec en plus « Voir le
visuel » qui ramène à la galerie. Chaque vue a son URL : `#galerie/<id>`,
`#elements/<id>`, `#palettes/<nom>`.

Filtre **Catégorie** en tête des facettes (Landing, Dashboard, App mobile, CV, Icônes…),
cumulable avec les tags.

## L'onglet Éléments

Chaque carte correspond à une épingle de mon tableau Pinterest, analysée et rangée :

- **catégorie** (landing, dashboard, app mobile, CV, icônes, effet…) et **ton** relevé automatiquement (oled / dark / mid / light) ;
- **tags à facettes** — Ton, Couleur, Effet, Composant, Domaine, Style — cumulables : cliquer `glassmorphism` puis `oled` ne garde que les éléments qui ont les deux ;
- **palette dominante** extraite de l'image (5 couleurs, quantification médiane), chaque pastille copiable ;
- **la vignette d'origine et sa recréation CSS côte à côte** : l'aperçu schématique est redessiné à partir de la palette relevée ;
- **prompt de reproduction** détaillé : structure, valeurs en px, hex, contraintes et interdits.

Deux outils en plus :

- **★ favoris** — marquer ce qu'on réutilise, puis filtrer dessus (stocké dans le navigateur) ;
- **panier** — `+ Panier` sur plusieurs éléments, puis « Copier le prompt combiné » : il assemble les prompts choisis et y ajoute les contraintes de cohérence (palette unique, deux polices, un seul niveau d'élévation, arbitrage en cas de contradiction).

## Ajouter une entrée

Aucune installation, aucun build. On ouvre le fichier de données concerné et on ajoute un objet dans le tableau.

```js
// data/templates.js
{
  name: "Nom du template",
  type: "Landing page",
  stack: "HTML + Tailwind",
  wire: ["nav","hero","grid3","footer"],   // aperçu wireframe
  tags: ["saas","landing"],
  desc: "Une ligne.",
  prompt: `Le prompt complet…`,
  notes: "Optionnel",
  url: "https://…"                          // optionnel
}
```

Champs du wireframe : `nav`, `hero`, `band`, `text`, `split`, `sidebar`, `list`, `grid2`…`grid6`, `footer`.

Les autres types :

- **element** : `id`, `name`, `cat`, `layout` (dashboard, mobile, chart, cards, hero, split, table, kanban, map, report, mockup), `tags`, `ton`, `colors`, `desc`, `prompt`, `img`, `pin`, `src`
- **idea** : `name`, `category`, `tags`, `desc`, `demo` (HTML inline affiché en live), `code`, `prompt`, `url`
- **palette** : `name`, `mood`, `colors` (tableau de hex), `tags`, `desc`, `usage`, `pairs` (`[texte, fond, rôle]`, vérifiés à 4,5:1, ou 3:1 si le rôle contient « grand »)
- **prompt** : `name`, `use`, `tags`, `desc`, `body`
- **system** : `name`, `mood`, `colors`, `headingFont`, `bodyFont`, `scale`, `radius`, `spacing`, `shadow`, `motion`, `prompt`, `css`, `rules` ; la carte en tire un DESIGN.md copiable et les contrastes de ses couples texte/fond

Templates, idées, palettes et systèmes acceptent un champ `defaut` : une phrase qui
signale un look que les labos voient revenir dans les pages générées (fond crème et
terracotta, kit de cartes SaaS, « → » sur chaque bouton…). L'entrée reste, avec un
encadré « Défaut IA » : c'est un bon choix quand le brief le demande, pas un réflexe.

Les facettes de tags et les libellés de catégories vivent dans `data/taxonomy.js` : un tag non listé apparaît dans « Divers ».

## Pour les agents

Le vault suit la structure que recommandent Anthropic, OpenAI et Google pour qu'un
agent reste cohérent d'un projet à l'autre. `AGENTS.md` (que `CLAUDE.md` importe)
dit où tout se trouve et comment travailler.

| Chemin | Rôle |
|---|---|
| `projects/<projet>/DESIGN.md` | Source de vérité : tokens en YAML, puis le pourquoi de chaque choix |
| `projects/<projet>/tokens/*.tokens.json` | Les tokens au format W3C 2025.10 (généré) |
| `projects/<projet>/references/` | Visuels « golden » annotés (README généré) |
| `projects/<projet>/components/README.md` | Catalogue des vrais composants : code et rendu de référence |
| `projects/<projet>/decisions.md` | Décisions, questions ouvertes, essais abandonnés |
| `projects/_template/DESIGN.md` | Modèle pour un nouveau projet |
| `skills/design-vault/SKILL.md` | La méthode et les défauts à éviter ; lien symbolique dans `~/.claude/skills/` pour l'activer partout |
| `decisions.md` | Journal du vault lui-même |

## Vérifier

```bash
node tools/build.mjs                         # régénère les tokens W3C, data/designmd.js et les README de références
node tools/check.mjs                         # DESIGN.md, contrastes, données, fichiers générés, pages ; code 1 en cas d'erreur
node tools/shots.mjs <url> --project orivo   # captures 390, 768 et 1440 px à comparer aux références
node tools/shots.mjs <url> --compare shots/avant   # part des pixels qui changent depuis la dernière capture validée
node tools/hardcoded.mjs ~/repos/orivo-site --project orivo   # couleurs du code absentes des tokens
```

`check.mjs` reprend les règles du linter officiel (`npx @google/design.md lint`) et
ajoute celles du vault : chaque couleur expliquée dans la prose, couples texte/fond
des palettes, systèmes de l'onglet Design systems exportés en DESIGN.md puis vérifiés,
contrastes de l'interface. La CI (`.github/workflows/design.yml`) le lance à chaque
PR, avec le lint et le diff officiels pour bloquer les régressions de tokens et de
contraste. Les outils tournent sous Node 22 (version testée, celle de la CI), sans dépendance.

## Lancer en local

Ouvrir `index.html` directement dans le navigateur (double-clic). Les données sont des fichiers `.js`, pas de serveur nécessaire. Après avoir modifié un DESIGN.md : `node tools/build.mjs`.


## Pile

HTML + CSS + JavaScript vanilla. Zéro dépendance, aucun build à l'exécution (les fichiers générés sont versionnés), déployé par GitHub Pages depuis `main`.

## Sources

La structure et la boucle de vérification viennent du skill
[frontend-design](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
d'Anthropic, du guide [Designing delightful frontends with GPT‑5.4](https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4)
d'OpenAI, de la spec [DESIGN.md](https://github.com/google-labs-code/design.md) de Google et du format
[W3C Design Tokens 2025.10](https://www.designtokens.org/tr/2025.10/format/).

## Cache

Les fichiers sont référencés avec `?v=N` dans `index.html` et les pages de projet.
GitHub Pages met les assets en cache 10 minutes : après une modification de
`app.js`, `ds.js`, `style.css`, `lib/` ou d'un fichier `data/` (y compris
`data/designmd.js` régénéré), incrémenter ce numéro dans chaque page qui le charge.
