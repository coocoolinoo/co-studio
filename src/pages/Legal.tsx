import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import HtmlText from '../components/HtmlText'
import Navbar from '../components/Navbar'
import PageContainer from '../components/PageContainer'
import PageRoute from '../components/PageRoute'
import PageTransition from '../components/PageTransition'
import TiltCard from '../components/TiltCard'
import MagneticWrap from '../components/MagneticWrap'
import ScrambleText from '../components/ScrambleText'
import { easeEditorial } from '../lib/motion'

const IMPRESSUM_KEYS = [
  'provider',
  'subject',
  'liability_content',
  'liability_links',
  'copyright',
] as const

const PRIVACY_KEYS = [
  'controller',
  'overview',
  'hosting',
  'contact',
  'cookies',
  'rights',
  'changes',
] as const

type LegalPageProps = {
  variant: 'impressum' | 'privacy'
}

export default function Legal({ variant }: LegalPageProps) {
  const sectionKeys = variant === 'impressum' ? IMPRESSUM_KEYS : PRIVACY_KEYS
  const sectionPrefix =
    variant === 'impressum' ? 'legal.impressum_sections' : 'legal.privacy_sections'

  return (
    <PageTransition>
      <PageRoute>
        <Navbar />
        <main className="bg-off-white pt-28 pb-4">
          <PageContainer>
            <motion.div
              className="mb-10 flex items-center justify-between"
              style={{ padding: '20px 0 40px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeEditorial }}
            >
              <MagneticWrap>
                <Link to="/" className="nav-pill nav-link" data-cursor-hover>
                  <ScrambleText i18nKey="legal.back" />
                </Link>
              </MagneticWrap>
              <span className="font-mono text-xs tracking-[0.15em] text-near-black/50">
                2026
              </span>
            </motion.div>

            <TiltCard className="float-card legal-page-card">
              <p className="font-mono text-[10px] tracking-[0.2em] text-near-black/50 uppercase">
                co-studio
              </p>
              <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] font-black uppercase tracking-tight text-near-black">
                <ScrambleText i18nKey={`legal.${variant}.title`} />
              </h1>
              <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-near-black/60">
                <ScrambleText i18nKey={`legal.${variant}.meta`} />
              </p>

              <motion.div
                className="mt-12 flex flex-col gap-10"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: easeEditorial }}
              >
                {sectionKeys.map((key) => (
                  <section
                    key={key}
                    className="border-t border-black/10 pt-8 first:border-t-0 first:pt-0"
                  >
                    <h2 className="font-display text-xl font-bold uppercase tracking-tight text-near-black">
                      <ScrambleText i18nKey={`${sectionPrefix}.${key}.h`} />
                    </h2>
                    <HtmlText
                      i18nKey={`${sectionPrefix}.${key}.p`}
                      className="legal-section-body mt-4 block max-w-3xl font-mono text-sm leading-relaxed text-near-black/75"
                    />
                  </section>
                ))}
              </motion.div>
            </TiltCard>
          </PageContainer>
        </main>
        <Footer />
      </PageRoute>
    </PageTransition>
  )
}
