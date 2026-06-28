import { cn } from '../../lib/cn'

export function BallistaMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <img
      src="/assets/ballista-mark.png"
      alt=""
      aria-hidden="true"
      className={cn('object-contain', className)}
    />
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <BallistaMark className="w-6 h-6" />
      <span className="text-sm font-semibold tracking-tight text-white">Ballista Tracking</span>
    </span>
  )
}
