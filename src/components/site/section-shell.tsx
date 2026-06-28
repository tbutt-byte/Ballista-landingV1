import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './reveal'

type SectionShellProps = {
  id?: string
  eyebrow?: string
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
  /** Center the header block. */
  centered?: boolean
}

export function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  centered = false,
}: SectionShellProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28 scroll-mt-24', className)}>
      <div className="mx-auto max-w-6xl px-6">
        {(eyebrow || title || intro) && (
          <Reveal className={cn('max-w-2xl', centered && 'mx-auto text-center')}>
            {eyebrow && (
              <div
                className={cn(
                  'inline-flex items-center gap-2.5',
                  centered && 'justify-center',
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                  {eyebrow}
                </span>
              </div>
            )}
            {title && (
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
            )}
            {intro && <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">{intro}</p>}
          </Reveal>
        )}
        <div className={cn(Boolean(eyebrow || title || intro) && 'mt-12 md:mt-16')}>{children}</div>
      </div>
    </section>
  )
}
