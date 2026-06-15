import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useScrambledString } from '../hooks/useScrambledString'
import { easeEditorial } from '../lib/motion'
import HeroWords from './HeroWords'
import LoopAnimation from './LoopAnimation'
import ProfileActions from './ProfileActions'

function TypewriterText() {
  const { t } = useTranslation()
  const words: string[] = t('hero.typewriter', { returnObjects: true }) as string[]
  const { i18n } = useTranslation()
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing')
  const [charIndex, setCharIndex] = useState(0)

  // Reset when language switches
  useEffect(() => {
    setWordIndex(0)
    setDisplayed('')
    setCharIndex(0)
    setPhase('typing')
  }, [i18n.language])

  useEffect(() => {
    const current = words[wordIndex] ?? ''
    if (phase === 'typing') {
      if (charIndex < current.length) {
        const timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1))
          setCharIndex(c => c + 1)
        }, 55)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => setPhase('pause'), 2200)
        return () => clearTimeout(timer)
      }
    }
    if (phase === 'pause') {
      const timer = setTimeout(() => setPhase('deleting'), 400)
      return () => clearTimeout(timer)
    }
    if (phase === 'deleting') {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1))
          setCharIndex(c => c - 1)
        }, 28)
        return () => clearTimeout(timer)
      } else {
        setWordIndex(i => (i + 1) % words.length)
        setPhase('typing')
      }
    }
  }, [phase, charIndex, wordIndex, words])

  return (
    <span>
      {displayed}
      <span
        style={{
          display: 'inline-block',
          width: '3px',
          height: '0.75em',
          background: '#E8522A',
          marginLeft: '4px',
          verticalAlign: 'middle',
          borderRadius: '1px',
          animation: 'cursorBlink .8s ease-in-out infinite',
        }}
      />
    </span>
  )
}


function getGreetingKey(h: number): string {
  if (h >= 5 && h < 10)  return 'hero.greetings.morning'
  if (h >= 10 && h < 13) return 'hero.greetings.lateMorning'
  if (h >= 13 && h < 18) return 'hero.greetings.afternoon'
  if (h >= 18 && h < 22) return 'hero.greetings.evening'
  return 'hero.greetings.night'
}

const HERO_VIDEO =
  'https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-dark-fluid-4288-large.mp4'

const displayClass =
  'font-display font-black leading-[0.85] tracking-[-0.03em] text-near-black'
const displaySize = { fontSize: 'clamp(5rem, 14vw, 11.25rem)' }

export default function Hero() {
  const { t } = useTranslation()
  const h = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Vienna' })).getHours()
  const intro = useScrambledString(t(getGreetingKey(h)))
  const line1 = useScrambledString(t('hero.line1'), 400)
  const scroll = useScrambledString(t('hero.scroll'), 380)
  const tag = useScrambledString(t('hero.tag'))
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 600], [0, -60])
  const y2 = useTransform(scrollY, [0, 600], [0, -120])
  const scrollOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <video
          className="absolute top-0 left-0 h-full w-full object-cover opacity-[0.15]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="hero-grain absolute inset-0" />
        <div className="absolute inset-0 bg-off-white/85" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-5 pt-28 md:px-8">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 items-center gap-8 pb-8 xl:gap-16">

          {/* LEFT — text content */}
          <div className="flex flex-1 flex-col justify-center">
            <motion.p
              className="mb-6 max-w-xl font-mono text-[11px] leading-relaxed tracking-[0.08em] text-near-black md:text-xs"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeEditorial }}
            >
              {intro}
            </motion.p>

            <motion.div style={{ y: y1 }}>
              <HeroWords
                text={line1}
                className={displayClass}
                style={displaySize}
                baseDelay={0.8}
              />
            </motion.div>

            <motion.div style={{ y: y2 }}>
              <div className={displayClass} style={displaySize}>
                <TypewriterText />
              </div>
            </motion.div>

            <motion.div
              className="mt-10 max-w-3xl"
              style={{ opacity: scrollOpacity }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.65, ease: easeEditorial }}
            >
              <p
                className="font-display font-bold leading-snug tracking-tight text-near-black"
                style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}
              >
                {scroll}
              </p>
            </motion.div>

            <motion.p
              className="hero-subline mt-8 font-mono text-[10px] tracking-[0.18em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {tag}
            </motion.p>

            <ProfileActions className="mt-8" showCv={false} showCalendar={false} />
          </div>

          {/* RIGHT — loop animation, desktop only */}
          <motion.div
            className="loop-animation-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: easeEditorial }}
          >
            <LoopAnimation />
          </motion.div>

        </div>
      </div>

    </section>
  )
}
