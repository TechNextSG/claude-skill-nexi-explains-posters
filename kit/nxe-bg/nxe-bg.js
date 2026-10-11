/* NXE v4 backgrounds (owner 2026-10-07, on the exaggerated S2 EP00-05: "this design already good, just improve, just change
   the background texture/elements, and cta button"). One painted world per poster, comic texture, replaces the shared blue
   sunburst (NXP.bg). window.NXB = { storm, office, golden, blueprint, blinds, sunset }. Each: (g, W, H, opts). */
(function () {
  var TAU = Math.PI * 2, INK = '#101C45';
  function rays(g, cx, cy, n, a, col, len) { g.save(); g.fillStyle = col; g.globalAlpha = a; g.beginPath(); for (var i = 0; i < n; i += 2) { var a0 = i / n * TAU, a1 = (i + 1) / n * TAU; g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a0) * len, cy + Math.sin(a0) * len); g.lineTo(cx + Math.cos(a1) * len, cy + Math.sin(a1) * len); g.closePath(); } g.fill(); g.restore(); }
  function dots(g, W, H, cx, cy, from, col, st, maxR) { var p = new Path2D(); st = st || 18; for (var y = st / 2, r = 0; y < H; y += st, r++) for (var x = (r % 2 ? st : st / 2); x < W; x += st) { var d = Math.hypot(x - cx, y - cy) / Math.hypot(W, H); if (d < from) continue; var rad = Math.min(maxR || st * 0.32, (d - from) * st * 1.4); if (rad < 0.6) continue; p.moveTo(x + rad, y); p.arc(x, y, rad, 0, TAU); } g.fillStyle = col; g.fill(p); }
  function cloud(g, x, y, s, col) { g.fillStyle = col; g.beginPath(); [[0, 0, 70], [80, -30, 90], [170, 0, 70], [90, 30, 70]].forEach(function (k) { g.moveTo(x + k[0] * s + k[2] * s, y + k[1] * s); g.arc(x + k[0] * s, y + k[1] * s, k[2] * s, 0, TAU); }); g.fill(); }
  function bolt(g, pts, w) { g.save(); g.lineJoin = 'miter'; g.beginPath(); pts.forEach(function (p, i) { if (i) g.lineTo(p[0], p[1]); else g.moveTo(p[0], p[1]); }); g.closePath(); g.fillStyle = INK; g.save(); g.translate(5, 6); g.fill(); g.restore(); g.fillStyle = '#FFE25A'; g.fill(); g.lineWidth = w || 5; g.strokeStyle = INK; g.stroke(); g.restore(); }

  /* EP00: a purple-to-coral STORM AT SUNSET, storm clouds + a comic lightning bolt, magenta halftone */
  function storm(g, W, H, o) {
    var s = o.sun, gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#22185E'); gr.addColorStop(0.32, '#6E2A86'); gr.addColorStop(0.58, '#E0466A'); gr.addColorStop(0.78, '#FF8A4C'); gr.addColorStop(1, '#FFC27A');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    rays(g, s[0], s[1], 34, 0.16, '#FFE7C4', 2200);
    dots(g, W, H, s[0], s[1], 0.42, 'rgba(255,90,160,.28)', 18);
    var gl = g.createRadialGradient(s[0], s[1], 40, s[0], s[1], 520); gl.addColorStop(0, 'rgba(255,215,160,.8)'); gl.addColorStop(1, 'rgba(255,215,160,0)'); g.fillStyle = gl; g.fillRect(0, 0, W, H);
    cloud(g, -80, 120, 1.5, 'rgba(34,18,80,.88)'); cloud(g, 120, 40, 1.15, 'rgba(52,26,104,.85)'); cloud(g, -40, 260, 1.0, 'rgba(70,34,120,.7)');
    bolt(g, [[250, 210], [205, 330], [246, 330], [196, 470], [292, 300], [250, 300], [300, 210]], 5);
  }
  /* EP01: a WARM OFFICE WALL: cream wallpaper stripes, a teal wainscot, comic speed lines bursting from the claw */
  function office(g, W, H, o) {
    g.fillStyle = '#FFF1D9'; g.fillRect(0, 0, W, H);
    for (var x = -20; x < W; x += 64) { g.fillStyle = 'rgba(244,196,120,.28)'; g.fillRect(x, 0, 26, H); }
    dots(g, W, H, o.burst[0], o.burst[1], 0.38, 'rgba(232,120,60,.22)', 16);
    rays(g, o.burst[0], o.burst[1], 44, 0.22, '#FFFFFF', 2000);
    var wy = 1010; g.fillStyle = '#3FA796'; g.fillRect(0, wy, W, H - wy); g.fillStyle = INK; g.fillRect(0, wy - 6, W, 8); g.fillStyle = '#9FE0D4'; g.fillRect(0, wy + 2, W, 6);
    var vg = g.createRadialGradient(W / 2, H * 0.4, H * 0.35, W / 2, H * 0.45, H * 0.8); vg.addColorStop(0, 'rgba(120,60,10,0)'); vg.addColorStop(1, 'rgba(120,60,10,.22)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
  }
  /* EP02: a GOLDEN BLAST sky with a red halftone and speed streaks (the wall paints over the middle) */
  function golden(g, W, H, o) {
    var c = o.c, gr = g.createRadialGradient(c[0], c[1], 30, c[0], c[1], 1300); gr.addColorStop(0, '#FFFBE6'); gr.addColorStop(0.25, '#FFD45E'); gr.addColorStop(0.6, '#FF9A2E'); gr.addColorStop(1, '#E2502A');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    rays(g, c[0], c[1], 32, 0.3, '#FFFFFF', 2200);
    dots(g, W, H, c[0], c[1], 0.35, 'rgba(190,40,20,.25)', 18);
  }
  /* EP03: a FLIGHT-SIM BLUEPRINT: white grid on blue, radar rings, a plane schematic, coordinates */
  function blueprint(g, W, H, o) {
    var gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#2C6FD6'); gr.addColorStop(1, '#173E9A'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 1.5; g.beginPath(); for (var x = 0; x < W; x += 24) { g.moveTo(x, 0); g.lineTo(x, H); } for (var y = 0; y < H; y += 24) { g.moveTo(0, y); g.lineTo(W, y); } g.stroke();
    g.strokeStyle = 'rgba(255,255,255,.24)'; g.lineWidth = 2.5; g.beginPath(); for (var x2 = 0; x2 < W; x2 += 120) { g.moveTo(x2, 0); g.lineTo(x2, H); } for (var y2 = 0; y2 < H; y2 += 120) { g.moveTo(0, y2); g.lineTo(W, y2); } g.stroke();
    var rc = o.radar; g.strokeStyle = 'rgba(160,240,255,.35)'; g.lineWidth = 3; [120, 240, 360, 480].forEach(function (r) { g.beginPath(); g.arc(rc[0], rc[1], r, 0, TAU); g.stroke(); });
    var sw = g.createRadialGradient(rc[0], rc[1], 0, rc[0], rc[1], 480); sw.addColorStop(0, 'rgba(120,255,200,.35)'); sw.addColorStop(1, 'rgba(120,255,200,0)'); g.fillStyle = sw; g.beginPath(); g.moveTo(rc[0], rc[1]); g.arc(rc[0], rc[1], 480, -1.0, -0.45); g.closePath(); g.fill();
    /* plane schematic (top view) in the top-right */
    g.save(); g.translate(o.plane[0], o.plane[1]); g.rotate(-0.5); g.strokeStyle = 'rgba(255,255,255,.4)'; g.lineWidth = 3; g.setLineDash([10, 8]);
    g.beginPath(); g.moveTo(0, -150); g.quadraticCurveTo(16, -120, 16, -40); g.lineTo(150, 10); g.lineTo(150, 34); g.lineTo(16, 20); g.lineTo(14, 100); g.lineTo(56, 130); g.lineTo(56, 146); g.lineTo(0, 134); g.lineTo(-56, 146); g.lineTo(-56, 130); g.lineTo(-14, 100); g.lineTo(-16, 20); g.lineTo(-150, 34); g.lineTo(-150, 10); g.lineTo(-16, -40); g.quadraticCurveTo(-16, -120, 0, -150); g.stroke(); g.setLineDash([]); g.restore();
    g.fillStyle = 'rgba(255,255,255,.35)'; g.font = '700 16px "Plus Jakarta Sans"'; g.fillText('SIM-03 · TEST FLIGHT', 64, H - 470);
  }
  /* EP04: DAYLIGHT NOIR: a purple office wall cut by warm venetian-blind light stripes, dust in the light */
  function blinds(g, W, H, o) {
    var gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#4B3C9C'); gr.addColorStop(0.6, '#3A2F84'); gr.addColorStop(1, '#241F5C'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.save(); g.translate(W * 0.62, -80); g.rotate(0.42); for (var i = 0; i < 9; i++) { var y = i * 96; var bg = g.createLinearGradient(-900, 0, 900, 0); bg.addColorStop(0, 'rgba(255,196,110,0)'); bg.addColorStop(0.5, 'rgba(255,196,110,.34)'); bg.addColorStop(1, 'rgba(255,196,110,0)'); g.fillStyle = bg; g.fillRect(-900, y, 1800, 54); } g.restore();
    var R = TN.rand(21); g.fillStyle = 'rgba(255,230,180,.7)'; for (var k = 0; k < 70; k++) { var x = R() * W, yy = R() * 900; g.beginPath(); g.arc(x, yy, 1 + R() * 2.4, 0, TAU); g.fill(); }
    dots(g, W, H, W * 0.1, H * 0.1, 0.45, 'rgba(255,255,255,.08)', 16);
  }
  /* EP05: a SUNSET OVER THE SEA: peach-to-pink sky, big rays, soft pink clouds (the page paints the sea) */
  function sunset(g, W, H, o) {
    var s = o.sun, gr = g.createLinearGradient(0, 0, 0, o.hz); gr.addColorStop(0, '#5B3FA8'); gr.addColorStop(0.35, '#E0558A'); gr.addColorStop(0.7, '#FF9466'); gr.addColorStop(1, '#FFD39A');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    rays(g, s[0], s[1], 30, 0.18, '#FFF2D6', 2200);
    dots(g, W, o.hz, s[0], s[1], 0.4, 'rgba(255,120,170,.22)', 18);
  }
  window.NXB = { storm: storm, office: office, golden: golden, blueprint: blueprint, blinds: blinds, sunset: sunset, dots: dots };
})();
