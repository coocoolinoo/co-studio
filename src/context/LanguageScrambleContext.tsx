import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useTranslation } from 'react-i18next'

type LanguageScrambleContextValue = {
  generation: number
  getStaggerMs: () => number
}

const LanguageScrambleContext = createContext<LanguageScrambleContextValue>({
  generation: 0,
  getStaggerMs: () => 0,
})

export function LanguageScrambleProvider({ children }: { children: ReactNode }) {
  const [generation, setGeneration] = useState(0)
  const staggerRef = useRef(0)
  const { i18n } = useTranslation()

  const getStaggerMs = useCallback(() => {
    const ms = staggerRef.current * 14
    staggerRef.current += 1
    return Math.min(ms, 400)
  }, [])

  useEffect(() => {
    const onLanguageChanged = () => {
      staggerRef.current = 0
      setGeneration((g) => g + 1)
    }

    i18n.on('languageChanged', onLanguageChanged)
    return () => i18n.off('languageChanged', onLanguageChanged)
  }, [i18n])

  const value = useMemo(
    () => ({ generation, getStaggerMs }),
    [generation, getStaggerMs],
  )

  return (
    <LanguageScrambleContext.Provider value={value}>
      {children}
    </LanguageScrambleContext.Provider>
  )
}

export function useLanguageScramble() {
  return useContext(LanguageScrambleContext)
}
