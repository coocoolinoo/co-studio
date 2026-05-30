import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playClick } from '../utils/sound'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => {
    playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          onClick={scrollUp}
          title="Back to top"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 68,
            zIndex: 1000,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1.5px solid rgba(26,20,16,.15)',
            background: 'rgba(245,240,232,.9)',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            color: 'rgba(26,20,16,.4)',
            boxShadow: '0 4px 16px rgba(26,20,16,.1)',
            transition: 'all .2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#E8522A'
            e.currentTarget.style.color = 'white'
            e.currentTarget.style.borderColor = '#E8522A'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(245,240,232,.9)'
            e.currentTarget.style.color = 'rgba(26,20,16,.4)'
            e.currentTarget.style.borderColor = 'rgba(26,20,16,.15)'
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}
