import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = 'co-studio'
  }, [pathname])

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return true
        }
        return false
      }

      if (scrollToTarget()) return

      const t1 = window.setTimeout(scrollToTarget, 50)
      const t2 = window.setTimeout(scrollToTarget, 900)
      return () => {
        window.clearTimeout(t1)
        window.clearTimeout(t2)
      }
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
