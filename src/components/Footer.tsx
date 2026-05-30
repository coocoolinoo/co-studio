import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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

export default function Footer() {
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
        </motion.div>
      </motion.div>

      <motion.div
        className="footer-bottom-bar"
        style={{
          background: '#1A1410',
          padding: '16px 48px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
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
          <VisitorCounter />
          <TimeOnSite />
          <LastUpdated />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <AvailabilityBadge variant="footer" />
          <ViennaClock variant="footer" />
        </div>
      </motion.div>
    </motion.footer>
  )
}
