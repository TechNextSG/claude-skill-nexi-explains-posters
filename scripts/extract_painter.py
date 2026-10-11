# -*- coding: utf-8 -*-
"""Copy drawing functions out of a Nexi film into a standalone JS module for a poster, so the poster shows the episode's
REAL art (the Spreadsheet Monster, Lotus Mart, a sidekick, a set) instead of a look-alike.

    python extract_painter.py <film> <out.js> <NAME> fn1 fn2 var:KJ var:MG ... [--map "t * 2.2=t * 2" ...]

  <film>   film id (pilot, erp, iot, s2e01 ...) or a path; ids resolve to ~/ClaudeWork/nexi-tutorial/web/films/<id>.js
  <NAME>   global the module exposes: window.<NAME> = { fn1: fn1, ..., KJ: KJ }
  fnX      a function declared at the start of a line (`function fnX(`); single-line or block (ends at the first line
           that is just "}" at the same indent)
  var:X    a `var X = ...;` line (state objects, colour constants)
  --map    literal replacements applied after copying (make time factors integers for a seamless loop, swap a film
           helper for a stub). The script refuses to write while a `t * <decimal>` factor is left.

READ-ONLY on nexi-tutorial: the film tree is fingerprinted by the video release gate, so a write there breaks every
film's audit. The module gets stubs for lerp/clamp/INK2/YEL; anything else the copied code needs (L.*, KIT.*, C.*,
N.*) must be stubbed with --map or by hand in the poster page. Run `node --check` is not available on this PC: open the
poster with dbg.py and read the console errors instead."""
import argparse, pathlib, re, sys

FILMS = pathlib.Path.home() / 'ClaudeWork/nexi-tutorial/web/films'


def block(lines, i):
    ind = len(lines[i]) - len(lines[i].lstrip())
    if lines[i].rstrip().endswith('}') and lines[i].count('{') == lines[i].count('}'):
        return lines[i:i + 1]
    for j in range(i + 1, len(lines)):
        if lines[j].strip() == '}' and len(lines[j]) - len(lines[j].lstrip()) == ind:
            return lines[i:j + 1]
    sys.exit(f'no end found for the block starting at line {i + 1}')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('film'); ap.add_argument('out'); ap.add_argument('name'); ap.add_argument('items', nargs='+')
    ap.add_argument('--map', nargs='*', default=[])
    a = ap.parse_args()
    src = pathlib.Path(a.film) if a.film.endswith('.js') else FILMS / (a.film + '.js')
    lines = src.read_text(encoding='utf-8').split('\n')
    body, names = [], []
    for it in a.items:
        if it.startswith('var:'):
            v = it[4:]
            i = next((k for k, l in enumerate(lines) if re.match(r'\s*var ' + re.escape(v) + r'\s*=', l)), None)
            if i is None: sys.exit(f'var {v} not found in {src.name}')
            body.append(lines[i]); names.append(v)
        else:
            i = next((k for k, l in enumerate(lines) if re.match(r'\s*function ' + re.escape(it) + r'\(', l)), None)
            if i is None: sys.exit(f'function {it} not found in {src.name}')
            body += block(lines, i); names.append(it)
    code = '\n'.join(body)
    for m in a.map:
        old, new = m.split('=', 1)
        if old not in code: print('warning: --map pattern not found:', old)
        code = code.replace(old, new)
    left = sorted(set(re.findall(r'\bt \* (\d+\.\d+)', code)))
    if left:
        sys.exit('non-integer time factors left (the loop would jump): ' + ', '.join(left) + '  -> add --map "t * x.y=t * n"')
    head = (f'/* {a.name}: copied from nexi-tutorial/web/films/{src.name} by extract_painter.py ({" ".join(a.items)}).\n'
            '   Do not edit by hand: re-run the script. Set window.T (radians of the poster loop) before drawing. */\n'
            '(function () {\n'
            "  var INK2 = '#0B1534', YEL = '#FFD84A';\n"
            '  function lerp(a, b, t) { return a + (b - a) * t; }\n'
            '  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }\n')
    tail = '\n  window.' + a.name + ' = { ' + ', '.join(f'{n}: {n}' for n in names) + ' };\n})();\n'
    pathlib.Path(a.out).write_text(head + code + tail, encoding='utf-8')
    print(f'{a.out}: {len(names)} items, {len(code)} chars from {src.name}')


if __name__ == '__main__':
    main()
