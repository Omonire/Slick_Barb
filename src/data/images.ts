const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const images = {
  hero: px(12464841, 1920),
  interior: px(7518728, 1600),
  tools: px(7697208, 1600),
  barbers: [px(5188621, 900), px(20302331, 900), px(18483769, 900)],
  beforeAfter: {
    before: px(1453005, 1200),
    after: px(1453005, 1200),
  },
  gallery: [
    { src: px(18301169, 900), category: 'fades' },
    { src: px(29189821, 900), category: 'fades' },
    { src: px(9992817, 900), category: 'fades' },
    { src: px(12464841, 900), category: 'fades' },
    { src: px(5188621, 900), category: 'fades' },
    { src: px(3998397, 900), category: 'haircuts' },
    { src: px(7697216, 900), category: 'haircuts' },
    { src: px(20638028, 900), category: 'haircuts' },
    { src: px(1453005, 900), category: 'haircuts' },
    { src: px(19664876, 900), category: 'haircuts' },
    { src: px(10989588, 900), category: 'haircuts' },
    { src: px(19287849, 900), category: 'beards' },
    { src: px(7447145, 900), category: 'beards' },
    { src: px(7518745, 900), category: 'beards' },
    { src: px(8867554, 900), category: 'beards' },
    { src: px(20302331, 900), category: 'beards' },
  ],
} as const