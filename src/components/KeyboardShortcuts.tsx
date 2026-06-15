import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { playClick, isSoundEnabled } from '../utils/sound'

const SHORTCUT_KEYS = [
  { key: 'W', labelKey: 'shortcuts.scrollWork' },
  { key: 'S', labelKey: 'shortcuts.scrollServices' },
  { key: 'C', labelKey: 'shortcuts.scrollContact' },
  { key: 'A', labelKey: 'shortcuts.goAbout' },
  { key: 'P', labelKey: 'shortcuts.goPricing' },
  { key: 'H', labelKey: 'shortcuts.goHome' },
  { key: 'G', labelKey: 'shortcuts.openGithub' },
  { key: 'L', labelKey: 'shortcuts.openLinkedin' },
  { key: 'E', labelKey: 'shortcuts.copyEmail' },
  { key: '?', labelKey: 'shortcuts.togglePanel' },
] as const

export default function KeyboardShortcuts() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(isSoundEnabled)
  const navigate = useNavigate()

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    localStorage.setItem('co-studio-sound', next ? 'on' : 'off')
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const key = e.key.toUpperCase()
      if (key === '?') { setOpen(o => !o); return }
      if (e.key === 'Escape') { setOpen(false); return }

      if (!open) {
        e.preventDefault()
        switch (key) {
          case 'W': document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); break
          case 'S': document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); break
          case 'C': document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); break
          case 'A': navigate('/about'); break
          case 'P': navigate('/pricing'); break
          case 'H': navigate('/'); break
          case 'G': window.open('https://github.com/coocoolinoo', '_blank'); break
          case 'L': window.open('https://www.linkedin.com/in/corneliu-s-b488a22b6', '_blank'); break
          case 'E': navigator.clipboard.writeText('contact@co-studio.at'); break
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, navigate])

  return (
    <>
      <button
        onClick={() => { playClick(); setOpen(o => !o) }}
        title={t('shortcuts.buttonTitle')}
        className="fixed-action-btn"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid rgba(26,20,16,.15)',
          background: 'rgba(245,240,232,.9)',
          backdropFilter: 'blur(8px)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14, fontWeight: 700, color: 'rgba(26,20,16,.4)',
          transition: 'all .2s',
          boxShadow: '0 4px 16px rgba(26,20,16,.1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#E8522A'
          e.currentTarget.style.color = '#E8522A'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(26,20,16,.15)'
          e.currentTarget.style.color = 'rgba(26,20,16,.4)'
        }}
      >?</button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: .96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: .96 }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed', bottom: 70, right: 24, zIndex: 1000,
              background: 'white', borderRadius: 16,
              border: '1px solid rgba(26,20,16,.08)',
              boxShadow: '0 24px 64px rgba(26,20,16,.15)',
              padding: '20px 24px', minWidth: 260,
            }}
          >
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9, letterSpacing: '.2em',
              color: '#888', textTransform: 'uppercase', marginBottom: 14,
            }}>{t('shortcuts.title')}</div>

            {SHORTCUT_KEYS.map(s => (
              <div
                key={s.key}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 0', borderBottom: '1px solid rgba(26,20,16,.05)',
                  cursor: 'pointer', gap: 16,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(232,82,42,.03)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888' }}>
                  {t(s.labelKey)}
                </span>
                <kbd style={{
                  background: '#F5F0E8', border: '1px solid rgba(26,20,16,.12)',
                  borderRadius: 6, padding: '3px 8px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11, fontWeight: 700, color: '#1A1410',
                  boxShadow: '0 1px 0 rgba(26,20,16,.15)',
                }}>{s.key}</kbd>
              </div>
            ))}

            <div
              onClick={toggleSound}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 0 4px', cursor: 'pointer', gap: 16, marginTop: 4,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(232,82,42,.03)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888' }}>
                {soundOn ? t('shortcuts.soundOn') : t('shortcuts.soundOff')}
              </span>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: soundOn ? 'rgba(232,82,42,.08)' : 'rgba(26,20,16,.04)',
                border: `1px solid ${soundOn ? 'rgba(232,82,42,.2)' : 'rgba(26,20,16,.1)'}`,
                borderRadius: 999, padding: '3px 10px',
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: soundOn ? '#E8522A' : '#bbb',
                transition: 'all .2s',
              }}>
                {soundOn ? '🔊' : '🔇'}
              </div>
            </div>

            <div style={{
              marginTop: 8, fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8, color: '#bbb', letterSpacing: '.08em',
            }}>{t('shortcuts.closeHint')}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
