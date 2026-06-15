import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()

  const [droop, setDroop] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setDroop(true), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') window.location.href = '/'
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px', textAlign: 'center',
      fontFamily: "'JetBrains Mono', monospace",
    }}>

      {/* Drooping logo */}
      <motion.div
        initial={{ rotate: 0, y: 0 }}
        animate={{ rotate: droop ? -15 : 0, y: droop ? 8 : 0 }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ marginBottom: 40 }}
      >
        <svg width="80" height="80" viewBox="0 0 96 96" aria-hidden>
          <circle cx="48" cy="48" r="46" fill="#1A1410" />
          <circle cx="48" cy="48" r="28" fill="#F5F0E8" />
          <rect x="48" y="2" width="48" height="46" fill="#F5F0E8" />
          <rect x="48" y="48" width="48" height="46" fill="#F5F0E8" />
          <circle cx="48" cy="20" r="9" fill="rgba(232,82,42,.3)" />
          <circle cx="48" cy="20" r="4" fill="rgba(26,20,16,.3)" />
        </svg>
      </motion.div>

      {/* Big faded 404 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(100px, 20vw, 180px)',
          fontWeight: 900, color: 'rgba(26,20,16,.06)',
          letterSpacing: -6, lineHeight: 1,
          marginBottom: -20,
          userSelect: 'none',
        }}
        aria-hidden
      >
        404
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 900, color: '#1A1410',
          letterSpacing: -1, marginBottom: 8,
        }}
      >
        {t('notFound.title')}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ fontSize: 12, color: '#E8522A', letterSpacing: '.1em', marginBottom: 20 }}
      >
        {t('notFound.sub')}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{
          fontSize: 12, color: '#888', lineHeight: 1.8,
          maxWidth: 400, marginBottom: 40,
        }}
      >
        {t('notFound.desc')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-block',
            border: '1.5px solid #1A1410',
            borderRadius: 999,
            padding: '12px 28px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10, letterSpacing: '.12em',
            color: '#1A1410', textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'all .2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#1A1410'
            e.currentTarget.style.color = '#F5F0E8'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#1A1410'
          }}
        >
          {t('notFound.home')}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ marginTop: 16, fontSize: 9, color: 'rgba(26,20,16,.25)', letterSpacing: '.12em' }}
      >
        {t('notFound.hint')}
      </motion.div>
    </div>
  )
}
