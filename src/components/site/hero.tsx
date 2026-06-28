import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Play } from 'lucide-react'
import { HERO_METRICS } from '../../lib/content'
import { HeroBackground } from './hero-background'
import { HeroBall } from './hero-ball'
import { MetricCard } from './metric-card'
import { SwingHeadline } from './swing-headline'
import { cn } from '../../lib/cn'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Hero() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28"
    >
      <HeroBackground />
      <HeroBall containerRef={sectionRef} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Central content column — kept narrower than the corner metric gutters */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            zero-hardware baseball tracking
          </motion.div>

          <SwingHeadline />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
          >
            Ballista uses your iPhone camera to capture swings, detect motion, and track player
            development without extra sensors, radar units, or wearables.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="/#early-access"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:bg-white/90 active:scale-[0.98] sm:w-auto"
            >
              join the beta
            </a>
            <a
              href="/#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto"
            >
              <Play className="h-4 w-4" />
              see how it works
            </a>
          </motion.div>
        </div>

        {/* Metric blocks: mobile grid in-flow; pinned to corners at xl */}
        <div className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-3 sm:max-w-xl xl:contents">
          {HERO_METRICS.map((m, i) => (
            <motion.div
              key={m.unit + m.value}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease: EASE }}
              className={cn(m.pin, m.mobileOnly && 'xl:hidden', 'xl:w-48')}
            >
              <MetricCard value={m.value} unit={m.unit} caption={m.caption} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
