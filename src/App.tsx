import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import CookieNotice from './components/CookieNotice'
import Cursor from './components/Cursor'
import Intro from './components/Intro'
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageScrambleProvider>
        <Cursor />
        <CookieNotice />
        <AppContent />
      </LanguageScrambleProvider>
    </BrowserRouter>
  )
}
