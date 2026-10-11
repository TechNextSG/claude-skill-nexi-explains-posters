/* A1 (posts 87-89, Nexi introduction, comic page style): small shared painters for these three pages only.
   Needs nxe-page.js (NXP) + nxe-x.js (NXX). window.A1. Every poster still paints its own world. */
(function () {
  var INK = '#101C45', TAU = Math.PI * 2, rr = NXP.rr;
  function img(src) { return new Promise(function (res) { var i = new Image(); i.onload = function () { res(i); }; i.onerror = function () { res(null); }; i.src = src; }); }
  function tx(g, s, x, y, size, weight, col, align, font) { g.font = weight + ' ' + size + 'px ' + (font || '"Plus Jakarta Sans",Inter,sans-serif'); g.fillStyle = col; g.textAlign = align || 'left'; g.textBaseline = 'alphabetic'; g.fillText(s, x, y); }
  /* comic lettering with an ink outline (canvas) */
  function inkText(g, s, x, y, size, fill, lw, align, font) { g.save(); g.font = (font || '400 ' + size + 'px Bangers'); g.textAlign = align || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = lw || 8; g.strokeStyle = INK; g.strokeText(s, x, y); g.fillStyle = fill; g.fillText(s, x, y); g.restore(); }
  /* puffy comic cloud: ink rim, white puffs, a cool shade on the lower half, flat-ish bottom */
  function cloud(g, x, y, s, o) {
    o = o || {}; var P = o.puffs || [[0, 0, 62], [70, -34, 78], [150, -14, 66], [214, 6, 50], [104, 14, 64], [-50, 14, 44]];
    var lw = o.lw == null ? 5 : o.lw;
    g.save(); if (o.blur) g.filter = 'blur(' + o.blur + 'px)'; g.globalAlpha = o.a == null ? 1 : o.a;
    if (lw) { g.fillStyle = INK; g.beginPath(); P.forEach(function (p) { g.moveTo(x + p[0] * s + p[2] * s + lw, y + p[1] * s); g.arc(x + p[0] * s, y + p[1] * s, p[2] * s + lw, 0, TAU); }); g.fill(); }
    var path = new Path2D(); P.forEach(function (p) { path.moveTo(x + p[0] * s + p[2] * s, y + p[1] * s); path.arc(x + p[0] * s, y + p[1] * s, p[2] * s, 0, TAU); });
    g.fillStyle = o.fill || '#FFFFFF'; g.fill(path);
    g.save(); g.clip(path); var sh = g.createLinearGradient(0, y - 60 * s, 0, y + 70 * s); sh.addColorStop(0, 'rgba(255,255,255,0)'); sh.addColorStop(0.55, 'rgba(255,255,255,0)'); sh.addColorStop(1, o.shade || 'rgba(120,170,230,.55)'); g.fillStyle = sh; g.fillRect(x - 200 * s, y - 140 * s, 600 * s, 260 * s);
    g.fillStyle = 'rgba(255,255,255,.9)'; P.slice(0, 3).forEach(function (p) { g.beginPath(); g.ellipse(x + p[0] * s - p[2] * s * 0.3, y + p[1] * s - p[2] * s * 0.45, p[2] * s * 0.32, p[2] * s * 0.16, -0.4, 0, TAU); g.fill(); });
    g.restore(); g.restore();
  }
  /* point on a quadratic curve */
  function qp(a, c, b, t) { var u = 1 - t; return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]; }
  /* tapered comet trail a -> b (wide at b), coloured glow + white core + sparkle dots */
  function comet(g, a, c, b, w, rgb, seed) {
    var N = 28, L = [], Rr = [], i;
    for (i = 0; i <= N; i++) { var t = i / N, p = qp(a, c, b, t), q = qp(a, c, b, Math.min(1, t + 0.01)), p0 = qp(a, c, b, Math.max(0, t - 0.01)), dx = q[0] - p0[0], dy = q[1] - p0[1], d = Math.hypot(dx, dy) || 1, nx = -dy / d, ny = dx / d, ww = w * Math.pow(t, 1.4);
      L.push([p[0] + nx * ww, p[1] + ny * ww]); Rr.push([p[0] - nx * ww, p[1] - ny * ww]); }
    var path = new Path2D(); L.forEach(function (p, k) { if (k) path.lineTo(p[0], p[1]); else path.moveTo(p[0], p[1]); }); for (i = Rr.length - 1; i >= 0; i--) path.lineTo(Rr[i][0], Rr[i][1]); path.closePath();
    g.save(); var gr = g.createLinearGradient(a[0], a[1], b[0], b[1]); gr.addColorStop(0, 'rgba(' + rgb + ',0)'); gr.addColorStop(0.6, 'rgba(' + rgb + ',.55)'); gr.addColorStop(1, 'rgba(' + rgb + ',.95)');
    g.fillStyle = gr; g.fill(path);
    g.globalCompositeOperation = 'lighter'; var core = g.createLinearGradient(a[0], a[1], b[0], b[1]); core.addColorStop(0, 'rgba(255,255,255,0)'); core.addColorStop(1, 'rgba(255,255,255,.85)'); g.strokeStyle = core; g.lineCap = 'round';
    g.lineWidth = Math.max(3, w * 0.28); g.beginPath(); g.moveTo(a[0], a[1]); g.quadraticCurveTo(c[0], c[1], b[0], b[1]); g.stroke(); g.restore();
    var R = TN.rand(seed || 5); for (i = 0; i < 7; i++) { var t2 = 0.25 + R() * 0.7, p2 = qp(a, c, b, t2); NXP.twinkle(g, p2[0] + (R() - 0.5) * w * 2.2, p2[1] + (R() - 0.5) * w * 2.2, 5 + R() * 9, i % 2 ? '#FFFFFF' : '#FFE36E'); }
  }
  /* firework burst (comic star of rays) */
  function burst(g, x, y, r, col, n, rot) {
    n = n || 12; g.save(); g.translate(x, y); g.rotate(rot || 0); g.lineCap = 'round';
    for (var i = 0; i < n; i++) { var a = i / n * TAU, r0 = r * 0.42, r1 = r * (i % 2 ? 0.8 : 1);
      g.strokeStyle = INK; g.lineWidth = 9; g.beginPath(); g.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); g.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); g.stroke();
      g.strokeStyle = i % 2 ? '#FFFFFF' : col; g.lineWidth = 4.5; g.stroke();
      g.fillStyle = i % 2 ? col : '#FFFFFF'; g.beginPath(); g.arc(Math.cos(a) * (r1 + 9), Math.sin(a) * (r1 + 9), 4.5, 0, TAU); g.fill(); g.lineWidth = 2.5; g.strokeStyle = INK; g.stroke(); }
    g.restore();
  }
  /* Nexi as an ink-outlined sticker; x,y top-left of the unrotated box */
  function nexi(S, g, im, x, y, h, o) {
    o = o || {}; var w = h * im.naturalWidth / im.naturalHeight;
    NXP.sticker(g, S, o.px || 4.5, function (A) { A.save(); A.translate(x + w / 2, y + h / 2); if (o.rot) A.rotate(o.rot); if (o.flip) A.scale(-1, 1); A.drawImage(im, -w / 2, -h / 2, w, h); A.restore(); }, true);
    return w;
  }
  /* soft contact shadow */
  function shadow(g, x, y, rx, ry, a) { g.save(); g.translate(x, y); g.scale(1, ry / rx); var r = g.createRadialGradient(0, 0, 0, 0, 0, rx); r.addColorStop(0, 'rgba(10,20,50,' + (a == null ? 0.35 : a) + ')'); r.addColorStop(1, 'rgba(10,20,50,0)'); g.fillStyle = r; g.beginPath(); g.arc(0, 0, rx, 0, TAU); g.fill(); g.restore(); }
  /* the bottom darkening for the words + vignette */
  function finish(g, W, H, y0, a) {
    var bd = g.createLinearGradient(0, y0, 0, H); bd.addColorStop(0, 'rgba(6,12,40,0)'); bd.addColorStop(0.3, 'rgba(6,12,40,' + (a || 0.72) + ')'); bd.addColorStop(1, 'rgba(6,12,40,.93)'); g.fillStyle = bd; g.fillRect(0, y0, W, H - y0);
    var vg = g.createRadialGradient(W / 2, H * 0.45, H * 0.38, W / 2, H * 0.5, H * 0.82); vg.addColorStop(0, 'rgba(0,0,20,0)'); vg.addColorStop(1, 'rgba(0,0,20,.32)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
  }
  /* anamorphic streak through a light source */
  function streak(g, W, x, y, a) {
    g.save(); g.globalCompositeOperation = 'lighter'; var s = g.createLinearGradient(0, 0, W, 0); s.addColorStop(0, 'rgba(150,200,255,0)'); s.addColorStop(Math.max(0.05, Math.min(0.95, x / W)), 'rgba(255,245,215,' + (a || 0.6) + ')'); s.addColorStop(1, 'rgba(150,200,255,0)');
    g.filter = 'blur(6px)'; g.fillStyle = s; g.fillRect(0, y - 6, W, 12); g.filter = 'none'; g.fillRect(0, y - 1, W, 2);
    [0.35, 0.6, 1.35].forEach(function (k, i) { var gx = W / 2 + (x - W / 2) * -k + W / 2 * 0, gy = 720 + (y - 720) * -k; var gg = g.createRadialGradient(gx, gy, 0, gx, gy, 26 + i * 14); gg.addColorStop(0, 'rgba(255,230,190,.22)'); gg.addColorStop(1, 'rgba(255,230,190,0)'); g.fillStyle = gg; g.beginPath(); g.arc(gx, gy, 26 + i * 14, 0, TAU); g.fill(); });
    g.restore();
  }
  window.A1 = { INK: INK, TAU: TAU, rr: rr, img: img, tx: tx, inkText: inkText, cloud: cloud, qp: qp, comet: comet, burst: burst, nexi: nexi, shadow: shadow, finish: finish, streak: streak };
})();
