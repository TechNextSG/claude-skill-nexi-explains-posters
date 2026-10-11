# Poster cinematography: how to make each Nexi Explains poster its own film still

Owner, 2026-10-06: **"create a proper skills design and cinematic to improve the poster design. this should be not a
templated design, every poster are unique."** So there is no series layout. Each poster is designed from zero for its
episode: its own genre, camera, light, palette, text placement, type treatment, build technique, Nexi and signature
device. Only the logo row is fixed (design-rules.md). `uniq.py` checks the 9 axes against every earlier poster.

## 1. Start from ONE frozen moment of the episode
Watch the episode's frames (`ffmpeg ... fps=1/8,tile` contact sheet, see SKILL.md) and pick the single most iconic
moment: the monster rising over Lotus Mart, the penguin in the warm freezer, the "It's a match!" bank line, the race car
on the wrong road. Write it as one sentence a film poster would sell: *who* faces *what*, *where*, *at what moment*.
A poster that only lists the topic ("Odoo Inventory explained") is a thumbnail, not a poster.

## 2. Pick an archetype (poster genre) nobody has used yet
| Archetype | Sells | Signature moves | Fits |
|---|---|---|---|
| Comic-book cover | origin story, villain | issue box, cover lines, SFX burst, halftone, ink outlines | pilot (used: S1EP00) |
| Blockbuster one-sheet | big stakes | hero low angle, title at the bottom, billing block, release date | finale, season openers |
| Teaser | curiosity | one object, lots of air, one line, a date | trailers, cliffhangers |
| Character poster | a costume / a persona | tight portrait, shallow focus, name in big type, one prop | costume episodes |
| Rom-com one-sheet | "it's a match" | two leads back to back, pastel, cursive title, tagline | accounting reconciliation, CRM |
| Heist / caper | a plan, a team | blueprint, crew line-up, "the plan" arrows | implementation, automation |
| Disaster movie | chaos averted | debris, warning light, crowd running, calm hero | stock-outs, IoT alerts |
| Nature documentary | a creature in its habitat | telephoto, golden light, field-note labels | IoT penguin, sidekick animals |
| Sports / fight card | showdown | two corners, "VS", weigh-in stats, belt | before/after, myth-busting |
| Tabloid / newspaper front page | a myth exposed | masthead, giant headline, photo with caption, stamps | myth-busting |
| Game box / arcade cabinet | levels, power-ups | box art, rating badge, "PRESS START" | quick tips, the apps tour |
| Theatre playbill / marquee | a performance | bulbs, curtain, cast list | idol stage, marketing |
| Vintage travel poster | a destination | flat graphic sky, big place name, route | multi-company, networks castle |
| Recipe card / cookbook | a method | ingredients = apps, steps, steam | how-to tips |
| Field guide / museum label | specimens | specimen plate, Latin-ish name, measurements | S2 psychology files |
| Stop-motion / claymation still | handmade warmth | clay textures, fingerprints, miniature set | S2 human stories |
| Pop-up book | recap | paper folds, tabs, hard shadows | the S1 finale (its own device) |
| Space mission patch / launch | a launch | embroidered patch, countdown, rocket | go-live episodes |
| Polaroid / photo-booth strip | moments, people | 4 frames, captions in marker | team, change stories |
| Film-noir (DAYLIGHT version) | suspicion, being watched | venetian-blind shadows, long shadows, a trench coat, but warm afternoon light | S2 EP04 watching me |
| Packaging / cereal box | "what's inside" | box art, flags "NEW!", nutrition panel = features | all apps, bundles |
| Stamp / postcard | greetings | perforated edge, postmark date | holiday specials |
Add new archetypes freely; never reuse one (uniq.py rule 1) unless the owner asks for a matching pair.

## 3. Camera (one per poster, chosen on purpose)
Worm's-eye, bird's-eye, low dutch, macro foreground, over-the-shoulder, fisheye, flat-lay, one-point corridor, inside-out,
tabletop ant's-eye, tilt-shift, telephoto compression (far subject huge behind a near one: the moon trick), split
diopter (near and far both sharp), extreme close-up on an eye/screen, wide establishing shot with a tiny hero.
Recipes and Nexi renders for most of these: technext-social-posts `reference/camera.md` and `kit/nexi-cam`.
Nexi is RE-RENDERED for the camera (never a front-view PNG tilted): `nexi_cam.py` with pos/look/fov/roll, a hold
(see film-art.md) and a face.

## 4. Light plan (name it before drawing)
Time of day + key light + fill + accent, e.g. "twilight, moon backlight, warm street fill, cyan hover glow". Owner leans
LIGHT and WARM (technext-social-posts lessons): most posters day, golden hour, sunrise, pastel studio, sunny interior;
at most one night/dusk poster in any run of four, never cold sci-fi dark, never a hologram dashboard.
Light makes depth: a rim light separates the hero; a pool of light places the story object; haze between layers.

## 5. Cinematic devices (at least 3 per poster, a different signature device each time)
Depth of field (blurred near and far layers, `ctx.filter = 'blur(px)'` on a separate pass), foreground objects at the
lens (out of focus papers, leaves, confetti, snow), volumetric beams, god rays through a window, bloom/glow, anamorphic
lens flare (horizontal streak + ghosts along the line through the frame centre), atmospheric haze, motion streaks /
long exposure, reflections on a wet street or a glossy floor, caustics, colour grade (teal/orange, pastel matte,
bleach bypass), film grain, vignette, halftone print, chromatic fringe on the edges only, light leaks, dust motes,
split focus (one near object and the hero both sharp, the middle soft).
The `device` axis in the register is the SIGNATURE one (the move people remember); it must not repeat.

## 6. Composition and text placement
Decide where the eye lands first (hero), second (title), third (date/CTA). Rule-of-thirds or a strong centre; leading
lines into the hero; a 2-3x size ratio between near and far. Place the words where the scene gives them calm ground:
bottom billing block, top-left over sky, centred under a spotlight, a side column, inside an object (a sign, a screen,
a newspaper, a box front), around the hero in an arc. Change placement from one poster to the next (uniq.py rule 3).

## 7. Type treatment (one display treatment per poster, chosen for the genre)
Brand faces carry the information: Plus Jakarta Sans (headings, CTA) and Inter (lines, small print). Each poster may add
ONE display face or treatment for its title, from Google Fonts or drawn: comic Bangers with ink outline (used EP00),
3D extruded block letters, chrome/metal, neon tube (day-lit, unlit glass), marquee bulbs, stencil on a crate, chalk on a
board, rubber stamp, embroidered patch, letterpress, cut-paper, split-flap, handwritten (Caveat), vintage poster serif
(e.g. Abril Fatface, Alfa Slab One), condensed blockbuster (e.g. Bebas Neue, Anton). The title must read in one second at
400 px wide.

## 8. What every poster must say (content, not layout)
- "Nexi Explains" + the episode code (S1 EP03, Quick Tip 05, S2 EP04 ...) and the episode title.
- One hook line from the episode (episode.py `hook`), rewritten only for length.
- When: "Premieres <day date> · <time> SGT on YouTube" when scheduled (episode.py `premiere_short`), else "Watch now
  on YouTube" once it is out, or no date at all if none is set (never invent one).
- The TechNext service or Odoo app the episode is about, visibly (an icon, a prop, a word).
- A CTA (pill, ticket stub, sign ... styled for the poster) and technext.asia (+ /nexi-explains or the episode page).

## 9. A still that moves (posters only, no video)
The owner wants posters only (2026-10-06). Energy has to live in the single frame: freeze the action at its peak
(mid-roar, mid-leap, papers in the air), add motion cues (speed lines, motion blur on one moving thing, a streak, a
swirl of objects being pulled in), and keep the hero sharp. The page contract still uses `render(t)` (kit.js draws the
poster at `poster:` seconds); pick the t where the moment reads best.

## 10. The exaggerated comic-action recipe (owner's favourite, 2026-10-07)
Owner on S1 EP00 v2 ("MEET NEXI!"): **"i like this kind of style, exagerated."** What makes it work, to reuse:
1. **One clash, frozen at its peak:** hero vs the episode's problem made physical (the Spreadsheet Monster), a beat
   before impact (fist charging, jaws open, papers flying in). Conflict also in words: "TechNext's AI companion vs. ...".
2. **Scale contrast:** the antagonist fills half the frame and bleeds off the edge; the hero is smaller but closer;
   the thing at stake is tiny (Lotus Mart). 3 sizes = instant drama.
3. **Low camera:** converging verticals, we look up at the threat.
4. **Backlight:** a moon/sun right behind the antagonist's head = halo + rim light + a lens streak across it.
5. **Charged focal point:** glow + rays exactly where the two meet (the fist vs the claw), the brightest spot on the poster.
6. **Comic grammar:** one big SFX burst (ROAR!), focus/speed lines, ink outlines, halftone; hard drop shadows on badges.
7. **Depth at the lens:** big out-of-focus props in the foreground (order slips), sharp mid-ground, hazy city behind.
8. **Colour:** cool night blues against a few warm hits (moon, windows, yellow title, premiere tape, orbs).
9. **Type:** a huge chunky title in white + yellow with an ink outline sitting on the scene's ground line; info stacked
   below as pill chips, a tape, a button.
Push further next time: tilt the whole scene (dutch 5-8 deg), give Nexi a more dynamic pose (leaning into the punch,
motion trail), make the clash flash bigger, keep the bottom text block shorter so the art gets more of the frame.
