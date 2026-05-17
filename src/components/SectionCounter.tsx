import AnimatedNumber from './AnimatedNumber'

type SectionCounterProps = {
  index: number
  total: number
  className?: string
}

export default function SectionCounter({ index, total, className = '' }: SectionCounterProps) {
  return (
    <span className={className} aria-label={`Section ${index} of ${total}`}>
      [<AnimatedNumber value={index} pad={2} duration={0.9} />
      {' '}-{' '}
      <AnimatedNumber value={total} pad={2} duration={1.1} />]
    </span>
  )
}
