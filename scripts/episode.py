# -*- coding: utf-8 -*-
"""Print the facts for one Nexi Explains post, straight from the website's episode list (never retype them).

    python episode.py S1EP00          # season 1 episode
    python episode.py S2EP04          # season 2 episode
    python episode.py TIP05           # quick tip 05 (S1 tips 01-14, S2 tips 15-34)
    python episode.py HALLOWEEN       # holiday special (HALLOWEEN, CHRISTMAS, YEAR-END)
    python episode.py --all           # one line per post, with its premiere if scheduled

Source of truth: <site>/_src/nexi_explains.py in the technext.asia repo (the /nexi-explains page is built from it).
The repo is looked up in $NXE_SITE, then ~/ClaudeWork/tn-wt-explains, then ~/ClaudeWork/TechNext-Website.
Premieres there are UTC; this prints SGT (UTC+8, same as Manila). A post without `yt` has no date yet: ask the owner
or re-sync the channel (see reference/catalogue.md) before putting a date on a poster."""
import datetime, importlib.util, json, os, pathlib, re, sys

CANDIDATES = [os.environ.get('NXE_SITE', ''), '~/ClaudeWork/tn-wt-explains', '~/ClaudeWork/TechNext-Website']


def load():
    for c in CANDIDATES:
        if not c:
            continue
        f = pathlib.Path(c).expanduser() / '_src' / 'nexi_explains.py'
        if f.exists():
            spec = importlib.util.spec_from_file_location('nexi_explains', f)
            m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
            return m, f
    sys.exit('nexi_explains.py not found: set NXE_SITE to the technext.asia repo')


def posts(m):
    out = []
    for season, arcs, tips in (('S1', m.S1, m.S1_TIPS), ('S2', m.S2, m.S2_TIPS)):
        for arc, eps in arcs:
            for e in eps:
                num = re.sub(r'\D', '', e['code'].split('EP')[-1])
                out.append(dict(e, key=f'{season}EP{num}', season=season, arc=arc, kind='episode'))
        for e in tips:
            num = re.sub(r'\D', '', e['code'])
            out.append(dict(e, key=f'TIP{int(num):02d}', season=season, arc='Quick Tips', kind='tip'))
    for e in m.SPECIALS:
        out.append(dict(e, key=e['code'].upper(), season='Special', arc='Holiday specials', kind='special'))
    return out


def facts(e, m):
    f = {k: e.get(k) for k in ('key', 'code', 'title', 'hook', 'len', 'season', 'arc', 'kind', 'psych', 'takeaway', 'airs', 'thumb')}
    if e.get('yt'):
        f['youtube'] = 'https://www.youtube.com/watch?v=' + e['yt']
    if e.get('premiere'):
        t = datetime.datetime.fromisoformat(e['premiere'].replace('Z', '+00:00')) + datetime.timedelta(hours=8)
        hour = t.strftime('%I').lstrip('0') + (':' + t.strftime('%M') if t.minute else '') + ' ' + t.strftime('%p')
        f['premiere_sgt'] = t.strftime('%a %d %b %Y, ') + hour + ' SGT'
        f['premiere_short'] = (t.strftime('%a ') + str(t.day) + t.strftime(' %b').upper() + ' · ' + hour + ' SGT').upper()
    f['page'] = 'https://technext.asia/' + (e['page'].replace('.html', '') if e.get('page') else 'nexi-explains')
    f['all_episodes'] = 'https://technext.asia/nexi-explains'
    f['channel'] = m.CHANNEL
    return f


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    m, src = load()
    ps = posts(m)
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    if sys.argv[1] == '--all':
        for e in ps:
            f = facts(e, m)
            print(f"{f['key']:<10} {f['title'][:44]:<44} {f['len']:>5}  {f.get('premiere_sgt') or f.get('airs') or '-'}")
        print(f'({len(ps)} posts, from {src})')
        return
    key = sys.argv[1].upper().replace(' ', '')
    hit = [e for e in ps if e['key'] == key]
    if not hit:
        sys.exit(f'{key}: not found. Keys look like S1EP00, S2EP04, TIP05, HALLOWEEN. Try --all')
    print(json.dumps(facts(hit[0], m), indent=2, ensure_ascii=False))


if __name__ == '__main__':
    main()
