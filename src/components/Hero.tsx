import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useScrambledString } from '../hooks/useScrambledString'
import { easeEditorial } from '../lib/motion'
import HeroWords from './HeroWords'
import LoopAnimation from './LoopAnimation'
import ProfileActions from './ProfileActions'

const HERO_VIDEO =
  'https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-dark-fluid-4288-large.mp4'

const displayClass =
  'font-display font-black leading-[0.85] tracking-[-0.03em] text-near-black'
const displaySize = { fontSize: 'clamp(5rem, 14vw, 11.25rem)' }

export default function Hero() {
  const { t } = useTranslation()
  const intro = useScrambledString(t('hero.intro'))
  const line1 = useScrambledString(t('hero.line1'), 400)
  const line2 = useScrambledString(t('hero.line2'), 400)
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
              <HeroWords
                text={line2}
                className={displayClass}
                style={displaySize}
                baseDelay={1}
              />
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
