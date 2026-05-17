import { useRef, type ReactNode } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

type TiltCardProps = {
  children: ReactNode
  className?: string
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useSpring(0, { stiffness: 120, damping: 20 })
  const rawY = useSpring(0, { stiffness: 120, damping: 20 })
  const rotateX = useTransform(rawY, [-0.5, 0.5], [2, -2])
  const rotateY = useTransform(rawX, [-0.5, 0.5], [-2, 2])

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    rawX.set((e.clientX - el.getBoundingClientRect().left) / el.offsetWidth - 0.5)
    rawY.set((e.clientY - el.getBoundingClientRect().top) / el.offsetHeight - 0.5)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.005 }}
      transition={{ scale: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  )
}
