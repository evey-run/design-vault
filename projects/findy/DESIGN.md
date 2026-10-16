---
version: alpha
name: Findy
description: "Design system de Findy, l'app de finances personnelles locale (Mac, Android) et de son site : le noir et le verre, un seul violet qui guide, le vert et le rouge réservés à l'argent."
colors:
  primary: "{colors.violet}"
  void: "#09090B"
  shell: "#101012"
  veil: "#151517"
  panel: "#1C1C1E"
  surface: "#18181B"
  border: "#27272A"
  text: "#FAFAFA"
  white: "#FFFFFF"
  soft: "#D4D4D8"
  muted: "#A1A1AA"
  dim: "#8B8B95"
  subtle: "#71717A"
  violet: "#7C3AED"
  violet-deep: "#6D28D9"
  violet-bright: "#8B5CF6"
  lilac: "#A78BFA"
  lilac-soft: "#C4B5FD"
  positive: "#4ADE80"
  positive-fill: "#22C55E"
  negative: "#F87171"
  negative-fill: "#EF4444"
  warning: "#FBBF24"
  warning-fill: "#F59E0B"
  danger: "#DC2626"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: 84px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: -0.038em
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: 46px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.03em
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0px
  lead:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0px
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0px
  body-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.1em
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0px
  amount:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0px
    fontFeature: '"tnum"'
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  site-card: 18px
  mobile-tile: 24px
  mobile-hero: 28px
  full: 9999px
spacing:
  unit: 4px
  gap: 16px
  gap-tight: 12px
  card-padding: 16px
  page-inline: 40px
  page-inline-compact: 24px
  page-top: 32px
  site-max: 1120px
  site-gutter: 20px
  site-section: 120px
  site-section-mobile: 88px
  mobile-gutter: 20px
  tap-target: 44px
components:
  page:
    backgroundColor: "{colors.void}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
  sidebar:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.muted}"
    width: 256px
  nav-item-active:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
  nav-indicator:
    backgroundColor: "{colors.violet-bright}"
    width: 2px
    height: 20px
  page-title:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.text}"
    typography: "{typography.title}"
  page-subtitle:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: 16px
  panel-label:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.lilac}"
    typography: "{typography.label}"
  stat-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    typography: "{typography.amount}"
    rounded: "{rounded.xl}"
    padding: 16px
  stat-label:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.subtle}"
    typography: "{typography.label}"
  legend:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.soft}"
    typography: "{typography.caption}"
  amount-positive:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.positive}"
  amount-negative:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.negative}"
  due-soon:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.warning}"
    typography: "{typography.caption}"
  bar-income:
    backgroundColor: "{colors.positive-fill}"
    width: 10px
  bar-expense:
    backgroundColor: "{colors.negative-fill}"
    width: 10px
  progress-track:
    backgroundColor: "{colors.border}"
    height: 6px
    rounded: "{rounded.full}"
  progress-warning:
    backgroundColor: "{colors.warning-fill}"
    height: 6px
    rounded: "{rounded.full}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
  button-primary-hover:
    backgroundColor: "{colors.violet-bright}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.soft}"
    rounded: "{rounded.md}"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
  segment-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
  modal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: 24px
  toast:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
  login-card:
    backgroundColor: "{colors.veil}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: 24px
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  site-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    height: 50px
  site-button-hover:
    backgroundColor: "{colors.violet-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
  site-card:
    backgroundColor: "{colors.veil}"
    textColor: "{colors.text}"
    rounded: "{rounded.site-card}"
    padding: 26px
  site-label:
    backgroundColor: "{colors.void}"
    textColor: "{colors.lilac}"
    rounded: "{rounded.full}"
  site-code:
    backgroundColor: "{colors.void}"
    textColor: "{colors.lilac-soft}"
    rounded: 10px
  fine-print:
    backgroundColor: "{colors.void}"
    textColor: "{colors.dim}"
  mobile-tab-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    height: 44px
  mobile-tile:
    backgroundColor: "{colors.veil}"
    textColor: "{colors.text}"
    rounded: "{rounded.mobile-tile}"
  mobile-action-primary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.surface}"
    rounded: "{rounded.mobile-tile}"
    height: 84px
  mobile-balance-card:
    rounded: "{rounded.mobile-hero}"
---

# Findy

Source de vérité du design de Findy : l'app de bureau (`~/repos/findy`, Tauri 2, React 19, Tailwind 3), son app mobile iOS et Android (branche `justeozan/google-play-console-launch`, ouverte dans `~/repos/findy/bream`, pas encore fusionnée) et son site findy.evey.run (`~/repos/findy-site`). Les valeurs viennent du code : `src/index.css` et `tailwind.config.ts` de l'app, les classes de ses composants, `src/mobile/theme.ts` de la branche mobile, et la feuille de style en ligne de `public/index.html` du site. Quand ils divergent, les tokens portent le langage commun et la prose dit l'écart. Les décisions et les questions ouvertes sont dans [decisions.md](decisions.md), les visuels de référence dans `references/`.

Les fichiers `.claude/brand.md` et `.claude/design-tokens.md` du repo de l'app décrivent une autre version de la marque (logo en bâtons de comptage, wordmark en minuscules, landing Next.js avec Framer Motion) : rien de cela n'est dans le code, ne pas s'y fier.

## Overview

**Vos finances, sans compromis.** Findy suit les comptes, transactions, budgets, objectifs d'épargne et investissements d'une personne ou d'un couple, sur son Mac. Tout reste dans une base SQLite locale : pas de compte Findy, pas de cloud, pas de pisteur. L'app Android lit le Mac par le Wi-Fi de la maison. L'interface est en français.

- **Personnalité :** calme, factuelle, privée. Un relevé bien rangé dans une pièce sombre, pas une salle de marché. La confiance vient de la sobriété : aucun effet pour faire riche, aucune promesse.
- **Dense mais lisible :** le tableau de bord tient dans une fenêtre de 1280×800 sans défilement de page : quatre indicateurs, deux graphiques, trois listes.
- **Le noir et le verre :** un fond presque noir et des cartes en voiles blancs translucides, à peine plus claires, cernées d'un filet blanc à 10 %. La profondeur vient de la transparence, pas des ombres.
- **Un seul violet, qui guide :** bouton principal, entrée active, libellés de panneau, focus. Il ne dit jamais rien de l'argent.
- **L'argent parle en vert, rouge et ambre :** revenus et gains, dépenses et dépassements, échéances proches et budgets presque pleins. Jamais en décoration.
- **L'élément mémorable :** la gemme violette du logo et sa lueur. Sur le site, elle devient le halo derrière la capture et sous le bouton ; dans l'app, il n'en reste que le violet des repères.
- **Ce que Findy n'évoque pas :** une banque en ligne (photos de gens, bleu institutionnel), une app de trading (néon, chiffres qui clignotent). Pas de logos de marques tiers : rien n'est téléchargé pour décorer.

## Colors

Le zinc de Tailwind pour les neutres, son violet pour la marque, ses vert, rouge et ambre pour l'argent. Un seul thème, sombre : ni l'app ni le site n'ont de thème clair (`color-scheme: dark` sur le site).

Les fonds. Le code empile des voiles blancs translucides sur le noir ; les tokens donnent la couleur qu'ils produisent à l'écran, pour que les contrastes se calculent.

- **Void (#09090B):** le fond : `--bg` de l'app et du site, `theme-color` du site, fond natif de l'app mobile (`APP_BACKGROUND`). Le zinc-950, presque noir sans être #000.
- **Shell (#101012):** la fenêtre de l'app : barre latérale et zone de contenu posent un voile blanc à 3 % (`bg-white/[0.03]`) sur Void. Calculé, et mesuré tel quel dans la zone de contenu de la capture du tableau de bord (#111113 sous la barre latérale, floutée).
- **Veil (#151517):** le verre posé directement sur Void : carte de connexion (`bg-white/5`), haut des cartes du site (dégradé blanc de 5 à 2 %), tuiles mobiles (blanc à 4 %, #141316 sur la capture). Calculé.
- **Panel (#1C1C1E):** le verre dans la fenêtre : les cartes de l'app (`bg-white/5 backdrop-blur-xl border border-white/10`) sur Shell. Calculé et mesuré. C'est le fond de presque tout le texte de l'app.
- **Surface (#18181B):** l'opaque : champs (`bg-zinc-900`), modales et menus (`bg-zinc-900/95`), toasts. Les deux feuilles de style la déclarent en `--surface`, aucune ne s'en sert : les composants écrivent la classe Tailwind.
- **Border (#27272A):** les filets opaques : séparateurs des tableaux (`divide-zinc-800`), pistes des barres de budget du tableau de bord, squelettes de chargement. Les bordures des cartes, elles, sont blanches à 10 % (`border-white/10`), 6 % pour les séparateurs internes : elles suivent le fond.

Le texte.

- **Text (#FAFAFA):** titres, montants, texte principal (`--text`, zinc-50) : 19,06:1 sur Void, 16,30:1 sur Panel.
- **White (#FFFFFF):** le texte sur violet et sur rouge, le solde d'une carte bancaire, la pastille de l'interrupteur ; sur mobile, le fond de l'action principale (« Ajouter », texte zinc-900). L'app écrit aussi `text-white` là où Text suffirait : deux blancs pour un rôle (decisions.md).
- **Soft (#D4D4D8):** zinc-300 : légendes des graphiques, libellés de menu et de bouton secondaire ; `--text-2` du site (liens, pied de page). 11,51:1 sur Panel.
- **Muted (#A1A1AA):** le texte secondaire : sous-titres, navigation au repos, en-têtes de tableau (`--text-muted`, zinc-400) : 7,76:1 sur Void, 6,64:1 sur Panel.
- **Dim (#8B8B95):** les petits caractères du site (`--dim` : mentions légales, notes, ligne sous les boutons du héros) : 5,90:1 sur Void, 5,04:1 sur Panel. Hors de l'échelle zinc, choisi pour passer l'AA : le remplaçant naturel de Subtle.
- **Subtle (#71717A):** le zinc-500, gris le plus employé de l'app (124 emplois) : libellés des indicateurs, dates, icônes au repos. 4,12:1 sur Void et 3,52:1 sur Panel, sous le seuil AA de 4,5:1 : seulement pour ce qu'on n'a pas besoin de lire pour agir. L'app descend aussi au zinc-600 (#52525B, 2,20:1 sur Panel) pour les sous-lignes, « / 330 € » et les dates de l'activité : ce n'est pas un token, il est à remplacer.

Le violet.

- **Violet (#7C3AED):** la marque, c'est `primary` : bouton principal, segment actif, onglet actif mobile, avatar par défaut ; `brand.DEFAULT` de Tailwind et `--violet` du site. Blanc dessus : 5,70:1. Le `brand.md` du repo l'appelle violet-700 : c'est le violet-600 de Tailwind 3.
- **Violet deep (#6D28D9):** le survol du bouton principal sur le site (`--violet-deep`) et sur l'écran de connexion : il fonce, le blanc monte à 7,10:1.
- **Violet bright (#8B5CF6):** le violet-500 : focus des champs (`focus:border-violet-500/60`), trait de l'entrée active, remplissage sous la courbe du solde cumulé, et survol du bouton principal dans le reste de l'app (21 boutons). Blanc dessus : 4,23:1, sous l'AA.
- **Lilac (#A78BFA):** le violet-400, `brand.light` : libellés de panneau en capitales, icône active, courbe du solde cumulé, barres des Catégories et des Objectifs ; `--lilac` du site, anneau de focus. 6,25:1 sur Panel.
- **Lilac soft (#C4B5FD):** le violet-300 : code et icônes du site (`--lilac-2`), liens au survol dans l'app. 10,78:1 sur Void.

L'argent : jamais ailleurs qu'à côté d'un chiffre réel.

- **Positive (#4ADE80):** green-400 : le texte des revenus, des gains, d'une tendance favorable (9,76:1 sur Panel).
- **Positive fill (#22C55E):** green-500 : barres de revenus (à 80 %), budget sous le seuil, objectif atteint, pastilles de légende.
- **Negative (#F87171):** red-400 : le texte des dépenses, des pertes et des erreurs (6,15:1 sur Panel).
- **Negative fill (#EF4444):** red-500 : barres de dépenses (à 70 %), budget dépassé.
- **Warning (#FBBF24):** amber-400 : échéance dans trois jours ou moins, montant d'un budget entamé à 80 % (10,19:1 sur Panel).
- **Warning fill (#F59E0B):** amber-500 : la barre d'un budget entamé à 80 % et plus.
- **Danger (#DC2626):** red-600 : le bouton qui supprime. Blanc dessus : 4,83:1, mais 3,76:1 au survol (red-500).

Les palettes de données ne sont pas des tokens : la couleur d'une catégorie se choisit parmi dix teintes (`predefinedColors` de `src/components/Categories.tsx`, d'un indigo à un orange) et se reprend aux pastilles et au donut ; la pastille d'un commerçant tire l'une des dix teintes de `AVATAR_COLORS` (`src/lib/merchant.ts`) de son nom ; une carte bancaire prend les couleurs du logotype de sa banque, assombries et posées en trois halos (`src/lib/cardSurface.ts`).

Les dégradés non plus :

- **Le titre du site :** texte en dégradé à 100°, blanc → violet-200 → Lilac, sur sa seconde ligne seulement (`.grad`), comme dans l'aperçu de lien. L'app n'a aucun texte en dégradé.
- **Le halo :** radial violet (#7C3AED) à 30 % derrière le héros du site, 42 % derrière le téléphone et la gemme de l'aperçu de lien, 22 % derrière la page 404.
- **La grille de points :** points zinc-700 tous les 28 px, en fondu, derrière le héros et l'aperçu de lien.
- **La carte de solde mobile :** maillage violet, fuchsia et cyan sur un presque-noir violacé, avec du grain (`src/mobile/components/BalanceCard.tsx`).

Proportions : le noir et le verre font presque toute la surface, le violet n'apparaît qu'en touches (un bouton, un libellé, un trait de 2 px), le vert et le rouge n'existent qu'à côté d'un montant. L'app mobile prend l'emerald-400 pour le positif au lieu du green-400 : écart noté dans decisions.md.

## Typography

Une seule famille, la police du système : SF Pro sur Mac et iPhone, Roboto sur Android. Quatre graisses dans l'app (400, 500, 600, 700) ; le site ajoute un 650 pour le nom de marque et les pastilles.

- **La pile :** celle du site, reprise par tous les tokens : `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. L'app déclare `Inter, system-ui, sans-serif` (`src/index.css`, `fontFamily.sans` de Tailwind) mais ne charge Inter nulle part : sans Inter installé sur la machine, elle s'affiche en SF Pro, comme le site [À VÉRIFIER sur le Mac du propriétaire]. Le mono déclaré (`JetBrains Mono`) n'est pas chargé non plus ; le site prend `ui-monospace, "SF Mono", Menlo`.
- **Aucune police externe :** la CSP du site (`default-src 'self'`) les bloque, et l'app promet de ne rien envoyer.

| Rôle | Token | Valeurs | Dans le code |
|---|---|---|---|
| Titre du héros du site | `display` | 84 px, 700, 1,02, −3,8 % | `h1`, `clamp(42px, 7.4vw, 84px)`, `text-wrap: balance` |
| Titre de section du site | `headline` | 46 px, 700, 1,08, −3 % | `h2`, `clamp(30px, 4.2vw, 46px)` |
| Titre de page de l'app | `title` | 24 px, 700, 1,25 | `h1` du tableau de bord, `text-2xl font-bold leading-tight` |
| Chapô du site | `lead` | 20 px, 400, 1,55 | `.lead`, `clamp(17px, 2.1vw, 20px)`, en Muted |
| Texte courant | `body` | 16 px, 400, 1,6 | corps du site ; 16,5 px et 1,7 sur les pages légales |
| Texte de l'interface | `body-sm` | 14 px, 400, 20 px | `text-sm`, la taille par défaut de l'app (245 emplois) |
| Libellé | `label` | 12 px, 500, 16 px, +10 %, capitales | en-têtes de panneau, `text-xs font-medium uppercase tracking-widest` |
| Légende | `caption` | 12 px, 400, 16 px | `text-xs` : dates, sous-lignes, légendes |
| Montant | `amount` | 20 px, 700, 1,25, chiffres tabulaires | indicateurs et soldes, `text-xl font-bold` |

- **Les montants :** chiffres tabulaires (`tabular-nums`), format `Intl.NumberFormat('fr-FR')` (« 2,7 k € », « 475,00 € »), signe moins typographique « − » dans les montants signés. Le reste à vivre monte à 24 px (`text-2xl font-bold tabular-nums leading-none`), le solde mobile à 34 px semibold, serré (`text.display` de `theme.ts`). Exception à corriger : les quatre indicateurs du tableau de bord (`StatCard`) n'ont pas de chiffres tabulaires.
- **Les libellés en capitales :** un par panneau, en Lilac ; en Subtle sur les indicateurs, en Muted sur les en-têtes de tableau (`tracking-wider`). Le site met les siens dans une pilule violette, à 12,5 px, 600, +12 %.
- **La casse :** de phrase partout, titres compris. Sur le site, `text-wrap: balance` pour les titres et `pretty` pour les paragraphes.
- **Les tailles :** 14 px dans l'app, jusqu'à 11 et 10 px pour les métadonnées (version, axes des graphiques, fréquence d'une échéance) ; 16 px sur le site ; 15 px sur mobile, et 16 px dans les champs pour que iOS ne zoome pas.
- **Le wordmark :** « Findy », capitale initiale, en semibold serré à côté de la gemme (`text-lg font-semibold tracking-tight` dans l'app, 650 et −1 % sur le site).

Les titres de page suivent aujourd'hui cinq recettes : `title` est celle du tableau de bord (decisions.md).

## Layout

L'app de bureau, conçue pour la fenêtre :

- **La fenêtre :** 1280×800 par défaut, 960×600 au minimum (`src-tauri/tauri.conf.json`), barre de titre en surimpression : une bande de 32 px (`h-8`, `data-tauri-drag-region`) en haut du contenu, 40 px au-dessus du logo.
- **La barre latérale :** 256 px (`w-64`) : logo, sélecteur d'espace (personnel ou partagé), six entrées, version, puis Paramètres et Déconnexion épinglés en bas.
- **Le contenu :** marges de 40 px (`page-inline`), 24 px sous 768 px (`page-inline-compact`), 32 px en haut (`page-top`). Le tableau de bord occupe toute la hauteur sans défilement de page : chaque panneau défile à l'intérieur (`min-h-0 overflow-y-auto`).
- **La grille :** 12 colonnes dès 1024 px. Les indicateurs sur 4 colonnes (2 en dessous), puis 7 + 5 (flux, catégories), puis 5 + 4 + 3 (budgets, activité, prochains paiements). Gouttières de 12 px entre indicateurs (`gap-tight`), 16 px entre panneaux (`gap`).
- **Le panneau :** en-tête de 20 × 12 px séparé par un filet blanc à 6 %, corps de 16 px (`card-padding`).
- **Sous 768 px :** la barre latérale cède la place à une barre d'onglets en bas (5 entrées, `bg-zinc-950/95`), et le contenu garde 80 px de marge basse pour elle.

L'app mobile (branche non fusionnée) :

- Gouttière de 20 px (`mobile-gutter`, `GUTTER`), cibles tactiles de 44 px au moins (`tap-target`, `TAP_TARGET`), champs de 48 px.
- Le document défile, pas un conteneur : inertie et rebond natifs. L'en-tête reste collé et ne prend son fond qu'au défilement ; la barre d'onglets flotte au-dessus du contenu, qui s'estompe dessous.
- Un seul montant en haut de l'accueil, assez grand pour se lire à bout de bras ; le reste est secondaire.

Le site :

- **La colonne :** 1120 px (`site-max`) avec 20 px de chaque côté (`site-gutter`) ; 760 px pour les pages légales.
- **Le rythme :** sections espacées de 120 px (`site-section`), 88 px sous 720 px (`site-section-mobile`) ; héros à 84 px du haut (52 px) ; en-tête collant de 64 px en verre (`rgba(9,9,11,.72)`, flou de 18 px).
- **Les grilles :** fonctionnalités sur 4 colonnes, 2 sous 1024 px, 1 sous 720 px (l'icône et le titre passent côte à côte) ; boutons d'appel en pleine largeur sous 720 px. 16 px entre les cartes (`gap`).
- **Le héros :** eyebrow, titre, chapô, deux boutons, une ligne de métadonnées, puis la capture du tableau de bord dans un cadre de fenêtre à 64 px en dessous.

## Elevation & Depth

La profondeur vient de la transparence et, sur le site, de la lumière violette. Pas d'ombre sous une carte.

- **Trois plans dans l'app :** Void, la fenêtre (Shell), les cartes (Panel). Chaque plan ajoute un voile blanc (3 %, puis 5 %) ; la barre latérale et les cartes floutent ce qui passe dessous (`backdrop-blur-xl`) ; la bordure blanche à 10 % découpe la carte.
- **Ce qui flotte prend une ombre :** menus (`shadow-xl`), modales (`shadow-2xl`, sur un voile noir à 60 % flouté), toasts (Surface, bordure blanche à 10 %, flou de 24 px), barre d'onglets mobile (`0 8px 32px -8px` noir à 80 %).
- **L'en-tête de tableau en verre dépoli :** zinc-800 à 85–95 %, flou et saturation à 150 %, filet clair et ombre courte, en un seul calque pour toute la ligne (`HeaderGlass` de `src/components/Transactions.tsx`, qui explique pourquoi).
- **Le survol :** la carte s'éclaircit (`hover:bg-white/[0.07]`) et sa bordure vire au violet (`hover:border-violet-500/25`) en 200 ms. Pas d'élévation.
- **Le site éclaire :** halo radial derrière le héros, lueur sous le bouton principal (`0 10px 32px -6px` violet à 65 %), ombre profonde et lueur autour de la capture (`0 60px 140px -30px` noir à 85 %, `0 0 140px -20px` violet à 42 %), lueur douce au survol des cartes. Pas plus d'un halo par section dans le code actuel.
- **Le grain :** un bruit fractal en SVG (`GRAIN_DATA_URI` de `src/lib/cardSurface.ts`) à 12–14 %, en `mix-blend-overlay`, sur les cartes bancaires et la carte de solde mobile : sans lui, un grand dégradé sombre fait des bandes.
- **Le mouvement :** 200 ms sur les couleurs, 500 ms sur les barres qui se remplissent, `animate-pulse` pour les squelettes ; sur le site, un bouton monte de 1 px au survol et `prefers-reduced-motion` coupe les transitions.

## Shapes

Plus c'est grand, plus c'est rond.

- **6 px (`sm`) :** segments du sélecteur de période, pastilles de commerçant, petits contrôles.
- **8 px (`md`) :** boutons, entrées de navigation, champs. Le rayon le plus employé de l'app (`rounded-lg`, 113 emplois).
- **12 px (`lg`) :** sélecteur d'espace, menus, champs et boutons de l'écran de connexion, carte bancaire ; tuiles d'icône du site.
- **16 px (`xl`) :** cartes, panneaux, modales ; cadre de la capture sur le site.
- **18 px (`site-card`) :** les cartes du site (`--radius`).
- **Pilule (`full`) :** avatars, pastilles, barres de progression, interrupteur ; tous les boutons du site et la barre d'onglets mobile. Le site écrit 999px.
- **Mobile :** 28 px pour la carte héroïque (`mobile-hero`), 24 px pour les tuiles (`mobile-tile`), 16 px pour les lignes, 12 px pour les contrôles (`radii` de `theme.ts`).
- **La carte bancaire :** le format d'une vraie carte (ratio 1,586), à 12 px.
- **Les barres :** 10 px de large et arrondies en haut pour les flux, 6 px de haut en pilule pour les budgets.
- **Les icônes :** Heroicons outline 24 dans l'app (solid pour l'onglet actif mobile) ; sur le site, des tracés de 1,7 à 1,8 px dessinés dans le même esprit.
- **Le logo :** une gemme violette facettée (`public/assets/findy-logo.png`, 800 px), suivie du mot « Findy ». Le site en tire `mark-96.png` et les icônes ; la gemme porte une ombre violette (`drop-shadow` à 55–75 %) sur l'aperçu de lien et la 404.

Écart : dans l'app, les boutons sont des rectangles arrondis à 8 px ; sur le site et dans la barre d'onglets mobile, des pilules.

## Components

Il n'y a pas de bibliothèque de composants : les classes Tailwind sont écrites dans chaque écran. `src/styles/commonStyles.ts` décrit des recettes (verre, boutons, champs) mais n'est importé nulle part : la référence est le code des écrans ci-dessous. Les atomes du front matter (`panel`, `panel-label`, `stat-card`, `button-primary`…) nomment les pièces que ces écrans partagent.

### L'app de bureau (`~/repos/findy/src`)

- **La coquille :** `components/Layout.tsx`. Barre latérale (logo et wordmark, sélecteur d'espace, navigation dont l'entrée active porte un trait violet de 2 × 20 px, version), barre d'onglets sous 768 px. Toute nouvelle page s'y range, sans seconde navigation.
- **Le tableau de bord :** `components/Dashboard.tsx`. Indicateur (`StatCard`), tendance (`TrendPill` : flèche et pourcentage, vert ou rouge, inversé pour les dépenses), panneau à libellé violet, flux sur six périodes (`MonthlyFlux` : barres revenus et dépenses, ou courbe du solde cumulé), donut en SVG (`DonutChart`), reste à vivre (`ResteAVivre` : deux chiffres, aucune phrase), squelettes (`Skeleton`). Les graphiques sont dessinés à la main en SVG ; Recharts est installé mais ne sert pas.
- **La confirmation :** `components/ConfirmDialog.tsx`, pilotée par le store (`confirmDialog`). Elle remplace `window.confirm`, peu fiable dans la WebView de Tauri ; bouton rouge si l'action est destructrice.
- **La connexion :** `components/Login.tsx`. Une carte de verre sur Void (448 px au plus) : profils, mot de passe facultatif, ajout d'un profil en pointillés.
- **La carte bancaire :** `components/Banks.tsx` avec `lib/cardSurface.ts`. Un compte courant est une vraie carte : halos aux couleurs de la banque, grain, texte toujours blanc ; les autres comptes sont des tuiles de verre avec une mini-courbe (`lib/sparkline.ts`).
- **Le tableau des transactions :** `components/Transactions.tsx`. En-tête collant en verre (`HeaderGlass`), contrôles d'en-tête en capitales de 11 px (`HEADER_CONTROL`), pastille de commerçant en initiales (`MerchantAvatar`) : aucun logo n'est téléchargé, pour ne rien envoyer.
- **Les barres de budget :** `components/Categories.tsx` (Lilac, rouge au dépassement) et `components/Budgets.tsx`, les Objectifs (Lilac, puis vert une fois atteints).
- **L'interrupteur :** `components/Settings.tsx` (`role="switch"`, 44 × 24 px, violet allumé, blanc à 15 % éteint).
- **Les toasts :** `react-hot-toast`, réglé dans `App.tsx` : en haut à droite, 3 s, sur Surface.
- **L'import CSV :** `components/ImportCsvModal.tsx`.
- **Les champs :** deux recettes, Surface (`bg-zinc-900` : connexion, transactions, paramètres, profil) et zinc-800 à 60 % dans les modales de Portefeuille, Objectifs, Catégories et Tricount ; 8 px de rayon le plus souvent, focus Violet bright.

### L'app mobile (branche `justeozan/google-play-console-launch`, `src/mobile/`)

- **`theme.ts` :** le seul vrai fichier de tokens de Findy : surfaces, rayons, tailles de texte, tons, cible de 44 px, gouttière de 20 px. Toute vue mobile y puise. Ses valeurs sont celles de la branche [À VÉRIFIER à la fusion].
- **`components/TabBar.tsx` :** barre flottante en pilule ; l'onglet actif s'ouvre en violet avec son libellé, les autres restent des icônes.
- **`components/BalanceCard.tsx` :** le solde en 34 px sur le maillage violet, bouton œil pour le masquer.
- **`screens/Home.tsx` :** l'accueil : carte de solde, trois actions rapides en tuiles de 84 px (l'action principale en blanc, les autres en verre), reste à vivre, dernières opérations.
- **`components/Screen.tsx`** (en-tête collant, corps d'écran), **`Sheet.tsx`** (feuilles montantes arrondies à 28 px), **`ListRow.tsx`**, **`Field.tsx`**, **`Controls.tsx`**.

### Le site (`~/repos/findy-site`)

- **`public/index.html` :** tout le CSS est en ligne dans son `<style>`. Boutons `.btn-primary` et `.btn-ghost` (pilules de 50 px), `.eyebrow` (l'annonce au-dessus du titre), `.label`, `.card` et sa tuile `.icon`, `.window` (le cadre de la capture), `.phone` (le téléphone dessiné), `.vault` (l'encadré du dossier des données), `.honest` (la limite dite franchement), `.soon` (« Bientôt sur Google Play »).
- **`public/privacy.html`, `public/delete-data.html` :** la page de document, colonne de 760 px, `.summary` et `.box`.
- **`tools/og.html` :** la source de l'aperçu de lien `public/assets/og.jpg` (1200×630), rendue avec `tools/touch-icon.html` par `tools/render.sh` (Chrome sans tête).
- **Les captures :** `public/assets/shot-dashboard.webp` (1600×1000) et `shot-mobile.webp` (780×1688), du mode démo uniquement ; la page dessine le cadre, la capture ne montre que l'écran.

## Do's and Don'ts

- **Oui :** Void en fond, et des cartes de verre : blanc à 5 %, bordure blanche à 10 %, flou d'arrière-plan. Jamais une carte grise opaque.
- **Oui :** le violet pour guider : un bouton principal par vue, l'entrée active, un libellé par panneau, le focus.
- **Oui :** le vert, le rouge et l'ambre seulement à côté d'un vrai chiffre : revenus et dépenses, gains et pertes, budget sous ou au-dessus du seuil, échéance proche.
- **Oui :** des chiffres tabulaires et le format fr-FR pour tout montant, avec le signe « − ».
- **Oui :** sur le bureau, un tableau de bord qui tient dans la fenêtre : les panneaux défilent, pas la page.
- **Oui :** pour une vue mobile, les valeurs de `src/mobile/theme.ts` : 44 px par cible, 20 px de gouttière, 16 px dans les champs.
- **Oui :** des captures du mode démo, jamais de vrais comptes, le cadre dessiné par la page ; comparer le rendu aux références avant de livrer.
- **Non :** Subtle (#71717A) ou zinc-600 pour un texte qu'il faut lire pour agir : 3,52 et 2,20:1 sur Panel. Muted dans l'app, Dim sur le site.
- **Non :** un survol plus clair que le bouton : le violet-500 fait tomber le blanc à 4,23:1. Foncer vers Violet deep, comme le site.
- **Non :** du vert ou du rouge décoratifs, une seconde couleur d'accent dans l'interface (hors palettes de données et carte de solde mobile).
- **Non :** une couleur en dur hors palette : `#18191C`, `#0F1013`, `#616875` et `#2B2F37` traînent encore dans les transactions et les investissements.
- **Non :** une police chargée d'un CDN, ou Inter dans un seul des deux supports : la police reste celle du système tant que la question n'est pas tranchée.
- **Non :** un logo de commerçant ou de banque téléchargé : pastilles et couleurs de carte se calculent en local.
- **Non :** du texte en dégradé dans l'app ; sur le site, seulement la seconde ligne du titre.
- **Non :** les photos de personnes, les illustrations génériques de finance, les faux chiffres présentés comme réels.
