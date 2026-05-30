import { useEffect, useState } from 'react'

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const visitedKey = 'co-studio-visitor'
    const countKey = 'co-studio-count'
    const storedCount = parseInt(localStorage.getItem(countKey) || '1247', 10)

    if (!localStorage.getItem(visitedKey)) {
      const newCount = storedCount + 1
      localStorage.setItem(visitedKey, 'true')
      localStorage.setItem(countKey, String(newCount))
      setCount(newCount)
    } else {
      setCount(storedCount)
    }
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
