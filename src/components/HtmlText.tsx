import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguageScramble } from '../context/LanguageScrambleContext'
import { scrambleText } from '../lib/scramble'

type HtmlTextProps = {
  i18nKey: string
  className?: string
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export default function HtmlText({ i18nKey, className = '' }: HtmlTextProps) {
  const { t } = useTranslation()
  const { generation, getStaggerMs } = useLanguageScramble()
  const html = t(i18nKey)
  const plain = useMemo(() => stripHtml(html), [html])
  const [display, setDisplay] = useState(plain)
  const [showHtml, setShowHtml] = useState(true)

  useEffect(() => {
    if (generation === 0) {
      setDisplay(plain)
      setShowHtml(true)
    }
  }, [plain, generation])

  useEffect(() => {
    if (generation === 0) return

    setShowHtml(false)
    const delay = getStaggerMs()
    let cleanup: (() => void) | undefined

    const timeoutId = window.setTimeout(() => {
      cleanup = scrambleText(plain, setDisplay, 360, () => setShowHtml(true))
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      cleanup?.()
    }
  }, [generation, plain, getStaggerMs])

  if (showHtml) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
  }

  return <span className={className}>{display}</span>
}
