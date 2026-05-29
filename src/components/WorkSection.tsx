import { useRef, type RefObject } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import FadeUp from './FadeUp'
import PageContainer from './PageContainer'
import TiltCard from './TiltCard'
import { useScrambledString } from '../hooks/useScrambledString'
import { WorkMarqueeRow } from '../lib/workMarqueeText'
import SectionCounter from './SectionCounter'
import { HOME_SECTION_TOTAL } from '../lib/site'
import WorkReel from './WorkReel'

// ─── WorkScrollHeader ─────────────────────────────────────────────────────────

function WorkScrollHeader({ sectionRef, title }: { sectionRef: RefObject<HTMLElement | null>; title: string }) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-10%', '5%'])
  const row = `${title} * ${title} * ${title} * ${title} * ${title} * ${title} * ${title} * ${title} * `

  return (
    <div className="work-scroll-header relative overflow-hidden py-2">
      <motion.div style={{ x: x1 }} className="work-row-dark font-display font-black uppercase leading-[0.9] tracking-tight text-near-black whitespace-nowrap">
        <WorkMarqueeRow text={row.repeat(4)} />
      </motion.div>
      <motion.div style={{ x: x2 }} className="work-row-gray mt-1 ml-[120px] font-display font-black uppercase leading-[0.9] tracking-tight whitespace-nowrap text-[#cccccc] md:ml-[200px]">
        <WorkMarqueeRow text={row.repeat(4)} />
      </motion.div>
    </div>
  )
}

// ─── WorkSection ──────────────────────────────────────────────────────────────

export default function WorkSection() {
  const { t } = useTranslation()
  const workSectionRef = useRef<HTMLElement>(null)
  const workTitle = useScrambledString(t('work.title'), 380)

  return (
    <section ref={workSectionRef} id="work" className="section-spacing">
      {/* Marquee header — unchanged */}
      <PageContainer>
        <FadeUp>
          <TiltCard className="float-card work-header-card relative overflow-hidden">
            <SectionCounter index={2} total={HOME_SECTION_TOTAL} className="section-label section-label--counter" />
            <div className="section-rail section-rail--inset" aria-hidden>
              <span className="section-label section-label--side">{workTitle}</span>
            </div>
            <WorkScrollHeader sectionRef={workSectionRef} title={workTitle} />
          </TiltCard>
        </FadeUp>
      </PageContainer>

      {/* Horizontal reel */}
      <PageContainer>
        <WorkReel />
      </PageContainer>
    </section>
  )
}
