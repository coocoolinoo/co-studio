import { useTranslation } from 'react-i18next'
import MagneticWrap from './MagneticWrap'
import ScrambleText from './ScrambleText'
import { CALENDAR_URL, CV_DOWNLOAD_NAME, HAS_GOOGLE_CALENDAR, getCvPath } from '../lib/site'

type ProfileActionsProps = {
  className?: string
  showCv?: boolean
  showCalendar?: boolean
}

export default function ProfileActions({
  className = '',
  showCv = true,
  showCalendar = true,
}: ProfileActionsProps) {
  const { i18n, t } = useTranslation()
  const cvHref = getCvPath(i18n.language)

  if (!showCv && !(showCalendar && HAS_GOOGLE_CALENDAR)) return null

  return (
    <div className={`profile-actions flex flex-wrap gap-3 ${className}`.trim()}>
      {showCv && (
        <MagneticWrap>
          <a
            href={cvHref}
            download={CV_DOWNLOAD_NAME}
            className="nav-pill nav-link profile-actions__btn"
            data-cursor-hover
          >
            <ScrambleText i18nKey="contact.cv" /> →
          </a>
        </MagneticWrap>
      )}
      {showCalendar && HAS_GOOGLE_CALENDAR && (
        <MagneticWrap>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            title={t('contact.calendar')}
            className="nav-pill nav-link profile-actions__btn profile-actions__btn--accent"
            data-cursor-hover
          >
            <ScrambleText i18nKey="contact.calendar" /> →
          </a>
        </MagneticWrap>
      )}
    </div>
  )
}
