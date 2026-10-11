/* NXE PAGE STYLE canvas helpers for posters (the technext.asia/nexi-explains hero look). window.NXP.
   bg(g, W, H, cx, cy)  deep-blue radial + rays + halftone dots + speed lines, centred where the poster wants its light
   twinkle(g, x, y, s, col)   four-point sparkle with a glow (page .nxe-tw)
   app(g, img, x, y, w, rot)  white app sticker, ink border, hard shadow (page .nxe-fl)
   sticker(g, S, px, draw)    ink outline + hard drop around anything drawn by draw(ctx) (needs S.a/S.b/S.dpr)
   rr(x, y, w, h, r)          rounded-rect Path2D */
(function () {
  var INK = '#101C45', TAU = Math.PI * 2;
  function rr(x, y, w, h, r) { var p = new Path2D(); r = Math.min(r, w / 2, h / 2); p.moveTo(x + r, y); p.arcTo(x + w, y, x + w, y + h, r); p.arcTo(x + w, y + h, x, y + h, r); p.arcTo(x, y + h, x, y, r); p.arcTo(x, y, x + w, y, r); p.closePath(); return p; }
  function bg(g, W, H, cx, cy) {
    var r = g.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) * 1.05);
    r.addColorStop(0, '#3E74DE'); r.addColorStop(0.3, '#2352B4'); r.addColorStop(0.62, '#143585'); r.addColorStop(1, '#0B1D52'); g.fillStyle = r; g.fillRect(0, 0, W, H);
    /* rays: repeating 6deg white / 9deg clear, faded out from the centre (page .nxe-rays) */
    g.save(); var rg = g.createRadialGradient(cx, cy, 40, cx, cy, 1150); rg.addColorStop(0, 'rgba(255,255,255,.085)'); rg.addColorStop(0.62, 'rgba(255,255,255,.06)'); rg.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = rg;
    g.beginPath(); for (var a = 0; a < 360; a += 15) { var a0 = a * Math.PI / 180, a1 = (a + 6) * Math.PI / 180; g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a0) * 1600, cy + Math.sin(a0) * 1600); g.lineTo(cx + Math.cos(a1) * 1600, cy + Math.sin(a1) * 1600); g.closePath(); } g.fill(); g.restore();
    /* halftone dots fading from the bottom-left corner (page .nxe-dots) */
    var p = new Path2D(); for (var y = 8; y < H; y += 16) for (var x = 8; x < W; x += 16) { var d = Math.hypot(x / (W * 0.7), (H - y) / (H * 0.9)); if (d > 1) continue; var rad = 1.6 * (1 - d * 0.6); p.moveTo(x + rad, y); p.arc(x, y, rad, 0, TAU); }
    g.fillStyle = 'rgba(255,255,255,.16)'; g.fill(p);
    /* speed lines from the left edge (page .nxe-speed) */
    g.save(); var sg = g.createLinearGradient(0, 0, W * 0.55, 0); sg.addColorStop(0, 'rgba(255,255,255,.06)'); sg.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = sg;
    g.translate(0, 0); var k = Math.tan(14 * Math.PI / 180); for (var sx = -H; sx < W; sx += 48) { g.beginPath(); g.moveTo(sx, H); g.lineTo(sx + H * k, 0); g.lineTo(sx + H * k + 2.5, 0); g.lineTo(sx + 2.5, H); g.closePath(); g.fill(); } g.restore();
  }
  function twinkle(g, x, y, s, col) {
    g.save(); g.translate(x, y); g.shadowColor = col || '#FFD23F'; g.shadowBlur = s * 0.9; g.fillStyle = col || '#FFD23F'; g.beginPath();
    for (var i = 0; i < 8; i++) { var a = i * Math.PI / 4 - Math.PI / 2, r = i % 2 ? s * 0.22 : s; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); } g.closePath(); g.fill(); g.restore();
  }
  function app(g, img, x, y, w, rot) {
    g.save(); g.translate(x, y); g.rotate(rot || 0); var p = rr(-w / 2, -w / 2, w, w, w * 0.28);
    g.save(); g.translate(w * 0.09, w * 0.09); g.fillStyle = 'rgba(5,12,40,.45)'; g.fill(p); g.restore();
    g.fillStyle = '#FFFFFF'; g.fill(p); g.lineWidth = Math.max(3, w * 0.052); g.strokeStyle = INK; g.stroke(p);
    if (img) g.drawImage(img, -w * 0.29, -w * 0.29, w * 0.58, w * 0.58); g.restore();
  }
  function sticker(g, S, px, draw, drop) {
    var dpr = S.dpr, A = S.a.getContext('2d'), B = S.b.getContext('2d');
    A.setTransform(1, 0, 0, 1, 0, 0); A.clearRect(0, 0, S.a.width, S.a.height); A.setTransform(dpr, 0, 0, dpr, 0, 0); draw(A);
    B.setTransform(1, 0, 0, 1, 0, 0); B.clearRect(0, 0, S.b.width, S.b.height); B.globalCompositeOperation = 'source-over'; B.drawImage(S.a, 0, 0);
    B.globalCompositeOperation = 'source-in'; B.fillStyle = INK; B.fillRect(0, 0, S.b.width, S.b.height); B.globalCompositeOperation = 'source-over';
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
    if (drop !== false) { g.globalAlpha = 0.45; g.drawImage(S.b, 8 * dpr, 9 * dpr); g.globalAlpha = 1; }
    for (var i = 0; i < 16; i++) { var a = i / 16 * TAU; g.drawImage(S.b, Math.cos(a) * px * dpr, Math.sin(a) * px * dpr); }
    g.drawImage(S.a, 0, 0); g.restore();
  }
  function offscreen(S, W, H) { S.a = document.createElement('canvas'); S.b = document.createElement('canvas'); S.a.width = S.b.width = W * S.dpr; S.a.height = S.b.height = H * S.dpr; }
  window.NXP = { INK: INK, rr: rr, bg: bg, twinkle: twinkle, app: app, sticker: sticker, offscreen: offscreen };
})();
