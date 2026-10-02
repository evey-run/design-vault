/* Page d'un design system. La page définit DS_PROJECT avant de charger ce script. */
var COPY = [];
var P = (DATA.ds || {})[window.DS_PROJECT] || null;

function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function copyBtn(text,label){ if(!text) return ''; COPY.push(text); return '<button class="copy" data-c="'+(COPY.length-1)+'">'+(label||'Copier')+'</button>'; }
function empty(champ){
  return '<p class="todo">À remplir — <code>data/ds.js</code> → <code>'+esc(window.DS_PROJECT)+'.'+esc(champ)+'</code>'
    + (P.repo ? ', ou demande-moi d\'extraire les valeurs de <code>'+esc(P.repo)+'</code>' : '') + '.</p>';
}
function section(titre, contenu){ return '<section><h2>'+esc(titre)+'</h2>'+contenu+'</section>'; }

function colors(){
  if (!P.colors.length) return empty('colors');
  return '<div class="dscolors">' + P.colors.map(function(c){
    return '<div class="dsc"><button class="sq" style="background:'+esc(c.hex)+'" data-copy-text="'+esc(c.hex)+'" title="Copier '+esc(c.hex)+'"></button>'
      + '<b>'+esc(c.name||'')+'</b><span>'+esc(c.role||'')+'</span><code>'+esc(c.hex)+'</code></div>';
  }).join('') + '</div>'
  + '<div class="row">' + copyBtn(':root{\n' + P.colors.map(function(c,i){
      return '  --' + (c.name||('c'+(i+1))).toLowerCase().replace(/[^a-z0-9]+/g,'-') + ': ' + c.hex + ';'; }).join('\n') + '\n}', 'Copier les tokens CSS') + '</div>';
}

function fonts(){
  var f = P.fonts || {};
  var rows = [['Titres',f.heading],['Texte',f.body],['Mono',f.mono],['Échelle',f.scale]].filter(function(r){return r[1]});
  if (!rows.length) return empty('fonts');
  return '<table class="kv">' + rows.map(function(r){
    return '<tr><td>'+esc(r[0])+'</td><td>'+esc(r[1])+'</td></tr>'; }).join('') + '</table>'
    + (f.heading ? '<p class="specimen" style="font-family:'+esc(f.heading)+',serif">Aa — '+esc(f.heading)+'</p>' : '');
}

function tokens(){
  var t = P.tokens || {};
  var rows = [['Espacement',t.spacing],['Rayons',t.radius],['Ombres',t.shadow],['Motion',t.motion],
              ['Grille',t.grid],['Points de rupture',t.breakpoints]].filter(function(r){return r[1]});
  if (!rows.length) return empty('tokens');
  return '<table class="kv">' + rows.map(function(r){ return '<tr><td>'+esc(r[0])+'</td><td>'+esc(r[1])+'</td></tr>'; }).join('') + '</table>';
}

function components(){
  if (!P.components.length) return empty('components');
  return '<div class="cards">' + P.components.map(function(c){
    return '<article class="card"><h3>'+esc(c.name)+'</h3>'
      + (c.desc?'<p class="d">'+esc(c.desc)+'</p>':'')
      + (c.prompt?'<div class="row">'+copyBtn(c.prompt,'Copier le prompt')+'</div><details><summary>Prompt</summary><pre>'+esc(c.prompt)+'</pre></details>':'')
      + '</article>'; }).join('') + '</div>';
}

function prompt(){
  if (!P.prompt) return empty('prompt');
  return '<div class="row">'+copyBtn(P.prompt,'Copier le prompt système')+'</div><pre>'+esc(P.prompt)+'</pre>';
}

function rules(){
  if (!P.rules.length) return empty('rules');
  return '<ul class="rules">' + P.rules.map(function(r){ return '<li>'+esc(r)+'</li>'; }).join('') + '</ul>';
}

function links(){
  if (!P.links.length) return '';
  return '<p class="mut">' + P.links.map(function(l){
    return '<a href="'+esc(l.url)+'" target="_blank" rel="noopener">'+esc(l.label)+' ↗</a>'; }).join(' · ') + '</p>';
}

function render(){
  if (!P) { document.getElementById('ds').innerHTML = '<p class="mut">Projet inconnu.</p>'; return; }
  document.title = P.name + ' — Design Vault';
  COPY = [];
  var done = [P.colors.length, Object.keys(P.fonts||{}).filter(function(k){return P.fonts[k]}).length,
              Object.keys(P.tokens||{}).filter(function(k){return P.tokens[k]}).length,
              P.components.length, P.prompt?1:0, P.rules.length].filter(Boolean).length;
  document.getElementById('ds').innerHTML =
      '<header class="dshead"><h1>'+esc(P.name)+'</h1>'
    + (P.tagline?'<p class="mut">'+esc(P.tagline)+'</p>':'')
    + '<p class="mut">'+done+' / 6 sections renseignées'+(P.repo?' · code : <code>'+esc(P.repo)+'</code>':'')+'</p>'
    + links() + '</header>'
    + section('Couleurs', colors())
    + section('Typographie', fonts())
    + section('Tokens', tokens())
    + section('Composants', components())
    + section('Prompt système', prompt())
    + section('Règles', rules());
}

function flash(b,l){ var o=b.textContent; b.textContent=l||'Copié ✓'; setTimeout(function(){b.textContent=o;},900); }
function toClipboard(text,btn){
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(function(){ if(btn) flash(btn); });
  else { var ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); if(btn) flash(btn); }
}
document.addEventListener('click', function(e){
  var t = e.target.closest ? e.target.closest('[data-c],[data-copy-text]') : null;
  if (!t) return;
  if (t.dataset.c != null) toClipboard(COPY[+t.dataset.c], t);
  else toClipboard(t.dataset.copyText, t);
});

render();
