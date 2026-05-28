import { useEffect, useState } from 'react'

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'curtain' | 'build' | 'text' | 'exit'>('curtain')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('build'),  300)
    const t2 = setTimeout(() => setPhase('text'),   2000)
    const t3 = setTimeout(() => setPhase('exit'),   3100)
    const t4 = setTimeout(() => onComplete(),       3900)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#1A1410', overflow: 'hidden',
    }}>

      {/* TERRACOTTA CURTAIN */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#E8522A',
        transformOrigin: 'top',
        animation: phase === 'curtain' ? 'none' : 'curtainUp 0.9s cubic-bezier(0.76,0,0.24,1) forwards',
        zIndex: 2,
      }} />

      {/* LOGO ONLY */}
      <div style={{
        position: 'relative', zIndex: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: phase === 'curtain' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(0.85)' : 'scale(1)',
        transition: phase === 'exit'
          ? 'transform 0.6s cubic-bezier(0.76,0,0.24,1), opacity 0.6s ease'
          : 'opacity 0.01s',
      }}>

        <svg width="96" height="96" viewBox="0 0 96 96" style={{ overflow: 'visible' }}>

          {/* Outer ring draws itself */}
          <circle
            cx="48" cy="48" r="46"
            fill="none" stroke="#F5F0E8" strokeWidth="3.5"
            style={{
              strokeDasharray: 289,
              strokeDashoffset: phase === 'curtain' ? 289 : 0,
              transition: 'stroke-dashoffset 0.7s cubic-bezier(0.76,0,0.24,1) 0s',
            }}
          />

          {/* Inner ring draws itself */}
          <circle
            cx="48" cy="48" r="28"
            fill="none" stroke="#F5F0E8" strokeWidth="3.5"
            style={{
              strokeDasharray: 176,
              strokeDashoffset: phase === 'curtain' || phase === 'build' ? 176 : 0,
              transition: 'stroke-dashoffset 0.6s cubic-bezier(0.76,0,0.24,1) 0.5s',
            }}
          />

          {/* Right half terracotta fill */}
          <clipPath id="intro-right">
            <rect x="48" y="0" width="48" height="96"/>
          </clipPath>
          <circle
            cx="48" cy="48" r="46"
            fill="#E8522A"
            clipPath="url(#intro-right)"
            style={{
              opacity: phase === 'curtain' || phase === 'build' ? 0 : 1,
              transition: 'opacity 0.01s 0.85s',
            }}
          />

          {/* Inner dark fill */}
          <circle
            cx="48" cy="48" r="28"
            fill="#1A1410"
            style={{
              opacity: phase === 'curtain' || phase === 'build' ? 0 : 1,
              transition: 'opacity 0.01s 0.85s',
            }}
          />

          {/* Outer dot — pops in */}
          <circle
            cx="48" cy="20" r="9"
            fill="#F5F0E8"
            style={{
              opacity: phase === 'curtain' || phase === 'build' ? 0 : 1,
              transform: phase === 'curtain' || phase === 'build' ? 'scale(0)' : 'scale(1)',
              transformOrigin: '48px 20px',
              transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 1s, opacity 0.01s 1s',
            }}
          />

          {/* Inner dot */}
          <circle
            cx="48" cy="20" r="4"
            fill="#E8522A"
            style={{
              opacity: phase === 'curtain' || phase === 'build' ? 0 : 1,
              transform: phase === 'curtain' || phase === 'build' ? 'scale(0)' : 'scale(1)',
              transformOrigin: '48px 20px',
              transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1) 1.15s, opacity 0.01s 1.15s',
            }}
          />

        </svg>
      </div>

      {/* EXIT OVERLAY */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#1A1410',
        opacity: phase === 'exit' ? 1 : 0,
        transition: phase === 'exit' ? 'opacity 0.7s ease 0.4s' : 'none',
        zIndex: 4,
        pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes curtainUp {
          from { transform: scaleY(1); }
          to   { transform: scaleY(0); }
        }
      `}</style>
    </div>
  )
}
