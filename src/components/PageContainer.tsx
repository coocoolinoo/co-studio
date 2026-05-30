import type { ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
  className?: string
  as?: 'motion.div' | 'div'
}

export default function PageContainer({
  children,
  className = '',
}: PageContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-10 ${className}`}>{children}</div>
  )
}
