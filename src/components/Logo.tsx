interface LogoProps {
  variant?: 'light' | 'dark' | 'secondary-light' | 'secondary-dark' | 'accent'
  showWordmark?: boolean
  size?: number
}

export default function Logo({ variant = 'light', size = 48 }: LogoProps) {
  if (variant === 'secondary-light') {
    return (
      <svg viewBox="0 0 96 96" width={size} height={size} role="img" aria-label="co-studio logo">
        <rect x="0" y="0" width="96" height="96" rx="22" fill="#1A1410"/>
        <line x1="52" y1="16" x2="28" y2="80" stroke="#F5F0E8" strokeWidth="10" strokeLinecap="round"/>
        <line x1="68" y1="16" x2="44" y2="80" stroke="#E8522A" strokeWidth="10" strokeLinecap="round"/>
      </svg>
    )
  }

  if (variant === 'secondary-dark') {
    return (
      <svg viewBox="0 0 96 96" width={size} height={size} role="img" aria-label="co-studio logo">
        <rect x="0" y="0" width="96" height="96" rx="22" fill="#E8522A"/>
        <line x1="52" y1="16" x2="28" y2="80" stroke="#1A1410" strokeWidth="10" strokeLinecap="round"/>
        <line x1="68" y1="16" x2="44" y2="80" stroke="#1A1410" strokeWidth="10" strokeLinecap="round"/>
      </svg>
    )
  }

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

  // light + accent → primary light
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
