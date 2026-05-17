import { useRef } from 'react'
import { useInView } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber'

type CountLabelProps = {
  number: number
  label: string
  className?: string
}

export default function CountLabel({ number, label, className = '' }: CountLabelProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <>
          [<AnimatedNumber value={number} pad={2} />] {label}
        </>
      ) : (
        <>
          [{String(number).padStart(2, '0')}] {label}
        </>
      )}
    </span>
  )
}
