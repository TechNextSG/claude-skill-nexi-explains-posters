# Using the episode's real art

A poster is stronger when it shows the episode's own world. Three sources, all used by COPYING.

## 1. Frames from the delivered video (to study, not to paste)
Episodes live on the Marketing drive: S1 + Quick Tips 01-14 in `00. TechNext Folder/20. NEXI Explains/01. Season 1/<EPnn - title>/`,
S2 + Quick Tips 15+ in `20. NEXI Explains/02. Season 2/`, specials in `20. NEXI Explains/03. Holiday Specials/`. Each folder has the
16x9 MP4, the 9x16 short, the YouTube thumbnail and the 9x16 cover (S2 has no thumbnails until the season is done).
Contact sheet of an episode (read it before designing; it shows sets, props and the big moments):
```bash
ffmpeg -hide_banner -loglevel error -i "<episode> (16x9).mp4" -vf "fps=1/8,scale=480:-1,tile=4x6" -frames:v 1 qa/sheet.jpg
```
Never paste a video frame or the thumbnail into a poster: the poster must be a new image. `research/episode-worlds.md`
in the EP00 work folder (copied to this skill as `reference/episode-worlds.md`) lists every episode's world, props,
cast, costume and gag.

## 2. The film's own painters (Canvas 2D code)
Every film is a JS file in `~/ClaudeWork/nexi-tutorial/web/films/` (pilot.js = S1 EP00, s2e04.js = S2 EP04 ...; the
header comment of each film describes its story and sets). Copy the functions you need into a module:
```bash
python <skill>/scripts/extract_painter.py pilot ep00-monster.js EP00M hsh rrP ellP polyP cel starPts var:KJ var:MG \
  fat skinGrid claws paw pencil sheetSpike monster --map "t * 2.2=t * 2" "t * 1.7 - 0.8=t * 2 - 0.8" "t * 1.7=t * 2"
```
Then in the page: `<script src="ep00-monster.js">`, set `window.T = th` each frame, set the state object (e.g.
`EP00M.KJ.roar = .8`) and call `EP00M.monster(g, x, y, scale)`. Integer time factors only (the script refuses others).
Painters that use the film library (`L.*`, `KIT.*`, `C.*`, `N.*`) need stubs or a hand redraw (the EP00 poster redrew
Lotus Mart with plain canvas calls). Shared kits worth knowing: `films/inc/envkit.js` (painted sets, also exposed as
`QW` in technext-social-posts `kit/qtworld.js`), `inc/s2kit.js` + `inc/s2flat.js` (S2 cast, Bluebay office; the FLAT F3
look is the current S2 style), `inc/tipkit.js` (Quick Tips world), `inc/cutekit.js`.
**Never write anything inside ~/ClaudeWork/nexi-tutorial** (the release gate fingerprints that tree; one stray file
breaks every film's audit). Read, copy, close.

## 3. Nexi herself (the real 3D model, any angle, any costume)
`~/.claude/skills/technext-social-posts/kit/nexi-cam/nexi_cam.py` renders a transparent PNG:
```bash
cd ~/.claude/skills/technext-social-posts/kit/nexi-cam
python nexi_cam.py s1ep00 '{"hold":"hero","face":"star","yaw":0.4,"look":"cam","cam":{"pos":[3,-7.5,20],"look":[0,0.3,0],"fov":36,"roll":0.06}}'
```
- Holds: idle, hi, present, point, pointL, celebrate, gasp, think, cute, clap, knock, kiss, shrug, jump, reach,
  **hero / heroL** (fist up beside the head, other hand tucked: added for the EP00 poster). Her hands float: an arm
  offset above ~1.3 puts the fist far above the head; ~1.15 sits beside it.
- Faces: idle, happy, star, wow, content, love, dizzy. `look: "cam"` = eye contact.
- Costumes (`"wear"`): hardhat conductor pilot glasses strawhat beret chef cap knight bowtie goggles bellhop beanie tophat
  boppers helmet astro (sheet: technext-social-posts `kit/assets/nexi/costumes/_wear_sheet.jpg`). Use the episode's own
  costume when the research lists one.
- Measure the render before placing it (neck/body centre as a fraction of the PNG) and keep those numbers in the page
  (`NEXI = {nx, ny}` in the EP00 page): every render has different hand positions, so the bounding box moves.
- The EP00 cape is drawn in 2D behind the render (a cape hanging straight down hides behind her round body; let it
  stream sideways like a flag). Ready renders: `kit/assets/nexi/` here and in technext-social-posts.
