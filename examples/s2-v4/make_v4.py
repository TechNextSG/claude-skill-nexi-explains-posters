# -*- coding: utf-8 -*-
"""S2 EP00-05 v4 = the exaggerated (x) layouts the owner approved, with only the background and the CTA changed.
Writes s2ep0Nv4.html from s2ep0Nx.html (the x pages stay as they are)."""
import pathlib
D = pathlib.Path(__file__).resolve().parent
YTB_CSS = ('\n.ytb{display:inline-flex;align-items:center;gap:16px;height:92px;padding:0 36px 0 30px;border-radius:18px;background:#FF0000;'
           'color:#fff;font:800 34px/1 var(--display);letter-spacing:-.01em;white-space:nowrap;border:4px solid #101C45;box-shadow:0 9px 0 #101C45}'
           '\n.ytb svg{width:40px;height:40px}\n')
EDITS = {
 0: [("NXP.bg(g, W, H, SUN[0], SUN[1] + 120);", "NXB.storm(g, W, H, { sun: SUN });"),
     ("g.fillStyle = '#284A9E'; g.fill(p);", "g.fillStyle = '#3E2172'; g.fill(p);"),
     ("st.addColorStop(0, '#16307A'); st.addColorStop(1, '#0B1D52');", "st.addColorStop(0, '#2E1A5C'); st.addColorStop(1, '#130B33');")],
 1: [("NXP.bg(g, W, H, 790, 560);", "NXB.office(g, W, H, { burst: [790, 520] });"),
     ("[[60, 640, 14, '#FFFFFF'], [990, 330, 16], [610, 300, 12], [1000, 940, 13, '#FFFFFF']]", "[[990, 330, 16], [610, 300, 12]]")],
 2: [("NXP.bg(g, W, H, 540, 480);", "NXB.golden(g, W, H, { c: HOLE });"),
     ("fl.addColorStop(0, '#1A3584'); fl.addColorStop(1, '#0B1D52');", "fl.addColorStop(0, '#5A6078'); fl.addColorStop(1, '#262B40');")],
 3: [("NXP.bg(g, W, H, 560, 620);", "NXB.blueprint(g, W, H, { radar: [180, 1180], plane: [900, 160] });")],
 4: [("NXP.bg(g, W, H, 420, 380);", "NXB.blinds(g, W, H, {});")],
 5: [("NXP.bg(g, W, H, 840, 560);", "NXB.sunset(g, W, H, { sun: [840, HZ - 10], hz: HZ });"),
     ("sea.addColorStop(0, '#2C5DC8'); sea.addColorStop(0.5, '#173E9A'); sea.addColorStop(1, '#0B1D52');", "sea.addColorStop(0, '#2BB7C9'); sea.addColorStop(0.5, '#147E9E'); sea.addColorStop(1, '#0B3A5C');")],
}
for n, reps in EDITS.items():
    s = (D / f's2ep0{n}x.html').read_text(encoding='utf-8')
    for a, b in reps:
        assert a in s, (n, a[:60])
        s = s.replace(a, b, 1)
    assert s.count('class="btn-y"') == 1, n
    s = s.replace('class="btn-y"', 'class="ytb"')
    s = s.replace('<script src="nxe-x.js"></script>', '<script src="nxe-x.js"></script><script src="nxe-bg.js"></script>', 1)
    s = s.replace('</style>', YTB_CSS + '</style>', 1)
    s = s.replace('(exaggerated)</title>', '(v4)</title>').replace('Season 2 Introduction (exaggerated sample)</title>', 'Season 2 Introduction (v4)</title>')
    (D / f's2ep0{n}v4.html').write_text(s, encoding='utf-8')
    print('wrote', f's2ep0{n}v4.html')
