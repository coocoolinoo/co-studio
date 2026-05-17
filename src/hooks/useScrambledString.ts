import { useEffect, useState } from 'react'
import { useLanguageScramble } from '../context/LanguageScrambleContext'
import { scrambleText } from '../lib/scramble'

export function useScrambledString(target: string, duration = 320) {
  const { generation, getStaggerMs } = useLanguageScramble()
  const [display, setDisplay] = useState(target)

  useEffect(() => {
    if (generation === 0) {
      setDisplay(target)
    }
  }, [target, generation])

  useEffect(() => {
    if (generation === 0) return

    const delay = getStaggerMs()
    let cleanup: (() => void) | undefined

    const timeoutId = window.setTimeout(() => {
      cleanup = scrambleText(target, setDisplay, duration)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      cleanup?.()
    }
  }, [generation, target, duration, getStaggerMs])

  return display
}
