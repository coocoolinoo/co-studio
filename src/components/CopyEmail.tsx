import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EMAIL = 'contact@co-studio.at'

export default function CopyEmail({ children, style }: { children?: React.ReactNode, style?: React.CSSProperties }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <>
      <span
        onClick={handleCopy}
        title="Click to copy email"
        style={{ cursor: 'pointer', ...style }}
      >
        {children ?? EMAIL}
      </span>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: .9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: .9 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: 'fixed', bottom: 32, left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 99999,
              background: '#1A1410', color: '#F5F0E8',
              borderRadius: 999, padding: '10px 20px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: '.1em',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 8px 32px rgba(26,20,16,.3)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: '#22c55e', fontSize: 14 }}>✓</span>
            contact@co-studio.at copied!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
