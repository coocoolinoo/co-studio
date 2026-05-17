import { useTranslation } from 'react-i18next'
import MagneticWrap from './MagneticWrap'

const LANGS = ['EN', 'DE', 'RO'] as const

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = (i18n.language || 'en').toUpperCase().slice(0, 2)

  return (
    <MagneticWrap className="lang-switcher">
      {LANGS.map((lang, i) => (
        <span key={lang} className="inline-flex items-center">
          <button
            type="button"
            onClick={() => i18n.changeLanguage(lang.toLowerCase())}
            className={`lang-btn${current === lang ? ' active' : ''}`}
            data-cursor-hover
          >
            {lang}
          </button>
          {i < LANGS.length - 1 && <span className="lang-sep">/</span>}
        </span>
      ))}
    </MagneticWrap>
  )
}
