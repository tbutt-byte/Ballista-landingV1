import { useState, type RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SCROLL_OFFSET: ['start start', 'end start'] = ['start start', 'end start']
const LOAD_DX_VW = 13
const LOAD_DY_VH = -15

/** Angle (deg) that points a default leftward bar opposite the ball's actual
 *  travel direction, so the motion-blur trail lines up with where it's
 *  going instead of sitting fixed at one orientation regardless of motion. */
function computeTrailAngle() {
  if (typeof window === 'undefined') return -35
  const dxPx = (LOAD_DX_VW / 100) * window.innerWidth
  const dyPx = (LOAD_DY_VH / 100) * window.innerHeight
  return (Math.atan2(dyPx, dxPx) * 180) / Math.PI
}

/**
 * The ball that gets hit the instant the bat-streak crosses the headline
 * (see swing-headline.tsx): a standard load-time launch animation (same
 * initial/animate pattern as the rest of the hero) on an inner element,
 * with scroll-driven continuation layered on as an additive transform on
 * the outer wrapper — so it keeps traveling further as the page scrolls.
 *
 * Distances use vw/vh, not %, because % on a transform resolves against the
 * ball's own tiny size — a few px of "movement" that reads as stuck in place.
 */
export function HeroBall({ containerRef }: { containerRef: RefObject<HTMLElement> }) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: SCROLL_OFFSET })
  const [trailAngle] = useState(computeTrailAngle)

  const scrollX = useTransform(scrollYProgress, [0, 1], ['0vw', '26vw'])
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0vh', '-48vh'])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.4])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0])
  const scrollSpin = useTransform(scrollYProgress, [0, 1], [0, 280])

  if (reduced) return null

  return (
    <motion.div
      className="pointer-events-none absolute left-[58%] top-[34%] z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ x: scrollX, y: scrollY, scale: scrollScale, opacity: scrollOpacity }}
      aria-hidden="true"
    >
      <motion.div
        className="relative h-8 w-8"
        initial={{ x: 0, y: 0, opacity: 0, scale: 0.25 }}
        animate={{ x: `${LOAD_DX_VW}vw`, y: `${LOAD_DY_VH}vh`, opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.78, ease: EASE }}
      >
        {/* Trail: rotated as a unit so it always points opposite the travel
            direction, independent of the ball's own decorative spin below. */}
        <div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: `rotate(${trailAngle}deg)` }}>
          <span className="absolute right-0 top-0 h-[3px] w-16 -translate-y-1/2 rounded-full bg-gradient-to-l from-accent/90 via-accent/25 to-transparent blur-[1.5px]" />
        </div>

        <motion.svg
          viewBox="0 0 28 28"
          className="h-8 w-8 drop-shadow-[0_0_10px_rgba(255,77,61,0.55)]"
          style={{ rotate: scrollSpin }}
        >
          <circle cx="14" cy="14" r="13" fill="#f5f5f5" />
          <path d="M6 4 Q 14 14 6 24" stroke="#FF4D3D" strokeWidth="1.3" fill="none" />
          <path d="M22 4 Q 14 14 22 24" stroke="#FF4D3D" strokeWidth="1.3" fill="none" />
        </motion.svg>
      </motion.div>
    </motion.div>
  )
}
