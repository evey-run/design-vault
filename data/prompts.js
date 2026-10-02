window.DATA = window.DATA || {};
DATA.prompts = [
  {
    name: "Générer un design system complet",
    use: "Début de projet",
    tags: ["design-system","tokens","demarrage"],
    desc: "Fait sortir un système cohérent avant d écrire une ligne de HTML.",
    body: `Avant de coder, propose-moi un design system pour ce projet : [DÉCRIRE LE PRODUIT ET LA CIBLE].
Donne-moi, dans cet ordre :
1. Direction en 3 adjectifs + 2 contre-exemples (ce que le site ne doit pas évoquer)
2. Couleurs : 5 valeurs maximum avec rôle précis (fond, surface, bordure, texte, texte secondaire) + 1 accent, en hex, avec les contrastes WCAG vérifiés
3. Typographie : 2 polices maximum (titres / texte), échelle modulaire en rem, graisses utilisées, interlignes
4. Espacement : échelle 4/8px, rythme vertical des sections
5. Rayons, bordures, ombres (ou leur absence assumée)
6. Motion : durées, courbes, ce qui est animé et ce qui ne l est jamais
7. Les tokens CSS correspondants dans :root
Attends ma validation avant d écrire le site.`
  },
  {
    name: "Audit anti-template",
    use: "Relecture de maquette ou de page",
    tags: ["audit","qualite","anti-slop"],
    desc: "Débusque tout ce qui fait sentir le site généré.",
    body: `Audite cette page et liste ce qui la fait ressembler à un template généré. Cherche précisément :
- dégradé violet/bleu, ombres molles partout, border-radius identique sur tout
- hero centré génerique avec un titre en 3 lignes vagues
- emojis en guise d icônes, icônes de styles différents
- textes creux (révolutionnez, sans effort, nouvelle génération)
- cartes toutes identiques sans hiérarchie, 3 colonnes par réflexe
- espacements inégaux, alignements flottants, rythme vertical cassé
- animations d entrée sur tout, aucune sur rien
Pour chaque problème : fichier, ligne, correction concrète. Classe par impact visuel décroissant. N invente pas de problème s il n y en a pas.`
  },
  {
    name: "Maquette / capture vers code",
    use: "À partir d une image",
    tags: ["image","integration","fidelite"],
    desc: "Force l analyse avant l implémentation, sinon le rendu dérive.",
    body: `Voici une référence visuelle. Avant de coder :
1. Décris ce que tu vois : grille, largeurs, espacements en px, tailles de police, graisses, couleurs relevées en hex, ratios d images
2. Liste les composants réutilisables que tu identifies
3. Signale ce que l image ne montre pas (états hover, mobile, contenus longs) et dis quelle décision tu prends
Ensuite, implémente en HTML/CSS au plus proche. Pas de librairie. Pas d approximation sur les espacements : reprends les valeurs relevées. À la fin, liste les écarts volontaires.`
  },
  {
    name: "Passe responsive",
    use: "Après l intégration desktop",
    tags: ["responsive","mobile","relecture"],
    desc: "Passe systématique sur les trois largeurs qui comptent.",
    body: `Vérifie et corrige cette page en 375px, 768px et 1440px.
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
  }
];
