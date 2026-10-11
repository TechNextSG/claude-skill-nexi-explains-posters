# Design rules: the little that is fixed, and the facts

## Fixed on every poster (owner rules carried over from technext-social-posts)
- **Logo row:** TechNext horizontal logo top-left, plain Odoo wordmark top-right, `.brand` left 72 / right 72 / top 64 /
  height 72. White versions on dark scenes (`dark` class + `odoo-logo-white.png`). No card behind the
  Odoo wordmark, never the "Odoo Ready Partner" badge image. Never moved, resized or restyled.
  EXCEPTION (owner, 2026-10-07, S2 EP00 comic poster): "dont use technext logo, or any templated technext logo above"
  -> that poster has no logo row; the masthead leads and technext.asia sits in the comic footer. The three Season 2
  posters in the page style (2026-10-07) follow it too. Ask before dropping the row on Season 1 posters.
- **Page style on request:** when the owner asks for the technext.asia/nexi-explains look, use kit/nxe-page/ and
  `"series": "nxe-page"` in uniq.py; the layout of each poster is still its own.
- **Format:** posters only (owner, 2026-10-06: "no need to create a video, just poster only"): one 3:4 image per
  poster, rendered 2160x2880 (`render.py --posts N`), delivered to `Season N/Image Posts/` (one folder per season, owner 2026-10-09: "properly seperate the poster per season"), captions in `Season N/captions.md`. No reels/MP4s unless the owner asks.
- **Safe frame:** nothing readable within 36 px of the edge. kit.js QA enforces it: render.py must print ALL CLEAN.
- **Never** post or schedule (Buffer/Meta belong to the owner). Deliver files + captions only.

- **ODOO APP ICONS on every poster** (owner, 2026-10-07: "always dont forget odoo apps logo"): show the official icon of
  each Odoo app the episode uses (kit/assets/odoo/*.svg, same files as technext.asia) inside the scene AND in an
  "ODOO APPS" row (icon + app name). Contacts has its official icon (contacts.svg). No official Barcode icon exists in our sets: use Inventory (stock.svg) and say
  "Inventory · Barcode". Never redraw or recolour an app icon.

- **CTA = YouTube red button** (owner, 2026-10-07: "cta should be red box white text about youtube"): #FF0000 rounded
  box, white "Subscribe on YouTube" + play triangle (no YouTube logo artwork), kit/nxe-v3 `.ytb`.
- **Not messy:** about five text groups per poster (episode tag, title, one balloon or line, Odoo apps row, footer).

## Free on every poster (and expected to change)
Composition, archetype, camera, light, palette, title type treatment, label style, how the date and CTA are presented,
the footer's styling (it can be a ticket stub, a sign, a credits block ...) as long as it shows the CTA and technext.asia.
There is NO series badge, frame or bottom stack shared between posters. If two posters could be swapped onto each
other's layout, one of them is a template: redesign it.

## Facts
- Episode facts come from `scripts/episode.py <KEY>` (the technext.asia episode list). Never retype titles, dates or
  links from memory. Premiere times are 6 PM SGT unless episode.py says otherwise.
- TechNext: Odoo Ready Partner (never "certified/gold"); Singapore HQ, Taguig City (PH), Ho Chi Minh City (VN); clients
  in 10+ countries; four practices ERP, AI, Marketing, Technology; never Cyber Security. More in technext-social-posts
  `reference/content-rules.md`.
- Odoo facts on the poster must match the episode (it was fact-checked for Odoo 17): show only what the episode shows.
- Sample names from the films stay samples: Lotus Mart, Harbourline Supplies, Bluebay Trading (S2), S00042... Put a
  small "Sample" tag on any sample shop/document/number that is readable on the poster.
- Characters: Nexi (she/her in the series), the S2 cast Maria, Ben, Jun, Mr. Lim, the sidekick animals. Never invent
  staff or real clients. No other brands' logos (a generic "play" triangle, not the YouTube logo).
- CTA links: the YouTube watch link of the episode (episode.py `youtube`), technext.asia/nexi-explains, or the
  episode's technext.asia page; check each returns 200 with a browser UA before delivery.

## QA (by eye, on the rendered PNG, at full size AND at 540 px wide)
1. One second test at phone size: what is it (Nexi Explains + episode), what happens (the moment), when (date).
2. The episode's real world is recognisable (its props, cast, costume): someone who watched it says "that's EP05".
3. Logo row identical; white on dark. Nothing readable cut or crowded; no label on top of its object.
4. 3+ cinematic devices visible; the signature device reads.
5. `uniq.py --check` passed for the concept; the poster also looks unlike the last poster delivered (open both).
6. Facts: title, code, date, link exactly as episode.py; samples tagged.
