/* Page d'un design system. La page définit DS_PROJECT avant de charger ce script.
   Le système vient de projects/<projet>/DESIGN.md (copie embarquée dans data/designmd.js),
   le reste (présentation, visuels, voix, prompt) de data/ds.js. */
var COPY = [];
var ID = window.DS_PROJECT;
var P = (DATA.ds || {})[ID] || null;
var SRC = (DATA.designmd || {})[ID] || null;
var D = window.DesignMD;
var LABEL = { 'Overview':"Vue d'ensemble", 'Colors':'Couleurs', 'Typography':'Typographie', 'Layout':'Mise en page',
  'Elevation & Depth':'Profondeur', 'Shapes':'Formes', 'Components':'Composants', "Do's and Don'ts":'À faire, à éviter', 'Motion':'Mouvement' };

function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function copyBtn(text,label){ if(!text) return ''; COPY.push(text); return '<button class="copy" data-c="'+(COPY.length-1)+'">'+(label||'Copier')+'</button>'; }
function section(titre, contenu){ return '<section><h2>'+esc(titre)+'</h2>'+contenu+'</section>'; }
function prose(md){ return md ? '<div class="prose">'+D.markdown(md)+'</div>' : ''; }
function family(f){ return String(f||'').split(',').map(function(x){ x=x.trim(); return /\s/.test(x)&&!/^["']/.test(x) ? '"'+x+'"' : x; }).join(', ') + ', sans-serif'; }
function px(v){ var d = D.parseDim(v); return d ? (d.unit==='px' ? d.value : d.value*16) : null; }

/* ---------- sections tirées du DESIGN.md ---------- */
function colors(doc, T, s){
  var notes = {}, used = [], text = s.text;
  D.colorNotes(doc).forEach(function(n){ notes[n.hex] = n; });
  var c = T.colors || {};
  var sw = Object.keys(c).map(function(k){
    var v = String(D.resolve(T, c[k]) || ''), hex = v.toUpperCase(), alias = D.isRef(c[k]);
    var n = !alias && notes[hex];
    if (n) used.push(n);
    return '<div class="dsc"><button class="sq" style="background:'+esc(v)+'" data-copy-text="'+esc(hex)+'" title="Copier '+esc(hex)+'"></button>'
      + '<b>'+esc(n ? n.name : k)+'</b><code>'+esc(k)+(alias ? ' = '+esc(c[k].replace(/[{}]|colors\./g,'')) : '')+'</code>'
      + (n ? '<span>'+D.inline(n.text)+'</span>' : '')+'<code>'+esc(hex)+'</code></div>';
  }).join('');
  used.forEach(function(n){ text = text.replace(n.raw.join('\n'), ''); });
  return (sw ? '<div class="dscolors">'+sw+'</div>' : '') + prose(text);
}

function typography(T, s){
  var t = T.typography || {};
  var specs = Object.keys(t).map(function(k){
    var x = t[k] || {}, size = px(x.fontSize) || 16;
    var style = 'font-family:'+family(x.fontFamily)+';font-weight:'+(x.fontWeight||400)+';font-size:'+Math.min(size,44)+'px;'
      + 'line-height:'+(typeof x.lineHeight==='number' ? x.lineHeight : 1.2)+';letter-spacing:'+(x.letterSpacing||'normal');
    return '<div class="spec"><p style="'+esc(style)+'">'+esc(x.fontFamily||k)+'</p>'
      + '<code>'+esc(k)+' · '+esc([x.fontSize, x.fontWeight, x.lineHeight, x.letterSpacing].filter(function(v){ return v!=null; }).join(' / '))
      + (size>44 ? ' (affiché à 44px)' : '')+'</code></div>';
  }).join('');
  return (specs ? '<div class="specs">'+specs+'</div>' : '') + prose(s.text);
}

function scale(T, group, s){
  var g = T[group] || {};
  var rows = Object.keys(g).map(function(k){
    var v = D.resolve(T, g[k]), n = px(v);
    var vis = group==='rounded'
      ? '<i class="rad" style="border-radius:'+Math.min(n||0,28)+'px"></i>'
      : '<i class="bar" style="width:'+Math.min(n||0,240)+'px"></i>';
    return '<tr><td><code>'+esc(k)+'</code></td><td>'+esc(v)+'</td><td>'+(n!=null ? vis : '')+'</td></tr>';
  }).join('');
  return (rows ? '<table class="kv tok">'+rows+'</table>' : '') + prose(s.text);
}

function components(T, s){
  var c = T.components || {}, pairs = {};
  D.pairs(T).forEach(function(p){ pairs[p.name] = p; });
  var rows = Object.keys(c).map(function(k){
    var p = pairs[k], props = Object.keys(c[k] || {}).map(function(q){ return q+' '+c[k][q]; }).join(', ');
    var sample = p ? '<span class="aa" style="color:'+esc(p.fg)+';background:'+esc(p.bg)+'">Aa</span> '+(p.ok?'':'<b>✗</b> ')+D.ratio(p.ratio) : '';
    return '<tr><td><code>'+esc(k)+'</code></td><td>'+esc(props)+'</td><td>'+sample+'</td></tr>';
  }).join('');
  return (rows ? '<table class="kv tok comp">'+rows+'</table>' : '') + prose(s.text);
}

function designSystem(){
  var r = D.lint(SRC), doc = r.doc, T = doc.tokens, out = '';
  doc.sections.forEach(function(s){
    var body = s.key==='Colors' ? colors(doc, T, s)
      : s.key==='Typography' ? typography(T, s)
      : s.key==='Layout' ? scale(T, 'spacing', s)
      : s.key==='Shapes' ? scale(T, 'rounded', s)
      : s.key==='Components' ? components(T, s)
      : prose(s.text);
    out += section(LABEL[s.key] || s.title, body);
  });
  return { html: out, lint: r };
}

/* ---------- ce que le DESIGN.md ne couvre pas (data/ds.js) ---------- */
function gallery(){
  if (!P.gallery || !P.gallery.length) return '';
  return section('Visuels de référence', (P.galleryNote?'<p class="mut">'+esc(P.galleryNote)+'</p>':'')
    + '<div class="dsgal">' + P.gallery.map(function(g){
      return '<figure><a href="'+esc(g.img)+'" target="_blank" rel="noopener"><img src="'+esc(g.img)+'" alt="'+esc(g.alt||g.name)+'" loading="lazy"></a>'
        + '<figcaption><b>'+esc(g.name)+'</b>'+(g.format?'<code>'+esc(g.format)+'</code>':'')
        + (g.desc?'<span>'+esc(g.desc)+'</span>':'')
        + (g.why?'<p>'+esc(g.why)+'</p>':'')
        + (g.cmd?'<div class="row">'+copyBtn(g.cmd,'Copier la commande')+'</div>':'')
        + '</figcaption></figure>'; }).join('') + '</div>');
}

function voice(){
  if (!P.voice || !P.voice.length) return '';
  return section('Ton et écriture', '<div class="cards">' + P.voice.map(function(v){
    return '<article class="card"><h3>'+esc(v.name)+'</h3>'
      + (v.desc?'<p class="d">'+esc(v.desc)+'</p>':'')
      + (v.yes?'<p class="d"><b>Oui :</b> '+esc(v.yes)+'</p>':'')
      + (v.no?'<p class="d mut"><b>Non :</b> '+esc(v.no)+'</p>':'')
      + '</article>'; }).join('') + '</div>');
}

function promptSys(){
  if (!P.prompt) return '';
  return section('Prompt système', '<div class="row">'+copyBtn(P.prompt,'Copier le prompt système')+'</div><pre>'+esc(P.prompt)+'</pre>');
}

function links(){
  if (!P.links || !P.links.length) return '';
  return '<p class="mut">' + P.links.map(function(l){
    return '<a href="'+esc(l.url)+'" target="_blank" rel="noopener">'+esc(l.label)+' ↗</a>'; }).join(' · ') + '</p>';
}

function hook(){
  var base = '~/repos/design-vault/projects/'+ID;
  return '## Design\n\nLe design system de ce projet est dans le Design Vault : '+base+'/DESIGN.md (tokens W3C : '+base+'/tokens/'+ID+'.tokens.json, références : '+base+'/references/).\n'
    + 'Lis-le avant tout travail visuel. Utilise ses tokens et ses composants, aucune valeur en dur. Vérifie le rendu par captures : node ~/repos/design-vault/tools/shots.mjs <url> --project '+ID+'.\n'
    + '@'+base+'/DESIGN.md\n';
}

function verification(r){
  var list = r.findings.filter(function(f){ return f.severity!=='info'; });
  return section('Vérification', '<p class="mut">'+(list.length ? r.summary.errors+' erreur(s), '+r.summary.warnings+' avertissement(s) :' : 'Aucune erreur, aucun avertissement.')
    + ' Même règles que <code>npx @google/design.md lint</code>, plus celles du vault ; <code>node tools/check.mjs</code> vérifie tout.</p>'
    + (list.length ? '<ul class="rules">'+list.map(function(f){
        return '<li><b>'+(f.severity==='error'?'Erreur':'Attention')+'</b> <code>'+esc(f.path)+'</code> '+esc(f.message)+'</li>'; }).join('')+'</ul>' : ''));
}

function empty(){
  var tpl = (DATA.designmd || {})._template;
  var ask = 'Lis le repo '+(P.repo||'[CHEMIN DU REPO]')+' et écris son DESIGN.md au format de Google (https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) dans ~/repos/design-vault/projects/'+ID+'/DESIGN.md, en partant de projects/_template/DESIGN.md. '
    + "Les valeurs viennent du code (variables CSS, thème, polices, composants de base) ; une valeur déduite se marque [À VÉRIFIER]. Une ligne « - **Nom (#HEX):** rôle et pourquoi » par couleur ; la section Components pointe vers les vrais composants. "
    + 'Puis lance node tools/build.mjs et node tools/check.mjs dans le vault, corrige, et liste les questions ouvertes.';
  return section('Design system', '<p class="todo">Pas encore de DESIGN.md. Copie <code>projects/_template/</code> en <code>projects/'+esc(ID)+'/</code> et remplis-le, '
    + (P.repo ? 'ou demande à un agent de l\'extraire de <code>'+esc(P.repo)+'</code>' : 'ou demande à un agent de l\'écrire avec toi')
    + ', puis <code>node tools/build.mjs</code>.</p><div class="row">'+copyBtn(ask,'Copier le prompt d\'extraction')+copyBtn(tpl,'Copier le modèle')+'</div>');
}

function render(){
  if (!P) { document.getElementById('ds').innerHTML = '<p class="mut">Projet inconnu.</p>'; return; }
  document.title = P.name + ' — Design Vault';
  COPY = [];
  var ds = SRC ? designSystem() : null, base = 'projects/'+ID+'/';
  var bar = ds ? '<div class="row dsbar">'
      + copyBtn(SRC,'Copier le DESIGN.md')
      + copyBtn(JSON.stringify(D.toDTCG(ds.lint.doc.tokens, { source: base+'DESIGN.md' }).tokens, null, 2),'Copier les tokens W3C')
      + copyBtn(D.toCSS(ds.lint.doc.tokens),'Copier les variables CSS')
      + copyBtn(hook(),'Brancher à un repo')
      + '</div><p class="mut"><a href="'+base+'DESIGN.md">DESIGN.md</a> · <a href="'+base+'tokens/'+ID+'.tokens.json">tokens W3C</a>'
      + (P.gallery && P.gallery.length ? ' · <a href="'+base+'references/README.md">références</a>' : '')
      + ' · <a href="'+base+'decisions.md">décisions</a></p>' : '';
  document.getElementById('ds').innerHTML =
      '<header class="dshead"><h1>'+esc(P.name)+'</h1>'
    + (P.tagline?'<p class="mut">'+esc(P.tagline)+'</p>':'')
    + '<p class="mut">'+(ds ? 'Source : <code>'+base+'DESIGN.md</code>, '+ds.lint.summary.errors+' erreur(s), '+ds.lint.summary.warnings+' avertissement(s)' : 'Pas encore de DESIGN.md')
    + (P.repo?' · code : <code>'+esc(P.repo)+'</code>':'')+'</p>'
    + links() + bar + '</header>'
    + (ds ? ds.html : empty())
    + gallery() + voice() + promptSys()
    + (ds ? verification(ds.lint) : '');
  document.querySelectorAll('#ds .prose pre').forEach(function(pre){
    var b = document.createElement('button'); b.className = 'copy'; b.textContent = 'Copier'; b.setAttribute('data-pre', '');
    pre.parentNode.insertBefore(b, pre.nextSibling);
  });
}

function flash(b,l){ var o=b.textContent; b.textContent=l||'Copié ✓'; setTimeout(function(){b.textContent=o;},900); }
function toClipboard(text,btn){
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(function(){ if(btn) flash(btn); });
  else { var ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); if(btn) flash(btn); }
}
document.addEventListener('click', function(e){
  var t = e.target.closest ? e.target.closest('[data-c],[data-copy-text],[data-pre]') : null;
  if (!t) return;
  if (t.dataset.c != null) toClipboard(COPY[+t.dataset.c], t);
  else if (t.hasAttribute('data-pre')) toClipboard(t.previousElementSibling.textContent, t);
  else toClipboard(t.dataset.copyText, t);
});

render();
