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
    price: '$35',
    duration: '45 min',
  },
  {
    id: 'skin-fade',
    name: 'Skin Fade',
    description: 'Bald-fade blend down to clean, sharp zero.',
    price: '$40',
    duration: '45 min',
    tag: 'Most Popular',
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim',
    description: 'Shaped, lined up, and detailed with a hot towel finish.',
    price: '$25',
    duration: '30 min',
  },
  {
    id: 'haircut-beard',
    name: 'Haircut + Beard',
    description: 'Full grooming session — cut and beard shaped to match.',
    price: '$55',
    duration: '75 min',
  },
  {
    id: 'kids-cut',
    name: 'Kids Cut',
    description: 'Laid-back cuts for the little ones, ages 12 and under.',
    price: '$20',
    duration: '30 min',
  },
  {
    id: 'signature',
    name: 'Signature Cut',
    description: 'The Slicks VIP experience — premium cut, hot towel, and styling.',
    price: '$75',
    duration: '90 min',
    tag: 'Signature',
  },
]

const barbers: Barber[] = [
  {
    id: 'barber-1',
    name: 'Marcus Johnson',
    specialty: 'Skin Fades & Lineups',
    bio: '10+ years behind the chair. Known for razor-sharp fades and clean lineups that turn heads. Marcus brings precision and patience to every cut.',
  },
  {
    id: 'barber-2',
    name: 'David Martinez',
    specialty: 'Beard Sculpting & Straight Razor',
    bio: 'The beard king of San Antonio. David shapes, sculpts, and lines up beards with straight razor precision. Hot towel finishes are his signature.',
  },
  {
    id: 'barber-3',
    name: 'Chris Williams',
    specialty: 'Classic Cuts & Kid Cuts',
    bio: 'From fresh fades to first haircuts, Chris keeps it laid back and professional. 8 years of experience and the patience of a saint with the little ones.',
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
  address: '2847 NW Military Hwy',
  addressLine2: 'San Antonio, TX 78131',
  phone: '(210) 555-0187',
  email: 'book@slicksbarber.com',
  mapEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=-98.63%2C29.35%2C-98.36%2C29.52&layer=mapnik&marker=29.4241%2C-98.4936',
}

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/slickbarbersa' },
  { label: 'Facebook', href: 'https://facebook.com/slicksbarberstudio' },
  { label: 'TikTok', href: 'https://tiktok.com/@slickbarber' },
]

const reviewStats = { average: 5.0, count: '127' }

const reviews: Review[] = [
  {
    name: 'Marcus J.',
    service: 'Skin Fade',
    quote: 'Best fade I\'ve ever had. Clean, precise, and the vibe is unmatched. Marcus really knows his craft. Walked out feeling like a million bucks.',
    rating: 5,
  },
  {
    name: 'David R.',
    service: 'Haircut + Beard',
    quote: 'The attention to detail is insane. David shaped my beard like an artist. I\'ve been coming back every two weeks for the past year.',
    rating: 5,
  },
  {
    name: 'Chris L.',
    service: 'Signature Cut',
    quote: 'VIP experience is worth every penny. Hot towel, perfect cut, and great conversation. This is how a barbershop should be.',
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