import { useEffect, useState, useRef } from 'react'
import { fetchBookings, type BookingRecord } from '../lib/booking'
import { site } from '../data/site-content'

const POLL_MS = 5_000
const VALID_USER = 'admin'
const VALID_PASS = '1234'

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

function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (username === VALID_USER && password === VALID_PASS) {
      sessionStorage.setItem('slick_admin_auth', 'true')
      onLogin()
    } else {
      setError('Invalid username or password')
      setPassword('')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm rounded-2xl border border-smoke bg-coal p-8">
        <h1 className="mb-2 text-center font-display text-2xl font-bold uppercase tracking-tight text-bone">
          Slicks <span className="text-gold">Admin</span>
        </h1>
        <p className="mb-6 text-center font-mono text-xs text-ashtray">Sign in to manage bookings</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-ashtray">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError('') }}
              className="w-full rounded-lg border border-smoke bg-ink px-3 py-2 text-bone font-mono text-sm outline-none transition focus:border-gold"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-ashtray">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              className="w-full rounded-lg border border-smoke bg-ink px-3 py-2 text-bone font-mono text-sm outline-none transition focus:border-gold"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-center font-mono text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-gold px-4 py-2.5 font-mono text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-gold/80"
          >
            Sign In
          </button>
        </form>

        <a
          href="/"
          className="mt-4 block text-center font-mono text-xs text-ashtray transition hover:text-gold"
        >
          ← Back to site
        </a>
      </div>
    </div>
  )
}

function AdminDashboard() {
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

  function handleLogout() {
    sessionStorage.removeItem('slick_admin_auth')
    window.location.hash = ''
    window.location.reload()
  }

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
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="rounded-lg border border-smoke px-4 py-2 font-mono text-xs uppercase tracking-wider text-ashtray transition hover:border-gold hover:text-gold"
            >
              Back to site
            </a>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-smoke px-4 py-2 font-mono text-xs uppercase tracking-wider text-ashtray transition hover:border-red-500 hover:text-red-400"
            >
              Logout
            </button>
          </div>
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

export function Admin() {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem('slick_admin_auth') === 'true'
  })

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />
  }

  return <AdminDashboard />
}
