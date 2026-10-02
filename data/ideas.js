window.DATA = window.DATA || {};
DATA.ideas = [
  {
    name: "Bento grid",
    category: "Layout",
    tags: ["grid","layout","moderne"],
    desc: "Grille de tuiles de tailles inégales. Une tuile dominante, les autres secondaires.",
    demo: "<div style='display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:34px;gap:5px;width:100%'><div style='background:#8a8a8a;grid-column:span 2;grid-row:span 2'></div><div style='background:#bdbdbd'></div><div style='background:#bdbdbd'></div><div style='background:#bdbdbd'></div><div style='background:#8a8a8a;grid-column:span 2'></div></div>",
    code: `.bento{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:minmax(140px,auto);gap:12px}
.bento > .lg{grid-column:span 2;grid-row:span 2}
@media (max-width:700px){.bento{grid-template-columns:1fr}.bento > .lg{grid-column:auto;grid-row:auto}}`,
    prompt: "Présente ces contenus en bento grid : 1 tuile dominante 2x2, le reste en tuiles 1x1. Bordure fine, pas d ombre, un seul niveau de fond. En mobile, tout passe en une colonne."
  },
  {
    name: "Marquee défilant",
    category: "Motion",
    tags: ["motion","logos","boucle"],
    desc: "Bande qui défile en boucle. Pour logos clients ou mots-clés.",
    demo: "<style>@keyframes dvmq{from{transform:translateX(0)}to{transform:translateX(-50%)}}</style><div style='overflow:hidden;width:100%'><div style='display:flex;gap:10px;width:max-content;animation:dvmq 6s linear infinite'><span style='border:1px solid #999;padding:3px 8px;font-size:11px'>LOGO</span><span style='border:1px solid #999;padding:3px 8px;font-size:11px'>LOGO</span><span style='border:1px solid #999;padding:3px 8px;font-size:11px'>LOGO</span><span style='border:1px solid #999;padding:3px 8px;font-size:11px'>LOGO</span><span style='border:1px solid #999;padding:3px 8px;font-size:11px'>LOGO</span><span style='border:1px solid #999;padding:3px 8px;font-size:11px'>LOGO</span></div></div>",
    code: `.marquee{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
.marquee-track{display:flex;gap:48px;width:max-content;animation:scroll 22s linear infinite}
@keyframes scroll{to{transform:translateX(-50%)}}
/* dupliquer le contenu 2x dans le track pour une boucle sans saut */
@media (prefers-reduced-motion:reduce){.marquee-track{animation:none}}`,
    prompt: "Ajoute une bande de logos qui défile en boucle infinie, contenu dupliqué deux fois pour éviter le saut, fondu sur les bords en mask-image, animation désactivée si prefers-reduced-motion."
  },
  {
    name: "Grain / texture bruit",
    category: "Texture",
    tags: ["texture","grain","premium"],
    desc: "Fine couche de bruit par-dessus un fond uni : enlève l aspect plat et numérique.",
    demo: "<div style='width:100%;height:76px;background:#4a4a4a;position:relative;overflow:hidden'><div style=\"position:absolute;inset:0;opacity:.35;background-image:url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.85'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>&quot;)\"></div></div>",
    code: `.grain::after{
  content:"";position:fixed;inset:0;pointer-events:none;opacity:.05;z-index:9999;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}`,
    prompt: "Ajoute une couche de grain SVG en overlay fixe, opacité 4 à 6%, pointer-events none, par-dessus tout le site."
  },
  {
    name: "Dégradé mesh doux",
    category: "Fond",
    tags: ["gradient","fond","couleur"],
    desc: "Plusieurs radial-gradients superposés : fond coloré sans image.",
    demo: "<div style='width:100%;height:76px;background:radial-gradient(40% 60% at 20% 30%,#b9d4ff,transparent),radial-gradient(45% 55% at 80% 25%,#ffd3c4,transparent),radial-gradient(50% 60% at 50% 90%,#d9c9ff,transparent),#f6f6f6'></div>",
    code: `.mesh{
  background:
    radial-gradient(40% 60% at 20% 30%, #b9d4ff 0%, transparent 100%),
    radial-gradient(45% 55% at 80% 25%, #ffd3c4 0%, transparent 100%),
    radial-gradient(50% 60% at 50% 90%, #d9c9ff 0%, transparent 100%),
    #fafafa;
}`,
    prompt: "Fais le fond du hero avec trois radial-gradients superposés en teintes désaturées proches, sur un fond off-white. Pas de dégradé linéaire violet-bleu."
  },
  {
    name: "Bordure dégradée (carte)",
    category: "Composant",
    tags: ["carte","bordure","detail"],
    desc: "Bordure en dégradé via background + mask, sans pseudo-élément compliqué.",
    demo: "<div style='padding:1.5px;background:linear-gradient(135deg,#9aa,#445);width:130px'><div style='background:#f4f4f4;padding:10px;font-size:11px;color:#333'>Carte avec contour dégradé</div></div>",
    code: `.grad-border{
  padding:1px;border-radius:12px;
  background:linear-gradient(135deg,#8ab4ff,#1b1f3b);
}
.grad-border > *{border-radius:11px;background:var(--bg)}`,
    prompt: "Donne aux cartes une bordure dégradée de 1px : wrapper avec le dégradé en background et padding 1px, contenu avec le fond de la page."
  },
  {
    name: "Skeleton de chargement",
    category: "État",
    tags: ["loading","etat","app"],
    desc: "Remplace le spinner : montre la forme du contenu à venir.",
    demo: "<style>@keyframes dvsk{to{background-position:-200% 0}}</style><div style='width:100%;display:flex;flex-direction:column;gap:6px'><div style='height:10px;width:60%;background:linear-gradient(90deg,#ccc 25%,#e8e8e8 37%,#ccc 63%);background-size:200% 100%;animation:dvsk 1.3s linear infinite'></div><div style='height:10px;background:linear-gradient(90deg,#ccc 25%,#e8e8e8 37%,#ccc 63%);background-size:200% 100%;animation:dvsk 1.3s linear infinite'></div><div style='height:10px;width:80%;background:linear-gradient(90deg,#ccc 25%,#e8e8e8 37%,#ccc 63%);background-size:200% 100%;animation:dvsk 1.3s linear infinite'></div></div>",
    code: `.sk{background:linear-gradient(90deg,#eee 25%,#f6f6f6 37%,#eee 63%);background-size:400% 100%;animation:sk 1.4s ease infinite;border-radius:4px}
@keyframes sk{0%{background-position:100% 0}100%{background-position:-100% 0}}`,
    prompt: "Pour chaque zone qui charge, affiche un skeleton aux dimensions exactes du contenu final (pas de spinner), avec un shimmer discret."
  },
  {
    name: "Soulignement animé au hover",
    category: "Micro-interaction",
    tags: ["hover","lien","detail"],
    desc: "Le trait pousse de gauche à droite. Discret et toujours élégant.",
    demo: "<style>.dvul{position:relative;text-decoration:none;color:#333;font-size:13px}.dvul::after{content:'';position:absolute;left:0;bottom:-3px;height:1px;width:100%;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .3s}.dvul:hover::after{transform:scaleX(1)}</style><a href='#' class='dvul' onclick='return false'>Survole ce lien</a>",
    code: `a.u{position:relative;text-decoration:none}
a.u::after{content:"";position:absolute;left:0;bottom:-2px;width:100%;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .3s ease}
a.u:hover::after{transform:scaleX(1)}`,
    prompt: "Tous les liens de contenu : soulignement qui se déploie de la gauche au hover en 300ms, jamais de changement de couleur au hover."
  },
  {
    name: "Cartes empilées au scroll",
    category: "Motion",
    tags: ["scroll","sticky","sections"],
    desc: "Chaque section colle en haut et la suivante se superpose.",
    demo: "<div style='width:100%;display:grid;gap:4px'><div style='height:22px;background:#9a9a9a'></div><div style='height:22px;background:#b5b5b5;margin-left:8px'></div><div style='height:22px;background:#cfcfcf;margin-left:16px'></div></div>",
    code: `.stack section{position:sticky;top:0;min-height:100vh}
/* décalage progressif : top:0, top:40px, top:80px ... via :nth-child */
.stack section:nth-child(2){top:32px}
.stack section:nth-child(3){top:64px}`,
    prompt: "Empile les sections au scroll avec position sticky et un top croissant de 32px par section, chaque section a son propre fond opaque."
  },
  {
    name: "Fond quadrillé / pointillé",
    category: "Fond",
    tags: ["fond","grille","technique"],
    desc: "Grille légère en background-image : donne un aspect plan technique.",
    demo: "<div style='width:100%;height:76px;background-image:radial-gradient(#aaa 1px,transparent 1px);background-size:12px 12px'></div>",
    code: `.dots{background-image:radial-gradient(currentColor 1px, transparent 1px);background-size:16px 16px;opacity:.14}
.grid-bg{background-image:linear-gradient(to right,#0001 1px,transparent 1px),linear-gradient(to bottom,#0001 1px,transparent 1px);background-size:32px 32px}`,
    prompt: "Ajoute un fond quadrillé 32px en lignes très légères, masqué en fondu vers le bas de la section."
  },
  {
    name: "Bouton avec flèche qui glisse",
    category: "Micro-interaction",
    tags: ["bouton","hover","cta"],
    desc: "La flèche avance de quelques pixels au hover. Suffit à rendre un CTA vivant.",
    demo: "<style>.dvbtn{display:inline-flex;align-items:center;gap:6px;border:1px solid #777;padding:6px 12px;font-size:12px;color:#333;background:none;cursor:pointer}.dvbtn i{transition:transform .25s;font-style:normal}.dvbtn:hover i{transform:translateX(4px)}</style><button class='dvbtn'>Commencer <i>&rarr;</i></button>",
    code: `.btn i{display:inline-block;transition:transform .25s ease}
.btn:hover i{transform:translateX(4px)}`,
    prompt: "Les boutons primaires contiennent une flèche qui se décale de 4px vers la droite au hover, transition 250ms, aucun changement de taille du bouton."
  },
  {
    name: "Bascule mensuel / annuel",
    category: "Composant",
    tags: ["pricing","toggle","form"],
    desc: "Deux états, la réduction annoncée sur l option annuelle.",
    demo: "<div style='display:inline-flex;border:1px solid #888;font-size:11px'><span style='padding:5px 9px;background:#777;color:#fff'>Mensuel</span><span style='padding:5px 9px;color:#444'>Annuel -20%</span></div>",
    code: `<div class="seg" role="tablist">
  <button role="tab" aria-selected="true">Mensuel</button>
  <button role="tab" aria-selected="false">Annuel <small>-20%</small></button>
</div>`,
    prompt: "Ajoute une bascule mensuel/annuel en segmented control accessible (role tablist, aria-selected), la réduction affichée dans l onglet annuel, les prix changent sans recharger."
  },
  {
    name: "Onglets soulignés",
    category: "Navigation",
    tags: ["tabs","navigation"],
    desc: "Indicateur en trait sous l onglet actif, pas de fond coloré.",
    demo: "<div style='display:flex;gap:14px;font-size:12px;border-bottom:1px solid #bbb;width:100%'><span style='padding-bottom:5px;border-bottom:2px solid #333;color:#222'>Aperçu</span><span style='padding-bottom:5px;color:#888'>Détails</span><span style='padding-bottom:5px;color:#888'>Avis</span></div>",
    code: `.tabs{display:flex;gap:20px;border-bottom:1px solid var(--b)}
.tabs button{padding:8px 0;border:0;background:none;border-bottom:2px solid transparent;color:var(--mut)}
.tabs button[aria-selected="true"]{color:var(--fg);border-color:currentColor}`,
    prompt: "Onglets avec soulignement de l onglet actif uniquement, pas de fond, navigation clavier flèches gauche/droite, contenu lié par aria-controls."
  },
  {
    name: "Groupe d avatars empilés",
    category: "Composant",
    tags: ["avatar","preuve-sociale"],
    desc: "Preuve sociale compacte : 4 avatars qui se chevauchent + un compteur.",
    demo: "<div style='display:flex;align-items:center'><span style='width:26px;height:26px;border-radius:50%;background:#9b9b9b;border:2px solid #f4f4f4'></span><span style='width:26px;height:26px;border-radius:50%;background:#848484;border:2px solid #f4f4f4;margin-left:-9px'></span><span style='width:26px;height:26px;border-radius:50%;background:#6d6d6d;border:2px solid #f4f4f4;margin-left:-9px'></span><span style='margin-left:8px;font-size:11px;color:#555'>+1 240 utilisateurs</span></div>",
    code: `.avatars{display:flex}
.avatars img{width:32px;height:32px;border-radius:50%;border:2px solid var(--bg)}
.avatars img+img{margin-left:-10px}`,
    prompt: "Ajoute une preuve sociale sous le CTA : 4 avatars empilés avec chevauchement de 10px, bordure de la couleur du fond, suivis du nombre d utilisateurs en petit."
  },
  {
    name: "Citation éditoriale",
    category: "Typographie",
    tags: ["typo","citation","editorial"],
    desc: "Grande citation en retrait, attribution discrète. Rythme la page.",
    demo: "<div style='width:100%;border-left:2px solid #888;padding-left:10px'><p style='margin:0;font-size:14px;line-height:1.35;color:#333'>Le design, c est enlever jusqu à ce que ça casse.</p><p style='margin:4px 0 0;font-size:10px;color:#888'>— Note interne</p></div>",
    code: `blockquote{border-left:2px solid var(--fg);padding-left:16px;margin:48px 0;max-width:34ch}
blockquote p{font-size:clamp(20px,3vw,30px);line-height:1.25;text-wrap:balance}
blockquote cite{display:block;margin-top:10px;font-size:13px;color:var(--mut);font-style:normal}`,
    prompt: "Insère une citation large tous les 3 à 4 paragraphes : barre verticale à gauche, texte en clamp(20px,3vw,30px), attribution en petit gris, text-wrap balance."
  },
  {
    name: "Barre de progression de lecture",
    category: "Motion",
    tags: ["scroll","article","detail"],
    desc: "Fin trait en haut de page qui suit le scroll. Utile sur les articles longs.",
    demo: "<div style='width:100%'><div style='height:3px;background:#ddd'><div style='height:3px;width:42%;background:#555'></div></div><p style='margin:8px 0 0;font-size:11px;color:#888'>42% lu</p></div>",
    code: `/* CSS seul, sans JS */
body{animation:progress linear;animation-timeline:scroll()}
.bar{position:fixed;top:0;left:0;height:3px;background:var(--fg);transform-origin:left;transform:scaleX(0);animation:grow linear;animation-timeline:scroll()}
@keyframes grow{to{transform:scaleX(1)}}`,
    prompt: "Ajoute une barre de progression de lecture de 3px en haut, en CSS scroll-driven animation (animation-timeline: scroll()), avec repli JS si non supporté."
  },
  {
    name: "Focus visible accessible",
    category: "Accessibilité",
    tags: ["a11y","focus","detail"],
    desc: "Ne jamais supprimer l outline : le remplacer par un anneau net.",
    demo: "<button style='font:inherit;font-size:12px;padding:5px 10px;border:1px solid #888;background:none;color:#333;outline:2px solid #3366cc;outline-offset:2px'>Élément focus</button>",
    code: `:focus-visible{outline:2px solid currentColor;outline-offset:2px;border-radius:2px}
:focus:not(:focus-visible){outline:none}`,
    prompt: "N enlève jamais outline:none sans remplacement : utilise :focus-visible avec un outline de 2px et un offset de 2px sur tous les éléments interactifs."
  },
  {
    name: "Mode sombre par variables",
    category: "Système",
    tags: ["dark-mode","tokens","css"],
    desc: "Une seule définition de couleurs, redéfinie dans le media query. Zéro duplication.",
    demo: "<div style='display:flex;width:100%;border:1px solid #999'><div style='flex:1;background:#fff;color:#111;padding:10px;font-size:11px'>Clair</div><div style='flex:1;background:#111;color:#eee;padding:10px;font-size:11px'>Sombre</div></div>",
    code: `:root{--bg:#fff;--fg:#111;--mut:#666;--b:#e4e4e4}
@media (prefers-color-scheme:dark){
  :root{--bg:#111;--fg:#ededed;--mut:#8f8f8f;--b:#2c2c2c}
}
[data-theme="light"]{--bg:#fff;--fg:#111}
[data-theme="dark"]{--bg:#111;--fg:#ededed}`,
    prompt: "Déclare toutes les couleurs en variables CSS sur :root, redéfinis-les dans prefers-color-scheme:dark et sous [data-theme], n écris aucune couleur en dur dans les composants."
  }
];
