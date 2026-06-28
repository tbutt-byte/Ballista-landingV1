import { STEPS } from '../../lib/content'
import { SectionShell } from './section-shell'
import { Reveal } from './reveal'

export function HowItWorks() {
  return (
    <SectionShell
      id="how-it-works"
      eyebrow="how it works"
      title="Five steps. One phone."
      intro="Ballista fits the way players already practice — set up, swing, and review."
    >
      <ol className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.step} delay={i * 0.06}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <span className="text-4xl font-semibold tracking-tight text-white/20">{s.step}</span>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </SectionShell>
  )
}
