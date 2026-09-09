import { site } from '../data/site-content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { ClockIcon, FacebookIcon, InstagramIcon, PhoneIcon, PinIcon, TikTokIcon } from './Icons'
import type { JSX } from 'react'

const socialIcons: Record<string, (props: { className?: string }) => JSX.Element> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
}

export function Contact() {
  return (
    <section id="location" className="scroll-mt-20 bg-ink py-24 sm:py-32">
      <div className="container-slick">
        <SectionHeading
          eyebrow="Location & Contact"
          title={
            <>
              Find us in <span className="text-gold-gradient">San Antonio.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex flex-col gap-px bg-smoke border border-smoke">
              <div className="flex items-start gap-4 bg-coal p-6">
                <PinIcon className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ashtray">The Studio</h3>
                  <p className="mt-2 font-display text-lg font-bold text-bone">{site.brand.name} {site.brand.studio}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ashtray">
                    {site.contact.address}
                    <br />
                    {site.contact.addressLine2}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-coal p-6">
                <ClockIcon className="mt-0.5 shrink-0 text-gold" />
                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ashtray">Hours</h3>
                    <p className="mt-2 text-sm text-bone">
                      {site.hours.days}
                    </p>
                    <p className="text-sm text-ashtray">
                      {site.hours.open} – {site.hours.close}
                    </p>
                  </div>
                  <div className="sm:text-left">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ashtray">Status</h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">{site.hours.note}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-coal p-6">
                <PhoneIcon className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ashtray">Call or text</h3>
                  <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`} className="mt-2 block cursor-pointer text-sm text-bone underline-offset-4 transition-colors hover:text-gold">
                    {site.contact.phone}
                  </a>
                  <a href={`mailto:${site.contact.email}`} className="mt-1 block cursor-pointer text-sm text-ashtray underline-offset-4 transition-colors hover:text-gold">
                    {site.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-coal p-6">
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ashtray">Follow the work</h3>
                  <div className="mt-3 flex gap-3">
                    {site.socials.map((s) => {
                      const Icon = socialIcons[s.label] ?? InstagramIcon
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="inline-flex size-10 cursor-pointer items-center justify-center border border-smoke-light text-ashtray transition-colors duration-200 hover:border-gold hover:text-gold"
                        >
                          <Icon />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="flex h-full flex-col">
              <div className="relative flex-1 overflow-hidden border border-smoke bg-coal">
                <iframe
                  title="Map — Slicks Barber Studio, San Antonio, Texas"
                  src={site.contact.mapEmbedUrl}
                  loading="lazy"
                  className="absolute inset-0 size-full saturate-[0.85]"
                  style={{ filter: 'invert(0.9) hue-rotate(180deg) contrast(0.9)' }}
                />
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ashtray">
                  {site.contact.city} · {site.hours.open} – {site.hours.close}
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Slicks+Barber+Studio+San+Antonio,+TX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center justify-center border border-smoke-light px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.15em] text-bone transition-colors duration-200 hover:border-gold hover:text-gold"
                >
                  Get directions
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}