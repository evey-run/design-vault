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
    tagline: "",
    repo: "~/repos/orivo",
    colors: [],
    fonts:  { heading:"", body:"", mono:"", scale:"" },
    tokens: { spacing:"", radius:"", shadow:"", motion:"", grid:"", breakpoints:"" },
    components: [],
    prompt: "",
    rules: [],
    links: []
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
