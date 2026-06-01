import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Pricing from './pages/Pricing'
import { motion, AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import BackToTop from './components/BackToTop'
import CookieNotice from './components/CookieNotice'
import Cursor from './components/Cursor'
import Intro from './components/Intro'
import KeyboardShortcuts from './components/KeyboardShortcuts'
import LoadTimeBadge from './components/LoadTimeBadge'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import { LanguageScrambleProvider } from './context/LanguageScrambleContext'
import About from './pages/About'
import Home from './pages/Home'
import Impressum from './pages/Impressum'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import ProjectDetail from './pages/ProjectDetail'
import ServiceWeb from './pages/services/Web'
import ServiceApp from './pages/services/App'
import ServiceDesign from './pages/services/Design'
import ServiceVideo from './pages/services/Video'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/services/web"    element={<ServiceWeb />} />
          <Route path="/services/app"    element={<ServiceApp />} />
          <Route path="/services/design" element={<ServiceDesign />} />
          <Route path="/services/video"  element={<ServiceVideo />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function LogoPageTransition() {
  const location = useLocation()
  const isFirstLoad = useRef(true)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    setShow(true)
    const t = setTimeout(() => setShow(false), 700)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="logo-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99995,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <svg width="80" height="80" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="46" fill="#1A1410"/>
              <circle cx="48" cy="48" r="28" fill="#F5F0E8"/>
              <rect x="48" y="2" width="48" height="46" fill="#F5F0E8"/>
              <rect x="48" y="48" width="48" height="46" fill="#F5F0E8"/>
              <circle cx="48" cy="20" r="9" fill="#E8522A"/>
              <circle cx="48" cy="20" r="4" fill="#1A1410"/>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AppContent() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('co-studio-intro-seen')
  })

  const handleIntroComplete = () => {
    sessionStorage.setItem('co-studio-intro-seen', 'true')
    setShowIntro(false)
  }

  return (
    <>
      {showIntro && <Intro onComplete={handleIntroComplete} />}
      <div style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <AnimatedRoutes />
      </div>
    </>
  )
}

function useNightAmbient() {
  const [isNight, setIsNight] = useState(false)
  useEffect(() => {
    const check = () => {
      const h = new Date(
        new Date().toLocaleString('en-US', { timeZone: 'Europe/Vienna' })
      ).getHours()
      setIsNight(h >= 22 || h < 6)
    }
    check()
    const id = setInterval(check, 60000)
    return () => clearInterval(id)
  }, [])
  return isNight
}

function TabTitleEasterEgg() {
  useEffect(() => {
    const handleBlur = () => { document.title = '👋 Komm zurück!' }
    const handleFocus = () => { document.title = 'co-studio — Web & App Development · Vienna' }
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])
  return null
}

function ConsoleEasterEgg() {
  useEffect(() => {
    const s1 = 'font-size:13px;font-weight:bold;color:#E8522A;'
    const s2 = 'font-size:11px;color:#888;'
    const s3 = 'font-size:11px;color:#1A1410;font-weight:bold;'
    const sr = 'font-size:11px;color:#888;'
    console.log(
      '%c\n' +
      '  ██████╗ ██████╗       ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ \n' +
      '██╔════╝██╔═══██╗      ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗\n' +
      '██║     ██║   ██║█████╗███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║\n' +
      '██║     ██║   ██║╚════╝╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║\n' +
      '╚██████╗╚██████╔╝      ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝\n' +
      ' ╚═════╝ ╚═════╝       ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ \n',
      s1
    )
    console.log('%cHey! 👋 Schön dass du hier reinschaust.', s3)
    console.log('%cDiese Seite wurde gebaut von Corneliu Secrieri — co-studio Wien.', s2)
    console.log('%c⚡ Stack: React · Vite · TypeScript · Framer Motion · i18next', s2)
    console.log('%c🌐 co-studio.at', s3)
    console.log('%c📧 secrieri.corneliu@gmail.com', s2)
    console.log('%c💼 linkedin.com/in/corneliu-s-b488a22b6', s2)
    console.log('%c🐙 github.com/coocoolinoo', s2)
    console.log('%cP.S. Wenn du das hier siehst, bist du wahrscheinlich auch Developer. Schreib mir! ツ', sr)
  }, [])
  return null
}

function NightAmbient() {
  const isNight = useNightAmbient()
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(10,6,4,0.07)',
        pointerEvents: 'none',
        zIndex: 99989,
        opacity: isNight ? 1 : 0,
        transition: 'opacity 3s ease',
      }}
    />
  )
}

export default function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <ScrollToTop />
      <TabTitleEasterEgg />
      <ConsoleEasterEgg />
      <LanguageScrambleProvider>
        <LogoPageTransition />
        <NightAmbient />
        {/* Noise/grain overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed', inset: 0,
            zIndex: 99990, pointerEvents: 'none',
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px',
          }}
        />
        <ScrollProgress />
        <Cursor />
        <CookieNotice />
        <BackToTop />
        <KeyboardShortcuts />
        <LoadTimeBadge />
        <AppContent />
      </LanguageScrambleProvider>
    </BrowserRouter>
    </HelmetProvider>
  )
}
