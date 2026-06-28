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
          <stop offset="0" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#trend-fill)" />
      <path d={path} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(points.length - 1) * step} cy={h - (points[points.length - 1] / max) * h} r="4" fill="#fff" />
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

const ROW = 'flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5'

export function ScreenHome() {
  const metrics = [
    { k: 'Hand speed', v: 'trending up' },
    { k: 'Head movement', v: 'stable' },
    { k: 'Contact', v: 'repeatable' },
  ]
  const swings = [
    { id: '#24', t: 'today · tee' },
    { id: '#23', t: 'today · tee' },
    { id: '#22', t: 'yesterday · cage' },
  ]
  return (
    <>
      <StatusBar label="Home" />
      <div className="px-4 pt-3">
        <p className="text-[11px] text-white/45">Wednesday · session 12</p>
        <h3 className="mt-0.5 text-lg font-semibold tracking-tight text-white">Good work today.</h3>
      </div>
      <div className="mx-4 mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="text-[10px] uppercase tracking-wide text-white/40">Swing score</div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight text-white">86</span>
          <span className="text-[11px] text-white/45">top 3 today</span>
        </div>
      </div>
      <div className="mt-3 space-y-2 px-4">
        {metrics.map((m) => (
          <div key={m.k} className={ROW}>
            <span className="text-[11px] text-white/50">{m.k}</span>
            <span className="text-[11px] font-medium text-white">{m.v}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 px-4">
        <div className="text-[10px] uppercase tracking-wide text-white/35">Recent swings</div>
        <div className="mt-2 space-y-2">
          {swings.map((s) => (
            <div key={s.id} className={ROW}>
              <span className="text-[11px] font-medium text-white">Swing {s.id}</span>
              <span className="text-[10px] text-white/40">{s.t}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export function ScreenReview() {
  const frames = ['Load', 'Launch', 'Contact', 'Finish']
  const rows = [
    { k: 'Hand speed', v: 'fast' },
    { k: 'Stride length', v: '22 in' },
    { k: 'Hip-shoulder', v: '21°' },
  ]
  return (
    <>
      <StatusBar label="Review" />
      <div className="flex items-center justify-between px-4 pt-3">
        <h3 className="text-sm font-semibold text-white">Swing #24</h3>
        <span className="text-[10px] text-white/45">contact · 0.82s</span>
      </div>
      <div className="relative mx-4 mt-3 h-40 overflow-hidden rounded-2xl border border-white/10 bg-[#08080a]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <svg viewBox="0 0 232 160" className="absolute inset-0 h-full w-full">
          <path d="M38 138 Q 124 26 204 78" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="4 5" />
          <g stroke="#e5e7eb" strokeWidth="2.5" strokeLinecap="round">
            <line x1="116" y1="48" x2="116" y2="96" />
            <line x1="116" y1="60" x2="94" y2="84" />
            <line x1="116" y1="60" x2="146" y2="76" />
            <line x1="116" y1="96" x2="102" y2="138" />
            <line x1="116" y1="96" x2="132" y2="136" />
          </g>
          <circle cx="116" cy="40" r="8" fill="#fff" />
          <circle cx="146" cy="76" r="11" fill="none" stroke="#fff" strokeWidth="2.5" />
        </svg>
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/80">swing detected</span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5 px-4">
        {frames.map((f, i) => (
          <div
            key={f}
            className={cn(
              'rounded-lg border px-1 py-1.5 text-center text-[10px]',
              i === 2 ? 'border-white/40 bg-white/[0.08] text-white' : 'border-white/10 bg-white/[0.02] text-white/55',
            )}
          >
            {f}
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2 px-4">
        {rows.map((r) => (
          <div key={r.k} className={ROW}>
            <span className="text-[11px] text-white/50">{r.k}</span>
            <span className="text-[11px] font-medium text-white">{r.v}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export function ScreenProgress() {
  const ranges = ['7d', '30d', 'season']
  const stats = [
    { k: 'avg score', v: '78' },
    { k: 'best', v: '86' },
    { k: 'sessions', v: '12' },
  ]
  return (
    <>
      <StatusBar label="Progress" />
      <div className="px-4 pt-3">
        <h3 className="text-sm font-semibold text-white">Hand speed trend</h3>
        <div className="mt-2 flex gap-1.5">
          {ranges.map((r, i) => (
            <span
              key={r}
              className={cn(
                'rounded-full px-2.5 py-1 text-[10px]',
                i === 1 ? 'bg-white text-black' : 'border border-white/10 text-white/55',
              )}
            >
              {r}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-4 mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <TrendChart height={96} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 px-4">
        {stats.map((s) => (
          <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-center">
            <div className="text-lg font-semibold text-white">{s.v}</div>
            <div className="text-[9px] uppercase tracking-wide text-white/40">{s.k}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2 px-4">
        <div className={ROW}>
          <span className="text-[11px] text-white/50">Head movement</span>
          <span className="text-[11px] font-medium text-white">steadier</span>
        </div>
        <div className={ROW}>
          <span className="text-[11px] text-white/50">Contact consistency</span>
          <span className="text-[11px] font-medium text-white">improving</span>
        </div>
      </div>
    </>
  )
}
