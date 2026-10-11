import pathlib
p = pathlib.Path(__file__).resolve().parent / 's1ep01.html'
s = p.read_text(encoding='utf-8')
rep = [
("  var E = 0.42, D = 1500, CX = 690, CY = 708,", "  var E = 0.42, D = 1150, CX = 684, CY = 700,"),
("    ['crm', 140, 2.62, 38], ['sale', 140, -0.52, 38], ['stock', 216, 1.05, 41], ['account', 216, -2.1, 40], ['accountant', 292, 0.17, 44], ['spreadsheet_dashboard', 292, 3.49, 40]];",
 "    ['crm', 140, 2.62, 47], ['sale', 140, -0.55, 46], ['stock', 216, 1.1, 50], ['account', 216, -2.1, 47], ['accountant', 286, 0.48, 54], ['spreadsheet_dashboard', 286, 3.5, 48]];"),
("  var NX = { x: 26, y: 598, h: 474,", "  var NX = { x: 22, y: 560, h: 474,"),
# brighter, crisper planets: icon drawn over a white sphere, light shading only at the rim
("""    var b = g.createRadialGradient(x - r * 0.4, y - r * 0.45, r * 0.1, x, y, r); b.addColorStop(0, '#FFFFFF'); b.addColorStop(0.6, '#F6EEE2'); b.addColorStop(1, '#CDB896');""",
 """    var b = g.createRadialGradient(x - r * 0.4, y - r * 0.45, r * 0.1, x, y, r); b.addColorStop(0, '#FFFFFF'); b.addColorStop(0.7, '#FBF6EE'); b.addColorStop(1, '#E2D3BC');"""),
("""    var ic = S.icons[k]; if (ic) { var s = r * 1.12; g.save(); g.beginPath(); g.arc(x, y, r, 0, TAU); g.clip(); g.drawImage(ic, x - s / 2, y - s / 2, s, s); g.restore(); }
    var sh = g.createRadialGradient(x - r * 0.5, y - r * 0.55, r * 0.5, x, y, r * 1.05); sh.addColorStop(0, 'rgba(90,55,20,0)'); sh.addColorStop(0.75, 'rgba(90,55,20,.1)'); sh.addColorStop(1, 'rgba(70,40,10,.42)');""",
 """    var ic = S.icons[k]; if (ic) { var s = r * 1.08; g.drawImage(ic, x - s / 2, y - s / 2, s, s); }
    var sh = g.createRadialGradient(x - r * 0.45, y - r * 0.5, r * 0.62, x, y, r * 1.02); sh.addColorStop(0, 'rgba(90,55,20,0)'); sh.addColorStop(0.8, 'rgba(90,55,20,.06)'); sh.addColorStop(1, 'rgba(70,40,10,.3)');"""),
("    g.strokeStyle = 'rgba(150,108,40,.85)'; g.lineWidth = 2; g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke();",
 "    g.strokeStyle = '#C9A260'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r + 1, 0, TAU); g.stroke(); g.strokeStyle = 'rgba(255,248,220,.9)'; g.lineWidth = 1.2; g.beginPath(); g.arc(x, y, r + 2.5, Math.PI * 1.05, Math.PI * 1.6); g.stroke();"),
# lighter grade at the bottom-right
("gd.addColorStop(1, 'rgba(60,40,110,.35)');", "gd.addColorStop(1, 'rgba(60,40,110,.16)');"),
# tags: back planets get the tag above, front planets below; "One database" above the back ring with a leader
("""    PL.forEach(function (p, k) { var e = S.tags[k], q = pos[k]; if (!q) return; e.style.left = (q.x - e.offsetWidth / 2) + 'px'; e.style.top = (q.y + q.r + 8) + 'px'; });
    if (pos.sun) { S.tagS.style.left = (pos.sun.x - S.tagS.offsetWidth / 2) + 'px'; S.tagS.style.top = (pos.sun.y - 64 * pos.sun.k - 44) + 'px'; }""",
 """    PL.forEach(function (p, k) { var e = S.tags[k], q = pos[k]; if (!q) return; var back = Math.sin(p[2]) < 0;
      e.style.left = Math.min(W - 40 - e.offsetWidth, q.x - e.offsetWidth / 2) + 'px'; e.style.top = (back ? q.y - q.r - 10 - e.offsetHeight : q.y + q.r + 9) + 'px'; });
    if (pos.sun) { var ty = pos.sun.y - 64 * pos.sun.k - 112; S.tagS.style.left = (pos.sun.x - S.tagS.offsetWidth / 2) + 'px'; S.tagS.style.top = ty + 'px';
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.strokeStyle = 'rgba(140,100,40,.7)'; g.lineWidth = 2; g.setLineDash([3, 5]); g.beginPath(); g.moveTo(pos.sun.x, ty + 34); g.lineTo(pos.sun.x, pos.sun.y - 64 * pos.sun.k - 4); g.stroke(); g.setLineDash([]); }"""),
]
for a, b in rep:
    assert a in s, a[:90]
    s = s.replace(a, b, 1)
p.write_text(s, encoding='utf-8'); print('patched')
