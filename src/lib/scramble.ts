const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'

export function scrambleText(
  target: string,
  onUpdate: (value: string) => void,
  duration = 300,
  onComplete?: () => void,
): () => void {
  const length = target.length
  let frame = 0
  const totalFrames = Math.ceil(duration / 30)
  let intervalId: ReturnType<typeof setInterval>

  intervalId = setInterval(() => {
    frame++
    const progress = frame / totalFrames

    const scrambled = target
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (progress > i / length) return char
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      })
      .join('')

    onUpdate(scrambled)

    if (frame >= totalFrames) {
      clearInterval(intervalId)
      onUpdate(target)
      onComplete?.()
    }
  }, 30)

  return () => clearInterval(intervalId)
}
