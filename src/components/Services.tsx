import { useTranslation } from 'react-i18next'
import { useScrambledString } from '../hooks/useScrambledString'
import ScrambleText from './ScrambleText'
import { ArcIcon, CrossIcon, FrameIcon, LineIcon } from './ServiceIcons'
import CountLabel from './CountLabel'
import FadeUp from './FadeUp'
import PageContainer from './PageContainer'

const SERVICE_KEYS = [
  { Icon: LineIcon, key: 'web' as const },
  { Icon: CrossIcon, key: 'app' as const },
  { Icon: ArcIcon, key: 'design' as const },
  { Icon: FrameIcon, key: 'media' as const },
]

export default function Services() {
  const { t } = useTranslation()
  const sectionLabel = useScrambledString(t('services.label').replace(/^\[\d+\]\s*/, ''))

  return (
    <section id="focus" className="section-spacing">
      <PageContainer>
        <CountLabel
          number={3}
          label={sectionLabel}
          className="section-index mb-10 block font-mono text-xs tracking-[0.2em] uppercase"
        />

        <div className="services-grid services-stack">
          {SERVICE_KEYS.map(({ Icon, key }, i) => (
            <FadeUp key={key} delay={i * 0.08}>
              <article className="service-col group relative flex flex-col gap-6 py-10 md:flex-row md:items-start md:gap-10 md:py-14">
                <div className="service-col-icon shrink-0" aria-hidden>
                  <Icon />
                </div>
                <div className="service-col-body flex min-w-0 flex-1 flex-col">
                  <h3 className="service-heading font-display font-bold uppercase tracking-tight text-near-black">
                    <ScrambleText i18nKey={`services.${key}.title`} />
                  </h3>
                <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-wide text-near-black/55 uppercase md:text-xs">
                  <ScrambleText i18nKey={`services.${key}.sub`} />
                </p>
                <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-near-black/70 md:text-[0.95rem]">
                  <ScrambleText i18nKey={`services.${key}.desc`} />
                </p>
                </div>
                <span className="service-arrow hidden text-[1.5rem] leading-none md:absolute md:top-14 md:right-0 md:block">
                  →
                </span>
              </article>
            </FadeUp>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
