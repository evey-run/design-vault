---
version: alpha
name: Orivo
description: "Direction artistique de la communication d'Orivo (mails, Reddit, réseaux) : une seule lumière dans une pièce sombre pleine de jeux."
colors:
  primary: "{colors.ring-violet}"
  void: "#0B0B0D"
  abyss: "#060609"
  panel: "#151618"
  line: "#2A2930"
  white: "#F4F2F7"
  body: "#C8C5CF"
  ash: "#9B97A3"
  dim: "#76717E"
  ring-violet: "#8C65FF"
  violet: "#7D54F4"
  lavender: "#C1AAFD"
  frost: "#DAD8FF"
  ring-blue: "#4B7BFE"
  sky: "#6BB5FC"
typography:
  headline-display:
    fontFamily: Inter Display
    fontSize: 90px
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter Display
    fontSize: 63px
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: -0.025em
  body-lg:
    fontFamily: Inter
    fontSize: 32.4px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 18.9px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.08em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.04em
rounded:
  card: 13px
  screen: 23.4px
  device: 66.6px
  full: 9999px
spacing:
  margin-block: 72px
  margin-inline: 81px
  stack: 28.8px
  story-safe-top: 250px
  story-safe-bottom: 340px
components:
  canvas:
    backgroundColor: "{colors.void}"
    textColor: "{colors.white}"
  headline:
    backgroundColor: "{colors.void}"
    textColor: "{colors.white}"
    typography: "{typography.headline-display}"
  headline-product:
    backgroundColor: "{colors.void}"
    textColor: "{colors.white}"
    typography: "{typography.headline-lg}"
  subline:
    backgroundColor: "{colors.void}"
    textColor: "{colors.body}"
    typography: "{typography.body-lg}"
  kicker:
    backgroundColor: "{colors.void}"
    textColor: "{colors.ash}"
    typography: "{typography.label-md}"
  kicker-accent:
    backgroundColor: "{colors.void}"
    textColor: "{colors.lavender}"
    typography: "{typography.label-md}"
  version-pill:
    textColor: "{colors.frost}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.body}"
    rounded: "{rounded.card}"
  hairline:
    backgroundColor: "{colors.line}"
    height: 1px
  vignette:
    backgroundColor: "{colors.abyss}"
  fine-print:
    backgroundColor: "{colors.void}"
    textColor: "{colors.dim}"
  button-frost:
    backgroundColor: "{colors.frost}"
    textColor: "{colors.void}"
    rounded: "{rounded.full}"
  on-violet:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.frost}"
  ring-light:
    backgroundColor: "{colors.primary}"
  ring-light-cool:
    backgroundColor: "{colors.ring-blue}"
  ring-light-highlight:
    backgroundColor: "{colors.sky}"
  rim:
    backgroundColor: "{colors.lavender}"
  screen:
    rounded: "{rounded.screen}"
  device:
    rounded: "{rounded.device}"
---

# Orivo

Source de vérité du design de la communication d'Orivo. Les valeurs viennent du renderer du skill `orivo-comms` (`scripts/templates.mjs`) et de sa direction visuelle (`references/visual.md`) : si l'un change, ce fichier change avec, et inversement. Les décisions et les questions ouvertes sont dans [decisions.md](decisions.md), les visuels de référence dans [references/](references/README.md).

## Overview

**Une seule lumière dans une pièce sombre pleine de jeux.** Orivo est une bibliothèque de jeux plein écran : tous les jeux possédés sur Steam, Epic Games, GOG, Ubisoft Connect et Xbox au même endroit, à parcourir au doigt ou à la manette. Ce fichier décrit sa communication publique : mails, Reddit, réseaux, aperçus de liens. L'app suit son propre code (`~/repos/orivo/src/styles.css`).

- **Personnalité :** nocturne et cinématique, calme, précise. Un générique de film dans un salon tamisé, pas un flyer de LAN.
- **Le produit est le héros :** chaque visuel montre Orivo (sa bibliothèque, son rail, son liseré, son anneau), jamais une image « gaming » générique. Un premier visiteur doit voir à quoi ressemble l'app.
- **Une seule lumière :** le vide sur 80 à 90 % de la surface et le dégradé violet → bleu de l'anneau. Aucune autre couleur d'accent.
- **Peu de mots sur l'image :** un kicker mono et un titre de 2 à 7 mots, ou rien. La phrase vit dans le post, l'objet du mail, la légende.
- **Inspiration :** la communication de Raycast (le produit en héros, un seul accent lumineux, presque pas de texte sur les images), adaptée et non copiée.

Pour écrire, la voix est dans le skill `orivo-comms` (`references/voice.md`), résumée sur la page Orivo du vault. Les visuels sortent de son renderer (voir Components), jamais d'un autre outil.

## Colors

Un noir presque pur et une seule source de lumière : le dégradé conique du logo. Les neutres portent tout le texte ; les couleurs vives ne servent qu'à la lumière.

- **Void (#0B0B0D):** le fond, 80 à 90 % de chaque visuel. Presque noir sans être #000 : la lumière s'y dégrade sans trou.
- **Abyss (#060609):** les bords du vignettage, les ombres les plus profondes.
- **Panel (#151618):** cartes, corps des mails, zones encadrées.
- **Line (#2A2930):** filets et séparateurs.
- **White (#F4F2F7):** les titres (17,69:1 sur Void). Jamais #FFF pur : un blanc à peine lilas reste dans la lumière de l'anneau.
- **Body (#C8C5CF):** texte courant et sous-titres (11,56:1 sur Void).
- **Ash (#9B97A3):** kickers, métadonnées, légendes (6,88:1 sur Void).
- **Dim (#76717E):** mentions légales, petits caractères. 4,15:1 sur Void, sous le seuil AA de 4,5:1 : seulement pour ce qu'on n'a pas besoin de lire pour agir (question ouverte dans decisions.md).
- **Ring violet (#8C65FF):** le violet de l'anneau, l'accent de marque (`primary`).
- **Violet (#7D54F4):** le `--violet` de l'app, ses boutons et ses liens. Dans la communication, il n'apparaît que dans les vraies captures. Frost dessus fait 3,43:1 : assez pour un grand texte ou une icône, pas pour du texte courant.
- **Lavender (#C1AAFD):** le liseré de la carte sélectionnée, le mot accentué d'un kicker (9,77:1 sur Void).
- **Frost (#DAD8FF):** le bouton pilule givré, le texte clair sur violet.
- **Ring blue (#4B7BFE):** le côté froid de l'anneau.
- **Sky (#6BB5FC):** le bleu le plus clair de l'anneau, par touches seulement.

Les dégradés ne sont pas des tokens (la spec ne les décrit pas encore) :

- **L'anneau :** conique depuis 210°, sky → `#BCD2FE` → lavender → `#A985FE` → `#7B6CFE` → ring blue → `#4B8FFE` → sky. C'est la lumière : toujours flou, en halo, jamais en aplat derrière du texte.
- **Le liseré :** linéaire à 145°, `#A997F6` → `#C4BBFF` → `#977DEF`. Fin (1 à 1,5 % de la hauteur de la carte), avec une lueur violette.

Proportions : le vide au moins 80 %, la lumière au plus 10 %, le texte et l'interface pour le reste. Jamais deux accents saturés au même point focal, par exemple le bleu de l'anneau contre une jaquette rouge.

## Typography

Deux familles, trois rôles. Le renderer compte en vmin, pour qu'un gabarit se lise pareil à tous les formats ; les tailles en px des tokens sont celles du format `x` (1600×900, 1 vmin = 9 px).

- **Titre, Inter Display SemiBold (600) :** casse de phrase, interlettrage −2,5 %, interligne 1,02, `text-wrap: balance`. 2 à 7 mots sur une image. 10 vmin pour une carte de texte (`headline-display`), 7 vmin au-dessus d'un produit (`headline-lg`).
- **Sous-titre et texte, Inter Regular (400) :** en Body, interligne 1,35 à 1,5, une ou deux lignes sur une image (`body-lg`, 3,6 vmin).
- **Kicker, date, version, plateforme, JetBrains Mono Medium (500) :** en capitales, +8 %, en Ash, un mot en Lavender pour accentuer (`label-md`). Les versions s'écrivent `v0.3.7` dans une pilule (`label-sm`, +4 %), les dates `OCT 13, 2026`. Kickers et pilules tiennent sur une ligne : leur interligne de 1,2 ne sert qu'à l'export W3C.

Le kicker en capitales mono est un choix de marque, repris de Raycast : un par visuel. Le skill frontend-design d'Anthropic range les sur-titres en capitales et les petits labels en mono parmi les tics des pages générées ; sur une page web d'Orivo, n'en mettre que là où la marque parle, jamais au-dessus de chaque titre.

Les polices sont dans le skill (`assets/fonts/`, licences OFL et Inter). L'app utilise la police système, SF Pro chez Apple : jamais de SF Pro dans un visuel marketing, sa licence ne couvre que les maquettes d'interface. Les mails utilisent la pile système (`-apple-system, Segoe UI, Helvetica, Arial`), les polices web ne s'y chargeant pas partout. Jamais de titre en dégradé, en contour ou lumineux, jamais plus de deux graisses dans un visuel.

## Layout

Un sujet par image, et de l'air autour.

- **Marges :** 8 à 9 % du petit côté (8 vmin en haut et en bas, 9 vmin sur les côtés : `margin-block`, `margin-inline`), rien de plus près du bord. Un produit peut déborder exprès, jamais son contenu clé.
- **Texte :** en haut à gauche, kicker puis titre espacés de 3,2 vmin (`stack`), ou en bas à droite pour un macro. Jamais de titre centré sur le produit, jamais de texte sur une image chargée : le vide est le fond du texte.
- **Profondeur :** vignettage aux bords, lumière derrière le sujet, sujet net, le reste doux.
- **Zones sûres :** stories, Reels et Shorts (1080×1920) gardent le texte à 250 px du haut et 340 px du bas (`story-safe-top`, `story-safe-bottom`). Un recadrage carré d'un 16:9 garde le sujet dans les 56 % du milieu.
- **Séries** (carrousels, fils) : même position de lumière et même taille de texte d'une slide à l'autre. La première accroche, la dernière appelle à l'action avec le gabarit `ring`. `device` et `perspective` sont éclairés par le bas : les slides `title` prennent `light: "bottom"` pour suivre.

| Format | Taille (px) | Usage |
|---|---|---|
| `og` | 1200×630 | Aperçus de liens : site, GitHub, Discord, cartes X et Bluesky |
| `x` | 1600×900 | X, Bluesky, Threads, Mastodon, LinkedIn ; posts lien Reddit ; en-têtes de changelog |
| `reddit` | 1200×900 | Posts image Reddit (le 4:3 s'affiche sans recadrage) |
| `square` | 1080×1080 | Fils Instagram, Threads, LinkedIn |
| `portrait` | 1080×1350 | Fils Instagram et Threads, carrousels (4:5) |
| `tall` | 1080×1440 | Instagram en 3:4, ce que montre la grille du profil |
| `story` | 1080×1920 | Stories, couvertures de Reels, Shorts, TikTok |
| `email` | 1200×675 | Héros des templates Resend, affiché en 600 de large |
| `youtube` | 1280×720 | Miniatures |
| `play` | 1024×500 | Visuel Google Play : JPEG, `device` centré |

## Elevation & Depth

La profondeur vient de la lumière, pas des ombres.

- Pas d'ombre portée dure : des halos larges et doux (flou d'au moins 6 % du visuel), une lueur violette sous le sujet, un vignettage vers Abyss.
- L'anneau flou se place derrière ou à côté du sujet, en partie hors cadre, à 35–55 % d'opacité. Il remplace le « fond en dégradé coloré » des autres apps : une seule lumière, et elle a une direction.
- Un grain de film d'environ 7 % empêche les dégradés sombres de faire des bandes.
- Captures inclinées et appareils portent un liseré clair très fin (`rgba(218,216,255,.28)`) et une grande ombre noire diffuse : c'est ce qui les décolle du vide.

## Shapes

Des formes douces, toutes prises à l'app.

- **Jaquettes et cartes :** 13 px à l'échelle de l'app, environ 10 % de la hauteur d'une jaquette (`card`).
- **Captures inclinées :** 2,6 vmin (`screen`). **Appareils :** 7,4 vmin pour un téléphone (`device`), 4,8 vmin pour une tablette ; cadre neutre, sans logo ni encoche.
- **Pilules :** entièrement arrondies (`full` ; 99 px dans le code) : bouton givré, pilule de version.
- **L'anneau :** le logo lui-même, jamais recoloré, détouré, déformé ou tourné en 3D.

## Components

Les vrais composants vivent dans leur code ; ce fichier dit quand s'en servir. Les visuels sortent du renderer du skill `orivo-comms` (`~/.claude/skills/orivo-comms/scripts/templates.mjs`), les mails de `~/repos/orivo-site/emails/build.py`. Pour un besoin nouveau, ajouter un gabarit au renderer plutôt que bricoler un visuel ailleurs : le suivant sera pareil.

Les atomes du front matter (`canvas`, `headline`, `kicker`, `panel`, `ring-light`…) sont les pièces communes à tous les gabarits. Les commandes se lancent depuis `~/.claude/skills/orivo-comms/scripts` ; `examples/campaign.json` est une campagne complète pour partir.

### title, la carte de texte

Kicker mono, titre court, sous-titre ou jusqu'à quatre lignes de liste, wordmark ; la lumière sort d'un coin, du bas ou du haut. Pour les posts texte Reddit et réseaux, les citations, un « bientôt », la slide « comment ça marche ».

```bash
node render.mjs --template title --format x --data '{"kicker":"Public beta","title":"Your library,\nin your pocket.","sub":"iPhone and iPad, free on TestFlight."}'
```

### ring, l'anneau en objet

Le logo seul dans le noir, la lumière qui coule au sol. Pour les nouvelles de marque, les en-têtes de newsletter, la dernière slide d'un carrousel.

```bash
node render.mjs --template ring --format square --data '{"kicker":"Orivo newsletter · <b>October</b>","title":"One library.\nEvery store."}'
```

### perspective, l'app inclinée

Une vraie capture inclinée dans l'espace, sous la lumière. Pour les grosses versions, « le nouveau… », tout ce où le produit est la nouvelle.

```bash
node render.mjs --template perspective --format og --data '{"image":"mac-most-played","kicker":"Browse by activity","title":"Sorted by what you actually play."}'
```

### device, téléphone ou tablette

Cadre neutre sans logo, en paysage, éclairé par l'anneau. Pour les nouvelles plateformes : bêta iPhone et iPad, Android.

```bash
node render.mjs --template device --format x --data '{"kicker":"TestFlight · <b>Public beta</b>","title":"Orivo, now on iPhone and iPad."}'
```

### rim, le macro du liseré

Le liseré lavande de la carte sélectionnée et son reflet, en profondeur de champ. L'équivalent de la barre rouge de Raycast : navigation, manette, sensations.

```bash
node render.mjs --template rim --format x --data '{"kicker":"Controller-first","title":"Built for the couch."}'
```

### changelog, la carte de version

Pilule de version, date en mono, titre, jusqu'à quatre lignes, petite capture inclinée. Pour les posts de version et les en-têtes de notes.

```bash
node render.mjs --template changelog --format x --data '{"version":"v0.3.7","date":"Oct 13, 2026","title":"Install what you own,\nfrom anywhere.","items":["iPhone and iPad, in public beta"],"image":"iphone-library"}'
```

### rail, le rail de la bibliothèque

Une carte sélectionnée parmi les jaquettes, comme dans l'app. Pour les nouvelles de la bibliothèque et l'arrivée d'un store.

```bash
node render.mjs --template rail --format x --data '{"kicker":"Orivo","title":"All your games in one place."}'
```

### Le mail Resend

Trois templates (`orivo-welcome`, `orivo-release`, `orivo-newsletter`) bâtis sur un même squelette : fond Void, carte Panel arrondie à 20 px, kicker puis titre puis intro, un panneau « What's new », un bouton pilule Frost au texte sombre, la ligne de signature et un pied avec le lien de désinscription. Les héros se rendent avec `--format email`. Le code des mails emploie quelques teintes hors palette ; elles sont listées dans decisions.md.

### Vidéos et GIF

- Vidéos : de vraies captures d'écran d'Orivo, 5 à 20 s, à 60 images par seconde, thème sombre. À la manette quand le sujet est le canapé, au doigt sur iPhone.
- Montage : commencer sur une image utile (la bibliothèque déjà à l'écran, pas un bureau), une idée par clip, aucun carton d'intro, finir sur l'image qui servira de couverture.
- Sous-titres incrustés pour les réseaux, où la lecture démarre sans le son : en Inter sur une bande sombre, deux lignes au plus. Musique facultative et discrète, jamais de piste « épique » de banque de sons.
- La couverture se rend avec le même gabarit que l'image du post, pour que le fil reste cohérent.

## Do's and Don'ts

- **Oui :** montrer Orivo lui-même dans chaque visuel : sa bibliothèque, son rail, son liseré, son anneau.
- **Oui :** le vide sur 80 % au moins et une seule lumière, le dégradé violet → bleu de l'anneau.
- **Oui :** de vraies captures, à jour. Un visuel iOS ne montre que ce que fait iOS : pas de lancement de jeux PC.
- **Oui :** regarder le rendu à la taille du fil (environ 400 px de large) et le comparer aux [références](references/README.md) avant de livrer.
- **Oui :** la même nouvelle a le même titre, le même visuel et le même lien partout.
- **Non :** une autre couleur d'accent, un dégradé en aplat derrière du texte, du #FFF pur.
- **Non :** plus de 7 mots sur une image ; un titre en capitales, en dégradé ou en contour.
- **Non :** un logo de store, de plateforme ou de console (Steam, Epic, Apple, Windows, consoles) : les stores se nomment dans le texte.
- **Non :** photos de stock, personnes générées, faux avis, faux chiffres, prix sur les images.
- **Non :** retaper le wordmark ORIVO dans une police (c'est une image), ou toucher à l'anneau.
- **Non :** les clichés « gamer » : arc-en-ciel RGB, éclairs, chrome biseauté, capitales qui crient.
- **Non :** Dim ou Violet pour un texte qu'il faut lire pour agir : ils passent sous 4,5:1 sur le vide.
- **Non :** publier soi-même. Posts, broadcasts Resend et déploiements se valident par le propriétaire.
