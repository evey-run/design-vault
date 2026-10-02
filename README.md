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

Les quatre pages de design system partagent un même gabarit (`ds.js`) et lisent
`data/ds.js`. Chacune a six sections — Couleurs, Typographie, Tokens, Composants,
Prompt système, Règles — et affiche « à remplir » tant qu'un champ est vide, en
indiquant exactement quoi éditer. Ajouter un projet : une entrée dans `data/ds.js`
et une copie d'un des fichiers `*.html` avec le bon `DS_PROJECT`.

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
partir d'elle — description, palette relevée, tags, prompt de reproduction, CSS —
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
- **palette** : `name`, `mood`, `colors` (tableau de hex), `tags`, `desc`, `usage`
- **prompt** : `name`, `use`, `tags`, `desc`, `body`
- **system** : `name`, `mood`, `colors`, `headingFont`, `bodyFont`, `scale`, `radius`, `spacing`, `shadow`, `motion`, `prompt`, `css`, `rules`

Les facettes de tags et les libellés de catégories vivent dans `data/taxonomy.js` : un tag non listé apparaît dans « Divers ».

## Lancer en local

Ouvrir `index.html` directement dans le navigateur (double-clic). Les données sont des fichiers `.js`, pas de serveur nécessaire.


## Pile

HTML + CSS + JavaScript vanilla. Zéro dépendance, zéro build, déployé par GitHub Pages depuis `main`.

## Cache

Les fichiers sont référencés avec `?v=N` dans `index.html`. GitHub Pages met les
assets en cache 10 minutes : après une modification de `app.js`, `style.css` ou
d'un fichier `data/`, incrémenter ce numéro pour que la nouvelle version soit
servie immédiatement.
