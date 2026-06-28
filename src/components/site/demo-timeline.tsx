export function DemoTimeline({
  currentTime,
  duration,
  onSeek,
}: {
  currentTime: number
  duration: number
  onSeek: (time: number) => void
}) {
  const pct = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex flex-1 items-center gap-3">
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.01}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label="Seek demo swing video"
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-white"
        style={{
          background: `linear-gradient(to right, rgba(255,255,255,0.9) ${pct}%, rgba(255,255,255,0.15) ${pct}%)`,
        }}
      />
      <span className="w-16 shrink-0 text-right text-[11px] tabular-nums text-white/50">
        {currentTime.toFixed(1)}s / {duration.toFixed(0)}s
      </span>
    </div>
  )
}
