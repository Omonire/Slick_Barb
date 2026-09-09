import { site } from '../data/site-content'
import { btnGold } from '../lib/ui'

export function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-smoke bg-ink/95 p-3 backdrop-blur-md sm:hidden">
      <a href="#book" className={`${btnGold} w-full`}>
        Book Your Cut · {site.hours.open}–{site.hours.close}
      </a>
    </div>
  )
}