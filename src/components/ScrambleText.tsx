import type { ElementType, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrambledString } from '../hooks/useScrambledString'

type ScrambleTextProps = {
  i18nKey?: string
  children?: ReactNode
  className?: string
  as?: ElementType
}

export default function ScrambleText({
  i18nKey,
  children,
  className,
  as: Tag = 'span',
}: ScrambleTextProps) {
  const { t } = useTranslation()
  const source =
    i18nKey != null ? t(i18nKey) : typeof children === 'string' ? children : ''
  const display = useScrambledString(source)

  if (!source && children != null && typeof children !== 'string') {
    return <Tag className={className}>{children}</Tag>
  }

  return <Tag className={className}>{display}</Tag>
}
