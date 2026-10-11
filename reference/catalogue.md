# The Nexi Explains catalogue (what there is to promote)

Run `python <skill>/scripts/episode.py --all` for the live list (74 posts as of 2026-10-06): S1 EP00-EP22, S1 Quick Tips
01-14, S2 EP00-EP13 (more planned, 31 total), S2 Quick Tips 15-34, three holiday specials (Halloween 31 Oct, Christmas
24 Dec, Year-End 31 Dec). Facts for one post: `episode.py S1EP03`.

## Where the data and files are
| What | Where |
|---|---|
| Episode list (titles, hooks, YouTube ids, premieres in UTC) | technext.asia repo `_src/nexi_explains.py` (worktree `~/ClaudeWork/tn-wt-explains`); the /nexi-explains page is built from it |
| Videos, thumbnails, covers, posting plans | Marketing drive `00. TechNext Folder/20. NEXI Explains/01. Season 1` (S1 + tips 01-14), `20. NEXI Explains/02. Season 2`, `20. NEXI Explains/03. Holiday Specials` |
| Film source code (sets, props, painters) | `~/ClaudeWork/nexi-tutorial/web/films/*.js` (read-only) |
| Every episode's world, props, cast, costume, gag | `reference/episode-worlds.md` |
| YouTube channel | https://www.youtube.com/@TechNextAsia (premieres 10:00 UTC = 6 PM SGT) |
| All-episodes page | https://technext.asia/nexi-explains |

## Scheduled premieres (re-check with episode.py before every poster)
As of 2026-10-06: S1 EP00 Tue 13 Oct, EP01 Sat 17 Oct, EP02 Tue 20 Oct, EP03 Sat 24 Oct, all 6 PM SGT. Later posts have
no YouTube id yet: a poster for them says nothing about the date (or "Coming soon") until the owner schedules them.
To re-sync after new uploads: list ids from the channel's /videos page (grep "videoId"), oEmbed for titles (403 = not
public), watch page `"startTimestamp"` for the premiere; the website session updates `_src/nexi_explains.py`. Don't edit
the website repo from this skill: tell the owner which ids are missing.

## Posting rhythm (suggested, the owner decides)
Promo poster 1-3 days before the premiere (feed image); an "Out now" poster is optional. Posters only, no reels.
EP00 is the pilot and should go first. Agreed 2026-10-09: S1 episodes every Tue + Sat (EP22 Tue 29 Dec), Quick Tips every Sat from 17 Oct (TIP14 Sat 16 Jan), all 6 PM SGT; same-day overlap OK; holidays move nothing. Full table: `20. NEXI Explains/01. Season 1/00 Posting Plan.md`. Only booked premieres (episode.py) may show a date on a poster.
