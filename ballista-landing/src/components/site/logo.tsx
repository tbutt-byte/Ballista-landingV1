import { cn } from '../../lib/cn'

export function BallistaMark({ className = 'w-7 h-7 text-white' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} fill="none" aria-hidden="true">
      <path
        d="M38 168C84 76 152 50 222 44"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M170 46H224V100"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="74" cy="180" r="26" fill="currentColor" />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <BallistaMark className="w-6 h-6 text-white" />
      <span className="text-sm font-semibold tracking-tight text-white">Ballista Tracking</span>
    </span>
  )
}
