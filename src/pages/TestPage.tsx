import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getServices, getCategories, getSiteContent, getHotDeals, type Service, type Category, type SiteContent } from '../lib/cms'


// ============================================================
// SEO COMPONENT
// ============================================================
function SEO({ title, description, url, image }: { title: string; description: string; url: string; image?: string }) {
  useEffect(() => {
    document.title = title
    
    const setMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:url', url, true)
    setMeta('og:type', 'website', true)
    if (image) setMeta('og:image', image, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    if (image) setMeta('twitter:image', image)
  }, [title, description, url, image])

  return null
}

// ============================================================
// JSON-LD STRUCTURED DATA
// ============================================================
function StructuredData({ site, services }: { site: SiteContent; services: Service[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    name: `${site.brand.name} ${site.brand.studio}`,
    description: `${site.brand.tagline} Premium barbershop in ${site.brand.city}.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address,
      addressLocality: site.brand.city.split(',')[0],
      addressRegion: 'TX',
    },
    telephone: site.contact.phone,
    email: site.contact.email,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: site.hours.open,
      closes: site.hours.close,
    },
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Barber Services',
      itemListElement: services.filter(s => s.active).map(s => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
        },
        price: s.price,
        priceCurrency: 'USD',
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ============================================================
// DYNAMIC HERO (uses CMS data)
// ============================================================
function DynamicHero({ site }: { site: SiteContent }) {
  return (
    <section className="relative flex min-h-[80svh] items-end overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-gradient-to-b from-coal to-ink" />
      <div className="container-slick relative z-10 pb-16 pt-24">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
          {site.brand.city} · {site.hours.open}–{site.hours.close}
        </p>
        <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.92] tracking-tight text-bone sm:text-7xl">
          Sharp Cuts.
          <br />
          <span className="text-gold-gradient">{site.brand.tagline.split('. ')[1] || 'Clean Confidence.'}</span>
        </h1>
        <p className="mt-6 max-w-md text-base text-stone-mist">
          {site.brand.name} {site.brand.studio} — premium grooming in {site.brand.city}.
        </p>
        <div className="mt-8 flex gap-3">
          <a href="#book" className="rounded-lg bg-gold px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-gold/80">
            Book Now
          </a>
          <a href="#services-test" className="rounded-lg border border-smoke px-6 py-3 font-mono text-sm uppercase tracking-wider text-ashtray transition hover:border-gold hover:text-gold">
            View Services
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// DYNAMIC SERVICES (uses CMS data)
// ============================================================
function DynamicServices({ services, categories }: { services: Service[]; categories: Category[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const filtered = selectedCategory === 'all' 
    ? services.filter(s => s.active) 
    : services.filter(s => s.active && s.category === selectedCategory)

  return (
    <section id="services-test" className="py-20 bg-ink">
      <div className="container-slick">
        <h2 className="text-center font-display text-4xl font-black uppercase tracking-tight text-bone">
          Our <span className="text-gold-gradient">Services</span>
        </h2>
        <p className="mt-3 text-center text-ashtray">Choose from our range of premium grooming services</p>
        
        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition ${
              selectedCategory === 'all' ? 'bg-gold text-ink' : 'border border-smoke text-ashtray hover:border-gold hover:text-gold'
            }`}
          >
            All
          </button>
          {categories.filter(c => c.active).sort((a, b) => a.order - b.order).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition ${
                selectedCategory === cat.id ? 'bg-gold text-ink' : 'border border-smoke text-ashtray hover:border-gold hover:text-gold'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-xl border border-smoke bg-coal p-6 transition-all hover:border-gold/50 hover:scale-[1.02]"
            >
              {service.hotDeal && (
                <span className="absolute -top-2 -right-2 rounded-full bg-gold px-3 py-1 font-mono text-[10px] font-bold uppercase text-ink">
                  🔥 Hot Deal
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-bone">{service.name}</h3>
              <p className="mt-2 text-sm text-ashtray">{service.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-gold">{service.price}</span>
                <span className="font-mono text-xs text-ashtray">{service.duration}</span>
              </div>
              <a
                href="#book"
                className="mt-4 block w-full rounded-lg border border-smoke py-2 text-center font-mono text-xs uppercase tracking-wider text-ashtray transition group-hover:border-gold group-hover:text-gold"
              >
                Book This
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// HOT DEALS BANNER
// ============================================================
function HotDealsBanner({ deals }: { deals: Service[] }) {
  if (deals.length === 0) return null
  
  return (
    <section className="bg-gold/10 border-y border-gold/20 py-8">
      <div className="container-slick">
        <h3 className="text-center font-mono text-sm uppercase tracking-wider text-gold mb-6">
          🔥 Hot Deals — Limited Time
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <div key={deal.id} className="rounded-xl border border-gold/30 bg-coal p-5 text-center">
              <h4 className="font-display text-lg font-bold text-bone">{deal.name}</h4>
              <p className="mt-1 text-sm text-ashtray">{deal.description}</p>
              <div className="mt-3 flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-bold text-gold">{deal.price}</span>
                <span className="font-mono text-xs text-ashtray">{deal.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// CONTACT FORM
// ============================================================
function ContactForm({ site }: { site: SiteContent }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    
    // Simulate sending (in production, connect to email API)
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
    setFormData({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section id="contact-test" className="py-20 bg-ink">
      <div className="container-slick">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-black uppercase tracking-tight text-bone">
              Get in <span className="text-gold-gradient">Touch</span>
            </h2>
            <p className="mt-4 text-ashtray">Have a question? Want to book? Drop us a message.</p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-gold/10 text-gold">📍</span>
                <div>
                  <p className="text-bone">{site.contact.address}</p>
                  <p className="text-sm text-ashtray">{site.contact.addressLine2}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-gold/10 text-gold">📞</span>
                <p className="text-bone">{site.contact.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-gold/10 text-gold">✉️</span>
                <p className="text-bone">{site.contact.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-gold/10 text-gold">🕐</span>
                <div>
                  <p className="text-bone">{site.hours.days}</p>
                  <p className="text-sm text-ashtray">{site.hours.open} – {site.hours.close}</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-smoke bg-coal p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-mono text-xs uppercase text-ashtray">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-smoke bg-ink px-3 py-2 text-bone font-mono text-sm outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs uppercase text-ashtray">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-smoke bg-ink px-3 py-2 text-bone font-mono text-sm outline-none focus:border-gold"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs uppercase text-ashtray">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-smoke bg-ink px-3 py-2 text-bone font-mono text-sm outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs uppercase text-ashtray">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-lg border border-smoke bg-ink px-3 py-2 text-bone font-mono text-sm outline-none focus:border-gold resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-lg bg-gold px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-gold/80 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Sent!' : 'Send Message'}
            </button>
            {status === 'sent' && (
              <p className="text-center text-sm text-green-400">Message sent! We'll get back to you soon.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// REVIEWS (dynamic from admin)
// ============================================================
function DynamicReviews() {
  const [reviews, setReviews] = useState<{ name: string; service: string; quote: string; rating: number }[]>([])
  
  useEffect(() => {
    const stored = localStorage.getItem('slick_cms_reviews')
    if (stored) {
      setReviews(JSON.parse(stored))
    } else {
      // Default reviews
      setReviews([
        { name: 'Marcus J.', service: 'Skin Fade', quote: 'Best fade I\'ve ever had. Clean, precise, and the vibe is unmatched.', rating: 5 },
        { name: 'David R.', service: 'Haircut + Beard', quote: 'The attention to detail is insane. Walk out looking brand new every time.', rating: 5 },
        { name: 'Chris L.', service: 'Signature Cut', quote: 'VIP experience is worth every penny. Hot towel, perfect cut, and great conversation.', rating: 5 },
      ])
    }
  }, [])

  return (
    <section className="py-20 bg-coal">
      <div className="container-slick">
        <h2 className="text-center font-display text-4xl font-black uppercase tracking-tight text-bone">
          What Clients <span className="text-gold-gradient">Say</span>
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <div key={i} className="rounded-xl border border-smoke bg-ink p-6">
              <div className="flex text-gold">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <p className="mt-4 text-stone-mist italic">"{review.quote}"</p>
              <div className="mt-4 border-t border-smoke pt-4">
                <p className="font-medium text-bone">{review.name}</p>
                <p className="font-mono text-xs text-ashtray">{review.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// PERFORMANCE STATS
// ============================================================
function PerformanceStats() {
  const [stats, setStats] = useState({ fcp: 0, lcp: 0, cls: 0 })

  useEffect(() => {
    // Measure performance
    const paint = performance.getEntriesByType('paint')
    const fcp = paint.find(e => e.name === 'first-contentful-paint')
    
    // Use PerformanceObserver for LCP
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        setStats(prev => ({ ...prev, lcp: Math.round(lastEntry.startTime) }))
      })
      observer.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch {}

    setStats(prev => ({ ...prev, fcp: fcp ? Math.round(fcp.startTime) : 0 }))
  }, [])

  return (
    <section className="py-8 bg-coal border-t border-smoke">
      <div className="container-slick">
        <div className="flex flex-wrap items-center justify-center gap-8 font-mono text-xs text-ashtray">
          <span>FCP: <span className="text-gold">{stats.fcp}ms</span></span>
          <span>LCP: <span className="text-gold">{stats.lcp}ms</span></span>
          <span>CLS: <span className="text-gold">{stats.cls.toFixed(3)}</span></span>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// MAIN TEST PAGE
// ============================================================
export function TestPage() {
  const [site, setSite] = useState<SiteContent>(getSiteContent)
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const hotDeals = useMemo(() => getHotDeals(), [services])

  useEffect(() => {
    setSite(getSiteContent())
    setServices(getServices())
    setCategories(getCategories())
  }, [])

  return (
    <>
      <SEO
        title={`${site.brand.name} ${site.brand.studio} — ${site.brand.tagline}`}
        description={`${site.brand.name} ${site.brand.studio} is ${site.brand.city}'s home for precise fades, sharp lineups, and premium grooming.`}
        url="https://slick-barb.vercel.app"
      />
      <StructuredData site={site} services={services} />

      <div className="bg-ink text-bone min-h-screen">
        {/* Test Route Banner */}
        <div className="bg-gold py-2 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
            🧪 Test Route — New Features Preview
          </span>
          <Link to="/" className="ml-4 font-mono text-xs text-ink/70 underline hover:text-ink">
            ← Back to Live Site
          </Link>
        </div>

        <DynamicHero site={site} />
        <HotDealsBanner deals={hotDeals} />
        <DynamicServices services={services} categories={categories} />
        <DynamicReviews />
        <ContactForm site={site} />
        <PerformanceStats />

        {/* Footer */}
        <footer className="border-t border-smoke bg-coal py-8">
          <div className="container-slick text-center">
            <p className="font-mono text-xs text-ashtray">
              © {new Date().getFullYear()} {site.brand.name} {site.brand.studio} · {site.brand.city}
            </p>
            <div className="mt-4 flex justify-center gap-4">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-ashtray hover:text-gold transition">
                  {s.label}
                </a>
              ))}
            </div>
            <Link to="/admin/login" className="mt-4 inline-block font-mono text-[10px] text-ashtray/50 hover:text-gold transition">
              Admin
            </Link>
          </div>
        </footer>
      </div>
    </>
  )
}
