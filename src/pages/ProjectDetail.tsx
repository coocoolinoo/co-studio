import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageContainer from '../components/PageContainer'
import PageRoute from '../components/PageRoute'
import PageTransition from '../components/PageTransition'
import TiltCard from '../components/TiltCard'
import FadeUp from '../components/FadeUp'
import Logo from '../components/Logo'
import MagneticWrap from '../components/MagneticWrap'
import ScrambleText from '../components/ScrambleText'
import AnimatedNumber from '../components/AnimatedNumber'
import { WorkMarqueeRow } from '../lib/workMarqueeText'
import { PROJECTS_META } from '../lib/projects'
import { easeEditorial } from '../lib/motion'
import { useScrambledString } from '../hooks/useScrambledString'

function ProjectMarquee({ title }: { title: string }) {
  const { scrollY } = useScroll()
  const x1 = useTransform(scrollY, [0, 500], ['0%', '-10%'])
  const x2 = useTransform(scrollY, [0, 500], ['-8%', '4%'])
  const row = `${title} * ${title} * ${title} * ${title} * `

  return (
    <FadeUp>
      <TiltCard className="float-card relative overflow-hidden py-10">
        <span className="absolute top-6 left-8 font-mono text-[10px] tracking-[0.15em] text-near-black/50 uppercase md:left-10">
          co-studio
        </span>
        <div className="mt-8 overflow-hidden">
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
        </div>
      </TiltCard>
    </FadeUp>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()

  const project = PROJECTS_META.find((p) => p.slug === slug)

  const rawTitle = project ? t(`work.${slug}.title`) : '404'
  const title = useScrambledString(rawTitle, 380)

  if (!project) {
    return (
      <PageTransition>
        <PageRoute>
          <Navbar />
          <main className="bg-off-white pt-28 min-h-screen">
            <PageContainer>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeEditorial }}
                className="py-10"
              >
                <Link to="/" className="nav-pill nav-link" data-cursor-hover>
                  <ScrambleText i18nKey="work.detail.back" />
                </Link>
                <p className="mt-12 font-mono text-sm text-near-black/50">
                  <ScrambleText i18nKey="work.detail.notFound" />
                </p>
              </motion.div>
            </PageContainer>
          </main>
          <Footer />
        </PageRoute>
      </PageTransition>
    )
  }

  const client = t(`work.${slug}.client`)
  const longDesc = t(`work.${slug}.longDesc`)

  return (
    <PageTransition>
      <PageRoute>
        <Navbar />
        <main className="bg-off-white pt-28">

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
                <Link to="/#work" className="nav-pill nav-link" data-cursor-hover>
                  <ScrambleText i18nKey="work.detail.back" />
                </Link>
              </MagneticWrap>
              <Logo variant="light" showWordmark={false} size={32} />
              <span className="font-mono text-[0.75rem] tracking-[0.1em] text-[#888] tabular-nums">
                <AnimatedNumber value={project.year} pad={4} duration={1.4} />
              </span>
            </motion.div>

            <ProjectMarquee title={title} />
          </PageContainer>

          {project.image && (
            <PageContainer className="!pt-6 !pb-0">
              <FadeUp>
                <TiltCard className="float-card overflow-hidden rounded-2xl p-0">
                  <img
                    src={project.image}
                    alt={rawTitle}
                    className="h-full max-h-[520px] w-full object-cover object-top"
                    draggable={false}
                  />
                </TiltCard>
              </FadeUp>
            </PageContainer>
          )}

          <PageContainer className="section-spacing">
            <FadeUp>
              <TiltCard className="float-card">
                <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

                  <div className="lg:w-[35%]">
                    <p className="mb-6 border-b border-black/10 pb-4 font-mono text-[10px] tracking-[0.2em] text-near-black/45 uppercase">
                      <ScrambleText i18nKey="work.detail.facts" />
                    </p>
                    <dl className="flex flex-col gap-5">
                      <div>
                        <dt className="mb-1 font-mono text-[9px] tracking-[0.2em] text-near-black/40 uppercase">
                          <ScrambleText i18nKey="work.detail.client" />
                        </dt>
                        <dd className="font-mono text-sm text-near-black">{client}</dd>
                      </div>
                      <div>
                        <dt className="mb-1 font-mono text-[9px] tracking-[0.2em] text-near-black/40 uppercase">
                          <ScrambleText i18nKey="work.detail.platform" />
                        </dt>
                        <dd className="font-mono text-sm text-near-black">{project.platform}</dd>
                      </div>
                      <div>
                        <dt className="mb-1 font-mono text-[9px] tracking-[0.2em] text-near-black/40 uppercase">
                          <ScrambleText i18nKey="work.detail.year" />
                        </dt>
                        <dd className="font-mono text-sm text-near-black">{project.year}</dd>
                      </div>
                    </dl>

                    <p className="mb-4 mt-8 border-b border-black/10 pb-4 font-mono text-[10px] tracking-[0.2em] text-near-black/45 uppercase">
                      <ScrambleText i18nKey="work.detail.stack" />
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block rounded-full border border-near-black/20 px-3 py-1 font-mono text-[10px] tracking-[0.08em] text-near-black/70 uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between lg:w-[65%]">
                    <div>
                      <p className="mb-6 border-b border-black/10 pb-4 font-mono text-[10px] tracking-[0.2em] text-near-black/45 uppercase">
                        <ScrambleText i18nKey="work.detail.about" />
                      </p>
                      <p className="max-w-xl font-mono text-sm leading-relaxed text-near-black/70">
                        {longDesc}
                      </p>
                    </div>

                    {(project.github || project.live) && (
                      <div className="mt-10 flex flex-wrap gap-4 border-t border-black/10 pt-8">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-link"
                            data-cursor-hover
                          >
                            <ScrambleText i18nKey="work.detail.live" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-link"
                            data-cursor-hover
                          >
                            <ScrambleText i18nKey="work.detail.github" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

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
