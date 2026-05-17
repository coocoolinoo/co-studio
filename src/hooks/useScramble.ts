import { useCallback, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function useScramble(text: string) {
  const ref = useRef<HTMLSpanElement>(null)
  const frame = useRef<ReturnType<typeof setInterval> | null>(null)

  const animate = useCallback(() => {
    let iteration = 0
    if (frame.current) clearInterval(frame.current)

    frame.current = setInterval(() => {
      if (!ref.current) return
      ref.current.innerText = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < iteration) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')
      if (iteration >= text.length) {
        if (frame.current) clearInterval(frame.current)
      }
      iteration += 0.5
    }, 30)
  }, [text])

  return { ref, animate }
}
