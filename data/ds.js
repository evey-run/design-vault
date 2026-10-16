// Pages de design system par projet : evey.html, tribos.html, orivo.html, findy.html.
// Le design system lui-même vit dans projects/<projet>/DESIGN.md (tokens et règles) ;
// ce fichier garde ce que le DESIGN.md ne couvre pas : présentation, liens, visuels, voix, prompt système.
window.DATA = window.DATA || {};
DATA.ds = {

  evey: {
    name: "Evey Design System",
    tagline: "Mon système personnel : ce que j'utilise par défaut quand je démarre un projet.",
    repo: "",
    links: []            // { label:"Figma", url:"https://…" }
  },

  tribos: {
    name: "Tribos Design System",
    tagline: "",
    repo: "~/repos/tribos",
    links: []
  },

  orivo: {
    name: "Orivo Design System",
    tagline: "Une seule lumière dans une pièce sombre pleine de jeux. Direction artistique de la communication d'Orivo (mails, Reddit, réseaux), inspirée de celle de Raycast : le produit en héros, le vide, une lumière violet → bleu, très peu de mots.",
    repo: "~/repos/orivo",
    galleryNote: "Campagne exemple rendue par le skill orivo-comms (~/.claude/skills/orivo-comms), à partir de vraies captures de l'app. Commandes à lancer depuis le dossier scripts/ du skill.",
    gallery: [   // { img, name, format, desc, why : ce qui marche et pourquoi, cmd }
      { img:"projects/orivo/references/overview.jpg", name:"Vue d'ensemble", format:"12 visuels, 7 gabarits",
        desc:"Une même lumière, un même vide, une même typo sur tous les formats",
        why:"C'est le test de cohérence d'une campagne : la lumière violette reste à la même place relative, le titre garde la même taille et le même interlettrage, le vide domine partout. Attention, la vignette du rail porte encore « All your games, in one place. » avec une virgule ; le slogan s'écrit sans (voir « Le rail »).",
        cmd:"node render.mjs ../examples/campaign.json --out ../examples" },
      { img:"projects/orivo/references/beta-x.jpg", name:"Bêta iPhone & iPad", format:"x · 1600×900",
        desc:"device — X, Bluesky, Threads, Mastodon",
        why:"Le téléphone en paysage dans un cadre neutre, éclairé par l'anneau depuis le bas ; kicker et titre de cinq mots en haut à gauche, le produit au centre. On voit l'app avant de lire quoi que ce soit.",
        cmd:"node render.mjs --template device --format x --name beta-x --data '{\"kicker\":\"TestFlight · <b>Public beta</b>\",\"title\":\"Orivo, now on iPhone and iPad.\"}'" },
      { img:"projects/orivo/references/beta-reddit.jpg", name:"Bêta, post image Reddit", format:"reddit · 1200×900",
        desc:"device sans texte : le titre du post porte le message",
        why:"Aucun mot sur l'image : sur Reddit, le titre du post dit la nouvelle et l'image montre seulement l'app. Le 4:3 s'affiche sans recadrage dans le fil.",
        cmd:"node render.mjs --template device --format reddit --name beta-reddit" },
      { img:"projects/orivo/references/release-x.jpg", name:"Version 0.3.7", format:"x · 1600×900",
        desc:"changelog — post de version (vrais apports de la 0.3.7)",
        why:"Pilule de version et date en mono, titre sur deux lignes, trois apports réels en une ligne chacun, petite capture inclinée à droite : la nouvelle se lit en une seconde dans un fil.",
        cmd:"node render.mjs ../examples/campaign.json" },
      { img:"projects/orivo/references/library-x.jpg", name:"La bibliothèque", format:"x · 1600×900",
        desc:"perspective sans texte — héros de lancement",
        why:"Une vraie capture inclinée sous la lumière, sans un mot : l'app est le message. Le bord droit déborde du cadre exprès, le contenu clé reste dedans.",
        cmd:"node render.mjs --template perspective --format x --name library-x --data '{\"image\":\"mac-library\"}'" },
      { img:"projects/orivo/references/couch-x.jpg", name:"Pensé pour le canapé", format:"x · 1600×900",
        desc:"rim — macro du liseré et de son reflet",
        why:"Le liseré lavande et son reflet en gros plan, le reste dans le flou : la sensation du canapé sans montrer de manette. Le texte passe en bas à droite, comme le veut un macro.",
        cmd:"node render.mjs --template rim --format x --name couch-x --data '{\"kicker\":\"Controller-first\",\"title\":\"Built for the couch.\"}'" },
      { img:"projects/orivo/references/rail-x.jpg", name:"Le rail", format:"x · 1600×900",
        desc:"rail — la promesse d'Orivo en une image",
        why:"Une carte sélectionnée, cerclée du liseré, parmi les jaquettes, exactement comme dans l'app : la promesse d'Orivo sans explication. Le slogan est écrit sans virgule.",
        cmd:"node render.mjs --template rail --format x --name rail-x --data '{\"kicker\":\"Orivo\",\"title\":\"All your games in one place.\"}'" },
      { img:"projects/orivo/references/most-played-og.jpg", name:"Aperçu de lien", format:"og · 1200×630",
        desc:"perspective avec titre — carte de partage",
        why:"Le titre tient en cinq mots à gauche, la capture inclinée à droite : la carte reste lisible réduite à 400 px de large, la taille d'un aperçu dans un fil.",
        cmd:"node render.mjs --template perspective --format og --name most-played-og --data '{\"image\":\"mac-most-played\",\"kicker\":\"Browse by activity\",\"title\":\"Sorted by what you actually play.\"}'" },
      { img:"projects/orivo/references/brand-og.jpg", name:"Carte de marque", format:"og · 1200×630",
        desc:"ring seul — aperçu du site",
        why:"L'anneau seul dans le noir, la lumière qui coule dessous : l'aperçu du site quand il n'y a rien d'autre à dire. Le logo n'est ni recoloré ni déformé.",
        cmd:"node render.mjs --template ring --format og --name brand-og" },
      { img:"projects/orivo/references/newsletter-square.jpg", name:"Newsletter", format:"square · 1080×1080",
        desc:"ring avec kicker et titre",
        why:"Le kicker accentue un seul mot en Lavender, l'anneau occupe le centre, le titre de quatre mots se place dessous : l'en-tête de newsletter tient en trois éléments.",
        cmd:"node render.mjs --template ring --format square --name newsletter-square --data '{\"kicker\":\"Orivo newsletter · <b>October</b>\",\"title\":\"One library.\\nEvery store.\"}'" },
      { img:"projects/orivo/references/carousel.jpg", name:"Carrousel Instagram (4 slides)", format:"portrait · 4 × 1080×1350",
        desc:"perspective → device → title (lumière en bas) → ring : même lumière, même typo",
        why:"La lumière garde la même place d'une slide à l'autre (les slides title prennent light: \"bottom\"), la première accroche avec le produit, la dernière, l'anneau, porte l'appel à l'action.",
        cmd:"node render.mjs ../examples/campaign.json --out ../examples" },
      { img:"projects/orivo/references/beta-portrait.jpg", name:"Carrousel, slide 1", format:"portrait · 1080×1350",
        desc:"title — Instagram / Threads",
        why:"Carte de texte : kicker, titre de six mots sur deux lignes, sous-titre en Body, wordmark et URL en bas ; la lumière sort du coin et ne passe jamais derrière le texte.",
        cmd:"node render.mjs --template title --format portrait --name beta-portrait --data '{\"kicker\":\"Public beta\",\"title\":\"Your library,\\nin your pocket.\",\"sub\":\"iPhone and iPad, free on TestFlight.\"}'" },
      { img:"projects/orivo/references/story.jpg", name:"Story", format:"story · 1080×1920",
        desc:"title — zones sûres respectées",
        why:"Le texte reste dans les zones sûres, à 250 px du haut et 340 px du bas : l'interface d'Instagram ne cache ni le titre ni le wordmark.",
        cmd:"node render.mjs --template title --format story --name story --data '{\"kicker\":\"New on iPhone\",\"title\":\"Every game you own. One place.\"}'" },
      { img:"projects/orivo/references/email-hero.jpg", name:"Héros de mail", format:"email · 1200×675",
        desc:"perspective — en-tête des templates Resend",
        why:"Capture inclinée vers la droite et aucun texte : le mail porte déjà le titre juste en dessous. L'image se lit à 600 px de large, la taille d'affichage d'un mail.",
        cmd:"node render.mjs --template perspective --format email --name email-hero --data '{\"image\":\"mac-game\",\"tilt\":\"right\"}'" }
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
    links: []
  }

};
