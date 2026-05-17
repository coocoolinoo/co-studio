export function WorkMarqueeRow({ text }: { text: string }) {
  const parts = text.split('*')
  return (
    <>
      {parts.map((part, i) => (
        <span key={`${part}-${i}`}>
          {part}
          {i < parts.length - 1 && <span className="work-marquee-star">*</span>}
        </span>
      ))}
    </>
  )
}
