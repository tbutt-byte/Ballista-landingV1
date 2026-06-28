import { motion, useReducedMotion } from 'motion/react'

const ORB = 'absolute rounded-full blur-3xl'

/**
 * Site-wide ambient motion: a few large, very low-opacity glows drifting
 * slowly behind the page. Fixed positioning keeps it visible while
 * scrolling, independent of any one section's own background.
 */
export function AnimatedBackground() {
  const reduced = useReducedMotion()

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black" aria-hidden="true">
      <motion.div
        className={ORB}
        style={{
          left: '-15%',
          top: '-15%',
          width: '55vw',
          height: '55vw',
          background: 'radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)',
        }}
        animate={reduced ? undefined : { x: [0, 60, -20, 0], y: [0, 40, 80, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={ORB}
        style={{
          right: '-15%',
          top: '25%',
          width: '48vw',
          height: '48vw',
          background: 'radial-gradient(circle, rgba(255,77,61,0.05), transparent 70%)',
        }}
        animate={reduced ? undefined : { x: [0, -50, 30, 0], y: [0, -60, -20, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={ORB}
        style={{
          left: '20%',
          bottom: '-20%',
          width: '52vw',
          height: '52vw',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 72%)',
        }}
        animate={reduced ? undefined : { x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 46, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
