# -*- coding: utf-8 -*-
"""Start a poster: work folder + kit copy + a layout-free page with the episode's facts in its header.

    python new_poster.py S1EP01            # -> ~/ClaudeWork/nxe-posters/s1ep01.html
    python new_poster.py TIP05 --dir D     # another work folder

The work folder (default ~/ClaudeWork/nxe-posters, on LOCAL disk: Drive sync corrupts renders) gets kit.css, kit.js and
assets/ from the technext-social-posts kit once, plus this skill's assets (Nexi renders). Existing pages are never
overwritten. Post number = episode number (tips: tip number, specials: 90-92), so files are
NN-technext-nexi-explains-<key>-<title>.png."""
import argparse, json, pathlib, re, shutil, subprocess, sys

SKILL = pathlib.Path(__file__).resolve().parent.parent
SOCIAL = pathlib.Path.home() / '.claude/skills/technext-social-posts/kit'
SPECIAL_P = {'HALLOWEEN': 90, 'CHRISTMAS': 91, 'YEAR-END': 92}


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    ap = argparse.ArgumentParser(); ap.add_argument('key'); ap.add_argument('--dir', default=str(pathlib.Path.home() / 'ClaudeWork/nxe-posters'))
    a = ap.parse_args()
    f = json.loads(subprocess.run([sys.executable, str(SKILL / 'scripts/episode.py'), a.key], capture_output=True, text=True, encoding='utf-8').stdout or 'null')
    if not f:
        sys.exit(f'{a.key}: unknown (python episode.py --all)')
    work = pathlib.Path(a.dir); work.mkdir(parents=True, exist_ok=True)
    for name in ('kit.css', 'kit.js'):
        if not (work / name).exists(): shutil.copy(SOCIAL / name, work / name)
    if not (work / 'assets').exists(): shutil.copytree(SOCIAL / 'assets', work / 'assets')
    for p in (SKILL / 'kit/assets').rglob('*'):
        if p.is_file():
            d = work / 'assets' / p.relative_to(SKILL / 'kit/assets'); d.parent.mkdir(parents=True, exist_ok=True)
            if not d.exists(): shutil.copy(p, d)
    for d in ('out', 'qa'): (work / d).mkdir(exist_ok=True)
    key = f['key']; num = SPECIAL_P.get(key) or int(re.sub(r'\D', '', key[-2:]) or 0)
    slug = 'nexi-explains-' + re.sub(r'(s\d)ep', r'\1-ep', key.lower()) + '-' + re.sub(r'[^a-z0-9]+', '-', f['title'].lower()).strip('-')
    page = work / (key.lower() + '.html')
    if page.exists():
        print('exists, not touched:', page); return
    facts = ' | '.join(f'{k}: {v}' for k, v in f.items() if v and k not in ('thumb',)).replace('*/', '* /')
    s = (SKILL / 'kit/starter.html').read_text(encoding='utf-8')
    s = s.replace('__KEY__', key).replace('__TITLE__', f['title']).replace('__P__', str(num)).replace('__SLUG__', slug[:70].rstrip('-')).replace('__FACTS__', facts)
    page.write_text(s, encoding='utf-8')
    print(page, '\n post', num, '->', f'{num:02d}-technext-{slug[:70].rstrip("-")}.png')


if __name__ == '__main__':
    main()
