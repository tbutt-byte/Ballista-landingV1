import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/cn'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const WORD = 'block text-[clamp(2.25rem,9vw,5.25rem)] font-semibold leading-[0.95] tracking-tighter'

const WORDS: { text: string; align: string }[] = [
  { text: 'turn every', align: 'self-start' },
  { text: 'swing into', align: 'self-center' },
  { text: 'measurable progress.', align: 'self-end' },
]

// Deterministic pseudo-random so fragments are stable across renders.
function rand(seed: number) {
  const v = Math.sin(seed * 12.9898) * 43758.5453
  return v - Math.floor(v)
}

// When the bat passes a letter it kicks out, then re-forms so the word stays legible.
function letterShatter(index: number) {
  const a = rand(index)
  const b = rand(index + 100)
  const c = rand(index + 200)
  return {
    x: [0, 0, (a - 0.5) * 90, 0],
    y: [26, 0, (b - 0.5) * 70 - 10, 0],
    rotate: [0, 0, (c - 0.5) * 70, 0],
    opacity: [0, 1, 0.7, 1],
  }
}

// Floating debris that bursts on contact then drifts forever.
const SHARDS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: (rand(i + 1) - 0.5) * 620,
  y: (rand(i + 50) - 0.5) * 360,
  size: 5 + rand(i + 9) * 9,
  rot: rand(i + 12) * 360,
  delay: 0.9 + rand(i + 4) * 0.5,
  dur: 5 + rand(i + 7) * 4,
}))

export function SwingHeadline() {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <h1 className="mt-6 flex flex-col text-white">
        {WORDS.map((w) => (
          <span key={w.text} className={cn(WORD, w.align, 'flex flex-wrap gap-x-[0.22em]')}>
            {w.text.split(' ').map((word, wordIdx) => (
              <span key={`${w.text}-${wordIdx}`} className={word === 'progress.' ? 'text-accent' : undefined}>
                {word}
              </span>
            ))}
          </span>
        ))}
      </h1>
    )
  }

  let letterIndex = 0

  return (
    <div className="relative mt-6">
      {/* Floating fragments */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {SHARDS.map((s) => (
          <motion.span
            key={s.id}
            className="absolute left-1/2 top-1/2 bg-white/70"
            style={{
              width: s.size,
              height: s.size,
              clipPath: 'polygon(50% 0%, 100% 60%, 30% 100%, 0% 35%)',
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
            animate={{
              x: [0, s.x],
              y: [0, s.y],
              opacity: [0, 0.7, 0.5],
              scale: [0.4, 1],
              rotate: [0, s.rot],
            }}
            transition={{ duration: 1.1, delay: s.delay, ease: 'easeOut' }}
          >
            <motion.span
              className="block h-full w-full"
              style={{ background: 'inherit', clipPath: 'inherit' }}
              animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
              transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.delay + 1.1 }}
            />
          </motion.span>
        ))}
      </div>

      {/* Bat-swing streak */}
      <motion.span
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[3px] w-[160%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)',
          filter: 'blur(1px)',
        }}
        aria-hidden="true"
        initial={{ x: '-75%', opacity: 0, scaleX: 0.6 }}
        animate={{ x: ['-75%', '75%'], opacity: [0, 1, 0], scaleX: [0.6, 1.1, 0.6] }}
        transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
      />

      {/* Headline — real text for SEO, aria-label for screen readers, letters animate */}
      <h1
        className="relative z-[1] flex flex-col text-white"
        aria-label="Turn every swing into measurable progress."
      >
        {WORDS.map((w, wi) => (
          <span
            key={w.text}
            className={cn(WORD, w.align, 'flex flex-wrap gap-x-[0.22em]')}
            aria-hidden="true"
          >
            {w.text.split(' ').map((word, wordIdx) => (
              <span
                key={`${w.text}-word-${wordIdx}`}
                className={cn('inline-flex whitespace-nowrap', word === 'progress.' && 'text-accent')}
              >
                {word.split('').map((ch) => {
                  const i = letterIndex++
                  const k = letterShatter(i)
                  return (
                    <motion.span
                      key={`${w.text}-${i}`}
                      className="inline-block will-change-transform"
                      initial={{ opacity: 0, y: 26 }}
                      animate={{ x: k.x, y: k.y, rotate: k.rotate, opacity: k.opacity }}
                      transition={{
                        duration: 1.5,
                        delay: 0.15 + wi * 0.12 + i * 0.025,
                        times: [0, 0.3, 0.6, 1],
                        ease: EASE,
                      }}
                    >
                      {ch}
                    </motion.span>
                  )
                })}
              </span>
            ))}
          </span>
        ))}
      </h1>
    </div>
  )
}
