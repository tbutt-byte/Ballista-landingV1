# Ballista Tracking — Website

Marketing site for **Ballista Tracking**, a phone-based baseball swing tracking and
player-development app. Players set up an iPhone, take swings, and get
movement-based metrics and progress tracking — no sensors, cage hardware, or
complicated setup.

Black / white / graphite premium sports-tech design, a cinematic hero (generated
baseball still + coded swing-shatter headline animation), and pinned metric blocks.

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
  components/site/  navbar, hero, sections, footer, forms, app screens, SEO
  lib/              content data, supabase client, early-access handler, helpers
  __tests__/        homepage + form tests
public/assets/      hero still (ballista-hero.jpg) + optional loop video slot
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

- **Hero background**: uses a generated baseball still by default. To use a looping
  video, drop an MP4 at `public/assets/ballista-hero-loop.mp4` and set
  `HAS_HERO_VIDEO = true` in
  [src/components/site/hero-background.tsx](src/components/site/hero-background.tsx).

## Notes

This is a pre-launch marketing site. Metrics are framed as movement analysis and
progress tracking, not lab-grade measurement; Ballista is not a replacement for
professional tracking hardware.
