---
version: alpha
name: Nom du projet
description: "Une phrase : ce que le design doit faire ressentir, et à qui."
colors:
  primary: "{colors.text}"
  background: "#FFFFFF"
  surface: "#F5F5F4"
  border: "#E2E0DC"
  text: "#1C1B1A"
  text-muted: "#5E5B57"
typography:
  display:
    fontFamily: Police des titres
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline:
    fontFamily: Police des titres
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.01em
  body:
    fontFamily: Police du texte
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0px
  caption:
    fontFamily: Police du texte
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0px
rounded:
  sm: 4px
  md: 8px
spacing:
  base: 8px
  section: 96px
  section-mobile: 56px
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
  text-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-muted}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: 12px
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
---

# Nom du projet

Modèle de DESIGN.md du Design Vault, au format de Google (version alpha). Copie ce dossier en `projects/<projet>/`, remplace chaque valeur par celle du code ou de la marque, puis lance `node tools/build.mjs` et `node tools/check.mjs`. Une valeur déduite plutôt que lue dans le code se marque [À VÉRIFIER]. Les valeurs ci-dessus ne sont qu'un exemple valide : elles passent le linter, elles ne disent rien du projet.

## Overview

Le sujet, le public et le travail principal de l'interface. Ce qu'elle doit faire ressentir : dense ou aérée, sérieuse ou joueuse. Ce que le projet ne doit pas évoquer. Et l'élément mémorable, un seul : tout le reste reste calme autour.

## Colors

Une ligne par couleur, au format de la spec, avec son rôle et sa raison :

- **Background (#FFFFFF):** fond de page.
- **Surface (#F5F5F4):** cartes et panneaux.
- **Border (#E2E0DC):** filets et bordures.
- **Text (#1C1B1A):** texte principal ; c'est aussi `primary` tant qu'il n'y a pas d'accent.
- **Text muted (#5E5B57):** texte secondaire (6,75:1 sur Background).

## Typography

Les familles et leurs rôles (display, headline, body, caption), l'échelle, les graisses, les interlignes. Une ou deux familles ; si deux, nettement différentes. Des lignes de moins de 80 caractères.

## Layout

Grille ou marges, largeur maximale, échelle d'espacement, rythme vertical des sections, comportement en mobile.

## Elevation & Depth

Comment la hiérarchie se lit : quelles ombres et combien de niveaux, ou leur absence assumée (bordures, aplats de couleur).

## Shapes

Les rayons et quand s'en servir. Un seul rayon sur tout, quelle que soit la hiérarchie, est un réflexe plutôt qu'un choix.

## Components

Où vivent les vrais composants (chemins dans le repo, Storybook, Figma) et quand se servir de chacun. Ne pas recopier leur code ici : il dériverait.

## Do's and Don'ts

- **Oui :** une règle concrète, vérifiable sur une capture.
- **Non :** ce qu'un agent ferait par défaut et qu'il ne faut pas faire ici.
