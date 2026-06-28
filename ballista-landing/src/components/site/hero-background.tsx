/**
 * Cinematic hero backdrop.
 *
 * Base layer: a generated baseball-swing still (`/assets/ballista-hero.jpg`).
 * When a looping clip exists at `/assets/ballista-hero-loop.mp4`, set
 * `HAS_HERO_VIDEO = true` and it autoplays (muted, looped, inline) over the
 * still. It is gated by a flag because a dev server serves `index.html` for a
 * missing `.mp4`, which would otherwise render an opaque box over the image.
 * A CSS depth field sits underneath so there is never a broken-media box, and
 * dark overlays keep the headline legible.
 */
const VIDEO_SRC = '/assets/ballista-hero-loop.mp4'
const IMAGE_SRC = '/assets/ballista-hero.jpg'
const HAS_HERO_VIDEO = false

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* CSS depth field (under everything) */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#17171a_0%,#0a0a0a_55%,#000_100%)]" />

      {/* Generated baseball still */}
      <img
        src={IMAGE_SRC}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-right opacity-[0.78]"
        loading="eager"
        decoding="async"
      />

      {/* Optional loop video — enable by adding the asset and flipping the flag */}
      {HAS_HERO_VIDEO && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(110%_75%_at_50%_45%,rgba(0,0,0,0.5),transparent_62%)]" />
    </div>
  )
}
