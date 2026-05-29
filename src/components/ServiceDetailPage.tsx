import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from './Footer'
import Navbar from './Navbar'
import PageContainer from './PageContainer'
import PageRoute from './PageRoute'
import PageTransition from './PageTransition'
import FadeUp from './FadeUp'
import { easeEditorial } from '../lib/motion'

type ProcessStep = {
  num: string
  title: string
  desc: string
}

type ServiceDetailPageProps = {
  num: string
  title: string
  tagline: string
  desc: string
  deliverables: string[]
  techStack: string[]
  accentTech?: string[]
  process: ProcessStep[]
}

export default function ServiceDetailPage({
  num,
  title,
  tagline,
  desc,
  deliverables,
  techStack,
  accentTech = [],
  process,
}: ServiceDetailPageProps) {
  const accentSet = new Set(accentTech)

  return (
    <PageTransition>
      <PageRoute>
        <Navbar />
        <main className="bg-off-white pt-28">

          {/* Hero */}
          <PageContainer className="pb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeEditorial }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0 48px' }}
            >
              <Link to="/#focus" className="nav-pill nav-link" data-cursor-hover>
                ← SERVICES
              </Link>
              <span className="font-mono text-[0.7rem] tracking-[0.15em] text-near-black/40 uppercase">
                {num}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeEditorial, delay: 0.1 }}
            >
              <h1
                className="font-display font-black uppercase tracking-tight text-near-black"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', lineHeight: 0.9, letterSpacing: '-0.02em' }}
              >
                {title}
              </h1>
              <p
                className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-near-black/60"
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}
              >
                {tagline}
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: easeEditorial, delay: 0.3 }}
              style={{ height: 1, background: 'rgba(26,20,16,0.12)', marginTop: '48px', transformOrigin: 'left' }}
            />
          </PageContainer>

          {/* Description */}
          <PageContainer className="section-spacing !pt-12 !pb-0">
            <FadeUp>
              <p className="max-w-3xl font-mono leading-relaxed text-near-black/70"
                style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', lineHeight: 1.8 }}>
                {desc}
              </p>
            </FadeUp>
          </PageContainer>

          {/* Deliverables + Tech stack */}
          <PageContainer className="section-spacing !pb-0">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}
              className="md:grid-cols-2">

              {/* Deliverables */}
              <FadeUp>
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-near-black/40 uppercase mb-6">
                  [ WHAT'S INCLUDED ]
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {deliverables.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: easeEditorial }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 0',
                        borderBottom: '1px solid rgba(26,20,16,0.08)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.82rem',
                        color: '#1A1410',
                      }}
                    >
                      <span style={{ color: '#E8522A', fontSize: '0.7rem' }}>→</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </FadeUp>

              {/* Tech stack */}
              <FadeUp delay={0.1}>
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-near-black/40 uppercase mb-6">
                  [ TECH STACK ]
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {techStack.map((tech, i) => {
                    const isAccent = accentSet.has(tech)
                    return (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.04, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{
                          display: 'inline-flex',
                          padding: '5px 14px',
                          borderRadius: '999px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.68rem',
                          letterSpacing: '0.06em',
                          background: isAccent ? '#E8522A' : 'transparent',
                          color: isAccent ? '#F5F0E8' : '#1A1410',
                          border: isAccent ? '1.5px solid #E8522A' : '1.5px solid rgba(26,20,16,0.18)',
                          fontWeight: isAccent ? 600 : 400,
                        }}
                      >
                        {tech}
                      </motion.span>
                    )
                  })}
                </div>
              </FadeUp>
            </div>
          </PageContainer>

          {/* Process */}
          <PageContainer className="section-spacing">
            <FadeUp>
              <p className="font-mono text-[0.65rem] tracking-[0.2em] text-near-black/40 uppercase mb-10">
                [ PROCESS ]
              </p>
            </FadeUp>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px',
              background: 'rgba(26,20,16,0.1)', border: '1px solid rgba(26,20,16,0.1)',
              borderRadius: '16px', overflow: 'hidden' }}
              className="md:grid-cols-4">
              {process.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: easeEditorial }}
                  style={{ background: '#F5F0E8', padding: '28px 24px' }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
                    letterSpacing: '0.15em', color: '#E8522A' }}>
                    {step.num}
                  </span>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.4rem',
                    fontWeight: 900, textTransform: 'uppercase', color: '#1A1410',
                    marginTop: '8px', letterSpacing: '-0.01em' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
                    lineHeight: 1.6, color: 'rgba(26,20,16,0.55)', marginTop: '8px' }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </PageContainer>

          {/* CTA */}
          <PageContainer className="section-spacing !pt-0">
            <FadeUp>
              <div style={{ background: '#1A1410', borderRadius: '20px', padding: '52px 48px',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
                  letterSpacing: '0.2em', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase' }}>
                  [ LET'S TALK ]
                </p>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem,5vw,3.5rem)',
                  fontWeight: 900, textTransform: 'uppercase', color: '#F5F0E8',
                  lineHeight: 1, letterSpacing: '-0.01em' }}>
                  GOT A PROJECT<br/>IN MIND?
                </h2>
                <motion.a
                  href="mailto:secrieri.corneliu@gmail.com"
                  whileHover={{ scale: 1.03, background: 'rgba(255,255,255,0.1)' }}
                  transition={{ duration: 0.2 }}
                  data-cursor-hover
                  style={{ display: 'inline-block', marginTop: '8px',
                    border: '1.5px solid rgba(245,240,232,0.3)', borderRadius: '999px',
                    padding: '12px 28px', fontSize: '0.75rem', letterSpacing: '0.06em',
                    color: '#F5F0E8', textDecoration: 'none',
                    fontFamily: "'JetBrains Mono', monospace" }}
                >
                  secrieri.corneliu@gmail.com →
                </motion.a>
              </div>
            </FadeUp>
          </PageContainer>

        </main>
        <Footer />
      </PageRoute>
    </PageTransition>
  )
}
