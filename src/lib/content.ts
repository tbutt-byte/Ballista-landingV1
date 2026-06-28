// Central, typed site content. Keeping copy here keeps components modular and
// makes it easy to audit that nothing is fake or placeholder.

export const SITE = {
  name: 'Ballista Tracking',
  shortName: 'Ballista',
  email: 'hello@ballistatracking.com',
  privacyEmail: 'privacy@ballistatracking.com',
  address: ['2482 Yonge Street #1154', 'Toronto, Ontario M4P 2H5', 'Canada'],
  tagline: 'Baseball swing tracking from your iPhone.',
} as const

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'how it works', href: '/#how-it-works' },
  { label: 'demo', href: '/#demo' },
  { label: 'metrics', href: '/#metrics' },
  { label: 'pricing', href: '/#pricing' },
]

export type HeroMetric = {
  value: string
  unit: string
  caption: string
  /** Tailwind classes for desktop corner pinning. Empty = mobile-grid only. */
  pin: string
  mobileOnly?: boolean
}

export const HERO_METRICS: HeroMetric[] = [
  {
    value: '0',
    unit: 'sensors',
    caption: 'phone-only setup',
    pin: 'xl:absolute xl:top-28 xl:right-4 2xl:right-0',
  },
  {
    value: '1',
    unit: 'iphone',
    caption: 'record and review',
    pin: 'xl:absolute xl:bottom-16 xl:left-4 2xl:left-0',
  },
  {
    value: 'instant',
    unit: 'review',
    caption: 'swing feedback after capture',
    pin: 'xl:absolute xl:bottom-16 xl:right-4 2xl:right-0',
  },
  {
    value: 'trends',
    unit: 'over time',
    caption: 'built for progress',
    pin: '',
    mobileOnly: true,
  },
]

export const PROBLEMS: { title: string; body: string }[] = [
  {
    title: 'Practice without feedback',
    body: 'Most players take hundreds of swings a week with no measurable record of what actually changed.',
  },
  {
    title: 'Effort, not evidence',
    body: 'Parents see the work going in, but have no clear way to see whether mechanics are improving over time.',
  },
  {
    title: 'Coaches can’t be everywhere',
    body: 'A coach can’t stand behind every cage rep or every backyard tee session at home.',
  },
  {
    title: 'Hardware isn’t practical daily',
    body: 'Cage units and sensor systems are expensive and impractical for everyday at-home training.',
  },
]

export const STEPS: { step: string; title: string; body: string }[] = [
  {
    step: '01',
    title: 'Record',
    body: 'Prop your iPhone on a tripod, fence, or bag and film tee work, soft toss, or cage rounds the way you already practice.',
  },
  {
    step: '02',
    title: 'Detect',
    body: 'Phone-based computer vision finds the swing and trims to the useful window automatically.',
  },
  {
    step: '03',
    title: 'Track',
    body: 'See movement-based metrics for each swing, then save sessions and watch trends develop across days, weeks, and seasons.',
  },
]

export const METRICS: { title: string; body: string }[] = [
  {
    title: 'Hand speed trend',
    body: 'Track how hand speed through the swing window changes across sessions.',
  },
  {
    title: 'Head movement',
    body: 'See how stable the head stays from load through contact.',
  },
  {
    title: 'Stride length',
    body: 'Estimate stride distance from pose scale to monitor consistency.',
  },
  {
    title: 'Swing timing',
    body: 'Compare the timing of load, launch, and contact across reps.',
  },
  {
    title: 'Hip & shoulder movement',
    body: 'Observe rotation patterns and separation through the turn.',
  },
  {
    title: 'Contact consistency',
    body: 'Measure how repeatable the contact window is from swing to swing.',
  },
]

export type Plan = {
  trialDays: number
  price: string
  cadence: string
  blurb: string
  features: string[]
  cta: string
}

export const PLAN: Plan = {
  trialDays: 7,
  price: '$9.99',
  cadence: 'per month · CAD, after trial',
  blurb: 'One plan. Full access to swing capture, detection, and movement metrics.',
  features: [
    'Phone-based swing capture',
    'Automatic swing detection',
    'Full movement metric set',
    'Unlimited saved sessions',
    'Progress trends over time',
  ],
  cta: 'join the beta',
}

export const FAQS: { q: string; a: string }[] = [
  {
    q: 'Do I need any extra hardware?',
    a: 'No. Ballista runs on an iPhone. There are no sensors, bat attachments, wearables, or cage units to buy or set up.',
  },
  {
    q: 'How accurate are the metrics?',
    a: 'Ballista measures swing movement from video and is built for progress tracking and trend analysis over time — not lab-grade biomechanics. It is not a replacement for professional measurement hardware.',
  },
  {
    q: 'Does it replace systems like Trackman, Rapsodo, or HitTrax?',
    a: 'No. Those are dedicated measurement systems. Ballista is an everyday, phone-based way for amateur players to record swings and track how their movement changes over time.',
  },
  {
    q: 'What about exit velocity?',
    a: 'Where a reliable reference is available, exit velocity can be used as validation. Ballista focuses on movement-based metrics rather than claiming exact bat or ball speed from video alone.',
  },
  {
    q: 'Who is Ballista for?',
    a: 'Players, parents, coaches, academies, and evaluators who want a simple, repeatable way to track swing development from everyday practice.',
  },
  {
    q: 'What do I need to get started?',
    a: 'An iPhone and a way to prop it up. Set up the phone, take your swings, and review your metrics after capture.',
  },
]
