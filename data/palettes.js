window.DATA = window.DATA || {};
// pairs : [texte, fond, rôle] — vérifiés par tools/check.mjs (4,5:1, ou 3:1 si le rôle dit « grand »)
DATA.palettes = [
  {
    name: "Encre & papier",
    mood: "Minimal, éditorial, intemporel",
    colors: ["#FAFAF8","#EAE8E3","#73716D","#2B2A28","#111110"],
    tags: ["monochrome","minimal","editorial"],
    desc: "Du papier au noir d encre. Marche pour tout, ne se démode pas.",
    usage: "Fond #FAFAF8, texte #2B2A28, bordures #EAE8E3, texte secondaire #73716D. Ajouter une seule couleur d accent si besoin.",
    pairs: [["#2B2A28","#FAFAF8","texte"],["#73716D","#FAFAF8","texte secondaire"]]
  },
  {
    name: "Terre brûlée",
    mood: "Chaleureux, artisanal, humain",
    colors: ["#FBF6F0","#E8D5C4","#C4714A","#8A4B2F","#2F211B"],
    tags: ["chaud","terracotta","artisan","vitrine"],
    desc: "Terracotta et crème. Idéal pour commerces, food, céramique, bien-être.",
    usage: "Titres et boutons en #8A4B2F, libellé des boutons #FBF6F0, texte #2F211B sur fond crème. Le terracotta #C4714A ne porte pas de texte courant (3,6:1 avec du blanc, 4,3:1 avec #2F211B) : aplats, illustrations, grands titres.",
    pairs: [["#2F211B","#FBF6F0","texte"],["#8A4B2F","#FBF6F0","titres"],["#FBF6F0","#8A4B2F","libellé des boutons"],["#2F211B","#C4714A","grand texte sur le terracotta"]],
    defaut: "Fond crème et accent terracotta : le premier des cinq looks que le skill frontend-design d'Anthropic voit revenir dans les pages générées (il cite un accent proche de #D97757). À prendre si le métier le justifie (céramique, food), en le poussant ailleurs : typo, photo, mise en page."
  },
  {
    name: "Forêt profonde",
    mood: "Sérieux, durable, rassurant",
    colors: ["#F4F7F3","#CFDDCB","#4F7B53","#27452C","#14211A"],
    tags: ["vert","nature","durable","finance"],
    desc: "Verts sourds, zéro saturation criarde. Fiable sans être froid.",
    usage: "Fond clair, titres #27452C, accent #4F7B53, sections sombres en #14211A.",
    pairs: [["#27452C","#F4F7F3","titres"],["#4F7B53","#F4F7F3","accent en texte"],["#F4F7F3","#14211A","texte des sections sombres"]]
  },
  {
    name: "Bleu nuit tech",
    mood: "Technique, net, b2b",
    colors: ["#F6F8FC","#D7DEEB","#3B6FE0","#16213C","#0B0F1A"],
    tags: ["bleu","saas","b2b","tech"],
    desc: "Le bleu par défaut du SaaS, mais désaturé pour ne pas faire template.",
    usage: "Accent #3B6FE0 uniquement sur les actions, libellé en blanc pur (#F6F8FC n'y fait que 4,35:1). Sections sombres #0B0F1A avec texte #D7DEEB.",
    pairs: [["#16213C","#F6F8FC","texte"],["#FFFFFF","#3B6FE0","libellé des actions"],["#D7DEEB","#0B0F1A","texte des sections sombres"]]
  },
  {
    name: "Sable & lin",
    mood: "Doux, premium, calme",
    colors: ["#FDFBF7","#F0E9DD","#D6C5A8","#6E6354","#2A251E"],
    tags: ["beige","premium","mode","portfolio"],
    desc: "Neutres chauds. Très bien avec de grandes photos et une serif.",
    usage: "Aucun accent vif : hiérarchie par la typo. Boutons en #2A251E.",
    pairs: [["#2A251E","#FDFBF7","texte"],["#6E6354","#FDFBF7","texte secondaire"],["#6E6354","#F0E9DD","texte secondaire sur surface"],["#FDFBF7","#2A251E","libellé des boutons"]]
  },
  {
    name: "Brutalist jaune",
    mood: "Frontal, graphique, mémorable",
    colors: ["#FFFFFF","#F2E900","#000000","#5B5B5B","#E2E2E2"],
    tags: ["brutalist","contraste","creatif"],
    desc: "Noir, blanc, un jaune agressif. Bordures épaisses, aucune ombre.",
    usage: "Jaune en fond de section ou surlignage, jamais en texte. Bordures 2px noires.",
    pairs: [["#000000","#FFFFFF","texte"],["#000000","#F2E900","texte sur le jaune"],["#5B5B5B","#FFFFFF","texte secondaire"]]
  },
  {
    name: "Pastel froid",
    mood: "Léger, accessible, produit",
    colors: ["#FBFCFE","#E6EEF8","#C3D7F0","#7E93B5","#2E3A4B"],
    tags: ["pastel","doux","app","onboarding"],
    desc: "Bleus pâles pour interfaces douces, onboarding, apps santé.",
    usage: "Cartes en #E6EEF8 sur fond blanc, texte #2E3A4B, illustrations en #C3D7F0. #7E93B5 pour les icônes et les traits, pas pour du texte (3:1).",
    pairs: [["#2E3A4B","#FBFCFE","texte"],["#2E3A4B","#E6EEF8","texte sur les cartes"]]
  },
  {
    name: "Rétro 70s",
    mood: "Chaud, nostalgique, décalé",
    colors: ["#FFF3E0","#F2A23C","#D9542B","#6B3A2E","#2B1C17"],
    tags: ["retro","chaud","creatif","orange"],
    desc: "Orange brûlé et moutarde. Avec une typo grasse et large, c est immédiat.",
    usage: "Deux accents maximum par écran. Fond crème obligatoire pour que ça respire. Texte #2B1C17 ; l'orange #D9542B en aplat ou en grand titre seulement (3,65:1 sur le crème).",
    pairs: [["#2B1C17","#FFF3E0","texte"],["#6B3A2E","#FFF3E0","titres"],["#2B1C17","#F2A23C","texte sur la moutarde"],["#D9542B","#FFF3E0","grand titre orange"]]
  },
  {
    name: "Menthe fintech",
    mood: "Moderne, clair, confiance",
    colors: ["#F7FEFB","#D4F3E6","#1FB47F","#0C6248","#06231B"],
    tags: ["vert","fintech","app","dashboard"],
    desc: "Vert menthe pour chiffres positifs et parcours de paiement.",
    usage: "Réserver #1FB47F aux succès et CTA, avec un libellé #06231B (le blanc n'y fait que 2,7:1). Ne jamais colorer des blocs entiers en vert vif.",
    pairs: [["#06231B","#F7FEFB","texte"],["#0C6248","#F7FEFB","titres"],["#06231B","#1FB47F","libellé des CTA"]]
  },
  {
    name: "Violet nuit",
    mood: "Créatif, nocturne, produit IA",
    colors: ["#F8F6FF","#DCD3F7","#7C5CFF","#2A1E54","#120C24"],
    tags: ["violet","dark","ia","creatif"],
    desc: "Le violet IA, utilisable si on le garde ponctuel sur fond très sombre.",
    usage: "Fond #120C24, texte #DCD3F7, accent #7C5CFF sur une seule chose par écran. Pas de dégradé plein écran. L'accent ne porte pas de texte courant (4,4:1 sur le fond) : aplat, icône ou grand titre.",
    pairs: [["#DCD3F7","#120C24","texte"],["#DCD3F7","#2A1E54","texte sur les surfaces"],["#7C5CFF","#120C24","grand titre ou icône en accent"]],
    defaut: "Violet sur fond sombre : le guide d'OpenAI pour GPT‑5.4 demande d'éviter le violet par défaut et le penchant pour le mode sombre. À réserver aux produits qui l'assument, avec un vrai sujet visuel à côté."
  },
  {
    name: "Rouge éditorial",
    mood: "Affirmé, presse, culturel",
    colors: ["#FFFFFF","#F3F1EE","#D92B21","#1A1A1A","#6E6E6E"],
    tags: ["rouge","presse","editorial","contraste"],
    desc: "Noir sur blanc avec un rouge de signalisation. Très lisible, très sûr.",
    usage: "Rouge sur les catégories, liens et traits, sur fond blanc (4,3:1 seulement sur #F3F1EE). Jamais sur de grands aplats.",
    pairs: [["#1A1A1A","#FFFFFF","texte"],["#D92B21","#FFFFFF","liens et catégories"],["#6E6E6E","#FFFFFF","texte secondaire"],["#6E6E6E","#F3F1EE","texte secondaire sur surface"]]
  },
  {
    name: "Gris chauds (UI)",
    mood: "Neutre de travail, interfaces denses",
    colors: ["#FFFFFF","#F6F5F4","#E3E1DE","#716F6C","#3C3936"],
    tags: ["gris","ui","dashboard","neutre"],
    desc: "Échelle de gris légèrement chauds : moins clinique que les gris bleus.",
    usage: "Base d un dashboard : 5 niveaux suffisent pour fond, carte, bordure, texte secondaire, texte.",
    pairs: [["#3C3936","#FFFFFF","texte"],["#716F6C","#FFFFFF","texte secondaire"],["#716F6C","#F6F5F4","texte secondaire sur carte"]]
  },
  {
    name: "Void & anneau",
    mood: "Nocturne, cinématique, une seule lumière",
    colors: ["#0B0B0D","#151618","#C8C5CF","#8C65FF","#4B7BFE"],
    tags: ["dark","oled","violet","bleu","gaming","cinematique"],
    desc: "La palette d'Orivo : un noir presque pur et une seule source de lumière, le dégradé violet → bleu de son logo.",
    usage: "Fond #0B0B0D sur 80 % de la surface au moins, cartes #151618, texte #C8C5CF (titres #F4F2F7). Le violet #8C65FF et le bleu #4B7BFE ne s'emploient qu'ensemble, en lumière floue (dégradé conique, halo), jamais en aplat derrière du texte.",
    pairs: [["#C8C5CF","#0B0B0D","texte"],["#C8C5CF","#151618","texte sur les cartes"]]
  }
];
