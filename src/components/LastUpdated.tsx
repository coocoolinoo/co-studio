import { useTranslation } from 'react-i18next'

declare const __BUILD_DATE__: string

const LOCALE_MAP = { de: 'de-AT', en: 'en-US', ro: 'ro-RO' } as const

export default function LastUpdated() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language.slice(0, 2) in LOCALE_MAP
    ? i18n.language.slice(0, 2)
    : 'en') as keyof typeof LOCALE_MAP
  const buildDate = new Date(__BUILD_DATE__)
  const formatted = buildDate.toLocaleDateString(LOCALE_MAP[lang], {
    month: 'long', year: 'numeric',
  })

  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 8, letterSpacing: '.12em',
      color: 'rgba(245,240,232,.18)',
      textTransform: 'uppercase',
    }}>
      {t('meta.updated')} {formatted}
    </span>
  )
}
