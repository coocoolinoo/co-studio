import { useTranslation } from 'react-i18next'

export const AVAILABILITY: 'available' | 'limited' | 'booked' = 'available'

const STATUS_KEYS = {
  available: 'available',
  limited: 'limitedLabel',
  booked: 'bookedLabel',
} as const

const SHORT_KEYS = {
  available: 'open',
  limited: 'limited',
  booked: 'booked',
} as const

const COLORS = {
  available: '#22c55e',
  limited: '#F0B429',
  booked: '#ef4444',
}

export default function AvailabilityBadge({ variant = 'navbar' }: { variant?: 'navbar' | 'footer' }) {
  const { t } = useTranslation()
  const color = COLORS[AVAILABILITY]

  if (variant === 'navbar') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '5px 12px', borderRadius: 999,
        border: `1px solid ${color}30`,
        background: `${color}0A`,
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: color,
          animation: AVAILABILITY === 'available' ? 'availPulse 2s ease-in-out infinite' : 'none',
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: 9, letterSpacing: '.1em',
          color, fontFamily: "'JetBrains Mono', monospace",
          textTransform: 'uppercase',
        }}>
          {t(`availability.${SHORT_KEYS[AVAILABILITY]}`)}
        </span>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 7, height: 7, borderRadius: '50%',
        background: color,
        animation: AVAILABILITY === 'available' ? 'availPulse 2s ease-in-out infinite' : 'none',
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: 10, letterSpacing: '.08em',
        color: 'rgba(245,240,232,.55)',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {t(`availability.${STATUS_KEYS[AVAILABILITY]}`)}
      </span>
    </div>
  )
}
