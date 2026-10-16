# Findy : journal des décisions

Les règles vivent dans [DESIGN.md](DESIGN.md) ; ici, ce qui a été décidé, pourquoi, et ce qui reste à trancher.

## 2026-10-16 — Premier DESIGN.md, extrait du code

- **Sources :** `~/repos/findy` (main, v0.6.0), sa branche mobile `justeozan/google-play-console-launch` (non fusionnée) et `~/repos/findy-site`. `.claude/brand.md` et `.claude/design-tokens.md` ne sont pas repris : logo en bâtons, wordmark en minuscules, domaine usefindy.app, `docker compose`, licence MIT, landing Next.js avec Framer Motion, rien de cela n'existe. Le logo réel est la gemme violette.
- **Un seul thème, sombre :** ni l'app ni le site n'ont de thème clair.
- **Le verre en couleurs pleines :** Shell (#101012), Veil (#151517) et Panel (#1C1C1E) sont les voiles blancs du code (3 %, 5 %, 5 % sur 3 %) composés sur Void ; Shell et Panel se mesurent tels quels sur la capture du site. Pourquoi : un contraste ne se calcule pas sur un fond transparent.
- **Une pile de polices, celle du site,** pour tous les niveaux, l'app ne chargeant pas Inter. Les tailles du site sont prises au maximum de leur `clamp()`.
- **Les deux survols du bouton principal restent des tokens** (`button-primary-hover` pour l'app, `site-button-hover` pour le site) : l'écart se voit au lint.
- **Export Tailwind v4 officiel :** `@google/design.md` 0.4.0 met toute la pile entre guillemets (`--font-body: "-apple-system, …"`), soit un seul nom de police introuvable. L'export Tailwind v3, les variables CSS et les tokens W3C du vault la gardent utilisable.

## Questions ouvertes

- **Contrastes sous 4,5:1 :**
  - Subtle (#71717A, zinc-500, 124 emplois) : 4,12:1 sur Void, 3,52:1 sur Panel (libellés des indicateurs, dates). zinc-600 (#52525B, 49 emplois) : 2,20:1 sur Panel (« / 330 € », dates de l'activité). Passer les deux au Dim du site (#8B8B95 : 5,90:1 sur Void, 5,04:1 sur Panel) ?
  - Survol du bouton principal en violet-500 (21 boutons) : blanc à 4,23:1. Le site, l'écran de connexion et `commonStyles.ts` foncent en #6D28D9 (7,10:1) : aligner l'app ?
  - Bouton de suppression au survol (red-500) : blanc à 3,76:1. Texte violet-500 sur Panel : 4,02:1.
  - Pastilles de commerçant (`AVATAR_COLORS`) : 5 teintes sur 10 passent sous 4,5:1 avec leurs initiales blanches de 9 px, jusqu'à 2,94:1 (#CA8A04), alors que le commentaire les dit choisies pour rester lisibles.
- **Valeurs en double ou mortes :**
  - Deux blancs pour le texte principal : `text-white` (136 emplois, survols compris) et `text-zinc-50` (72), plus zinc-100 sur l'entrée active.
  - `src/styles/commonStyles.ts` n'est importé nulle part ; `brand.DEFAULT/light/dark` et les animations `float`, `fade-in`, `pulse-slow` de `tailwind.config.ts` ne servent pas ; Recharts est installé sans être importé ; `--surface` est déclarée par les deux feuilles de style, utilisée par aucune.
  - Couleurs en dur hors palette : `#18191C` (32 fois), `#0F1013`, `#616875`, `#2B2F37` (Transactions, Investissement, ImportCsvModal) ; sur le site, quatre presque-noirs autour de Void (`#0B0B0E`, `#0E0E11`, `#0F0F12`, `#000`).
  - L'`index.html` de l'app charge aussi `cdn.tailwindcss.com` en plus du Tailwind compilé : deux sources de styles, et une requête réseau au lancement d'une app qui promet de ne rien envoyer.
- **Incohérences app/site :**
  - Police : l'app déclare Inter et JetBrains Mono sans les charger, le site met SF Pro en tête. Embarquer Inter en local dans les deux, ou assumer la police système et retirer Inter de la config ? Ce que l'app affiche sur le Mac du propriétaire est [À VÉRIFIER].
  - Boutons rectangulaires (8 px) dans l'app, pilules sur le site et dans la barre d'onglets mobile.
  - Positif en green-400 (#4ADE80) sur le bureau et le site, en emerald-400 (#34D399) sur mobile.
  - Barres de budget : vert, ambre et rouge au tableau de bord, Lilac et rouge dans Catégories, Lilac puis vert dans Objectifs. Et trois verts dans la palette des catégories (#16DB93, #83E377, #B9E769) : au donut, ils se lisent comme des gains.
  - Titres de page en cinq recettes : 24 px bold seul (tableau de bord), avec `tracking-tight` (Portefeuille, Transactions), en `leading-7 sm:text-3xl` (Investissements, profil, utilisateurs), en blanc pur (Paramètres), et 18 px semibold (Catégories, Objectifs, Tricount).
  - Tutoiement à l'écran de connexion (« Choisis ton profil »), vouvoiement ailleurs dans l'app et sur le site.
- **L'app mobile n'est pas fusionnée :** ses valeurs viennent de la branche ; à relire à la fusion.
