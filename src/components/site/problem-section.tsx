import { PROBLEMS } from '../../lib/content'
import { SectionShell } from './section-shell'
import { Reveal } from './reveal'

export function ProblemSection() {
  return (
    <SectionShell
      id="problem"
      eyebrow="the problem"
      title="Reps without feedback don't tell you what's improving."
      intro="Players take thousands of swings. Almost none of them are measured. Without a record of what changed, progress is a guess."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PROBLEMS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
