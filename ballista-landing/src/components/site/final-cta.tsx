import { Reveal } from './reveal'
import { EarlyAccessForm } from './early-access-form'

export function FinalCta() {
  return (
    <section id="early-access" className="py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-14">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="inline-flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                  early access
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Track every swing from the season's first rep.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
                Join early access and be among the first players, parents, and coaches to track swing
                movement and progress with nothing but an iPhone.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <EarlyAccessForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
