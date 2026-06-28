import { DEMO_PHASES, phaseAt } from '../../data/demoSwing'
import { cn } from '../../lib/cn'

export function DemoStepIndicator({ currentTime }: { currentTime: number }) {
  const active = phaseAt(currentTime)

  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Demo playback phase">
      {DEMO_PHASES.map((phase) => {
        const isActive = phase.key === active.key
        return (
          <li
            key={phase.key}
            aria-current={isActive ? 'step' : undefined}
            className={cn(
              'rounded-xl border px-2 py-2 text-center text-[11px] font-medium uppercase tracking-[0.12em] transition-colors',
              isActive
                ? 'border-white/30 bg-white/[0.08] text-white'
                : 'border-white/10 bg-white/[0.02] text-white/40',
            )}
          >
            {phase.label}
          </li>
        )
      })}
    </ol>
  )
}
