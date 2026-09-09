export type Service = {
  id: string
  name: string
  description: string
  price: string
  duration: string
  tag?: string
}

export type Barber = {
  id: string
  name: string
  specialty: string
  bio: string
}

export type Review = {
  name: string
  service: string
  quote: string
  rating: number
}

const brand = {
  name: 'Slicks',
  studio: 'Barber Studio',
  city: 'San Antonio, Texas',
  tagline: 'Sharp Cuts. Clean Confidence.',
}

const services: Service[] = [
  {
    id: 'haircut',
    name: 'Haircut',
    description: 'Classic precision cut with scissors and clipper finishing.',
    price: '$—',
    duration: '45 min',
  },
  {
    id: 'skin-fade',
    name: 'Skin Fade',
    description: 'Bald-fade blend down to clean, sharp zero.',
    price: '$—',
    duration: '45 min',
    tag: 'Most Popular',
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim',
    description: 'Shaped, lined up, and detailed with a hot towel finish.',
    price: '$—',
    duration: '30 min',
  },
  {
    id: 'haircut-beard',
    name: 'Haircut + Beard',
    description: 'Full grooming session — cut and beard shaped to match.',
    price: '$—',
    duration: '75 min',
  },
  {
    id: 'kids-cut',
    name: 'Kids Cut',
    description: 'Laid-back cuts for the little ones, ages 12 and under.',
    price: '$—',
    duration: '30 min',
  },
  {
    id: 'signature',
    name: 'Signature Cut',
    description: 'The Slicks VIP experience — premium cut, hot towel, and styling.',
    price: '$—',
    duration: '90 min',
    tag: 'Signature',
  },
]

const barbers: Barber[] = [
  {
    id: 'barber-1',
    name: 'Barber Name',
    specialty: 'Skin Fades & Lineups',
    bio: 'A short bio — years of experience, what they are known for, and why clients come back.',
  },
  {
    id: 'barber-2',
    name: 'Barber Name',
    specialty: 'Beard Sculpting & Straight Razor',
    bio: 'A short bio — years of experience, what they are known for, and why clients come back.',
  },
  {
    id: 'barber-3',
    name: 'Barber Name',
    specialty: 'Classic Cuts & Kid Cuts',
    bio: 'A short bio — years of experience, what they are known for, and why clients come back.',
  },
]

const hours = {
  days: 'Monday – Sunday',
  open: '12:00 PM',
  close: '11:00 PM',
  note: 'Open every day',
}

const contact = {
  city: brand.city,
  address: '[Street Address]',
  addressLine2: 'San Antonio, TX [ZIP]',
  phone: '(000) 000-0000',
  email: 'book@yourdomain.com',
  mapEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=-98.63%2C29.35%2C-98.36%2C29.52&layer=mapnik&marker=29.4241%2C-98.4936',
}

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/[yourhandle]' },
  { label: 'Facebook', href: 'https://facebook.com/[yourhandle]' },
  { label: 'TikTok', href: 'https://tiktok.com/@[yourhandle]' },
]

const reviewStats = { average: 5.0, count: '[Total reviews]' }

const reviews: Review[] = [
  {
    name: 'Client Name',
    service: 'Skin Fade',
    quote: 'Drop in a real client testimonial here — best service in town, walk out looking fresh every time.',
    rating: 5,
  },
  {
    name: 'Client Name',
    service: 'Haircut + Beard',
    quote: 'Drop in a real client testimonial here — the detail and precision are unmatched.',
    rating: 5,
  },
  {
    name: 'Client Name',
    service: 'Signature Cut',
    quote: 'Drop in a real client testimonial here — a proper experience from start to finish.',
    rating: 5,
  },
]

const booking = {
  daysAhead: 14,
  slotStart: '12:00',
  slotEnd: '21:30',
  slotStepMinutes: 30,
}

const api = {
  endpoint: '/api/bookings',
  enabled: import.meta.env.VITE_BOOKINGS_API === 'true',
}

export const site = {
  brand,
  services,
  barbers,
  hours,
  contact,
  socials,
  reviewStats,
  reviews,
  booking,
  api,
}