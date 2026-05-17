import { useId } from 'react'

const STROKE = 'var(--accent)'

const svgProps = {
  width: 80,
  height: 80,
  viewBox: '0 0 80 80',
  fill: 'none' as const,
  'aria-hidden': true,
}

/** Web & WordPress — browser window + typing code lines */
export function LineIcon() {
  return (
    <svg {...svgProps} className="service-icon service-icon--web">
      <rect x="11" y="15" width="58" height="50" rx="5" stroke={STROKE} strokeWidth="2" />
      <line x1="11" y1="27" x2="69" y2="27" stroke={STROKE} strokeWidth="2" />
      <circle cx="18" cy="21" r="2" fill={STROKE} className="service-web-dot service-web-dot--1" />
      <circle cx="26" cy="21" r="2" fill={STROKE} className="service-web-dot service-web-dot--2" />
      <circle cx="34" cy="21" r="2" fill={STROKE} className="service-web-dot service-web-dot--3" />
      <line
        x1="18"
        y1="38"
        x2="48"
        y2="38"
        pathLength={1}
        stroke={STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        className="service-web-code service-web-code--1"
      />
      <line
        x1="18"
        y1="46"
        x2="58"
        y2="46"
        pathLength={1}
        stroke={STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        className="service-web-code service-web-code--2"
      />
      <line
        x1="18"
        y1="54"
        x2="40"
        y2="54"
        pathLength={1}
        stroke={STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        className="service-web-code service-web-code--3"
      />
      <line
        x1="41"
        y1="46"
        x2="41"
        y2="54"
        stroke={STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        className="service-web-cursor"
      />
    </svg>
  )
}

/** App development — phone with pulsing UI bars */
export function CrossIcon() {
  const clipId = useId()

  return (
    <svg {...svgProps} className="service-icon service-icon--app">
      <rect x="26" y="10" width="28" height="60" rx="6" stroke={STROKE} strokeWidth="2" />
      <rect x="30" y="18" width="20" height="34" rx="2" stroke={STROKE} strokeWidth="1.5" opacity="0.45" />
      <defs>
        <clipPath id={clipId}>
          <rect x="31" y="19" width="18" height="32" rx="1.5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect
          x="34"
          y="44"
          width="4"
          height="7"
          rx="0.5"
          fill={STROKE}
          className="service-app-bar service-app-bar--1"
        />
        <rect
          x="39"
          y="40"
          width="4"
          height="11"
          rx="0.5"
          fill={STROKE}
          className="service-app-bar service-app-bar--2"
        />
        <rect
          x="44"
          y="42"
          width="4"
          height="9"
          rx="0.5"
          fill={STROKE}
          className="service-app-bar service-app-bar--3"
        />
      </g>
      <circle cx="40" cy="62" r="2.5" fill={STROKE} className="service-app-home" />
    </svg>
  )
}

/** Graphic & UI — shapes + pen curve */
export function ArcIcon() {
  return (
    <svg {...svgProps} className="service-icon service-icon--design">
      <g className="service-design-shape service-design-shape--circle">
        <circle cx="26" cy="50" r="12" stroke={STROKE} strokeWidth="2" />
      </g>
      <g className="service-design-shape service-design-shape--square">
        <rect x="44" y="18" width="20" height="20" stroke={STROKE} strokeWidth="2" />
      </g>
      <g className="service-design-shape service-design-shape--triangle">
        <path
          d="M 50 62 L 62 42 L 74 62 Z"
          stroke={STROKE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M 18 28 Q 40 12 58 30"
        pathLength={1}
        stroke={STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        className="service-design-curve"
      />
      <g className="service-design-pen-tip">
        <circle cx="58" cy="30" r="2.5" fill={STROKE} />
      </g>
    </svg>
  )
}

/** Video & VFX — player with pulse + scan line */
export function FrameIcon() {
  const clipId = useId()

  return (
    <svg {...svgProps} className="service-icon service-icon--video">
      <defs>
        <clipPath id={clipId}>
          <rect x="14" y="26" width="52" height="32" rx="2" />
        </clipPath>
      </defs>
      <rect x="12" y="20" width="56" height="40" rx="4" stroke={STROKE} strokeWidth="2" />
      <line
        x1="16"
        y1="24"
        x2="52"
        y2="24"
        pathLength={1}
        stroke={STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        className="service-video-progress"
      />
      <g clipPath={`url(#${clipId})`}>
        <g className="service-video-play-wrap">
          <polygon points="36,34 36,50 50,42" fill={STROKE} />
        </g>
        <line
          x1="14"
          y1="27"
          x2="66"
          y2="27"
          stroke={STROKE}
          strokeWidth="2"
          opacity="0.25"
          className="service-video-scan"
        />
      </g>
    </svg>
  )
}
