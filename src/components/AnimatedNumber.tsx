import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

type AnimatedNumberProps = {
  value: number
  pad?: number
  className?: string
  duration?: number
}

export default function AnimatedNumber({
  value,
  pad = 2,
  className = '',
  duration = 1.15,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [text, setText] = useState(() => '0'.padStart(pad, '0'))

  useEffect(() => {
    if (!inView) return

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        const progress = value === 0 ? 1 : Math.min(1, latest / value)
        const target = Math.min(value, Math.round(latest))
        const lockedDigits = Math.floor(progress * pad)

        let out = ''
        for (let i = 0; i < pad; i++) {
          const power = 10 ** (pad - 1 - i)
          if (i < lockedDigits || progress >= 0.97) {
            out += String(Math.floor(target / power) % 10)
          } else {
            out += String(Math.floor(Math.random() * 10))
          }
        }
        setText(out.slice(-pad).padStart(pad, '0'))
      },
      onComplete() {
        setText(String(value).padStart(pad, '0'))
      },
    })

    return () => controls.stop()
  }, [inView, value, pad, duration])

  return (
    <span
      ref={ref}
      className={`animated-number tabular-nums ${className}`.trim()}
      aria-hidden
    >
      {text}
    </span>
  )
}
