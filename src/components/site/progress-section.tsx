import { SectionShell } from './section-shell'
import { Reveal } from './reveal'
import { TrendChart } from './app-preview'

const POINTS = [
  'Save every session instead of relying on memory.',
  'Compare swings side by side across days and weeks.',
  'Watch movement trends develop across a season.',
]

export function ProgressSection() {
  return (
    <SectionShell id="progress" className="border-t border-white/10">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="inline-flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              player development profile
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Every session adds to the player profile.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
            One swing is a moment. A season of swings becomes a development record. Ballista is
            designed to help players, parents, and coaches see what's changing over time — not just
            on one good day.
          </p>
          <ul className="mt-7 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-white/75">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-white">Exit velocity trend</span>
              <span className="text-xs text-white/45">last 10 sessions</span>
            </div>
            <div className="mt-6">
              <TrendChart />
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/40">
              Illustrative trend. Real charts are generated from your own saved sessions.
            </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
