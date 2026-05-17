/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CALENDAR_URL?: string
  readonly VITE_CALENDAR_URL?: string
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
