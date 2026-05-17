import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import CookieNotice from './components/CookieNotice'
import Cursor from './components/Cursor'
import ScrollToTop from './components/ScrollToTop'
import { LanguageScrambleProvider } from './context/LanguageScrambleContext'
import About from './pages/About'
import Home from './pages/Home'
import Impressum from './pages/Impressum'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageScrambleProvider>
        <Cursor />
        <CookieNotice />
        <AnimatedRoutes />
      </LanguageScrambleProvider>
    </BrowserRouter>
  )
}
