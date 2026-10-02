# Design Vault

Ma bibliothèque personnelle pour concevoir des sites web : templates, idées d'UI, palettes, prompts et design systems. Tout est visuel, tout est copiable.

Site : https://evey-run.github.io/design-vault/

## Onglets

| Onglet | Contenu | Fichier |
|---|---|---|
| Templates | Structures de pages avec wireframe + prompt prêt à coller | `data/templates.js` |
| Éléments | 82 éléments graphiques issus de mon tableau Pinterest, catégorisés, avec prompt de reproduction | `data/elements.js` |
| Idées / UI | Éléments et effets de design, avec démo live et code | `data/ideas.js` |
| Couleurs | Palettes avec rôle de chaque couleur, hex copiables | `data/palettes.js` |
| Prompts | Prompts réutilisables (audit, responsive, a11y, perf…) | `data/prompts.js` |
| Design systems | Systèmes complets : typo, couleurs, espacement, règles | `data/systems.js` |

Recherche plein texte dans chaque onglet (raccourci `/`), filtres par tag cumulables (ET), favoris et panier de prompts. L'onglet actif est dans l'URL (`#palettes`).

## L'onglet Éléments

Chaque carte correspond à une épingle de mon tableau Pinterest, analysée et rangée :

- **catégorie** (landing, dashboard, app mobile, CV, icônes, effet…) et **ton** relevé automatiquement (oled / dark / mid / light) ;
- **tags à facettes** — Ton, Couleur, Effet, Composant, Domaine, Style — cumulables : cliquer `glassmorphism` puis `oled` ne garde que les éléments qui ont les deux ;
- **palette dominante** extraite de l'image (5 couleurs, quantification médiane), chaque pastille copiable ;
- **aperçu schématique** redessiné en CSS à partir de cette palette — aucune image tierce n'est republiée ici, la carte renvoie vers l'épingle et vers la source ;
- **prompt de reproduction** détaillé (structure, valeurs, contraintes) et **CSS** copiable quand l'effet est reproductible.

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

- **element** : `id`, `name`, `cat`, `layout` (dashboard, mobile, chart, cards, hero, split, table, kanban, map, report, mockup), `tags`, `ton`, `colors`, `desc`, `prompt`, `css`, `pin`, `src`
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
