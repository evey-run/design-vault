window.DATA = window.DATA || {};
DATA.palettes = [
  {
    name: "Encre & papier",
    mood: "Minimal, éditorial, intemporel",
    colors: ["#FAFAF8","#EAE8E3","#8C8984","#2B2A28","#111110"],
    tags: ["monochrome","minimal","editorial"],
    desc: "Du papier au noir d encre. Marche pour tout, ne se démode pas.",
    usage: "Fond #FAFAF8, texte #2B2A28, bordures #EAE8E3, texte secondaire #8C8984. Ajouter une seule couleur d accent si besoin."
  },
  {
    name: "Terre brûlée",
    mood: "Chaleureux, artisanal, humain",
    colors: ["#FBF6F0","#E8D5C4","#C4714A","#8A4B2F","#2F211B"],
    tags: ["chaud","terracotta","artisan","vitrine"],
    desc: "Terracotta et crème. Idéal pour commerces, food, céramique, bien-être.",
    usage: "Accent #C4714A sur les CTA, #8A4B2F pour les titres, fonds crème."
  },
  {
    name: "Forêt profonde",
    mood: "Sérieux, durable, rassurant",
    colors: ["#F4F7F3","#CFDDCB","#4F7B53","#27452C","#14211A"],
    tags: ["vert","nature","durable","finance"],
    desc: "Verts sourds, zéro saturation criarde. Fiable sans être froid.",
    usage: "Fond clair, titres #27452C, accent #4F7B53, sections sombres en #14211A."
  },
  {
    name: "Bleu nuit tech",
    mood: "Technique, net, b2b",
    colors: ["#F6F8FC","#D7DEEB","#3B6FE0","#16213C","#0B0F1A"],
    tags: ["bleu","saas","b2b","tech"],
    desc: "Le bleu par défaut du SaaS, mais désaturé pour ne pas faire template.",
    usage: "Accent #3B6FE0 uniquement sur les actions. Sections sombres #0B0F1A avec texte #D7DEEB."
  },
  {
    name: "Sable & lin",
    mood: "Doux, premium, calme",
    colors: ["#FDFBF7","#F0E9DD","#D6C5A8","#6E6354","#2A251E"],
    tags: ["beige","premium","mode","portfolio"],
    desc: "Neutres chauds. Très bien avec de grandes photos et une serif.",
    usage: "Aucun accent vif : hiérarchie par la typo. Boutons en #2A251E."
  },
  {
    name: "Brutalist jaune",
    mood: "Frontal, graphique, mémorable",
    colors: ["#FFFFFF","#F2E900","#000000","#5B5B5B","#E2E2E2"],
    tags: ["brutalist","contraste","creatif"],
    desc: "Noir, blanc, un jaune agressif. Bordures épaisses, aucune ombre.",
    usage: "Jaune en fond de section ou surlignage, jamais en texte. Bordures 2px noires."
  },
  {
    name: "Pastel froid",
    mood: "Léger, accessible, produit",
    colors: ["#FBFCFE","#E6EEF8","#C3D7F0","#7E93B5","#2E3A4B"],
    tags: ["pastel","doux","app","onboarding"],
    desc: "Bleus pâles pour interfaces douces, onboarding, apps santé.",
    usage: "Cartes en #E6EEF8 sur fond blanc, texte #2E3A4B, illustrations en #C3D7F0."
  },
  {
    name: "Rétro 70s",
    mood: "Chaud, nostalgique, décalé",
    colors: ["#FFF3E0","#F2A23C","#D9542B","#6B3A2E","#2B1C17"],
    tags: ["retro","chaud","creatif","orange"],
    desc: "Orange brûlé et moutarde. Avec une typo grasse et large, c est immédiat.",
    usage: "Deux accents maximum par écran. Fond crème obligatoire pour que ça respire."
  },
  {
    name: "Menthe fintech",
    mood: "Moderne, clair, confiance",
    colors: ["#F7FEFB","#D4F3E6","#1FB47F","#0C6248","#06231B"],
    tags: ["vert","fintech","app","dashboard"],
    desc: "Vert menthe pour chiffres positifs et parcours de paiement.",
    usage: "Réserver #1FB47F aux succès et CTA. Ne jamais colorer des blocs entiers en vert vif."
  },
  {
    name: "Violet nuit",
    mood: "Créatif, nocturne, produit IA",
    colors: ["#F8F6FF","#DCD3F7","#7C5CFF","#2A1E54","#120C24"],
    tags: ["violet","dark","ia","creatif"],
    desc: "Le violet IA, utilisable si on le garde ponctuel sur fond très sombre.",
    usage: "Fond #120C24, texte #DCD3F7, accent #7C5CFF sur une seule chose par écran. Pas de dégradé plein écran."
  },
  {
    name: "Rouge éditorial",
    mood: "Affirmé, presse, culturel",
    colors: ["#FFFFFF","#F3F1EE","#D92B21","#1A1A1A","#6E6E6E"],
    tags: ["rouge","presse","editorial","contraste"],
    desc: "Noir sur blanc avec un rouge de signalisation. Très lisible, très sûr.",
    usage: "Rouge sur les catégories, liens et traits. Jamais sur de grands aplats."
  },
  {
    name: "Gris chauds (UI)",
    mood: "Neutre de travail, interfaces denses",
    colors: ["#FFFFFF","#F6F5F4","#E3E1DE","#A8A4A0","#3C3936"],
    tags: ["gris","ui","dashboard","neutre"],
    desc: "Échelle de gris légèrement chauds : moins clinique que les gris bleus.",
    usage: "Base d un dashboard : 5 niveaux suffisent pour fond, carte, bordure, texte secondaire, texte."
  }
];
