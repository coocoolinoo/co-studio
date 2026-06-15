import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import de from './locales/de.json'
import ro from './locales/ro.json'
import { detectGeoLanguage } from './geoLanguage'

const STORAGE_KEY = 'i18nLng'
const SUPPORTED = ['de', 'en', 'ro'] as const

function normalizeLang(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  const base = value.split('-')[0].toLowerCase()
  return SUPPORTED.includes(base as (typeof SUPPORTED)[number]) ? base : undefined
}

function setDocumentLang(lang: string) {
  document.documentElement.lang = lang
}

export async function initI18n() {
  const stored = normalizeLang(localStorage.getItem(STORAGE_KEY))
  const lng = stored ?? (await detectGeoLanguage())

  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        de: { translation: de },
        ro: { translation: ro },
      },
      lng,
      fallbackLng: 'en',
      supportedLngs: [...SUPPORTED],
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage'],
        caches: ['localStorage'],
        lookupLocalStorage: STORAGE_KEY,
      },
    })

  setDocumentLang(i18n.language)
  i18n.on('languageChanged', setDocumentLang)

  return i18n
}

export default i18n
