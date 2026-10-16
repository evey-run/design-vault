# Orivo : composants

Le catalogue des vrais composants de la communication d'Orivo : où vit leur code, et un rendu de référence pour chacun (l'équivalent d'une story). Le code n'est pas recopié ici, il dériverait ; les règles sont dans [DESIGN.md](../DESIGN.md).

| Composant | Code | Rendu de référence |
|---|---|---|
| `title`, carte de texte | `~/.claude/skills/orivo-comms/scripts/templates.mjs`, fonction `title` | [beta-portrait](../references/beta-portrait.jpg), [story](../references/story.jpg) |
| `ring`, l'anneau en objet | même fichier, `ring` | [brand-og](../references/brand-og.jpg), [newsletter-square](../references/newsletter-square.jpg) |
| `perspective`, l'app inclinée | même fichier, `perspective` | [library-x](../references/library-x.jpg), [most-played-og](../references/most-played-og.jpg), [email-hero](../references/email-hero.jpg) |
| `device`, téléphone ou tablette | même fichier, `device` | [beta-x](../references/beta-x.jpg), [beta-reddit](../references/beta-reddit.jpg) |
| `rim`, macro du liseré | même fichier, `rim` | [couch-x](../references/couch-x.jpg) |
| `changelog`, carte de version | même fichier, `changelog` | [release-x](../references/release-x.jpg) |
| `rail`, rail de la bibliothèque | même fichier, `rail` | [rail-x](../references/rail-x.jpg) |
| Base commune (polices, palette, grain, vignettage, kicker, titre, pilule, anneau flou) | même fichier, constante `BASE` | toutes les références |
| Mails Resend (welcome, release, newsletter) | `~/repos/orivo-site/emails/build.py` : `head`, `header`, `hero`, `kicker_title_intro`, `panel`, `button`, `signature`, `footer` | [email-hero](../references/email-hero.jpg) pour le héros |
| Carrousel (série de slides) | `~/.claude/skills/orivo-comms/examples/campaign.json` | [carousel](../references/carousel.jpg) |

Pour vérifier qu'un rendu suit encore la référence : `node tools/shots.mjs <page> --compare <dossier-de-référence>` pour une page, ou un regard côte à côte pour un visuel. Pour repérer les couleurs hors palette dans le code : `node tools/hardcoded.mjs ~/repos/orivo-site --project orivo`.
