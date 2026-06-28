# UI Source Map

Source assets handed over in `~/Documents/Ballista Website App Insert/` and
`~/Desktop/`, and how each one was used (or not) in this implementation.

## Real app UI (ground truth)

`BallistaV3Prototype/BallistaV3Prototype/Web/{home,record,history,settings}.html`
— the actual working app screens (HTML in a WKWebView), not mockups.

| Source screen | Used in | Notes |
| --- | --- | --- |
| `home.html` | [`src/components/site/app-preview.tsx`](../src/components/site/app-preview.tsx) → `ScreenHome` | Recreated faithfully: greeting, streak, season-high badge, the three metric cards (Exit velocity 98.5 mph, Sweet spot % 38.5%, Furthest distance 402 ft) and their real deltas, "Record swing" CTA. |
| `record.html` | `app-preview.tsx` → `ScreenRecord` | Recreated: camera grid overlay, dashed framing box with corner brackets, red gradient record button. |
| `history.html` | `app-preview.tsx` → `ScreenHistory` | Recreated: "Session History" header, "This week" group, the two real session cards (Oct 24 / Oct 22) with their real MAX EV / AVG LA / MAX DIST chips. |
| `settings.html` | Not used | Not compelling for a 3-screen marketing gallery; no settings-related claim is made anywhere on the site. |

Visual approximation note: the real app uses Atkinson Hyperlegible + JetBrains
Mono on a `#141313`/`#c9c6c5` palette. The marketing site's phone-frame
recreations use the site's own type system (system sans) on the same dark/white
treatment used everywhere else on the page, for visual consistency with the
rest of the marketing shell. Copy, numbers, and layout are faithful; the exact
webfont is not duplicated. See "RX100 font" below for the unrelated brand-font
gap.

## Real swing footage + measured output

- `IMG_E2626.mov` (real iPhone footage, 1920×1080 HEVC, 8.00s) → transcoded with
  macOS `avconvert` (`Preset1280x720`, H.264/AAC, no third-party tools
  required) to [`public/assets/demo-swing.mp4`](../public/assets/demo-swing.mp4)
  for broad browser support. Used as the preset clip in the Interactive Web
  Demo ([`demo-shell.tsx`](../src/components/site/demo-shell.tsx)).
- `metrics.rtf` (`EV: 44.6 MPH`, `LA: 25.9 DEG`, `Distance: 110.4 Ft`) — the real
  measured output for that same clip → hard-coded as the deterministic demo
  data in [`src/data/demoSwing.ts`](../src/data/demoSwing.ts). Never randomized,
  never recomputed in the browser; revealed on a timer tied to the video's
  `currentTime`, labeled in the UI as a real recorded result, not a live
  analysis (see `DemoSourceNotice`).
- `Screen Recording 2026-06-28 at 12.09.15 PM.mov` — a screen recording of the
  live app. Not used in this pass (the static `home.html`/`record.html`/
  `history.html` recreations cover the same ground with full editorial
  control over framing/length); kept as a candidate source for a future demo
  refresh.

## Logo

`~/Desktop/ballista logo.png` (774×776 PNG, white mark on solid black) — the
real Ballista mark: a double circle, a sweeping horizontal bar, and a
descending T/talon blade. Processed (luminance→alpha, autocropped) into:

- [`public/assets/ballista-mark.png`](../public/assets/ballista-mark.png) /
  `ballista-mark-512.png` — transparent, used by `BallistaMark`/`Wordmark` in
  [`logo.tsx`](../src/components/site/logo.tsx) (nav + footer).
- `public/favicon-32.png`, `public/favicon-192.png`, `public/apple-touch-icon.png`
  — same mark composited onto a solid `#050608` square, because favicons sit on
  browser chrome that can be light or dark and a transparent-only icon would
  disappear on a light tab.

No vector/source file was provided — only the flattened PNG above. If a vector
original exists later, swap it in at the same paths; nothing else needs to
change.

## Design references (not directly implemented)

`stitch_ballista_performance_lab 2/*/code.html` + `screen.png` — AI-exported
design-tool concepts that mirror the same four real screens above (down to
leftover `{{DATA:SCREEN:...}}` template markers). Treated as confirmation of
the real screens' design intent, not as a separate source of truth.

`BALLISTA_TRACKING.txt` — unrelated content from a different, confused session
(generic projectile/target-tracking theory, not this product). Ignored.

`~/Downloads/ballista_web_implementation_agent_prompt.txt` — the implementation
brief this build follows. See [`IMPLEMENTATION_NOTES.md`](IMPLEMENTATION_NOTES.md)
for where the shipped site deviates from it and why.
