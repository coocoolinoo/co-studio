import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import BackToTop from './components/BackToTop'
import CookieNotice from './components/CookieNotice'
import Cursor from './components/Cursor'
import Intro from './components/Intro'
import KeyboardShortcuts from './components/KeyboardShortcuts'
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
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/services/web"    element={<ServiceWeb />} />
        <Route path="/services/app"    element={<ServiceApp />} />
        <Route path="/services/design" element={<ServiceDesign />} />
        <Route path="/services/video"  element={<ServiceVideo />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TabTitleEasterEgg />
      <LanguageScrambleProvider>
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
        <AppContent />
      </LanguageScrambleProvider>
    </BrowserRouter>
  )
}
