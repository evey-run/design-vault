/* DESIGN.md : lecture, vérification et exports (spec ouverte de Google, version alpha).
   Spec : https://github.com/google-labs-code/design.md/blob/main/docs/spec.md
   Le même fichier sert au site (window.DesignMD) et aux outils de tools/ (chargé par vm). Zéro dépendance. */
(function (root) {
  'use strict';

  var SECTIONS = [
    { name: 'Overview', aliases: ['overview', 'brand & style'] },
    { name: 'Colors', aliases: ['colors'] },
    { name: 'Typography', aliases: ['typography'] },
    { name: 'Layout', aliases: ['layout', 'layout & spacing'] },
    { name: 'Elevation & Depth', aliases: ['elevation & depth', 'elevation'] },
    { name: 'Shapes', aliases: ['shapes'] },
    { name: 'Components', aliases: ['components'] },
    { name: "Do's and Don'ts", aliases: ["do's and don'ts", "dos and don'ts", 'dos and donts'] }
  ];
  var KEYS = ['version', 'name', 'description', 'omitted', 'colors', 'typography', 'rounded', 'spacing', 'components'];
  var TYPO_PROPS = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'fontFeature', 'fontVariation'];
  var COMP_PROPS = ['backgroundColor', 'textColor', 'typography', 'rounded', 'padding', 'size', 'height', 'width'];
  var REF = /^\{([^{}]+)\}$/;
  var AA = 4.5;
  var has = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  var isMap = function (v) { return v !== null && typeof v === 'object' && !Array.isArray(v); };

  /* ---------- YAML : le sous-ensemble utilisé par le front matter ----------
     Tables par indentation, listes « - », chaînes entre guillemets ou nues, nombres, booléens,
     listes [a, b]. Tout le reste est refusé avec un message, plutôt que mal lu. */
  function YamlError(line, message) { this.line = line; this.message = message; }

  function parseYAML(src, firstLine) {
    var rows = [];
    String(src).split(/\r?\n/).forEach(function (raw, i) {
      var n = i + (firstLine || 1);
      if (/^\s*$/.test(raw) || /^\s*#/.test(raw)) return;
      if (/^ *\t/.test(raw)) throw new YamlError(n, "tabulation dans l'indentation : utilise des espaces");
      var ind = raw.match(/^ */)[0].length;
      rows.push({ ind: ind, text: raw.slice(ind).replace(/\s+$/, ''), n: n });
    });
    var pos = 0;
    function isSeq(t) { return t === '-' || t.slice(0, 2) === '- '; }
    function block() { return isSeq(rows[pos].text) ? seq(rows[pos].ind) : map(rows[pos].ind); }

    function map(ind) {
      var obj = {};
      while (pos < rows.length && rows[pos].ind === ind && !isSeq(rows[pos].text)) {
        var r = rows[pos], e = entry(r.text, r.n);
        if (has(obj, e.key)) throw new YamlError(r.n, 'clé en double : ' + e.key);
        pos++;
        if (e.value === '') {
          if (pos < rows.length && rows[pos].ind > ind) obj[e.key] = block();
          else if (pos < rows.length && rows[pos].ind === ind && isSeq(rows[pos].text)) obj[e.key] = seq(ind);
          else obj[e.key] = null;
        } else obj[e.key] = scalar(e.value, r.n);
      }
      if (pos < rows.length && rows[pos].ind > ind) throw new YamlError(rows[pos].n, 'indentation inattendue');
      return obj;
    }
    function seq(ind) {
      var arr = [];
      while (pos < rows.length && rows[pos].ind === ind && isSeq(rows[pos].text)) {
        var r = rows[pos], rest = r.text.replace(/^-\s*/, '');
        if (!rest) { pos++; arr.push(pos < rows.length && rows[pos].ind > ind ? block() : null); continue; }
        if (entry(rest, r.n, true)) {
          // « - clé: valeur » : une table dont les lignes suivantes s'alignent sur la clé
          rows[pos] = { ind: ind + r.text.length - rest.length, text: rest, n: r.n };
          arr.push(map(rows[pos].ind));
          continue;
        }
        pos++;
        arr.push(scalar(rest, r.n));
      }
      return arr;
    }
    function entry(t, n, probe) {
      var key, rest, m;
      if (t[0] === '"' || t[0] === "'") {
        var q = quoted(t, n);
        rest = t.slice(q.end);
        if (!/^\s*:(\s|$)/.test(rest)) { if (probe) return null; throw new YamlError(n, 'ligne illisible : ' + t); }
        key = q.value; rest = rest.replace(/^\s*:/, '');
      } else {
        m = /^([^\s#{}\[\],&*!|>'"%@`-][^:#]*?|-[^\s:#][^:#]*?)\s*:(?:\s+(.*))?$/.exec(t);
        if (!m) { if (probe) return null; throw new YamlError(n, 'ligne illisible : ' + t); }
        key = m[1]; rest = m[2] || '';
      }
      rest = rest.trim();
      if (rest[0] === '#') rest = '';
      return { key: key, value: rest };
    }
    function quoted(t, n) {
      var q = t[0], i = 1, s = '';
      if (q === '"') {
        for (; i < t.length; i++) { if (t[i] === '\\') { i++; continue; } if (t[i] === '"') break; }
        if (i >= t.length) throw new YamlError(n, 'guillemet non fermé');
        try { s = JSON.parse(t.slice(0, i + 1)); }
        catch (e) { throw new YamlError(n, 'échappement invalide dans ' + t.slice(0, i + 1)); }
        return { value: s, end: i + 1 };
      }
      for (; i < t.length; i++) {
        if (t[i] === "'") { if (t[i + 1] === "'") { s += "'"; i++; continue; } break; }
        s += t[i];
      }
      if (i >= t.length) throw new YamlError(n, 'apostrophe non fermée');
      return { value: s, end: i + 1 };
    }
    function scalar(v, n) {
      v = v.trim();
      if (v === '' || v[0] === '#') return null;
      if (v[0] === '"' || v[0] === "'") {
        var q = quoted(v, n), after = v.slice(q.end).trim();
        if (after && after[0] !== '#') throw new YamlError(n, 'texte après une chaîne entre guillemets : ' + v);
        return q.value;
      }
      if (v[0] === '[') return flow(v, n);
      if (v[0] === '{') throw new YamlError(n, 'une référence se met entre guillemets : "' + v.replace(/\s+#.*$/, '') + '"');
      if (/^[&*!|>%@`]/.test(v)) throw new YamlError(n, 'syntaxe YAML non prise en charge par le vault : ' + v);
      var c = v.search(/\s#/);
      if (c >= 0) v = v.slice(0, c).trim();
      if (/:(\s|$)/.test(v)) throw new YamlError(n, 'deux-points dans une valeur : mets-la entre guillemets');
      if (v === 'true') return true;
      if (v === 'false') return false;
      if (v === 'null' || v === '~') return null;
      if (/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(v)) return Number(v);
      return v;
    }
    function flow(v, n) {
      var end = v.search(/\]\s*(#.*)?$/);
      if (end < 0) throw new YamlError(n, 'liste [ ] non fermée');
      var inner = v.slice(1, end), out = [], cur = '', q = null;
      if (!inner.trim()) return out;
      for (var i = 0; i < inner.length; i++) {
        var ch = inner[i];
        if (q) { cur += ch; if (ch === q && inner[i - 1] !== '\\') q = null; continue; }
        if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
        if (ch === '[' || ch === '{') throw new YamlError(n, 'listes imbriquées non prises en charge');
        if (ch === ',') { out.push(scalar(cur, n)); cur = ''; continue; }
        cur += ch;
      }
      out.push(scalar(cur, n));
      return out;
    }

    var out = rows.length ? block() : {};
    if (pos < rows.length) throw new YamlError(rows[pos].n, 'indentation inattendue');
    if (!isMap(out)) throw new YamlError(rows.length ? rows[0].n : 1, 'le front matter doit être une table clé: valeur');
    return out;
  }

  /* écriture YAML (pour les DESIGN.md générés) */
  function yamlScalar(v) {
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    if (v == null) return 'null';
    var s = String(v);
    if (/^-?\d*\.?\d+(px|em|rem)$/.test(s)) return s;
    if (/^[A-Za-zÀ-ÿ][\wÀ-ÿ .,()'-]*$/.test(s) && !/^(true|false|null|yes|no|on|off)$/i.test(s) && !/:\s|\s#/.test(s)) return s;
    return JSON.stringify(s);
  }
  function toYAML(obj, ind) {
    ind = ind || '';
    return Object.keys(obj).filter(function (k) { return obj[k] !== undefined; }).map(function (k) {
      var v = obj[k], key = /^[A-Za-z_][\w-]*$/.test(k) ? k : JSON.stringify(k);
      if (isMap(v)) return ind + key + ':\n' + toYAML(v, ind + '  ');
      if (Array.isArray(v)) return ind + key + ':\n' + v.map(function (x) { return ind + '  - ' + yamlScalar(x); }).join('\n');
      return ind + key + ': ' + yamlScalar(v);
    }).join('\n');
  }

  /* ---------- le document ---------- */
  function canonical(title) {
    var t = String(title).toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
    for (var i = 0; i < SECTIONS.length; i++) if (SECTIONS[i].aliases.indexOf(t) >= 0) return SECTIONS[i].name;
    return null;
  }

  function splitFrontMatter(text) {
    var lines = String(text).split(/\r?\n/);
    if (lines[0].replace(/^﻿/, '') !== '---') return { yaml: null, body: lines.join('\n'), bodyLine: 1 };
    for (var i = 1; i < lines.length; i++) {
      if (lines[i] === '---') return { yaml: lines.slice(1, i).join('\n'), yamlLine: 2, body: lines.slice(i + 1).join('\n'), bodyLine: i + 2 };
    }
    return { yaml: null, error: 'front matter non fermé : il manque la ligne ---', body: '', bodyLine: 1 };
  }

  function sections(body, firstLine) {
    var list = [], cur = null, pre = [], title = null, fence = false;
    body.split(/\r?\n/).forEach(function (l, i) {
      if (/^\s*(```|~~~)/.test(l)) fence = !fence;
      var m = !fence && /^##\s+(.+?)\s*#*\s*$/.exec(l);
      if (m) { cur = { title: m[1], key: canonical(m[1]), line: firstLine + i, lines: [] }; list.push(cur); return; }
      if (!fence && !cur && title === null && /^#\s+\S/.test(l)) { title = l.replace(/^#\s+/, '').trim(); return; }
      (cur ? cur.lines : pre).push(l);
    });
    list.forEach(function (s) { s.text = s.lines.join('\n').replace(/^\s*\n/, '').replace(/\s+$/, ''); delete s.lines; });
    return { title: title, preamble: pre.join('\n').trim(), list: list };
  }

  function parse(text) {
    var sp = splitFrontMatter(text), tokens = {}, error = sp.error || null, errorLine = null;
    if (sp.yaml != null) {
      try { tokens = parseYAML(sp.yaml, sp.yamlLine); }
      catch (e) { if (!(e instanceof YamlError)) throw e; error = e.message; errorLine = e.line; tokens = {}; }
    }
    var sec = sections(sp.body, sp.bodyLine);
    return { tokens: tokens, hasFrontMatter: sp.yaml != null, error: error, errorLine: errorLine,
             title: sec.title, preamble: sec.preamble, sections: sec.list, body: sp.body };
  }

  function section(doc, name) {
    for (var i = 0; i < doc.sections.length; i++) if (doc.sections[i].key === name) return doc.sections[i];
    return null;
  }

  /* ---------- tokens ---------- */
  function get(T, path) {
    var cur = T, parts = path.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (!isMap(cur) || !has(cur, parts[i])) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }
  function isRef(v) { return typeof v === 'string' && REF.test(v); }
  function refPath(v) { var m = typeof v === 'string' && REF.exec(v); return m ? m[1].trim() : null; }
  /* suit les références jusqu'à une valeur ; undefined si cassée ou circulaire */
  function resolve(T, v, seen) {
    var p = refPath(v);
    if (!p) return v;
    seen = seen || [];
    if (seen.indexOf(p) >= 0) return undefined;
    return resolve(T, get(T, p), seen.concat(p));
  }

  function parseColor(v) {
    if (typeof v !== 'string') return null;
    var s = v.trim().toLowerCase(), m;
    if ((m = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(s))) {
      var h = m[1];
      if (h.length <= 4) h = h.split('').map(function (c) { return c + c; }).join('');
      return { r: parseInt(h.substr(0, 2), 16), g: parseInt(h.substr(2, 2), 16), b: parseInt(h.substr(4, 2), 16),
               a: h.length === 8 ? parseInt(h.substr(6, 2), 16) / 255 : 1 };
    }
    m = /^rgba?\(\s*(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)\s*(?:[,/]\s*(\d*\.?\d+)(%?))?\s*\)$/.exec(s);
    if (m) return { r: +m[1], g: +m[2], b: +m[3], a: alpha(m[4], m[5]) };
    m = /^hsla?\(\s*(-?\d*\.?\d+)(?:deg)?[\s,]+(\d*\.?\d+)%[\s,]+(\d*\.?\d+)%\s*(?:[,/]\s*(\d*\.?\d+)(%?))?\s*\)$/.exec(s);
    if (m) { var h = hsl(+m[1], +m[2] / 100, +m[3] / 100); h.a = alpha(m[4], m[5]); return h; }
    m = /^oklch\(\s*(\d*\.?\d+)(%?)\s+(\d*\.?\d+)\s+(-?\d*\.?\d+)(?:deg)?\s*(?:\/\s*(\d*\.?\d+)(%?))?\s*\)$/.exec(s);
    if (m) { var L = m[2] ? +m[1] / 100 : +m[1], o = oklch(L, +m[3], +m[4]); o.a = alpha(m[5], m[6]); o.oklch = [L, +m[3], +m[4]]; return o; }
    if (s === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
    if (s === 'black') return { r: 0, g: 0, b: 0, a: 1 };
    if (s === 'white') return { r: 255, g: 255, b: 255, a: 1 };
    return null;
  }
  function alpha(v, pct) { return v == null ? 1 : pct ? +v / 100 : +v; }
  function hsl(h, s, l) {
    h = ((h % 360) + 360) % 360;
    var a = s * Math.min(l, 1 - l);
    function f(n) { var k = (n + h / 30) % 12; return 255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))); }
    return { r: f(0), g: f(8), b: f(4), a: 1 };
  }
  /* OKLCH → sRGB (les couleurs hors gamut sont ramenées dans l'sRGB pour le contraste et le repli hex) */
  function oklch(L, C, H) {
    var t = H * Math.PI / 180, A = C * Math.cos(t), B = C * Math.sin(t);
    var l = Math.pow(L + 0.3963377774 * A + 0.2158037573 * B, 3), m = Math.pow(L - 0.1055613458 * A - 0.0638541728 * B, 3),
        s = Math.pow(L - 0.0894841775 * A - 1.2914855480 * B, 3);
    var lin = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
               -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s].map(function (x) {
      x = Math.max(0, Math.min(1, x)); return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055); });
    return { r: lin[0], g: lin[1], b: lin[2], a: 1 };
  }
  /* couleur CSS valide mais que le vault ne sait pas convertir (hwb, lab, color-mix, couleurs nommées…) */
  function otherCssColor(v) {
    return typeof v === 'string' && (/^(hwb|oklab|lch|lab|color|color-mix)\(.+\)$/i.test(v.trim()) || /^[a-z]+$/i.test(v.trim()));
  }
  function hex(c) {
    function h(x) { return ('0' + Math.round(x).toString(16)).slice(-2); }
    return '#' + h(c.r) + h(c.g) + h(c.b);
  }
  function channel(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function luminance(c) { return 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b); }
  function over(fg, bg) {
    var a = fg.a == null ? 1 : fg.a;
    return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 };
  }
  /* ratio WCAG 2 entre deux couleurs (chaînes CSS ou objets) ; null si incalculable */
  function contrast(fg, bg) {
    var f = typeof fg === 'string' ? parseColor(fg) : fg, b = typeof bg === 'string' ? parseColor(bg) : bg;
    if (!f || !b || b.a < 1) return null;
    var A = luminance(over(f, b)), B = luminance(b);
    return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05);
  }
  function ratio(x) { return x.toFixed(2).replace('.', ',') + ':1'; }

  function parseDim(v) {
    if (typeof v !== 'string') return null;
    var m = /^(-?\d*\.?\d+)(px|em|rem)$/.exec(v.trim());
    return m ? { value: +m[1], unit: m[2] } : null;
  }

  /* les lignes « - **Nom (#HEX) :** rôle » de la section Colors, format de l'exemple de la spec */
  function colorNotes(doc) {
    var s = section(doc, 'Colors'), out = [];
    if (!s) return out;
    var last = null;
    s.text.split(/\r?\n/).forEach(function (l) {
      var m = /^\s*[-*+]\s+\*\*\s*(.+?)\s*\(\s*(#[0-9A-Fa-f]{3,8})\s*\)\s*:?\s*\*\*\s*:?\s*(.*)$/.exec(l);
      if (m) { last = { name: m[1], hex: m[2].toUpperCase(), text: m[3].trim(), raw: [l] }; out.push(last); return; }
      if (last && /^\s{2,}\S/.test(l) && !/^\s*[-*+]\s/.test(l)) { last.text += ' ' + l.trim(); last.raw.push(l); return; }
      last = null;
    });
    return out;
  }

  /* ---------- vérification : les 11 règles du CLI officiel, plus celles du vault ---------- */
  function lev(a, b) {
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) d[i] = [i];
    for (j = 0; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  function tokenLike(v) {
    if (isMap(v)) return Object.keys(v).some(function (k) { return tokenLike(v[k]); });
    return typeof v === 'string' && (/^#[0-9a-f]{3,8}$/i.test(v) || !!parseDim(v));
  }

  function lint(text) {
    var doc = parse(text), T = doc.tokens, F = [];
    function add(severity, rule, path, message) { F.push({ severity: severity, rule: rule, path: path || '', message: message }); }

    if (doc.error) add('error', 'yaml', doc.errorLine ? 'ligne ' + doc.errorLine : '', 'Front matter illisible : ' + doc.error);
    if (!doc.hasFrontMatter) add('warning', 'missing-front-matter', '', "Pas de tokens en tête de fichier : les agents n'auront que la prose.");
    else if (!doc.error && !T.name) add('warning', 'missing-name', 'name', 'Le front matter ne donne pas de name.');

    var colors = isMap(T.colors) ? T.colors : {}, typo = isMap(T.typography) ? T.typography : {};
    var rounded = isMap(T.rounded) ? T.rounded : {}, spacing = isMap(T.spacing) ? T.spacing : {};
    var comps = isMap(T.components) ? T.components : {};
    ['colors', 'typography', 'rounded', 'spacing', 'components'].forEach(function (k) {
      if (has(T, k) && T[k] !== null && !isMap(T[k])) add('error', 'invalid-group', k, k + ' doit être une table.');
    });

    Object.keys(T).forEach(function (k) {
      if (KEYS.indexOf(k) >= 0) return;
      var near = KEYS.filter(function (x) { return lev(k.toLowerCase(), x) <= 2 || k.toLowerCase().replace(/[^a-z]/g, '') === x; })[0];
      if (near) add('warning', 'unknown-key', k, "Clé « " + k + " » inconnue : faute de frappe pour « " + near + " » ?");
      else if (tokenLike(T[k])) add('warning', 'token-like-ignored', k, "« " + k + " » contient des valeurs de tokens, mais la spec ne la lit pas : elles seront ignorées.");
    });

    /* valeurs */
    function checkColor(path, v) {
      if (v == null) { add('error', 'invalid-value', path, 'Couleur vide (une couleur hex se met entre guillemets : "#0B0B0D").'); return; }
      if (isRef(v)) return;
      if (parseColor(v)) return;
      if (otherCssColor(v)) { add('info', 'unchecked-color', path, 'Couleur « ' + v + ' » acceptée par la spec, mais le vault ne sait pas en calculer le contraste.'); return; }
      add('error', 'invalid-value', path, 'Couleur invalide : ' + JSON.stringify(v) + '.');
    }
    function checkDim(path, v, allowNumber) {
      if (isRef(v)) return;
      if (allowNumber && typeof v === 'number') return;
      if (!parseDim(v)) add('error', 'invalid-value', path, 'Dimension invalide : ' + JSON.stringify(v) + ' (attendu : un nombre suivi de px, em ou rem).');
    }
    Object.keys(colors).forEach(function (k) { checkColor('colors.' + k, colors[k]); });
    Object.keys(typo).forEach(function (k) {
      var t = typo[k], p = 'typography.' + k;
      if (!isMap(t)) { add('error', 'invalid-value', p, 'Un niveau typographique est une table (fontFamily, fontSize…).'); return; }
      Object.keys(t).forEach(function (q) {
        if (TYPO_PROPS.indexOf(q) < 0) add('warning', 'unknown-property', p + '.' + q, 'Propriété typographique inconnue : ' + q + '.');
      });
      if (has(t, 'fontSize')) checkDim(p + '.fontSize', t.fontSize);
      if (has(t, 'letterSpacing')) checkDim(p + '.letterSpacing', t.letterSpacing);
      if (has(t, 'lineHeight')) checkDim(p + '.lineHeight', t.lineHeight, true);
      if (has(t, 'fontWeight') && !isRef(t.fontWeight)) {
        var w = Number(t.fontWeight);
        if (!(w >= 1 && w <= 1000)) add('error', 'invalid-value', p + '.fontWeight', 'fontWeight doit être un nombre entre 1 et 1000.');
      }
      if (has(t, 'fontFamily') && typeof t.fontFamily !== 'string') add('error', 'invalid-value', p + '.fontFamily', 'fontFamily doit être une chaîne.');
      var miss = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'].filter(function (q) { return !has(t, q); });
      if (miss.length) add('info', 'incomplete-typography', p, 'Il manque ' + miss.join(', ') + ' : le format W3C demande les cinq.');
    });
    Object.keys(rounded).forEach(function (k) { checkDim('rounded.' + k, rounded[k]); });
    Object.keys(spacing).forEach(function (k) {
      var v = spacing[k];
      if (typeof v === 'number' || isRef(v) || parseDim(v)) return;
      add('info', 'unchecked-spacing', 'spacing.' + k, 'Valeur gardée telle quelle (ni dimension ni nombre) : ' + JSON.stringify(v) + '.');
    });
    Object.keys(comps).forEach(function (c) {
      var o = comps[c], p = 'components.' + c;
      if (!isMap(o)) { add('error', 'invalid-value', p, 'Un composant est une table de propriétés.'); return; }
      Object.keys(o).forEach(function (q) {
        if (COMP_PROPS.indexOf(q) < 0) add('warning', 'unknown-property', p + '.' + q, "Propriété de composant inconnue : « " + q + " ». Valides : " + COMP_PROPS.join(', ') + '.');
        else if (q === 'backgroundColor' || q === 'textColor') checkColor(p + '.' + q, o[q]);
        else if (q !== 'typography') checkDim(p + '.' + q, o[q]);
      });
    });

    /* références */
    function walk(o, path, fn) {
      if (isMap(o)) Object.keys(o).forEach(function (k) { walk(o[k], path ? path + '.' + k : k, fn); });
      else fn(o, path);
    }
    ['colors', 'typography', 'rounded', 'spacing', 'components'].forEach(function (g) {
      if (!isMap(T[g])) return;
      walk(T[g], g, function (v, path) {
        var target = refPath(v);
        if (!target) return;
        var r = resolve(T, v);
        if (r === undefined) { add('error', 'broken-ref', path, 'Référence cassée : ' + v + '.'); return; }
        var compTypo = /^components\.[^.]+\.typography$/.test(path);
        if (isMap(r) && !compTypo) add('error', 'broken-ref', path, v + ' désigne un groupe, pas une valeur.');
        if (compTypo && !(isMap(r) && /^typography\./.test(target))) add('error', 'broken-ref', path, v + " n'est pas un niveau typographique.");
        if (/\.(backgroundColor|textColor)$/.test(path) && !/^colors\./.test(target)) add('error', 'broken-ref', path, v + " n'est pas une couleur.");
      });
    });

    var nColors = Object.keys(colors).length;
    if (nColors && !has(colors, 'primary')) add('warning', 'missing-primary', 'colors', "Pas de couleur primary : les agents en inventeront une.");
    if (nColors && !Object.keys(typo).length) add('warning', 'missing-typography', 'typography', 'Des couleurs mais aucune typographie : les agents prendront les polices par défaut.');
    var omitted = (Array.isArray(T.omitted) ? T.omitted : []).map(function (o) { return isMap(o) ? o.section : o; });
    if (nColors || Object.keys(typo).length) ['spacing', 'rounded'].forEach(function (g) {
      if (!has(T, g) && omitted.indexOf(g) < 0) add('info', 'missing-sections', g, 'Pas de ' + g + ' : ajoute-le, ou déclare-le dans omitted.');
    });
    omitted.forEach(function (o) {
      if (['colors', 'typography', 'rounded', 'spacing', 'components'].indexOf(o) < 0 && !canonical(o)) add('info', 'omitted-rules', 'omitted', 'omitted cite une section inconnue : ' + o + '.');
      else if (has(T, o)) add('info', 'omitted-rules', 'omitted', o + ' est déclaré omis mais présent.');
    });

    /* contrastes des composants */
    Object.keys(comps).forEach(function (c) {
      var o = comps[c];
      if (!isMap(o) || !has(o, 'backgroundColor') || !has(o, 'textColor')) return;
      var bg = resolve(T, o.backgroundColor), fg = resolve(T, o.textColor);
      var x = contrast(fg, bg);
      if (x !== null && x < AA) add('warning', 'contrast-ratio', 'components.' + c,
        'textColor (' + fg + ') sur backgroundColor (' + bg + ') : ' + ratio(x) + ', sous le minimum WCAG AA de 4,5:1.');
    });

    /* couleurs jamais utilisées par un composant (directement ou par alias) */
    var used = {};
    function mark(v) {
      var seen = 0, p;
      while ((p = refPath(v)) && seen++ < 20) {
        if (/^colors\./.test(p)) used[p.slice(7)] = true;
        v = get(T, p);
      }
    }
    Object.keys(comps).forEach(function (c) { if (isMap(comps[c])) Object.keys(comps[c]).forEach(function (q) { mark(comps[c][q]); }); });
    Object.keys(colors).forEach(function (k) {
      if (!used[k]) add('warning', 'orphaned-tokens', 'colors.' + k, '« ' + k + " » n'est utilisée par aucun composant.");
    });

    /* sections */
    var seen = {}, order = SECTIONS.map(function (s) { return s.name; }), last = -1, lastName = '';
    doc.sections.forEach(function (s) {
      if (!s.key) return;
      if (seen[s.key]) add('error', 'duplicate-section', 'ligne ' + s.line, 'Section « ' + s.key + ' » en double : la spec rejette le fichier.');
      seen[s.key] = true;
      var i = order.indexOf(s.key);
      if (i < last) add('warning', 'section-order', 'ligne ' + s.line, 'Section « ' + s.key + ' » placée après « ' + lastName + ' ». Ordre attendu : ' + order.join(', ') + '.');
      else { last = i; lastName = s.key; }
    });

    /* règle du vault : chaque couleur a sa raison dans la prose */
    if (nColors) {
      var cs = section(doc, 'Colors');
      if (!cs) add('warning', 'undocumented-color', 'colors', 'Pas de section Colors : les couleurs ont des valeurs mais pas de raison.');
      else Object.keys(colors).forEach(function (k) {
        var v = colors[k];
        if (isRef(v) || typeof v !== 'string') return;
        var low = cs.text.toLowerCase();
        if (low.indexOf(v.toLowerCase()) < 0 && low.indexOf('`' + k.toLowerCase() + '`') < 0)
          add('warning', 'undocumented-color', 'colors.' + k, '« ' + k + ' » (' + v + ") n'est pas expliquée dans la section Colors.");
      });
    }

    add('info', 'token-summary', '', nColors + ' couleurs, ' + Object.keys(typo).length + ' niveaux typographiques, '
      + Object.keys(rounded).length + ' rayons, ' + Object.keys(spacing).length + ' espacements, ' + Object.keys(comps).length + ' composants.');

    var sum = { errors: 0, warnings: 0, infos: 0 };
    F.forEach(function (f) { sum[f.severity === 'error' ? 'errors' : f.severity === 'warning' ? 'warnings' : 'infos']++; });
    return { findings: F, summary: sum, doc: doc };
  }

  /* contrastes de tous les composants, pour l'affichage */
  function pairs(T) {
    var comps = isMap(T.components) ? T.components : {};
    return Object.keys(comps).filter(function (c) {
      return isMap(comps[c]) && has(comps[c], 'backgroundColor') && has(comps[c], 'textColor');
    }).map(function (c) {
      var bg = resolve(T, comps[c].backgroundColor), fg = resolve(T, comps[c].textColor), x = contrast(fg, bg);
      return { name: c, bg: bg, fg: fg, ratio: x, ok: x !== null && x >= AA };
    });
  }

  /* ---------- exports ---------- */
  function round(x, n) { var p = Math.pow(10, n || 4); return Math.round(x * p) / p; }
  function dtcgColor(v) {
    var c = parseColor(v);
    if (!c) return null;
    var out = c.oklch ? { colorSpace: 'oklch', components: c.oklch.slice() }
      : { colorSpace: 'srgb', components: [round(c.r / 255), round(c.g / 255), round(c.b / 255)] };
    if (c.a < 1) out.alpha = round(c.a);
    out.hex = hex(c);
    return out;
  }
  function dtcgDim(v) { var d = parseDim(v); return d && d.unit !== 'em' ? { value: d.value, unit: d.unit } : null; }
  /* même nom de groupe que l'export officiel (color, typography, rounded, spacing) */
  var GROUP = { colors: 'color', typography: 'typography', rounded: 'rounded', spacing: 'spacing' };
  function dtcgRef(v) {
    var p = refPath(v);
    if (!p) return v;
    var parts = p.split('.');
    if (GROUP[parts[0]]) parts[0] = GROUP[parts[0]];
    return '{' + parts.join('.') + '}';
  }

  /* DESIGN.md → W3C Design Tokens (2025.10). Les em deviennent des px ou des rem calculés sur fontSize,
     les interlignes en px deviennent des ratios, les alias restent des références. */
  function toDTCG(T, meta) {
    meta = meta || {};
    var out = { $schema: 'https://www.designtokens.org/schemas/2025.10/format.json' };
    if (meta.description || T.name) out.$description = meta.description || T.name;
    var problems = [];
    if (isMap(T.colors)) {
      out.color = { $type: 'color' };
      Object.keys(T.colors).forEach(function (k) {
        var v = T.colors[k];
        if (isRef(v)) out.color[k] = { $value: dtcgRef(v) };
        else { var c = dtcgColor(v); if (c) out.color[k] = { $value: c }; else problems.push('colors.' + k); }
      });
    }
    if (isMap(T.typography)) {
      out.typography = { $type: 'typography' };
      Object.keys(T.typography).forEach(function (k) {
        var t = T.typography[k], v = {};
        if (!isMap(t)) return;
        var size = parseDim(resolve(T, t.fontSize));
        if (t.fontFamily != null) {
          var fam = String(t.fontFamily).split(',').map(function (s) { return s.trim().replace(/^["']|["']$/g, ''); }).filter(Boolean);
          v.fontFamily = fam.length > 1 ? fam : fam[0];
        }
        if (t.fontSize != null) v.fontSize = isRef(t.fontSize) ? dtcgRef(t.fontSize) : dtcgDim(t.fontSize);
        if (t.fontWeight != null) v.fontWeight = isRef(t.fontWeight) ? dtcgRef(t.fontWeight) : Number(t.fontWeight);
        if (t.letterSpacing != null) {
          var ls = parseDim(resolve(T, t.letterSpacing));
          if (ls && ls.unit === 'em' && size && size.unit !== 'em') v.letterSpacing = { value: round(ls.value * size.value), unit: size.unit };
          else if (ls && ls.unit !== 'em') v.letterSpacing = { value: ls.value, unit: ls.unit };
          else problems.push('typography.' + k + '.letterSpacing');
        }
        if (t.lineHeight != null) {
          var lh = resolve(T, t.lineHeight), lhd = parseDim(lh);
          if (typeof lh === 'number') v.lineHeight = lh;
          else if (lhd && lhd.unit === 'em') v.lineHeight = lhd.value;
          else if (lhd && size && lhd.unit === size.unit) v.lineHeight = round(lhd.value / size.value);
          else problems.push('typography.' + k + '.lineHeight');
        }
        out.typography[k] = { $value: v };
      });
    }
    ['rounded', 'spacing'].forEach(function (g) {
      if (!isMap(T[g])) return;
      out[g] = { $type: 'dimension' };
      Object.keys(T[g]).forEach(function (k) {
        var v = T[g][k];
        if (isRef(v)) out[g][k] = { $value: dtcgRef(v) };
        else if (typeof v === 'number') out[g][k] = { $type: 'number', $value: v };
        else { var d = dtcgDim(v); if (d) out[g][k] = { $value: d }; else problems.push(g + '.' + k); }
      });
    });
    if (isMap(T.components)) {
      out.component = {};
      Object.keys(T.components).forEach(function (c) {
        var o = T.components[c], g = {};
        if (!isMap(o)) return;
        Object.keys(o).forEach(function (q) {
          if (COMP_PROPS.indexOf(q) < 0) return;
          var v = o[q];
          if (isRef(v)) g[q] = { $value: dtcgRef(v) };
          else if (q === 'backgroundColor' || q === 'textColor') { var col = dtcgColor(v); if (col) g[q] = { $type: 'color', $value: col }; }
          else if (q !== 'typography') { var d = dtcgDim(v); if (d) g[q] = { $type: 'dimension', $value: d }; }
        });
        out.component[c] = g;
      });
    }
    if (meta.source) out.$extensions = { 'run.evey.design-vault': { source: meta.source, generator: 'tools/build.mjs' } };
    return { tokens: out, problems: problems };
  }

  /* variables CSS : couleurs sous leur nom (comme dans le code des projets), le reste préfixé */
  function cssName(k) { return String(k).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function toCSS(T) {
    var L = [];
    function v(x) { return isRef(x) ? 'var(--' + refVar(x) + ')' : x; }
    function refVar(x) {
      var p = refPath(x).split('.');
      return p[0] === 'colors' ? cssName(p[1]) : (p[0] === 'rounded' ? 'radius-' : p[0] === 'spacing' ? 'space-' : '') + cssName(p.slice(1).join('-'));
    }
    if (isMap(T.colors)) Object.keys(T.colors).forEach(function (k) { L.push('  --' + cssName(k) + ': ' + v(T.colors[k]) + ';'); });
    if (isMap(T.typography)) Object.keys(T.typography).forEach(function (k) {
      var t = T.typography[k], n = cssName(k);
      if (!isMap(t)) return;
      if (t.fontFamily) L.push('  --font-' + n + ': ' + String(t.fontFamily).split(',').map(function (f) {
        f = f.trim(); return /\s/.test(f) && !/^["']/.test(f) ? '"' + f + '"' : f; }).join(', ') + ';');
      if (t.fontSize) L.push('  --text-' + n + ': ' + v(t.fontSize) + ';');
      if (t.fontWeight != null) L.push('  --weight-' + n + ': ' + t.fontWeight + ';');
      if (t.lineHeight != null) L.push('  --leading-' + n + ': ' + t.lineHeight + ';');
      if (t.letterSpacing) L.push('  --tracking-' + n + ': ' + v(t.letterSpacing) + ';');
    });
    if (isMap(T.rounded)) Object.keys(T.rounded).forEach(function (k) { L.push('  --radius-' + cssName(k) + ': ' + v(T.rounded[k]) + ';'); });
    if (isMap(T.spacing)) Object.keys(T.spacing).forEach(function (k) { L.push('  --space-' + cssName(k) + ': ' + v(T.spacing[k]) + ';'); });
    return ':root {\n' + L.join('\n') + '\n}';
  }

  /* ---------- Markdown → HTML, pour afficher la prose sur le site ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function inline(s) {
    var codes = [];
    s = String(s).replace(/`([^`]+)`/g, function (_, c) { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = esc(s)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, t, u) {
        return /^(javascript|data):/i.test(u) ? t : '<a href="' + u + '"' + (/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>';
      })
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?![\w*])/g, '$1<i>$2</i>');
    return s.replace(/\u0000(\d+)\u0000/g, function (_, i) { return '<code>' + esc(codes[+i]) + '</code>'; });
  }
  function mdList(lines) {
    var items = [], pos = 0;
    lines.forEach(function (l) {
      var m = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/.exec(l);
      if (m) items.push({ ind: m[1].length, ord: /\d/.test(m[2]), text: m[3] });
      else if (items.length) items[items.length - 1].text += ' ' + l.trim();
    });
    function build(ind) {
      var ord = items[pos].ord, html = '';
      while (pos < items.length && items[pos].ind >= ind) {
        if (items[pos].ind > ind) { html = html.replace(/<\/li>$/, '') + build(items[pos].ind) + '</li>'; continue; }
        html += '<li>' + inline(items[pos].text) + '</li>';
        pos++;
      }
      return (ord ? '<ol>' : '<ul>') + html + (ord ? '</ol>' : '</ul>');
    }
    var out = '';
    while (pos < items.length) out += build(items[pos].ind);
    return out;
  }
  function mdTable(rows) {
    function cells(r) { return r.trim().replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); }); }
    var head = cells(rows[0]);
    return '<table><thead><tr>' + head.map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead><tbody>'
      + rows.slice(2).map(function (r) { return '<tr>' + cells(r).map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>'; }).join('')
      + '</tbody></table>';
  }
  function markdown(text) {
    var L = String(text || '').split(/\r?\n/), out = [], buf = [], i = 0;
    var LI = /^\s*([-*+]|\d+[.)])\s+/;
    function flush() { if (buf.length) out.push('<p>' + inline(buf.join(' ')) + '</p>'); buf = []; }
    while (i < L.length) {
      var l = L[i], h;
      if (/^\s*(```|~~~)/.test(l)) {
        flush();
        var f = l.trim().slice(0, 3), code = [];
        for (i++; i < L.length && L[i].trim().slice(0, 3) !== f; i++) code.push(L[i]);
        i++;
        out.push('<pre><code>' + esc(code.join('\n')) + '</code></pre>');
        continue;
      }
      if (/^\s*$/.test(l)) { flush(); i++; continue; }
      if ((h = /^(#{1,6})\s+(.*)$/.exec(l))) { flush(); var lv = Math.max(3, h[1].length); out.push('<h' + lv + '>' + inline(h[2]) + '</h' + lv + '>'); i++; continue; }
      if (/^\s*(---|\*\*\*)\s*$/.test(l)) { flush(); out.push('<hr>'); i++; continue; }
      if (/^\s*>/.test(l)) {
        flush();
        var q = [];
        while (i < L.length && /^\s*>/.test(L[i])) q.push(L[i++].replace(/^\s*>\s?/, ''));
        out.push('<blockquote>' + markdown(q.join('\n')) + '</blockquote>');
        continue;
      }
      if (/^\s*\|.*\|\s*$/.test(l) && i + 1 < L.length && /^\s*\|?\s*:?-{3,}/.test(L[i + 1])) {
        flush();
        var rows = [];
        while (i < L.length && /^\s*\|.*\|\s*$/.test(L[i])) rows.push(L[i++]);
        out.push(mdTable(rows));
        continue;
      }
      if (LI.test(l)) {
        flush();
        var items = [];
        while (i < L.length && (LI.test(L[i]) || (/^\s{2,}\S/.test(L[i]) && items.length))) items.push(L[i++]);
        out.push(mdList(items));
        continue;
      }
      buf.push(l.trim());
      i++;
    }
    flush();
    return out.join('\n');
  }

  /* ---------- un système de l'onglet Design systems → DESIGN.md ---------- */
  var ROLE = {
    bg: 'fond de page', surface: 'surfaces : cartes, panneaux', border: 'bordures et filets', line: 'filets et bordures',
    text: 'texte principal', ink: 'encre : titres et texte principal', 'text-muted': 'texte secondaire', muted: 'texte secondaire',
    accent: 'accent, réservé aux actions primaires', 'accent-hover': "accent au survol", signal: 'signal : surlignage et fonds de section, jamais du texte',
    gray: 'gris clair des fonds de section', detail: 'détails fins et filets', danger: 'erreurs et variations négatives', warn: 'avertissements'
  };
  function firstFamily(s) { return String(s || '').split(/\s*[\/+,]\s*/)[0].replace(/\s+pour\s.*$/, '').replace(/["']/g, '').trim(); }

  function fromSystem(s) {
    var vars = {};
    String(s.css || '').replace(/--([\w-]+)\s*:\s*([^;]+);/g, function (_, k, v) { vars[k] = v.trim(); });
    var colors = {}, rounded = {}, spacing = {}, typography = {}, components = {};
    Object.keys(vars).forEach(function (k) {
      var v = vars[k];
      if (/^#[0-9a-f]{3,8}$/i.test(v)) colors[k] = v.toUpperCase();
      else if (/^radius/.test(k)) rounded[k.replace(/^radius-?/, '') || 'md'] = v === '0' ? '0px' : v;
      else if (/^sp-/.test(k)) spacing[k] = v;
    });
    var text = colors.text ? 'text' : colors.ink ? 'ink' : null;
    var muted = colors['text-muted'] ? 'text-muted' : colors.muted ? 'muted' : null;
    var accent = colors.accent ? 'accent' : colors.signal ? 'signal' : null;
    var border = colors.border ? 'border' : colors.line ? 'line' : colors.detail ? 'detail' : null;
    var C = {};
    C.primary = '{colors.' + (accent && accent !== 'signal' ? accent : text || Object.keys(colors)[0]) + '}';
    Object.keys(colors).forEach(function (k) { C[k] = colors[k]; });

    var space = String(s.spacing || ''), m;
    if (!Object.keys(spacing).length) {
      if ((m = /(\d+)\s*px/.exec(space))) spacing.base = m[1] + 'px';
      if ((m = /sections?\s+(\d+)\s*px/i.exec(space))) spacing.section = m[1] + 'px';
      if ((m = /\/\s*(\d+)\s*px\s+mobile/i.exec(space))) spacing['section-mobile'] = m[1] + 'px';
    }
    if (!Object.keys(rounded).length && (m = /(\d+)\s*px/.exec(String(s.radius || '')))) rounded.md = m[1] + 'px';

    var head = firstFamily((vars['font-head'] || '').split(',')[0]) || firstFamily(s.headingFont);
    var body = firstFamily((vars['font-body'] || vars['font-ui'] || '').split(',')[0]) || firstFamily(s.bodyFont);
    var sizes = (String(s.scale || '').match(/\d+(\.\d+)?/g) || []).map(Number).filter(function (x) { return x >= 10; });
    if (sizes.length) {
      var bi = 0;
      sizes.forEach(function (x, i) { if (Math.abs(x - 16) < Math.abs(sizes[bi] - 16)) bi = i; });
      var up = ['display', 'headline-lg', 'headline-md', 'headline-sm', 'headline-xs'];
      sizes.forEach(function (x, i) {
        var name = i === bi ? 'body' : i < bi ? (bi - i === 1 ? 'caption' : 'caption-' + (bi - i)) : up[sizes.length - 1 - i];
        typography[name] = { fontFamily: i > bi ? head : body, fontSize: x + 'px' };
      });
    }

    if (colors.bg && text) components.page = { backgroundColor: '{colors.bg}', textColor: '{colors.' + text + '}', typography: typography.body ? '{typography.body}' : undefined };
    if (colors.bg && colors.ink && text !== 'ink') components.headline = { backgroundColor: '{colors.bg}', textColor: '{colors.ink}', typography: typography.display ? '{typography.display}' : undefined };
    if (colors.bg && muted) components['text-secondary'] = { backgroundColor: '{colors.bg}', textColor: '{colors.' + muted + '}' };
    if (colors.surface && text) components.card = { backgroundColor: '{colors.surface}', textColor: '{colors.' + text + '}', rounded: rounded.card ? '{rounded.card}' : rounded.md ? '{rounded.md}' : undefined };
    if (colors.surface && muted) components['card-secondary'] = { backgroundColor: '{colors.surface}', textColor: '{colors.' + muted + '}' };
    var btnBg = accent || text;
    if (btnBg) {
      var cands = Object.keys(colors).filter(function (k) { return k !== btnBg && !/hover/.test(k); });
      var best = cands.sort(function (a, b) { return (contrast(colors[b], colors[btnBg]) || 0) - (contrast(colors[a], colors[btnBg]) || 0); })[0];
      components['button-primary'] = { backgroundColor: '{colors.' + btnBg + '}', textColor: '{colors.' + best + '}',
        rounded: rounded.btn ? '{rounded.btn}' : rounded.md ? '{rounded.md}' : undefined };
      if (colors['accent-hover']) components['button-primary-hover'] = { backgroundColor: '{colors.accent-hover}', textColor: '{colors.' + best + '}' };
    }
    if (border) components.divider = { backgroundColor: '{colors.' + border + '}', height: '1px' };
    if (colors.gray && text) components.band = { backgroundColor: '{colors.gray}', textColor: '{colors.' + text + '}' };
    if (colors.signal && text) components.highlight = { backgroundColor: '{colors.signal}', textColor: '{colors.' + text + '}' };
    ['danger', 'warn'].forEach(function (k) { if (colors[k] && colors.bg) components['status-' + k] = { backgroundColor: '{colors.bg}', textColor: '{colors.' + k + '}' }; });
    Object.keys(components).forEach(function (c) { Object.keys(components[c]).forEach(function (q) { if (components[c][q] === undefined) delete components[c][q]; }); });
    /* primary doit servir à un composant, sinon il est orphelin : il remplace la première référence à sa cible */
    var target = C.primary, done = false;
    ['button-primary', 'page'].forEach(function (c) {
      if (done || !components[c]) return;
      Object.keys(components[c]).forEach(function (q) {
        if (!done && components[c][q] === target && q !== 'typography') { components[c][q] = '{colors.primary}'; done = true; }
      });
    });

    var T = { version: 'alpha', name: s.name, description: [s.mood, s.desc].filter(Boolean).join(' — ') };
    T.colors = C;
    if (Object.keys(typography).length) T.typography = typography;
    if (Object.keys(rounded).length) T.rounded = rounded;
    if (Object.keys(spacing).length) T.spacing = spacing;
    T.components = components;

    var interdits = (/Interdits\s*:\s*([^\n]+)/i.exec(s.prompt || '') || [])[1];
    var rules = String(s.rules || '').split(/\n/).map(function (r) { return r.replace(/^\s*-\s*/, '').trim(); }).filter(Boolean);
    var md = [
      '---', toYAML(T), '---', '',
      '# ' + s.name, '',
      '## Overview', '',
      [s.mood ? s.mood + '.' : '', s.desc || ''].join(' ').trim(), '',
      s.defaut ? '> **Défaut IA connu :** ' + s.defaut + '\n' : '',
      "Point de départ tiré de l'onglet Design systems du Design Vault. Avant de t'en servir, écris ici le sujet réel du projet (pour qui, pour quoi faire) et ce qui le rendra unique : un système générique appliqué tel quel donne une page générique.", '',
      '## Colors', '',
      Object.keys(colors).map(function (k) { return '- **' + k + ' (' + colors[k] + '):** ' + (ROLE[k] || 'rôle à préciser') + '.'; }).join('\n'), '',
      '`primary` désigne ' + C.primary.replace(/[{}]/g, '') + '.', '',
      '## Typography', '',
      '- **Titres :** ' + (s.headingFont || head), '- **Texte :** ' + (s.bodyFont || body), s.scale ? '- **Échelle :** ' + s.scale : '', '',
      '## Layout', '', s.spacing || 'À préciser.', '',
      '## Elevation & Depth', '', s.shadow || 'À préciser.', '',
      '## Shapes', '', s.radius ? 'Rayons : ' + s.radius + '.' : 'À préciser.', '',
      '## Components', '',
      Object.keys(components).map(function (c) {
        var o = components[c];
        return '- **' + c + '** : ' + Object.keys(o).map(function (q) { return q + ' ' + o[q]; }).join(', ');
      }).join('\n'), '',
      s.motion ? '### Mouvement\n\n' + s.motion + '\n' : '',
      "## Do's and Don'ts", '',
      rules.map(function (r) { return '- Do : ' + r.replace(/^./, function (c) { return c.toLowerCase(); }); }).join('\n'),
      interdits ? interdits.replace(/\.$/, '').split(/,\s*/).map(function (x) { return "- Don't : " + x.trim(); }).join('\n') : ''
    ];
    return md.filter(function (x, i, a) { return !(x === '' && a[i - 1] === ''); }).join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  }

  root.DesignMD = {
    SECTIONS: SECTIONS, COMPONENT_PROPS: COMP_PROPS,
    parse: parse, parseYAML: parseYAML, toYAML: toYAML, section: section, canonical: canonical,
    resolve: resolve, isRef: isRef, parseColor: parseColor, toHex: hex, parseDim: parseDim, contrast: contrast, ratio: ratio,
    colorNotes: colorNotes, lint: lint, pairs: pairs,
    toDTCG: toDTCG, toCSS: toCSS, markdown: markdown, inline: inline, esc: esc, fromSystem: fromSystem
  };
})(typeof window !== 'undefined' ? window : this);
