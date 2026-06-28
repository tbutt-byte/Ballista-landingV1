import { METRICS } from '../../lib/content'
import { SectionShell } from './section-shell'
import { Reveal } from './reveal'

export function MetricsSection() {
  return (
    <SectionShell
      id="metrics"
      eyebrow="metrics"
      title="Movement-based metrics, tracked over time."
      intro="Ballista measures swing movement from video. It's built for progress tracking and trend analysis — not lab-grade biomechanics or exact bat speed."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {METRICS.map((m, i) => (
          <Reveal key={m.title} delay={(i % 3) * 0.05}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/20">
              <h3 className="text-lg font-semibold tracking-tight text-white">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{m.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/45">
          Where a reliable reference is available, exit velocity can be used as validation. Ballista
          is not a replacement for professional measurement systems like Trackman, Rapsodo, or
          HitTrax.
        </p>
      </Reveal>
    </SectionShell>
  )
}
