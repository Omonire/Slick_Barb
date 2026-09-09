import { site } from '../data/site-content'
import { images } from '../data/images'
import { btnGhost, btnGold } from '../lib/ui'
import { Reveal } from './Reveal'
import { ArrowRightIcon, StarIcon } from './Icons'
import { useRef, useState } from 'react'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* Video Background */}
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={images.hero}
          onError={() => setVideoError(true)}
          className="absolute inset-0 size-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/barber.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fallback image when video fails */}
      {videoError && (
        <img
          src={images.hero}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-transparent" aria-hidden="true" />

      <div className="container-slick relative z-10 pb-24 pt-36 sm:pb-28">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-gold sm:text-xs">
            <span className="inline-block size-1.5 rounded-full bg-gold" aria-hidden="true" />
            {site.contact.city} · Open Daily {site.hours.open}–{site.hours.close}
          </p>
        </Reveal>

        <Reveal delay={1}>
          <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.92] tracking-tight text-bone sm:text-7xl lg:text-8xl">
            Sharp Cuts.
            <br />
            <span className="text-gold-gradient">Clean Confidence.</span>
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone-mist sm:text-lg">
            {site.brand.studio} is San Antonio's home for precise fades, sharp lineups, and premium grooming — cut,
            styled, and finished to a standard that never slips.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#book" className={btnGold}>
              Book an Appointment
              <ArrowRightIcon className="size-4" />
            </a>
            <a href="#services" className={btnGhost}>
              View Services
            </a>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-smoke pt-6">
            <span className="flex items-center gap-2">
              <span className="flex text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="size-3.5" />
                ))}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-ashtray">
                {site.reviewStats.average.toFixed(1)} rated
              </span>
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-ashtray">Walk-ins &amp; appointments</span>
            <span className="font-mono text-xs uppercase tracking-widest text-ashtray">Premium grooming, every day 12–11</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
