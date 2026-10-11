# Lessons (add after every poster)

## Owner direction
- 2026-10-06: "create a social media posting of nexi explain promotion per episode, do test image s1ep00" -> S1 EP00
  test v1 (comic-book cover). Then, mid-build: **"i will create full marketing on nexi's explain. create a proper skills
  design and cinematic to improve the poster design. this should be not a templated design, every poster are unique"**
  -> this skill; no series badge/frame/bottom stack; uniq.py register; EP00 rebuilt as v2.
- 2026-10-06, while the EP00 reel was rendering: **"no need to create a video, just poster only."** -> posters
  only; the reel render was stopped and its frames deleted; nothing in Video Posts/.
- Inherited from technext-social-posts (still in force): logo row fixed; 3:4 images; light/warm lean,
  never dark sci-fi hologram dashboards; never post or schedule.

- 2026-10-07, S2 EP00: **"create a poster commercial for season 2 ep 00. more comical style. similar in first image you
  created, but dont use technext logo, or any templated technext logo above (below cta already good, make it comic
  style). more like comic poster. do sample"** -> comic splash page + panel strip, NO logo row at the top (the series
  masthead takes its place), CTA + technext.asia at the bottom in comic lettering, no TechNext logo image anywhere.
  Applied to this poster; ask before dropping the logo row on other posters.

- 2026-10-07: **"lets do 3 poster for season 2 starting ep00. but the design of poster should be
  https://technext.asia/nexi-explains similar to this style."** -> S2 EP00/01/02 in the PAGE STYLE (kit/nxe-page/:
  nxe-page.css tokens + components from assets/css/nexi-explains.css, nxe-page.js canvas bg/rays/dots/speed/twinkle/
  app stickers/sticker outline). Shared style, own layout per poster (uniq.py "series": "nxe-page" lets palette, type
  and build repeat; archetype, camera, text placement, nexi and device must differ). No logo row on S2 posters; CTA +
  technext.asia at the bottom. The S2 EP00 comic sample was replaced (superseded in the register).

## Build gotchas (EP00)
- A canvas display font (Bangers) is not loaded until the DOM uses it: `document.fonts.load('64px Bangers')` in setup,
  or the SFX word renders in a serif fallback.
- Bash heredocs with JS quotes break ("unexpected EOF"): write patch scripts with the Write tool.
- A cape hanging behind a round robot is invisible; stream it sideways like a flag, keep its hem above the title.
- Orb labels that follow an orbit collided with the scene (Lotus Mart's sign); named services moved into a chip row in
  the words, the orbs keep only glyphs + matching colours.
- Nexi's floating hand near the monster's claw reads as a face-off only with 60+ px between them.
- A warm horizon behind a skyline mostly disappears under the bottom darkening: put the warm light where it stays
  visible (moon glow, lamp pools, rim light) if the poster should feel warmer.

## Build gotchas (EP01)
- nexi_cam `look: [x, y]` plus `yaw` both turn the head: together they swung her to full profile (visor hidden). Use a
  small yaw (0.2-0.3) and a look target near the centre ([0.62, 0.46]) so the face stays readable.
- Pale objects in a warm scene read GREY at phone size when their edge shading covers most of the disc: keep the shade
  in the outer 10-20% of a sphere (inner radius 0.8r) and keep the key light gradient near white.
- `render.py` can fail with OSError [Errno 22] when the PNG is open in a viewer: just re-run.
- Name tags on objects at several depths: back objects get the tag ABOVE, front objects BELOW, clamp to the frame (an
  "Accounting" tag ran off the right edge until clamped).
- A text-heavy museum plaque or ticket can carry the date/CTA instead of a footer pill: the footer may be restyled.

## Build gotchas (S2 EP00 comic)
- The S2 cast in the current F3 "Pill Flat" model comes from `~/ClaudeWork/qa/cast-design/flat-sheets.html` (the design
  the owner picked), copied by `examples/s2ep00-sample/extract_f3.py` into `s2cast-f3.js`: `F3.use(ctx)`,
  `F3.figure(F3.cast.lim, footX, footY, height)`; set `mood` (happy | worried | wow | neutral), `pose` [left, right]
  arm angles (0 = down, ~2.7 = up) and `prop` (clipboard | thumb | phone | mug | null) on the cast object, then restore.
  The film kit (s2kit/s2flat) needs the whole video engine: don't extract from it.
- Comic "sticker" outline for flat characters and the 3D Nexi: draw to an offscreen canvas, stamp its silhouette in ink
  at 16 offsets (5 px) + a hard 7 px drop shadow, then the art on top (`sticker()` in the S2 EP00 page).
- Bangers is caps-only: "technext.asia" renders TECHNEXT.ASIA. Fine in comic lettering; use Plus Jakarta where the
  lower-case URL matters.
- Shock lines round a head must skip the raised hands; a prop in a raised hand (the mug) collides with the "?!".
- Two starbursts on one poster crowd it: one burst for the big news (SEASON 2! COMING 2027), and a rubber stamp
  (PSYCH FILE: STATUS QUO BIAS) for the second accent.

## Build gotchas (S2 page style)
- kit.css `.hand` is position:absolute (social-posts kit): in a flowing title block it overlapped the h1. nxe-page.css
  resets it (`position:relative`).
- Stat chips with a Bangers number: `align-items:baseline` pushed the word below the box; use a fixed height +
  `align-items:center`.
- CSS `filter: drop-shadow` on an element that also has `clip-path` loses the shadow (filter runs first, then the
  clip): wrap the clipped burst in a parent that carries the filter (`.boom > span`).
- Labels inside a TV/screen corner collide with the ON AIR tag and the bunting: place the corner number below them.
- Check the episode's order of steps on a real frame before writing it (EP02's small lessons are Day 1 receive a
  delivery, Day 2 pick an order, Day 3 count stock; I had 2 and 3 swapped on the first render).
- Name ride/bank apps generically ("ride booking", "mobile banking"): the episode says Grab, but no other brands on posters.

## Build gotchas (S2 EP00 exaggerated sample, 2026-10-07)
- Owner liked S1 EP00 v2's exaggeration -> S2 EP00 sample: the episode's idea made physical (status quo bias = a tidal
  wave of spreadsheets), hero vs threat at the moment of impact. Page colours, no top logo row.
- Foam made of separate outlined circles reads as a string of beads: draw all circles in ink at r+5 first, then all in
  white at r, so the band gets ONE cloud outline.
- A clash flash next to the hero washes out her face and its rays cross the visor: draw the flash BEHIND the hero and
  skip rays that point at her head.
- A dutch tilt on the whole scene (rotate the canvas around a pivot) adds action cheaply; keep the DOM words straight or
  only slightly rotated so they stay crisp. Points used for DOM (balloon tails) must be rotated with the same matrix.
- Samples for comparison are rendered to qa/sample/ and sent in chat, not delivered, so the drive holds one version per post.

## Season 2 EP00-EP05, exaggerated (2026-10-07)
- Owner: "create more, continue s2ep1-5, always dont forget odoo apps logo" -> six posters with kit/nxe-x/ (nxe-x.css:
  issue badge .xb, compact tag .xe, .xapps Odoo-apps row, .xans, .xbal, .xft; nxe-x.js: sheet, foam, flash, speed,
  person (F3 + sticker outline), balloon, tile, glow, rot). Each = one physical metaphor of the episode's worry at
  its peak: wave of spreadsheets (EP00), job-grabbing claw (01), TOO OLD wall (02), giant CONFIRM at the lens (03),
  CCTV spotlight (04), race car off the pier (05). They replaced the page-style S2 EP00-02 in the drive.
- A person seated in a vehicle: draw the figure inside the vehicle's transform and clip it above the body line,
  or the legs show under the car. A closed window is too small for a face: make it open-top.
- A "JUST THE TASKS"-type answer lives best in Nexi's balloon; keep the bottom to title + answer + apps row + footer.
- The kit QA flags DOM bounding boxes, not ink: a two-line h1 box spans its widest line, so a tag beside a short
  first line still "overlaps" - move the tag below or beside the box.

## Season 2 v3 (2026-10-07): background variety, cinematic angles, red YouTube CTA, less mess
- Owner: "play more on background design, make a variation of background ... more exaggerated ... cta should be red box
  white text about youtube ... dont make the poster too messy ... make cinematic angle, different angle of elements."
- Kit: kit/nxe-v3/nxe-v3.css (.vtag episode tag, .vtt title, .vbal balloon, .vans, .vapps Odoo apps row, .vft footer
  with .ytb = YouTube red #FF0000 button, white text + play triangle, hard ink drop). NXX.keystone() in kit/nxe-x/nxe-x.js
  gives flat F3 people a camera angle: slices pasted wider at the top (high angle: big head, small feet) or at the bottom
  (worm's-eye). nexi_cam renders Nexi from the same angle (pos above for high angle: [0,14,10] look [0,-1,0]).
- One background world + one camera per poster: EP00 sunset storm, worm's-eye; EP01 sunny office floor, claw POV
  top-down; EP02 golden blast, 3/4 perspective wall; EP03 bright sky, first-person cockpit; EP04 mint office, CCTV
  fish-eye; EP05 turquoise sea, drone top-down. Keep 5 text groups: tag, title, one balloon, apps row, footer.
- Declutter rules that worked: drop words already said by the title (the painted TOO OLD), no blurred prop behind a
  label, no extra SFX when one is enough, move props that hide the Odoo icons.
- render.py OSError 22 = the old PNG is open in a viewer; render to a fresh folder (out3) and deliver from there.

## Season 2 v4 (2026-10-07): keep the approved layouts, vary only background + CTA
- Owner, sharing the exaggerated (x) S2 EP00-05 posters: "this design already good, just improve, just change the
  background texture/elements, and cta button." -> v3's re-staged angles were NOT wanted; the x layouts are the approved
  base. v4 = x pages + kit/nxe-bg/nxe-bg.js (NXB.storm / office / golden / blueprint / blinds / sunset, one painted world
  per poster instead of the shared blue NXP.bg) + red YouTube button (.ytb #FF0000, white text, ink border + drop).
  Built by examples/s2-v4/make_v4.py (string swaps on the x pages; the x pages stay untouched).
- Lesson: when the owner says "already good, just improve X", change only X. Re-staging the whole poster (v3) was more
  than asked. Keep the approved version's page as the base and patch copies.
- Re-tint scene parts that were built for the old background (EP00 skyline/street, EP02 floor, EP05 sea), or they look
  pasted on.

## Season 2 line-up poster, all episodes (2026-10-07)
- Owner: "create a poster nexi explains season 2 in all episodes available" -> ONE poster for S2 EP00-13 (all 14 have
  videos in drive folder 26), page `s2all.html`, post number 80 (season posters sit outside the episode numbers 00-22
  and the specials 90-92): `80-technext-nexi-explains-season-2-all-episodes.png`.
- The world came from S2 EP00's own "Season map" (frames ~140-152 s): a rainbow fairground, the red star coaster cart,
  one landmark per arc (haunted house = The Fear, crown castle = The Boss's Beliefs, market stall = Customers). Only the
  3 arcs in episode.py are shown; the film's arcs 4-6 (EP14+) are postponed and must stay off posters.
- A list of 14 titles stays readable when it lives INSIDE an object (the park's ride board): 3 arc columns, a full-width
  EP00 "start here" strip, each row = number disc + title + its Odoo app (icon + name). Arc 3 (5 rows) gets a 1.08fr
  column. Titles 17 px, app line 12.5 px caps: tight but legible at 540 px wide. Use &nbsp; to stop orphans
  ("Wrong&nbsp;Button?", "in&nbsp;Chat").
- Coaster on a steep drop: long tubs rotated ~45 deg read as red bars and hide the riders. Put the front car at the
  bottom of the dip (nearly level), keep tubs short (230 units), riders 188 tall so heads + arms clear the rim.
- Nexi in a vehicle: render her with nexi_cam at the car's lean (roll), draw her unrotated at the seat point, and CLIP
  to the car-frame region above the tub floor before drawing, or her round body pokes out under the car.
- A seat back drawn behind the front rider hid the next car's first rider: skip it on the front car.
- A balloon far from its speaker gets a needle-thin tail from NXX.balloon: give the line to the nearest character
  (Mr. Lim, not Nexi) and draw a wide wedge from the balloon's side (`balloonL` in s2all.html).
- Board posts planted in the footer grass must miss the footer words (one behind the YouTube button, one in the gap).
- deliver.py copies out/captions.md OVER the drive's captions.md: copy the drive file into the out folder first and
  append the new section.

## S1 v4 revision 1 (2026-10-09)
- A costume missing on the poster is usually NOT missing artwork: compare with the thumbnail at full size first. TIP03's
  thumbnail costume is the heart `boppers` (not bunny ears) and EP21's pink "ear" is the plume of the `knight` helmet;
  both exist in nexi_cam (`"wear": "knight"`, `"wear": "boppers"`).
- nexi_cam renders inside an 800x800 frame and trims the PNG, so a cut costume top looks like a design choice. The
  boppers' hearts were lost at cam z=20; z=28 with look y=0.8 fits them. nexi_cam.py now prints "WARNING: touches the
  frame edge" for such renders: never use a render that prints it.
- Swapping a Nexi render on a finished poster: keep her BODY (the lower sphere width) the same size and the bottom
  point in the same spot; solve x/y/h from both renders' measurements, then check the new head/hat against nearby labels
  (EP21's helmet first covered the "Internet" node label: smaller + 14 px left fixed it).
- nexi_cam's default port 3993 is also the HST preview port: run it with NEXICAM_PORT / NEXICAM_CDP set (e.g. 3996 / 9436).
  dbg.py takes --port for parallel runs.
- The official Odoo Contacts icon is in the sets now (assets/odoo/contacts.svg, from odoo/odoo 18.0, same release as
  the other icons). Import / contact-list episodes (S1 EP05, Quick Tip 08) show Contacts, not Sales.
- Bash halves backslashes: a path replace with a doubled backslash in an inline python heredoc broke the copy step and the delivery
  then pushed the unchanged files. Put path-handling delivery code in a .py file (Write tool) and assert the md5 of the
  source differs from the live file before overwriting.
- (2026-10-10) Nexi introduction posters 87-89 (owner: "3 images for nexi introduction about showcasing odoo and technext ...
  comical but follow the website page theme nexi explain"): built as v4 page-style posters that are NOT episode posters -
  badge `NEXI EXPLAINS <b>MEET NEXI</b>` / `THE ODOO SHOW` / `MEET THE CREW`, the EP00 premiere chip on the pilot one,
  facts from technext.asia/nexi-explains + /nexi only (2 seasons, 37 episodes, 34 Quick Tips, 3 specials; Season 1:
  23 episodes, 23 sidekicks, 21 costumes; Ask Nexi answers from TechNext's own pages). Daytime worlds on purpose: S1 EP00
  owns the night city. Pages: `examples/2026-10-10-nexi-intro/` (p87-p89 + a1-lib.js painter helpers). Delivered with
  the social posts (posting-image folder `12. Nexi Introduction Posts (2026-10-10)`), not the Promotion folder.

