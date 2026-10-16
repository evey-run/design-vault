# Orivo : journal des décisions

Les règles vivent dans [DESIGN.md](DESIGN.md) ; ici, ce qui a été décidé, pourquoi, et ce qui reste à trancher.

## 2026-10-16 — Le design system passe en DESIGN.md

- Il quitte `data/ds.js` pour `DESIGN.md`. Dim (#76717E), présent dans le renderer et dans `visual.md` mais absent de l'ancienne page, est ajouté.
- La typographie est en px au format `x` (1 vmin = 9 px) : la spec n'accepte que px, em et rem. Le renderer reste en vmin.
- Les niveaux typographiques gardent les noms recommandés par la spec (`headline-*`, `body-lg`, `label-*`) plutôt que display, headline, body, caption : le rôle de légende est tenu par `label-md`, le kicker.
- La section « Motion » devient la sous-section « Vidéos et GIF » de Components : la spec n'a pas de section pour le mouvement.
- Le catalogue des composants (code et rendu de référence de chacun) est dans `components/README.md`.

## Questions ouvertes

- **Dim pour les mentions légales :** 4,15:1 sur Void et 4,01:1 sur le pied des mails (#101012), sous l'AA (4,5:1) pour du texte de 12 px. Passer les mentions en Ash (6,88:1), ou éclaircir Dim en #7F7987 (4,67:1 sur Void, 4,51:1 sur le pied) ?
- **Frost sur Violet :** 3,43:1. Bon pour un grand texte ou une icône, pas pour un libellé de 15 px.
- **Teintes des mails hors palette** (`~/repos/orivo-site/emails/build.py`) : BODY #E4E1EA au lieu de #C8C5CF, VIOLET_LIGHT #A98CFF, PANEL #1D1C21, FOOT #101012, INK #16121F, #26252C et #3A2F66. Les ajouter au DESIGN.md comme tokens de mail, ou aligner les mails.
- **Virgule du slogan :** la signature des mails et la vignette du rail d'`overview.jpg` écrivent « All your games, in one place. » ; le slogan s'écrit sans virgule.
- **Le skill orivo-comms n'est pas versionné** (`~/.claude/skills/orivo-comms` n'est pas un dépôt git). Le ranger dans un dépôt, privé de préférence, relié par un lien symbolique.
