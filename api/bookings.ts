import postgres from 'postgres'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const process: any

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

  const DATABASE_URL = process.env.DATABASE_URL

  if (req.method === 'GET') {
    if (!DATABASE_URL) {
      return Response.json({ error: 'Database not configured' }, { status: 500, headers: corsHeaders })
    }
    let sql: ReturnType<typeof postgres> | undefined
    try {
      sql = postgres(DATABASE_URL, { max: 1, connect_timeout: 10 })
      const rows = await sql`
        SELECT id, reference, service_id, service_name, barber_id, barber_name,
               booking_date, booking_time, client_name, contact, notes, status, created_at
        FROM public.bookings
        ORDER BY created_at DESC
        LIMIT 100
      `
      await sql.end()
      return Response.json(rows, { headers: corsHeaders })
    } catch (err) {
      console.error('GET /api/bookings error:', err)
      if (sql) await sql.end().catch(() => undefined)
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

    if (!DATABASE_URL) {
      return Response.json({ error: 'Database not configured' }, { status: 500, headers: corsHeaders })
    }

    let sql: ReturnType<typeof postgres> | undefined
    try {
      sql = postgres(DATABASE_URL, { max: 1, connect_timeout: 10 })
      const reference = newReference()
      await sql`
        INSERT INTO public.bookings
          (reference, service_id, service_name, barber_id, barber_name, booking_date, booking_time, client_name, contact, notes, status)
        VALUES
          (${reference}, ${serviceId}, ${serviceName}, ${barberId || null}, ${barberName}, ${body.date as string}, ${body.time as string}, ${name}, ${contact}, ${notes}, ${'pending'})
      `
      await sql.end()
      return Response.json({ ok: true, reference, stored: true }, { headers: corsHeaders })
    } catch (err) {
      console.error('POST /api/bookings error:', err)
      if (sql) await sql.end().catch(() => undefined)
      return Response.json({ error: 'Failed to store booking' }, { status: 500, headers: corsHeaders })
    }
  }

  return Response.json({ error: 'Not Found' }, { status: 404, headers: corsHeaders })
}
