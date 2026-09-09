import { preselectBooking } from '../lib/booking'
import { site } from '../data/site-content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { ArrowRightIcon } from './Icons'

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-ink py-24 sm:py-32">
      <div className="container-slick">
        <SectionHeading
          eyebrow="Services & Pricing"
          title={
            <>
              Straight to the <span className="text-gold-gradient">point.</span>
            </>
          }
          sub="No fluff. Every cut is done the same way — your time respected, your line sharp, your finish clean. Tap any service to book it."
        />

        <ul className="mt-14 border-t border-smoke">
          {site.services.map((s, i) => (
            <Reveal as="li" key={s.id}>
              <button
                type="button"
                onClick={() => preselectBooking({ serviceId: s.id })}
                className="group w-full cursor-pointer border-b border-smoke py-6 text-left transition-colors duration-200 hover:bg-coal/50 sm:py-7"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <span className="hidden font-mono text-xs text-ashtray/60 sm:block" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-bone sm:text-3xl">
                        {s.name}
                      </h3>
                      {s.tag ? (
                        <span className="border border-gold/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                          {s.tag}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ashtray">{s.description}</p>
                  </div>
                  <div className="flex items-center gap-5 sm:justify-end">
                    <span className="font-mono text-xs uppercase tracking-widest text-ashtray/70">{s.duration}</span>
                    <span className="min-w-14 text-right font-mono text-xl text-gold">{s.price}</span>
                    <span
                      className="hidden text-gold transition-transform duration-200 group-hover:translate-x-1 sm:inline-block"
                      aria-hidden="true"
                    >
                      <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={1}>
          <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.25em] text-ashtray">
            Not sure which service? Book and we'll point you right.
          </p>
        </Reveal>
      </div>
    </section>
  )
}