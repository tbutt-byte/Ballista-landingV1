import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import type { DemoOverlayKey } from '../../data/demoSwing'

const CONTACT_TIME = 4
const CONTACT_WINDOW = 0.6

/**
 * Illustrative-only overlay graphics. There is no real frame-by-frame pose
 * tracking behind this demo, so the marks are deliberately abstract and not
 * pinned to the athlete's actual position in the footage (see DemoSourceNotice).
 */
export function DemoOverlaySvg({
  active,
  currentTime,
}: {
  active: Set<DemoOverlayKey>
  currentTime: number
}) {
  const reduced = useReducedMotion()
  const contactVisible = active.has('contact') && Math.abs(currentTime - CONTACT_TIME) < CONTACT_WINDOW

  return (
    <svg
      viewBox="0 0 100 56.25"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {active.has('path') && (
        <motion.path
          d="M 18 44 Q 46 40 62 18"
          fill="none"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeDasharray="2 2.4"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      )}

      {active.has('points') &&
        [
          [20, 43],
          [30, 41],
          [40, 35],
          [50, 27],
          [60, 19],
        ].map(([x, y], i) => (
          <motion.circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={0.9}
            fill="#fff"
            initial={reduced ? undefined : { opacity: 0.2 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}

      {active.has('stability') && (
        <motion.rect
          x={43}
          y={9}
          width={8}
          height={8}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.5"
          initial={reduced ? undefined : { opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <AnimatePresence>
        {contactVisible && (
          <motion.circle
            cx={62}
            cy={18}
            r={3}
            fill="none"
            stroke="#FF4D3D"
            strokeWidth="0.7"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.6] }}
            exit={{ opacity: 0 }}
            transition={{ duration: CONTACT_WINDOW * 2, ease: 'easeOut' }}
            style={{ transformOrigin: '62px 18px' }}
          />
        )}
      </AnimatePresence>
    </svg>
  )
}
