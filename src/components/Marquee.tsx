type MarqueeProps = {
  text: string
  className?: string
  variant?: 'ticker' | 'display'
  speed?: 'slow' | 'normal'
}

function renderWithAccentStars(text: string) {
  const parts = text.split('*')
  return parts.map((part, i) => (
    <span key={`${part}-${i}`}>
      {part}
      {i < parts.length - 1 && <span className="marquee-star">*</span>}
    </span>
  ))
}

export default function Marquee({
  text,
  className = '',
  variant = 'ticker',
  speed = 'slow',
}: MarqueeProps) {
  const segment = `${text} `
  const repeated = segment.repeat(variant === 'display' ? 8 : 4)
  const trackClass =
    speed === 'slow' ? 'marquee-track marquee-track-30s' : 'marquee-track'

  if (variant === 'display') {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className={trackClass}>
          <span
            className="font-display font-black uppercase leading-none tracking-tight text-near-black whitespace-nowrap px-6"
            style={{ fontSize: 'clamp(4rem, 12vw, 8rem)' }}
          >
            {repeated}
          </span>
          <span
            className="font-display font-black uppercase leading-none tracking-tight text-near-black whitespace-nowrap px-6"
            style={{ fontSize: 'clamp(4rem, 12vw, 8rem)' }}
            aria-hidden
          >
            {repeated}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`w-full overflow-hidden border-t border-white/20 bg-near-black text-off-white ${className}`}
    >
      <div className={trackClass}>
        <span className="font-mono text-sm tracking-[0.28em] uppercase whitespace-nowrap px-6 py-4 md:text-base">
          {renderWithAccentStars(repeated)}
        </span>
        <span
          className="font-mono text-sm tracking-[0.28em] uppercase whitespace-nowrap px-6 py-4 md:text-base"
          aria-hidden
        >
          {renderWithAccentStars(repeated)}
        </span>
      </div>
    </div>
  )
}
