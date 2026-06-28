import { Check } from 'lucide-react'
import { PLANS } from '../../lib/content'
import { SectionShell } from './section-shell'
import { Reveal } from './reveal'
import { cn } from '../../lib/cn'

export function PricingSection() {
  return (
    <SectionShell
      id="pricing"
      eyebrow="pricing"
      title="Start free. Upgrade when you're serious."
      intro="Simple plans for everyday players. Prices in Canadian dollars."
      centered
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.07}>
            <div
              className={cn(
                'flex h-full flex-col rounded-3xl border p-7',
                plan.featured
                  ? 'border-white/25 bg-white/[0.06]'
                  : 'border-white/10 bg-white/[0.03]',
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight text-white">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-black">
                    most popular
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight text-white">{plan.price}</span>
                <span className="text-sm text-white/50">{plan.cadence}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{plan.blurb}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/#early-access"
                className={cn(
                  'mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors',
                  plan.featured
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'border border-white/15 bg-white/[0.04] text-white hover:bg-white/10',
                )}
              >
                {plan.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
