# Ballista Tracking — Website

Marketing site for **Ballista Tracking**, a phone-based baseball swing tracking and
player-development app. Players set up an iPhone, take swings, and get
movement-based metrics and progress tracking — no sensors, cage hardware, or
complicated setup.

Black / white / graphite premium sports-tech design, a cinematic hero (coded
swing-shatter headline animation + a scroll-driven baseball that launches on
load and keeps flying as you scroll), a real-swing interactive demo, an
always-present ambient background, and pinned metric blocks.

## Tech stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS**
- **Motion** (Framer Motion) for animation
- **react-router-dom** for routing
- **lucide-react** icons
- **Vitest** + Testing Library for tests
- **ESLint** (flat config)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check + production build (`tsc --noEmit && vite build`) |
| `npm run preview` | Serve the production build |
| `npm test` | Run the Vitest suite |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Project structure

```
src/
  pages/            Home, Privacy, Terms, Contact (react-router routes)
  components/site/  navbar, hero, sections, footer, forms, app screens, demo, SEO
  data/             deterministic demo-swing data (real recorded clip + metrics)
  lib/              content data, supabase client, early-access handler, helpers
  __tests__/        homepage + form tests
public/assets/      hero still + loop video, demo swing video, logo/mark assets
docs/               UI_SOURCE_MAP.md, IMPLEMENTATION_NOTES.md
```

## Configuration notes

- **Early-access form** ([src/lib/earlyAccess.ts](src/lib/earlyAccess.ts)) is wired
  to Supabase. With no credentials it shows an honest "not connected" state
  (no fake success). To enable real submissions, set the env vars below and create
  an `early_access` table:

  ```bash
  # .env.local
  VITE_SUPABASE_URL=your-project-url
  VITE_SUPABASE_ANON_KEY=your-anon-key
  ```

- **Hero background**: abstract dark gradient + a breathing floodlight glow
  ([src/components/site/hero-background.tsx](src/components/site/hero-background.tsx)) —
  no photo or video, since the player stays off-screen for the ball animation
  below. A `ballista-hero.jpg` / `ballista-hero-loop.mp4` pair from an earlier
  pass still exists in `public/assets/` but is unused; safe to delete or
  repurpose.

- **Hero ball** ([src/components/site/hero-ball.tsx](src/components/site/hero-ball.tsx)):
  launches off-bat on page load (timed with the bat-streak in
  `swing-headline.tsx`), then keeps traveling further as the page scrolls.
  Distances are in `vw`/`vh` (not `%`, which resolves against the ball's own
  tiny size) so it actually covers ground instead of looking stuck in place.

- **Interactive demo**: uses a real recorded swing
  (`public/assets/demo-swing.mp4`) and its real measured output, defined in
  [src/data/demoSwing.ts](src/data/demoSwing.ts). To swap the clip, replace
  the MP4 and update the metric values/timings in that file.

- **Logo**: the real Ballista mark lives at
  `public/assets/ballista-mark.png` (transparent) and
  `public/favicon-32.png` / `favicon-192.png` / `apple-touch-icon.png`
  (solid background, for browser chrome). Source PNG and regeneration steps
  are documented in [docs/UI_SOURCE_MAP.md](docs/UI_SOURCE_MAP.md).

## Notes

This is a pre-launch marketing site. Metrics are framed as movement analysis and
progress tracking, not lab-grade measurement; Ballista is not a replacement for
professional tracking hardware.
