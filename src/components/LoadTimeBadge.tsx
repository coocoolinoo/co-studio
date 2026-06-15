import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadTimeBadge() {
  const { t } = useTranslation()
  const [loadTime, setLoadTime] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const measure = () => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (nav) {
        const time = Math.round(nav.loadEventEnd - nav.startTime)
        if (time > 0) {
          setLoadTime(time)
          setVisible(true)
          setTimeout(() => setVisible(false), 6000)
        }
      }
    }

    if (document.readyState === 'complete') {
      setTimeout(measure, 100)
    } else {
      window.addEventListener('load', () => setTimeout(measure, 100))
    }
  }, [])

  const getColor = (ms: number) => {
    if (ms < 800)  return '#22c55e'
    if (ms < 2000) return '#F0B429'
    return '#ef4444'
  }

  const getLabel = (ms: number) => {
    if (ms < 800)  return t('loadTime.fast')
    if (ms < 2000) return t('loadTime.ok')
    return t('loadTime.slow')
  }

  if (!loadTime) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            zIndex: 1000,
            background: 'rgba(245,240,232,.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(26,20,16,.1)',
            borderRadius: 999,
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 20px rgba(26,20,16,.12)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: '.08em',
          }}
        >
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: getColor(loadTime),
            flexShrink: 0,
          }} />

          <span style={{ color: getColor(loadTime), fontWeight: 700 }}>
            {loadTime < 1000
              ? `${loadTime}ms`
              : `${(loadTime / 1000).toFixed(1)}s`}
          </span>

          <span style={{ color: 'rgba(26,20,16,.4)' }}>
            {getLabel(loadTime)}
          </span>

          <div style={{
            width: 60, height: 3,
            background: 'rgba(26,20,16,.08)',
            borderRadius: 2, overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (loadTime / 3000) * 100)}%` }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                height: '100%',
                background: getColor(loadTime),
                borderRadius: 2,
              }}
            />
          </div>

          <button
            onClick={() => setVisible(false)}
            aria-label={t('meta.dismiss')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(26,20,16,.2)', fontSize: 12,
              padding: 0, lineHeight: 1,
            }}
          >×</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
