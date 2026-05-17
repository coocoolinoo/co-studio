type LogoWordmarkProps = {
  className?: string
}

export default function LogoWordmark({ className = '' }: LogoWordmarkProps) {
  return (
    <svg
      viewBox="0 0 180 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-7 w-auto md:h-8 ${className}`}
      aria-label="co-studio"
    >
      <text
        x="0"
        y="26"
        fill="currentColor"
        fontFamily="'Barlow Condensed', sans-serif"
        fontSize="28"
        fontWeight="900"
        fontStyle="italic"
        letterSpacing="-0.02em"
      >
        co-studio
      </text>
    </svg>
  )
}
