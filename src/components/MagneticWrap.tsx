import { useRef, type ReactNode } from 'react'
import { motion, useSpring } from 'framer-motion'

type MagneticWrapProps = {
  children: ReactNode
  className?: string
}

export default function MagneticWrap({ children, className = '' }: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 150, damping: 15 })
  const y = useSpring(0, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.3)
    y.set((e.clientY - cy) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-flex' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
