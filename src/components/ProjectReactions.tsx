import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EMOJIS = [
  { emoji: '🔥', label: 'fire' },
  { emoji: '❤️', label: 'heart' },
  { emoji: '👏', label: 'clap' },
  { emoji: '🚀', label: 'rocket' },
]

const SEEDS: Record<string, Record<string, number>> = {
  pifx:       { fire: 12, heart: 8,  clap: 6,  rocket: 14 },
  cobible:    { fire: 24, heart: 19, clap: 11, rocket: 31 },
  bibelsuche: { fire: 9,  heart: 7,  clap: 5,  rocket: 11 },
  vsmannersdorf: { fire: 16, heart: 13, clap: 9, rocket: 18 },
  alzeichenbuero: { fire: 7, heart: 5, clap: 4, rocket: 9 },
}

interface ProjectReactionsProps {
  projectId: string
}

export default function ProjectReactions({ projectId }: ProjectReactionsProps) {
  const storageKey = `reactions-${projectId}`

  const [counts, setCounts] = useState<Record<string, number>>({
    fire: 0, heart: 0, clap: 0, rocket: 0,
  })
  const [userReacted, setUserReacted] = useState<Record<string, boolean>>({})
  const [burst, setBurst] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (!stored) {
        const seed = SEEDS[projectId] || { fire: 5, heart: 3, clap: 2, rocket: 6 }
        localStorage.setItem(storageKey, JSON.stringify(seed))
        setCounts(seed)
      } else {
        setCounts(JSON.parse(stored))
      }
      const userStored = JSON.parse(localStorage.getItem(`${storageKey}-user`) || '{}')
      setUserReacted(userStored)
    } catch {}
  }, [projectId])

  const react = (label: string) => {
    const alreadyReacted = userReacted[label]
    setCounts(prev => {
      const next = {
        ...prev,
        [label]: Math.max(0, (prev[label] || 0) + (alreadyReacted ? -1 : 1)),
      }
      localStorage.setItem(storageKey, JSON.stringify(next))
      return next
    })
    const nextUser = { ...userReacted, [label]: !alreadyReacted }
    setUserReacted(nextUser)
    localStorage.setItem(`${storageKey}-user`, JSON.stringify(nextUser))
    if (!alreadyReacted) {
      setBurst(label)
      setTimeout(() => setBurst(null), 600)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '10px 0 4px', flexWrap: 'wrap' }}>
      {EMOJIS.map(({ emoji, label }) => {
        const count = counts[label] || 0
        const reacted = userReacted[label]
        return (
          <motion.button
            key={label}
            onClick={() => react(label)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            aria-label={`React with ${label}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: reacted ? 'rgba(232,82,42,.1)' : 'rgba(26,20,16,.04)',
              border: `1px solid ${reacted ? 'rgba(232,82,42,.3)' : 'rgba(26,20,16,.1)'}`,
              borderRadius: 999, padding: '5px 10px',
              cursor: 'pointer', position: 'relative',
              transition: 'all .2s',
            }}
          >
            <span style={{ fontSize: 13 }}>{emoji}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={count}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, fontWeight: 700,
                  color: reacted ? '#E8522A' : 'rgba(26,20,16,.4)',
                  minWidth: 12,
                }}
              >
                {count}
              </motion.span>
            </AnimatePresence>

            <AnimatePresence>
              {burst === label && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                      animate={{
                        opacity: 0, scale: 0,
                        x: Math.cos((i / 6) * Math.PI * 2) * 28,
                        y: Math.sin((i / 6) * Math.PI * 2) * 28,
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        width: 6, height: 6,
                        borderRadius: '50%',
                        background: '#E8522A',
                        pointerEvents: 'none',
                        top: '50%', left: '50%',
                        marginTop: -3, marginLeft: -3,
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
