/* NXE EXAGGERATED canvas parts (window.NXX). Needs nxe-page.js (NXP) and, for people, s2cast-f3.js (F3).
   sheet(g,x,y,w,rot,blur,lw)        a spreadsheet page (green header, coloured cells), ink outline when lw
   foam(g, pts, r0, r1, seed)         one fluffy cloud band along a polyline (ink circles first, then white)
   flash(g,x,y,R,avoid)               impact flash + rays; rays that point at `avoid` [x,y] are skipped
   speed(g, x,y, ang, len, n, spread, seed, col)  a bundle of speed lines
   person(g,S,id,x,foot,h,mood,pose,prop,outline,tr)  F3 cast member with a comic sticker outline
   balloon(g, post, el, tip, opts)    comic balloon around a DOM element with a tail to tip
   tile(g, img, x, y, w, rot)         an Odoo app tile (alias of NXP.app)
   glow(g,x,y,r,rgb,a)                additive glow
   rot(p, piv, a)                     rotate a point (for tilted scenes) */
(function () {
  var INK = '#101C45', TAU = Math.PI * 2, rr = NXP.rr;
  function sheet(g, x, y, w, rot, blur, lw) {
    var h = w * 0.76; g.save(); g.translate(x, y); g.rotate(rot); if (blur) g.filter = 'blur(' + blur + 'px)';
    g.fillStyle = '#FFFFFF'; g.fill(rr(-w / 2, -h / 2, w, h, w * 0.06)); g.fillStyle = '#21A366'; g.fillRect(-w / 2 + 1, -h / 2 + 1, w - 2, h * 0.17);
    var cols = ['#FFB3C1', '#FFE36E', '#BFE3FF'];
    for (var r = 0; r < 4; r++) for (var c = 0; c < 4; c++) if ((r * 3 + c * 5 + Math.round(w)) % 4 === 0) { g.fillStyle = cols[(r + c) % 3]; g.fillRect(-w / 2 + w * 0.06 + c * w * 0.22, -h / 2 + h * 0.27 + r * h * 0.17, w * 0.2, h * 0.14); }
    g.strokeStyle = 'rgba(33,163,102,.45)'; g.lineWidth = Math.max(1, w * 0.012); g.beginPath();
    for (var i = 1; i < 4; i++) { var gx = -w / 2 + w * 0.06 + i * w * 0.22; g.moveTo(gx - 1, -h / 2 + h * 0.25); g.lineTo(gx - 1, h / 2 - h * 0.06); }
    for (var j = 0; j <= 4; j++) { var gy = -h / 2 + h * 0.26 + j * h * 0.17; g.moveTo(-w / 2 + w * 0.05, gy); g.lineTo(w / 2 - w * 0.05, gy); } g.stroke();
    if (!blur && lw) { g.lineWidth = lw; g.strokeStyle = INK; g.stroke(rr(-w / 2, -h / 2, w, h, w * 0.06)); }
    g.restore();
  }
  function foam(g, pts, r0, r1, seed) {
    var R = TN.rand(seed || 31), f = [];
    for (var i = 0; i < pts.length - 1; i++) for (var k = 0; k < 4; k++) { var u = k / 4, t = (i + u) / (pts.length - 1), x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u;
      f.push([x + (R() - 0.5) * 10, y + (R() - 0.6) * 12, Math.max(8, r0 + (r1 - r0) * t + R() * 8)]); }
    f.forEach(function (c) { g.beginPath(); g.arc(c[0], c[1], c[2] + 5, 0, TAU); g.fillStyle = INK; g.fill(); });
    f.forEach(function (c) { g.beginPath(); g.arc(c[0], c[1], c[2], 0, TAU); g.fillStyle = '#FFFFFF'; g.fill(); });
    f.forEach(function (c) { g.beginPath(); g.arc(c[0] + c[2] * 0.25, c[1] + c[2] * 0.3, c[2] * 0.55, 0, TAU); g.fillStyle = 'rgba(150,200,235,.35)'; g.fill(); });
  }
  function glow(g, x, y, r, rgb, a) { g.save(); g.globalCompositeOperation = 'lighter'; var gr = g.createRadialGradient(x, y, 2, x, y, r); gr.addColorStop(0, 'rgba(' + rgb + ',' + (a == null ? 0.8 : a) + ')'); gr.addColorStop(1, 'rgba(' + rgb + ',0)'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore(); }
  function flash(g, x, y, R, avoid) {
    R = R || 210; g.save(); g.globalCompositeOperation = 'lighter';
    var gl = g.createRadialGradient(x, y, 4, x, y, R); gl.addColorStop(0, 'rgba(255,255,240,1)'); gl.addColorStop(0.18, 'rgba(255,236,150,.85)'); gl.addColorStop(0.5, 'rgba(120,210,255,.25)'); gl.addColorStop(1, 'rgba(120,210,255,0)');
    g.fillStyle = gl; g.beginPath(); g.arc(x, y, R, 0, TAU); g.fill();
    g.strokeStyle = 'rgba(255,250,220,.95)'; g.lineCap = 'round';
    for (var i = 0; i < 14; i++) { var a = i / 14 * TAU + 0.12; if (avoid) { var ta = Math.atan2(avoid[1] - y, avoid[0] - x), d = Math.atan2(Math.sin(a - ta), Math.cos(a - ta)); if (Math.abs(d) < 0.75) continue; }
      var r0 = R * 0.22 + (i % 3) * 8, r1 = r0 + R * 0.3 + (i % 2) * R * 0.24; g.lineWidth = 5 - (i % 2) * 2; g.beginPath(); g.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); g.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); g.stroke(); }
    g.restore();
    g.save(); g.translate(x, y); g.rotate(0.3); g.fillStyle = '#FFFFFF'; g.beginPath(); for (var j = 0; j < 16; j++) { var aa = j / 16 * TAU, r2 = j % 2 ? R * 0.09 : R * 0.25; g.lineTo(Math.cos(aa) * r2, Math.sin(aa) * r2); } g.closePath(); g.fill(); g.restore();
  }
  function speed(g, x, y, ang, len, n, spread, seed, col) {
    var R = TN.rand(seed || 3); g.save(); g.strokeStyle = col || 'rgba(255,255,255,.8)'; g.lineCap = 'round'; var c = Math.cos(ang), s = Math.sin(ang);
    for (var i = 0; i < n; i++) { var o = (R() - 0.5) * spread, back = R() * len * 0.5, l = len * (0.4 + R() * 0.6), sx = x - s * o - c * back, sy = y + c * o - s * back;
      g.lineWidth = 2.5 + R() * 3.5; g.beginPath(); g.moveTo(sx, sy); g.lineTo(sx - c * l, sy - s * l); g.stroke(); }
    g.restore();
  }
  function person(g, S, id, x, foot, h, mood, pose, prop, outline, tr) {
    var m = F3.cast[id], keep = { mood: m.mood, pose: m.pose, prop: m.prop }; m.mood = mood; if (pose) m.pose = pose; m.prop = prop;
    NXP.sticker(g, S, outline == null ? 4.5 : outline, function (A) { if (tr) A.setTransform(tr); F3.use(A); F3.figure(m, x, foot, h); }, true);
    m.mood = keep.mood; m.pose = keep.pose; m.prop = keep.prop;
  }
  function balloon(g, post, el, tip, o) {
    o = o || {}; var br = el.getBoundingClientRect(), pr = post.getBoundingClientRect(), bx = br.left - pr.left + br.width / 2, by = br.top - pr.top + br.height / 2;
    var p = new Path2D(); p.ellipse(bx, by, br.width / 2 + (o.px || 34), br.height / 2 + (o.py || 28), o.rot || 0, 0, TAU);
    var ax = bx + (tip[0] > bx ? 1 : -1) * Math.min(br.width * 0.25, 60), side = tip[0] > bx ? 1 : -1, ey = tip[1] > by ? by + br.height / 2 + 6 : by - br.height / 2 - 6;
    var t = new Path2D(); t.moveTo(ax - 26 * side, ey); t.lineTo(tip[0], tip[1]); t.lineTo(ax + 30 * side, ey); t.closePath();
    g.save(); g.translate(6, 7); g.fillStyle = INK; g.fill(p); g.fill(t); g.restore();
    g.lineJoin = 'round'; g.lineWidth = 10; g.strokeStyle = INK; g.stroke(p); g.stroke(t); g.fillStyle = o.fill || '#FFFFFF'; g.fill(p); g.fill(t);
  }
  function rot(p, piv, a) { var dx = p[0] - piv[0], dy = p[1] - piv[1]; return [piv[0] + dx * Math.cos(a) - dy * Math.sin(a), piv[1] + dx * Math.sin(a) + dy * Math.cos(a)]; }
  /* camera angles for flat art: draw something to the offscreen canvas, then paste it back in horizontal slices whose
     width grows/shrinks from top to bottom (topK..botK) and whose height is scaled by vk: worm's-eye = botK > topK,
     high angle = topK > botK. box = the art's source rect in page px; anchor = where the box's bottom-centre lands. */
  function keystone(g, S, box, anchor, topK, botK, vk, draw, outline) {
    var dpr = S.dpr, A = S.a.getContext('2d');
    A.setTransform(1, 0, 0, 1, 0, 0); A.clearRect(0, 0, S.a.width, S.a.height); A.setTransform(dpr, 0, 0, dpr, 0, 0); draw(A);
    if (outline) { var B = S.b.getContext('2d'); B.setTransform(1, 0, 0, 1, 0, 0); B.clearRect(0, 0, S.b.width, S.b.height); B.globalCompositeOperation = 'source-over'; B.drawImage(S.a, 0, 0); B.globalCompositeOperation = 'source-in'; B.fillStyle = INK; B.fillRect(0, 0, S.b.width, S.b.height); B.globalCompositeOperation = 'source-over';
      A.setTransform(1, 0, 0, 1, 0, 0); A.save(); A.globalCompositeOperation = 'destination-over'; for (var i = 0; i < 16; i++) { var a = i / 16 * TAU; A.drawImage(S.b, Math.cos(a) * outline * dpr, Math.sin(a) * outline * dpr); } A.restore(); }
    var n = Math.max(40, Math.round(box.h / 3)), H2 = box.h * (vk || 1);
    g.save(); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.imageSmoothingQuality = 'high';
    for (var k = 0; k < n; k++) { var t0 = k / n, t1 = (k + 1) / n, kk = topK + (botK - topK) * (t0 + t1) / 2, sw = box.w * kk;
      var sy = box.y + box.h * t0, sh = box.h / n, dy = anchor[1] - H2 + H2 * t0, dh = H2 / n + 0.6;
      g.drawImage(S.a, box.x * dpr, sy * dpr, box.w * dpr, sh * dpr, anchor[0] - sw / 2, dy, sw, dh); }
    g.restore();
  }
  window.NXX = { keystone: keystone, sheet: sheet, foam: foam, flash: flash, speed: speed, person: person, balloon: balloon, tile: NXP.app, glow: glow, rot: rot, INK: INK };
})();
