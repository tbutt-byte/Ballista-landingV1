import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import {
  DEMO_METRICS,
  DEMO_OVERLAYS,
  DEMO_VIDEO_DURATION,
  DEMO_VIDEO_SRC,
  type DemoOverlayKey,
} from '../../data/demoSwing'
import { DemoOverlaySvg } from './demo-overlay-svg'
import { DemoControlBar } from './demo-control-bar'
import { DemoTimeline } from './demo-timeline'
import { DemoStepIndicator } from './demo-step-indicator'
import { DemoMetricLabel } from './demo-metric-label'
import { DemoSourceNotice } from './demo-source-notice'
import { cn } from '../../lib/cn'

export function DemoShell() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(DEMO_VIDEO_DURATION)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)
  const [activeOverlays, setActiveOverlays] = useState<Set<DemoOverlayKey>>(
    () => new Set(DEMO_OVERLAYS.filter((o) => o.defaultOn).map((o) => o.key)),
  )

  function handlePlayPause() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setHasStarted(true)
    } else {
      video.pause()
    }
  }

  function handleReplay() {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.play()
    setHasStarted(true)
  }

  function handleSeek(time: number) {
    const video = videoRef.current
    if (!video) return
    video.currentTime = time
    setCurrentTime(time)
  }

  function handleMuteToggle() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  function toggleOverlay(key: DemoOverlayKey) {
    setActiveOverlays((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            src={DEMO_VIDEO_SRC}
            muted={isMuted}
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
          <DemoOverlaySvg active={activeOverlays} currentTime={currentTime} />

          {!hasStarted && (
            <button
              type="button"
              onClick={handlePlayPause}
              aria-label="Play demo swing"
              className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors hover:bg-black/25"
            >
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-lg">
                <Play className="h-6 w-6" />
              </span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-white/10 bg-white/[0.03] px-4 py-3">
          <DemoControlBar
            isPlaying={isPlaying}
            isMuted={isMuted}
            onPlayPause={handlePlayPause}
            onReplay={handleReplay}
            onMuteToggle={handleMuteToggle}
          />
          <DemoTimeline currentTime={currentTime} duration={duration} onSeek={handleSeek} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <DemoStepIndicator currentTime={currentTime} />

        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
            Overlay
          </span>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {DEMO_OVERLAYS.map((overlay) => {
              const isActive = activeOverlays.has(overlay.key)
              return (
                <button
                  key={overlay.key}
                  type="button"
                  onClick={() => toggleOverlay(overlay.key)}
                  aria-pressed={isActive}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                    isActive
                      ? 'border-white/30 bg-white text-black'
                      : 'border-white/15 bg-white/[0.03] text-white/60 hover:bg-white/10',
                  )}
                >
                  {overlay.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
            Measured output
          </span>
          {DEMO_METRICS.map((metric) => (
            <DemoMetricLabel key={metric.key} metric={metric} currentTime={currentTime} />
          ))}
        </div>

        <DemoSourceNotice />
      </div>
    </div>
  )
}
