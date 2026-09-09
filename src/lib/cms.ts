// CMS - Content Management System
// Stores all site content in localStorage for dynamic management

export interface Service {
  id: string
  name: string
  description: string
  price: string
  duration: string
  category: string
  hotDeal: boolean
  image?: string
  active: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  image?: string
  active: boolean
  order: number
}

export interface SiteContent {
  brand: {
    name: string
    studio: string
    city: string
    tagline: string
  }
  hours: {
    days: string
    open: string
    close: string
    note: string
  }
  contact: {
    address: string
    addressLine2: string
    phone: string
    email: string
  }
  socials: {
    label: string
    href: string
  }[]
}

const STORAGE_KEYS = {
  services: 'slick_cms_services',
  categories: 'slick_cms_categories',
  siteContent: 'slick_cms_siteContent',
  images: 'slick_cms_images',
}

// Default data
const defaultServices: Service[] = [
  { id: 'haircut', name: 'Haircut', description: 'Classic precision cut with scissors and clipper finishing.', price: '$35', duration: '45 min', category: 'haircuts', hotDeal: false, active: true },
  { id: 'skin-fade', name: 'Skin Fade', description: 'Bald-fade blend down to clean, sharp zero.', price: '$40', duration: '45 min', category: 'haircuts', hotDeal: true, active: true },
  { id: 'beard-trim', name: 'Beard Trim', description: 'Shaped, lined up, and detailed with a hot towel finish.', price: '$25', duration: '30 min', category: 'beard', hotDeal: false, active: true },
  { id: 'haircut-beard', name: 'Haircut + Beard', description: 'Full grooming session — cut and beard shaped to match.', price: '$55', duration: '75 min', category: 'packages', hotDeal: true, active: true },
  { id: 'kids-cut', name: 'Kids Cut', description: 'Laid-back cuts for the little ones, ages 12 and under.', price: '$20', duration: '30 min', category: 'haircuts', hotDeal: false, active: true },
  { id: 'signature', name: 'Signature Cut', description: 'The Slicks VIP experience — premium cut, hot towel, and styling.', price: '$75', duration: '90 min', category: 'premium', hotDeal: false, active: true },
]

const defaultCategories: Category[] = [
  { id: 'haircuts', name: 'Haircuts', description: 'All haircut services', active: true, order: 1 },
  { id: 'beard', name: 'Beard', description: 'Beard grooming services', active: true, order: 2 },
  { id: 'packages', name: 'Packages', description: 'Combined service packages', active: true, order: 3 },
  { id: 'premium', name: 'Premium', description: 'VIP and premium services', active: true, order: 4 },
]

const defaultSiteContent: SiteContent = {
  brand: {
    name: 'Slicks',
    studio: 'Barber Studio',
    city: 'San Antonio, Texas',
    tagline: 'Sharp Cuts. Clean Confidence.',
  },
  hours: {
    days: 'Monday – Sunday',
    open: '12:00 PM',
    close: '11:00 PM',
    note: 'Open every day',
  },
  contact: {
    address: '[Street Address]',
    addressLine2: 'San Antonio, TX [ZIP]',
    phone: '(000) 000-0000',
    email: 'book@yourdomain.com',
  },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/[yourhandle]' },
    { label: 'Facebook', href: 'https://facebook.com/[yourhandle]' },
    { label: 'TikTok', href: 'https://tiktok.com/@slickbarber' },
  ],
}

// Helper functions
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

function saveToStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data))
}

// Services
export function getServices(): Service[] {
  return loadFromStorage(STORAGE_KEYS.services, defaultServices)
}

export function saveServices(services: Service[]): void {
  saveToStorage(STORAGE_KEYS.services, services)
}

export function addService(service: Omit<Service, 'id'>): Service {
  const services = getServices()
  const newService: Service = {
    ...service,
    id: `service-${Date.now()}`,
  }
  services.push(newService)
  saveServices(services)
  return newService
}

export function updateService(id: string, updates: Partial<Service>): boolean {
  const services = getServices()
  const index = services.findIndex((s) => s.id === id)
  if (index === -1) return false
  services[index] = { ...services[index], ...updates }
  saveServices(services)
  return true
}

export function deleteService(id: string): boolean {
  const services = getServices()
  const filtered = services.filter((s) => s.id !== id)
  if (filtered.length === services.length) return false
  saveServices(filtered)
  return true
}

// Categories
export function getCategories(): Category[] {
  return loadFromStorage(STORAGE_KEYS.categories, defaultCategories)
}

export function saveCategories(categories: Category[]): void {
  saveToStorage(STORAGE_KEYS.categories, categories)
}

export function addCategory(category: Omit<Category, 'id'>): Category {
  const categories = getCategories()
  const newCategory: Category = {
    ...category,
    id: `category-${Date.now()}`,
  }
  categories.push(newCategory)
  saveCategories(categories)
  return newCategory
}

export function updateCategory(id: string, updates: Partial<Category>): boolean {
  const categories = getCategories()
  const index = categories.findIndex((c) => c.id === id)
  if (index === -1) return false
  categories[index] = { ...categories[index], ...updates }
  saveCategories(categories)
  return true
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories()
  const filtered = categories.filter((c) => c.id !== id)
  if (filtered.length === categories.length) return false
  saveCategories(filtered)
  return true
}

// Site Content
export function getSiteContent(): SiteContent {
  return loadFromStorage(STORAGE_KEYS.siteContent, defaultSiteContent)
}

export function saveSiteContent(content: SiteContent): void {
  saveToStorage(STORAGE_KEYS.siteContent, content)
}

export function updateSiteContent(updates: Partial<SiteContent>): void {
  const content = getSiteContent()
  saveSiteContent({ ...content, ...updates })
}

// Hot Deals
export function getHotDeals(): Service[] {
  return getServices().filter((s) => s.hotDeal && s.active)
}

export function toggleHotDeal(id: string): boolean {
  const services = getServices()
  const service = services.find((s) => s.id === id)
  if (!service) return false
  service.hotDeal = !service.hotDeal
  saveServices(services)
  return true
}

// Images (stored as base64 or URLs)
export interface SiteImage {
  id: string
  name: string
  url: string
  category: string
}

export function getImages(): SiteImage[] {
  return loadFromStorage(STORAGE_KEYS.images, [])
}

export function addImage(image: Omit<SiteImage, 'id'>): SiteImage {
  const images = getImages()
  const newImage: SiteImage = {
    ...image,
    id: `image-${Date.now()}`,
  }
  images.push(newImage)
  saveToStorage(STORAGE_KEYS.images, images)
  return newImage
}

export function deleteImage(id: string): boolean {
  const images = getImages()
  const filtered = images.filter((i) => i.id !== id)
  if (filtered.length === images.length) return false
  saveToStorage(STORAGE_KEYS.images, filtered)
  return true
}

// Reset to defaults
export function resetToDefaults(): void {
  saveServices(defaultServices)
  saveCategories(defaultCategories)
  saveSiteContent(defaultSiteContent)
  localStorage.removeItem(STORAGE_KEYS.images)
}
