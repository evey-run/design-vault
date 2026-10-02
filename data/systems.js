window.DATA = window.DATA || {};
DATA.systems = [
  {
    name: "Minimal éditorial",
    mood: "Calme, typographique, intemporel",
    colors: ["#FAFAF8","#EAE8E3","#8C8984","#2B2A28","#111110"],
    tags: ["minimal","editorial","portfolio","contenu"],
    desc: "Le système par défaut quand le contenu doit primer. Difficile à rater.",
    headingFont: "Instrument Serif / Fraunces",
    bodyFont: "Inter / system-ui",
    scale: "14 / 16 / 20 / 28 / 40 / 64 (ratio 1.333)",
    radius: "2px (presque droit)",
    spacing: "Échelle 8px, sections 96px desktop / 56px mobile",
    shadow: "Aucune. Bordure 1px à la place",
    motion: "180ms ease-out, uniquement opacité et 8px de translation",
    prompt: `Utilise ce design system : direction minimale et éditoriale, calme, typographique.
Couleurs : fond #FAFAF8, surface #FFFFFF, bordure #EAE8E3, texte #2B2A28, texte secondaire #8C8984, noir #111110. Aucun accent coloré.
Typo : serif pour les titres (Instrument Serif), sans pour le texte (Inter). Échelle 14/16/20/28/40/64. Interligne 1.2 pour les titres, 1.6 pour le texte, 68 caractères par ligne maximum.
Espacement : multiples de 8, sections de 96px (56px mobile).
Rayons 2px, aucune ombre, bordures 1px.
Motion : 180ms ease-out, opacité et translation de 8px seulement.
Interdits : dégradés, ombres portées, emojis, plus de deux polices, couleur d accent.`,
    css: `:root{
  --bg:#FAFAF8; --surface:#FFFFFF; --border:#EAE8E3;
  --text:#2B2A28; --text-muted:#8C8984; --ink:#111110;
  --font-head:"Instrument Serif",Georgia,serif;
  --font-body:Inter,system-ui,sans-serif;
  --step--1:.875rem; --step-0:1rem; --step-1:1.25rem;
  --step-2:1.75rem; --step-3:2.5rem; --step-4:4rem;
  --sp-1:8px; --sp-2:16px; --sp-3:24px; --sp-4:40px; --sp-5:64px; --sp-6:96px;
  --radius:2px; --dur:180ms; --ease:cubic-bezier(.2,.6,.2,1);
}`,
    rules: `- Un seul h1 par page, titres jamais en majuscules forcées
- Hiérarchie par la taille et l espace, jamais par la couleur
- Images en 4:3 ou 3:2, traitement identique partout
- Liens soulignés dans le contenu
- Jamais plus de 3 tailles de police dans un même écran`
  },
  {
    name: "Dark tech / terminal",
    mood: "Technique, dense, développeur",
    colors: ["#0B0F14","#121821","#1E2733","#9BA7B4","#5BE49B"],
    tags: ["dark","tech","dev","docs","dashboard"],
    desc: "Pour outils dev, docs techniques, dashboards. Monospace assumé.",
    headingFont: "Inter Tight / Geist",
    bodyFont: "Inter + JetBrains Mono pour le code",
    scale: "13 / 15 / 18 / 24 / 32 / 48",
    radius: "6px",
    spacing: "Échelle 4px, dense : sections 64px",
    shadow: "Aucune, séparation par bordure #1E2733",
    motion: "120ms linear, états instantanés",
    prompt: `Utilise ce design system : dark tech, dense, orienté développeur.
Couleurs : fond #0B0F14, surface #121821, bordure #1E2733, texte #E6EAF0, texte secondaire #9BA7B4, accent #5BE49B (actions et succès uniquement).
Typo : Inter pour l interface, JetBrains Mono pour tout code, identifiant, valeur numérique. Échelle 13/15/18/24/32/48.
Espacement serré : échelle 4px, sections 64px, padding de carte 16px.
Rayons 6px, aucune ombre, séparation par bordures.
Motion : 120ms linear, pas d animation d entrée.
Interdits : dégradés décoratifs, illustrations rondes, couleurs vives hors accent, plus d un accent.`,
    css: `:root{
  --bg:#0B0F14; --surface:#121821; --border:#1E2733;
  --text:#E6EAF0; --text-muted:#9BA7B4; --accent:#5BE49B;
  --danger:#FF6B6B; --warn:#FFB84D;
  --font-ui:Inter,system-ui,sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,monospace;
  --radius:6px; --dur:120ms;
}`,
    rules: `- Les chiffres en font-variant-numeric: tabular-nums
- Accent réservé aux actions primaires et aux succès
- Rouge et vert seulement pour les variations et les états
- Tableaux : lignes séparées par bordure, pas de zébrage
- Toujours prévoir les états chargement / vide / erreur`
  },
  {
    name: "Swiss brutalist",
    mood: "Frontal, graphique, assumé",
    colors: ["#FFFFFF","#F2E900","#E2E2E2","#5B5B5B","#000000"],
    tags: ["brutalist","creatif","agence","contraste"],
    desc: "Grille visible, bordures épaisses, type énorme. À réserver aux projets qui peuvent se le permettre.",
    headingFont: "Helvetica Now / Archivo",
    bodyFont: "Helvetica / Arial",
    scale: "14 / 16 / 24 / 48 / 96 (sauts brutaux)",
    radius: "0",
    spacing: "Échelle 8px, pas de respiration superflue, blocs collés",
    shadow: "Aucune. Jamais.",
    motion: "0ms ou 80ms, changements secs",
    prompt: `Utilise ce design system : swiss brutalist, frontal et graphique.
Couleurs : blanc #FFFFFF, noir #000000, jaune #F2E900 en signal, gris #E2E2E2 et #5B5B5B.
Typo : helvetica-like, titres en très grand (jusqu à 96px), majuscules autorisées sur les titres courts, texte à 16px.
Grille visible : bordures noires de 2px, blocs qui se touchent, aucune marge arrondie, rayons à 0.
Aucune ombre, aucune transition longue (80ms maximum).
Le jaune sert de surlignage ou de fond de section, jamais pour du texte.
Interdits : dégradés, ombres, coins arrondis, icônes décoratives, centrage systématique.`,
    css: `:root{
  --bg:#FFFFFF; --ink:#000000; --signal:#F2E900;
  --line:#000000; --gray:#E2E2E2; --muted:#5B5B5B;
  --border-w:2px; --radius:0; --dur:80ms;
}
*{border-color:var(--line)}`,
    rules: `- Tout est aligné sur une grille visible de 12 colonnes
- Les titres cassent la ligne volontairement, pas de text-wrap balance
- Un seul élément jaune par écran
- Les images sont en noir et blanc ou en bichromie
- Les boutons sont des rectangles bordés, pas de remplissage dégradé`
  },
  {
    name: "Soft SaaS",
    mood: "Rassurant, propre, commercial",
    colors: ["#F6F8FC","#FFFFFF","#D7DEEB","#3B6FE0","#16213C"],
    tags: ["saas","b2b","landing","produit"],
    desc: "Le système sûr pour une landing qui doit convertir sans faire peur.",
    headingFont: "Inter Tight / Satoshi",
    bodyFont: "Inter",
    scale: "14 / 16 / 20 / 30 / 44 / 60",
    radius: "10px (cartes) / 8px (boutons)",
    spacing: "Échelle 8px, sections 112px desktop / 64px mobile",
    shadow: "Une seule : 0 1px 2px rgba(16,33,60,.06)",
    motion: "200ms ease-out, hover léger, apparition au scroll discrète",
    prompt: `Utilise ce design system : soft SaaS, propre et rassurant.
Couleurs : fond #F6F8FC, surface #FFFFFF, bordure #D7DEEB, texte #16213C, texte secondaire #5B6B86, accent #3B6FE0.
Typo : Inter partout, titres en graisse 600, texte en 400. Échelle 14/16/20/30/44/60. Interligne 1.55.
Espacement : multiples de 8, sections 112px desktop et 64px mobile.
Rayons 10px sur les cartes, 8px sur les boutons. Une seule ombre très légère, pas de superposition d ombres.
Motion : 200ms ease-out, élévation au hover de 1px maximum.
Interdits : dégradé violet, plus d un accent, illustrations 3D génériques, ombres diffuses larges.`,
    css: `:root{
  --bg:#F6F8FC; --surface:#FFFFFF; --border:#D7DEEB;
  --text:#16213C; --text-muted:#5B6B86; --accent:#3B6FE0;
  --accent-hover:#2F5AC0;
  --radius-card:10px; --radius-btn:8px;
  --shadow:0 1px 2px rgba(16,33,60,.06);
  --dur:200ms; --ease:cubic-bezier(.2,.6,.2,1);
}`,
    rules: `- Un seul CTA primaire visible par écran
- Les bénéfices avant les fonctionnalités dans tous les textes
- Captures produit toujours dans le même cadre, même ombre
- Icônes d un seul jeu, même épaisseur de trait
- Pas plus de 3 colonnes, jamais 4 sur une landing`
  },
  {
    name: "Luxe serif",
    mood: "Premium, lent, haut de gamme",
    colors: ["#FDFBF7","#F0E9DD","#D6C5A8","#6E6354","#2A251E"],
    tags: ["luxe","mode","premium","vitrine"],
    desc: "Beaucoup de vide, grandes images, typo serif. Le vide fait le prix.",
    headingFont: "Canela / Playfair Display",
    bodyFont: "Inter / Söhne",
    scale: "14 / 16 / 22 / 34 / 56 / 88",
    radius: "0",
    spacing: "Échelle 8px mais généreuse : sections 160px desktop / 80px mobile",
    shadow: "Aucune",
    motion: "500ms ease-out, fondus lents, hover sur les images seulement",
    prompt: `Utilise ce design system : luxe sobre, premium, rythme lent.
Couleurs : fond #FDFBF7, surface #F0E9DD, détail #D6C5A8, texte secondaire #6E6354, texte #2A251E. Aucun accent vif.
Typo : serif haute (Playfair Display) pour les titres, sans discrète pour le texte, lettrage légèrement espacé sur les intertitres en majuscules (0.08em).
Espacement très généreux : sections de 160px desktop, 80px mobile. Les blocs de texte ne dépassent jamais 56 caractères par ligne.
Rayons 0, aucune ombre. Images plein cadre, ratio 3:4 ou 16:9 constant.
Motion : fondus de 500ms, zoom très léger sur les images au hover (scale 1.02).
Interdits : plus de deux polices, couleurs saturées, icônes, badges promotionnels, texte en gras dans le corps.`,
    css: `:root{
  --bg:#FDFBF7; --surface:#F0E9DD; --detail:#D6C5A8;
  --text:#2A251E; --text-muted:#6E6354;
  --font-head:"Playfair Display",Georgia,serif;
  --font-body:Inter,system-ui,sans-serif;
  --sp-section:160px; --sp-section-m:80px;
  --radius:0; --dur:500ms;
}`,
    rules: `- Le vide est un élément de design : ne jamais combler une zone vide
- Une seule information par écran de scroll
- Les prix ne sont jamais mis en avant visuellement
- Photos : même température de couleur, même grain
- Pas de bouton rempli en couleur, un contour fin suffit`
  }
];
