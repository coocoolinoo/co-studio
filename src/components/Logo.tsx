interface LogoProps {
  variant?: 'light' | 'dark' | 'accent'
  showWordmark?: boolean
  size?: number
}

export default function Logo({ variant = 'light', showWordmark = false, size = 48 }: LogoProps) {
  const colors = {
    light: { bracket: '#E8522A', letters: '#1A1410', wordmark: '#1A1410', sub: '#888' },
    dark: {
      bracket: '#E8522A',
      letters: '#F5F0E8',
      wordmark: '#F5F0E8',
      sub: 'rgba(245,240,232,0.4)',
    },
    accent: {
      bracket: '#ffffff',
      letters: '#1A1410',
      wordmark: '#ffffff',
      sub: 'rgba(255,255,255,0.6)',
    },
  }
  const c = colors[variant]
  const scale = size / 48

  // Text glyphs extend past the original artboard (esp. `}` at x=84 + fontSize 48).
  const iconViewBox = '-4 -10 116 66'
  const wordmarkViewBox = '-4 -10 236 66'

  if (showWordmark) {
    return (
      <svg
        width={220 * scale}
        height={58 * scale}
        viewBox={wordmarkViewBox}
        overflow="visible"
        style={{ display: 'block', flexShrink: 0 }}
        role="img"
        aria-label="co-studio logo"
      >
        <text x="0" y="46" fontFamily="monospace" fontSize="48" fontWeight="900" fill={c.bracket}>
          {`{`}
        </text>
        <text x="32" y="46" fontFamily="monospace" fontSize="48" fontWeight="900" fill={c.letters}>
          cs
        </text>
        <text x="84" y="46" fontFamily="monospace" fontSize="48" fontWeight="900" fill={c.bracket}>
          {`}`}
        </text>
        <text
          x="112"
          y="40"
          fontFamily="monospace"
          fontSize="14"
          fontWeight="700"
          fill={c.wordmark}
          letterSpacing="1"
        >
          co-studio
        </text>
      </svg>
    )
  }

  return (
    <svg
      width={100 * scale}
      height={58 * scale}
      viewBox={iconViewBox}
      overflow="visible"
      style={{ display: 'block', flexShrink: 0 }}
      role="img"
      aria-label="co-studio logo"
    >
      <text x="0" y="46" fontFamily="monospace" fontSize="48" fontWeight="900" fill={c.bracket}>
        {`{`}
      </text>
      <text x="32" y="46" fontFamily="monospace" fontSize="48" fontWeight="900" fill={c.letters}>
        cs
      </text>
      <text x="84" y="46" fontFamily="monospace" fontSize="48" fontWeight="900" fill={c.bracket}>
        {`}`}
      </text>
    </svg>
  )
}
