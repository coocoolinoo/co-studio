import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { playClick, playWhoosh, isSoundEnabled } from '../utils/sound'
import ProjectReactions from './ProjectReactions'
import TiltCard from './TiltCard'

const projects = [
  {
    id: 'pifx',
    slug: 'pifx',
    num: '01',
    tags: ['C++', 'Raspberry Pi', 'DSP', 'Linux', 'Hardware'],
    year: '2026',
    typeKey: 'hardware' as const,
    image: '/assets/projects/pi.png',
    visualBg: '#0d1117',
    accentColor: '#E8522A',
    wrapInPhone: false,
    wrapInBrowser: false,
    hasDemo: false,
    demoUrl: null as string | null,
    browserUrl: null as string | null,
  },
  {
    id: 'bible',
    slug: 'cobible',
    num: '02',
    tags: ['React Native', 'Expo', 'SQLite', 'Mobile', 'Offline-first'],
    year: '2026',
    typeKey: 'mobileApp' as const,
    image: '/assets/projects/bible.png',
    visualBg: '#1a2a1b',
    accentColor: '#4CAF50',
    wrapInPhone: true,
    wrapInBrowser: false,
    hasDemo: true,
    demoUrl: null as string | null,
    browserUrl: null as string | null,
  },
  {
    id: 'bibelsuche',
    slug: 'bibelsuche',
    num: '03',
    tags: ['Tauri', 'React', 'Rust', 'Desktop', 'SQLite'],
    year: '2026',
    typeKey: 'desktopApp' as const,
    image: '/assets/projects/bibelsuche.png',
    visualBg: '#0f172a',
    accentColor: '#3B82F6',
    wrapInPhone: false,
    wrapInBrowser: false,
    hasDemo: true,
    demoUrl: null as string | null,
    browserUrl: null as string | null,
  },
  {
    id: 'vs',
    slug: 'vsmannersdorf',
    num: '04',
    tags: ['React', 'Vite', 'CSS Modules', 'Web'],
    year: '2025',
    typeKey: 'web' as const,
    image: '/assets/projects/vs.png',
    visualBg: '#fef3c7',
    accentColor: '#c8a04a',
    wrapInPhone: false,
    wrapInBrowser: true,
    hasDemo: true,
    demoUrl: 'https://vs-mannersdorf.vercel.app/' as string | null,
    browserUrl: 'vsmannersdorf.at',
  },
  {
    id: 'al',
    slug: 'alzeichenbuero',
    num: '05',
    tags: ['React', 'Vite', 'Web', 'Design'],
    year: '2026',
    typeKey: 'web' as const,
    image: '/assets/projects/al.png',
    visualBg: '#1c1917',
    accentColor: '#a8a29e',
    wrapInPhone: false,
    wrapInBrowser: true,
    hasDemo: true,
    demoUrl: 'https://al-zeichenbuero.vercel.app/' as string | null,
    browserUrl: 'al-zeichenbuero.vercel.app',
  },
]

const isLight = (bg: string) => bg === '#fef3c7'

export default function WorkReel() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [demoOpen, setDemoOpen] = useState(false)
  const [demoDevice, setDemoDevice] = useState<'desktop' | 'phone'>('desktop')
  const [demoLoading, setDemoLoading] = useState(true)
  const total = projects.length
  const proj = projects[current]
  const projectTitle = t(`work.${proj.slug}.title`)

  const visualPanelRef = useRef<HTMLDivElement>(null)
  const [panelSpotlight, setPanelSpotlight] = useState({ x: 0, y: 0, visible: false })

  useEffect(() => {
    const el = visualPanelRef.current
    if (!el) return
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setPanelSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true })
    }
    const handleLeave = () => setPanelSpotlight(s => ({ ...s, visible: false }))
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  const prev = () => {
    playClick()
    if (isSoundEnabled()) playWhoosh('prev')
    setCurrent(c => Math.max(0, c - 1))
  }
  const next = () => {
    playClick()
    if (isSoundEnabled()) playWhoosh('next')
    setCurrent(c => Math.min(total - 1, c + 1))
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (demoOpen) { if (e.key === 'Escape') setDemoOpen(false); return }
      if (e.key === 'ArrowRight') { if (isSoundEnabled()) playWhoosh('next'); next() }
      if (e.key === 'ArrowLeft')  { if (isSoundEnabled()) playWhoosh('prev'); prev() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [demoOpen, current])

  const openDemo = () => {
    setDemoLoading(true)
    setDemoDevice('desktop')
    setDemoOpen(true)
    setTimeout(() => setDemoLoading(false), 900)
  }

  const light = isLight(proj.visualBg)

  return (
    <>
      {/* ── REEL ── */}
      <div style={{ borderRadius: 20, overflow: 'hidden', marginTop: '6rem', border: '1px solid rgba(26,20,16,.08)', position: 'relative' }}>

        {/* Big faded counter */}
        <div className="reel-counter" style={{
          position: 'absolute', top: 24, right: 36, zIndex: 5,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 64, fontWeight: 900, lineHeight: 1,
          color: 'rgba(26,20,16,.06)', letterSpacing: -2,
          userSelect: 'none', pointerEvents: 'none',
        }}>
          <span style={{ color: 'rgba(232,82,42,.18)' }}>{String(current + 1).padStart(2, '0')}</span>
          <span style={{ fontSize: 40 }}> / {String(total).padStart(2, '0')}</span>
        </div>

        {/* Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ display: 'grid', gridTemplateColumns: '42% 58%', minHeight: 500 }}
            className="reel-slide"
          >
            {/* LEFT — info */}
            <div className="reel-info-panel" style={{ background: current % 2 === 0 ? 'var(--bg)' : '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.15em', color: 'var(--accent)' }}>
                  [{proj.num}]
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.12em', color: '#999', textTransform: 'uppercase' }}>
                  {t(`work.types.${proj.typeKey}`)}
                </span>
              </div>

              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 10 }}>
                  {t(`work.${proj.slug}.client`)}
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(44px, 4.5vw, 68px)', fontWeight: 900, color: 'var(--ink)', letterSpacing: -2, lineHeight: .92, margin: '0 0 18px' }}>
                  {t(`work.${proj.slug}.title`)}
                </h3>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888', lineHeight: 1.8, maxWidth: 320, margin: '0 0 4px' }}>
                  {t(`work.${proj.slug}.desc`)}
                </p>
                <ProjectReactions projectId={proj.slug} />
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 32 }}>
                  {proj.tags.map(tag => (
                    <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '.1em', textTransform: 'uppercase', border: '1px solid rgba(26,20,16,.14)', borderRadius: 999, padding: '4px 10px', color: '#888' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  className="reel-btn-case"
                  onClick={() => navigate(`/work/${proj.slug}`)}
                >
                  {t('work.reel.caseStudy')}
                </button>
                {proj.hasDemo && (
                  <button className="reel-btn-demo" onClick={openDemo}>
                    {t('work.reel.livePreview')}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT — visual */}
            <div ref={visualPanelRef} style={{ background: proj.visualBg, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
              {/* Cursor spotlight */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 2,
                  opacity: panelSpotlight.visible ? 1 : 0,
                  transition: 'opacity .4s ease',
                  background: panelSpotlight.visible
                    ? `radial-gradient(circle 220px at ${panelSpotlight.x}px ${panelSpotlight.y}px, rgba(255,255,255,0.07) 0%, transparent 70%)`
                    : 'none',
                }}
              />
              {/* Wipe in on each slide change */}
              <motion.div
                key={`wipe-${current}`}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
                style={{ position: 'absolute', inset: 0, background: 'var(--accent)', transformOrigin: 'right', zIndex: 3, pointerEvents: 'none' }}
              />

              {/* Image */}
              <TiltCard style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {proj.wrapInPhone && (
                  <div style={{ width: 200, background: '#0a0a0a', borderRadius: 36, padding: 7, border: '2px solid #1a1a1a', boxShadow: '0 40px 80px rgba(0,0,0,.6)', position: 'relative' }}>
                    <div style={{ borderRadius: 29, overflow: 'hidden', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 80, height: 24, background: '#0a0a0a', borderRadius: '0 0 14px 14px', zIndex: 5 }} />
                      <img src={proj.image} alt={projectTitle} style={{ width: '100%', display: 'block' }} />
                    </div>
                  </div>
                )}

                {proj.wrapInBrowser && (
                  <div style={{ width: '90%', filter: 'drop-shadow(0 20px 48px rgba(0,0,0,.35))' }}>
                    <div style={{ background: light ? '#e8edf2' : '#f1f5f9', borderRadius: '10px 10px 0 0', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, border: '1px solid rgba(0,0,0,.1)', borderBottom: 'none' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
                      <div style={{ flex: 1, background: 'white', borderRadius: 5, padding: '3px 10px', fontSize: 9, color: '#888', border: '1px solid rgba(0,0,0,.1)', fontFamily: 'monospace', marginLeft: 6 }}>
                        {proj.browserUrl}
                      </div>
                    </div>
                    <div style={{ borderRadius: '0 0 10px 10px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.1)', borderTop: 'none' }}>
                      <img src={proj.image} alt={projectTitle} style={{ width: '100%', display: 'block', maxHeight: 300, objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                  </div>
                )}

                {!proj.wrapInPhone && !proj.wrapInBrowser && (
                  <img
                    src={proj.image}
                    alt={projectTitle}
                    style={{ width: '55%', filter: 'drop-shadow(0 32px 56px rgba(232,82,42,.3))', animation: 'floatDevice 3s ease-in-out infinite' }}
                  />
                )}
              </TiltCard>

              {/* Year */}
              <div style={{ position: 'absolute', bottom: 14, right: 16, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.15em', color: light ? 'rgba(26,20,16,.25)' : 'rgba(255,255,255,.2)', zIndex: 4 }}>
                {proj.year}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── BOTTOM NAV ── */}
        <div className="reel-bottom-nav" style={{ padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(26,20,16,.08)', background: 'var(--bg)' }}>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 28 : 8, height: 8, borderRadius: 4,
                  background: i === current ? 'var(--accent)' : 'rgba(26,20,16,.12)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all .35s cubic-bezier(.76,0,.24,1)',
                }}
              />
            ))}
          </div>

          <span className="reel-navigate-hint" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.12em', color: 'rgba(26,20,16,.22)' }}>
            {t('work.reel.navigate')}
          </span>

          {/* Arrows */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ label: '←', action: prev, disabled: current === 0 }, { label: '→', action: next, disabled: current === total - 1 }].map(({ label, action, disabled }) => (
              <button
                key={label}
                onClick={action}
                disabled={disabled}
                className={`reel-arrow${disabled ? ' disabled' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── LIVE PREVIEW MODAL ── */}
      <AnimatePresence>
        {demoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => { if (e.target === e.currentTarget) setDemoOpen(false) }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(26,20,16,.8)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(12px, 4vw, 40px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              style={{ width: '100%', maxWidth: 1000, background: '#2C2C2E', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '85vh', boxShadow: '0 60px 120px rgba(0,0,0,.6)' }}
            >
              {/* Tab */}
              <div style={{ background: '#2C2C2E', padding: '0 16px', display: 'flex', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6, background: '#3A3A3C', borderRadius: '6px 6px 0 0', fontSize: 10, color: 'rgba(255,255,255,.7)', fontFamily: "'JetBrains Mono', monospace", borderBottom: `2px solid ${proj.accentColor}`, marginBottom: -1 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: proj.accentColor }} />
                  {t(`work.${proj.slug}.title`)}
                </div>
              </div>

              {/* Chrome */}
              <div style={{ background: '#3A3A3C', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div onClick={() => setDemoOpen(false)} style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', cursor: 'pointer' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
                </div>
                <div style={{ flex: 1, background: '#1C1C1E', borderRadius: 8, padding: '6px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: '#28C840', fontSize: 11 }}>🔒</span>
                  <span style={{ color: '#E8E8E8', fontSize: 11, fontFamily: 'monospace' }}>
                    {proj.demoUrl ?? `${proj.id}.preview`}
                  </span>
                </div>
                {(proj.demoUrl || proj.wrapInPhone) && (
                  <div style={{ display: 'flex', gap: 4 }}>
                    {(['desktop', 'phone'] as const).map((d) => (
                      <button key={d} onClick={() => setDemoDevice(d)} style={{ background: demoDevice === d ? 'rgba(255,255,255,.1)' : 'transparent', border: 'none', color: demoDevice === d ? 'white' : 'rgba(255,255,255,.3)', borderRadius: 4, padding: '4px 8px', cursor: 'pointer', fontSize: 14 }}>
                        {d === 'desktop' ? '🖥' : '📱'}
                      </button>
                    ))}
                  </div>
                )}
                <button onClick={() => setDemoOpen(false)} style={{ background: 'rgba(255,255,255,.06)', border: 'none', color: 'rgba(255,255,255,.4)', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '.05em' }}>{t('work.reel.close')}</button>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minHeight: 520, position: 'relative', background: '#1C1C1E', overflow: 'hidden' }}>
                {demoLoading && (
                  <div style={{ position: 'absolute', inset: 0, background: '#1C1C1E', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, zIndex: 10 }}>
                    <svg width="36" height="36" viewBox="0 0 96 96" style={{ animation: 'modalSpin .8s linear infinite' }}>
                      <circle cx="48" cy="48" r="46" fill="#E8522A"/>
                      <circle cx="48" cy="48" r="28" fill="#1A1410"/>
                      <rect x="48" y="2" width="48" height="46" fill="#1A1410"/>
                      <rect x="48" y="48" width="48" height="46" fill="#1A1410"/>
                      <circle cx="48" cy="20" r="9" fill="#F5F0E8"/>
                      <circle cx="48" cy="20" r="4" fill="#E8522A"/>
                    </svg>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: '.15em', fontFamily: 'monospace' }}>{t('work.reel.loadingPreview')}</span>
                  </div>
                )}

                {demoDevice === 'phone' ? (
                  <div style={{ width: '100%', height: '100%', minHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1C1C1E' }}>
                    <div style={{ background: '#0a0a0a', borderRadius: 44, padding: 8, border: '5px solid #0a0a0a', boxShadow: '0 40px 100px rgba(0,0,0,.8), inset 0 0 0 1px #333' }}>
                      <div style={{ borderRadius: 36, overflow: 'hidden', position: 'relative', width: 264 }}>
                        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 100, height: 28, background: '#0a0a0a', borderRadius: '0 0 18px 18px', zIndex: 10 }} />
                        {proj.demoUrl
                          ? <iframe src={proj.demoUrl} style={{ width: 375, height: 812, border: 'none', transform: 'scale(.704)', transformOrigin: 'top left', display: 'block' }} title={projectTitle} allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
                          : <img src={proj.image} style={{ width: '100%', display: 'block' }} alt={projectTitle} />
                        }
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ width: '100%', height: '100%', minHeight: 520 }}>
                    {proj.demoUrl ? (
                      <iframe src={proj.demoUrl} style={{ width: '100%', height: '100%', minHeight: 520, border: 'none', display: 'block' }} title={projectTitle} allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
                    ) : proj.wrapInPhone ? (
                      <div style={{ width: '100%', height: '100%', minHeight: 520, background: proj.visualBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ background: '#0a0a0a', borderRadius: 36, padding: 6, border: '2px solid #1a1a1a', boxShadow: '0 40px 80px rgba(0,0,0,.6)' }}>
                          <div style={{ borderRadius: 30, overflow: 'hidden', width: 220 }}>
                            <img src={proj.image} style={{ width: '100%', display: 'block' }} alt={projectTitle} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ width: '100%', height: '100%', minHeight: 520, background: proj.visualBg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                        <img src={proj.image} style={{ width: '100%', maxWidth: 700, borderRadius: 10, boxShadow: '0 24px 64px rgba(0,0,0,.5)', display: 'block' }} alt={projectTitle} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
