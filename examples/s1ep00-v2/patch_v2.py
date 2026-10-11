"""S1 EP00 poster v2: the nexi-explains-posters playbook applied (low-camera perspective skyline, moon rim light on the
monster, anamorphic flare, order slips sucked into the jaws + out-of-focus slips at the lens, fist charging, colour grade)."""
import pathlib
p = pathlib.Path(__file__).resolve().parent / 's1ep00.html'
s = p.read_text(encoding='utf-8')

NEW_FUNCS = r"""
  /* ---------- v2: low camera. Verticals converge on a vanishing point high above the frame (we look UP at the city). ---------- */
  var VP = [540, -2600];
  function px(x, y) { return VP[0] + (x - VP[0]) * (y - VP[1]) / (GROUND - VP[1]); }
  function tower(g, x, top, w, bottom) { g.beginPath(); g.moveTo(px(x, bottom), bottom); g.lineTo(px(x, top), top); g.lineTo(px(x + w, top), top); g.lineTo(px(x + w, bottom), bottom); g.closePath(); }
  function winP(g, x, top, w, h, col, seed, step) {
    var p = new Path2D(), st = step || 28;
    for (var wy = top + 18; wy < top + h - 20; wy += st) { var k = (wy - VP[1]) / (GROUND - VP[1]);
      for (var wx = x + 12; wx < x + w - 18; wx += 22) if (hsh(wx * 0.37 + wy * 1.3 + seed) > 0.56) p.rect(px(wx, wy), wy, 9 * k, 13); }
    g.fillStyle = col; g.fill(p);
  }
  /* an order slip (the monster eats orders): white card, blue header, grey lines */
  function slip(g, x, y, w, rot, a, blur) {
    var h = w * 0.72; g.save(); g.globalAlpha *= a; if (blur) g.filter = 'blur(' + blur + 'px)'; g.translate(x, y); g.rotate(rot);
    g.fillStyle = '#FFFFFF'; g.fill(rr(-w / 2, -h / 2, w, h, w * 0.08)); g.fillStyle = '#3167CA'; g.fill(rr(-w / 2, -h / 2, w, h * 0.24, w * 0.08)); g.fillRect(-w / 2, -h / 2 + h * 0.14, w, h * 0.1);
    g.fillStyle = 'rgba(31,31,61,.28)'; [0.42, 0.6, 0.78].forEach(function (q, i) { g.fillRect(-w * 0.36, -h / 2 + h * q, w * (i === 2 ? 0.4 : 0.72), h * 0.07); });
    if (!blur) { g.lineWidth = Math.max(2.5, w * 0.04); g.strokeStyle = INK; g.stroke(rr(-w / 2, -h / 2, w, h, w * 0.08)); }
    g.restore();
  }
  /* moon rim light: the monster's silhouette in moonlight, peeking out up-right of the monster */
  function monsterLit(g, th, mx, my, ms) {
    var dpr = S.dpr, a = S.mc.getContext('2d'), b = S.rc.getContext('2d');
    a.setTransform(1, 0, 0, 1, 0, 0); a.clearRect(0, 0, S.mc.width, S.mc.height); a.setTransform(dpr, 0, 0, dpr, 0, DY * dpr); M.monster(a, mx, my, ms);
    b.setTransform(1, 0, 0, 1, 0, 0); b.clearRect(0, 0, S.rc.width, S.rc.height); b.globalCompositeOperation = 'source-over'; b.drawImage(S.mc, 0, 0);
    b.globalCompositeOperation = 'source-in'; b.fillStyle = '#FFF1C8'; b.fillRect(0, 0, S.rc.width, S.rc.height); b.globalCompositeOperation = 'source-over';
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.filter = 'blur(' + (3 * dpr) + 'px)'; g.globalAlpha = 0.95; g.drawImage(S.rc, 9 * dpr, -8 * dpr); g.filter = 'none'; g.globalAlpha = 1;
    g.drawImage(S.mc, 0, 0); g.restore();
  }
  function flare(g, th, sx, sy) {
    var a = 0.42 + 0.08 * Math.sin(th);
    g.save(); g.globalCompositeOperation = 'lighter';
    var st = g.createLinearGradient(0, 0, W, 0); st.addColorStop(0, 'rgba(120,170,255,0)'); st.addColorStop(sx / W, 'rgba(225,240,255,' + a + ')'); st.addColorStop(1, 'rgba(120,170,255,0)');
    g.filter = 'blur(7px)'; g.fillStyle = st; g.fillRect(0, sy - 7, W, 14); g.filter = 'none'; g.globalAlpha = 0.9; g.fillRect(0, sy - 1.2, W, 2.4); g.globalAlpha = 1;
    var sg = g.createRadialGradient(sx, sy, 2, sx, sy, 90); sg.addColorStop(0, 'rgba(255,250,230,.7)'); sg.addColorStop(1, 'rgba(255,250,230,0)'); g.fillStyle = sg; g.fill(ell(sx, sy, 150, 46));
    [[0.42, 34, 'rgba(120,200,255,.10)'], [0.66, 20, 'rgba(200,140,255,.10)'], [0.8, 52, 'rgba(110,170,255,.06)']].forEach(function (q) { var gx = sx + (W / 2 - sx) * q[0] * 2, gy = sy + (H * 0.5 - sy) * q[0] * 2; g.fillStyle = q[2]; g.fill(ell(gx, gy, q[1], q[1])); });
    g.restore();
  }
  function charge(g, th, x, y) {
    g.save(); g.globalCompositeOperation = 'lighter';
    var gl = g.createRadialGradient(x, y, 6, x, y, 96); gl.addColorStop(0, 'rgba(150,230,255,.85)'); gl.addColorStop(0.4, 'rgba(90,170,255,.32)'); gl.addColorStop(1, 'rgba(90,170,255,0)'); g.fillStyle = gl; g.fill(ell(x, y, 100, 100));
    var p = new Path2D(); for (var i = 0; i < 9; i++) { var an = i * TAU / 9 + th, r0 = 54 + 6 * Math.sin(th * 3 + i), r1 = r0 + 22 + 10 * Math.sin(th * 2 + i * 2);
      p.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); p.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); }
    g.strokeStyle = 'rgba(200,240,255,.85)'; g.lineWidth = 4; g.lineCap = 'round'; g.stroke(p);
    var u = (th / TAU * 2) % 1; g.strokeStyle = 'rgba(160,225,255,' + (0.7 * (1 - u)) + ')'; g.lineWidth = 3; g.stroke(ell(x, y, 40 + u * 60, 40 + u * 60));
    g.restore();
  }
"""
anchor = '  function focusLines(g, cx, cy, th) {'
assert anchor in s
s = s.replace(anchor, NEW_FUNCS + anchor, 1)

rep = [
# offscreen canvases for the rim light
("    var c = post.querySelector('canvas'); c.width = W * dpr; c.height = H * dpr; S.g = c.getContext('2d');\n",
 "    var c = post.querySelector('canvas'); c.width = W * dpr; c.height = H * dpr; S.g = c.getContext('2d');\n"
 "    S.mc = document.createElement('canvas'); S.rc = document.createElement('canvas'); S.mc.width = S.rc.width = W * dpr; S.mc.height = S.rc.height = H * dpr;\n"),
# perspective rows
("""    var fp = new Path2D(); S.far.forEach(function (b) { fp.rect(b[0], GROUND - b[2] - 60, b[1], b[2] + 80); });
    g.fillStyle = '#3D3F92'; g.fill(fp);
    S.far.forEach(function (b, i) { windows(g, b[0], GROUND - b[2] - 60, b[1], b[2] + 60, 'rgba(255,214,140,.32)', i * 7, 30); });""",
"""    g.save(); g.filter = 'blur(1.6px)'; g.fillStyle = '#41449A';
    S.far.forEach(function (b) { tower(g, b[0], GROUND - b[2] - 60, b[1], GROUND + 20); g.fill(); });
    S.far.forEach(function (b, i) { winP(g, b[0], GROUND - b[2] - 60, b[1], b[2] + 60, 'rgba(255,214,140,.3)', i * 7, 30); }); g.restore();"""),
("""      var x = b[0], top = GROUND - b[2]; g.fillStyle = '#16255C'; g.fill(rr(x, top, b[1], b[2] + 30, 3)); g.fillStyle = '#2A3F86'; g.fill(rr(x + b[1] - 7, top, 7, b[2] + 30, 0));
      windows(g, x, top, b[1], b[2], 'rgba(255,212,126,.72)', b[0], 28);
      if (b[3] > 0.62) { g.strokeStyle = '#16255C'; g.lineWidth = 4; g.beginPath(); g.moveTo(x + b[1] / 2, top); g.lineTo(x + b[1] / 2, top - 46); g.stroke();
        if (Math.sin(th * 4 + i) > 0) { g.save(); g.shadowColor = '#FF5A6E'; g.shadowBlur = 14; g.fillStyle = '#FF6A7C'; g.fill(ell(x + b[1] / 2, top - 48, 5, 5)); g.restore(); } }""",
"""      var x = b[0], top = GROUND - b[2]; g.fillStyle = '#16255C'; tower(g, x, top, b[1], GROUND + 30); g.fill(); g.fillStyle = '#2C4290'; tower(g, x + b[1] - 8, top, 8, GROUND + 30); g.fill();
      winP(g, x, top, b[1], b[2], 'rgba(255,212,126,.72)', b[0], 28);
      if (b[3] > 0.62) { var ax = px(x + b[1] / 2, top); g.strokeStyle = '#16255C'; g.lineWidth = 4; g.beginPath(); g.moveTo(ax, top); g.lineTo(px(x + b[1] / 2, top - 46), top - 46); g.stroke();
        if (Math.sin(th * 4 + i) > 0) { g.save(); g.shadowColor = '#FF5A6E'; g.shadowBlur = 14; g.fillStyle = '#FF6A7C'; g.fill(ell(px(x + b[1] / 2, top - 48), top - 48, 5, 5)); g.restore(); } }"""),
("""    rows.forEach(function (b, i) { var x = b[0], w = b[1], top = GROUND - b[2]; g.fillStyle = '#0B1534'; g.fill(rr(x, top, w, b[2] + 60, 2)); g.fillStyle = '#1D2E66'; g.fill(rr(x - 5, top - 9, w + 10, 11, 3)); windows(g, x, top, w, b[2], 'rgba(255,214,130,.78)', i * 31 + 5, 26); });""",
"""    rows.forEach(function (b, i) { var x = b[0], w = b[1], top = GROUND - b[2]; g.fillStyle = '#0B1534'; tower(g, x, top, w, GROUND + 60); g.fill(); g.fillStyle = '#1D2E66'; tower(g, x - 5, top - 9, w + 10, top + 2); g.fill(); winP(g, x, top, w, b[2], 'rgba(255,214,130,.78)', i * 31 + 5, 26); });"""),
# the monster with the moon rim, then the slips it is gobbling
("""    g.save(); g.filter = 'none'; M.monster(g, 888, GROUND + 40, 1.0); g.restore();
    /* rim light from the moon on its back */""",
"""    monsterLit(g, th, 888, GROUND + 40, 1.0);
    /* order slips spiralling into the jaws (one full cycle per loop: seamless) */
    for (var k = 0; k < 6; k++) { var u = (t / LOOP + k / 6) % 1, ang = -2.2 + u * 5.2 + k, rad = 230 * (1 - u) + 24, sx2 = 742 + Math.cos(ang) * rad * 1.15, sy2 = 486 + Math.sin(ang) * rad * 0.75;
      slip(g, sx2, sy2, 58 * (1 - u * 0.6), ang * 0.8, Math.min(1, (1 - u) * 4) * Math.min(1, u * 8 + 0.15), 0); }"""),
("    cape(g, neck[0], neck[1], nh / 560, th);", "    cape(g, neck[0], neck[1], nh / 560, th);"),
# fist charge after Nexi
("""    if (S.nexi) { g.save(); g.shadowColor = 'rgba(160,210,255,.55)'; g.shadowBlur = 26; g.drawImage(S.nexi, NEXI.x, NEXI.y + bob, nw, nh); g.restore(); }""",
"""    if (S.nexi) { g.save(); g.shadowColor = 'rgba(160,210,255,.55)'; g.shadowBlur = 26; g.drawImage(S.nexi, NEXI.x, NEXI.y + bob, nw, nh); g.restore(); }
    charge(g, th, NEXI.x + nw * 0.943, NEXI.y + bob + nh * 0.278);"""),
# lens layer: out-of-focus slips at the lens, flare, grade
("""    /* screen-space finish: bottom darkening for the words, vignette */
    g.setTransform(dpr, 0, 0, dpr, 0, 0);""",
"""    /* lens layer: two order slips right at the lens, far out of focus (depth of field), drifting on the loop */
    slip(g, 1018 + Math.sin(th) * 10, 610 + Math.cos(th) * 14, 210, 0.55 + Math.sin(th) * 0.05, 0.92, 10);
    slip(g, -6 + Math.cos(th) * 8, 470 + Math.sin(th) * 12, 150, -0.45, 0.85, 7);
    /* screen-space finish: anamorphic flare from the moon's lit edge, bottom darkening for the words, grade, vignette */
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    flare(g, th, 958, 300 + DY);"""),
("""    var vg = g.createRadialGradient(W / 2, H * 0.45, H * 0.35, W / 2, H * 0.5, H * 0.8);""",
"""    g.save(); g.globalCompositeOperation = 'soft-light'; var gd = g.createLinearGradient(0, 0, W, H); gd.addColorStop(0, 'rgba(60,110,255,.45)'); gd.addColorStop(0.55, 'rgba(128,128,128,0)'); gd.addColorStop(1, 'rgba(255,150,80,.4)'); g.fillStyle = gd; g.fillRect(0, 0, W, H); g.restore();
    var vg = g.createRadialGradient(W / 2, H * 0.45, H * 0.35, W / 2, H * 0.5, H * 0.8);"""),
# softer cape folds
("    g.strokeStyle = 'rgba(8,26,90,.45)'; g.lineWidth = 13 * s;", "    g.strokeStyle = 'rgba(8,26,90,.3)'; g.lineWidth = 11 * s;"),
("<title>Nexi Explains S1 EP00 - Meet Nexi (premiere promo)</title>", "<title>Nexi Explains S1 EP00 - Meet Nexi (poster v2)</title>"),
]
for a, b in rep:
    assert a in s, a[:90]
    s = s.replace(a, b, 1)
p.write_text(s, encoding='utf-8')
print('v2 patched')
