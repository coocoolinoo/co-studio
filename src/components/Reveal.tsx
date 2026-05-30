import { motion } from 'framer-motion'

type RevealProps = {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  distance?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
}

const EASE_OUT = [0.76, 0, 0.24, 1]

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 48,
  duration = 0.7,
  className,
  style,
}: RevealProps) {
  const initial = {
    opacity: 0,
    y: direction === 'up' ? distance : 0,
    x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
