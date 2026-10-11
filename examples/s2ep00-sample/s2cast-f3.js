/* S2 cast, F3 Pill Flat: copied from qa/cast-design/flat-sheets.html by extract_f3.py. Do not edit by hand. */
(function () {
  var g = null, INK = '#1F2340', F1 = '"Plus Jakarta Sans", Inter, sans-serif', F2 = 'Inter, "Plus Jakarta Sans", sans-serif';
  function envShadow(gg, x, y, rx, ry, a) { var r = gg.createRadialGradient(x, y, 0, x, y, rx); r.addColorStop(0, 'rgba(20,30,60,' + (a == null ? .22 : a) + ')'); r.addColorStop(1, 'rgba(20,30,60,0)'); gg.save(); gg.translate(x, y); gg.scale(1, ry / rx); gg.translate(-x, -y); gg.fillStyle = r; gg.beginPath(); gg.arc(x, y, rx, 0, Math.PI * 2); gg.fill(); gg.restore(); }
function rgb(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
function shade(h, k) { return 'rgb(' + rgb(h).map(function (v) { return Math.max(0, Math.min(255, Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k))); }).join(',') + ')'; }
function rr(x, y, w, h, r) { var p = new Path2D(); r = Math.max(0, Math.min(r, w / 2, h / 2)); p.moveTo(x + r, y); p.arcTo(x + w, y, x + w, y + h, r); p.arcTo(x + w, y + h, x, y + h, r); p.arcTo(x, y + h, x, y, r); p.arcTo(x, y, x + w, y, r); p.closePath(); return p; }
function ell(x, y, rx, ry) { var p = new Path2D(); p.ellipse(x, y, Math.abs(rx), Math.abs(ry), 0, 0, Math.PI * 2); return p; }
function txt(s, x, y, size, col, wt, al, fam) { g.font = (wt || 700) + ' ' + size + 'px ' + (fam || F1); g.fillStyle = col; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillText(s, x, y); }

var STY = [
  { key: 'F1', name: 'Rounded Flat', note: 'Soft rounded shapes, flat colour with a gentle shade side, dot eyes and small blush.', head: 0.22, hw: 0.92, body: 'round', limb: 0.1, face: 'dots', blush: true, line: 0, sideShade: 0.1, acc: '#3167CA' },
  { key: 'F2', name: 'Geometric Flat', note: 'Clean geometric blocks, straight edges, minimal faces. Corporate and very tidy.', head: 0.16, hw: 0.86, body: 'geo', limb: 0.095, face: 'mini', blush: false, line: 0, sideShade: 0.12, acc: '#21A366' },
  { key: 'F3', name: 'Pill Flat', note: 'Pill-shaped bodies, short legs, big round heads. The friendliest and the simplest to animate.', head: 0.33, hw: 1.0, body: 'pill', limb: 0.085, face: 'dots', blush: true, line: 0, sideShade: 0.08, acc: '#7B61FF' },
  { key: 'F4', name: 'Editorial Flat', note: 'Tall, elegant proportions and tone-on-tone line details (no black ink). Modern and stylish.', head: 0.135, hw: 0.84, body: 'tall', limb: 0.075, face: 'mini', blush: false, line: 2.6, sideShade: 0.0, acc: '#E8505B' }
];
var ST = STY[2];   /* F3 Pill Flat */
var CAST = [
  { id: 'maria', name: 'Maria', role: 'Accounts', tag: 'Accounts', skin: '#F2C6A0', hair: '#3B2A22', hairType: 'bob', top: '#1FA39A', inner: '#FFFFFF', bottom: '#2B3A67', skirt: true, shoe: '#B23A48', clip: '#FFD84A', prop: 'clipboard', pose: [0.3, 0.14], h: 0.92 },
  { id: 'ben', name: 'Ben', role: 'Warehouse lead', tag: 'Warehouse', skin: '#E9B48C', hair: '#BFC3CC', hairType: 'bald', top: '#7D8597', bottom: '#B8955F', vest: '#F28C28', shoe: '#6B4423', glasses: true, stache: true, belly: true, prop: 'thumb', pose: [0.15, 2.2], h: 0.95 },
  { id: 'jun', name: 'Jun', role: 'Sales', tag: 'Sales', skin: '#F5CBA7', hair: '#1E1E2A', hairType: 'spiky', top: '#8EC5FF', bottom: '#263559', tie: '#22335E', shoe: '#F4F6FA', prop: 'phone', pose: [0.18, 0.55], h: 0.97 },
  { id: 'lim', name: 'Mr. Lim', role: 'The Boss', tag: 'Director', skin: '#D9A27A', hair: '#2F2F35', hairType: 'part', top: '#22305A', inner: '#FFFFFF', bottom: '#22305A', tie: '#D7263D', shoe: '#1A1A22', jacket: true, prop: 'mug', pose: [0.2, 0.42], h: 1.0 }
];

/* flat paint: fill, an optional gentle shade side, optional tone-on-tone line (never black) */
function paint(p, col, bb, flat) {
  g.fillStyle = col; g.fill(p);
  if (ST.sideShade > 0 && !flat) { g.save(); g.clip(p); g.fillStyle = 'rgba(25,30,70,' + ST.sideShade + ')'; g.fillRect(bb[0] + bb[2] * 0.64, bb[1] - 4, bb[2], bb[3] + 8); g.restore(); }
  if (ST.line) { g.lineJoin = 'round'; g.lineWidth = ST.line; g.strokeStyle = shade(col, -0.32); g.stroke(p); }
}
function capsule(x1, y1, x2, y2, w, square) {
  var a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a) * w / 2, ny = Math.cos(a) * w / 2, p = new Path2D();
  if (square) { p.moveTo(x1 + nx, y1 + ny); p.lineTo(x2 + nx, y2 + ny); p.lineTo(x2 - nx, y2 - ny); p.lineTo(x1 - nx, y1 - ny); p.closePath(); }
  else { p.moveTo(x1 + nx, y1 + ny); p.lineTo(x2 + nx, y2 + ny); p.arc(x2, y2, w / 2, a + Math.PI / 2, a - Math.PI / 2, true); p.lineTo(x1 - nx, y1 - ny); p.arc(x1, y1, w / 2, a - Math.PI / 2, a + Math.PI / 2, true); p.closePath(); }
  return [p, [Math.min(x1, x2) - w / 2, Math.min(y1, y2) - w / 2, Math.abs(x2 - x1) + w, Math.abs(y2 - y1) + w]];
}

/* ---------------- head ---------------- */
function head(c, cx, cy, rx, ry, mood) {
  var geo = ST.body === 'geo';
  if (c.hairType === 'bob') { var bk = geo ? rr(cx - rx * 1.12, cy - ry * 1.08, rx * 2.24, ry * 1.72, rx * 0.5) : (function () { var p = new Path2D(); p.moveTo(cx - rx * 1.12, cy + ry * 0.62); p.lineTo(cx - rx * 1.14, cy - ry * 0.1); p.bezierCurveTo(cx - rx * 1.2, cy - ry * 1.32, cx + rx * 1.2, cy - ry * 1.32, cx + rx * 1.14, cy - ry * 0.1); p.lineTo(cx + rx * 1.12, cy + ry * 0.62); p.closePath(); return p; })();
    paint(bk, c.hair, [cx - rx * 1.2, cy - ry * 1.3, rx * 2.4, ry * 2], 1); }
  [-1, 1].forEach(function (s) { paint(ell(cx + s * rx * 0.96, cy + ry * 0.12, rx * 0.15, ry * 0.19), c.skin, [cx - rx, cy, rx * 2, ry * 0.4], 1); });
  var fp = geo ? rr(cx - rx, cy - ry, rx * 2, ry * 2, rx * 0.62) : ell(cx, cy, rx, ry); paint(fp, c.skin, [cx - rx, cy - ry, rx * 2, ry * 2], 1);
  if (c.hairType === 'bob') { var fr = new Path2D(); fr.moveTo(cx - rx * 1.05, cy + ry * 0.02); fr.bezierCurveTo(cx - rx * 1.14, cy - ry * 1.26, cx + rx * 1.14, cy - ry * 1.26, cx + rx * 1.05, cy + ry * 0.02); fr.quadraticCurveTo(cx + rx * 0.62, cy - ry * 0.46, cx + rx * 0.05, cy - ry * 0.46); fr.quadraticCurveTo(cx - rx * 0.55, cy - ry * 0.34, cx - rx * 1.05, cy + ry * 0.02); fr.closePath(); paint(fr, c.hair, [cx - rx * 1.1, cy - ry * 1.2, rx * 2.2, ry * 1.3], 1);
    g.fillStyle = c.clip; g.fill(rr(cx + rx * 0.42, cy - ry * 0.74, rx * 0.4, ry * 0.15, ry * 0.07)); }
  if (c.hairType === 'spiky') { var sp = new Path2D(), n = geo ? 5 : 6; sp.moveTo(cx - rx * 1.03, cy - ry * 0.05); for (var i = 0; i <= n; i++) { var u = i / n, a = Math.PI + u * Math.PI, bx = cx + Math.cos(a) * rx, by = cy - ry * 0.22 + Math.sin(a) * ry * 0.95, tx = cx + Math.cos(a) * rx * 1.3, ty = cy - ry * 0.18 + Math.sin(a) * ry * 1.32; if (i > 0) sp.lineTo(tx, ty); sp.lineTo(bx, by); } sp.lineTo(cx + rx * 1.03, cy - ry * 0.05); sp.quadraticCurveTo(cx + rx * 0.5, cy - ry * 0.48, cx, cy - ry * 0.42); sp.quadraticCurveTo(cx - rx * 0.6, cy - ry * 0.52, cx - rx * 1.03, cy - ry * 0.05); sp.closePath(); paint(sp, c.hair, [cx - rx * 1.3, cy - ry * 1.5, rx * 2.6, ry * 1.5], 1); }
  if (c.hairType === 'bald') { [-1, 1].forEach(function (s) { var t = new Path2D(); t.moveTo(cx + s * rx * 0.74, cy - ry * 0.48); t.quadraticCurveTo(cx + s * rx * 1.16, cy - ry * 0.5, cx + s * rx * 1.08, cy + ry * 0.04); t.quadraticCurveTo(cx + s * rx * 0.96, cy - ry * 0.1, cx + s * rx * 0.9, cy - ry * 0.2); t.closePath(); g.fillStyle = c.hair; g.fill(t); });
    g.fillStyle = 'rgba(255,255,255,.3)'; g.fill(ell(cx - rx * 0.28, cy - ry * 0.66, rx * 0.26, ry * 0.09)); }
  if (c.hairType === 'part') { var pt = new Path2D(); pt.moveTo(cx - rx * 1.04, cy - ry * 0.02); pt.bezierCurveTo(cx - rx * 1.12, cy - ry * 1.25, cx + rx * 1.12, cy - ry * 1.25, cx + rx * 1.04, cy - ry * 0.02); pt.quadraticCurveTo(cx + rx * 0.9, cy - ry * 0.55, cx + rx * 0.3, cy - ry * 0.6); pt.quadraticCurveTo(cx - rx * 0.35, cy - ry * 0.75, cx - rx * 0.62, cy - ry * 0.48); pt.quadraticCurveTo(cx - rx * 0.85, cy - ry * 0.3, cx - rx * 1.04, cy - ry * 0.02); pt.closePath(); paint(pt, c.hair, [cx - rx * 1.1, cy - ry * 1.15, rx * 2.2, ry * 1.2], 1);
    [-1, 1].forEach(function (s) { var tp2 = new Path2D(); tp2.moveTo(cx + s * rx * 1.04, cy - ry * 0.04); tp2.quadraticCurveTo(cx + s * rx * 1.06, cy - ry * 0.4, cx + s * rx * 0.9, cy - ry * 0.56); tp2.lineTo(cx + s * rx * 0.86, cy - ry * 0.4); tp2.quadraticCurveTo(cx + s * rx * 0.96, cy - ry * 0.25, cx + s * rx * 0.96, cy - ry * 0.02); tp2.closePath(); g.fillStyle = '#A3A6B2'; g.fill(tp2); }); }
  /* face */
  var ex = rx * 0.38, ey = cy + ry * 0.1, er = rx * (ST.face === 'dots' ? 0.1 : 0.075);
  g.lineCap = 'round'; g.lineJoin = 'round';
  [-1, 1].forEach(function (s) { var x = cx + s * ex;
    if (mood === 'happy') { g.lineWidth = Math.max(2.5, rx * 0.075); g.strokeStyle = INK; g.beginPath(); g.arc(x, ey + er * 0.9, er * 1.3, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); return; }
    var k = mood === 'wow' ? 1.35 : 1; g.fillStyle = INK; g.fill(ell(x, ey, er * k, er * 1.25 * k));
    if (ST.face === 'dots') { g.fillStyle = '#FFFFFF'; g.fill(ell(x - er * 0.35, ey - er * 0.45, er * 0.32, er * 0.32)); } });
  var by = ey - ry * 0.32, bw = rx * 0.2; g.lineWidth = Math.max(2.5, rx * 0.06); g.strokeStyle = c.hairType === 'bald' ? '#9AA0AE' : shade(c.hair, -0.1);
  [-1, 1].forEach(function (s) { var x = cx + s * ex, tilt = mood === 'worried' ? 0.35 : 0, lift = mood === 'wow' ? -ry * 0.1 : 0; g.save(); g.translate(x, by + lift); g.rotate(s * tilt); g.beginPath(); g.moveTo(-bw, 1); g.lineTo(bw, 1); g.stroke(); g.restore(); });
  if (ST.blush) { g.fillStyle = 'rgba(255,120,140,.3)'; [-1, 1].forEach(function (s) { g.fill(ell(cx + s * rx * 0.62, cy + ry * 0.4, rx * 0.15, ry * 0.08)); }); }
  if (c.stache) { var ms = new Path2D(); ms.moveTo(cx - rx * 0.3, cy + ry * 0.48); ms.quadraticCurveTo(cx - rx * 0.15, cy + ry * 0.35, cx, cy + ry * 0.43); ms.quadraticCurveTo(cx + rx * 0.15, cy + ry * 0.35, cx + rx * 0.3, cy + ry * 0.48); ms.quadraticCurveTo(cx, cy + ry * 0.53, cx - rx * 0.3, cy + ry * 0.48); ms.closePath(); g.fillStyle = '#C9CCD3'; g.fill(ms); }
  var my = cy + ry * (c.stache ? 0.63 : 0.52), mw = rx * 0.22; g.strokeStyle = INK; g.lineWidth = Math.max(2.5, rx * 0.06);
  if (mood === 'happy') { var mp = new Path2D(); mp.moveTo(cx - mw, my - ry * 0.03); mp.quadraticCurveTo(cx, my + ry * 0.28, cx + mw, my - ry * 0.03); mp.closePath(); g.fillStyle = '#8A2B3E'; g.fill(mp); }
  else if (mood === 'worried') { g.beginPath(); g.moveTo(cx - mw * 0.9, my + ry * 0.04); g.quadraticCurveTo(cx, my - ry * 0.06, cx + mw * 0.9, my + ry * 0.04); g.stroke(); }
  else if (mood === 'wow') { g.fillStyle = '#8A2B3E'; g.fill(ell(cx, my + ry * 0.06, mw * 0.42, ry * 0.12)); }
  else { g.beginPath(); g.moveTo(cx - mw * 0.7, my); g.quadraticCurveTo(cx, my + ry * 0.11, cx + mw * 0.7, my); g.stroke(); }
  if (c.glasses) { g.lineWidth = Math.max(2.5, rx * 0.055); g.strokeStyle = '#3B3F55'; [-1, 1].forEach(function (s) { g.stroke(ell(cx + s * ex, ey, rx * 0.22, rx * 0.2)); }); g.beginPath(); g.moveTo(cx - ex + rx * 0.22, ey); g.lineTo(cx + ex - rx * 0.22, ey); g.stroke(); }
}

/* ---------------- figure ---------------- */
function figure(c, fx, fy, Hh) {
  var Ht = Hh * c.h, hh = Ht * ST.head, rx = hh * 0.5 * ST.hw, ry = hh * 0.5, cy = fy - Ht + ry, top = cy + ry * 0.86, rest = fy - top;
  var pill = ST.body === 'pill', geo = ST.body === 'geo', tall = ST.body === 'tall';
  var torsoH = rest * (pill ? 0.62 : tall ? 0.42 : 0.48), legH = rest - torsoH, tw = pill ? rx * 1.55 : geo ? rx * 2.0 : tall ? rx * 2.2 : rx * 1.85, hipY = top + torsoH, lw = Math.max(12, Ht * ST.limb);
  envShadow(g, fx, fy + 4, tw * 0.9, 16, 0.22);
  /* legs + shoes */
  [-1, 1].forEach(function (s) { var lx = fx + s * tw * (pill ? 0.2 : 0.22); var L = capsule(lx, hipY - lw * 0.3, lx, fy - lw * 0.4, lw, geo); paint(L[0], c.skirt ? c.skin : c.bottom, L[1]);
    var sh = geo ? rr(lx - lw * 0.55 + s * lw * 0.15, fy - lw * 0.55, lw * 1.2, lw * 0.55, 2) : rr(lx - lw * 0.6 + s * lw * 0.15, fy - lw * 0.6, lw * 1.25, lw * 0.6, lw * 0.3); paint(sh, c.shoe, [lx - lw, fy - lw * 0.6, lw * 2, lw * 0.6]); });
  if (c.skirt) { var sk = new Path2D(); sk.moveTo(fx - tw * 0.5, hipY - lw * 0.3); sk.lineTo(fx + tw * 0.5, hipY - lw * 0.3); sk.lineTo(fx + tw * 0.6, hipY + legH * 0.4); sk.lineTo(fx - tw * 0.6, hipY + legH * 0.4); sk.closePath(); paint(sk, c.bottom, [fx - tw * 0.6, hipY, tw * 1.2, legH * 0.4]); }
  var shY = top + torsoH * 0.1, al = torsoH * (pill ? 0.7 : 0.88) + legH * (tall ? 0.2 : 0.06);
  function arm(s, ang) { var a2 = ang > 1.2 ? al * 0.74 : al, sx = fx + s * tw * 0.46, ex2 = sx + Math.sin(ang) * a2 * s, ey2 = shY + Math.cos(ang) * a2, A = capsule(sx, shY, ex2, ey2, lw * 0.9, geo); paint(A[0], c.top, A[1]); var hp = geo ? rr(ex2 - lw * 0.45, ey2 - lw * 0.45, lw * 0.9, lw * 0.9, lw * 0.25) : ell(ex2, ey2, lw * 0.5, lw * 0.5); paint(hp, c.skin, [ex2 - lw / 2, ey2 - lw / 2, lw, lw], 1); return [ex2, ey2]; }
  var hl = arm(-1, c.pose[0]);
  /* torso */
  var tp; if (pill) tp = rr(fx - tw / 2, top - lw * 0.2, tw, torsoH + lw * 0.6, tw * 0.45);
  else if (geo) { tp = new Path2D(); tp.moveTo(fx - tw * 0.5, shY - lw * 0.2); tp.lineTo(fx + tw * 0.5, shY - lw * 0.2); tp.lineTo(fx + tw * 0.42 + (c.belly ? tw * 0.06 : 0), hipY + lw * 0.2); tp.lineTo(fx - tw * 0.42 - (c.belly ? tw * 0.06 : 0), hipY + lw * 0.2); tp.closePath(); }
  else { tp = new Path2D(); var bw = c.belly ? tw * 0.08 : 0; tp.moveTo(fx - tw * 0.5, shY - lw * 0.1); tp.quadraticCurveTo(fx, top - lw * 0.3, fx + tw * 0.5, shY - lw * 0.1); tp.lineTo(fx + tw * (tall ? 0.36 : 0.46) + bw, hipY); tp.quadraticCurveTo(fx, hipY + lw * 0.4 + bw, fx - tw * (tall ? 0.36 : 0.46) - bw, hipY); tp.closePath(); }
  paint(tp, c.top, [fx - tw / 2, top, tw, torsoH]);
  if (c.jacket || c.id === 'maria') { var v = new Path2D(); v.moveTo(fx - tw * 0.15, shY - lw * 0.15); v.lineTo(fx, shY + torsoH * 0.4); v.lineTo(fx + tw * 0.15, shY - lw * 0.15); v.closePath(); g.fillStyle = c.inner; g.fill(v); }
  if (c.tie) { var tie = new Path2D(); tie.moveTo(fx - tw * 0.045, shY - lw * 0.1); tie.lineTo(fx + tw * 0.045, shY - lw * 0.1); tie.lineTo(fx + tw * 0.07, shY + torsoH * 0.44); tie.lineTo(fx, shY + torsoH * 0.53); tie.lineTo(fx - tw * 0.07, shY + torsoH * 0.44); tie.closePath(); g.fillStyle = c.tie; g.fill(tie); }
  if (c.vest) { [-1, 1].forEach(function (s) { var vp = new Path2D(); vp.moveTo(fx + s * tw * 0.1, shY - lw * 0.15); vp.lineTo(fx + s * tw * 0.47, shY); vp.lineTo(fx + s * tw * 0.47, hipY); vp.lineTo(fx + s * tw * 0.1, hipY + lw * 0.1); vp.closePath(); g.fillStyle = c.vest; g.fill(vp); g.save(); g.clip(vp); g.fillStyle = '#F6F2E8'; g.fillRect(fx - tw, shY + torsoH * 0.56, tw * 2, torsoH * 0.08); g.fillRect(fx - tw, shY + torsoH * 0.74, tw * 2, torsoH * 0.08); g.restore(); }); }
  /* lanyard + ID card (name + role, never blank) */
  g.lineWidth = Math.max(2, lw * 0.1); g.strokeStyle = ST.acc; g.beginPath(); g.moveTo(fx - tw * 0.17, shY - lw * 0.1); g.lineTo(fx - tw * 0.05, shY + torsoH * 0.5); g.moveTo(fx + tw * 0.17, shY - lw * 0.1); g.lineTo(fx + tw * 0.05, shY + torsoH * 0.5); g.stroke();
  var cw2 = Math.max(60, tw * 0.56), chh = cw2 * 0.6, idc = rr(fx - cw2 / 2, shY + torsoH * 0.48, cw2, chh, 6); g.fillStyle = '#FFFFFF'; g.fill(idc); g.lineWidth = 1.5; g.strokeStyle = 'rgba(30,35,70,.18)'; g.stroke(idc);
  var nfs = Math.max(12, cw2 * 0.22); txt(c.name, fx, shY + torsoH * 0.48 + chh * 0.36, nfs, INK, 800, 'center'); txt(c.tag, fx, shY + torsoH * 0.48 + chh * 0.72, nfs * 0.74, ST.acc, 700, 'center', F2);
  var hr = arm(1, c.pose[1]);
  if (c.prop === 'clipboard') { var cb = rr(hl[0] - lw * 1.0, hl[1] - lw * 2.3, lw * 1.9, lw * 2.5, 4); paint(cb, '#F4E3C3', [hl[0] - lw, hl[1] - lw * 2.3, lw * 1.9, lw * 2.5]); g.fillStyle = '#AEB6C8'; for (var q = 0; q < 3; q++) g.fillRect(hl[0] - lw * 0.65, hl[1] - lw * 1.8 + q * lw * 0.48, lw * 1.25, Math.max(2, lw * 0.11)); }
  if (c.prop === 'mug') { var mx = hr[0] + lw * 0.1, my2 = hr[1] - lw * 0.95; g.lineWidth = Math.max(3, lw * 0.16); g.strokeStyle = '#3167CA'; g.beginPath(); g.arc(mx + lw * 0.62, my2 + lw * 0.5, lw * 0.26, -Math.PI / 2, Math.PI / 2); g.stroke();
    paint(rr(mx - lw * 0.62, my2, lw * 1.24, lw * 1.15, lw * 0.18), '#3167CA', [mx - lw, my2, lw * 2, lw], 1); g.fillStyle = '#FFFFFF'; g.fill(rr(mx - lw * 0.62, my2 + lw * 0.42, lw * 1.24, lw * 0.16, 2));
    g.strokeStyle = 'rgba(160,170,200,.7)'; g.lineWidth = Math.max(2.5, lw * 0.1); [-0.22, 0.2].forEach(function (o) { g.beginPath(); g.moveTo(mx + o * lw, my2 - lw * 0.15); g.bezierCurveTo(mx + o * lw - lw * 0.2, my2 - lw * 0.45, mx + o * lw + lw * 0.2, my2 - lw * 0.6, mx + o * lw, my2 - lw * 0.9); g.stroke(); }); paint(ell(hr[0], hr[1], lw * 0.5, lw * 0.5), c.skin, [0, 0, 0, 0], 1); }
  if (c.prop === 'thumb') { var th = capsule(hr[0], hr[1], hr[0], hr[1] - lw * 0.75, lw * 0.36); paint(th[0], c.skin, th[1]); }
  if (c.prop === 'phone') { paint(rr(hr[0] - lw * 0.42, hr[1] - lw * 1.15, lw * 0.84, lw * 1.4, 5), '#2C3550', [hr[0] - lw, hr[1] - lw, lw * 2, lw * 2]); g.fillStyle = '#9DD4FF'; g.fill(rr(hr[0] - lw * 0.32, hr[1] - lw * 1.02, lw * 0.64, lw * 1.05, 3)); }
  g.fillStyle = shade(c.skin, -0.12); g.fill(rr(fx - rx * 0.2, cy + ry * 0.7, rx * 0.4, top - cy - ry * 0.55, 4));
  head(c, fx, cy, rx, ry, c.mood || 'neutral');
}


  var byId = {}; CAST.forEach(function (c) { byId[c.id] = c; });
  window.F3 = { use: function (ctx) { g = ctx; }, figure: function () { return figure.apply(null, arguments); }, head: function () { return head.apply(null, arguments); }, cast: byId, INK: INK };
})();
