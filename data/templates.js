window.DATA = window.DATA || {};
DATA.templates = [
  {
    name: "SaaS Landing - hero centré",
    type: "Landing page",
    stack: "HTML + Tailwind",
    wire: ["nav","hero","grid3","text","band","footer"],
    tags: ["saas","landing","b2b","conversion"],
    sections: ["Nav","Hero + CTA","Logos clients","3 bénéfices","Démo produit","Pricing","FAQ","CTA final"],
    desc: "Structure classique qui convertit : promesse courte, preuve sociale immédiate, bénéfices avant features.",
    prompt: `Crée une landing page SaaS en HTML + Tailwind, une seule page, mobile first.
Structure dans cet ordre :
1. Nav sticky, logo à gauche, 3 liens, 1 bouton CTA à droite
2. Hero centré : titre 2 lignes max (bénéfice, pas la feature), sous-titre 1 phrase, 1 CTA primaire + 1 secondaire
3. Bande de logos clients en niveaux de gris
4. 3 cartes bénéfices (icône, titre court, 2 lignes)
5. Capture produit large avec légende
6. Pricing 3 colonnes, celle du milieu mise en avant
7. FAQ en accordéon
8. CTA final pleine largeur
Contraintes : max 2 polices, 1 couleur d accent, espacement vertical généreux (96px desktop / 56px mobile), pas de dégradé violet, pas d emoji.`,
    notes: "Garder le hero sous 90 mots. Le CTA doit répéter le bénéfice, pas dire Envoyer."
  },
  {
    name: "Portfolio éditorial",
    type: "Portfolio",
    stack: "HTML/CSS",
    wire: ["nav","split","grid2","text","footer"],
    tags: ["portfolio","editorial","perso","typo"],
    sections: ["Intro texte","Projets en grille","À propos","Contact"],
    desc: "Typo forte, peu de couleur, grosses images. Le contenu fait le design.",
    prompt: `Crée un portfolio éditorial en HTML/CSS pur, sans framework.
Direction : typographie dominante (serif pour les titres, sans pour le texte), fond off-white, texte presque noir, une seule couleur d accent discrète.
Structure : nom + une phrase de positionnement en haut, liste de 6 projets (image 4:3, titre, année, rôle, 1 ligne), section à propos sur 2 colonnes, contact en pied de page.
Contraintes : grille 12 colonnes, max 72 caractères par ligne de texte, hover minimal (soulignement ou léger déplacement), aucune animation d entrée.`,
    notes: "Marche mieux avec 4 à 8 projets. Au delà, ajouter un filtre par type."
  },
  {
    name: "Docs / base de connaissances",
    type: "Documentation",
    stack: "HTML + sidebar",
    wire: ["nav","sidebar","list","footer"],
    tags: ["docs","sidebar","technique"],
    sections: ["Recherche","Sommaire latéral","Contenu","Sommaire de page"],
    desc: "Sidebar gauche navigable, contenu au centre, ancres à droite. Lisibilité avant tout.",
    prompt: `Crée un layout de documentation en HTML/CSS.
3 colonnes : sidebar gauche (sections pliables, item actif marqué), contenu central (largeur max 720px), colonne droite avec les ancres de la page.
Ajoute une barre de recherche en haut, un fil d Ariane, des blocs de code avec bouton copier, des encarts note/avertissement.
Responsive : sidebar en menu burger sous 900px, colonne d ancres masquée.
Contraintes : interligne 1.65, titres h2 avec séparateur fin, pas de couleur hors liens et encarts.`
  },
  {
    name: "Dashboard admin",
    type: "App",
    stack: "React / HTML",
    wire: ["nav","sidebar","grid4","band","footer"],
    tags: ["dashboard","app","data","interne"],
    sections: ["Sidebar","4 KPI","Graphique principal","Tableau","Panneau latéral"],
    desc: "Densité d information maîtrisée : KPI en haut, un seul graphique dominant, tableau filtrable.",
    prompt: `Crée un dashboard admin.
Layout : sidebar fixe à gauche (icône + label), header avec titre de page + sélecteur de période + avatar, puis une rangée de 4 cartes KPI (valeur, variation, sparkline), un graphique principal large, un tableau paginable avec recherche et filtres.
États à prévoir : chargement (skeleton), vide, erreur.
Contraintes : 1 seule couleur d accent, le rouge et le vert servent uniquement aux variations, chiffres en tabular-nums, pas d ombre portée sur les cartes (bordure fine à la place).`
  },
  {
    name: "Page produit e-commerce",
    type: "E-commerce",
    stack: "HTML + Tailwind",
    wire: ["nav","split","grid4","text","footer"],
    tags: ["ecommerce","produit","conversion"],
    sections: ["Galerie","Infos + achat","Détails","Produits liés","Avis"],
    desc: "Galerie à gauche, bloc achat collant à droite, le reste en dessous.",
    prompt: `Crée une page produit e-commerce.
Haut de page en 2 colonnes : galerie (image principale + miniatures verticales) à gauche, à droite bloc achat collant avec titre, prix, sélecteur de variante, quantité, bouton ajouter au panier, réassurance (livraison, retours, paiement).
En dessous : description en onglets (Détails / Composition / Livraison), 4 produits liés, avis clients avec note moyenne.
Contraintes : le prix et le bouton toujours visibles au scroll desktop, barre d achat fixe en bas sur mobile, aucune promo clignotante.`
  },
  {
    name: "Blog / magazine",
    type: "Contenu",
    stack: "HTML/CSS",
    wire: ["nav","hero","grid3","grid3","footer"],
    tags: ["blog","contenu","editorial"],
    sections: ["Article vedette","Grille d articles","Catégories","Newsletter"],
    desc: "Un article mis en avant, puis grille régulière. Hiérarchie par la taille, pas par la couleur.",
    prompt: `Crée une page d accueil de blog.
1 article vedette en pleine largeur (image, catégorie, titre large, chapô, auteur + date), puis une grille de 6 articles en 3 colonnes (image 16:9, catégorie, titre, date, temps de lecture), une rangée de catégories cliquables, un bloc newsletter sobre en pied de page.
Contraintes : 2 niveaux de titre maximum dans la grille, dates en gris, images toujours au même ratio, pas de carrousel.`
  },
  {
    name: "Page de capture (waitlist)",
    type: "Landing page",
    stack: "HTML une page",
    wire: ["hero","text","footer"],
    tags: ["waitlist","lancement","minimal","email"],
    sections: ["Promesse","Formulaire","Preuve"],
    desc: "Une seule action possible : laisser son email. Tout le reste est du bruit.",
    prompt: `Crée une page de capture d emails, une seule vue sans scroll sur desktop.
Contenu : logo discret, titre de 8 mots maximum, une phrase d explication, un champ email + bouton sur la même ligne, une ligne de preuve sociale (nombre d inscrits), un lien vers les mentions légales.
États du formulaire : vide, erreur, envoi, succès (message qui remplace le formulaire).
Contraintes : aucun lien de navigation, un seul bouton sur la page, centrage vertical, fond uni.`
  },
  {
    name: "Site vitrine local",
    type: "Vitrine",
    stack: "HTML/CSS",
    wire: ["nav","hero","grid3","split","band","footer"],
    tags: ["vitrine","local","services","contact"],
    sections: ["Hero","Services","À propos","Avis","Horaires + carte","Contact"],
    desc: "Pour un commerce ou un artisan : ce qu il fait, où il est, comment le joindre.",
    prompt: `Crée un site vitrine une page pour un commerce local.
Sections : hero avec photo du lieu + nom + une phrase + bouton appeler, 3 services (titre, prix indicatif, description courte), à propos avec photo de l équipe, 3 avis clients, bloc horaires + carte, formulaire de contact simple (nom, téléphone, message).
Contraintes : téléphone cliquable partout, adresse en texte sélectionnable, gros boutons tactiles (min 44px), chargement rapide (pas de librairie externe).`
  },
  {
    name: "Comparatif / pricing dense",
    type: "Section",
    stack: "HTML + table",
    wire: ["nav","grid3","list","text","footer"],
    tags: ["pricing","tableau","comparatif"],
    desc: "Trois offres en cartes, puis tableau de comparaison détaillé en dessous.",
    prompt: `Crée une page tarifs.
Haut : 3 cartes d offres (nom, prix, à qui ça s adresse, 5 points inclus, CTA), celle du milieu recommandée avec une étiquette. Bascule mensuel/annuel avec réduction affichée.
Bas : tableau de comparaison complet, lignes groupées par catégorie, en tête collant au scroll, coches et tirets plutôt que du texte.
Contraintes : jamais plus de 3 offres visibles, prix en gros, mention taxes, pas de prix barré factice.`
  },
  {
    name: "Présentation d app mobile",
    type: "Landing page",
    stack: "HTML + Tailwind",
    wire: ["nav","split","grid3","band","footer"],
    tags: ["mobile","app","store","landing"],
    desc: "Mockups de téléphone alternés gauche/droite, une idée par écran.",
    prompt: `Crée une landing page de présentation d application mobile.
Hero en 2 colonnes : texte à gauche (titre, sous-titre, badges App Store et Google Play), mockup téléphone à droite.
Puis 3 sections fonctionnalités en alternance gauche/droite (capture + titre + 2 lignes), une bande de chiffres (téléchargements, note moyenne), un pied de page avec liens légaux.
Contraintes : une seule idée par section, captures toujours dans le même cadre de téléphone, pas de parallaxe.`
  },
  {
    name: "Page À propos / équipe",
    type: "Page interne",
    stack: "HTML/CSS",
    wire: ["nav","text","grid4","split","footer"],
    tags: ["about","equipe","narratif"],
    desc: "Raconter le pourquoi, pas lister les métiers. Photos homogènes.",
    prompt: `Crée une page À propos.
Structure : titre + manifeste en 3 paragraphes larges, une image pleine largeur, timeline des étapes clés, grille de l équipe (photo carrée, nom, rôle, une ligne), valeurs en 3 colonnes, CTA recrutement.
Contraintes : photos recadrées au même format et même traitement, texte à la première personne du pluriel, pas de citation inventée.`
  },
  {
    name: "Mono-page scroll narratif",
    type: "Expérience",
    stack: "HTML + CSS scroll",
    wire: ["hero","band","band","text","footer"],
    tags: ["scroll","narratif","creatif","motion"],
    desc: "Une histoire en sections plein écran, chaque section = une affirmation.",
    prompt: `Crée une page mono-scroll narrative, sections de 100vh.
Chaque section : une phrase courte très grande, un visuel ou une couleur de fond différente, apparition au scroll (opacité + 12px de translation, 400ms).
Ajoute un indicateur de progression discret à droite et un bouton qui ramène en haut.
Contraintes : prefers-reduced-motion respecté (animations désactivées), navigation clavier possible, contenu lisible sans JavaScript.`
  }
];
