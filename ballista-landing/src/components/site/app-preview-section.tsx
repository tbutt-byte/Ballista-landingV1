import { SectionShell } from './section-shell'
import { Reveal } from './reveal'
import { PhoneFrame, ScreenHome, ScreenReview, ScreenProgress } from './app-preview'
import { cn } from '../../lib/cn'

const SCREENS = [
  { key: 'home', label: 'Home', screen: <ScreenHome />, lift: false },
  { key: 'review', label: 'Swing review', screen: <ScreenReview />, lift: true },
  { key: 'progress', label: 'Progress', screen: <ScreenProgress />, lift: false },
]

export function AppPreviewSection() {
  return (
    <SectionShell
      id="app"
      className="border-t border-white/10"
      eyebrow="the app"
      title="Record, detect, review — on one device."
      intro="Everything happens around the phone you already carry: capture a swing, let computer vision detect it, and review movement metrics and progress after each session."
      centered
    >
      <Reveal>
        <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:justify-center md:gap-6 md:overflow-visible md:pb-0 md:[scrollbar-width:none]">
          {SCREENS.map((s, i) => (
            <div
              key={s.key}
              className={cn(
                'flex snap-center flex-col items-center',
                s.lift && 'md:-translate-y-5',
                !s.lift && 'md:scale-[0.97] md:opacity-90',
              )}
            >
              <PhoneFrame>{s.screen}</PhoneFrame>
              <span className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                {s.label}
              </span>
              <span className="sr-only">{`Ballista app ${s.label} screen ${i + 1} of ${SCREENS.length}`}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  )
}
