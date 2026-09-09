import { images } from '../data/images'
import { site } from '../data/site-content'
import { preselectBooking } from '../lib/booking'
import { btnSm } from '../lib/ui'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export function Barbers() {
  return (
    <section id="barbers" className="scroll-mt-20 bg-ink py-24 sm:py-32">
      <div className="container-slick">
        <SectionHeading
          eyebrow="Meet the Barbers"
          title={
            <>
              The hands behind <span className="text-gold-gradient">the sharp.</span>
            </>
          }
          sub="Every barber at Slicks is a specialist — pick yours and book them directly."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.barbers.map((b, i) => (
            <Reveal key={b.id} delay={((i % 3) + 1) as 1 | 2 | 3 | 4}>
              <article className="group flex h-full flex-col border border-smoke bg-coal transition-colors duration-300 hover:border-gold/50">
                <div className="relative overflow-hidden">
                  <img
                    src={images.barbers[i] ?? images.barbers[0]}
                    alt={`${b.name} — ${b.specialty} at Slicks Barber Studio`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                  <span className="absolute left-3 top-3 border border-bone/20 bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-bone">{b.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{b.specialty}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ashtray">{b.bio}</p>
                  <button
                    type="button"
                    onClick={() => preselectBooking({ barberId: b.id })}
                    className={`${btnSm} mt-6 w-full`}
                  >
                    Book with {b.name}
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}