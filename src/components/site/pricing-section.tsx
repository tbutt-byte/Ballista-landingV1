import { Check } from 'lucide-react'
import { PLAN } from '../../lib/content'
import { SectionShell } from './section-shell'
import { Reveal } from './reveal'

export function PricingSection() {
  return (
    <SectionShell
      id="pricing"
      eyebrow="pricing"
      title={`Try it free for ${PLAN.trialDays} days.`}
      intro="One plan, no tiers to compare. Prices in Canadian dollars."
      centered
    >
      <div className="mx-auto max-w-md">
        <Reveal>
          <div className="flex flex-col rounded-3xl border border-accent/25 bg-white/[0.05] p-8 shadow-[0_0_60px_rgba(255,77,61,0.08)]">
            <span className="inline-flex w-fit items-center rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-white">
              {PLAN.trialDays}-day free trial
            </span>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight text-white">{PLAN.price}</span>
              <span className="text-sm text-white/50">{PLAN.cadence}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/55">{PLAN.blurb}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {PLAN.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="/#early-access"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
            >
              {PLAN.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
