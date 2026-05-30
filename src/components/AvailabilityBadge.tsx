import { useTranslation } from 'react-i18next'

export const AVAILABILITY: 'available' | 'limited' | 'booked' = 'available'

const config = {
  available: {
    color: '#22c55e',
    label: { en: 'Available for projects', de: 'Verfügbar für Projekte', ro: 'Disponibil pentru proiecte' },
  },
  limited: {
    color: '#F0B429',
    label: { en: 'Limited availability', de: 'Begrenzt verfügbar', ro: 'Disponibilitate limitată' },
  },
  booked: {
    color: '#ef4444',
    label: { en: 'Currently booked', de: 'Derzeit ausgebucht', ro: 'Momentan rezervat' },
  },
}

const shortLabel = { available: 'OPEN', limited: 'LIMITED', booked: 'BOOKED' }

export default function AvailabilityBadge({ variant = 'navbar' }: { variant?: 'navbar' | 'footer' }) {
  const { i18n } = useTranslation()
  const lang = i18n.language.slice(0, 2) as 'en' | 'de' | 'ro'
  const status = config[AVAILABILITY]

  if (variant === 'navbar') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '5px 12px', borderRadius: 999,
        border: `1px solid ${status.color}30`,
        background: `${status.color}0A`,
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: status.color,
          animation: AVAILABILITY === 'available' ? 'availPulse 2s ease-in-out infinite' : 'none',
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: 9, letterSpacing: '.1em',
          color: status.color, fontFamily: "'JetBrains Mono', monospace",
          textTransform: 'uppercase',
        }}>
          {shortLabel[AVAILABILITY]}
        </span>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 7, height: 7, borderRadius: '50%',
        background: status.color,
        animation: AVAILABILITY === 'available' ? 'availPulse 2s ease-in-out infinite' : 'none',
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: 10, letterSpacing: '.08em',
        color: 'rgba(245,240,232,.55)',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {status.label[lang] || status.label.en}
      </span>
    </div>
  )
}
