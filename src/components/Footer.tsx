import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AvailabilityBadge from './AvailabilityBadge'
import CopyEmail from './CopyEmail'
import LastUpdated from './LastUpdated'
import Logo from './Logo'
import ScrambleText from './ScrambleText'
import ViennaClock from './ViennaClock'
import VisitorCounter from './VisitorCounter'

function TimeOnSite() {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => setSeconds(Math.floor((Date.now() - start) / 1000)), 1000)
    return () => clearInterval(id)
  }, [])
  if (seconds < 30) return null
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  const label = m > 0 ? `You've been here for ${m} min` : `You've been here for ${s}s`
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 8, letterSpacing: '.1em',
      color: 'rgba(245,240,232,.18)', whiteSpace: 'nowrap',
    }}>{label}</span>
  )
}

const SOCIALS = [
  { key: 'email' as const, href: 'mailto:secrieri.corneliu@gmail.com' },
  { key: 'phone' as const, href: 'tel:+436602261011' },
  { key: 'github' as const, href: 'https://github.com/coocoolinoo' },
  { key: 'linkedin' as const, href: 'https://www.linkedin.com/in/corneliu-s-b488a22b6' },
] as const

const STACK = [
  { name: 'React',         icon: '⚛️',  desc: 'UI Framework' },
  { name: 'TypeScript',    icon: '🔷',  desc: 'Type Safety' },
  { name: 'Vite',          icon: '⚡',  desc: 'Build Tool' },
  { name: 'Framer Motion', icon: '🎬',  desc: 'Animations' },
  { name: 'i18next',       icon: '🌍',  desc: 'Translations' },
  { name: 'Tailwind CSS',  icon: '🎨',  desc: 'Styling' },
  { name: 'React Router',  icon: '🔀',  desc: 'Routing' },
  { name: 'EmailJS',       icon: '📧',  desc: 'Contact Form' },
  { name: 'Vercel',        icon: '▲',   desc: 'Hosting' },
]

export default function Footer() {
  const [showStack, setShowStack] = useState(false)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false })

  useEffect(() => {
    const el = bottomBarRef.current
    if (!el) return
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true })
    }
    const handleLeave = () => setSpotlight(s => ({ ...s, visible: false }))
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="footer-split"
      style={{
        margin: '0 40px 40px',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(26,20,16,0.1)',
      }}
    >
      <motion.div className="footer-split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <motion.div style={{ background: '#E8522A', padding: '52px 48px', color: 'white' }}>
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              opacity: 0.7,
              marginBottom: '20px',
              fontFamily: "'JetBrains Mono', monospace",
              textTransform: 'uppercase',
            }}
          >
            <ScrambleText i18nKey="footer.contactLabel" />
          </p>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            <ScrambleText i18nKey="footer.headline1" />
            <br />
            <ScrambleText i18nKey="footer.headline2" />
            <br />
            <ScrambleText i18nKey="footer.headline3" />
          </h2>

          <motion.a
            href="mailto:secrieri.corneliu@gmail.com"
            whileHover={{ scale: 1.03, background: 'rgba(255,255,255,0.15)' }}
            transition={{ duration: 0.2 }}
            data-cursor-hover
            style={{
              display: 'inline-block',
              marginTop: '32px',
              border: '1.5px solid rgba(255,255,255,0.6)',
              borderRadius: '999px',
              padding: '12px 24px',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              color: 'white',
              textDecoration: 'none',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <CopyEmail style={{ color: 'inherit' }}>secrieri.corneliu@gmail.com →</CopyEmail>
          </motion.a>
        </motion.div>

        <motion.div
          style={{
            background: '#ffffff',
            padding: '52px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.key}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ x: 6 }}
                data-cursor-hover
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(26,20,16,0.08)',
                  textDecoration: 'none',
                  color: '#1A1410',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.95rem',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#E8522A'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1A1410'
                }}
              >
                <span>
                  <ScrambleText i18nKey={`contact.${s.key}`} />
                </span>
                <span style={{ color: '#E8522A', fontSize: '1.1rem' }}>→</span>
              </motion.a>
            ))}
          </nav>

          <p
            style={{
              fontSize: '0.75rem',
              color: '#888',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.08em',
              marginTop: '32px',
            }}
          >
            <ScrambleText i18nKey="footer.location" />
          </p>

          {/* Pricing link — inside white card, above dark bar */}
          <div style={{
            borderTop: '1px solid rgba(26,20,16,.06)',
            paddingTop: 20,
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            <Link
              to="/pricing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: '.12em',
                color: 'rgba(26,20,16,.35)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E8522A' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,20,16,.35)' }}
            >
              <ScrambleText i18nKey="pricing.viewPricing" />
              <span style={{ color: '#E8522A' }}>→</span>
            </Link>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: '.1em',
              color: 'rgba(26,20,16,.2)',
            }}>
              <ScrambleText i18nKey="pricing.startingFrom" />
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        ref={bottomBarRef}
        className="footer-bottom-bar"
        style={{
          background: '#1A1410',
          padding: '16px 48px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px 20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Cursor spotlight */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: spotlight.visible ? 1 : 0,
            transition: 'opacity .4s ease',
            background: spotlight.visible
              ? `radial-gradient(circle 200px at ${spotlight.x}px ${spotlight.y}px, rgba(232,82,42,0.08) 0%, transparent 70%)`
              : 'none',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <Logo variant="dark" showWordmark={false} size={28} />
          <span
            style={{
              fontSize: '0.7rem',
              color: 'rgba(245,240,232,0.35)',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.1em',
            }}
          >
            <ScrambleText i18nKey="footer.copyright" />
          </span>
          <span
            style={{
              display: 'flex',
              gap: '16px',
              fontSize: '0.7rem',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.08em',
            }}
          >
            <Link
              to="/impressum"
              style={{ color: 'rgba(245,240,232,0.45)', textDecoration: 'none' }}
              className="footer-legal-link"
              data-cursor-hover
            >
              <ScrambleText i18nKey="footer.impressum" />
            </Link>
            <span style={{ color: 'rgba(245,240,232,0.2)' }}>·</span>
            <Link
              to="/datenschutz"
              style={{ color: 'rgba(245,240,232,0.45)', textDecoration: 'none' }}
              className="footer-legal-link"
              data-cursor-hover
            >
              <ScrambleText i18nKey="footer.privacy" />
            </Link>
          </span>
          {/* Built-with popup */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowStack(s => !s)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem', letterSpacing: '.1em',
                color: 'rgba(245,240,232,.35)',
                padding: 0, transition: 'color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E8522A' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,.35)' }}
              title="Click to see tech stack"
            >
              Built by Corneliu ツ
            </button>

            <AnimatePresence>
              {showStack && (
                <>
                  <div onClick={() => setShowStack(false)} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{
                      position: 'absolute',
                      bottom: '100%', left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: 12,
                      background: 'white', borderRadius: 16,
                      padding: '20px 24px',
                      boxShadow: '0 24px 64px rgba(26,20,16,.2)',
                      border: '1px solid rgba(26,20,16,.06)',
                      zIndex: 999, minWidth: 280,
                    }}
                  >
                    <div style={{
                      position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
                      width: 12, height: 12, background: 'white',
                      borderRight: '1px solid rgba(26,20,16,.06)',
                      borderBottom: '1px solid rgba(26,20,16,.06)',
                      rotate: '45deg',
                    }} />
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '.2em', color: '#888', textTransform: 'uppercase', marginBottom: 14 }}>
                      Built with
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                      {STACK.map(item => (
                        <div key={item.name} style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                          padding: '10px 8px', background: '#F5F0E8', borderRadius: 10, textAlign: 'center',
                        }}>
                          <span style={{ fontSize: 18 }}>{item.icon}</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: '#1A1410' }}>{item.name}</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, color: '#888' }}>{item.desc}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{
                      marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(26,20,16,.06)',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 8, color: '#888', textAlign: 'center', letterSpacing: '.05em',
                    }}>
                      co-studio.at · Vienna · 2026
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <VisitorCounter />
          <TimeOnSite />
          <LastUpdated />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative', zIndex: 1 }}>
          <AvailabilityBadge variant="footer" />
          <ViennaClock variant="footer" />
        </div>
      </motion.div>
    </motion.footer>
  )
}
