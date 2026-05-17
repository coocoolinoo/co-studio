import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { easeCinematic } from '../lib/motion'

type HeroWordsProps = {
  text: string
  className: string
  style?: CSSProperties
  baseDelay?: number
}

export default function HeroWords({
  text,
  className,
  style,
  baseDelay = 0.8,
}: HeroWordsProps) {
  const words = text.split(' ')

  return (
    <h2 className={`m-0 ${className}`} style={style}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.25em] inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: baseDelay + i * 0.1,
              ease: easeCinematic,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}
