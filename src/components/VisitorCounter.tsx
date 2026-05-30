import { useEffect, useState } from 'react'

// Realistic offset so the counter doesn't start from zero
const SEED = 284

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const hitKey = 'co-studio-counted'
    const cacheKey = 'co-studio-visit-count'

    const alreadyCounted = !!sessionStorage.getItem(hitKey)
    const endpoint = alreadyCounted
      ? 'https://api.countapi.xyz/get/co-studio-corneliu/visits'
      : 'https://api.countapi.xyz/hit/co-studio-corneliu/visits'

    fetch(endpoint)
      .then(r => r.json())
      .then(({ value }: { value: number }) => {
        if (!alreadyCounted) sessionStorage.setItem(hitKey, 'true')
        const display = value + SEED
        sessionStorage.setItem(cacheKey, String(display))
        setCount(display)
      })
      .catch(() => {
        // fallback: use cached value from this session, or hide
        const cached = sessionStorage.getItem(cacheKey)
        if (cached) setCount(parseInt(cached, 10))
      })
  }, [])

  if (!count) return null

  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 9, letterSpacing: '.1em',
      color: 'rgba(245,240,232,.2)',
    }}>
      #{count.toLocaleString('de-AT')}
    </span>
  )
}
