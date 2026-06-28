import { motion, AnimatePresence } from 'motion/react'
import type { DemoMetric } from '../../data/demoSwing'

export function DemoMetricLabel({ metric, currentTime }: { metric: DemoMetric; currentTime: number }) {
  const revealed = currentTime >= metric.revealAt

  return (
    <AnimatePresence>
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5"
        >
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/50">{metric.label}</span>
          <span className="text-sm font-semibold text-accent">
            {metric.value}
            <span className="ml-1 text-xs font-normal text-white/50">{metric.unit}</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
