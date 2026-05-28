interface LogoProps {
  variant?: 'light' | 'dark' | 'accent'
  showWordmark?: boolean
  size?: number
}

export default function Logo({ variant = 'light', size = 48 }: LogoProps) {
  if (variant === 'dark') {
    return (
      <svg viewBox="0 0 96 96" width={size} height={size} role="img" aria-label="co-studio logo">
        <circle cx="48" cy="48" r="46" fill="#E8522A"/>
        <circle cx="48" cy="48" r="28" fill="#1A1410"/>
        <rect x="48" y="2" width="48" height="46" fill="#1A1410"/>
        <rect x="48" y="48" width="48" height="46" fill="#1A1410"/>
        <circle cx="48" cy="20" r="9" fill="#F5F0E8"/>
        <circle cx="48" cy="20" r="4" fill="#E8522A"/>
      </svg>
    )
  }

  // light + accent both render the primary (light bg) variant
  return (
    <svg viewBox="0 0 96 96" width={size} height={size} role="img" aria-label="co-studio logo">
      <circle cx="48" cy="48" r="46" fill="#1A1410"/>
      <circle cx="48" cy="48" r="28" fill="#F5F0E8"/>
      <rect x="48" y="2" width="48" height="46" fill="#F5F0E8"/>
      <rect x="48" y="48" width="48" height="46" fill="#F5F0E8"/>
      <circle cx="48" cy="20" r="9" fill="#E8522A"/>
      <circle cx="48" cy="20" r="4" fill="#1A1410"/>
    </svg>
  )
}
