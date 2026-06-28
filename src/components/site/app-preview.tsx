import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * Asset-free, high-fidelity app screens built with SVG/CSS so the page shows
 * real Ballista UI rather than a broken image box or garbled AI mockup.
 */

export function TrendChart({ className, height = 120 }: { className?: string; height?: number }) {
  const points = [22, 30, 26, 38, 34, 46, 44, 56, 60, 68]
  const w = 320
  const h = height
  const max = 80
  const step = w / (points.length - 1)
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - (p / max) * h}`).join(' ')
  const area = `${path} L ${w} ${h} L 0 ${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn('w-full', className)} role="img" aria-label="Illustrative upward progress trend">
      <defs>
        <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,77,61,0.22)" />
          <stop offset="1" stopColor="rgba(255,77,61,0)" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#trend-fill)" />
      <path d={path} fill="none" stroke="#FF4D3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(points.length - 1) * step} cy={h - (points[points.length - 1] / max) * h} r="4" fill="#FF4D3D" />
    </svg>
  )
}

function StatusBar({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 text-[11px] text-white/70">
      <span className="font-medium">9:41</span>
      <span className="text-white/40">{label}</span>
      <span className="h-2 w-6 rounded-full bg-white/30" />
    </div>
  )
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative w-[256px] shrink-0 rounded-[2.6rem] border border-white/15 bg-black p-2.5 shadow-2xl', className)}>
      <div className="flex min-h-[520px] flex-col overflow-hidden rounded-[2.1rem] bg-[#0e0e10]">{children}</div>
    </div>
  )
}

export function ScreenHome() {
  const cards = [
    { k: 'Exit velocity', v: '98.5', u: 'mph', delta: '+2.4 vs last avg' },
    { k: 'Sweet spot %', v: '38.5', u: '%', delta: '+3.2 vs last avg' },
    { k: 'Furthest distance', v: '402', u: 'ft', delta: '2nd 398 ft · 3rd 385 ft' },
  ]
  return (
    <>
      <StatusBar label="Home" />
      <div className="px-4 pt-3">
        <p className="text-[11px] text-white/45">Hello, Alex</p>
        <h3 className="mt-0.5 text-sm font-semibold tracking-tight text-white">Session streak: 4 days</h3>
      </div>
      <div className="mx-4 mt-2 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] text-white/70">
        Season high EV 104.2 mph
      </div>
      <div className="mt-3 space-y-2 px-4">
        {cards.map((c) => (
          <div key={c.k} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[9px] uppercase tracking-wide text-white/40">{c.k}</span>
              <span className="text-[9px] text-white/40">{c.delta}</span>
            </div>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-2xl font-semibold tracking-tight text-white">{c.v}</span>
              <span className="text-[11px] text-white/50">{c.u}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 px-4">
        <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-black">
          Record swing
        </span>
      </div>
    </>
  )
}

// Faithful recreations of the real BallistaV3Prototype screens (see
// docs/UI_SOURCE_MAP.md) — copy, layout, and figures match the source HTML.

export function ScreenRecord() {
  return (
    <div className="relative flex-1 overflow-hidden bg-[#141313]">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '33% 33%',
        }}
      />
      <div className="absolute left-1/2 top-[28%] h-[46%] w-[78%] -translate-x-1/2 rounded-md border border-dashed border-white/30" />
      <div className="absolute left-[14%] top-[20%] h-3 w-3 rounded-tl-md border-l-2 border-t-2 border-white/70" />
      <div className="absolute right-[14%] top-[20%] h-3 w-3 rounded-tr-md border-r-2 border-t-2 border-white/70" />
      <button
        type="button"
        aria-label="Start recording"
        className="absolute bottom-7 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full shadow-[0_0_16px_rgba(255,68,68,0.6)]"
        style={{ background: 'radial-gradient(circle at 35% 30%, #ff6b5d, #ff0000)' }}
      />
    </div>
  )
}

export function ScreenHistory() {
  const sessions = [
    { date: 'OCT 24', dur: '45m', ev: '104.2 MPH', la: '14.5°', dist: '412 FT' },
    { date: 'OCT 22', dur: '30m', ev: '108.7 MPH', la: '18.2°', dist: '435 FT' },
  ]
  return (
    <>
      <StatusBar label="History" />
      <div className="px-4 pt-3">
        <h3 className="text-base font-semibold tracking-tight text-white">Session History</h3>
        <p className="text-[10px] text-white/45">Review your past performance data.</p>
      </div>
      <div className="mt-3 px-4">
        <div className="text-[9px] uppercase tracking-wide text-white/35">This week</div>
        <div className="mt-2 space-y-2">
          {sessions.map((s) => (
            <div key={s.date} className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-white">{s.date}</span>
                <span className="text-[9px] text-white/40">{s.dur}</span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] text-white">MAX EV {s.ev}</span>
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] text-white/70">AVG LA {s.la}</span>
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] text-white/70">MAX DIST {s.dist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
