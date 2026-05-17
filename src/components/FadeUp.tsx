import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeEditorial } from '../lib/motion'

type FadeUpProps = {
  children: ReactNode
  delay?: number
  className?: string
}

export default function FadeUp({ children, delay = 0, className = '' }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: easeEditorial }}
    >
      {children}
    </motion.div>
  )
}
