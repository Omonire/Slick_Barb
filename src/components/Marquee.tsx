const items = [
  'Skin Fades',
  'Beard Sculpting',
  'Hot Towel Shaves',
  'Sharp Lineups',
  'Classic Cuts',
  'Kids Cuts',
  'Signature Cuts',
]

export function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-smoke bg-coal py-3.5" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10 pr-10">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-ashtray">
            {item}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}