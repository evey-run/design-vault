# Tribos : journal des décisions

Les règles vivent dans [DESIGN.md](DESIGN.md) ; ici, ce qui a été décidé, pourquoi, et ce qui reste à trancher.

## 2026-10-16 — Premier DESIGN.md, extrait de l'app et du site

- **Les tokens sont ceux de l'app, en thème clair.** C'est le produit ; `docs/brand/README.md` dit qu'`AppTheme.primary` fait foi pour l'interface, et les mails et les fiches store parlent le même langage clair. Le site, sombre et verrouillé, est décrit dans Colors avec ses propres variables.
- **Constaté dans les dépôts :** un seul orange, `#F3730A`, dans l'app, le site, les mails et le store ; le site sans mode clair, où le blanc sur l'orange est interdit (une surface orange porte `#221000`) ; l'app en `ThemeMode.light` seulement ; un seul preset de direction artistique par support, l'ancien loup hors charte ; le style de l'app et celui du site libres de diverger, seul le contrat (données, confidentialité, fiche store) étant couplé (skill `tribos-site-sync`).
- La typographie est en px : les tailles d'`AppTheme` sont des pixels logiques Flutter. `AppTheme` ne fixe aucun interlettrage, d'où 0 dans les tokens.

## Questions ouvertes

- **Blanc sur l'orange, 2,89:1** (sous 4,5:1, et sous 3:1 même en grand) : boutons principaux, icône de l'onglet actif, bandeau Points ×2, flèche de la séance du jour, en-tête et bouton des mails, couvertures store. Prendre le `#221000` du site (6,36:1), ou un orange plus sombre sous les textes (`#C2410C` fait 5,18:1 avec le blanc) ?
- **Orange en texte sur le blanc, 2,89:1 :** boutons contour, « continue ! » de la série, rangs du classement. Même question, dans l'autre sens.
- **Bleu sous l'AA :** blanc sur `#4499F2` (2,96:1) dans le bandeau Défi ; `#2385EA` sur le blanc (3,74:1) pour le pourcentage et le libellé de la carte Séances. Le site, lui, assombrit en `#1F74C9` (4,77:1).
- **Autres textes sous 4,5:1 :** `text-light` dans la mention de modération (2,54:1, en 10 px) ; `text-muted` sur `surface-variant` dans l'étiquette « Bloqué » (4,39:1) ; `#777777` sur le blanc dans le bandeau des premiers pas (4,48:1) ; textes destructifs en `#EF4444` (3,76:1) ; SnackBars de succès sur `#68DB56` (vers 1,8:1) ; pied des mails `#8A8577` sur crème (3,39:1).
- **Valeurs en double :** `background` et `surface`, `surfaceVariant` et `divider` ; le filet `#E5E5E5` codé en dur à côté de `border` `#E5E7EB` ; trois gris secondaires (`#6B7280` dans l'app, `#5E6A72` dans les mails et l'App Store, `#777777`) ; deux verts de succès (`#68DB56`, `#58CC02`) plus `Colors.green` ; quatre beiges clairs à côté de `primary-light` (`#FDF4EA` des mails et du store, `#FFF0DC` de la charte, `#FEF3E2` et `#FDEBDC` en dur dans l'app) ; rayons de 16, 15 et 20 px pour les cartes, de 12, 14 et 8 px pour les boutons.
- **L'ancien orange `#F38B22`** reste dans le splash Flutter, le splash natif d'Android 12, l'onboarding, la connexion, l'inscription et la confirmation d'e-mail, et `FIGMA.md` le donne encore pour `primary`. Le splash natif iOS est en `#F3730A` : saut de teinte au passage vers le splash Flutter [À VÉRIFIER sur un appareil].
- **Code mort ou trompeur :** `primaryDark` (`#F2960D`) est plus clair que `primary` ; `AppButton`, `ProgressRing`, `AppFilterChip` (sélection en `Colors.orange`), `AppSearchBar`, `MiniCard` et `GroupsEmptyCard` n'ont aucun appelant, les boutons se stylent écran par écran. Les brancher ou les retirer ?
- **L'ancien loup** (`assets/mascotte/loup.png`), hors charte, reste dans `DailySessionCard` et `SocialInvitationCard`, donc dans les captures store et sur la carte sociale du site.
- **App et site :** les recréations `.appui` du site prennent `#111827` pour l'encre (l'ancien `textDark`), `#2563EB` et `#1F74C9` pour le bleu et Geist pour le texte ; l'app est en `#2C3A43`, `#4499F2`, Montserrat et Roboto. Et la marque a deux polices de titre, Montserrat (app, store) et Bricolage Grotesque (site) : garder les deux voix, ou en choisir une ?
