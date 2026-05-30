import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useScrollReveal(options: Parameters<typeof useInView>[1] = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px', ...options })
  return { ref, inView }
}
