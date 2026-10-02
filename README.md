# Design Vault

Ma bibliothèque personnelle pour concevoir des sites web : templates, idées d'UI, palettes, prompts et design systems. Tout est visuel, tout est copiable.

Site : https://evey-run.github.io/design-vault/

## Onglets

| Onglet | Contenu | Fichier |
|---|---|---|
| Templates | Structures de pages avec wireframe + prompt prêt à coller | `data/templates.js` |
| Idées / UI | Éléments et effets de design, avec démo live et code | `data/ideas.js` |
| Couleurs | Palettes avec rôle de chaque couleur, hex copiables | `data/palettes.js` |
| Prompts | Prompts réutilisables (audit, responsive, a11y, perf…) | `data/prompts.js` |
| Design systems | Systèmes complets : typo, couleurs, espacement, règles | `data/systems.js` |

Recherche plein texte et filtre par tag (clic sur un tag) dans chaque onglet. L'onglet actif est dans l'URL (`#palettes`).

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

- **idea** : `name`, `category`, `tags`, `desc`, `demo` (HTML inline affiché en live), `code`, `prompt`, `url`
- **palette** : `name`, `mood`, `colors` (tableau de hex), `tags`, `desc`, `usage`
- **prompt** : `name`, `use`, `tags`, `desc`, `body`
- **system** : `name`, `mood`, `colors`, `headingFont`, `bodyFont`, `scale`, `radius`, `spacing`, `shadow`, `motion`, `prompt`, `css`, `rules`

## Lancer en local

Ouvrir `index.html` directement dans le navigateur (double-clic). Les données sont des fichiers `.js`, pas de serveur nécessaire.

## Pile

HTML + CSS + JavaScript vanilla. Zéro dépendance, zéro build, déployé par GitHub Pages depuis `main`.
