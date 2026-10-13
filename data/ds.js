// Design systems par projet. Un objet par page : evey.html, tribos.html, orivo.html, findy.html
// Tout champ vide s'affiche comme « à remplir » sur la page : rien ne casse.
window.DATA = window.DATA || {};
DATA.ds = {

  evey: {
    name: "Evey Design System",
    tagline: "Mon système personnel : ce que j'utilise par défaut quand je démarre un projet.",
    repo: "",
    colors: [],          // { hex:"#0E0E10", name:"Encre", role:"Texte principal" }
    fonts:  { heading:"", body:"", mono:"", scale:"" },
    tokens: { spacing:"", radius:"", shadow:"", motion:"", grid:"", breakpoints:"" },
    components: [],      // { name:"Bouton primaire", desc:"…", prompt:"…" }
    prompt: "",          // le prompt à coller pour qu'un modèle respecte ce système
    rules: [],           // "Un seul CTA primaire par écran"
    links: []            // { label:"Figma", url:"https://…" }
  },

  tribos: {
    name: "Tribos Design System",
    tagline: "",
    repo: "~/repos/tribos",
    colors: [],
    fonts:  { heading:"", body:"", mono:"", scale:"" },
    tokens: { spacing:"", radius:"", shadow:"", motion:"", grid:"", breakpoints:"" },
    components: [],
    prompt: "",
    rules: [],
    links: []
  },

  orivo: {
    name: "Orivo Design System",
    tagline: "Une seule lumière dans une pièce sombre pleine de jeux. Direction artistique de la communication d'Orivo (mails, Reddit, réseaux), inspirée de celle de Raycast : le produit en héros, le vide, une lumière violet → bleu, très peu de mots.",
    repo: "~/repos/orivo",
    colors: [
      { hex:"#0B0B0D", name:"Void", role:"Fond : 80 à 90 % de chaque visuel" },
      { hex:"#060609", name:"Abyss", role:"Vignettage, ombres profondes" },
      { hex:"#151618", name:"Panel", role:"Cartes, corps des mails" },
      { hex:"#2A2930", name:"Line", role:"Filets, séparateurs" },
      { hex:"#F4F2F7", name:"White", role:"Titres (jamais #FFF pur)" },
      { hex:"#C8C5CF", name:"Body", role:"Texte courant, sous-titres" },
      { hex:"#9B97A3", name:"Ash", role:"Kickers, métadonnées" },
      { hex:"#8C65FF", name:"Ring violet", role:"Violet de l'anneau, accent de marque" },
      { hex:"#7D54F4", name:"Violet", role:"Violet de l'app (liens, boutons d'interface)" },
      { hex:"#C1AAFD", name:"Lavender", role:"Liseré de la carte sélectionnée, mot accentué" },
      { hex:"#DAD8FF", name:"Frost", role:"Bouton pilule givré, texte clair sur violet" },
      { hex:"#4B7BFE", name:"Ring blue", role:"Côté froid de l'anneau" },
      { hex:"#6BB5FC", name:"Sky", role:"Bleu le plus clair de l'anneau, par touches" }
    ],
    fonts:  {
      heading:"Inter Display",
      body:"Inter",
      mono:"JetBrains Mono (kickers, dates, versions, en capitales, +8 % d'interlettrage)",
      scale:"Titres SemiBold 600, interlettrage −2,5 %, interligne 1,02, 2 à 7 mots sur une image ; sous-titres 400 en Body. Tailles en vmin : titre 7 à 10, sous-titre 3,2 à 3,6, kicker 2,1."
    },
    tokens: {
      spacing:"Marges ≈ 8 à 9 % du petit côté ; rien de plus près du bord",
      radius:"Cartes 13 px à l'échelle de l'app (≈ 10 % de la hauteur d'une jaquette), appareils 7 vmin, pilules 99 px",
      shadow:"Pas d'ombres portées dures : halos larges (flou ≥ 6 % du visuel), lueur violette sous le sujet, grain de film ≈ 7 % contre le banding",
      motion:"Vidéos de 5 à 20 s en 60 fps, vraie navigation à la manette ou au doigt, une idée par clip, aucun carton d'intro",
      grid:"Un sujet par image ; texte en haut à gauche (kicker puis titre) ou en bas à droite pour un macro ; jamais de titre centré sur le produit",
      breakpoints:"Formats : og 1200×630 · x 1600×900 · reddit 1200×900 · square 1080×1080 · portrait 1080×1350 · story 1080×1920 (texte à 250 px du haut, 340 px du bas) · email 1200×675 · youtube 1280×720"
    },
    components: [
      { name:"title — carte de texte", desc:"Kicker mono, titre court, sous-titre, wordmark ; la lumière de l'anneau sort d'un coin. Pour les posts texte Reddit/réseaux, citations, « bientôt ».",
        prompt:"node render.mjs --template title --format x --data '{\"kicker\":\"Public beta\",\"title\":\"Your library,\\nin your pocket.\",\"sub\":\"iPhone and iPad, free on TestFlight.\"}'" },
      { name:"ring — l'anneau en objet", desc:"Le logo seul dans le noir, lumière qui coule au sol. Annonces de marque, en-têtes de newsletter, bannières.",
        prompt:"node render.mjs --template ring --format square --data '{\"kicker\":\"Orivo newsletter · <b>October</b>\",\"title\":\"One library.\\nEvery store.\"}'" },
      { name:"perspective — l'app inclinée", desc:"Une vraie capture inclinée dans l'espace sous la lumière. Grosses versions, « le nouveau… ».",
        prompt:"node render.mjs --template perspective --format og --data '{\"image\":\"mac-most-played\",\"kicker\":\"Browse by activity\",\"title\":\"Sorted by what you actually play.\"}'" },
      { name:"device — téléphone ou tablette", desc:"Cadre neutre sans logo, en paysage, éclairé par l'anneau. Nouvelles plateformes (bêta iPhone/iPad, Android).",
        prompt:"node render.mjs --template device --format x --data '{\"kicker\":\"TestFlight · <b>Public beta</b>\",\"title\":\"Orivo, now on iPhone and iPad.\"}'" },
      { name:"rim — macro du liseré", desc:"Le liseré lavande de la carte sélectionnée et son reflet, profondeur de champ. L'équivalent de la barre rouge de Raycast : navigation, manette, sensations.",
        prompt:"node render.mjs --template rim --format x --data '{\"kicker\":\"Controller-first\",\"title\":\"Built for the couch.\"}'" },
      { name:"changelog — carte de version", desc:"Pilule de version, date en mono, titre, trois lignes, petite capture inclinée. Posts de version, en-têtes de notes.",
        prompt:"node render.mjs --template changelog --format x --data '{\"version\":\"v0.3.7\",\"date\":\"Oct 13, 2026\",\"title\":\"Install what you own,\\nfrom anywhere.\",\"items\":[\"iPhone and iPad, in public beta\"],\"image\":\"iphone-library\"}'" },
      { name:"rail — le rail de la bibliothèque", desc:"Une carte sélectionnée parmi les jaquettes, comme dans l'app. Nouvelles de la bibliothèque, d'un nouveau store.",
        prompt:"node render.mjs --template rail --format x --data '{\"kicker\":\"Orivo\",\"title\":\"All your games in one place.\"}'" }
    ],
    galleryNote: "Campagne exemple rendue par le skill orivo-comms (~/.claude/skills/orivo-comms), à partir de vraies captures de l'app. Commandes à lancer depuis le dossier scripts/ du skill.",
    gallery: [
      { img:"assets/orivo/overview.jpg", name:"Vue d'ensemble", format:"12 visuels, 7 gabarits", desc:"Une même lumière, un même vide, une même typo sur tous les formats", cmd:"node render.mjs ../examples/campaign.json --out ../examples" },
      { img:"assets/orivo/beta-x.jpg", name:"Bêta iPhone & iPad", format:"x · 1600×900", desc:"device — X, Bluesky, Threads, Mastodon", cmd:"node render.mjs --template device --format x --name beta-x --data '{\"kicker\":\"TestFlight · <b>Public beta</b>\",\"title\":\"Orivo, now on iPhone and iPad.\"}'" },
      { img:"assets/orivo/beta-reddit.jpg", name:"Bêta, post image Reddit", format:"reddit · 1200×900", desc:"device sans texte : le titre du post porte le message", cmd:"node render.mjs --template device --format reddit --name beta-reddit" },
      { img:"assets/orivo/release-x.jpg", name:"Version 0.3.7", format:"x · 1600×900", desc:"changelog — post de version (vrais apports de la 0.3.7)", cmd:"node render.mjs ../examples/campaign.json" },
      { img:"assets/orivo/library-x.jpg", name:"La bibliothèque", format:"x · 1600×900", desc:"perspective sans texte — héros de lancement", cmd:"node render.mjs --template perspective --format x --name library-x --data '{\"image\":\"mac-library\"}'" },
      { img:"assets/orivo/couch-x.jpg", name:"Pensé pour le canapé", format:"x · 1600×900", desc:"rim — macro du liseré et de son reflet", cmd:"node render.mjs --template rim --format x --name couch-x --data '{\"kicker\":\"Controller-first\",\"title\":\"Built for the couch.\"}'" },
      { img:"assets/orivo/rail-x.jpg", name:"Le rail", format:"x · 1600×900", desc:"rail — la promesse d'Orivo en une image", cmd:"node render.mjs --template rail --format x --name rail-x --data '{\"kicker\":\"Orivo\",\"title\":\"All your games in one place.\"}'" },
      { img:"assets/orivo/most-played-og.jpg", name:"Aperçu de lien", format:"og · 1200×630", desc:"perspective avec titre — carte de partage", cmd:"node render.mjs --template perspective --format og --name most-played-og --data '{\"image\":\"mac-most-played\",\"kicker\":\"Browse by activity\",\"title\":\"Sorted by what you actually play.\"}'" },
      { img:"assets/orivo/brand-og.jpg", name:"Carte de marque", format:"og · 1200×630", desc:"ring seul — aperçu du site", cmd:"node render.mjs --template ring --format og --name brand-og" },
      { img:"assets/orivo/newsletter-square.jpg", name:"Newsletter", format:"square · 1080×1080", desc:"ring avec kicker et titre", cmd:"node render.mjs --template ring --format square --name newsletter-square --data '{\"kicker\":\"Orivo newsletter · <b>October</b>\",\"title\":\"One library.\\nEvery store.\"}'" },
      { img:"assets/orivo/carousel.jpg", name:"Carrousel Instagram (4 slides)", format:"portrait · 4 × 1080×1350", desc:"perspective → device → title (lumière en bas) → ring : même lumière, même typo", cmd:"node render.mjs ../examples/campaign.json --out ../examples" },
      { img:"assets/orivo/beta-portrait.jpg", name:"Carrousel, slide 1", format:"portrait · 1080×1350", desc:"title — Instagram / Threads", cmd:"node render.mjs --template title --format portrait --name beta-portrait --data '{\"kicker\":\"Public beta\",\"title\":\"Your library,\\nin your pocket.\",\"sub\":\"iPhone and iPad, free on TestFlight.\"}'" },
      { img:"assets/orivo/story.jpg", name:"Story", format:"story · 1080×1920", desc:"title — zones sûres respectées", cmd:"node render.mjs --template title --format story --name story --data '{\"kicker\":\"New on iPhone\",\"title\":\"Every game you own. One place.\"}'" },
      { img:"assets/orivo/email-hero.jpg", name:"Héros de mail", format:"email · 1200×675", desc:"perspective — en-tête des templates Resend", cmd:"node render.mjs --template perspective --format email --name email-hero --data '{\"image\":\"mac-game\",\"tilt\":\"right\"}'" }
    ],
    voice: [
      { name:"Qui parle", desc:"Orivo est fait par un seul développeur indépendant, et la voix le dit.", yes:"« I » sur Reddit, Discord et dans la newsletter ; « Orivo now… », « You can… » dans les notes de version et sur le site.", no:"« we » pour une équipe qui n'existe pas ; « our users », « gamers »." },
      { name:"Personnalité", desc:"Calme, précis, chaleureux, un peu pince-sans-rire : quelqu'un qui a monté un beau home cinéma et en est discrètement fier.", yes:"Sûr de ce qu'Orivo fait, simple sur ce qu'il ne fait pas encore.", no:"Le bonimenteur, le compte à mèmes, le communiqué de presse." },
      { name:"Ce que le lecteur peut faire maintenant", desc:"La première phrase dit le changement entre ses mains, puis pourquoi il compte, puis comment.", yes:"« Your library now sorts by genre. »", no:"« We're thrilled to announce… »" },
      { name:"Précis plutôt qu'impressionnant", desc:"Nommer l'écran, le bouton, le store, le chiffre.", yes:"« For a Steam game, Install finds its App Store version or its Steam page. »", no:"« A seamless, next-level install experience. »" },
      { name:"Phrases courtes, une idée chacune", desc:"8 à 16 mots, paragraphes d'une à trois phrases, casse de phrase partout.", yes:"« Built for the couch. »", no:"Title Case, CAPITALES, points d'exclamation, emoji dans les titres." },
      { name:"Les limites, d'emblée", desc:"La confiance est toute la marque d'un projet tenu par une seule personne.", yes:"« Public beta », « not signed yet », « iOS can't launch PC games », « source-available ».", no:"« Open source » (la licence est PolyForm Noncommercial), « free forever »." },
      { name:"Montrer, puis dire", desc:"Sur les réseaux et Reddit, l'image ou le clip fait le « wow » ; les mots donnent le fait que l'image ne peut pas dire.", yes:"Un clip de 10 s + une phrase + un lien.", no:"Un pavé qui décrit ce que la vidéo montre déjà." },
      { name:"Mots à éviter", desc:"seamless, revolutionary, game-changer, ultimate, unleash, elevate, epic (collision avec Epic Games), aggregator, platform, ecosystem, solution.", yes:"library, rail, cover, scene, install, play, browse, connect, controller, couch.", no:"« launcher » en titre (Reddit entend « encore un launcher »)." }
    ],
    prompt: `Tu écris et tu crées des visuels pour Orivo, une bibliothèque de jeux plein écran : tous les jeux possédés sur Steam, Epic Games, GOG, Ubisoft Connect et Xbox au même endroit, à parcourir au doigt ou à la manette. macOS, Windows, Linux, Android, et une bêta publique iPhone/iPad sur TestFlight. Gratuit, code source sur GitHub (PolyForm Noncommercial : « source-available », pas « open source »). Fait par un seul développeur.

Idée directrice : une seule lumière dans une pièce sombre pleine de jeux.

Visuel :
- Fond Void #0B0B0D sur 80 % de la surface au moins ; une seule lumière, le dégradé conique de l'anneau (violet #8C65FF → bleu #4B7BFE, lavande #C1AAFD, ciel #6BB5FC), toujours flou, jamais en aplat derrière du texte.
- Le produit est le héros : vraies captures d'Orivo, inclinées en perspective, dans un appareil neutre, ou macro du liseré lavande de la carte sélectionnée et de son reflet.
- Peu de mots sur l'image : un kicker en JetBrains Mono capitales (+8 %, gris #9B97A3) et un titre Inter Display SemiBold de 2 à 7 mots, casse de phrase, interlettrage −2,5 %, blanc #F4F2F7. Souvent aucun texte.
- Grain de film léger, vignettage, marges de 8 à 9 % du petit côté, un seul sujet.
- Le wordmark ORIVO est une image, jamais retapé ; l'anneau n'est jamais modifié.
- Jamais de logos de stores ou de plateformes (Steam, Epic, Apple, Windows, consoles), de prix, de faux avis, de photos de stock, de clichés « gamer » (RGB, éclairs, capitales).

Écriture :
- La première phrase dit ce que le lecteur peut faire maintenant. Phrases courtes, une idée chacune, mots précis.
- « I » sur Reddit/Discord/newsletter ; « Orivo » et « you » ailleurs. Jamais « we », « gamers », « users ».
- Pas de mots creux (seamless, revolutionary, ultimate, unleash, epic…), pas de point d'exclamation, pas d'emoji dans les titres, anglais US, casse de phrase.
- Les limites d'emblée : bêta, builds non signés, iOS ne lance pas de jeux PC, licence.
- Un lien, un appel à l'action (verbe + objet : « Join the beta », « Download for Mac »). Signature : « All your games in one place. »`,
    rules: [
      "Le produit est le héros : chaque visuel montre Orivo (bibliothèque, rail, liseré, anneau), jamais une image « gaming » générique",
      "Une seule lumière : le vide sur 80 % et le dégradé violet → bleu de l'anneau ; aucune autre couleur d'accent",
      "Sur une image : un kicker mono et un titre de 2 à 7 mots, ou rien. La phrase vit dans le post, l'objet du mail, la légende",
      "Jamais de logo de store, de plateforme ou de console ; les stores sont nommés dans le texte seulement",
      "Les captures sont vraies et à jour ; un visuel iOS ne montre que ce que fait iOS (pas de lancement de jeux PC)",
      "La première phrase dit ce que le lecteur peut faire maintenant ; une idée par phrase ; casse de phrase partout",
      "Aucun mot creux, aucun point d'exclamation, aucun emoji dans un titre ou un objet de mail",
      "Les limites d'emblée : bêta, builds non signés, licence source-available",
      "Sur Reddit : « I built… », se présenter comme le développeur, respecter les règles de chaque sub, répondre à chaque question",
      "Un lien et un appel à l'action par pièce ; la même nouvelle a le même titre, le même visuel et le même lien partout",
      "Ne rien publier soi-même : posts, broadcasts Resend et déploiements se valident par le propriétaire"
    ],
    links: [
      { label:"Site", url:"https://orivo.evey.run" },
      { label:"Code", url:"https://github.com/justeozan/orivo" },
      { label:"Bêta iPhone & iPad", url:"https://orivo.evey.run/ios" },
      { label:"Inspiration : blog Raycast", url:"https://www.raycast.com/blog" }
    ]
  },

  findy: {
    name: "Findy Design System",
    tagline: "",
    repo: "~/repos/findy",
    colors: [],
    fonts:  { heading:"", body:"", mono:"", scale:"" },
    tokens: { spacing:"", radius:"", shadow:"", motion:"", grid:"", breakpoints:"" },
    components: [],
    prompt: "",
    rules: [],
    links: []
  }

};
