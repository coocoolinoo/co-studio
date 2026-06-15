import { useTranslation } from 'react-i18next'
import FadeUp from './FadeUp'
import PageContainer from './PageContainer'
import TiltCard from './TiltCard'

const SOCIAL_KEYS = [
  { key: 'email', href: 'mailto:contact@co-studio.at' },
  { key: 'github', href: 'https://github.com' },
  { key: 'linkedin', href: 'https://linkedin.com' },
  { key: 'twitter', href: 'https://twitter.com' },
] as const

export default function SocialSection({ className = '' }: { className?: string }) {
  const { t } = useTranslation()

  return (
    <section id="contact" className={`section-spacing pb-16 ${className}`}>
      <PageContainer>
        <FadeUp>
          <TiltCard className="float-card relative">
            <div className="section-rail" aria-hidden>
              <span className="section-label section-label--side">{t('meta.socialLabel')}</span>
            </div>

            <h2 className="contact-headline max-w-4xl font-mono font-bold uppercase tracking-[0.05em] text-near-black">
              {t('contact.closing')}
            </h2>

            <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-center md:gap-14">
              <div
                className="h-[100px] w-[100px] shrink-0 rounded-full bg-[#cccccc]"
                role="img"
                aria-label={t('meta.profile')}
              />

              <nav className="flex flex-col gap-2">
                {SOCIAL_KEYS.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="social-link font-mono text-[1.4rem]"
                    data-cursor-hover
                  >
                    {t(`contact.${link.key}`)} →
                  </a>
                ))}
              </nav>
            </div>
          </TiltCard>
        </FadeUp>
      </PageContainer>
    </section>
  )
}
