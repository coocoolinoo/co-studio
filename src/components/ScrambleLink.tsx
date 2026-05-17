import { useCallback, useRef, useState } from 'react'
import { scrambleText } from '../lib/scramble'

type ScrambleLinkProps = {
  href: string
  label: string
  onClick?: () => void
  className?: string
}

export default function ScrambleLink({
  href,
  label,
  onClick,
  className = '',
}: ScrambleLinkProps) {
  const [display, setDisplay] = useState(label)
  const cleanupRef = useRef<(() => void) | null>(null)

  const handleEnter = useCallback(() => {
    cleanupRef.current?.()
    cleanupRef.current = scrambleText(label, setDisplay, 300)
  }, [label])

  const handleLeave = useCallback(() => {
    cleanupRef.current?.()
    cleanupRef.current = null
    setDisplay(label)
  }, [label])

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      data-cursor-hover
    >
      {display}
    </a>
  )
}
