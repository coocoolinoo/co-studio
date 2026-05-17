import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) {
        el.classList.add('hovering')
      } else {
        el.classList.remove('hovering')
      }
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', handleOver)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleOver)
    }
  }, [])

  return createPortal(<div ref={cursorRef} className="custom-cursor" aria-hidden />, document.body)
}
