import { useState } from 'react'
import { isSoundEnabled } from '../utils/sound'

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(isSoundEnabled)

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    localStorage.setItem('co-studio-sound', next ? 'on' : 'off')
  }

  return (
    <button
      onClick={toggle}
      title={enabled ? 'Mute sounds' : 'Enable sounds'}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 112,
        zIndex: 1000,
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: `1.5px solid ${enabled ? 'rgba(232,82,42,.3)' : 'rgba(26,20,16,.15)'}`,
        background: enabled ? 'rgba(232,82,42,.1)' : 'rgba(245,240,232,.9)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        transition: 'all .2s',
        boxShadow: '0 4px 16px rgba(26,20,16,.1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#E8522A'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = enabled ? 'rgba(232,82,42,.3)' : 'rgba(26,20,16,.15)'
      }}
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  )
}
