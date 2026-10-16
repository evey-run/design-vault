window.DATA = window.DATA || {};
DATA.prompts = [
  {
    name: "Générer un design system (DESIGN.md)",
    use: "Début de projet",
    tags: ["design-system","design-md","tokens","demarrage"],
    desc: "Le système avant le HTML, au format que les agents savent lire et que le linter sait vérifier.",
    body: `Avant de coder, écris le design system de ce projet au format DESIGN.md (spec ouverte de Google : https://github.com/google-labs-code/design.md/blob/main/docs/spec.md). Projet : [DÉCRIRE LE PRODUIT, LA CIBLE ET LE TRAVAIL DE LA PAGE, AVEC DU VRAI CONTENU].

En tête du fichier, un bloc YAML entre deux lignes --- :
- colors : 4 à 6 couleurs nommées, en hex entre guillemets, dont au moins primary, et les rôles de base : fond, surface, texte principal, texte secondaire, accent
- typography : les rôles display, headline, body et caption, chacun avec fontFamily, fontSize, fontWeight, lineHeight et letterSpacing
- rounded et spacing : des échelles courtes et nommées
- components : bouton primaire, carte, champ, texte secondaire, avec backgroundColor et textColor en références ("{colors.primary}") pour que les contrastes soient vérifiables

En dessous, les sections ## dans cet ordre exact : Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts. Chaque valeur a sa raison : une ligne « - **Nom (#HEX):** rôle et pourquoi » par couleur.

Puis relis ton système contre le brief. Tout ce qui ressemble au choix que tu ferais pour n'importe quel projet voisin, remplace-le et dis pourquoi : fond crème et accent terracotta, fond presque noir et un seul accent vert acide, filets fins et rayons à zéro, cartes arrondies identiques sous la même ombre douce, sur-titres en capitales partout, « → » sur chaque bouton. Donne les ratios de contraste des couples texte/fond (AA : 4,5:1).
Termine par la commande qui le vérifie : npx @google/design.md lint DESIGN.md. Attends ma validation avant d'écrire le site.`
  },
  {
    name: "Planifier puis critiquer",
    use: "Avant d'écrire le moindre code",
    tags: ["plan","critique","demarrage","anti-slop"],
    desc: "La méthode du skill frontend-design d'Anthropic : un plan court, revu contre les défauts, avant le code.",
    body: `Ne code pas encore. Travaille en deux passes.

Passe 1, le plan :
- Sujet : ce qu'est le produit, pour qui, et le travail principal de la page. Si le brief ne le dit pas, propose-le et demande-moi de confirmer.
- Couleurs : 4 à 6 valeurs hex nommées, avec leur rôle.
- Typographie : une ou deux familles et leur rôle ; si deux, nettement différentes.
- Mise en page : le concept en une phrase et un wireframe ASCII ; l'alignement (gauche, centré, justifié).
- Principes : ce qui rend cette page unique, et l'élément mémorable : un seul.

Passe 2, la critique : compare le plan au brief et au DESIGN.md du projet s'il existe. Chaque partie qui ressemble à ce que tu produirais pour n'importe quelle page du même genre, remplace-la, et dis ce que tu as changé et pourquoi. Les défauts à reconnaître :
- fond crème (près de #F4F1EA), serif de titre très contrastée, accent terracotta
- fond presque noir avec un seul accent vert acide ou vermillon
- mise en page de journal : filets fins, rayons à zéro, colonnes denses
- le kit SaaS : cartes arrondies identiques, un seul rayon partout, la même ombre douce sous chacune, dégradés décoratifs
- le décor de gabarit : un sur-titre en capitales espacées au-dessus de chaque titre, des métadonnées « A · B · C », des labels « MOT — fragment », un quasi-noir (#111) à la place du noir, une police mono pour les petits labels, « → » ajouté aux liens et aux boutons
Si le brief demande explicitement l'un de ces looks, suis le brief.

Montre-moi le plan révisé et attends mon accord avant de coder.`
  },
  {
    name: "Extraire le DESIGN.md d'un repo",
    use: "Projet qui a déjà du code",
    tags: ["design-system","design-md","extraction","tokens"],
    desc: "Remplit le vault à partir du code réel, au lieu de réinventer le système.",
    body: `Lis ce repo et écris son DESIGN.md au format de Google (https://github.com/google-labs-code/design.md/blob/main/docs/spec.md), dans ~/repos/design-vault/projects/[PROJET]/DESIGN.md. Pars du modèle projects/_template/DESIGN.md.
Sources : variables CSS, thème Tailwind ou équivalent, polices chargées, composants de base (boutons, cartes, champs, navigation), captures existantes.
Règles :
- les valeurs viennent du code, jamais d'une supposition ; une valeur déduite se marque [À VÉRIFIER]
- front matter : colors (dont primary), typography, rounded, spacing, components avec backgroundColor et textColor en références, pour que les contrastes soient vérifiés
- sections ## dans l'ordre : Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts
- une ligne « - **Nom (#HEX):** rôle et pourquoi » par couleur
- la section Components pointe vers les fichiers des vrais composants au lieu de recopier leur code
Ensuite, dans le vault : node tools/build.mjs puis node tools/check.mjs. Corrige ce qu'ils signalent et liste les questions ouvertes (contrastes sous 4,5:1, valeurs en double, couleurs sans rôle).`
  },
  {
    name: "Projet existant : garder son langage",
    use: "Modifier un site qui a déjà un style",
    tags: ["existant","coherence","tokens","design-system"],
    desc: "Les règles générales cèdent devant le système en place, comme le demande le guide d'OpenAI.",
    body: `Ce projet a déjà un langage visuel. Avant de toucher au design :
1. Lis son DESIGN.md (ou, à défaut, ses tokens, son CSS de base et deux ou trois composants) et résume en cinq lignes les règles que tu vas suivre.
2. Réutilise les composants et les tokens existants. Aucune couleur, taille, ombre ou rayon en dur : s'il manque une valeur, propose un token nommé et dis pourquoi il manque.
3. Les conseils généraux de design, y compris les miens, cèdent devant le système en place.
4. À la fin, liste les écarts que tu as dû faire, avec leur raison, pour que je mette le DESIGN.md à jour.`
  },
  {
    name: "Audit anti-template",
    use: "Relecture de maquette ou de page",
    tags: ["audit","qualite","anti-slop"],
    desc: "Débusque tout ce qui fait sentir le site généré, avec les listes d'Anthropic et d'OpenAI.",
    body: `Audite cette page et liste ce qui la fait ressembler à un template généré. Cherche précisément :
- les looks par défaut : fond crème + serif + accent terracotta ; fond presque noir + un accent vert acide ou vermillon ; filets fins, rayons à zéro et colonnes de journal ; le kit SaaS (cartes arrondies identiques, un seul rayon partout, la même ombre douce, dégradés décoratifs)
- le décor de gabarit : sur-titre en capitales au-dessus de chaque titre, métadonnées « A · B · C », labels « MOT — fragment », #111 à la place du noir, mono pour les petits labels, « → » sur les liens et boutons, numéros 01 / 02 / 03 sur un contenu qui n'est pas une suite
- un seul mot du titre en italique, en gras ou en couleur ; le gros chiffre avec un petit label et un accent en dégradé comme hero
- hero : grille de cartes, pastilles, rangée de stats ou d'icônes, image en encart flottant, logo de la marque réduit à la nav
- cartes là où rien n'est cliquable ; une app faite de cartes empilées ; plusieurs accents qui se disputent
- violet sur blanc ou mode sombre sans raison ; fond d'une seule couleur plate sans sujet visuel
- emojis en guise d'icônes, icônes de styles différents
- textes creux (révolutionnez, sans effort, nouvelle génération), textes de remplissage, commentaires de design laissés dans l'interface
- espacements inégaux, alignements flottants, rythme vertical cassé
- un fondu-glissé à l'entrée de chaque section et un survol animé sur chaque carte
Pour chaque problème : fichier, ligne, correction concrète. Classe par impact visuel décroissant. N'invente pas de problème s'il n'y en a pas, et laisse ce que le brief ou le DESIGN.md demande explicitement.`
  },
  {
    name: "Tests décisifs avant livraison",
    use: "Relecture finale d'une page",
    tags: ["relecture","critique","qualite"],
    desc: "Les « litmus checks » du frontend-skill d'OpenAI : sept questions, un oui ou un non chacune.",
    body: `Relis la page avec ces sept questions. Pour chaque « non », dis ce que tu changes, puis change-le :
1. La marque ou le produit est-il évident dès le premier écran ? Test : sans la navigation, ce premier écran pourrait-il appartenir à une autre marque ?
2. Y a-t-il un point d'ancrage visuel fort, et un seul ?
3. Comprend-on la page en ne lisant que les titres ?
4. Chaque section a-t-elle un seul rôle ?
5. Les cartes sont-elles vraiment nécessaires ? Si on enlève bordure, ombre, fond et rayon sans gêner la lecture ni l'interaction, la carte est en trop.
6. Le mouvement sert-il la hiérarchie ou l'ambiance ?
7. La page paraîtrait-elle encore haut de gamme sans aucune ombre décorative ?`
  },
  {
    name: "Maquette / capture vers code",
    use: "À partir d une image",
    tags: ["image","integration","fidelite","verification"],
    desc: "Force l analyse avant l implémentation, sinon le rendu dérive.",
    body: `Voici une référence visuelle. Avant de coder :
1. Décris ce que tu vois : grille, largeurs, espacements en px, tailles de police, graisses, couleurs relevées en hex, ratios d images
2. Liste les composants réutilisables que tu identifies
3. Signale ce que l image ne montre pas (états hover, mobile, contenus longs) et dis quelle décision tu prends
Ensuite, implémente en HTML/CSS au plus proche. Pas de librairie. Pas d approximation sur les espacements : reprends les valeurs relevées.
Puis capture ton rendu à la même taille que la référence, mets les deux côte à côte, corrige les écarts et recapture, deux tours au moins. À la fin, liste les écarts volontaires.`
  },
  {
    name: "Vérification visuelle (captures)",
    use: "Après chaque changement visible",
    tags: ["verification","playwright","responsive","qualite"],
    desc: "L'agent constate lui-même ses erreurs au lieu de supposer : la boucle que les trois labos mettent en avant.",
    body: `Après chaque changement visible, vérifie le rendu toi-même au lieu de supposer :
1. Lance le site en local, puis capture la page en 390×844, 768×1024 et 1440×900, pleine page : node ~/repos/design-vault/tools/shots.mjs <url> (ou npx playwright screenshot --viewport-size "390,844" --full-page <url> mobile.png).
2. Regarde chaque capture et compare-la aux références du projet (projects/<projet>/references/ dans le vault) ou à la maquette fournie : grille, espacements, tailles de texte, couleurs, hiérarchie.
3. Liste les écarts du plus visible au moins visible, corrige, recapture. Deux tours au moins.
4. Vérifie le plancher de qualité : rien ne déborde à 390 px, focus clavier visible sur toute la page (Tab), prefers-reduced-motion respecté, contrastes AA, aucune valeur en dur hors des tokens.
Rends les captures finales et ce qui a changé entre le premier et le dernier tour.`
  },
  {
    name: "Passe responsive",
    use: "Après l intégration desktop",
    tags: ["responsive","mobile","relecture"],
    desc: "Passe systématique sur les trois largeurs qui comptent.",
    body: `Vérifie et corrige cette page en 375px, 768px et 1440px, sur des captures réelles à chaque largeur (pas de tête).
Points à traiter : débordements horizontaux, textes qui deviennent illisibles (<14px), zones tactiles sous 44px, grilles qui ne retombent pas en une colonne, images qui se déforment, nav qui ne passe pas en burger, sticky qui mange l écran mobile, padding latéral constant de 16px minimum.
Donne-moi les corrections CSS, pas une explication générale. Indique les largeurs où chaque problème apparaissait.`
  },
  {
    name: "Passe accessibilité",
    use: "Avant mise en ligne",
    tags: ["a11y","qualite","wcag"],
    desc: "Le minimum sérieux, sans transformer le site en rapport d audit.",
    body: `Fais une passe accessibilité sur ce code :
- hiérarchie des titres h1 à h3 cohérente, un seul h1
- contrastes texte/fond conformes AA (donne les ratios calculés)
- tous les éléments interactifs atteignables au clavier, focus visible
- labels réels sur les champs, erreurs liées par aria-describedby
- alt pertinents (vide si décoratif)
- landmarks header/nav/main/footer
- prefers-reduced-motion respecté
Corrige directement dans le code et liste ce qui a changé.`
  },
  {
    name: "Micro-copy d interface",
    use: "Textes de boutons, erreurs, états vides",
    tags: ["copywriting","ux","texte"],
    desc: "Les petits textes décident souvent plus que le visuel.",
    body: `Réécris tous les textes d interface de cette page. Règles :
- les boutons décrivent le résultat, pas l action technique (Créer mon compte, pas Envoyer)
- les messages d erreur disent quoi faire, jamais Une erreur est survenue
- les états vides proposent la première action utile
- aucun superlatif, aucun jargon, aucune promesse non vérifiable
- phrases de 12 mots maximum, voix active, vouvoiement constant
Donne-moi un tableau : texte actuel, texte proposé, pourquoi.`
  },
  {
    name: "Recherche de références",
    use: "Avant de commencer le design",
    tags: ["recherche","inspiration","benchmark"],
    desc: "Cadre la direction artistique au lieu de partir au hasard.",
    body: `Je dois concevoir [TYPE DE SITE] pour [CIBLE]. Propose-moi 3 directions artistiques distinctes.
Pour chacune : un nom, 3 adjectifs, les codes visuels (typo, couleurs, densité, imagerie, motion), 2 ou 3 sites réels connus qui l illustrent, à qui elle parle, son risque principal.
Termine par une recommandation argumentée en 3 lignes. Ne mélange pas les directions entre elles.`
  },
  {
    name: "Découpage en sections",
    use: "Structurer une page avant de coder",
    tags: ["structure","plan","contenu"],
    desc: "Décide de l ordre et du rôle de chaque section.",
    body: `Pour [OBJECTIF DE LA PAGE] et [CIBLE], propose le plan de la page section par section.
Pour chaque section : son rôle unique, la question du visiteur à laquelle elle répond, le contenu exact attendu (nombre de mots, type de visuel), la présence ou non d un CTA.
Contraintes : 7 sections maximum, une seule idée par section, le premier écran doit répondre à quoi, pour qui, et après je fais quoi. Donne le plan avant tout code.`
  },
  {
    name: "Passe performance",
    use: "Avant déploiement",
    tags: ["perf","web","optimisation"],
    desc: "Les gains faciles qui comptent vraiment.",
    body: `Optimise le chargement de ce site sans changer le rendu :
- images en largeur/hauteur explicites, formats modernes, loading lazy sauf le hero
- polices : 2 fichiers maximum, font-display swap, preload de la police du titre
- CSS/JS inutilisés supprimés, aucune librairie pour une seule fonction
- pas de layout shift (réserver les dimensions)
- aucune requête bloquante dans le head
Dis-moi ce que tu as changé et l impact attendu sur LCP et CLS.`
  },
  {
    name: "Variantes à comparer",
    use: "Quand une direction ne convainc pas",
    tags: ["iteration","variantes","design"],
    desc: "Trois propositions vraiment différentes, pas trois nuances.",
    body: `Propose 3 variantes de cette section, visuellement distinctes et pas de simples nuances :
A - mise en page conservatrice, hiérarchie classique
B - typographie dominante, visuel réduit au minimum
C - visuel dominant, texte réduit à une phrase
Pour chacune : le code complet et une ligne sur ce qu elle sacrifie. Ne mets pas de lorem ipsum, reprends le contenu réel.`
  },
  {
    name: "Nommage et tokens",
    use: "Mise en ordre d un CSS existant",
    tags: ["refacto","tokens","css"],
    desc: "Remplace les valeurs en dur par un système nommé.",
    body: `Mets de l ordre dans ce CSS :
1. Relève toutes les valeurs en dur (couleurs, tailles, espacements, rayons, durées) et compte les doublons proches
2. Propose une échelle unique pour chaque famille, avec des noms de rôle (--surface, --text-muted) et non de valeur (--gris-clair)
3. Remplace les valeurs en dur par les tokens dans tout le fichier
4. Signale les cas où deux valeurs proches servaient en fait deux rôles différents
Rends le CSS complet, pas un extrait.`
  },
  {
    name: "Checklist avant mise en ligne",
    use: "Dernière relecture",
    tags: ["checklist","livraison","qualite"],
    desc: "Les oublis classiques qui se voient tout de suite en prod.",
    body: `Passe cette checklist sur le site et corrige ce qui manque :
title et meta description par page, favicon, image Open Graph, lang correct, 404 personnalisée, liens morts, formulaires qui envoient vraiment, états hover/focus/disabled sur tous les boutons, textes de remplacement supprimés, console sans erreur, rendu correct sans JavaScript pour le contenu principal, mentions légales et politique de confidentialité présentes.
Rends-moi la liste avec coché / à corriger et les corrections appliquées.`
  },
  {
    name: "Faire vivre le vault",
    use: "Quand un pattern vient d'être validé",
    tags: ["vault","design-md","decisions","design-system"],
    desc: "Le vault reste juste parce qu'on le met à jour juste après chaque décision.",
    body: `Ce pattern vient d'être validé : [DÉCRIRE LE PATTERN ET LE PROJET]. Mets le Design Vault à jour (~/repos/design-vault) :
1. Ajoute-le au DESIGN.md du projet, dans la bonne section, avec sa raison ; ses valeurs vont dans le front matter si ce sont des tokens.
2. Note la décision dans projects/[PROJET]/decisions.md : date, décision, pourquoi, et ce qui a été essayé puis abandonné.
3. Si une capture du rendu sert désormais de référence, range-la dans projects/[PROJET]/references/ et décris-la dans data/ds.js (galerie : ce qui marche et pourquoi).
4. Lance node tools/build.mjs puis node tools/check.mjs, et corrige jusqu'à zéro erreur.`
  }
];
