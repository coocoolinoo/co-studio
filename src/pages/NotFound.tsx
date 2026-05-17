import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedNumber from '../components/AnimatedNumber'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import MagneticWrap from '../components/MagneticWrap'
import Navbar from '../components/Navbar'
import PageContainer from '../components/PageContainer'
import PageRoute from '../components/PageRoute'
import PageTransition from '../components/PageTransition'
import ScrambleText from '../components/ScrambleText'
import { easeEditorial } from '../lib/motion'

export default function NotFound() {
  return (
    <PageTransition>
      <PageRoute>
        <Navbar />
        <main className="not-found-main bg-off-white pt-28">
          <PageContainer>
            <motion.div
              className="not-found-hero flex min-h-[55vh] flex-col items-center justify-center text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: easeEditorial }}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-near-black/45 uppercase">
                <ScrambleText i18nKey="notFound.label" />
              </p>

              <div
                className="not-found-code mt-6 flex items-baseline justify-center gap-1 font-display font-black tracking-tight text-near-black"
                aria-hidden
              >
                <AnimatedNumber value={4} pad={1} duration={0.7} className="text-[clamp(5rem,18vw,11rem)]" />
                <AnimatedNumber value={0} pad={1} duration={0.85} className="text-[clamp(5rem,18vw,11rem)]" />
                <AnimatedNumber value={4} pad={1} duration={1} className="text-[clamp(5rem,18vw,11rem)] text-accent" />
              </div>

              <h1 className="mt-4 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-bold uppercase tracking-tight text-near-black">
                <ScrambleText i18nKey="notFound.title" />
              </h1>
              <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-near-black/60">
                <ScrambleText i18nKey="notFound.desc" />
              </p>

              <MagneticWrap>
                <Link
                  to="/"
                  className="nav-pill nav-link mt-10"
                  data-cursor-hover
                >
                  <ScrambleText i18nKey="notFound.home" />
                </Link>
              </MagneticWrap>

              <motion.div className="mt-16 opacity-40" aria-hidden>
                <Logo variant="light" showWordmark size={36} />
              </motion.div>
            </motion.div>
          </PageContainer>
        </main>
        <Footer />
      </PageRoute>
    </PageTransition>
  )
}
