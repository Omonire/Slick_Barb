import { useEffect, useState, useRef } from 'react'
import { fetchBookings, type BookingRecord } from '../lib/booking'
import { site } from '../data/site-content'

const POLL_MS = 5_000

const statusColor: Record<string, string> = {
  pending: 'bg-gold/20 text-gold',
  confirmed: 'bg-green-500/20 text-green-400',
  completed: 'bg-ashtray/20 text-ashtray',
  cancelled: 'bg-red-500/20 text-red-400',
}

function to12h(t: string | null): string {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const hour = h % 12 === 0 ? 12 : h % 12
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`
}

function formatDate(d: string | null): string {
  if (!d) return ''
  const date = new Date(d + 'T00:00:00')
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

export function Admin() {
  const [bookings, setBookings] = useState<BookingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    let active = true

    async function load() {
      const data = await fetchBookings(site.api.endpoint)
      if (!active || !mountedRef.current) return
      setBookings(data)
      setLoading(false)
      setLastRefresh(new Date())
    }

    load()
    const id = setInterval(load, POLL_MS)
    return () => { active = false; clearInterval(id) }
  }, [])

  return (
    <div className="min-h-screen bg-ink text-bone">
      <header className="border-b border-smoke bg-coal">
        <div className="container-slick flex items-center justify-between py-4">
          <div>
            <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-bone">
              Slicks <span className="text-gold">Admin</span>
            </h1>
            {lastRefresh && (
              <p className="font-mono text-xs text-ashtray">
                Last refresh: {lastRefresh.toLocaleTimeString()}
              </p>
            )}
          </div>
          <a
            href="/"
            className="rounded-lg border border-smoke px-4 py-2 font-mono text-xs uppercase tracking-wider text-ashtray transition hover:border-gold hover:text-gold"
          >
            Back to site
          </a>
        </div>
      </header>

      <main className="container-slick py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-mono text-sm uppercase tracking-wider text-ashtray">
            Bookings ({bookings.length})
          </h2>
          <span className="font-mono text-xs text-ashtray">Auto-refresh: 5s</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-xl text-ashtray">No bookings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-smoke font-mono text-xs uppercase tracking-wider text-ashtray">
                  <th className="pb-3 pr-4">Ref</th>
                  <th className="pb-3 pr-4">Client</th>
                  <th className="pb-3 pr-4">Service</th>
                  <th className="pb-3 pr-4">Barber</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Time</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Contact</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-smoke/50 transition hover:bg-coal-soft">
                    <td className="whitespace-nowrap py-3 pr-4 font-mono text-gold">{b.reference}</td>
                    <td className="whitespace-nowrap py-3 pr-4 font-medium text-bone">{b.client_name}</td>
                    <td className="whitespace-nowrap py-3 pr-4 text-stone-mist">{b.service_name ?? b.service_id}</td>
                    <td className="whitespace-nowrap py-3 pr-4 text-stone-mist">{b.barber_name ?? '—'}</td>
                    <td className="whitespace-nowrap py-3 pr-4 text-stone-mist">{formatDate(b.booking_date)}</td>
                    <td className="whitespace-nowrap py-3 pr-4 text-stone-mist">{to12h(b.booking_time)}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-xs uppercase ${statusColor[b.status] ?? 'bg-smoke text-ashtray'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-3 font-mono text-xs text-ashtray">{b.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
