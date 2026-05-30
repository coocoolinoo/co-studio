import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AvailabilityBadge from './AvailabilityBadge'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'
import MagneticWrap from './MagneticWrap'
import ScrambleNavLink from './ScrambleNavLink'
import ScrambleText from './ScrambleText'
import ViennaClock from './ViennaClock'

export default function Navbar() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const isWorkActive = pathname === '/'
  const isAboutActive = pathname.startsWith('/about')

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const workLabel = `${t('nav.work')} ↓`
  const aboutLabel = `${t('nav.about')} →`

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-off-white">
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-10 py-5">
          <MagneticWrap>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                lineHeight: 0,
                flexShrink: 0,
              }}
              data-cursor-hover
              aria-label="co-studio home"
            >
              <Logo variant="light" showWordmark={false} size={44} />
            </Link>
          </MagneticWrap>

          <div className="hidden items-center gap-3 md:flex">
            <ul className="flex items-center gap-3">
              <li>
                <ScrambleNavLink
                  to="/#work"
                  label={workLabel}
                  className={`nav-pill nav-link${isWorkActive ? ' active' : ''}`}
                >
                  {workLabel}
                </ScrambleNavLink>
              </li>
              <li>
                <ScrambleNavLink
                  to="/about"
                  label={aboutLabel}
                  className={`nav-pill nav-link${isAboutActive ? ' active' : ''}`}
                >
                  {aboutLabel}
                </ScrambleNavLink>
              </li>
            </ul>
            <LanguageSwitcher />
            <AvailabilityBadge variant="navbar" />
            <div title="Current time in Vienna, Austria 🇦🇹">
              <ViennaClock variant="navbar" />
            </div>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <MagneticWrap>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="nav-pill nav-link"
                data-cursor-hover
                aria-label="Open menu"
              >
                <ScrambleText i18nKey="nav.menu" />
              </button>
            </MagneticWrap>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-off-white md:hidden">
          <div className="flex items-center justify-between px-10 py-5">
            <Logo variant="light" showWordmark={false} size={40} />
            <MagneticWrap>
              <button
                type="button"
                onClick={closeMenu}
                className="nav-pill nav-link"
                data-cursor-hover
              >
                <ScrambleText i18nKey="nav.close" />
              </button>
            </MagneticWrap>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-4 px-10">
            <ScrambleNavLink
              to="/#work"
              label={workLabel}
              onClick={closeMenu}
              className={`nav-pill nav-link w-fit text-base${isWorkActive ? ' active' : ''}`}
            >
              {workLabel}
            </ScrambleNavLink>
            <ScrambleNavLink
              to="/about"
              label={aboutLabel}
              onClick={closeMenu}
              className={`nav-pill nav-link w-fit text-base${isAboutActive ? ' active' : ''}`}
            >
              {aboutLabel}
            </ScrambleNavLink>
          </nav>
        </div>
      )}
    </>
  )
}
