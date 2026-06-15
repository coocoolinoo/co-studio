import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import portrait from '../assets/DA-Foto.jpg'
import Footer from '../components/Footer'
import HtmlText from '../components/HtmlText'
import Navbar from '../components/Navbar'
import PageContainer from '../components/PageContainer'
import PageRoute from '../components/PageRoute'
import PageTransition from '../components/PageTransition'
import ReadingTime from '../components/ReadingTime'
import SEO from '../components/SEO'
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


const STACK_CATEGORIES = [
  {
    label: 'WEB',
    items: ['React', 'Angular', 'WordPress', 'TypeScript', 'Vite', 'Node.js', 'SQL', 'Docker', 'Python'],
  },
  {
    label: 'MOBILE',
    items: ['Swift', 'SwiftUI', 'Expo', 'React Native', 'Ionic', 'Java'],
  },
  {
    label: 'DESIGN',
    items: ['Figma', 'Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro'],
  },
  {
    label: 'TOOLS',
    items: ['Git', 'C++', 'Tauri', 'Rust', 'Raspberry Pi', 'Linux'],
  },
]

const ACCENT_ITEMS = new Set(['React', 'Swift', 'WordPress', 'Figma', 'C++'])

const FOCUS_KEYS = [
  { Icon: LineIcon, key: 'web' as const },
  { Icon: CrossIcon, key: 'app' as const },
  { Icon: ArcIcon, key: 'design' as const },
  { Icon: FrameIcon, key: 'media' as const },
]

const STORY_KEYS = ['p1', 'p2', 'p3', 'p4'] as const

const paragraphReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

function StackGrid() {
  return (
    <FadeUp>
      <TiltCard className="float-card">
        <p className="about-section-label font-mono text-xs tracking-[0.2em] text-near-black uppercase">
          [ STACK ]
        </p>
        <div className="mt-8 flex flex-col gap-6">
          {STACK_CATEGORIES.map((cat, ci) => (
            <div key={cat.label} className="flex flex-col gap-3 sm:flex-row sm:gap-8">
              <span
                className="w-20 shrink-0 font-mono text-[10px] tracking-[0.2em] text-near-black/35 uppercase pt-[3px]"
              >
                {cat.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, ii) => {
                  const isAccent = ACCENT_ITEMS.has(item)
                  return (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{
                        duration: 0.3,
                        delay: ci * 0.06 + ii * 0.04,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        fontSize: '0.7rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: '0.06em',
                        background: isAccent ? '#E8522A' : 'transparent',
                        color: isAccent ? '#F5F0E8' : '#1A1410',
                        border: isAccent ? '1.5px solid #E8522A' : '1.5px solid rgba(26,20,16,0.18)',
                        fontWeight: isAccent ? 600 : 400,
                      }}
                    >
                      {item}
                    </motion.span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </TiltCard>
    </FadeUp>
  )
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


export default function About() {
  const storyRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const aboutText = ['bio', 'p1', 'p2', 'p3', 'p4']
    .map(k => t(`about_page.${k}`))
    .join(' ')

  return (
    <PageTransition>
      <PageRoute>
        <SEO
          titleKey="seo.aboutTitle"
          descriptionKey="seo.aboutDescription"
          url="https://www.co-studio.at/about"
        />
        <Navbar />
        <main id="main-content" className="about-page-main bg-off-white pt-28">
          <PageContainer className="pb-4">
            <motion.div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0 24px',
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
              <Logo variant="secondary-light" size={32} />
              <span
                className="font-mono text-[0.75rem] tracking-[0.1em] text-[#888] tabular-nums"
                aria-label="2026"
              >
                <AnimatedNumber value={2026} pad={4} duration={1.4} />
              </span>
            </motion.div>

            <motion.div
              style={{ padding: '0 0 16px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: easeEditorial }}
            >
              <ReadingTime text={aboutText} />
            </motion.div>

            <AboutMarqueeHeader />
          </PageContainer>

          <PageContainer className="section-spacing !pt-12 !pb-0">
            <FadeUp>
              <TiltCard className="float-card">
                <p className="about-section-label border-b border-black/10 pb-4 font-mono text-xs tracking-[0.2em] text-near-black uppercase">
                  <ScrambleText i18nKey="about_page.nutshell" />
                </p>
                <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
                  <div className="flex-1">
                    <HtmlText
                      i18nKey="about_page.bio"
                      className="about-bio block text-near-black"
                    />
                    <ProfileActions className="mt-8 border-t border-black/10 pt-8" />
                  </div>
                  <motion.div
                    className="w-full shrink-0 md:w-52"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7, ease: easeEditorial }}
                  >
                    <img
                      src={portrait}
                      alt="Corneliu Secrieri"
                      style={{
                        width: '100%',
                        borderRadius: 14,
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        aspectRatio: '3 / 4',
                        display: 'block',
                        border: '1px solid rgba(26,20,16,0.08)',
                      }}
                    />
                  </motion.div>
                </div>
              </TiltCard>
            </FadeUp>
          </PageContainer>

          <PageContainer className="section-spacing">
            <div ref={storyRef} className="flex flex-col gap-12 lg:flex-row lg:gap-16">
              <div className="lg:sticky lg:top-32 lg:w-[40%] lg:self-start">
                <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold uppercase leading-tight tracking-tight text-near-black">
                  <ScrambleText i18nKey="about_page.deeper" />
                </h1>
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

          <PageContainer className="about-page-stack section-spacing !pt-0">
            <StackGrid />
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

        </main>
        <Footer />
      </PageRoute>
    </PageTransition>
  )
}
