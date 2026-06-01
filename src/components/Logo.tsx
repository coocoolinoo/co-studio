import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LogoProps {
  variant?: 'light' | 'dark' | 'secondary-light' | 'secondary-dark' | 'accent'
  showWordmark?: boolean
  size?: number
}

function PrimaryLogo({ variant, size }: { variant: 'light' | 'dark'; size: number }) {
  const isDark = variant === 'dark'
  const outerFill  = isDark ? '#E8522A' : '#1A1410'
  const innerFill  = isDark ? '#1A1410' : '#F5F0E8'
  const dotOuter   = isDark ? '#F5F0E8' : '#E8522A'
  const dotInner   = isDark ? '#E8522A' : '#1A1410'

  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const key = 'co-studio-logo-orbit'
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, 'true')
      const t = setTimeout(() => setShouldAnimate(true), 1200)
      return () => clearTimeout(t)
    } else {
      setDone(true)
    }
  }, [])

  return (
    <svg viewBox="0 0 96 96" width={size} height={size} role="img" aria-label="co-studio logo">
      <circle cx="48" cy="48" r="46" fill={outerFill} />
      <circle cx="48" cy="48" r="28" fill={innerFill} />
      <rect x="48" y="2" width="48" height="46" fill={innerFill} />
      <rect x="48" y="48" width="48" height="46" fill={innerFill} />

      {/* Orbiting outer dot */}
      {shouldAnimate && !done ? (
        <motion.circle
          r="9"
          fill={dotOuter}
          initial={{ cx: 48, cy: 20 }}
          animate={{ cx: [48, 76, 48, 20, 48], cy: [20, 48, 76, 48, 20] }}
          transition={{ duration: 1.0, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] }}
          onAnimationComplete={() => setDone(true)}
        />
      ) : (
        <circle cx="48" cy="20" r="9" fill={dotOuter} />
      )}

      {/* Inner dot — always static */}
      <circle cx="48" cy="20" r="4" fill={dotInner} />
    </svg>
  )
}

export default function Logo({ variant = 'light', size = 48 }: LogoProps) {
  if (variant === 'secondary-light') {
    return (
      <svg viewBox="0 0 96 96" width={size} height={size} role="img" aria-label="co-studio logo">
        <rect x="0" y="0" width="96" height="96" rx="22" fill="#1A1410"/>
        <line x1="52" y1="16" x2="28" y2="80" stroke="#F5F0E8" strokeWidth="10" strokeLinecap="round"/>
        <line x1="68" y1="16" x2="44" y2="80" stroke="#E8522A" strokeWidth="10" strokeLinecap="round"/>
      </svg>
    )
  }

  if (variant === 'secondary-dark') {
    return (
      <svg viewBox="0 0 96 96" width={size} height={size} role="img" aria-label="co-studio logo">
        <rect x="0" y="0" width="96" height="96" rx="22" fill="#E8522A"/>
        <line x1="52" y1="16" x2="28" y2="80" stroke="#1A1410" strokeWidth="10" strokeLinecap="round"/>
        <line x1="68" y1="16" x2="44" y2="80" stroke="#1A1410" strokeWidth="10" strokeLinecap="round"/>
      </svg>
    )
  }

  if (variant === 'dark') return <PrimaryLogo variant="dark" size={size} />

  // light + accent → primary light
  return <PrimaryLogo variant="light" size={size} />
}
