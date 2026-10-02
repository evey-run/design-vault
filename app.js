/* Design Vault - vanilla JS, zéro dépendance */

var COPY = [];            // textes copiables de la vue courante
var state = {
  tab: 'galerie',
  q: '',
  tags: [],               // filtres cumulés (ET)
  open: {},               // facettes dépliées
  cat: null,              // catégorie sélectionnée
  focus: null,            // {tab, key} : une seule fiche affichée
  sel: null,              // vignette ouverte dans la galerie
  favOnly: false
};

var SECTIONS = [
  { id:'galerie',   label:'Galerie',        get:function(){return DATA.elements},  card:cardGallery, facets:true, grid:'gal' },
  { id:'templates', label:'Templates',      get:function(){return DATA.templates}, card:cardTemplate },
  { id:'elements',  label:'Éléments',       get:function(){return DATA.elements},  card:cardElement, facets:true },
  { id:'ideas',     label:'Idées / UI',     get:function(){return DATA.ideas},     card:cardIdea },
  { id:'palettes',  label:'Couleurs',       get:function(){return DATA.palettes},  card:cardPalette },
  { id:'prompts',   label:'Prompts',        get:function(){return DATA.prompts},   card:cardPrompt },
  { id:'systems',   label:'Design systems', get:function(){return DATA.systems},   card:cardSystem }
];

/* ---------- stockage local ---------- */
function load(k, d){ try { return JSON.parse(localStorage.getItem(k)) || d; } catch(e){ return d; } }
function save(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
var favs = load('dv.favs', []);
var mix  = load('dv.mix', []);

/* ---------- utils ---------- */
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function tags(t){ return !t||!t.length ? '' : '<div class="tags">'+t.map(function(x){
  return '<button class="tag'+(state.tags.indexOf(x)>=0?' on':'')+'" data-tag="'+esc(x)+'">'+esc(x)+'</button>'; }).join('')+'</div>'; }
function copyBtn(text,label){ if(!text) return ''; COPY.push(text); return '<button class="copy" data-c="'+(COPY.length-1)+'">'+(label||'Copier')+'</button>'; }
function block(title,text){ return !text ? '' : '<details><summary>'+esc(title)+'</summary><pre>'+esc(text)+'</pre><div class="row">'+copyBtn(text)+'</div></details>'; }
function link(url,label){ return !url ? '' : '<a class="ext" href="'+esc(url)+'" target="_blank" rel="noopener">'+(label||'référence')+' ↗</a>'; }

/* saturation d'un hex, pour trouver la couleur d'accent d'une palette */
function sat(h){
  var r=parseInt(h.substr(1,2),16)/255, g=parseInt(h.substr(3,2),16)/255, b=parseInt(h.substr(5,2),16)/255;
  var mx=Math.max(r,g,b), mn=Math.min(r,g,b);
  return mx===0 ? 0 : (mx-mn)/mx * (0.35+0.65*mx);
}
function accent(cs){ return cs.slice().sort(function(a,b){ return sat(b)-sat(a); })[0]; }
function lum(h){ return (0.2126*parseInt(h.substr(1,2),16)+0.7152*parseInt(h.substr(3,2),16)+0.0722*parseInt(h.substr(5,2),16))/255; }
function darkest(cs){ return cs.slice().sort(function(a,b){ return lum(a)-lum(b); })[0]; }
function lightest(cs){ return cs.slice().sort(function(a,b){ return lum(b)-lum(a); })[0]; }

/* ---------- maquette schématique, dessinée avec la palette relevée ---------- */
function mock(layout, cs, ton){
  var dark = (ton === 'oled' || ton === 'dark');
  var bg   = dark ? darkest(cs) : lightest(cs);
  var sur  = dark ? cs.slice().sort(function(a,b){return lum(a)-lum(b)})[1] : cs.slice().sort(function(a,b){return lum(b)-lum(a)})[1];
  var ac   = accent(cs);
  var ink  = dark ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.45)';
  function b(st){ return '<i style="display:block;'+st+'"></i>'; }
  var box = 'background:'+sur+';border-radius:3px';
  var inner = '';

  if (layout === 'dashboard') {
    inner = '<div style="display:flex;gap:4px;height:100%">'
      + b('width:14%;'+box)
      + '<div style="flex:1;display:flex;flex-direction:column;gap:4px">'
      +   b('height:9px;'+box)
      +   '<div style="display:flex;gap:4px;height:22px">'+b('flex:1;'+box)+b('flex:1;'+box)+b('flex:1;background:'+ac+';border-radius:3px')+'</div>'
      +   '<div style="display:flex;gap:4px;flex:1">'+b('flex:2;'+box)+b('flex:1;'+box)+'</div>'
      + '</div></div>';
  } else if (layout === 'mobile') {
    inner = '<div style="display:flex;gap:6px;justify-content:center;height:100%">'
      + ['','',''].map(function(_,i){
          return '<div style="width:30%;'+box+';display:flex;flex-direction:column;gap:3px;padding:4px">'
            + b('height:5px;background:'+ink+';border-radius:2px;width:60%')
            + b('flex:1;background:'+(i===1?ac:ink)+';border-radius:3px;opacity:'+(i===1?1:.35))
            + b('height:7px;background:'+ink+';border-radius:2px;opacity:.5') + '</div>'; }).join('')
      + '</div>';
  } else if (layout === 'chart') {
    var bars = '';
    [40,70,55,90,45,75,60].forEach(function(h,i){ bars += b('flex:1;height:'+h+'%;align-self:flex-end;background:'+(i===3?ac:ink)+';opacity:'+(i===3?1:.4)+';border-radius:2px 2px 0 0'); });
    inner = '<div style="height:100%;display:flex;flex-direction:column;gap:5px;padding:5px;'+box+'">'
      + b('height:6px;width:40%;background:'+ink+';opacity:.6;border-radius:2px')
      + '<div style="flex:1;display:flex;gap:3px;align-items:flex-end">'+bars+'</div></div>';
  } else if (layout === 'cards') {
    inner = '<div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:4px;height:100%">'
      + [0,1,2,3].map(function(i){ return b('height:100%;background:'+(i===0?ac:sur)+';border-radius:4px'); }).join('') + '</div>';
  } else if (layout === 'hero') {
    inner = '<div style="height:100%;display:flex;flex-direction:column;gap:5px;padding:6px">'
      + b('height:6px;width:25%;background:'+ink+';opacity:.5;border-radius:2px')
      + b('height:16px;width:72%;background:'+ink+';opacity:.75;border-radius:3px')
      + b('height:8px;width:48%;background:'+ink+';opacity:.4;border-radius:2px')
      + b('height:12px;width:28%;background:'+ac+';border-radius:3px;margin-top:2px') + '</div>';
  } else if (layout === 'split') {
    inner = '<div style="display:flex;gap:4px;height:100%">'
      + '<div style="flex:1;background:'+ac+';border-radius:4px"></div>'
      + '<div style="flex:1;'+box+'"></div></div>';
  } else if (layout === 'table') {
    inner = '<div style="height:100%;display:flex;flex-direction:column;gap:3px;padding:5px;'+box+'">'
      + b('height:7px;background:'+ac+';border-radius:2px;opacity:.9')
      + [0,1,2,3,4].map(function(){ return '<div style="display:flex;gap:4px">'+b('flex:2;height:5px;background:'+ink+';opacity:.35;border-radius:2px')+b('flex:1;height:5px;background:'+ink+';opacity:.2;border-radius:2px')+b('width:14px;height:5px;background:'+ac+';opacity:.7;border-radius:2px')+'</div>'; }).join('')
      + '</div>';
  } else if (layout === 'kanban') {
    inner = '<div style="display:flex;gap:4px;height:100%">'
      + [3,2,1].map(function(n,ci){ return '<div style="flex:1;display:flex;flex-direction:column;gap:3px;padding:3px;'+box+'">'
          + b('height:4px;width:50%;background:'+(ci===0?ac:ink)+';opacity:.8;border-radius:2px')
          + Array.apply(null,Array(n)).map(function(){ return b('height:14px;background:'+ink+';opacity:.25;border-radius:3px'); }).join('')
          + '</div>'; }).join('') + '</div>';
  } else if (layout === 'map') {
    var dots = '';
    [[20,30],[35,55],[52,25],[46,70],[64,45],[72,65],[30,78],[58,15]].forEach(function(p,i){
      dots += '<i style="position:absolute;left:'+p[0]+'%;top:'+p[1]+'%;width:7px;height:7px;border-radius:50%;background:'+(i%2?ac:cs[2])+';box-shadow:0 0 7px '+(i%2?ac:cs[2])+'"></i>'; });
    inner = '<div style="position:relative;height:100%;'+box+'">'+dots+'</div>';
  } else if (layout === 'report') {
    inner = '<div style="height:100%;display:flex;flex-direction:column;gap:4px;padding:5px;'+box+'">'
      + b('height:8px;width:55%;background:'+ac+';border-radius:2px')
      + '<div style="display:flex;gap:4px;flex:1">'+b('flex:1;background:'+ink+';opacity:.2;border-radius:3px')+b('flex:1;background:'+ink+';opacity:.2;border-radius:3px')+b('flex:1;background:'+ink+';opacity:.2;border-radius:3px')+'</div>'
      + '<div style="display:flex;gap:4px;height:14px">'+b('flex:1;background:'+ink+';opacity:.15;border-radius:3px')+b('flex:1;background:'+ink+';opacity:.15;border-radius:3px')+'</div></div>';
  } else { /* mockup */
    inner = '<div style="height:100%;display:flex;align-items:center;justify-content:center">'
      + '<div style="width:72%;height:72%;'+box+';transform:perspective(500px) rotateY(-14deg) rotateX(4deg);box-shadow:6px 8px 18px rgba(0,0,0,.35);display:flex;flex-direction:column;gap:3px;padding:5px">'
      + b('height:5px;width:40%;background:'+ac+';border-radius:2px')
      + b('flex:1;background:'+ink+';opacity:.25;border-radius:3px') + '</div></div>';
  }
  return '<div class="mock" style="background:'+bg+'">'+inner+'</div>';
}

/* ---------- rapprochements entre onglets ---------- */
function rgb(h){ return [parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)]; }
function dist(a,b){ var x=rgb(a), y=rgb(b);
  return Math.sqrt(Math.pow(x[0]-y[0],2)+Math.pow(x[1]-y[1],2)+Math.pow(x[2]-y[2],2)); }

/* palette de l'onglet Couleurs la plus proche des teintes relevées sur l'image */
function nearestPalette(cs){
  var best=null, bs=1e9;
  (DATA.palettes||[]).forEach(function(p){
    var s=0;
    cs.forEach(function(c){ var m=1e9; p.colors.forEach(function(d){ var v=dist(c,d); if(v<m) m=v; }); s+=m; });
    s /= cs.length;
    if (s<bs){ bs=s; best=p; }
  });
  return best ? { p:best, d:Math.round(bs) } : null;
}

/* entrées d'un autre onglet qui partagent des tags */
function relatedIn(id, tgs){
  var sec = SECTIONS.filter(function(s){return s.id===id})[0];
  if (!sec || !tgs) return [];
  return (sec.get()||[]).map(function(it){
      var shared = (it.tags||[]).filter(function(t){ return tgs.indexOf(t)>=0; });
      return { it:it, shared:shared };
    })
    .filter(function(x){ return x.shared.length; })
    .sort(function(a,b){ return b.shared.length - a.shared.length; });
}

function goBtn(label, tab, key, tag, cls){
  return '<button class="go'+(cls?' '+cls:'')+'" data-go="'+esc(tab)+'" data-key="'+esc(key||'')+'" data-gotag="'+esc(tag||'')+'">'+esc(label)+' →</button>';
}

/* la ligne de liens : d'un visuel vers l'élément, la palette, les prompts, les idées… */
function links(e, from){
  var out = [];
  if (from !== 'galerie') out.push(goBtn('Voir le visuel', 'galerie', e.id, '', 'prim'));
  if (from !== 'elements') out.push(goBtn('Fiche élément', 'elements', e.id, '', 'prim'));
  var np = nearestPalette(e.colors);
  if (np) out.push(goBtn('Palette : '+np.p.name, 'palettes', np.p.name, ''));
  [['prompts','Prompts liés'],['ideas','Idées liées'],['templates','Templates liés'],['systems','Systèmes liés']].forEach(function(sx){
    var r = relatedIn(sx[0], e.tags);
    if (!r.length) return;
    out.push(goBtn(sx[1]+' ('+r.length+')', sx[0], '', r[0].shared[0]));
  });
  return '<div class="links">'+out.join('')+'</div>';
}

/* ---------- cartes ---------- */
function thumb(url){ return String(url||'').replace('/1200x/','/474x/'); }

function cardGallery(e){
  var open = state.sel === e.id;
  if (!open) {
    return '<article class="tile" data-sel="'+esc(e.id)+'">'
      + '<img loading="lazy" src="'+esc(thumb(e.img))+'" alt="'+esc(e.name)+'">'
      + '<div class="tcap"><b>'+esc(e.name)+'</b><span>'+esc((DATA.cats&&DATA.cats[e.cat])||e.cat)+' · '+esc(e.ton)+'</span></div>'
      + '</article>';
  }
  var sw = e.colors.map(function(c){ return '<button class="chip" style="background:'+esc(c)+'" data-copy-text="'+esc(c)+'" title="'+esc(c)+'"></button>'; }).join('');
  var isFav = favs.indexOf(e.id) >= 0, inMix = mix.indexOf(e.id) >= 0;
  return '<article class="tile open">'
    + '<div class="tbig"><img src="'+esc(e.img)+'" alt="'+esc(e.name)+'"></div>'
    + '<div class="tinfo">'
    +   '<div class="chead"><h3>'+esc(e.name)+'</h3>'
    +     '<span><button class="star'+(isFav?' on':'')+'" data-fav="'+esc(e.id)+'">'+(isFav?'★':'☆')+'</button>'
    +     '<button class="star" data-sel="">✕</button></span></div>'
    +   '<p class="meta">'+esc((DATA.cats&&DATA.cats[e.cat])||e.cat)+' · '+esc(e.ton)+'</p>'
    +   '<p class="d">'+esc(e.desc)+'</p>'
    +   '<div class="sw sm">'+sw+'</div>'
    +   tags(e.tags)
    +   links(e, 'galerie')
    +   '<div class="row">'+copyBtn(e.prompt,'Copier le prompt')
    +     '<button class="copy'+(inMix?' on':'')+'" data-mix="'+esc(e.id)+'">'+(inMix?'− Panier':'+ Panier')+'</button></div>'
    +   block('Prompt de reproduction', e.prompt)
    +   '<p class="mut">'+link(e.pin,'épingle')+(e.src?' · '+link(e.src,'source'):'')+'</p>'
    + '</div></article>';
}


function cardTemplate(t){
  return '<article class="card">'
    + wire(t.wire)
    + '<h3>'+esc(t.name)+'</h3>'
    + '<p class="meta">'+esc([t.type,t.stack].filter(Boolean).join(' · '))+'</p>'
    + (t.desc?'<p class="d">'+esc(t.desc)+'</p>':'')
    + tags(t.tags)
    + (t.sections?'<p class="mut">Sections : '+esc(t.sections.join(' / '))+'</p>':'')
    + block('Prompt', t.prompt)
    + block('Notes', t.notes)
    + (t.url?'<p class="mut">'+link(t.url)+'</p>':'')
    + '</article>';
}

function cardElement(e){
  var sw = e.colors.map(function(c){ return '<button class="chip" style="background:'+esc(c)+'" data-copy-text="'+esc(c)+'" title="'+esc(c)+'"></button>'; }).join('');
  var isFav = favs.indexOf(e.id) >= 0;
  var inMix = mix.indexOf(e.id) >= 0;
  return '<article class="card">'
    + '<div class="estrip">'
    +   (e.img ? '<img loading="lazy" src="'+esc(thumb(e.img))+'" alt="">' : '')
    +   mock(e.layout, e.colors, e.ton)
    + '</div>'
    + '<div class="chead"><h3>'+esc(e.name)+'</h3>'
    +   '<button class="star'+(isFav?' on':'')+'" data-fav="'+esc(e.id)+'" title="Favori">'+(isFav?'★':'☆')+'</button></div>'
    + '<p class="meta">'+esc((DATA.cats&&DATA.cats[e.cat])||e.cat)+' · '+esc(e.ton)+'</p>'
    + '<p class="d">'+esc(e.desc)+'</p>'
    + '<div class="sw sm">'+sw+'</div>'
    + tags(e.tags)
    + links(e, 'elements')
    + '<div class="row">'
    +   copyBtn(e.prompt,'Copier le prompt')
    +   '<button class="copy'+(inMix?' on':'')+'" data-mix="'+esc(e.id)+'">'+(inMix?'− Panier':'+ Panier')+'</button>'
    + '</div>'
    + block('Prompt de reproduction', e.prompt)
    + '<p class="mut">'+link(e.pin,'épingle')+(e.src?' · '+link(e.src,'source'):'')+'</p>'
    + '</article>';
}

function cardIdea(i){
  return '<article class="card">'
    + (i.demo?'<div class="demo">'+i.demo+'</div>':'')
    + '<h3>'+esc(i.name)+'</h3>'
    + '<p class="meta">'+esc(i.category||'')+'</p>'
    + (i.desc?'<p class="d">'+esc(i.desc)+'</p>':'')
    + tags(i.tags)
    + block('Code', i.code)
    + block('Prompt', i.prompt)
    + (i.url?'<p class="mut">'+link(i.url)+'</p>':'')
    + '</article>';
}

function cardPalette(p){
  var sw = p.colors.map(function(c){ return '<button style="background:'+esc(c)+'" data-copy-text="'+esc(c)+'" title="'+esc(c)+'">'+esc(c)+'</button>'; }).join('');
  return '<article class="card">'
    + '<div class="sw">'+sw+'</div>'
    + '<h3>'+esc(p.name)+'</h3>'
    + (p.mood?'<p class="meta">'+esc(p.mood)+'</p>':'')
    + (p.desc?'<p class="d">'+esc(p.desc)+'</p>':'')
    + '<p class="hexes">'+esc(p.colors.join('  '))+'</p>'
    + tags(p.tags)
    + '<div class="row">'+copyBtn(p.colors.join(', '),'Copier les hex')+copyBtn(cssVars(p),'Copier en CSS')+'</div>'
    + (p.usage?'<p class="mut">'+esc(p.usage)+'</p>':'')
    + '</article>';
}
function cssVars(p){ return ':root{\n' + p.colors.map(function(c,i){ return '  --c'+(i+1)+': '+c+';'; }).join('\n') + '\n}'; }

function cardPrompt(p){
  return '<article class="card">'
    + '<h3>'+esc(p.name)+'</h3>'
    + '<p class="meta">'+esc(p.use||'')+'</p>'
    + (p.desc?'<p class="d">'+esc(p.desc)+'</p>':'')
    + tags(p.tags)
    + '<div class="row">'+copyBtn(p.body,'Copier le prompt')+'</div>'
    + block('Voir le prompt', p.body)
    + '</article>';
}

function cardSystem(s){
  var dots = (s.colors||[]).map(function(c){ return '<span style="background:'+esc(c)+'" title="'+esc(c)+'"></span>'; }).join('');
  var rows = [
    ['Typo titres', s.headingFont], ['Typo texte', s.bodyFont], ['Échelle', s.scale],
    ['Rayons', s.radius], ['Espacement', s.spacing], ['Ombres', s.shadow], ['Motion', s.motion]
  ].filter(function(r){return r[1]}).map(function(r){ return '<tr><td>'+esc(r[0])+'</td><td>'+esc(r[1])+'</td></tr>'; }).join('');
  return '<article class="card">'
    + (dots?'<div class="dots">'+dots+'</div>':'')
    + '<h3>'+esc(s.name)+'</h3>'
    + (s.mood?'<p class="meta">'+esc(s.mood)+'</p>':'')
    + (s.desc?'<p class="d">'+esc(s.desc)+'</p>':'')
    + (rows?'<table class="kv">'+rows+'</table>':'')
    + tags(s.tags)
    + block('Prompt système', s.prompt)
    + block('Tokens CSS', s.css)
    + block('Règles', s.rules)
    + (s.url?'<p class="mut">'+link(s.url)+'</p>':'')
    + '</article>';
}

/* mini wireframe des templates : ['nav','hero','grid3','text','footer'] */
function wire(blocks){
  var b = (blocks && blocks.length) ? blocks : ['nav','hero','text'];
  return '<div class="wire">' + b.map(function(k){
    var g = /^grid([2-6])$/.exec(k);
    if (g) { var n=+g[1], s=''; for(var i=0;i<n;i++) s+='<div class="wb"></div>'; return '<div class="wr">'+s+'</div>'; }
    if (k==='nav')    return '<div class="wb" style="height:8px;flex:none"></div>';
    if (k==='hero')   return '<div class="wb" style="flex:2"></div>';
    if (k==='band')   return '<div class="wb" style="flex:1"></div>';
    if (k==='text')   return '<div class="wt"><i></i><i></i><i style="width:55%"></i></div>';
    if (k==='split')  return '<div class="wr"><div class="wb"></div><div class="wb" style="flex:1.6"></div></div>';
    if (k==='sidebar')return '<div class="wr"><div class="wb" style="flex:.4"></div><div class="wb" style="flex:2"></div></div>';
    if (k==='list')   return '<div class="wt"><i style="height:9px"></i><i style="height:9px"></i><i style="height:9px"></i></div>';
    if (k==='footer') return '<div class="wb" style="height:10px;flex:none"></div>';
    return '<div class="wb" style="flex:1"></div>';
  }).join('') + '</div>';
}

/* ---------- rendu ---------- */
function section(){ return SECTIONS.filter(function(s){return s.id===state.tab})[0] || SECTIONS[0]; }

function matches(item){
  if (state.cat && item.cat !== state.cat) return false;
  for (var i=0;i<state.tags.length;i++)
    if (!item.tags || item.tags.indexOf(state.tags[i]) < 0) return false;
  if (state.favOnly && (!item.id || favs.indexOf(item.id) < 0)) return false;
  if (!state.q) return true;
  return JSON.stringify(item).toLowerCase().indexOf(state.q.toLowerCase()) >= 0;
}

function facetBar(items){
  if (!section().facets || !DATA.facets) return '';
  var present = {};
  items.forEach(function(e){ (e.tags||[]).forEach(function(t){ present[t] = (present[t]||0)+1; }); });
  var html = '';
  if (DATA.cats) {
    var nb = {};
    items.forEach(function(e){ if (e.cat) nb[e.cat] = (nb[e.cat]||0)+1; });
    var cats = Object.keys(DATA.cats).filter(function(c){ return nb[c] || state.cat===c; });
    if (cats.length) html += '<div class="facet"><span class="fname">Catégorie</span>'
      + cats.map(function(c){
          return '<button class="tag'+(state.cat===c?' on':'')+'" data-cat="'+esc(c)+'">'
            + esc(DATA.cats[c]) + '<small>'+(nb[c]||0)+'</small></button>'; }).join('')
      + '</div>';
  }
  Object.keys(DATA.facets).forEach(function(f){
    var list = DATA.facets[f].filter(function(t){ return present[t] || state.tags.indexOf(t)>=0; });
    if (!list.length) return;
    list.sort(function(a,b){ return (present[b]||0)-(present[a]||0) || a.localeCompare(b); });
    var open = state.open[f], shown = open ? list : list.slice(0,10), rest = list.length - shown.length;
    html += '<div class="facet"><span class="fname">'+esc(f)+'</span>'
      + shown.map(function(t){
          return '<button class="tag'+(state.tags.indexOf(t)>=0?' on':'')+'" data-tag="'+esc(t)+'">'
            + esc(t) + '<small>'+(present[t]||0)+'</small></button>'; }).join('')
      + (rest>0 ? '<button class="more" data-facet="'+esc(f)+'">+'+rest+'</button>' : '')
      + (open && list.length>10 ? '<button class="more" data-facet="'+esc(f)+'">replier</button>' : '')
      + '</div>';
  });
  return '<div id="facets">'+html+'</div>';
}

function render(){
  var sec = section();
  COPY = [];

  document.querySelectorAll('#tabs button').forEach(function(b){
    b.setAttribute('aria-selected', b.dataset.tab === sec.id ? 'true' : 'false');
  });

  var all = sec.get() || [];
  // les facettes se calculent sur le résultat des autres filtres, pas sur lui-même
  var base = all.filter(function(it){
    if (state.favOnly && (!it.id || favs.indexOf(it.id) < 0)) return false;
    if (state.cat && it.cat !== state.cat) return false;
    return !state.q || JSON.stringify(it).toLowerCase().indexOf(state.q.toLowerCase()) >= 0;
  });
  var items = all.filter(matches);
  var focused = state.focus && state.focus.tab === sec.id;
  if (focused) items = all.filter(function(it){ return String(it.id||it.name) === state.focus.key; });

  var grid = (sec.grid === 'gal' && !state.sel) ? 'gal' : (sec.grid === 'gal' ? 'gal' : 'cards');
  document.getElementById('view').innerHTML =
      (focused ? '<p class="focusbar"><button class="chipf" id="unfocus">← retour à l\'onglet</button> fiche isolée</p>' : facetBar(base))
    + (items.length
        ? '<div class="'+grid+'">' + items.map(sec.card).join('') + '</div>'
        : '<p class="mut">Rien ne correspond. <button class="copy" id="reset">Tout réafficher</button></p>');

  document.getElementById('count').textContent = items.length + ' / ' + all.length;
  document.getElementById('filter').innerHTML =
    (state.cat ? '<button class="chipf on" data-cat="'+esc(state.cat)+'">'+esc(DATA.cats[state.cat])+' ✕</button>' : '')
    + state.tags.map(function(t){ return '<button class="chipf" data-tag="'+esc(t)+'">'+esc(t)+' ✕</button>'; }).join('')
    + (state.tags.length>1?'<button class="chipf" id="clearTags">tout effacer</button>':'')
    + '<button class="chipf'+(state.favOnly?' on':'')+'" id="favBtn">★ favoris ('+favs.length+')</button>';

  renderMix();
}

function renderMix(){
  var bar = document.getElementById('mix');
  if (!mix.length) { bar.innerHTML = ''; bar.hidden = true; return; }
  bar.hidden = false;
  COPY.push(mixPrompt());
  bar.innerHTML = '<span><b>Panier</b> : '+mix.length+' élément'+(mix.length>1?'s':'')+'</span>'
    + '<button class="copy" data-c="'+(COPY.length-1)+'">Copier le prompt combiné</button>'
    + '<button class="copy" id="mixClear">Vider</button>';
}

function mixPrompt(){
  var els = (DATA.elements||[]).filter(function(e){ return mix.indexOf(e.id) >= 0; });
  var pal = [];
  els.forEach(function(e){ if (pal.length < 6) pal.push(accent(e.colors)); });
  var out = "Construis une interface en combinant les références suivantes. "
    + "Reprends de chacune ce qui est décrit, sans mélanger les palettes : garde une seule direction chromatique pour l'ensemble.\n\n";
  els.forEach(function(e,i){
    out += (i+1)+". "+e.name+" ("+((DATA.cats&&DATA.cats[e.cat])||e.cat)+")\n"+e.prompt+"\n\n";
  });
  out += "Contraintes communes :\n"
    + "- une seule palette pour tout l'écran, à choisir parmi : "+pal.join(', ')+"\n"
    + "- deux polices maximum, une échelle typographique unique\n"
    + "- un seul niveau d'élévation (ombre ou bordure, pas les deux)\n"
    + "- cohérence des rayons et des espacements d'un bloc à l'autre\n"
    + "- si deux références se contredisent, suis la première et signale l'arbitrage.";
  return out;
}

function go(tab, key, tag){
  state.tab = tab;
  state.tags = tag ? [tag] : [];
  state.cat = null;
  state.focus = (key && tab !== 'galerie') ? { tab:tab, key:String(key) } : null;
  state.sel = (key && tab === 'galerie') ? String(key) : null;
  state.favOnly = false;
  syncHash(); render();
  window.scrollTo(0, 0);
}

function syncHash(){
  var h = state.tab;
  if (state.focus) h += '/' + encodeURIComponent(state.focus.key);
  else if (state.sel) h += '/' + encodeURIComponent(state.sel);
  if (location.hash.replace('#','') !== h) { skipHash = true; location.hash = h; }
}

function buildTabs(){
  document.getElementById('tabs').innerHTML = SECTIONS.map(function(s){
    return '<button data-tab="'+s.id+'">'+s.label+' <span class="mut">'+((s.get()||[]).length)+'</span></button>';
  }).join('');
}

function flash(btn, label){
  var old = btn.textContent; btn.textContent = label || 'Copié ✓';
  setTimeout(function(){ btn.textContent = old; }, 900);
}
function toClipboard(text, btn){
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(function(){ if(btn) flash(btn); });
  else { var ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); if(btn) flash(btn); }
}

/* ---------- events ---------- */
document.addEventListener('click', function(e){
  var t = e.target.closest ? e.target.closest('[data-tab],[data-c],[data-tag],[data-copy-text],[data-fav],[data-mix],[data-facet],[data-sel],[data-go],[data-cat],#clearTags,#favBtn,#mixClear,#reset,#unfocus') : null;
  if (!t) return;

  if (t.dataset.tab)        { go(t.dataset.tab, '', ''); }
  else if (t.id==='unfocus') { state.focus = null; syncHash(); render(); }
  else if (t.dataset.go != null && t.dataset.go !== '') { go(t.dataset.go, t.dataset.key, t.dataset.gotag); }
  else if (t.dataset.sel != null) {
    state.sel = t.dataset.sel || null;
    syncHash(); render();
    if (state.sel) { var el = document.querySelector('.tile.open'); if (el) el.scrollIntoView({block:'nearest'}); }
  }
  else if (t.id==='clearTags'){ state.tags = []; state.cat = null; render(); }
  else if (t.id==='reset')   { state.tags = []; state.cat = null; state.q = ''; state.favOnly = false; document.getElementById('q').value=''; render(); }
  else if (t.id==='favBtn')  { state.favOnly = !state.favOnly; render(); }
  else if (t.id==='mixClear'){ mix = []; save('dv.mix', mix); render(); }
  else if (t.dataset.cat)   { state.cat = (state.cat === t.dataset.cat) ? null : t.dataset.cat; render(); }
  else if (t.dataset.facet) { state.open[t.dataset.facet] = !state.open[t.dataset.facet]; render(); }
  else if (t.dataset.tag)   {
    var i = state.tags.indexOf(t.dataset.tag);
    if (i>=0) state.tags.splice(i,1); else state.tags.push(t.dataset.tag);
    render();
  }
  else if (t.dataset.fav)   {
    var j = favs.indexOf(t.dataset.fav);
    if (j>=0) favs.splice(j,1); else favs.push(t.dataset.fav);
    save('dv.favs', favs); render();
  }
  else if (t.dataset.mix)   {
    var k = mix.indexOf(t.dataset.mix);
    if (k>=0) mix.splice(k,1); else mix.push(t.dataset.mix);
    save('dv.mix', mix); render();
  }
  else if (t.dataset.c != null)        toClipboard(COPY[+t.dataset.c], t);
  else if (t.dataset.copyText != null) toClipboard(t.dataset.copyText, t);
});

document.getElementById('q').addEventListener('input', function(e){ state.q = e.target.value; render(); });
document.addEventListener('keydown', function(e){
  if (e.key === '/' && document.activeElement.id !== 'q') { e.preventDefault(); document.getElementById('q').focus(); }
  if (e.key === 'Escape' && document.activeElement.id === 'q') { document.activeElement.blur(); }
});
var skipHash = false;
window.addEventListener('hashchange', function(){
  if (skipHash) { skipHash = false; return; }
  applyHash(); render();
});
function applyHash(){
  var h = location.hash.replace('#','').split('/');
  var tab = h[0], key = h[1] ? decodeURIComponent(h[1]) : '';
  if (!SECTIONS.some(function(s){return s.id===tab})) return;
  state.tab = tab;
  state.focus = (key && tab !== 'galerie') ? { tab:tab, key:key } : null;
  state.sel   = (key && tab === 'galerie') ? key : null;
}

applyHash();
buildTabs();
render();
