/**
 * Google Calendar — Terminplan (Appointment schedule)
 *
 * 1. calendar.google.com → Zahnrad → Terminplan
 * 2. Terminplan erstellen → „Link teilen“ kopieren
 *    (z. B. https://calendar.app.google/… oder calendar.google.com/calendar/appointments/…)
 * 3. URL in .env als VITE_GOOGLE_CALENDAR_URL eintragen (Dev-Server neu starten)
 *
 * Neue Termine erscheinen in Google Calendar und syncen mit dem iPhone,
 * wenn iCloud/Google auf dem iPhone verbunden ist.
 */
const GOOGLE_CALENDAR_BOOKING_URL =
  (import.meta.env.VITE_GOOGLE_CALENDAR_URL as string | undefined)?.trim() ||
  (import.meta.env.VITE_CALENDAR_URL as string | undefined)?.trim() ||
  ''

export const CALENDAR_URL = GOOGLE_CALENDAR_BOOKING_URL

export const HAS_GOOGLE_CALENDAR = CALENDAR_URL.length > 0

export const CV_PATHS = {
  en: '/cv/cv-en.pdf',
  de: '/cv/cv-de.pdf',
  ro: '/cv/cv-en.pdf',
} as const

export function getCvPath(lang: string): string {
  if (lang.startsWith('de')) return CV_PATHS.de
  return CV_PATHS.en
}

export const CV_DOWNLOAD_NAME = 'Corneliu-Secrieri-CV.pdf'

/** Main home sections for [01 - 04] counters */
export const HOME_SECTION_TOTAL = 4

/**
 * Contact form via Web3Forms (free): https://web3forms.com
 * Register with secrieri.corneliu@gmail.com → copy Access Key to .env
 */
export const WEB3FORMS_ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim() || ''

export const HAS_CONTACT_FORM = WEB3FORMS_ACCESS_KEY.length > 0

export const CONTACT_EMAIL = 'secrieri.corneliu@gmail.com'
