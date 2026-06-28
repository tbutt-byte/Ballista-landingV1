// Deterministic data for the preset swing demo. Values are real, measured
// output from one recorded swing (see docs/UI_SOURCE_MAP.md) — never
// randomized and never recomputed in the browser.

export const DEMO_VIDEO_SRC = '/assets/demo-swing.mp4'
export const DEMO_VIDEO_DURATION = 8

export type DemoPhase = {
  key: string
  label: string
  start: number
  end: number
}

export const DEMO_PHASES: DemoPhase[] = [
  { key: 'capture', label: 'Capture', start: 0, end: 2 },
  { key: 'detect', label: 'Detect', start: 2, end: 4 },
  { key: 'measure', label: 'Measure', start: 4, end: 6.4 },
  { key: 'track', label: 'Track', start: 6.4, end: 8 },
]

export type DemoOverlayKey = 'path' | 'contact' | 'stability' | 'points'

export const DEMO_OVERLAYS: { key: DemoOverlayKey; label: string; defaultOn: boolean }[] = [
  { key: 'path', label: 'Swing path', defaultOn: true },
  { key: 'contact', label: 'Contact moment', defaultOn: true },
  { key: 'stability', label: 'Head stability', defaultOn: false },
  { key: 'points', label: 'Motion points', defaultOn: false },
]

export type DemoMetric = {
  key: string
  label: string
  value: string
  unit: string
  revealAt: number
}

// Real measured output from this recorded swing.
export const DEMO_METRICS: DemoMetric[] = [
  { key: 'ev', label: 'Exit velocity', value: '44.6', unit: 'mph', revealAt: 4.1 },
  { key: 'la', label: 'Launch angle', value: '25.9', unit: '°', revealAt: 4.9 },
  { key: 'dist', label: 'Distance', value: '110.4', unit: 'ft', revealAt: 6.5 },
]

export function phaseAt(time: number): DemoPhase {
  return DEMO_PHASES.find((p) => time >= p.start && time < p.end) ?? DEMO_PHASES[DEMO_PHASES.length - 1]
}
