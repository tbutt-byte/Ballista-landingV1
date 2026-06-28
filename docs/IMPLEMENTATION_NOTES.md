# Implementation Notes

This build follows `~/Downloads/ballista_web_implementation_agent_prompt.txt`
("Ballista Tracking Web Implementation Master Prompt") on top of the existing
production React app. It does not migrate frameworks or rewrite working
sections from scratch — see [UI_SOURCE_MAP.md](UI_SOURCE_MAP.md) for what real
source material was available and how it was used.

## Framework / dependencies

Unchanged: Vite + React 18 + TypeScript + Tailwind CSS + Motion (Framer
Motion) + react-router-dom + Vitest/Testing Library + ESLint. No new
dependencies were added; everything below was built with what was already
installed.

## Pricing correction

The live spec for pricing is a single plan: **7-day free trial, then $9.99/month
(CAD)** — not the three-tier Free/Premium-$12.99/Unlimited-$134.99 structure
that was previously on the page. `PLANS` → `PLAN` in
[`src/lib/content.ts`](../src/lib/content.ts); `PricingSection` is now one
centered card instead of a 3-up grid.

## RX100 font

No RX100 (or any) font file was provided anywhere in the source folders (only
Google Fonts CDN references inside the *real app's* HTML, which uses Atkinson
Hyperlegible + JetBrains Mono — a different, app-specific type system, not a
marketing brand font). The marketing site keeps using its existing system-sans
stack; no `--font-brand` token exists yet in this codebase to preserve. If a
real RX100 file shows up later, it can be added as a `@font-face` and applied
to the wordmark/headlines without other changes.

## Logo

Real source: `~/Desktop/ballista logo.png` (774×776, white mark on solid
black). Processed into a transparent PNG (luminance→alpha, autocropped) at
`public/assets/ballista-mark.png` / `ballista-mark-512.png`, used by
`BallistaMark`/`Wordmark` ([`logo.tsx`](../src/components/site/logo.tsx)).
Favicon/apple-touch-icon variants are composited onto a solid `#050608`
square (not transparent) because they render on browser chrome, which can be
light-themed — a transparent-only icon would disappear on a light tab.

## Demo video + data

`IMG_E2626.mov` (real iPhone footage) was HEVC/.mov, which Firefox and many
non-Apple browsers won't play inline. Transcoded with macOS's built-in
`avconvert` (`Preset1280x720` → H.264/AAC) to
[`public/assets/demo-swing.mp4`](../public/assets/demo-swing.mp4) — no
third-party tools required, no quality-degrading re-encode beyond the
resolution drop. Paired with the real measured output from `metrics.rtf`
(`EV 44.6 mph`, `LA 25.9°`, `Distance 110.4 ft`) as deterministic data in
[`src/data/demoSwing.ts`](../src/data/demoSwing.ts).

## Hero video (Higgsfield generation) — superseded

The user initially asked for a real generated looping video as the primary
hero treatment (their Higgsfield account was upgraded from a free/10-credit
plan specifically for this). Process:

1. Uploaded the existing static hero still (`ballista-hero.jpg`) to Higgsfield.
2. Cost-preflighted (`get_cost: true`, no spend) several models:
   `seedance_2_0` (45cr @1080p/std, 22.5cr @720p/std) — **blocked on the
   Starter plan** ("Pro/Ultimate plan required", confirmed via a real failed
   submission attempt — no credits charged on failure), `kling2_6` (5cr).
3. Generated with **`kling2_6`**, image-to-video from the still, 5s, 16:9,
   silent (no `sound`) — **5 credits actually spent** (balance 279.55 → 274.55).
4. Result: a coherent slow load→swing→contact motion cycle, 1920×1080 H.264,
   5.04s, saved to `public/assets/ballista-hero-loop.mp4`.

**This was then rejected and replaced.** The user called the generated video
"terrible" and asked instead for a baseball that visibly flies off the bat on
page load and keeps flying as the page scrolls — a scroll-position-driven
interaction that no passive video loop can do. It also kept the batter
fully visible on screen, which directly contradicted the new direction
("player off-screen"). Tried regenerating a still image of just the ball
in flight (`z_image`, 0.15cr ×2, both attempts still showed a batter — image
models are strongly biased toward the "batter mid-swing" framing for any
baseball-flight prompt). Abandoned the image/video pipeline entirely in favor
of a coded, scroll-driven element — see "Hero ball" below.

Total Higgsfield spend across both the abandoned video and the abandoned
still attempts: **5.3 credits** (balance 279.55 → 274.25). The unused
`ballista-hero.jpg` / `ballista-hero-loop.mp4` files remain in
`public/assets/` in case they're useful for something else later.

## Hero ball (coded, scroll-driven)

[`hero-ball.tsx`](../src/components/site/hero-ball.tsx) replaces the video
entirely. Two layered pieces:

- An **inner element** plays a standard load-time launch (`initial`/`animate`/
  `transition`, same pattern as the existing bat-streak and letter-shatter in
  `swing-headline.tsx`), timed to fire right as the bat-streak crosses the
  headline (`delay: 0.78s`, matching the streak's own `delay: 0.5s` +
  half its `duration: 0.6s`).
- An **outer wrapper** applies a `useTransform(scrollYProgress, ...)`
  transform scoped to the hero section (`useScroll({ target: heroRef })`),
  so the ball keeps traveling, spinning, shrinking, and fading further as the
  user scrolls past the hero.

Two real bugs surfaced and got fixed along the way:

1. **First implementation used a manual `requestAnimationFrame` loop with an
   inline `offset` array literal passed to `useScroll`.** A new array literal
   on every render made `useScroll`'s internal effect re-run continuously,
   tearing down and restarting the rAF loop faster than a frame could ever
   fire — `requestAnimationFrame` was being scheduled and cancelled in a tight
   loop, never once executing its callback. Fixed by hoisting `offset` to a
   module-level constant. (Also separately discovered this dev preview tool's
   browser tab reports `document.visibilityState: "hidden"` and never fires
   `requestAnimationFrame` at all regardless — real user tabs don't have this
   problem, but it's why animation timing couldn't be directly verified
   in-tool and the final implementation avoids hand-rolled rAF entirely.)
2. **`x`/`y` values were percentages** (e.g. `'32%'`), which for a `transform`
   resolve against the *element's own size* — a few px of motion on a 28px
   ball, i.e. it visually stayed parked at its spawn point. Looked like it
   was "stuck overlapping the text" because it never actually moved away.
   Fixed by switching every distance to `vw`/`vh` units, which scale off the
   viewport instead.

The spawn point (`left-[58%] top-[34%]`) is biased toward the gap between the
first two headline lines rather than dead-center, and the launch moves up and
right immediately (`13vw, -15vh` in well under a second) specifically so it
clears the text fast rather than dwelling on top of a letter.

## Master-prompt deviations (and why)

- **Hero visual system**: ended up well-aligned with the master prompt's
  abstract, no-photo hero spec after a detour — see "Hero video — superseded"
  above. The coded "swing-shatter" headline animation (bat-streak swipe,
  letter shatter/reform, floating shard debris) plus the new scroll-driven
  ball satisfy the brief's "alive," "smooth," scroll-reactive animation rules
  without any photographic/video background.
- **Color palette**: the master prompt's bespoke cinematic blue/violet/coral
  palette is used for the marketing shell (unchanged from the existing
  black/white/graphite system). The *real app* screens recreated inside
  "the app" section keep their own real palette (`#141313`/`#c9c6c5`) rather
  than being recolored to match the marketing chrome — that's the more honest
  reading of "use the real UI as source of truth for app-specific screens."
- **Nav links**: `how it works / demo / metrics / pricing` (added "demo" for
  the new section, dropped "faq" from the nav bar only — the FAQ section
  itself still exists on the page and in the footer's link list).
- **CTA copy**: standardized on "join the beta" everywhere (nav, hero, demo
  copy doesn't have a CTA, pricing, final CTA, the early-access form's submit
  button) per the master prompt's suggested phrase, replacing the prior
  "get early access" wording.
- **Pricing section kept**: the master prompt's required page structure has
  no pricing section at all. It's real, already-correct content (see above)
  and removing it would be a business decision beyond a copy/structure audit,
  so it stays, positioned after the Value section.
- **How It Works kept at 5 steps** (Set up phone / Record / Detect / Measure
  / Track) rather than collapsed to the master prompt's suggested 4 — it's
  the existing, more granular, equally honest breakdown. The Interactive
  Demo's step indicator does use the literal 4-step Capture/Detect/Measure/
  Track set, since that's specific to the demo UI, not the marketing section.
- **App preview screens**: previously invented ("Swing score 86", a "Review"
  screen with fabricated stride/hip numbers). Replaced with faithful
  recreations of the *real* Home/Record/History screens and their real
  copy/figures — see UI_SOURCE_MAP.md. Settings was not included in the
  3-screen gallery (no claim on the site relates to settings).

## Commands run

```bash
npm run lint        # pass
npx tsc --noEmit    # pass
npm test -- --run   # 10/10 pass
npm run build       # pass (tsc --noEmit && vite build)
```

## Known limitations

- No RX100 font file exists yet (see above) — token/fallback wiring deferred
  until a real file is provided, since no `--font-brand` token currently
  exists in this codebase to wire up.
- The "Screen Recording 2026-06-28...mov" real app-in-action recording was not
  used in this pass (kept as a candidate for a future demo refresh).
- The hero ball's exact spawn point/path was tuned against one desktop
  viewport screenshot, not measured against the headline's actual text
  bounding box at every breakpoint — on unusually narrow or wide viewports it
  may graze a letter briefly during the fast (<1s) launch before it clears
  the area. Real movement (vw/vh-based) means this is brief, not a stuck
  overlap, but it isn't pixel-verified across breakpoints.
