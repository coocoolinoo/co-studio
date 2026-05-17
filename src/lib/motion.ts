export const easeEditorial = [0.25, 0.1, 0.25, 1] as const
export const easeCinematic = [0.76, 0, 0.24, 1] as const

export const revealTransition = {
  duration: 0.7,
  ease: easeEditorial,
} as const

export const revealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
} as const
