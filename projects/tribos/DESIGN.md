---
version: alpha
name: Tribos
description: "Le sport, mais avec tes potes : une app claire et chaleureuse où un seul orange porte l'action et où chaque chiffre compte pour tout le groupe, pour des amis qui s'entraînent ensemble."
colors:
  primary: "#F3730A"
  primary-accent: "#FF9D33"
  primary-light: "#FFEED0"
  cream: "#FDF4EA"
  background: "#FFFFFF"
  surface: "{colors.background}"
  surface-variant: "#F3F4F6"
  border: "#E5E7EB"
  text-dark: "#2C3A43"
  text-medium: "#374151"
  text-muted: "#6B7280"
  text-light: "#9CA3AF"
  challenge-blue: "#4499F2"
  gold: "#FFCE31"
  success: "#68DB56"
  error: "#EF4444"
typography:
  display:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: 0px
  headline:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0px
  stat:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: 0px
  title:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0px
  body:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  label:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0px
  caption:
    fontFamily: Roboto
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0px
rounded:
  button: 12px
  card: 16px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  3xl: 32px
  4xl: 48px
  max-content: 420px
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-dark}"
    typography: "{typography.body}"
  screen-title:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-dark}"
    typography: "{typography.headline}"
  text-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-medium}"
    typography: "{typography.body}"
  text-caption:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-muted}"
    typography: "{typography.caption}"
  text-hint:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-light}"
    typography: "{typography.caption}"
  text-danger:
    backgroundColor: "{colors.background}"
    textColor: "{colors.error}"
    typography: "{typography.body}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-dark}"
    typography: "{typography.title}"
    rounded: "{rounded.card}"
    padding: 16px
  home-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-dark}"
    typography: "{typography.title}"
    rounded: 15px
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    height: 52px
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    height: 52px
  tab-bar:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.pill}"
    height: 58px
  tab-item:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.pill}"
    size: 48px
  tab-item-active:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    width: 72px
    height: 48px
  points-banner:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    typography: "{typography.stat}"
    rounded: 13px
    height: 60px
  challenge-banner:
    backgroundColor: "{colors.challenge-blue}"
    textColor: "{colors.background}"
    typography: "{typography.stat}"
    rounded: 13px
    height: 60px
  invite-card:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.text-dark}"
    typography: "{typography.title}"
    rounded: 20px
    padding: 20px
  avatar:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.text-dark}"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    size: 40px
  blocked-label:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.pill}"
  points-icon:
    backgroundColor: "{colors.gold}"
    size: 26px
  brand-gradient:
    backgroundColor: "{colors.primary-accent}"
  snackbar-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.background}"
    typography: "{typography.body}"
    rounded: 8px
  email-page:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.text-dark}"
  email-card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.card}"
  email-header:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
  email-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
---

# Tribos

Source de vérité du design de Tribos, l'app et son site. Les tokens sont ceux de l'app (`~/repos/tribos/lib/core/app_theme.dart`), le thème clair que voient les utilisateurs. Le site (`~/repos/Tribos-Landing-Page/assets/css/tribos.css`) est une affiche sombre : il est décrit dans Colors, Typography et Components avec ses propres variables. Si l'un change, ce fichier change avec. Les décisions et les questions ouvertes sont dans [decisions.md](decisions.md), les visuels de référence dans [references/](references/README.md).

## Overview

**Le sport, mais avec tes potes.** Tribos est une app mobile de sport en groupe, sur iPhone et Android : un programme commun, une séance par jour, un objectif de séances par semaine que tout le groupe tient ensemble, un classement. Le public : des amis qui veulent s'y tenir à plusieurs, en français et tutoyés. Le site vitrine n'a qu'un travail, faire rejoindre la bêta.

- **Personnalité :** chaleureuse, énergique, simple. Un compagnon d'entraînement, pas un coach qui crie ni un influenceur fitness ; du progrès sans compétition toxique (`docs/brand/README.md`).
- **Le langage commun** de l'app, du site, des mails et des fiches store : un seul orange, `#F3730A`, pour ce qui agit ou progresse ; les chiffres comme vocabulaire (pts, XP, ×2, %, séances, Niv) ; des cartes blanches et douces qui montrent la vraie app ; le renard pour mascotte.
- **Deux expressions.** L'app est claire : Material 3, blanc, encre `#2C3A43`, Montserrat et Roboto. C'est elle que portent les tokens. Le site est une affiche sombre : fond `#0D0B09`, panneaux orange en dégradé, Bricolage Grotesque et Geist. Le skill `tribos-site-sync` de l'app l'assume : le style des deux peut diverger, seul le contrat (données collectées, politique de confidentialité) les lie.
- **L'élément mémorable :** l'orange qui avance. La pilule de l'onglet actif, la flamme de la série, le bandeau Points ×2, le segment de chaque membre dans la barre de l'objectif. Tout le reste reste blanc et calme.
- **À ne pas évoquer :** une salle de musculation agressive, une équipe d'esport ou une interface de jeu (néon, RGB), le gabarit fitness générique.

## Colors

Un blanc, une encre, un orange. Les gris reprennent la palette grise de Tailwind (gray-100 à gray-700) ; l'orange, le bleu du Défi et l'or viennent de la maquette Figma (commentaires d'`AppTheme`).

- **Orange Tribos (#F3730A):** `primary` (`AppTheme.primary`, « Main Brand » de Figma), le seul accent : bouton principal, onglet actif, XP, flamme, ligne de l'utilisateur dans le classement. C'est aussi `--accent` sur le site. Le blanc dessus fait 2,89:1, sous les 3:1 demandés même pour un grand texte ou une icône (question ouverte dans decisions.md).
- **Orange clair (#FF9D33):** `primary-accent`, le départ du dégradé de marque vers l'orange Tribos : replis des photos de groupe et de programme, couverture des fiches store. Jamais sous un texte (2,07:1 avec le blanc).
- **Orange très clair (#FFEED0):** `primary-light`, les fonds doux : carte d'invitation, choix sélectionné du défi, fonds d'icônes, attente des images. L'encre y fait 10,26:1.
- **Crème (#FDF4EA):** `cream`, le fond des mails et des planches store. L'app ne l'emploie pas ; la charte (`docs/brand/README.md`) la donne comme crème d'interface. L'encre y fait 10,76:1.
- **Blanc (#FFFFFF):** `background`, et `surface` qui en est l'alias (`AppTheme.background` et `AppTheme.surface` ont la même valeur) : écrans, cartes, barre d'onglets. Tribos est une app claire jusqu'aux barres système, transparentes à icônes sombres (`AppTheme.systemOverlay`).
- **Gris de fond (#F3F4F6):** `surface-variant` (et `AppTheme.divider`, même valeur) : avatar sans photo, étiquette « Bloqué », pistes des barres de progression.
- **Bordure (#E5E7EB):** `border` : `AppCard.outlined`, étiquettes. Les cartes de l'accueil et la barre d'onglets ont à la place un filet `#E5E5E5` de 0,3 px, codé en dur.
- **Encre (#2C3A43):** `text-dark`, « Encre Figma », qui a remplacé `#111827` : titres et texte (11,71:1 sur le blanc), icônes des onglets, texte des mails.
- **Texte secondaire (#374151):** `text-medium` : texte d'appoint des cartes et des fiches de programme (10,31:1).
- **Texte atténué (#6B7280):** `text-muted` : légendes, labels, « Bonjour, » de l'accueil (4,83:1 sur le blanc). Sur le gris de fond il tombe à 4,39:1, sous l'AA : c'est le cas de l'étiquette « Bloqué ».
- **Texte très clair (#9CA3AF):** `text-light` : icônes des états vides, décor. 2,54:1 sur le blanc : jamais pour un texte à lire, alors que la mention de modération de la création de groupe l'emploie.
- **Bleu Défi (#4499F2):** `challenge-blue` (`AppTheme.challengeBlue`), le seul bleu affiché : bandeau Défi, point du jour dans la série, statistique Séances. Le blanc dessus fait 2,96:1 ; le site l'assombrit en `#1F74C9` (4,77:1) quand il porte un texte.
- **Or (#FFCE31):** `gold` : icône des points du groupe, un des segments de la barre d'objectif. Décoratif seulement (1,49:1 sur le blanc).
- **Vert succès (#68DB56):** `success` : SnackBars « Défi envoyé » et « Séance terminée ». Leur texte clair y tombe vers 1,8:1 [À VÉRIFIER : couleur exacte du texte par défaut de Material].
- **Rouge erreur (#EF4444):** `error` : actions destructives (quitter le groupe, bloquer, retirer la photo) et SnackBars d'erreur ; 3,76:1 sur le blanc.

Les autres couleurs d'`AppTheme` ne sont pas des tokens : `primaryDark` (`#F2960D`, plus clair que `primary` malgré son nom, un seul usage), `secondary` (`#3B82F6`, seulement dans les confettis de la célébration et dans des widgets qu'aucun écran n'appelle) et ses variantes `#60A5FA` et `#1D4ED8`, `warning` (`#F59E0B`), `goldLight` (`#FFDF85`) et `challengeBlueLight` (`#7EBAF8`), inutilisés. Les écrans gardent aussi des couleurs en dur, listées dans decisions.md, dont l'ancien orange `#F38B22` du splash et des écrans de connexion.

Le thème sombre de l'app (`AppTheme.dark()`) n'est qu'un `ColorScheme.fromSeed` en luminosité sombre, et `main.dart` force `ThemeMode.light` : il n'est jamais affiché.

### Le site, une affiche sombre

`assets/css/tribos.css` verrouille un seul thème, sombre : une variante claire « serait un autre design, pas un thème ». Même orange, d'autres neutres, plus chauds :

| Rôle | Variable | Valeur | Contraste |
|---|---|---|---|
| Fond de page | `--paper` | `#0D0B09` | |
| Bandes éditoriales | `--sand` | `#151110` | |
| Tuiles, cartes | `--surface` | `#1A1613` | |
| Panneaux (FAQ, inscription) | `--panel` | `#1E1915` | |
| Filets | `--line`, `--line-strong` | `#272018`, `#3A322A` | |
| Titres | `--ink` | `#F6F1EA` | 17,48:1 sur paper |
| Texte courant | `--body` | `#BEB5AA` | 9,71:1 |
| Texte atténué | `--muted` | `#97897B` | 5,78:1 |
| Accent | `--accent` | `#F3730A` | 6,80:1 sur paper |
| Orange en texte | `--accent-deep` | `#FFA25C` | 9,89:1 |
| Texte sur l'orange | `--on-accent` | `#221000` | 6,36:1 sur l'accent |
| Fond orange sombre | `--accent-soft` | `#2E1B0C` | |
| Affiche « blaze » | `--blaze-hi`, `--blaze-mid`, `--blaze-lo` | `#F58022`, `#C2410C`, `#571C02` | blanc sur `--blaze-mid` : 5,18:1 |

Ses règles, écrites en tête du CSS : le blanc ne se pose jamais sur l'orange plat, une surface orange porte `--on-accent` ; sur une affiche blaze, le texte blanc ne se place que là où le dégradé a atteint `--blaze-mid` ou plus sombre, au-dessus d'un voile sombre. Le bleu de l'app n'y apparaît que dans les recréations de l'app (`--app-blue` `#2563EB`, `--app-challenge` `#1F74C9`), jamais sur un lien, un bouton ou un focus.

## Typography

**App : deux familles Google, chargées par `google_fonts`.** Montserrat pour ce qui doit frapper (titres, chiffres), Roboto pour ce qui se lit (texte, labels) et, par défaut, pour tout `Text` sans style. Les styles vivent dans `AppTheme` :

| Style `AppTheme` | Famille | Taille, graisse, interligne | Token |
|---|---|---|---|
| `headlineLarge` | Montserrat | 28 px, 800, 1,2 | `display` |
| `headlineMedium` | Montserrat | 24 px, 700, 1,2 | |
| `headlineSmall` | Montserrat | 20 px, 700, 1,3 | `headline` |
| `titleLarge` | Montserrat | 18 px, 600, 1,3 | |
| `titleMedium` | Montserrat | 16 px, 600, 1,4 | `title` |
| `titleSmall` | Montserrat | 14 px, 600, 1,4, en `text-medium` | |
| `bodyLarge` | Roboto | 16 px, 400, 1,5 | |
| `bodyMedium` | Roboto | 14 px, 400, 1,5 | `body` |
| `bodySmall` | Roboto | 12 px, 400, 1,4, en `text-muted` | `caption` |
| `labelLarge` | Roboto | 14 px, 500, 1,4 | `label` |
| `labelMedium`, `labelSmall` | Roboto | 12 et 10 px, 500, 1,3 | |
| `buttonLarge` à `buttonSmall` | Montserrat | 16, 14 et 12 px, 600, 1,2 | |

- **Les chiffres** (points, séances, « ×2 », « 3 / 10 séances ») sont en Montserrat 800 à 900 : `stat` reprend le bandeau Défi (`sessions_card.dart` : 20 px, 900, 1,1). Le prénom de l'accueil passe `headlineSmall` en 800.
- **Interlettrage :** `AppTheme` n'en fixe aucun, d'où 0 dans les tokens. Un style lu par `Theme.of(context).textTheme` reçoit celui de la géométrie Material 3, par exemple +0,5 px sur `bodyLarge` [À VÉRIFIER].
- **Boutons :** les `FilledButton` et `OutlinedButton` des écrans gardent le style de texte par défaut de Material 3, `labelLarge` en Roboto (`label`) [À VÉRIFIER]. Les styles `button*` en Montserrat ne servent qu'à `AppButton`, qu'aucun écran n'appelle.
- **Écarts :** les titres de connexion et d'inscription (30 px, 800) et d'onboarding (26 px, 800) ne donnent pas de famille et tombent en Roboto, dans des gris en dur (`#1F2937`, `#111827`) ; le label « Séance du jour » est un `titleLarge` ramené à 10 px.
- **Chargement :** aucune police n'est embarquée (`pubspec.yaml` n'a pas de section `fonts`), `google_fonts` les télécharge ; hors ligne au premier lancement, l'app s'affiche en police système [À VÉRIFIER].
- **Fiches store :** Montserrat ExtraBold pour les titres (96 px en couverture, 88 ensuite, sur des planches de 1320 px de large), SemiBold 44 px pour les sous-titres (`scripts/gen_app_store_assets.py`).
- **Mails :** Helvetica, Arial, les polices web ne s'y chargeant pas partout : titre 22 px, texte 15 px, interligne 1,6.

**Site : trois familles auto-hébergées** (`assets/fonts/`, woff2 latin et latin-ext, rien chez un tiers) :

- **Bricolage Grotesque** (`--font-display`, variable de 200 à 800, taille optique automatique) : tous les titres, en 700, interlettrage de −0,022 em à −0,04 em, interligne 1,06, `text-wrap: balance`. Échelle fluide : `--step-1` de 18 à 21 px, `--step-2` de 21,6 à 28, `--step-3` de 26,4 à 40, `--step-4` de 32 à 56, `--step-5` de 40 à 84 ; le titre de l'affiche du hero monte à 89,6 px.
- **Geist** (`--font-text`, 400, 500 et 600) : texte courant en `--step-0` (16 à 17 px), interligne 1,6 ; chapeau (`.lede`) en `--step-1`, interligne 1,5, 46 caractères de large au plus ; boutons en 600.
- **Geist Mono** (`--font-mono`, 500 seulement, une instance statique) : les sur-titres (`.eyebrow` : capitales, +0,12 em, en `--accent-deep`) et les chiffres (`.num`, chiffres tabulaires).
- Les recréations de l'app sur le site (`.appui`) sont en Geist, « jamais la police de titre du site » ; ni Montserrat ni Roboto n'y sont chargées. Écart noté dans decisions.md.

Ce qui est commun : des titres gras et serrés dans une grotesque (Montserrat 700 à 800, Bricolage 700), un texte neutre (Roboto, Geist), des chiffres lourds ou tabulaires. Deux familles de texte par support, pas plus.

## Layout

**App : une colonne, pensée pour le téléphone.**

- Contenu centré, 420 px au plus (`max-content`, `AppTheme.maxContentWidth`) : tablette et bureau ne l'étirent pas.
- Marges d'écran de 16 px sur les côtés et 12 px en haut et en bas (`screenPadding`) ; 16 px dans les cartes (`cardPadding`).
- Échelle de 4 px : 4, 8, 12, 16, 20, 24, 32, 48 (`xs` à `4xl`). Les cartes de l'accueil s'empilent à 12 px (`md`), un label de section est à 8 px de sa carte (`sm`).
- Accueil, de haut en bas : « Bonjour, » et le prénom, l'avatar à droite ; le bandeau des premiers pas tant qu'ils ne sont pas faits ; la série ; « Séance du jour » ; la paire Points et Séances en deux colonnes séparées de 12 px ; le classement du groupe.
- Barre d'onglets flottante, centrée à 24 px du bas : Accueil, Programme, Groupe. On passe d'un onglet à l'autre en glissant (`PageView`) ; la barre disparaît quand le clavier s'ouvre.
- Bord à bord : barres système transparentes à icônes sombres, le blanc de l'écran passe dessous (`AppTheme.systemOverlay`).

**Site : une page longue, rythmée à la main.**

- Conteneur de 1240 px (`--wrap`), 760 px pour le texte long (`--wrap-narrow`), gouttières fluides de 20 à 40 px (`--gutter`).
- Nav collante de 68 px. Hero en affiche : le texte à gauche, le téléphone à droite dans une colonne de 360 px, le tout au-dessus de la ligne de flottaison (880 px au plus) ; une seule colonne sous 1080 px.
- Sections de 64 à 136 px de padding vertical (`.section`), réglé section par section (`--section-air`) plutôt qu'alterné : le bento a le plus d'air.
- Échelle `--s-1` à `--s-10` : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px.
- Bento de cinq tuiles sur 12 colonnes dès 1040 px, deux colonnes de 720 à 1039 px, une seule en dessous.
- Petits écrans : liens de nav repliés dans un menu sous 860 px, dock d'inscription collant en bas (un lien, jamais un champ).

## Elevation & Depth

**App : du blanc sur du blanc, séparé par des ombres très douces.** La teinte de surface de Material 3 est coupée sur les barres (`surfaceTintColor: Colors.transparent`) et les cartes sont de simples conteneurs blancs : les surfaces restent blanches.

- Quatre niveaux dans `AppTheme` : `shadowSm` (noir à 4 %, flou 6, décalage 2), `shadowMd` (6 %, 12, 4 ; celui d'`AppCard.elevated`), `shadowLg` (8 %, 20, 8), `shadowXl` (10 %, 32, 16).
- Les cartes de l'accueil et la barre d'onglets ont leur propre ombre (noir à 5 %, flou 16,5, décalage 4) et le filet `#E5E5E5` de 0,3 px ; la carte de la séance du jour, 5 %, flou 33, décalage 10.
- La hiérarchie vient d'abord de la couleur : au plus une surface pleine, orange ou bleue, par carte (le bandeau Points ×2, le bandeau Défi), et seulement quand l'événement existe.

**Site : la profondeur vient de la lumière.** Ombres profondes et douces (`--shadow-1` à `--shadow-3`, jamais un trait noir dur), grain fixe à 5 % en mode `screen`, halos orange radiaux derrière le hero et le panneau d'inscription, affiches `.blaze` en dégradé. Les cartes « app » blanches se détachent du noir : ce contraste porte la page.

## Shapes

Des formes rondes et douces, une pilule pour ce qui se touche.

- **App :** cartes à 16 px (`card`, `AppTheme.cardRadius`) ; boutons, pastilles et ligne en surbrillance à 12 px (`button`) ; pilule pour la barre d'onglets (47 px de rayon pour 58 de haut, onglet actif à 44), l'étiquette « Bloqué » (999) et les puces de contribution ; cercles pour les avatars.
- **Écarts dans l'app :** 15 px sur les cartes de l'accueil et 13 px sur leurs bandeaux (valeurs de la maquette codées en dur), 14 px sur les boutons de connexion, d'inscription et d'onboarding, 8 px sur le bouton de confirmation d'e-mail et les SnackBars, 20 px sur la carte d'invitation, le bandeau des premiers pas et la carte de l'objectif. Sept rayons pour trois rôles : voir decisions.md.
- **Site** (règle verrouillée en tête de `tribos.css`) : tout ce qui est interactif en pilule (`--r-pill`, 999 px : boutons, champs, puces) ; cartes, panneaux et tuiles à 20 px (`--r-card`) ; médias, cadres de téléphone et grands panneaux à 32 px (`--r-media`). Le cadre du téléphone fait 46 px, son écran 37.
- **Mails :** carte à 16 px, bouton en pilule (999 px), comme sur le site.
- **Logo :** le renard blanc stylisé (`assets/brand/tribos_mark.png`), dans un carré arrondi orange pour l'icône. C'est un symbole, pas la mascotte illustrée.

## Components

Les vrais composants vivent dans le code ; ce fichier dit où et quand. Les atomes du front matter (`card`, `button-primary`, `tab-item-active`…) nomment les pièces communes ; les chemins ci-dessous sont relatifs à chaque dépôt.

### L'app (`~/repos/tribos`, Flutter)

- **Tokens :** `lib/core/app_theme.dart` (`AppTheme`) : couleurs, espacements, rayons, styles de texte, ombres, durées d'animation, `systemOverlay`, `ThemeData`. Un nouvel écran part de là ; une valeur qui revient y monte (`FIGMA.md`).
- **Carte :** `AppCard` (`lib/widgets/app_card.dart`) : `elevated` par défaut (`shadowMd`), `flat`, `outlined` ; 16 px de rayon et de padding (`card`).
- **Boutons :** les écrans stylent sur place `FilledButton` ou `ElevatedButton` (fond orange, texte blanc, 52 px de haut, rayon `AppTheme.buttonRadius` : `button-primary`) et `OutlinedButton` (texte et bord orange : `button-outline`). `AppButton` et `AppIconButton` (`lib/widgets/app_button.dart` : primary, secondary, outline, ghost ; 36, 44 et 52 px) existent mais aucun écran ne les appelle.
- **Barre d'onglets :** `lib/screens/main_tab_screen.dart` : pilule blanche flottante, trois icônes, l'onglet actif s'élargit en pilule orange de 72 × 48 à icône blanche (`tab-bar`, `tab-item`, `tab-item-active`). Le `navigationBarTheme` d'`AppTheme` ne sert à aucun écran.
- **Accueil** (`lib/screens/home/widgets/`) : `StreakCard` (la série et les jours de la semaine), `DailySessionCard` (illustration à gauche, pastille en haut à droite, bouton flèche orange de 12 px), `StatsGrid` et `SessionsCard` (cartes Points et Séances ; leurs bandeaux Points ×2 et Défi n'apparaissent qu'avec l'événement : `points-banner`, `challenge-banner`), `LeaderboardCard` (ligne de l'utilisateur sur l'orange à 12 %, médailles or, argent et bronze), `ChecklistBanner` (premiers pas). Cartes de 15 px à filet de 0,3 px (`home-card`).
- **Groupe** (`lib/screens/group/`) : `GroupBanner` (photo du groupe, repli en dégradé `primary-accent` → `primary` : `brand-gradient`), `WeeklyGoalCard` (la barre de l'objectif collectif, un segment par membre dans six oranges et ors, puces de contribution en vert `#2E7D2A`), statistiques du groupe dans `group_screen.dart` (icônes or, bleu, orange et violet : `points-icon`), `ChallengeSheet`, `MemberActionsSheet`.
- **Membres :** `MemberAvatar` (`lib/widgets/member_avatar.dart` : photo ou initiale sur gris, anneau de 2 px à la couleur du segment du membre : `avatar`), `BlockedLabel` (`lib/widgets/blocked_label.dart`, la ligne du membre estompée à 45 % : `blocked-label`).
- **Programmes** (`lib/screens/programs/`) : `ProgramHeroCard` (repli en dégradé orange), `WeekStrip`, `SessionTile`, `ExerciseRow`, et `ProgramCard` (`lib/widgets/program_card.dart`).
- **Profil** (`lib/screens/profile/widgets/`) : `SocialInvitationCard` (`invite-card`), `AchievementsGrid` (badges teintés de leur couleur à 15 %), `StatsSection`.
- **Retours :** SnackBars flottantes, vertes pour un succès (`snackbar-success`), rouges pour une erreur ; textes destructifs en `error` (`text-danger`). `CelebrationOverlay` (`lib/widgets/celebration_overlay.dart`) lance les confettis.
- **Splash :** `lib/screens/brand_splash.dart` et `flutter_native_splash` (`pubspec.yaml`) : fond `#F38B22`, renard blanc, « TRIBOS » en capitales blanches qui monte en fondu.
- **Sans appelant :** `ProgressRing`, `AppFilterChip` (sélection en `Colors.orange`), `AppSearchBar`, `MiniCard`, `GroupsEmptyCard` sont dans `lib/widgets/` mais aucun écran ne les utilise.

### Le site (`~/repos/Tribos-Landing-Page`, HTML et CSS sans build)

- **Tokens et composants :** `assets/css/tribos.css` : variables en tête, partie 2 pour les surfaces « app » et la conversion, partie 3 pour la couche affiche. Polices dans `assets/fonts/fonts.css`, icônes dans `assets/icons/sprite.svg` (appelées en `<use>`), comportements dans `assets/js/site.js`. Une règle qui manque s'ajoute en fin de fichier avec les variables existantes (`README.md`).
- **Boutons `.btn` :** pilules de 52 px (`.btn-sm` 44, `.btn-lg` 58) en Geist 600 ; `.btn-primary` orange à texte `#221000`, `.btn-light` blanc sur les affiches, `.btn-ghost` en contour, `.btn-ink` (fond `--ink`, texte `--paper`) ; `.link-arrow` en `--accent-deep`.
- **Nav `.nav` :** 68 px, collante, fond `--paper` à 80 % flouté, soulignement orange au survol.
- **Affiches `.blaze` :** `.hero-poster`, `.poster` (le téléphone au centre, qui déborde sur la section suivante), `.band.blaze`, `.beta-panel` : dégradé orange vers brun, photo en duotone (`.blaze-field`), wordmark fantôme (`.ghost`).
- **Téléphone `.phone` :** vraie capture ou écran recréé dans un cadre de 46 px, barre d'état dessinée, jamais d'encoche.
- **Bento `.bento` et `.tile` :** cinq tuiles (`.tile-shot`, `.tile-accent` orange à texte sombre, `.tile-ink`, `.tile-pattern`).
- **FAQ `.faq`**, **inscription `.signup`** avec `.field` (champs pilules de 54 px), `.chips` (iPhone ou Android, rien de présélectionné) et `.form-status`, **pied `.footer`**, pages légales `.doc`.
- **Recréations de l'app** (`.appui`, `.streak`, `.board`, `.appduo`, `.statgrid`, `.tabbar`…) : la série, le classement, la paire Points ×2 et Défi, l'anneau XP, la bulle de chat, la barre d'onglets, avec des jetons `--app-*` repris d'`app_theme.dart` (16 et 12 px de rayon, filet `#E5E7EB`).
- **Carte sociale :** `tools/og-card.html`, rendue par `tools/build-og.mjs` dans `assets/brand/og-card.png`, avec les vraies polices et les vrais tokens.

### Mails et fiches store

- **Mail de bienvenue** (`functions/beta-signup/index.js` du site, envoyé par Resend) : fond crème, carte blanche de 16 px et 520 px de large au plus, bandeau orange avec le logo et « Tribos » en blanc, titre et texte en encre, secondaire en `#5E6A72`, bouton pilule orange à texte blanc, pied crème (`email-page`, `email-card`, `email-header`, `email-button`).
- **Visuels store** (`scripts/gen_store_assets.py` et `scripts/gen_app_store_assets.py` de l'app, sorties dans `store/`) : couverture en dégradé orange, logo et titre Montserrat ExtraBold en blanc ; planches suivantes sur crème, titre en encre ; l'écran de l'app déborde par le bas.

### Marque et illustration

- `docs/brand/README.md` (copié à l'identique dans le site) : palette de marque, renard canonique (`docs/brand/mascotte/`, à joindre à chaque génération) et trois presets de direction artistique dans `.claude/skills/tribos-da-*` : Minimalist Premium Dark, Cinematic 3D, Illustrated Comic. Un seul preset par support.

## Do's and Don'ts

- **Oui :** l'orange `#F3730A` pour ce qui agit ou progresse (bouton principal, onglet actif, XP, flamme, ligne de l'utilisateur dans le classement), et pour rien d'autre.
- **Oui :** dans l'app, les tokens et les styles d'`AppTheme` ; sur le site, les variables de `tribos.css`. Ni `Colors.orange`, ni `#F38B22`, ni gris en dur dans un nouveau code.
- **Oui :** sur une nouvelle surface orange, un texte sombre (`#221000`, 6,36:1, la règle du site). Le blanc sur l'orange (2,89:1) reste dans l'app tant que la question ouverte n'est pas tranchée.
- **Oui :** les chiffres en héros, gros et gras (Montserrat 800 à 900 dans l'app, Geist Mono tabulaire sur le site), leur unité en petit à côté (pts, XP, %, séances).
- **Oui :** de vraies captures ou des recréations fidèles de l'app, en français, avec le compte de démo et des visages libres de droits ; aucun chiffre ni témoignage inventé.
- **Oui :** le renard canonique joint à chaque image générée, un seul preset de direction artistique par support ; le texte, les boutons et le logo se posent ensuite en code.
- **Oui :** le tutoiement et l'apostrophe typographique (’) ; ni tiret cadratin ni demi-cadratin dans les textes du site.
- **Non :** le bleu ailleurs que sur le Défi et les statistiques de séances : jamais un lien, un bouton ni un focus.
- **Non :** `text-light` (`#9CA3AF`) pour un texte à lire, ni `text-muted` sur `surface-variant` : sous 4,5:1.
- **Non :** l'ancien loup gris (`assets/mascotte/loup.png`), hors charte, même s'il reste dans deux cartes de l'app et sur les visuels actuels.
- **Non :** une variante claire du site ou un mode sombre de l'app sans décision : l'app est claire, le site est sombre, et c'est voulu.
- **Non :** Bricolage Grotesque dans une carte « app » : elle cesse d'avoir l'air du produit.
- **Non :** les codes du jeu vidéo et de l'esport (néon, RGB, reflets d'objectif) ou le gabarit fitness générique.
- **Non :** un rayon de plus : 12, 16 et la pilule dans l'app ; 20, 32 et la pilule sur le site.
