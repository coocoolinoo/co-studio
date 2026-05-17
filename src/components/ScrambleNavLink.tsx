import { useEffect } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { useLanguageScramble } from '../context/LanguageScrambleContext'
import { useScramble } from '../hooks/useScramble'
import MagneticWrap from './MagneticWrap'

type ScrambleNavLinkProps = LinkProps & {
  label: string
  className?: string
}

export default function ScrambleNavLink({
  label,
  className = '',
  children,
  ...props
}: ScrambleNavLinkProps) {
  const { generation } = useLanguageScramble()
  const { ref, animate } = useScramble(label)

  useEffect(() => {
    if (generation > 0) animate()
  }, [generation, label, animate])

  return (
    <MagneticWrap>
      <Link
        {...props}
        className={className}
        data-cursor-hover
        onMouseEnter={animate}
      >
        <span ref={ref}>{children ?? label}</span>
      </Link>
    </MagneticWrap>
  )
}
