import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeCinematic } from '../lib/motion'

type PageRouteProps = {
  children: ReactNode
}

export default function PageRoute({ children }: PageRouteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: easeCinematic }}
    >
      {children}
    </motion.div>
  )
}
