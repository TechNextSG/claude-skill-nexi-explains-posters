---
name: nexi-explains-posters
description: Design cinematic, one-of-a-kind promo posters (3:4 social images; posters only, no video) for TechNext's animated YouTube series "Nexi Explains" - one poster per episode, Quick Tip or holiday special, each built from that episode's own world (its sets, props, cast, Nexi's costume, the big moment) with its own poster genre, camera, light, type treatment and signature cinematic device, never a shared template. Covers the episode catalogue and premiere dates, borrowing the films' real art (painters, 3D Nexi renders), the uniqueness register, captions and delivery to the Marketing drive. Use whenever the user asks for a Nexi Explains poster, an episode promo, a premiere announcement, "promotion per episode", social posts about a Nexi episode/season/quick tip, or full marketing for the Nexi series - even if they only say "make the EP05 post".
---

# Nexi Explains posters

TechNext's series **Nexi Explains** (YouTube @TechNextAsia, all episodes on technext.asia/nexi-explains) stars Nexi,
the 3D robot. Every episode gets its own promo poster. The owner's rule (2026-10-06): **"this should be not a templated
design, every poster are unique"** - so each poster is a small film still designed from zero, and only the logo row is
fixed. **Always show the episode's Odoo app icons** (official icons, in the scene and in an "ODOO APPS" row). **Posters only** (owner, 2026-10-06: "no need to create a video, just poster only"): one 3:4 image per
poster, no reels or MP4s unless the owner asks again. This skill builds on the technext-social-posts engine (kit.css/kit.js page contract, render/dbg/deliver scripts)
and adds the series knowledge, the cinematography playbook and a uniqueness check.

## Read first
1. `reference/cinematography.md` - the playbook: one frozen moment, an unused archetype, camera, light plan, 3+
   cinematic devices, composition and text placement, one display type treatment, what every poster must say, motion.
2. `reference/design-rules.md` - the little that is fixed (logo row, formats, safe frame), the facts, the QA list.
3. `reference/film-art.md` - how to use the episode's real art: video contact sheets, copying film painters
   (`extract_painter.py`), re-rendering Nexi at any angle/costume (`nexi_cam.py`, holds incl. `hero`).
4. `reference/episode-worlds.md` - every episode's world, props, cast, costume, gag, thumbnail look.
5. `reference/concepts.md` - a distinct poster concept per episode (archetype, moment, camera, light, device). A
   starting point: re-check it against the register, and improve it after watching the episode.
6. `reference/lessons.md` - mistakes already made. Also technext-social-posts `reference/lessons.md` + `formats.md`.
7. The skill `nexi-character` - who Nexi is (cat attitude: offended by mess, soft on people) and her 46 reactions + 30
   variants with the marks, colours and words that make each one read. Pick the poster's reaction there (aimed at the mess,
   never the viewer) and use a DIFFERENT reaction or variant on every poster (nexi-volcano, nope X sign, yeet, blue-screen,
   lightbulb idea, starstruck... - log it in the uniqueness register). Render it from the bench `films/nx3sheet.js` (base
   kinds) or `films/nx3vsheet.js` (variants + new kinds; peak times `~/ClaudeWork/qa/nxfeel/vtimes.py`) instead of
   inventing a new face.

## Pipeline (one poster)
1. **Facts:** `python scripts/episode.py S1EP05` (title, hook, length, YouTube link, premiere in SGT, page). Never retype
   them. No `yt`/premiere -> no date on the poster (ask the owner or say "Coming soon").
2. **Watch:** contact sheet of the episode video (film-art.md) + its row in episode-worlds.md. Pick the moment.
3. **Concept:** fill the 9 axes (archetype, camera, light, palette, text, type, build, nexi, device) and run
   `python scripts/uniq.py --check '{...}'`. It must print UNIQUE. Write the concept + film idea in the page header.
4. **Scaffold:** `python scripts/new_poster.py S1EP05` -> `~/ClaudeWork/nxe-posters/s1ep05.html` (layout-free contract
   + facts; kit copied once). Copy any film painters with `extract_painter.py`; render Nexi with `nexi_cam.py`.
5. **Build** the 3:4 poster. Measure with
   `python ~/.claude/skills/technext-social-posts/scripts/dbg.py s1ep05.html 5 --shot qa/x.png`, look, fix.
6. **Audit (blocking, owner 2026-10-10: "always check if the text are too small to read, overflowing text, layering"):**
   `python ~/.claude/skills/technext-social-posts/scripts/audit.py s1ep05.html --f 34 --port 9495` must report 0 errors.
   It hooks canvas fillText too, so comic labels drawn on the canvas (name tags, pins, signs) are checked for on-screen
   size (>= 15 px), frame cuts, text under the footer/CTA, collisions and contrast. Decorative canvas words only:
   `window.TN_AUDIT_SKIP_CANVAS = ['ZZZ']`.
   **Render:** `python ~/.claude/skills/technext-social-posts/scripts/render.py s1ep05.html --posts 5 --out out` (one
   2160x2880 PNG; must print ALL CLEAN). Read the PNG at full size and at 540 px wide.
7. **Captions** in `out/captions.md` (reference/captions.md). Check the links return 200 (browser UA).
8. **Deliver:** `python ~/.claude/skills/technext-social-posts/scripts/deliver.py out "G:/Shared drives/Marketing/00. TechNext Folder/20. NEXI Explains/04. Social Media Posting Image - Promotion" --source s1ep05.html <painter>.js`
   (md5-verified; into `Season N/Image Posts/` — one folder per season, owner 2026-10-09; captions in `Season N/captions.md`). A redone poster replaces the old file (no duplicates). SendUserFile it.
   Never post or schedule.
9. **Register + learn:** `python scripts/uniq.py --add '{"key":"S1EP05","version":"v1", ...}'`; mark replaced versions
   `"superseded": true` (they stay, so their look is never reused); add lessons; copy the page into `examples/`.

## Where things are
| What | Where |
|---|---|
| Work folder (local disk) | `~/ClaudeWork/nxe-posters/` (one page per poster: `s1ep00.html`, `tip05.html` ...) |
| Delivery | Marketing drive `00. TechNext Folder/20. NEXI Explains/04. Social Media Posting Image - Promotion/` |
| Engine (shared) | `~/.claude/skills/technext-social-posts/` kit + scripts (render, dbg, deliver, sheet) + kit/nexi-cam |
| Episode data | technext.asia repo `_src/nexi_explains.py` via `scripts/episode.py` |
| Films (read-only!) | `~/ClaudeWork/nexi-tutorial/web/films/*.js`; videos on the Marketing drive folders 22, 26, 27 |
| Register | `reference/register.json` (`uniq.py --table` prints it) |
| Exaggerated kit | `kit/nxe-x/` (nxe-x.css + nxe-x.js: badge, Odoo-apps row, balloons, sheets, foam, clash flash, F3 people) + recipe in cinematography.md section 10 |
| Page style kit | `kit/nxe-page/` (nxe-page.css + nxe-page.js: the technext.asia/nexi-explains look, for posters the owner wants in that style) |
| Examples | `examples/` (S1 EP00 v1 test + v2 comic cover, S1 EP01 sunlit orrery, S2 EP00 comic splash sample (superseded), S2 EP00-02 page style, S2 all-episodes line-up `s2-all-episodes/`, post 80) |
