import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'
import MagneticWrap from '../components/MagneticWrap'
import Navbar from '../components/Navbar'
import PageContainer from '../components/PageContainer'
import PageRoute from '../components/PageRoute'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import ScrambleText from '../components/ScrambleText'
import { easeEditorial } from '../lib/motion'

type PkgData = {
  num: string
  name: string
  price: string
  priceNote: string
  desc: string
  delivery: string
  includes: string[]
  excludes: string[]
}

type AddonData = {
  name: string
  price: string
  per: string
}

const EASE = [0.76, 0, 0.24, 1] as const

export default function Pricing() {
  const { t } = useTranslation()

  const packages = t('pricing.packages', { returnObjects: true }) as PkgData[]
  const addons   = t('pricing.addons',   { returnObjects: true }) as AddonData[]

  const highlights = [false, true, false]

  return (
    <PageTransition>
      <PageRoute>
        <Navbar />
        <main className="bg-off-white pt-28">

          {/* ── HERO ── */}
          <PageContainer className="pb-0">
            <motion.div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0 24px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeEditorial }}
            >
              <MagneticWrap>
                <Link to="/" className="nav-pill nav-link" data-cursor-hover>
                  <ScrambleText i18nKey="pricing.back" />
                </Link>
              </MagneticWrap>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0, ease: easeEditorial }}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.2em', color: '#E8522A', textTransform: 'uppercase', marginBottom: 8 }}
            >
              <ScrambleText i18nKey="pricing.label" />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeEditorial }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(72px, 12vw, 140px)',
                color: '#1A1410',
                letterSpacing: -4,
                lineHeight: 0.88,
                marginBottom: 24,
              }}
            >
              <ScrambleText i18nKey="pricing.headline" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeEditorial }}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#888', letterSpacing: '.06em', marginBottom: 56 }}
            >
              <ScrambleText i18nKey="pricing.sub" />
            </motion.p>
          </PageContainer>

          {/* ── CARDS ── */}
          <PageContainer className="pb-0">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="pricing-grid">
              {packages.map((pkg, i) => {
                const dark = highlights[i]
                return (
                  <Reveal key={pkg.num} delay={i * 0.1} direction="up" distance={48}>
                    <div
                      style={{
                        background: dark ? '#1A1410' : 'white',
                        borderRadius: 20,
                        border: dark ? '1px solid rgba(232,82,42,.2)' : '1px solid rgba(26,20,16,.07)',
                        padding: '36px 32px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0,
                        position: 'relative',
                        transform: dark ? 'scale(1.02)' : 'none',
                        boxShadow: dark ? '0 32px 80px rgba(26,20,16,.25)' : '0 4px 24px rgba(26,20,16,.05)',
                        height: '100%',
                      }}
                    >
                      {/* POPULAR badge */}
                      {dark && (
                        <div style={{
                          position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                          background: '#E8522A', color: 'white',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 8, letterSpacing: '.2em',
                          padding: '4px 14px', borderRadius: 999,
                        }}>
                          {t('pricing.popular')}
                        </div>
                      )}

                      {/* Number */}
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.2em', color: '#E8522A', marginBottom: 16 }}>
                        [{pkg.num}]
                      </div>

                      {/* Name */}
                      <div style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900, fontSize: 40, letterSpacing: -1,
                        color: dark ? '#F5F0E8' : '#1A1410',
                        lineHeight: 1, marginBottom: 4,
                      }}>
                        {pkg.name}
                      </div>

                      {/* Price */}
                      <div style={{ marginBottom: 20 }}>
                        <span style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 900, fontSize: 64, letterSpacing: -2,
                          color: dark ? '#F5F0E8' : '#1A1410', lineHeight: 1,
                        }}>{pkg.price}</span>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10, color: dark ? 'rgba(245,240,232,.4)' : '#999',
                          marginLeft: 8,
                        }}>{pkg.priceNote}</span>
                      </div>

                      <div style={{ height: 1, background: dark ? 'rgba(245,240,232,.08)' : 'rgba(26,20,16,.08)', marginBottom: 20 }} />

                      {/* Description */}
                      <p style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11, lineHeight: 1.8,
                        color: dark ? 'rgba(245,240,232,.55)' : '#888',
                        marginBottom: 24,
                      }}>
                        {pkg.desc}
                      </p>

                      {/* Includes */}
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '.15em', color: '#E8522A', textTransform: 'uppercase', marginBottom: 10 }}>
                        {t('pricing.includedLabel')}
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {pkg.includes.map((item, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: j * 0.05, ease: EASE }}
                            style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}
                          >
                            <span style={{ color: '#E8522A', fontWeight: 700, flexShrink: 0, fontSize: 11 }}>✓</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: dark ? 'rgba(245,240,232,.7)' : '#555', lineHeight: 1.6 }}>{item}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Excludes */}
                      {pkg.excludes.length > 0 && (
                        <>
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '.15em', color: dark ? 'rgba(245,240,232,.2)' : 'rgba(26,20,16,.3)', textTransform: 'uppercase', marginBottom: 10 }}>
                            {t('pricing.excludedLabel')}
                          </div>
                          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                            {pkg.excludes.map((item, j) => (
                              <li key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <span style={{ color: dark ? 'rgba(245,240,232,.2)' : 'rgba(26,20,16,.25)', flexShrink: 0, fontSize: 11 }}>×</span>
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: dark ? 'rgba(245,240,232,.25)' : 'rgba(26,20,16,.3)', lineHeight: 1.6 }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {/* Spacer pushes delivery + CTA to bottom */}
                      <div style={{ flex: 1 }} />

                      {/* Delivery */}
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        border: `1px solid ${dark ? 'rgba(245,240,232,.12)' : 'rgba(26,20,16,.1)'}`,
                        borderRadius: 999, padding: '5px 12px', marginBottom: 20, width: 'fit-content',
                      }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '.1em', color: dark ? 'rgba(245,240,232,.4)' : '#999', textTransform: 'uppercase' }}>
                          {t('pricing.deliveryLabel')}
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: dark ? 'rgba(245,240,232,.7)' : '#555', fontWeight: 700 }}>{pkg.delivery}</span>
                      </div>

                      {/* CTA */}
                      <a
                        href="mailto:secrieri.corneliu@gmail.com"
                        style={{
                          display: 'block', textAlign: 'center',
                          background: dark ? '#E8522A' : 'transparent',
                          border: `1.5px solid ${dark ? '#E8522A' : 'rgba(26,20,16,.2)'}`,
                          borderRadius: 999, padding: '12px 20px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
                          color: dark ? 'white' : '#1A1410',
                          textDecoration: 'none',
                          transition: 'all .2s',
                        }}
                        onMouseEnter={e => {
                          if (!dark) {
                            e.currentTarget.style.background = '#1A1410'
                            e.currentTarget.style.color = '#F5F0E8'
                            e.currentTarget.style.borderColor = '#1A1410'
                          } else {
                            e.currentTarget.style.background = '#c94420'
                          }
                        }}
                        onMouseLeave={e => {
                          if (!dark) {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.color = '#1A1410'
                            e.currentTarget.style.borderColor = 'rgba(26,20,16,.2)'
                          } else {
                            e.currentTarget.style.background = '#E8522A'
                          }
                        }}
                      >
                        {t('pricing.cta')}
                      </a>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </PageContainer>

          {/* ── ADD-ONS ── */}
          <PageContainer className="section-spacing !pt-16">
            <Reveal direction="up" delay={0}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.2em', color: '#E8522A', textTransform: 'uppercase', marginBottom: 24 }}>
                {t('pricing.addonsTitle')}
              </div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }} className="addons-grid">
              {addons.map((addon, i) => (
                <Reveal key={i} delay={i * 0.08} direction="up" distance={32}>
                  <div style={{
                    background: 'white', borderRadius: 16,
                    border: '1px solid rgba(26,20,16,.07)',
                    padding: '24px 20px',
                    boxShadow: '0 2px 12px rgba(26,20,16,.04)',
                  }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#1A1410', fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>
                      {addon.name}
                    </div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#E8522A', letterSpacing: -0.5, lineHeight: 1 }}>
                      {addon.price}
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#aaa', marginTop: 4 }}>
                      {addon.per}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Bottom row — note + custom quote */}
            <Reveal direction="up" delay={0.1} distance={24}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(26,20,16,.07)' }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'rgba(26,20,16,.3)', letterSpacing: '.08em' }}>
                  {t('pricing.note')}
                </p>
                <div style={{
                  background: 'white', borderRadius: 16,
                  border: '1px solid rgba(26,20,16,.07)',
                  padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20,
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#1A1410', fontWeight: 700 }}>
                    {t('pricing.customTitle')}
                  </span>
                  <a
                    href="mailto:secrieri.corneliu@gmail.com"
                    style={{
                      display: 'inline-block',
                      background: '#E8522A', color: 'white',
                      borderRadius: 999, padding: '8px 18px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
                      textDecoration: 'none', transition: 'background .2s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#c94420' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#E8522A' }}
                  >
                    {t('pricing.customCta')}
                  </a>
                </div>
              </div>
            </Reveal>
          </PageContainer>

        </main>
        <Footer />
      </PageRoute>
    </PageTransition>
  )
}
