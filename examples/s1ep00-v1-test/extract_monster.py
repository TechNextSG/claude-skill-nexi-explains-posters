# -*- coding: utf-8 -*-
"""Copy the Spreadsheet Monster painter out of the EP00 pilot film (read-only) into ep00-monster.js.
Only reads ~/ClaudeWork/nexi-tutorial/web/films/pilot.js; never writes there (the video gate fingerprints that tree).
Time terms are made loop-safe: every sin(t * k) gets an integer k, and the page sets window.T = 2*PI*t/LOOP."""
import pathlib, re

SRC = pathlib.Path.home() / 'ClaudeWork/nexi-tutorial/web/films/pilot.js'
OUT = pathlib.Path(__file__).resolve().parent / 'ep00-monster.js'
lines = SRC.read_text(encoding='utf-8').split('\n')


def grab(start_pat, end_pat=None):
    """Lines from the one matching start_pat up to (and including) the one matching end_pat (or just one line)."""
    i = next(k for k, l in enumerate(lines) if re.search(start_pat, l))
    if not end_pat:
        return [lines[i]]
    j = next(k for k in range(i + 1, len(lines)) if re.search(end_pat, lines[k]))
    return lines[i:j + 1]


body = []
body += grab(r'^\s*function hsh\(')
body += grab(r'^\s*function rrP\(')
body += grab(r'^\s*function ellP\(')
body += grab(r'^\s*function polyP\(')
body += grab(r'^\s*function cel\(')
body += grab(r'^\s*function starPts\(')
body += grab(r'^\s*var KJ = ')
body += grab(r'^\s*var MG = ')
body += grab(r'^\s*function fat\(', r'^\s*}\s*$')
body += grab(r'^\s*function skinGrid\(')
body += grab(r'^\s*function claws\(')
body += grab(r'^\s*function paw\(')
body += grab(r'^\s*function pencil\(', r'^\s*}\s*$')
body += grab(r'^\s*function sheetSpike\(', r'^\s*}\s*$')
body += grab(r'^\s*function monster\(', r'^\s*}\s*$')
src = '\n'.join(body)

# loop-safe frequencies (the film used 2.2 and 1.7 rad/s; the poster runs on th = 2*PI*t/8)
for a, b in [('t * 2.2', 't * 2'), ('t * 1.7 - 0.8', 't * 2 - 0.8'), ('t * 1.7', 't * 2')]:
    src = src.replace(a, b)
left = sorted(set(re.findall(r't \* (\d+\.\d+)', src)))
assert not left, 'non-integer time factors left: %s' % left

head = """/* Spreadsheet Monster, copied from nexi-tutorial/web/films/pilot.js (EP00 pilot) by extract_monster.py. Do not edit by hand:
   re-run the script. Exposes window.EP00M = { monster(g, x, y, s), KJ }. Set window.T before drawing. */
(function () {
  var INK2 = '#0B1534', YEL = '#FFD84A';
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
"""
tail = """
  window.EP00M = { monster: monster, KJ: KJ, cel: cel, rrP: rrP, ellP: ellP, polyP: polyP, starPts: starPts, hsh: hsh, INK2: INK2 };
})();
"""
OUT.write_text(head + src + tail, encoding='utf-8')
print('wrote', OUT, len(src), 'chars')
