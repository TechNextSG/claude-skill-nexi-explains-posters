# -*- coding: utf-8 -*-
"""Keep every Nexi Explains poster unique (owner, 2026-10-06: "this should be not a templated design, every poster are
unique"). The register is reference/register.json: one entry per delivered (or test) poster, 9 design axes each.

    python uniq.py --check '{"archetype": "...", "camera": "...", ...}'   # before building: is this concept new enough?
    python uniq.py --add   '{"key": "S1EP01", "version": "v1", ...}'      # after delivery: record it
    python uniq.py --table                                                # the register as a markdown table

The rule (a concept FAILS when any line is true):
  1. its ARCHETYPE (poster genre) is already in the register, unless --allow-archetype is given because the owner asked;
  2. it shares 4 or more of the 8 other axes with any single poster (too close a look);
  3. it shares PALETTE, TEXT placement or BUILD technique with one of the last 3 posters (neighbours in the feed must differ).
Values are compared as lower-case keywords: write them short and consistent (e.g. "worm's-eye", "golden hour").
OWNER SERIES STYLE: when the owner asks for a matching look (2026-10-07: "the design of poster should be
technext.asia/nexi-explains similar to this style"), give the concept "series": "<name>". Posters with the same series
may share palette, type and build (the style); archetype, camera, text placement, nexi and device must still differ.
Superseded versions stay in the register (marked "superseded": true) so their look is never used again."""
import argparse, json, pathlib, sys

AXES = ['archetype', 'camera', 'light', 'palette', 'text', 'type', 'build', 'nexi', 'device']
REG = pathlib.Path(__file__).resolve().parent.parent / 'reference' / 'register.json'


def norm(v):
    return ' '.join(str(v or '').lower().replace('-', ' ').split())


def load():
    return json.loads(REG.read_text(encoding='utf-8')) if REG.exists() else []


def check(c, reg, allow_arch=False):
    probs = []
    for k in AXES:
        if not c.get(k):
            probs.append(f'missing axis "{k}"')
    for r in reg:
        if r.get('key') == c.get('key'):   # a new version of the same poster may keep its own look
            continue
        tag = f"{r.get('key')} {r.get('version', '')}".strip()
        if not allow_arch and norm(r.get('archetype')) == norm(c.get('archetype')):
            probs.append(f'archetype "{c.get("archetype")}" already used by {tag}')
        shared = ('palette', 'type', 'build') if c.get('series') and r.get('series') == c.get('series') else ()
        same = [k for k in AXES[1:] if k not in shared and norm(r.get(k)) and norm(r.get(k)) == norm(c.get(k))]
        if len(same) >= 4:
            probs.append(f'too close to {tag}: same {", ".join(same)}')
    for r in [x for x in reg if not x.get('superseded')][-3:]:
        tag = f"{r.get('key')} {r.get('version', '')}".strip()
        shared = ('palette', 'build') if c.get('series') and r.get('series') == c.get('series') else ()
        for k in ('palette', 'text', 'build'):
            if k not in shared and norm(r.get(k)) and norm(r.get(k)) == norm(c.get(k)):
                probs.append(f'same {k} as a recent poster ({tag}): "{c.get(k)}"')
    return probs


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    ap = argparse.ArgumentParser()
    ap.add_argument('--check'); ap.add_argument('--add'); ap.add_argument('--table', action='store_true')
    ap.add_argument('--allow-archetype', action='store_true')
    a = ap.parse_args()
    reg = load()
    if a.table:
        print('| Key | Ver | ' + ' | '.join(k.capitalize() for k in AXES) + ' |')
        print('|' + '---|' * (len(AXES) + 2))
        for r in reg:
            print(f"| {r.get('key')} | {r.get('version', '')}{' (superseded)' if r.get('superseded') else ''} | " + ' | '.join(str(r.get(k, '')) for k in AXES) + ' |')
        return
    c = json.loads(a.check or a.add or '{}')
    if not c:
        sys.exit(__doc__)
    probs = check(c, reg, a.allow_archetype)
    for p in probs:
        print('FAIL', p)
    if probs:
        sys.exit(1)
    if a.add:
        if not c.get('key'):
            sys.exit('--add needs "key" (e.g. S1EP01) and "version"')
        reg = [r for r in reg if not (r.get('key') == c['key'] and r.get('version') == c.get('version'))] + [c]
        REG.write_text(json.dumps(reg, indent=1, ensure_ascii=False) + '\n', encoding='utf-8')
        print('added', c['key'], c.get('version', ''), f'({len(reg)} in the register)')
    else:
        print('UNIQUE: passes all three rules against', len(reg), 'posters')


if __name__ == '__main__':
    main()
