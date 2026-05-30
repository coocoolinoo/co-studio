declare const __BUILD_DATE__: string

export default function LastUpdated() {
  const buildDate = new Date(__BUILD_DATE__)
  const formatted = buildDate.toLocaleDateString('en-US', {
    month: 'long', year: 'numeric',
  })

  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 8, letterSpacing: '.12em',
      color: 'rgba(245,240,232,.18)',
      textTransform: 'uppercase',
    }}>
      Updated {formatted}
    </span>
  )
}
