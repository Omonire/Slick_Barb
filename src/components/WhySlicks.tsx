import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { CalendarIcon, DiamondIcon, RazorIcon, ShieldIcon } from './Icons'

const pillars = [
  {
    icon: RazorIcon,
    title: 'Experienced Barbers',
    body: 'Barbers who have put in the years — fades, lineups, and classic cuts done right, first time.',
  },
  {
    icon: DiamondIcon,
    title: 'Premium Service',
    body: 'Hot towel finishes, precise detailing, and a standard that treats every chair like a signature appointment.',
  },
  {
    icon: ShieldIcon,
    title: 'Clean, Professional Environment',
    body: 'Sanitized tools, fresh capes, and a studio kept to a standard you can feel the moment you walk in.',
  },
  {
    icon: CalendarIcon,
    title: 'Easy Booking',
    body: 'Online appointment in under a minute. Open every day, noon to 11 — walk-ins welcome too.',
  },
]

export function WhySlicks() {
  return (
    <section id="why" className="scroll-mt-20 border-y border-smoke bg-coal py-24 sm:py-32">
      <div className="container-slick">
        <SectionHeading
          eyebrow="Why Slicks"
          title={
            <>
              Built different, <span className="text-gold-gradient">on purpose.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-px border border-smoke bg-smoke sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="h-full">
              <div className="flex h-full flex-col bg-coal p-7 transition-colors duration-300 hover:bg-ink">
                <span className="font-mono text-xs text-ashtray/50" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p.icon className="mt-6 text-gold" />
                <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-bone">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ashtray">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}