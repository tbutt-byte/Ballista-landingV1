import { Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react'

const BTN = 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/15'

export function DemoControlBar({
  isPlaying,
  isMuted,
  onPlayPause,
  onReplay,
  onMuteToggle,
}: {
  isPlaying: boolean
  isMuted: boolean
  onPlayPause: () => void
  onReplay: () => void
  onMuteToggle: () => void
}) {
  return (
    <div className="flex items-center gap-2.5">
      <button type="button" onClick={onPlayPause} className={BTN} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <button type="button" onClick={onReplay} className={BTN} aria-label="Replay">
        <RotateCcw className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onMuteToggle}
        className={BTN}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  )
}
