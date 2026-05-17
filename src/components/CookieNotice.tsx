import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { hasCookieNoticeSeen, setCookieNoticeSeen } from '../lib/cookieConsent'
import { easeEditorial } from '../lib/motion'

export default function CookieNotice() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!hasCookieNoticeSeen()) {
      const timer = window.setTimeout(() => setVisible(true), 800)
      return () => window.clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    setCookieNoticeSeen()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="dialog"
          aria-labelledby="cookie-notice-title"
          aria-describedby="cookie-notice-desc"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.45, ease: easeEditorial }}
          className="cookie-notice"
        >
          <div className="cookie-notice__inner">
            <p id="cookie-notice-title" className="cookie-notice__label">
              {t('cookies.label')}
            </p>
            <p id="cookie-notice-desc" className="cookie-notice__text">
              {t('cookies.message')}{' '}
              <Link to="/datenschutz" className="cookie-notice__link" data-cursor-hover>
                {t('cookies.privacyLink')}
              </Link>
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="cookie-notice__btn"
              data-cursor-hover
            >
              {t('cookies.accept')}
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
