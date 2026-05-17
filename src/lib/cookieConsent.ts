const STORAGE_KEY = 'co-studio-cookie-notice-v1'

export function hasCookieNoticeSeen(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return true
  }
}

export function setCookieNoticeSeen(): void {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* private browsing */
  }
}
