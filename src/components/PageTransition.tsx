import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeCinematic } from '../lib/motion'

type PageTransitionProps = {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      <motion.div
        className="curtain"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: easeCinematic, delay: 0.1 }}
        style={{ transformOrigin: 'top' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        {children}
      </motion.div>
    </>
  )
}
