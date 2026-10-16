# Journal des décisions du vault

Une entrée par décision, la plus récente en haut : la décision, pourquoi, et ce qui a été abandonné. Les décisions propres à un projet vont dans `projects/<projet>/decisions.md`.

## 2026-10-16 — Le vault devient lisible et vérifiable par les agents

Appliqué depuis la recherche « Construire un vault design fiable pour sites web et agents IA » (recommandations d'Anthropic, d'OpenAI et de Google).

- **Un DESIGN.md par projet, source de vérité.** Format ouvert de Google (alpha) : tokens en YAML, prose qui dit pourquoi. Les tokens W3C (2025.10), la copie lue par le site et le README des références en sont générés par `tools/build.mjs`. Pourquoi : une seule place où écrire une valeur, dans les formats que lisent agents et outils, sans build pour le site.
- **Les composants restent dans leur code** (renderer d'orivo-comms, mails d'orivo-site) et le DESIGN.md pointe vers eux : des copies dans le vault dériveraient.
- **Vérification automatique.** `tools/check.mjs`, sans dépendance, reprend les règles du linter officiel (mêmes résultats sur le DESIGN.md d'Orivo) et ajoute celles du vault : chaque couleur expliquée, couples texte/fond des palettes, systèmes exportés en DESIGN.md, contrastes de l'interface, fichiers générés à jour. La CI y ajoute le lint et le diff officiels (`@google/design.md` 0.4.0, épinglé car le format est en alpha).
- **Export W3C maison plutôt qu'officiel :** celui de `@google/design.md` 0.4.0 perd le `lineHeight` et garde des `em` que le format W3C n'accepte pas. Celui du vault convertit les `em` en px et garde les alias.
- **Les défauts IA sont signalés, pas supprimés** (champ `defaut`) : ils restent bons quand un brief les demande.
- **Contrastes corrigés :** texte secondaire de l'interface (#777 → #6E6E6E, de 4,48 à 5,10:1), de « Minimal éditorial » et « Encre & papier » (#8C8984 → #73716D), de « Gris chauds » (#A8A4A0 → #716F6C) ; consignes d'usage revues pour Terre brûlée, Bleu nuit, Pastel, Rétro, Menthe, Violet nuit et Rouge éditorial.

## 2026-10-02 — Retrait des extraits CSS des éléments

Abandonné : les extraits CSS générés pour chaque élément n'apportaient pas assez. Le prompt de reproduction reste.
