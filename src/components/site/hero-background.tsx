/**
 * Abstract cinematic hero backdrop — no photographic player, since the
 * scroll-driven ball in hero-ball.tsx is the hero's visual subject and the
 * player stays off-screen. Just a dark depth field and a soft floodlight
 * glow that breathes slowly.
 */
import { motion, useReducedMotion } from 'motion/react'

export function HeroBackground() {
  const reduced = useReducedMotion()

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#17171a_0%,#0a0a0a_55%,#000_100%)]" />

      <motion.div
        className="absolute -left-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_70%)]"
        animate={reduced ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* A trace of the brand accent where the ball launches from — an ember, not a colored light. */}
      <motion.div
        className="absolute right-[6%] top-[30%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,rgba(255,77,61,0.16),transparent_72%)]"
        animate={reduced ? undefined : { opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />
    </div>
  )
}
