---
name: design-vault
description: Méthode de design front d'Evey, adaptée du skill frontend-design d'Anthropic et du frontend-skill d'OpenAI. Charge le DESIGN.md du projet depuis le Design Vault (~/repos/design-vault), planifie puis critique contre les défauts des pages générées, construit avec les seuls tokens, vérifie par captures, consigne les décisions. À utiliser pour toute page, landing, interface ou visuel d'Orivo, Tribos, Findy ou Evey, et pour tout nouveau site.
---

# Design Vault

Le vault est `~/repos/design-vault` ; son `AGENTS.md` en décrit la structure. Ce skill dit comment travailler.

## 1. Charger le système

- Projet du vault : lis `projects/<projet>/DESIGN.md`. Les tokens sont normatifs, la prose dit pourquoi. Le brief et le DESIGN.md l'emportent sur tout ce qui suit.
- Projet existant sans DESIGN.md : lis ses tokens, son CSS de base et deux ou trois composants, et garde son langage. Propose d'en extraire le DESIGN.md à partir de `projects/_template/`.
- Nouveau projet : écris d'abord son DESIGN.md (prompt « Générer un design system (DESIGN.md) » du vault).

## 2. Planifier, puis critiquer

Un plan court : le sujet et son public, 4 à 6 couleurs hex nommées, une ou deux familles et leurs rôles, la mise en page en une phrase et un wireframe ASCII, l'élément mémorable (un seul). Puis relis-le : ce qui ressemble à ce que tu ferais pour n'importe quel projet voisin, remplace-le et dis pourquoi.

Les défauts à reconnaître, légitimes quand le brief les demande, jamais par réflexe :

- fond crème, serif de titre très contrastée, accent terracotta ;
- fond presque noir et un seul accent vert acide ou vermillon ;
- mise en page de journal : filets fins, rayons à zéro, colonnes denses ;
- le kit SaaS : cartes arrondies identiques, un seul rayon, la même ombre douce, dégradés décoratifs, grille de cartes en première impression ;
- le décor de gabarit : sur-titre en capitales au-dessus de chaque titre, « A · B · C », « MOT — fragment », #111 pour le noir, mono pour les petits labels, « → » sur chaque lien ou bouton, 01 / 02 / 03 sur ce qui n'est pas une suite ;
- un seul mot du titre en couleur ou en italique ; le gros chiffre et son petit label en hero ;
- violet par défaut, mode sombre sans raison, fond plat sans sujet visuel ;
- un fondu-glissé sur chaque section, un survol animé sur chaque carte.

## 3. Construire

- Uniquement les tokens et les composants du projet, aucune valeur en dur : `node ~/repos/design-vault/tools/hardcoded.mjs <repo> --project <projet>` liste les couleurs qui y échappent.
- Du vrai contenu : jamais de lorem ipsum ni de commentaire de design dans l'interface.
- Une section, un rôle, un titre. Une carte n'existe que si elle contient une interaction.
- L'audace à un seul endroit ; tout le reste calme.
- Le plancher de qualité, sans l'annoncer : responsive jusqu'à 390 px, focus clavier visible, prefers-reduced-motion respecté, contrastes AA (4,5:1).

## 4. Vérifier

- `node ~/repos/design-vault/tools/shots.mjs <url> --project <projet>` ; regarde les captures, compare-les aux références, corrige, recapture. Deux tours au moins. Une fois une page validée, `--compare <dossier>` mesure ce qui a bougé depuis.
- Les sept questions d'OpenAI : la marque est-elle évidente au premier écran ? un seul ancrage visuel ? la page se comprend-elle par ses titres ? une section, un rôle ? les cartes sont-elles nécessaires ? le mouvement sert-il ? la page tient-elle sans ombres décoratives ?
- Pour une page simple, un effort de raisonnement bas ou moyen donne souvent un meilleur front (observation d'OpenAI) ; le monter pour un design ambitieux.

## 5. Consigner

Un pattern validé va dans le DESIGN.md du projet, avec une entrée datée dans `projects/<projet>/decisions.md` (ce qui a été essayé puis abandonné compris), et sa capture dans `references/` si elle devient une référence. Puis, dans le vault : `node tools/build.mjs && node tools/check.mjs`.

Sources : skill frontend-design d'Anthropic, « Designing delightful frontends with GPT‑5.4 » d'OpenAI, spec DESIGN.md de Google.
