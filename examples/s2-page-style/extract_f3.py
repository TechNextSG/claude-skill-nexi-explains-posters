# -*- coding: utf-8 -*-
"""Copy the Season 2 cast painter in the F3 "Pill Flat" model (the design the owner picked, 2026-10-06) out of
~/ClaudeWork/qa/cast-design/flat-sheets.html into s2cast-f3.js (read-only on the source).
Exposes window.F3 = { use(ctx), figure(c, footX, footY, height), head(...), cast: {maria, ben, jun, lim} }.
Changes vs the sheet: figure() honours c.mood (happy | worried | wow | neutral); envShadow is a local soft ellipse."""
import pathlib, re

SRC = pathlib.Path.home() / 'ClaudeWork/qa/cast-design/flat-sheets.html'
OUT = pathlib.Path(__file__).resolve().parent / 's2cast-f3.js'
s = SRC.read_text(encoding='utf-8')
a = s.index('var STY = [')
b = s.index('/* ---------------- the set')
code = s[a:b]
code = code.replace("var ST = STY[S];", "var ST = STY[2];   /* F3 Pill Flat */")
code = code.replace("head(c, fx, cy, rx, ry, 'neutral');", "head(c, fx, cy, rx, ry, c.mood || 'neutral');")
helpers_a = s.index('function rgb(')
helpers_b = s.index('var STY = [')
helpers = s[helpers_a:helpers_b]
assert "c.mood || 'neutral'" in code and 'function figure(' in code
out = ("/* S2 cast, F3 Pill Flat: copied from qa/cast-design/flat-sheets.html by extract_f3.py. Do not edit by hand. */\n"
       "(function () {\n"
       "  var g = null, INK = '#1F2340', F1 = '\"Plus Jakarta Sans\", Inter, sans-serif', F2 = 'Inter, \"Plus Jakarta Sans\", sans-serif';\n"
       "  function envShadow(gg, x, y, rx, ry, a) { var r = gg.createRadialGradient(x, y, 0, x, y, rx); r.addColorStop(0, 'rgba(20,30,60,' + (a == null ? .22 : a) + ')'); r.addColorStop(1, 'rgba(20,30,60,0)'); gg.save(); gg.translate(x, y); gg.scale(1, ry / rx); gg.translate(-x, -y); gg.fillStyle = r; gg.beginPath(); gg.arc(x, y, rx, 0, Math.PI * 2); gg.fill(); gg.restore(); }\n"
       + helpers + code +
       "\n  var byId = {}; CAST.forEach(function (c) { byId[c.id] = c; });\n"
       "  window.F3 = { use: function (ctx) { g = ctx; }, figure: function () { return figure.apply(null, arguments); }, head: function () { return head.apply(null, arguments); }, cast: byId, INK: INK };\n"
       "})();\n")
OUT.write_text(out, encoding='utf-8')
print('wrote', OUT, len(out))
