import { cn } from '../../lib/cn'

type MetricCardProps = {
  value: string
  unit: string
  caption: string
  className?: string
}

export function MetricCard({ value, unit, caption, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md',
        'shadow-[0_8px_40px_rgba(0,0,0,0.35)]',
        className,
      )}
    >
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold tracking-tight text-accent md:text-3xl">{value}</span>
        <span className="text-xs font-medium uppercase tracking-wide text-white/50">{unit}</span>
      </div>
      <p className="mt-1 text-xs text-white/55">{caption}</p>
    </div>
  )
}
