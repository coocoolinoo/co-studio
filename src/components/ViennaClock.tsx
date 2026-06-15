import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface ViennaClockProps {
  variant?: 'navbar' | 'footer'
}

export default function ViennaClock({ variant = 'navbar' }: ViennaClockProps) {
  const { t } = useTranslation()
  const [time, setTime] = useState<string>('')
  const [seconds, setSeconds] = useState<number>(0)
  const [isDay, setIsDay] = useState<boolean>(true)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const vienna = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Vienna' }))
      const h = vienna.getHours()
      const m = String(vienna.getMinutes()).padStart(2, '0')
      const s = vienna.getSeconds()
      const hDisplay = String(h).padStart(2, '0')
      setTime(`${hDisplay}:${m}`)
      setSeconds(s)
      setIsDay(h >= 7 && h < 21)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) return null

  if (variant === 'footer') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: isDay ? '#22c55e' : '#F0B429',
          animation: 'clockPulse 2s ease-in-out infinite',
          flexShrink: 0,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <div style={{
            fontSize: 10, letterSpacing: '.1em',
            color: 'rgba(245,240,232,.55)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            <span style={{ color: 'rgba(245,240,232,.8)' }}>{time}</span>
            <span style={{
              color: '#E8522A',
              opacity: seconds % 2 === 0 ? 1 : 0.3,
              transition: 'opacity .15s',
              marginLeft: 1,
            }}>:</span>
            <span style={{ color: 'rgba(245,240,232,.35)' }}>
              {String(seconds).padStart(2, '0')}
            </span>
          </div>
          <div style={{
            fontSize: 8, letterSpacing: '.15em',
            color: 'rgba(245,240,232,.2)',
            textTransform: 'uppercase',
          }}>
            {t('meta.vienna')} {isDay ? '☀' : '🌙'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 7,
      fontFamily: "'JetBrains Mono', monospace",
      padding: '5px 12px',
      border: '1px solid rgba(26,20,16,.1)',
      borderRadius: 999,
      background: 'rgba(26,20,16,.03)',
    }}>
      <div style={{
        width: 6, height: 6, borderRadius: '50%',
        background: isDay ? '#22c55e' : '#F0B429',
        animation: 'clockPulse 2s ease-in-out infinite',
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: 10, letterSpacing: '.08em',
        color: 'rgba(26,20,16,.5)',
        fontVariantNumeric: 'tabular-nums',
      }}>
        <span style={{ color: 'rgba(26,20,16,.7)' }}>{time}</span>
        <span style={{
          color: '#E8522A',
          opacity: seconds % 2 === 0 ? 1 : 0.3,
          transition: 'opacity .15s',
        }}> :</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </span>
      <span style={{
        fontSize: 8, letterSpacing: '.12em',
        color: 'rgba(26,20,16,.3)',
        textTransform: 'uppercase',
      }}>VIE</span>
    </div>
  )
}
