import { images } from './images'

export type GalleryCategory = 'fades' | 'haircuts' | 'beards'

export const galleryCategories: { id: GalleryCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'fades', label: 'Fades' },
  { id: 'haircuts', label: 'Haircuts' },
  { id: 'beards', label: 'Beards' },
]

export type GalleryItem = {
  src: string
  alt: string
  category: GalleryCategory
}

export const gallery: GalleryItem[] = images.gallery.map((g) => ({
  src: g.src,
  category: g.category,
  alt:
    g.category === 'fades'
      ? 'Skin fade haircut at Slicks Barber Studio'
      : g.category === 'beards'
        ? 'Beard trim at Slicks Barber Studio'
        : 'Precision haircut at Slicks Barber Studio',
}))

export const beforeAfter = {
  before: images.beforeAfter.before,
  after: images.beforeAfter.after,
  note: 'Replace with your own before/after pair and add your real photos.',
}