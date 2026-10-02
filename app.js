/* Design Vault - vanilla JS, zéro dépendance */

var COPY = [];           // textes copiables de la vue courante
var state = { tab: 'templates', q: '', tag: '' };

var SECTIONS = [
  { id:'templates', label:'Templates',      get:function(){return DATA.templates}, card:cardTemplate },
  { id:'ideas',     label:'Idées / UI',     get:function(){return DATA.ideas},     card:cardIdea },
  { id:'palettes',  label:'Couleurs',       get:function(){return DATA.palettes},  card:cardPalette },
  { id:'prompts',   label:'Prompts',        get:function(){return DATA.prompts},   card:cardPrompt },
  { id:'systems',   label:'Design systems', get:function(){return DATA.systems},   card:cardSystem }
];

/* ---------- utils ---------- */
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function tags(t){ return !t||!t.length ? '' : '<div class="tags">'+t.map(function(x){return '<button class="tag" data-tag="'+esc(x)+'">'+esc(x)+'</button>'}).join('')+'</div>'; }
function copyBtn(text,label){ if(!text) return ''; COPY.push(text); return '<button class="copy" data-c="'+(COPY.length-1)+'">'+(label||'Copier')+'</button>'; }
function block(title,text){ return !text ? '' : '<details><summary>'+esc(title)+'</summary><pre>'+esc(text)+'</pre><div class="row">'+copyBtn(text)+'</div></details>'; }
function link(url){ return !url ? '' : '<p class="mut"><a href="'+esc(url)+'" target="_blank" rel="noopener">référence ↗</a></p>'; }

/* mini wireframe : ['nav','hero','grid3','text','footer'] */
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

/* ---------- cartes ---------- */
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
    + link(t.url)
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
    + link(i.url)
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
function cssVars(p){
  return ':root{\n' + p.colors.map(function(c,i){ return '  --c'+(i+1)+': '+c+';'; }).join('\n') + '\n}';
}

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
    + link(s.url)
    + '</article>';
}

/* ---------- rendu ---------- */
function section(){ return SECTIONS.filter(function(s){return s.id===state.tab})[0] || SECTIONS[0]; }

function matches(item){
  if (state.tag && (!item.tags || item.tags.indexOf(state.tag) < 0)) return false;
  if (!state.q) return true;
  return JSON.stringify(item).toLowerCase().indexOf(state.q.toLowerCase()) >= 0;
}

function render(){
  var sec = section();
  COPY = [];

  document.querySelectorAll('#tabs button').forEach(function(b){
    b.setAttribute('aria-selected', b.dataset.tab === sec.id ? 'true' : 'false');
  });

  var all = sec.get() || [];
  var items = all.filter(matches);
  document.getElementById('view').innerHTML = items.length
    ? '<div class="cards">' + items.map(sec.card).join('') + '</div>'
    : '<p class="mut">Rien ici. Ajoute une entrée dans <code>data/'+sec.id+'.js</code>.</p>';

  document.getElementById('count').textContent = items.length + ' / ' + all.length;
  document.getElementById('filter').innerHTML = state.tag
    ? '<button id="clearTag">tag : '+esc(state.tag)+' ✕</button>' : '';
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
  var t = e.target.closest ? e.target.closest('[data-tab],[data-c],[data-tag],[data-copy-text],#clearTag') : null;
  if (!t) return;
  if (t.dataset.tab)        { state.tab = t.dataset.tab; state.tag = ''; location.hash = t.dataset.tab; render(); }
  else if (t.id==='clearTag'){ state.tag = ''; render(); }
  else if (t.dataset.tag)   { state.tag = (state.tag === t.dataset.tag) ? '' : t.dataset.tag; render(); }
  else if (t.dataset.c != null)        toClipboard(COPY[+t.dataset.c], t);
  else if (t.dataset.copyText != null) toClipboard(t.dataset.copyText, null);
});

document.getElementById('q').addEventListener('input', function(e){ state.q = e.target.value; render(); });
window.addEventListener('hashchange', function(){ applyHash(); render(); });
function applyHash(){
  var h = location.hash.replace('#','');
  if (SECTIONS.some(function(s){return s.id===h})) state.tab = h;
}

applyHash();
buildTabs();
render();
