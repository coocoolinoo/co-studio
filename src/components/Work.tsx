import { useRef, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import FadeUp from './FadeUp'
import PageContainer from './PageContainer'
import TiltCard from './TiltCard'
import { useScrambledString } from '../hooks/useScrambledString'
import { WorkMarqueeRow } from '../lib/workMarqueeText'
import ScrambleText from './ScrambleText'
import SectionCounter from './SectionCounter'
import AnimatedNumber from './AnimatedNumber'
import { HOME_SECTION_TOTAL } from '../lib/site'
import { PROJECTS_META } from '../lib/projects'

function WorkScrollHeader({
  sectionRef,
  title,
}: {
  sectionRef: RefObject<HTMLElement | null>
  title: string
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-10%', '5%'])
  const row = `${title} * ${title} * ${title} * ${title} * ${title} * ${title} * ${title} * ${title} * `

  return (
    <div className="work-scroll-header relative overflow-hidden py-2">
      <motion.div
        style={{ x: x1 }}
        className="work-row-dark font-display font-black uppercase leading-[0.9] tracking-tight text-near-black whitespace-nowrap"
      >
        <WorkMarqueeRow text={row.repeat(4)} />
      </motion.div>
      <motion.div
        style={{ x: x2 }}
        className="work-row-gray mt-1 ml-[120px] font-display font-black uppercase leading-[0.9] tracking-tight whitespace-nowrap text-[#cccccc] md:ml-[200px]"
      >
        <WorkMarqueeRow text={row.repeat(4)} />
      </motion.div>

      <a
        href="#work-projects"
        className="work-arrow-btn absolute top-1/2 right-0 z-10 flex h-[70px] w-[70px] -translate-y-1/2 items-center justify-center text-[1.2rem]"
        data-cursor-hover
        aria-label="View projects"
      >
        ►
      </a>
    </div>
  )
}

function MockupStack() {
  return (
    <div className="relative z-0 flex h-full min-h-[320px] items-center justify-center p-10">
      <div
        className="mockup-shape absolute aspect-[9/16] w-[88px] bg-[#2a2a2a] md:w-[100px]"
        style={{ transform: 'rotate(-5deg) translate(-48px, 8px)' }}
      />
      <div
        className="mockup-shape absolute aspect-video w-[140px] bg-[#333333] md:w-[160px]"
        style={{ transform: 'rotate(3deg) translate(12px, -12px)' }}
      />
      <div
        className="mockup-shape absolute aspect-[9/16] w-[76px] bg-[#3d3d3d] md:w-[88px]"
        style={{ transform: 'rotate(-2deg) translate(56px, 16px)' }}
      />
    </div>
  )
}

function ProjectCard({
  index,
  slug,
  clientKey,
  titleKey,
  descKey,
  viewCaseKey,
  image,
}: {
  index: number
  slug: string
  clientKey: string
  titleKey: string
  descKey: string
  viewCaseKey: string
  image?: string
}) {
  return (
    <TiltCard className="project-card flex min-h-[420px] overflow-hidden rounded-2xl bg-white shadow-[0_4px_40px_rgba(0,0,0,0.08)] md:min-h-[480px]">
      <div className="flex w-full flex-col md:flex-row">
        <motion.div className="flex w-full flex-col justify-center md:w-[40%]" style={{ padding: '48px' }}>
          <span className="project-index font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
            [<AnimatedNumber value={index} pad={2} duration={0.85} />]
          </span>
          <span className="mt-2 font-mono text-[10px] tracking-[0.2em] text-near-black/45 uppercase">
            <ScrambleText i18nKey={clientKey} />
          </span>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-near-black md:text-4xl">
            <ScrambleText i18nKey={titleKey} />
          </h3>
          <p className="mt-4 max-w-sm font-mono text-sm leading-relaxed text-near-black/60">
            <ScrambleText i18nKey={descKey} />
          </p>
          <Link to={`/work/${slug}`} className="nav-link mt-8 w-fit" data-cursor-hover>
            <ScrambleText i18nKey={viewCaseKey} />
          </Link>
        </motion.div>
        <motion.div
          className="work-card-dark relative w-full overflow-hidden bg-[#1a1a1a] md:w-[60%] md:rounded-r-2xl"
          initial={false}
          whileHover="hover"
        >
          <motion.div
            className="wipe-overlay pointer-events-none absolute inset-0 z-10"
            variants={{
              rest: { scaleX: 1 },
              hover: {
                scaleX: 0,
                transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
              },
            }}
            style={{ transformOrigin: 'right', background: 'var(--accent)' }}
          />
          {image ? (
            <div className="flex h-full min-h-[280px] items-center justify-center overflow-hidden">
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover object-top"
                draggable={false}
              />
            </div>
          ) : (
            <MockupStack />
          )}
        </motion.div>
      </div>
    </TiltCard>
  )
}

export default function Work() {
  const { t } = useTranslation()
  const workTitle = useScrambledString(t('work.title'), 380)
  const workSectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={workSectionRef} id="work" className="section-spacing">
      <PageContainer>
        <FadeUp>
          <TiltCard className="float-card work-header-card relative overflow-hidden">
            <SectionCounter
              index={2}
              total={HOME_SECTION_TOTAL}
              className="section-label section-label--counter"
            />
            <div className="section-rail section-rail--inset" aria-hidden>
              <span className="section-label section-label--side">{workTitle}</span>
            </div>
            <WorkScrollHeader sectionRef={workSectionRef} title={workTitle} />
          </TiltCard>
        </FadeUp>

        <div id="work-projects" className="mt-10 flex flex-col gap-8 md:mt-12">
          {PROJECTS_META.map(({ slug, image }, index) => (
            <FadeUp key={slug} delay={index * 0.1}>
              <ProjectCard
                index={index + 1}
                slug={slug}
                clientKey={`work.${slug}.client`}
                titleKey={`work.${slug}.title`}
                descKey={`work.${slug}.desc`}
                viewCaseKey="work.viewCase"
                image={image}
              />
            </FadeUp>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
