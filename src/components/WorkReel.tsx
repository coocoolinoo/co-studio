import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 'pifx',
    slug: 'pifx',
    num: '01',
    client: 'HTL DIPLOMARBEIT',
    title: 'πf(x)',
    desc: 'Audio-Multi-Effektgerät auf Basis eines Raspberry Pi. Echtzeit-DSP in C++, von der Hardware bis zur Software.',
    tags: ['C++', 'Raspberry Pi', 'DSP', 'Linux', 'Hardware'],
    year: '2026',
    type: 'Hardware · DSP',
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
    client: 'CO.BIBLE',
    title: 'co.bible',
    desc: 'Mobile Bible reader — React Native, offline-first. Suche, Leseplan, Tagesvers und Quiz. Für iOS & Android.',
    tags: ['React Native', 'Expo', 'SQLite', 'Mobile', 'Offline-first'],
    year: '2026',
    type: 'Mobile App',
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
    client: 'CO-STUDIO',
    title: 'Bibelsuche',
    desc: 'Desktop-App für macOS & Windows — Bibelverse blitzschnell über mehrere Übersetzungen suchen.',
    tags: ['Tauri', 'React', 'Rust', 'Desktop', 'SQLite'],
    year: '2026',
    type: 'Desktop App',
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
    client: 'VOLKSSCHULE MANNERSDORF',
    title: 'VS Mannersdorf',
    desc: 'Moderne React-Website für die Volksschule Mannersdorf am Leithagebirge — React + Vite, CSS Modules.',
    tags: ['React', 'Vite', 'CSS Modules', 'Web'],
    year: '2025',
    type: 'Web',
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
    client: 'AL ZEICHENBÜRO',
    title: 'AL Zeichenbüro',
    desc: 'Webauftritt für ein Architekturbüro in Wiener Neustadt — architektonische Zeichnungen & Leistungen.',
    tags: ['React', 'Vite', 'Web', 'Design'],
    year: '2026',
    type: 'Web',
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
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [demoOpen, setDemoOpen] = useState(false)
  const [demoDevice, setDemoDevice] = useState<'desktop' | 'phone'>('desktop')
  const [demoLoading, setDemoLoading] = useState(true)
  const total = projects.length
  const proj = projects[current]

  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(total - 1, c + 1))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (demoOpen) { if (e.key === 'Escape') setDemoOpen(false); return }
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
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
        <div style={{
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
                  {proj.type}
                </span>
              </div>

              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 10 }}>
                  {proj.client}
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(44px, 4.5vw, 68px)', fontWeight: 900, color: 'var(--ink)', letterSpacing: -2, lineHeight: .92, margin: '0 0 18px' }}>
                  {proj.title}
                </h3>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888', lineHeight: 1.8, maxWidth: 320, margin: '0 0 20px' }}>
                  {proj.desc}
                </p>
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
                  CASE STUDY →
                </button>
                {proj.hasDemo && (
                  <button className="reel-btn-demo" onClick={openDemo}>
                    ▶ LIVE PREVIEW
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT — visual */}
            <div style={{ background: proj.visualBg, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
              {/* Wipe in on each slide change */}
              <motion.div
                key={`wipe-${current}`}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
                style={{ position: 'absolute', inset: 0, background: 'var(--accent)', transformOrigin: 'right', zIndex: 3, pointerEvents: 'none' }}
              />

              {/* Image */}
              <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {proj.wrapInPhone && (
                  <div style={{ width: 200, background: '#0a0a0a', borderRadius: 36, padding: 7, border: '2px solid #1a1a1a', boxShadow: '0 40px 80px rgba(0,0,0,.6)', position: 'relative' }}>
                    <div style={{ borderRadius: 29, overflow: 'hidden', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 80, height: 24, background: '#0a0a0a', borderRadius: '0 0 14px 14px', zIndex: 5 }} />
                      <img src={proj.image} alt={proj.title} style={{ width: '100%', display: 'block' }} />
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
                      <img src={proj.image} alt={proj.title} style={{ width: '100%', display: 'block', maxHeight: 300, objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                  </div>
                )}

                {!proj.wrapInPhone && !proj.wrapInBrowser && (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    style={{ width: '55%', filter: 'drop-shadow(0 32px 56px rgba(232,82,42,.3))', animation: 'floatDevice 3s ease-in-out infinite' }}
                  />
                )}
              </div>

              {/* Year */}
              <div style={{ position: 'absolute', bottom: 14, right: 16, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.15em', color: light ? 'rgba(26,20,16,.25)' : 'rgba(255,255,255,.2)', zIndex: 4 }}>
                {proj.year}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── BOTTOM NAV ── */}
        <div style={{ padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(26,20,16,.08)', background: 'var(--bg)' }}>

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

          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.12em', color: 'rgba(26,20,16,.22)' }}>
            ← → NAVIGATE
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
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(26,20,16,.8)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}
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
                  {proj.title}
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
                <button onClick={() => setDemoOpen(false)} style={{ background: 'rgba(255,255,255,.06)', border: 'none', color: 'rgba(255,255,255,.4)', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '.05em' }}>✕ CLOSE</button>
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
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: '.15em', fontFamily: 'monospace' }}>LOADING PREVIEW...</span>
                  </div>
                )}

                {demoDevice === 'phone' ? (
                  <div style={{ width: '100%', height: '100%', minHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1C1C1E' }}>
                    <div style={{ background: '#0a0a0a', borderRadius: 44, padding: 8, border: '5px solid #0a0a0a', boxShadow: '0 40px 100px rgba(0,0,0,.8), inset 0 0 0 1px #333' }}>
                      <div style={{ borderRadius: 36, overflow: 'hidden', position: 'relative', width: 264 }}>
                        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 100, height: 28, background: '#0a0a0a', borderRadius: '0 0 18px 18px', zIndex: 10 }} />
                        {proj.demoUrl
                          ? <iframe src={proj.demoUrl} style={{ width: 375, height: 812, border: 'none', transform: 'scale(.704)', transformOrigin: 'top left', display: 'block' }} title={proj.title} allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
                          : <img src={proj.image} style={{ width: '100%', display: 'block' }} alt={proj.title} />
                        }
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ width: '100%', height: '100%', minHeight: 520 }}>
                    {proj.demoUrl ? (
                      <iframe src={proj.demoUrl} style={{ width: '100%', height: '100%', minHeight: 520, border: 'none', display: 'block' }} title={proj.title} allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
                    ) : proj.wrapInPhone ? (
                      <div style={{ width: '100%', height: '100%', minHeight: 520, background: proj.visualBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ background: '#0a0a0a', borderRadius: 36, padding: 6, border: '2px solid #1a1a1a', boxShadow: '0 40px 80px rgba(0,0,0,.6)' }}>
                          <div style={{ borderRadius: 30, overflow: 'hidden', width: 220 }}>
                            <img src={proj.image} style={{ width: '100%', display: 'block' }} alt={proj.title} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ width: '100%', height: '100%', minHeight: 520, background: proj.visualBg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                        <img src={proj.image} style={{ width: '100%', maxWidth: 700, borderRadius: 10, boxShadow: '0 24px 64px rgba(0,0,0,.5)', display: 'block' }} alt={proj.title} />
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
