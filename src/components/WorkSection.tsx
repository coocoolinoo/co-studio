import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PageContainer from './PageContainer'
import Reveal from './Reveal'
import WorkReel from './WorkReel'

// ─── WorkHeader ───────────────────────────────────────────────────────────────

function WorkHeader() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-12%', '0%'])

  const word1 = t('work.marqueeSolid')
  const word2 = t('work.marqueeOutline')

  const repeat = (word: string, sep: string, count = 8) =>
    Array(count).fill(`${word}${sep}`).join('')

  return (
    <div
      ref={ref}
      className="work-scroll-marquee-wrap"
      style={{
        background: 'white',
        borderRadius: 20,
        margin: '0 16px',
        padding: '32px 0',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(26,20,16,0.07)',
      }}
    >
      {/* [02] label */}
      <div style={{
        position: 'absolute', top: 20, left: 48, zIndex: 2,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9, letterSpacing: '.2em', color: '#E8522A',
      }}>
        [02]
      </div>

      {/* Row 1 — solid, moves LEFT */}
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          style={{
            x: x1,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(72px, 10vw, 120px)',
            color: '#1A1410',
            letterSpacing: -3,
            lineHeight: 0.9,
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }}
        >
          {repeat(word1, ' — ')}
        </motion.div>
      </div>

      {/* Row 2 — outline, moves RIGHT */}
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          style={{
            x: x2,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(72px, 10vw, 120px)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(26,20,16,.14)',
            letterSpacing: -3,
            lineHeight: 0.9,
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }}
        >
          {repeat(word2, '    ')}
        </motion.div>
      </div>
    </div>
  )
}

// ─── WorkSection ──────────────────────────────────────────────────────────────

export default function WorkSection() {
  return (
    <section id="work" className="section-spacing">
      <WorkHeader />

      <PageContainer>
        <Reveal direction="up" distance={60} delay={0.1}>
          <WorkReel />
        </Reveal>
      </PageContainer>
    </section>
  )
}
