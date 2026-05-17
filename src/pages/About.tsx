import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import Footer from '../components/Footer'
import HtmlText from '../components/HtmlText'
import Navbar from '../components/Navbar'
import PageContainer from '../components/PageContainer'
import PageRoute from '../components/PageRoute'
import PageTransition from '../components/PageTransition'
import TiltCard from '../components/TiltCard'
import FadeUp from '../components/FadeUp'
import Logo from '../components/Logo'
import MagneticWrap from '../components/MagneticWrap'
import ScrambleText from '../components/ScrambleText'
import { useScrambledString } from '../hooks/useScrambledString'
import { ArcIcon, CrossIcon, FrameIcon, LineIcon } from '../components/ServiceIcons'
import AnimatedNumber from '../components/AnimatedNumber'
import ProfileActions from '../components/ProfileActions'
import { easeEditorial } from '../lib/motion'

const PHOTO_COLORS = ['#bbbbbb', '#aaaaaa', '#cccccc', '#dddddd', '#b8b8b8']

const FOCUS_KEYS = [
  { Icon: LineIcon, key: 'web' as const },
  { Icon: CrossIcon, key: 'app' as const },
  { Icon: ArcIcon, key: 'design' as const },
  { Icon: FrameIcon, key: 'media' as const },
]

const EXP_KEYS = ['exp1', 'exp2', 'exp3'] as const

const STORY_KEYS = ['p1', 'p2', 'p3', 'p4'] as const

const paragraphReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const experienceContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const experienceRow = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeEditorial } },
}

function AboutMarqueeHeader() {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const x1 = useTransform(scrollY, [0, 500], ['0%', '-10%'])
  const x2 = useTransform(scrollY, [0, 500], ['-8%', '4%'])
  const about = useScrambledString(t('nav.about').toUpperCase(), 360)
  const rowSolid = `${about} * ${about} * ${about} * ${about} * `
  const rowOutline = `*${about} *${about} *${about} *`

  return (
    <FadeUp>
      <TiltCard className="float-card about-marquee-card relative overflow-hidden py-10">
        <span className="absolute top-6 left-8 font-mono text-[10px] tracking-[0.15em] text-near-black/50 uppercase md:left-10">
          <ScrambleText i18nKey="about_page.info" />
        </span>
        <span className="absolute top-6 right-8 font-mono text-[10px] tracking-[0.15em] text-near-black/50 md:right-10">
          2026
        </span>

        <div className="about-marquee-rows mt-8 overflow-hidden">
          <motion.div
            style={{ x: x1 }}
            className="about-marquee-solid font-display font-black uppercase leading-[0.9] tracking-tight text-near-black whitespace-nowrap"
          >
            {rowSolid.repeat(2)}
          </motion.div>
          <motion.div
            style={{ x: x2 }}
            className="about-marquee-outline mt-2 font-display font-black uppercase leading-[0.9] tracking-tight whitespace-nowrap"
          >
            {rowOutline.repeat(2)}
          </motion.div>
        </div>
      </TiltCard>
    </FadeUp>
  )
}

function PhotoStrip() {
  const renderPhotos = (prefix: string) =>
    PHOTO_COLORS.map((color) => (
      <div
        key={`${prefix}-${color}`}
        className="h-[220px] w-[160px] shrink-0 rounded-lg"
        style={{ backgroundColor: color }}
      />
    ))

  return (
    <div className="photo-strip -mx-4 mt-10 overflow-hidden md:-mx-0">
      <div className="photo-strip-track flex gap-4 px-4">
        {renderPhotos('a')}
        {renderPhotos('b')}
      </div>
    </div>
  )
}

export default function About() {
  const storyRef = useRef<HTMLDivElement>(null)

  return (
    <PageTransition>
      <PageRoute>
        <Navbar />
        <main className="about-page-main bg-off-white pt-28">
          <PageContainer className="pb-4">
            <motion.div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0 40px',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeEditorial }}
            >
              <MagneticWrap>
                <Link to="/" className="nav-pill nav-link" data-cursor-hover>
                  <ScrambleText i18nKey="about_page.back" />
                </Link>
              </MagneticWrap>
              <Logo variant="light" showWordmark={false} size={32} />
              <span
                className="font-mono text-[0.75rem] tracking-[0.1em] text-[#888] tabular-nums"
                aria-label="2026"
              >
                <AnimatedNumber value={2026} pad={4} duration={1.4} />
              </span>
            </motion.div>

            <AboutMarqueeHeader />
          </PageContainer>

          <PageContainer className="section-spacing !pt-12 !pb-0">
            <FadeUp>
              <TiltCard className="float-card">
                <p className="about-section-label border-b border-black/10 pb-4 font-mono text-xs tracking-[0.2em] text-near-black uppercase">
                  <ScrambleText i18nKey="about_page.nutshell" />
                </p>
                <HtmlText
                  i18nKey="about_page.bio"
                  className="about-bio mt-8 block max-w-4xl text-near-black"
                />
                <ProfileActions className="mt-8 border-t border-black/10 pt-8" />
                <PhotoStrip />
              </TiltCard>
            </FadeUp>
          </PageContainer>

          <PageContainer className="section-spacing">
            <div ref={storyRef} className="flex flex-col gap-12 lg:flex-row lg:gap-16">
              <div className="lg:sticky lg:top-32 lg:w-[40%] lg:self-start">
                <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold uppercase leading-tight tracking-tight text-near-black">
                  <ScrambleText i18nKey="about_page.deeper" />
                </h2>
              </div>
              <div className="flex flex-col gap-8 lg:w-[60%]">
                {STORY_KEYS.map((key) => (
                  <motion.div
                    key={key}
                    className="about-story-text text-near-black"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={paragraphReveal}
                    transition={{ duration: 0.6, ease: easeEditorial }}
                  >
                    <HtmlText i18nKey={`about_page.${key}`} className="block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </PageContainer>

          <PageContainer className="about-page-focus !pt-0">
            <FadeUp>
              <TiltCard className="float-card">
                <p className="about-section-label font-mono text-xs tracking-[0.2em] text-near-black uppercase">
                  <ScrambleText i18nKey="about_page.focus" />
                </p>
                <div className="services-grid services-stack services-stack--card mt-10">
                  {FOCUS_KEYS.map(({ Icon, key }, i) => (
                    <FadeUp key={key} delay={i * 0.1}>
                      <article className="service-col flex flex-col gap-6 py-8 md:flex-row md:items-start md:gap-10 md:py-10">
                        <div className="service-col-icon shrink-0" aria-hidden>
                          <Icon />
                        </div>
                        <div className="service-col-body flex min-w-0 flex-1 flex-col">
                        <h3 className="service-heading font-display font-bold uppercase tracking-tight text-near-black">
                          <ScrambleText i18nKey={`services.${key}.title`} />
                        </h3>
                        <p className="mt-3 font-mono text-[11px] tracking-wide text-near-black/55 uppercase">
                          <ScrambleText i18nKey={`services.${key}.sub`} />
                        </p>
                          <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-near-black/70">
                            <ScrambleText i18nKey={`services.${key}.desc`} />
                          </p>
                        </div>
                      </article>
                    </FadeUp>
                  ))}
                </div>
              </TiltCard>
            </FadeUp>
          </PageContainer>

          <PageContainer className="about-page-experience section-spacing">
            <FadeUp>
              <TiltCard className="float-card">
                <p className="about-section-label font-mono text-xs tracking-[0.2em] text-near-black uppercase">
                  <ScrambleText i18nKey="about_page.experience" />
                </p>
                <motion.ul
                  className="mt-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={experienceContainer}
                >
                  {EXP_KEYS.map((key) => (
                    <motion.li
                      key={key}
                      variants={experienceRow}
                      className="exp-entry experience-row grid grid-cols-1 gap-2 py-6 transition-colors md:grid-cols-[140px_1fr] md:gap-8"
                    >
                      <span className="exp-year experience-year font-mono text-xs">
                        <ScrambleText i18nKey={`about_page.${key}.year`} />
                      </span>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="text-[1.4rem] font-bold text-near-black">
                            <ScrambleText i18nKey={`about_page.${key}.company`} />
                          </span>
                          <span className="font-mono text-xs text-near-black/60">
                            <ScrambleText i18nKey={`about_page.${key}.role`} />
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                          <ScrambleText i18nKey={`about_page.${key}.desc`} />
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </TiltCard>
            </FadeUp>
          </PageContainer>

        </main>
        <Footer />
      </PageRoute>
    </PageTransition>
  )
}
