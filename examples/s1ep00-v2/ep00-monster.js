/* Spreadsheet Monster, copied from nexi-tutorial/web/films/pilot.js (EP00 pilot) by extract_monster.py. Do not edit by hand:
   re-run the script. Exposes window.EP00M = { monster(g, x, y, s), KJ }. Set window.T before drawing. */
(function () {
  var INK2 = '#0B1534', YEL = '#FFD84A';
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function hsh(i) { var s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
  function rrP(x, y, w, h, r) { var p = new Path2D(); r = Math.min(r, w / 2, h / 2); p.moveTo(x + r, y); p.arcTo(x + w, y, x + w, y + h, r); p.arcTo(x + w, y + h, x, y + h, r); p.arcTo(x, y + h, x, y, r); p.arcTo(x, y, x + w, y, r); p.closePath(); return p; }
  function ellP(x, y, rx, ry) { var p = new Path2D(); p.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); return p; }
  function polyP(pts) { var p = new Path2D(); pts.forEach(function (q, i) { if (i) p.lineTo(q[0], q[1]); else p.moveTo(q[0], q[1]); }); p.closePath(); return p; }
  function cel(gg, p, base, shade, dx, dy, lw) { gg.fillStyle = shade; gg.fill(p); gg.save(); gg.clip(p); gg.translate(-(dx || 10), -(dy || 10)); gg.fillStyle = base; gg.fill(p); gg.restore(); if (lw !== 0) { gg.lineJoin = 'round'; gg.lineWidth = lw || 6; gg.strokeStyle = INK2; gg.stroke(p); } }
  function starPts(cx, cy, rx, ry, n, inner, seed, rot) { var pts = []; for (var i = 0; i < n * 2; i++) { var a = i * Math.PI / n - Math.PI / 2 + (rot || 0), r = i % 2 ? inner * (0.92 + hsh(i + seed) * 0.16) : 0.88 + hsh(i * 3 + seed) * 0.24; pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]); } return pts; }
  var KJ = { a: 0, rise: 1, roar: 0, hit: 0, gone: 0, chomp: 0, s: 0.95, look: -1, kb: 0, up: 0, dizzy: 0, flinch: 0 };
  var MG = '#3FBF7F', MGS = '#258F5C', MGL = 'rgba(6,58,34,.36)', BEL = '#F2FBEA', BELS = '#C9E9BC';
  function fat(gg, segs, base, shade) {
    gg.save(); gg.lineCap = 'round'; gg.lineJoin = 'round';
    [[INK2, 14, 1, 0], [shade, 0, 1, 0], [base, 0, 0.64, 1]].forEach(function (ps) {
      segs.forEach(function (q) { var o = ps[3] ? q[4] * 0.12 : 0, p = new Path2D(); p.moveTo(q[0] - o, q[1] - o); p.lineTo(q[2] - o, q[3] - o); gg.strokeStyle = ps[0]; gg.lineWidth = q[4] * ps[2] + ps[1]; gg.stroke(p); }); });
    gg.restore();
  }
  function skinGrid(gg, p, x0, y0, x1, y1, step, col) { gg.save(); gg.clip(p); var gl = new Path2D(); for (var gx = x0; gx < x1; gx += step) { gl.moveTo(gx, y0); gl.lineTo(gx, y1); } for (var gy = y0; gy < y1; gy += step * 0.64) { gl.moveTo(x0, gy); gl.lineTo(x1, gy); } gg.strokeStyle = col || MGL; gg.lineWidth = 3; gg.stroke(gl); gg.restore(); }
  function claws(gg, x, y, ang, s) { gg.save(); gg.translate(x, y); gg.rotate(ang); [-1, 0, 1].forEach(function (k) { var c = polyP([[0, k * 20 * s - 9 * s], [38 * s, k * 25 * s], [0, k * 20 * s + 9 * s]]); gg.fillStyle = '#FFF6DA'; gg.fill(c); gg.lineWidth = 4; gg.lineJoin = 'round'; gg.strokeStyle = INK2; gg.stroke(c); }); gg.restore(); }
  function paw(gg, x, y, ang) { cel(gg, ellP(x, y, 46, 40), MG, MGS, 10, 8, 6); claws(gg, x + Math.cos(ang) * 34, y + Math.sin(ang) * 34, ang, 1); }
  function pencil(gg, x, y, rot, len) {
    gg.save(); gg.translate(x, y); gg.rotate(rot); var b = rrP(-12, -len, 24, len, 3); cel(gg, b, '#FFD84A', '#E0AE1E', 7, 0, 4);
    var er = rrP(-12, -8, 24, 20, 5); gg.fillStyle = '#FF9DB0'; gg.fill(er); gg.lineWidth = 4; gg.strokeStyle = INK2; gg.stroke(er);
    var tip = polyP([[-12, -len], [0, -len - 36], [12, -len]]); gg.fillStyle = '#F4D6A6'; gg.fill(tip); gg.stroke(tip); gg.fillStyle = INK2; gg.fill(polyP([[-4, -len - 24], [0, -len - 36], [4, -len - 24]])); gg.restore();
  }
  function sheetSpike(gg, x, y, rot, w, h, col, glow) {
    gg.save(); gg.translate(x, y); gg.rotate(rot); var p = polyP([[-w / 2, 6], [-w / 2, -h], [w / 2 - 18, -h], [w / 2, -h + 18], [w / 2, 6]]);
    if (glow > 0.01) { gg.shadowColor = 'rgba(170,255,210,' + glow + ')'; gg.shadowBlur = 34; } gg.fillStyle = col; gg.fill(p); gg.shadowBlur = 0;
    gg.lineJoin = 'round'; gg.lineWidth = 5; gg.strokeStyle = INK2; gg.stroke(p); var dog = polyP([[w / 2 - 18, -h], [w / 2 - 18, -h + 18], [w / 2, -h + 18]]); gg.fillStyle = 'rgba(0,0,0,.12)'; gg.fill(dog); gg.lineWidth = 3; gg.stroke(dog);
    var ln = new Path2D(); for (var yy = -h + 26; yy < -6; yy += 16) { ln.moveTo(-w / 2 + 9, yy); ln.lineTo(w / 2 - 12, yy); } gg.strokeStyle = 'rgba(31,31,61,.22)'; gg.lineWidth = 3; gg.stroke(ln); gg.restore();
  }
  function monster(gg, x, y, s) {
    var t = window.T, br = Math.sin(t * 2), rr = KJ.roar, ch = KJ.chomp, hit = KJ.hit, kb = KJ.kb, up = KJ.up, dz = KJ.dizzy, fl = KJ.flinch, flail = Math.max(hit, fl, up), wob = Math.sin(t * 14) * 18 * flail;
    var shk = (hit > 0.01 ? Math.sin(t * 60) * 12 * hit : 0) + Math.sin(t * 40) * 4 * rr + Math.sin(t * 70) * 10 * fl, sy = (1 - KJ.rise) * 800;
    gg.save(); gg.translate(x + shk + kb * 70, y + sy - up * 30); gg.scale(s, s);
    gg.fillStyle = 'rgba(0,0,20,.35)'; gg.fill(ellP(40, 0, 320, 32));
    gg.rotate(kb * 0.08 + Math.sin(t * 5) * 0.03 * dz);
    /* the tail, behind everything */
    var sw = Math.sin(t * 2) * 26, sw2 = Math.sin(t * 2 - 0.8) * 40;
    fat(gg, [[110, -170, 290, -112, 124], [290, -112, 412, -150 + sw * 0.4, 90], [412, -150 + sw * 0.4, 472 + sw * 0.3, -252 + sw, 62], [472 + sw * 0.3, -252 + sw, 448 + sw2 * 0.5, -334 + sw2 * 0.3, 36]], MG, MGS);
    /* the back leg and the back arm */
    fat(gg, [[96, -150, 114, -80, 94], [114, -80, 120, -24, 80]], MG, MGS); cel(gg, ellP(104, -14, 70, 26), MG, MGS, 8, 6, 6); claws(gg, 38, -14, Math.PI, 0.9);
    var be = [lerp(lerp(240, 262, rr), 252, flail), lerp(lerp(-362, -540, rr), -585, flail) + br * 5], bh = [lerp(lerp(292, 300, rr), 335 + wob, flail), lerp(lerp(-452, -684, rr), -705, flail) + br * 7];
    fat(gg, [[140, -450, be[0], be[1], 80], [be[0], be[1], bh[0], bh[1], 64]], MG, MGS); paw(gg, bh[0], bh[1], Math.atan2(bh[1] - be[1], bh[0] - be[0]));
    /* sticky-note plates down its back: they glow when it roars */
    [[92, -578, 0.35, '#FFE36E'], [170, -502, 0.75, '#FFFFFF'], [216, -406, 1.05, '#FFB3C1'], [234, -306, 1.3, '#BFE3FF'], [216, -206, 1.55, '#FFE36E']].forEach(function (q, i) { sheetSpike(gg, q[0], q[1], q[2] + Math.sin(t * 3 + i) * 0.04, 66, 98 - i * 6, q[3], 0.6 * rr); });
    /* the body: a hunched pear with a paper belly; spreadsheet skin; moonlight on its back */
    var body = new Path2D(); body.moveTo(-178, -140); body.bezierCurveTo(-238, -262, -228, -432, -150, -520); body.bezierCurveTo(-88, -594, 64, -604, 134, -532); body.bezierCurveTo(218, -452, 238, -282, 182, -170); body.bezierCurveTo(150, -112, 60, -92, -30, -96); body.bezierCurveTo(-110, -100, -162, -114, -178, -140); body.closePath();
    gg.save(); gg.translate(0, -300); gg.scale(1 + br * 0.012, 1 - br * 0.012); gg.translate(0, 300);
    cel(gg, body, MG, MGS, 36, 8, 0); skinGrid(gg, body, -250, -620, 250, -80, 46);
    gg.save(); gg.clip(body); var bel = ellP(-92, -300, 118, 168); gg.fillStyle = BELS; gg.fill(bel); gg.save(); gg.clip(bel); gg.translate(-12, -10); gg.fillStyle = BEL; gg.fill(bel); gg.restore();
    gg.save(); gg.clip(bel); var bg = new Path2D(); for (var gx = -210; gx < 30; gx += 44) { bg.moveTo(gx, -470); bg.lineTo(gx, -130); } for (var gy = -460; gy < -130; gy += 30) { bg.moveTo(-210, gy); bg.lineTo(30, gy); } gg.strokeStyle = 'rgba(37,143,92,.4)'; gg.lineWidth = 3; gg.stroke(bg);
    [[-166, -400, '#FFE36E'], [-78, -340, '#FFB3C1'], [-122, -250, '#FF6B7A'], [-34, -220, '#BFE3FF']].forEach(function (c) { gg.fillStyle = c[2]; gg.fill(rrP(c[0] + 3, c[1] + 3, 38, 24, 3)); }); gg.restore();
    gg.lineWidth = 5; gg.strokeStyle = 'rgba(37,143,92,.55)'; gg.stroke(bel);
    gg.translate(-12, 14); gg.strokeStyle = 'rgba(205,255,230,.5)'; gg.lineWidth = 14; gg.stroke(body); gg.restore();
    gg.lineJoin = 'round'; gg.lineWidth = 7; gg.strokeStyle = INK2; gg.stroke(body); gg.restore();
    /* the front leg */
    fat(gg, [[-96, -150, -122, -80, 98], [-122, -80, -140, -24, 84]], MG, MGS); cel(gg, ellP(-150, -14, 76, 28), MG, MGS, 8, 6, 6); claws(gg, -218, -14, Math.PI, 1);
    /* the head: pivots at the neck; it snaps back on the uppercut and wobbles when dizzy */
    var hr = 0.22 * rr + 0.5 * up - 0.12 * ch - 0.15 * fl + Math.sin(t * 6) * 0.12 * dz + br * 0.02;
    gg.save(); gg.translate(-60, -545 + br * 3); gg.rotate(hr);
    pencil(gg, -122, -172, -0.45, 86); pencil(gg, -30, -186, 0.12, 78);
    var mo = 6 + rr * 62 + ch * 48 + hit * 34 + up * 44, ja = -mo * 0.0042;
    gg.fillStyle = '#4A0B1C'; gg.fill(ellP(-90, -44 + mo * 0.42, 120, 10 + mo * 0.5));
    var tu = new Path2D(); for (var i = 0; i < 7; i++) { var tx = -190 + i * 32; tu.moveTo(tx - 11, -52); tu.lineTo(tx, -28); tu.lineTo(tx + 11, -52); } gg.fillStyle = '#FFFFFF'; gg.fill(tu); gg.lineWidth = 3; gg.strokeStyle = INK2; gg.stroke(tu);
    if (mo > 20) { gg.fillStyle = '#FF6B7A'; gg.fill(ellP(-100, -40 + mo * 0.74, 62, 14 + mo * 0.12)); }
    gg.save(); gg.translate(55, -35); gg.rotate(ja); gg.translate(-55, 35);
    var tl = new Path2D(); for (var j = 0; j < 6; j++) { var bx = -175 + j * 34; tl.moveTo(bx - 10, -44); tl.lineTo(bx, -66); tl.lineTo(bx + 10, -44); } gg.fillStyle = '#FFFFFF'; gg.fill(tl); gg.lineWidth = 3; gg.strokeStyle = INK2; gg.stroke(tl);
    var jaw = new Path2D(); jaw.moveTo(-205, -52); jaw.quadraticCurveTo(-90, -36, 28, -48); jaw.lineTo(62, -30); jaw.bezierCurveTo(72, 0, 20, 34, -60, 32); jaw.bezierCurveTo(-150, 30, -205, 6, -212, -30); jaw.closePath();
    cel(gg, jaw, MG, MGS, 0, -12, 7); skinGrid(gg, jaw, -220, -60, 80, 40, 40); gg.restore();
    var hd = new Path2D(); hd.moveTo(-208, -54); hd.bezierCurveTo(-236, -92, -228, -152, -172, -176); hd.bezierCurveTo(-110, -206, 12, -202, 62, -150); hd.bezierCurveTo(98, -110, 94, -58, 62, -30); hd.lineTo(28, -48); hd.quadraticCurveTo(-90, -38, -208, -54); hd.closePath();
    cel(gg, hd, MG, MGS, 24, 0, 0); skinGrid(gg, hd, -240, -210, 100, -30, 40); gg.save(); gg.clip(hd); gg.translate(-10, 12); gg.strokeStyle = 'rgba(205,255,230,.45)'; gg.lineWidth = 12; gg.stroke(hd); gg.restore(); gg.lineJoin = 'round'; gg.lineWidth = 7; gg.strokeStyle = INK2; gg.stroke(hd);
    [-172, -44].forEach(function (fx) { var fp = polyP([[fx - 10, -52], [fx, -16], [fx + 10, -52]]); gg.fillStyle = '#FFFFFF'; gg.fill(fp); gg.lineWidth = 3; gg.strokeStyle = INK2; gg.stroke(fp); });
    gg.fillStyle = INK2; gg.fill(ellP(-214, -112, 5, 8)); gg.fill(ellP(-198, -104, 4, 7));
    var lk = KJ.look * 6;
    [[-150, -118, 0.95], [-62, -126, 1]].forEach(function (e) {
      gg.save(); gg.translate(e[0], e[1]); gg.scale(e[2], e[2]); gg.lineCap = 'round'; gg.lineJoin = 'round';
      if (dz > 0.5) { gg.fillStyle = '#FFFFFF'; gg.fill(ellP(0, 0, 30, 30)); var sp = new Path2D(); for (var a = 0; a < 14; a += 0.3) { var r = a * 2.0, px = Math.cos(a + t * 8) * r, py = Math.sin(a + t * 8) * r; if (a) sp.lineTo(px, py); else sp.moveTo(px, py); } gg.strokeStyle = INK2; gg.lineWidth = 4; gg.stroke(sp); gg.lineWidth = 5; gg.stroke(ellP(0, 0, 30, 30)); }
      else if (fl > 0.4 || hit > 0.4 || up > 0.4) { var sq = new Path2D(); sq.moveTo(-24, -14); sq.lineTo(12, 0); sq.lineTo(-24, 14); gg.strokeStyle = INK2; gg.lineWidth = 9; gg.stroke(sq); }
      else { var ey = new Path2D(); ey.moveTo(-34, 4); ey.quadraticCurveTo(-4, -30 - rr * 6, 34, -8); ey.quadraticCurveTo(10, 26, -34, 4); ey.closePath();
        gg.save(); gg.shadowColor = 'rgba(255,225,74,.95)'; gg.shadowBlur = 24; gg.fillStyle = '#FFE14A'; gg.fill(ey); gg.restore();
        gg.save(); gg.clip(ey); gg.fillStyle = '#F28C28'; gg.fill(ellP(lk, 0, 16, 20)); gg.fillStyle = INK2; gg.fill(ellP(lk, -2, 5, 16 - rr * 4)); gg.restore(); gg.lineWidth = 6; gg.strokeStyle = INK2; gg.stroke(ey); }
      var bw = new Path2D(); bw.moveTo(-40, -30 + rr * 4); bw.lineTo(36, -46 - rr * 6); gg.strokeStyle = INK2; gg.lineWidth = 14; gg.stroke(bw); gg.restore(); });
    if (dz > 0.01) { gg.save(); gg.globalAlpha *= dz; for (var k = 0; k < 4; k++) { var an = t * 4 + k * Math.PI / 2, stx = -80 + Math.cos(an) * 130, sty = -250 + Math.sin(an) * 32, st = polyP(starPts(stx, sty, 24, 24, 5, 0.45, k)); gg.fillStyle = YEL; gg.fill(st); gg.lineWidth = 4; gg.strokeStyle = INK2; gg.stroke(st); } gg.restore(); }
    gg.restore();
    /* the front arm last: it reaches for Nexi, rises when it roars, feeds the mouth, flails when hit */
    var fe = [lerp(lerp(lerp(-252, -262, rr), -232, ch), -205, flail), lerp(lerp(lerp(-350, -520, rr), -420, ch), -560, flail) + br * 6];
    var fh = [lerp(lerp(lerp(-318, -300, rr), -212, ch), -150 + wob, flail), lerp(lerp(lerp(-432, -664, rr), -560, ch), -690, flail) + br * 8];
    fat(gg, [[-150, -455, fe[0], fe[1], 84], [fe[0], fe[1], fh[0], fh[1], 68]], MG, MGS); paw(gg, fh[0], fh[1], Math.atan2(fh[1] - fe[1], fh[0] - fe[0]));
    gg.restore();
  }
  window.EP00M = { monster: monster, KJ: KJ, cel: cel, rrP: rrP, ellP: ellP, polyP: polyP, starPts: starPts, hsh: hsh, INK2: INK2 };
})();
