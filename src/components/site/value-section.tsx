import { SectionShell } from './section-shell'
import { Reveal } from './reveal'

const PANELS: { role: string; line: string }[] = [
  { role: 'Player', line: 'See what changed from swing to swing.' },
  { role: 'Parent', line: 'Understand whether practice is turning into progress.' },
  { role: 'Coach', line: 'Review development between sessions with clearer context.' },
]

export function ValueSection() {
  return (
    <SectionShell
      id="value"
      eyebrow="who it's for"
      title="A feedback loop for the people around the player."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {PANELS.map((p, i) => (
          <Reveal key={p.role} delay={i * 0.07} className={i === 1 ? 'sm:-translate-y-3' : ''}>
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <svg viewBox="0 0 32 32" className="h-6 w-6 text-accent" aria-hidden="true">
                <circle cx="8" cy="24" r="2.2" fill="currentColor" />
                <circle cx="16" cy="14" r="2.2" fill="currentColor" />
                <circle cx="26" cy="8" r="2.2" fill="currentColor" />
                <path d="M8 24 L16 14 L26 8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeDasharray="2 3" />
              </svg>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{p.role}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p.line}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
