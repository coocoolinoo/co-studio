const DACH_COUNTRIES = new Set(['DE', 'AT', 'CH'])

export type SiteLang = 'de' | 'en' | 'ro'

export function countryToLang(country: string | null | undefined): SiteLang {
  if (!country) return 'en'
  const code = country.toUpperCase()
  if (DACH_COUNTRIES.has(code)) return 'de'
  if (code === 'RO') return 'ro'
  return 'en'
}

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

export async function fetchCountryCode(): Promise<string | null> {
  try {
    const res = await fetchWithTimeout('/api/geo', 1500)
    if (res.ok) {
      const data = (await res.json()) as { country?: string | null }
      if (data.country) return data.country
    }
  } catch {
    // Local dev or non-Vercel host — fall through to public geo API
  }

  try {
    const res = await fetchWithTimeout('https://ipapi.co/country_code/', 2500)
    if (!res.ok) return null
    const text = (await res.text()).trim()
    return text || null
  } catch {
    return null
  }
}

export async function detectGeoLanguage(): Promise<SiteLang> {
  const country = await fetchCountryCode()
  return countryToLang(country)
}
