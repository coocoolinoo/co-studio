const CLIENTS = [
  { name: 'React', weight: 'font-bold' },
  { name: 'WordPress', weight: 'font-normal' },
  { name: 'Angular', weight: 'font-light' },
  { name: 'Swift', weight: 'font-bold' },
  { name: 'Expo', weight: 'font-normal' },
  { name: 'TypeScript', weight: 'font-light' },
  { name: 'Python', weight: 'font-bold' },
  { name: 'Docker', weight: 'font-normal' },
  { name: 'SQL', weight: 'font-light' },
  { name: 'Figma', weight: 'font-bold' },
  { name: 'Ionic', weight: 'font-normal' },
  { name: 'Java', weight: 'font-light' },
]

function TickerContent() {
  return (
    <>
      {CLIENTS.map((client, i) => (
        <span
          key={`${client.name}-${i}`}
          className={`inline-flex items-center font-mono text-base tracking-wide text-near-black uppercase ${client.weight}`}
        >
          {i > 0 && <span className="mx-6 text-near-black/35">•</span>}
          {client.name}
        </span>
      ))}
    </>
  )
}

type ClientTickerProps = {
  className?: string
}

export default function ClientTicker({ className = '' }: ClientTickerProps) {
  return (
    <div
      className={`client-ticker relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-black/10 bg-[#f0ede8] ${className}`.trim()}
    >
      <div className="client-ticker-track flex h-16 items-center">
        <div className="flex shrink-0 items-center px-8">
          <TickerContent />
        </div>
        <div className="flex shrink-0 items-center px-8" aria-hidden>
          <TickerContent />
        </div>
      </div>
    </div>
  )
}
