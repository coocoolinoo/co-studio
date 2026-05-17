import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ClientTicker from './ClientTicker'
import FadeUp from './FadeUp'
import HtmlText from './HtmlText'
import { useScrambledString } from '../hooks/useScrambledString'
import PageContainer from './PageContainer'
import ProfileActions from './ProfileActions'
import SectionCounter from './SectionCounter'
import TiltCard from './TiltCard'
import { HOME_SECTION_TOTAL } from '../lib/site'
import { easeEditorial } from '../lib/motion'

export default function About() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const teaserLabel = useScrambledString(
    (expanded ? t('about.labelCollapsed') : t('about.label')).replace(/^\[[^\]]+\]\s*/, ''),
  )

  return (
    <section id="about" className="section-spacing about-section">
      <PageContainer className="about-section__card">
        <FadeUp>
          <TiltCard className="float-card about-card relative">
            <div className="section-rail" aria-hidden>
              <span className="section-label section-label--side">ABOUT</span>
            </div>

            <SectionCounter
              index={1}
              total={HOME_SECTION_TOTAL}
              className="section-label section-label--counter"
            />

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="about-teaser flex w-full items-center gap-2 pb-5 font-mono text-xs tracking-[0.12em] text-near-black uppercase"
              data-cursor-hover
              aria-expanded={expanded}
            >
              <span className="about-bracket inline-block w-8">
                {expanded ? '[ − ]' : '[ + ]'}
              </span>
              {teaserLabel}
            </button>

            <HtmlText i18nKey="about.bio1" className="about-bio max-w-3xl text-near-black" />

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: easeEditorial }}
                  className="overflow-hidden"
                >
                  <HtmlText
                    i18nKey="about.bio2"
                    className="about-bio mt-6 max-w-3xl text-near-black/75"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <ProfileActions className="mt-8 border-t border-black/10 pt-8" />
          </TiltCard>
        </FadeUp>
      </PageContainer>

      <ClientTicker className="about-section__ticker" />
    </section>
  )
}
