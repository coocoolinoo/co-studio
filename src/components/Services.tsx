import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useScrambledString } from '../hooks/useScrambledString'
import CountLabel from './CountLabel'
import PageContainer from './PageContainer'
import Marquee from './Marquee'
import AnimatedNumber from './AnimatedNumber'

// ─── Inline SVG icons (currentColor = inherits from .service-item-icon) ────

function WebIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
      <rect
        x="4" y="8" width="48" height="36" rx="5"
        stroke="currentColor" strokeWidth="2.5" fill="none"
        style={{ strokeDasharray: 400, strokeDashoffset: 400,
          animation: 'svcDrawBrowser 1.2s cubic-bezier(.76,0,.24,1) .1s forwards' }}
      />
      <line x1="4" y1="18" x2="52" y2="18" stroke="currentColor" strokeWidth="2" opacity=".4"/>
      <circle cx="12" cy="13" r="2" fill="#E8522A"/>
      <circle cx="19" cy="13" r="2" fill="#F0B429"/>
      <circle cx="26" cy="13" r="2" fill="#28C840"/>
      <rect x="10" y="24" width="30" height="4" rx="2" fill="currentColor" opacity=".45"/>
      <rect x="10" y="32" width="36" height="3" rx="1.5" fill="currentColor" opacity=".25"/>
      <rect x="10" y="37" width="24" height="3" rx="1.5" fill="currentColor" opacity=".15"/>
      <rect
        x="44" y="24" width="2" height="4" rx="1" fill="#E8522A"
        style={{ animation: 'svcBlinkCursor 1s ease-in-out infinite' }}
      />
    </svg>
  )
}

function AppIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
      <g style={{ animation: 'svcPhoneIn .6s cubic-bezier(.34,1.56,.64,1) .2s both' }}>
        <rect x="14" y="4" width="28" height="48" rx="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <rect x="18" y="10" width="20" height="30" rx="2" fill="currentColor" opacity=".08"/>
        <circle cx="28" cy="46" r="2.5" fill="currentColor" opacity=".3"/>
        <rect x="22" y="6" width="12" height="2" rx="1" fill="currentColor" opacity=".2"/>
      </g>
      <circle
        cx="28" cy="18" r="3" fill="#E8522A"
        style={{ transformBox: 'fill-box', transformOrigin: 'center',
          animation: 'svcDotPulse 1.5s ease-in-out infinite' }}
      />
      <rect x="20" y="25" width="16" height="2" rx="1" fill="currentColor" opacity=".25"/>
      <rect x="20" y="30" width="10" height="2" rx="1" fill="currentColor" opacity=".18"/>
      <rect x="20" y="35" width="16" height="4" rx="2" fill="#E8522A" opacity=".7"/>
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
      <circle
        cx="28" cy="28" r="20"
        stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" opacity=".2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center',
          animation: 'svcRotateSlow 4s linear infinite' }}
      />
      <rect
        x="18" y="18" width="16" height="16" rx="3" fill="#E8522A" opacity=".85"
        style={{ transformBox: 'fill-box', transformOrigin: 'center',
          animation: 'svcFloatY 2s ease-in-out infinite' }}
      />
      <circle
        cx="36" cy="36" r="8"
        fill="none" stroke="currentColor" strokeWidth="2.5"
        style={{ transformBox: 'fill-box', transformOrigin: 'center',
          animation: 'svcFloatY 2s ease-in-out .5s infinite' }}
      />
      <line x1="10" y1="46" x2="46" y2="10" stroke="currentColor" strokeWidth="1.5" opacity=".15" strokeDasharray="3 3"/>
      <circle cx="28" cy="28" r="3" fill="currentColor" opacity=".5"/>
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
      <circle
        cx="28" cy="28" r="22"
        stroke="currentColor" strokeWidth="1.5" opacity=".12"
        style={{ transformBox: 'fill-box', transformOrigin: 'center',
          animation: 'svcSpinReel 3s linear infinite' }}
      />
      <circle cx="28" cy="28" r="14" stroke="currentColor" strokeWidth="2" opacity=".2"/>
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center',
        animation: 'svcPlayPulse 1.5s ease-in-out infinite' }}>
        <circle cx="28" cy="28" r="10" fill="#E8522A"/>
        <polygon points="25,23 25,33 35,28" fill="white"/>
      </g>
      <circle cx="28" cy="8"  r="2.5" fill="currentColor" opacity=".25"/>
      <circle cx="28" cy="48" r="2.5" fill="currentColor" opacity=".25"/>
      <circle cx="8"  cy="28" r="2.5" fill="currentColor" opacity=".25"/>
      <circle cx="48" cy="28" r="2.5" fill="currentColor" opacity=".25"/>
    </svg>
  )
}

// ─── Particle burst ─────────────────────────────────────────────────────────

function particleBurst(e: React.MouseEvent) {
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div')
    p.style.cssText = `
      position:fixed; width:5px; height:5px; border-radius:50%;
      background:#E8522A; pointer-events:none; z-index:9999;
      left:${e.clientX}px; top:${e.clientY}px;
    `
    document.body.appendChild(p)
    const angle = (i / 6) * Math.PI * 2
    const dist = 40 + Math.random() * 30
    p.animate([
      { opacity: 1, transform: `translate(-50%,-50%) translate(0,0) scale(1)` },
      { opacity: 0, transform: `translate(-50%,-50%) translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist}px) scale(0)` },
    ], { duration: 600, easing: 'cubic-bezier(0.25,0.1,0.25,1)' }).onfinish = () => p.remove()
  }
}

// ─── Service data ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: '01',
    key: 'web' as const,
    route: '/services/web',
    tags: ['REACT · ANGULAR', 'WORDPRESS · JS', 'SQL · DOCKER'],
    Icon: WebIcon,
  },
  {
    num: '02',
    key: 'app' as const,
    route: '/services/app',
    tags: ['SWIFT · SWIFTUI', 'EXPO · REACT NATIVE', 'IONIC · JAVA'],
    Icon: AppIcon,
  },
  {
    num: '03',
    key: 'design' as const,
    route: '/services/design',
    tags: ['LOGOS · FLYERS', 'POSTERS · UI', 'FIGMA'],
    Icon: DesignIcon,
  },
  {
    num: '04',
    key: 'media' as const,
    route: '/services/video',
    tags: ['EDITING · MOTION', 'VISUAL FX'],
    Icon: VideoIcon,
  },
]

const STAT_DEFS = [
  { value: 24, suffix: '+', key: 'projects' },
  { value: 18, suffix: '+', key: 'clients' },
  { value: 3,  suffix: '+', key: 'years' },
  { value: 15, suffix: '+', key: 'tech' },
] as const

// ─── Stat counter item ───────────────────────────────────────────────────────

function StatItem({ value, suffix, labelKey }: { value: number; suffix: string; labelKey: string }) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="service-stat">
      <div className="service-stat-num">
        {inView ? <AnimatedNumber value={value} pad={value < 10 ? 1 : 2} duration={1.4} /> : '0'}
        <span>{suffix}</span>
      </div>
      <div className="service-stat-label">{t(labelKey)}</div>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function Services() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const sectionLabel = useScrambledString(t('services.label').replace(/^\[\d+\]\s*/, ''))
  const marqueeText = useScrambledString(t('hero.marquee'), 300)

  return (
    <section id="focus" className="section-spacing">
      <PageContainer>
        <CountLabel
          number={3}
          label={sectionLabel}
          className="section-index mb-10 block font-mono text-xs tracking-[0.2em] uppercase"
        />

        {/* Service items */}
        <div>
          {SERVICES.map(({ num, key, route, tags, Icon }) => (
            <div
              key={key}
              className="service-item"
              onMouseEnter={particleBurst}
              onClick={() => navigate(route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(route)}
              data-cursor-hover
            >
              <div className="service-item-bg" />
              <div className="service-item-content" style={{ padding: '28px 0' }}>
                <div className="service-item-row">
                  <span className="service-item-num">{num}</span>
                  <div className="service-item-icon" aria-hidden>
                    <Icon />
                  </div>
                  <h3 className="service-item-title">
                    {t(`services.${key}.title`)}
                  </h3>
                  <div className="service-item-tags">
                    {tags.map((line, i) => (
                      <span key={i} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </div>
                  <div className="service-item-arrow">→</div>
                </div>

                <div className="service-item-desc">
                  <p>{t(`services.${key}.desc`)}</p>
                  <span className="service-detail-link">
                    {t('serviceDetail.viewFull')} <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="service-stats">
          {STAT_DEFS.map((s) => (
            <StatItem key={s.key} value={s.value} suffix={s.suffix} labelKey={`serviceStat.${s.key}`} />
          ))}
        </div>
      </PageContainer>

      {/* Marquee strip */}
      <Marquee text={marqueeText} className="mt-16" speed="slow" />
    </section>
  )
}
