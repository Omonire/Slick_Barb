import postgres from 'postgres'

const DATABASE_URL = process.env['DATABASE_URL']

function newReference(): string {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `SLK-${rand}`
}

function isValidDateTime(date: unknown, time: unknown): boolean {
  if (typeof date !== 'string' || typeof time !== 'string') return false
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
  if (!/^\d{2}:\d{2}$/.test(time)) return false
  return true
}

async function storeBooking(record: {
  reference: string
  service_id: string
  service_name: string | null
  barber_id: string | null
  barber_name: string | null
  booking_date: string
  booking_time: string
  client_name: string
  contact: string
  notes: string
  status: string
}): Promise<boolean> {
  if (!DATABASE_URL) return false
  let sql: ReturnType<typeof postgres> | undefined
  try {
    sql = postgres(DATABASE_URL, { max: 1, connect_timeout: 8 })
    const rows = await sql`
      INSERT INTO public.bookings
        (reference, service_id, service_name, barber_id, barber_name, booking_date, booking_time, client_name, contact, notes, status)
      VALUES
        (${record.reference}, ${record.service_id}, ${record.service_name}, ${record.barber_id}, ${record.barber_name}, ${record.booking_date}, ${record.booking_time}, ${record.client_name}, ${record.contact}, ${record.notes}, ${record.status})
      RETURNING reference
    `
    await sql.end()
    return rows.length > 0
  } catch (err) {
    console.error('bookings: insert failed', err)
    if (sql) await sql.end().catch(() => undefined)
    return false
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchBookings(): Promise<any[]> {
  if (!DATABASE_URL) return []
  let sql: ReturnType<typeof postgres> | undefined
  try {
    sql = postgres(DATABASE_URL, { max: 1, connect_timeout: 8 })
    const rows = await sql`
      SELECT id, reference, service_id, service_name, barber_id, barber_name,
             booking_date, booking_time, client_name, contact, notes, status, created_at
      FROM public.bookings
      ORDER BY created_at DESC
      LIMIT 100
    `
    await sql.end()
    return rows
  } catch (err) {
    console.error('bookings: list failed', err)
    if (sql) await sql.end().catch(() => undefined)
    return []
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any): Promise<any> {
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (req.method === 'GET') {
    try {
      const rows = await fetchBookings()
      return Response.json(rows, { headers: corsHeaders })
    } catch (err) {
      console.error('GET /api/bookings error:', err)
      return Response.json({ error: 'Failed to fetch bookings' }, { status: 500, headers: corsHeaders })
    }
  }

  if (req.method === 'POST') {
    let body: Record<string, unknown>
    try {
      body = await req.json() as Record<string, unknown>
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400, headers: corsHeaders })
    }

    // Honeypot check
    if (body.website) {
      return Response.json({ ok: true, reference: newReference(), stored: false }, { headers: corsHeaders })
    }

    const serviceId = typeof body.serviceId === 'string' ? body.serviceId : ''
    const barberId = typeof body.barberId === 'string' ? body.barberId : ''
    const serviceName = typeof body.serviceName === 'string' ? body.serviceName : null
    const barberName = typeof body.barberName === 'string' ? body.barberName : null
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const contact = typeof body.contact === 'string' ? body.contact.trim() : ''
    const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 1000) : ''

    if (!serviceId || !isValidDateTime(body.date, body.time) || name.length < 2 || !contact) {
      return Response.json({ error: 'Missing or invalid required fields' }, { status: 400, headers: corsHeaders })
    }
    if (!contact.includes('@') && !/\d{7,}/.test(contact)) {
      return Response.json({ error: 'Invalid contact — provide a phone number or email' }, { status: 400, headers: corsHeaders })
    }

    const reference = newReference()
    const record = {
      reference,
      service_id: serviceId,
      service_name: serviceName,
      barber_id: barberId || null,
      barber_name: barberName,
      booking_date: body.date as string,
      booking_time: body.time as string,
      client_name: name,
      contact,
      notes,
      status: 'pending',
    }

    const stored = await storeBooking(record)
    return Response.json({ ok: true, reference, stored }, { headers: corsHeaders })
  }

  return Response.json({ error: 'Not Found' }, { status: 404, headers: corsHeaders })
}
