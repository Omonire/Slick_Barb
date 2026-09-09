import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Services } from './components/Services'
import { OurWork } from './components/OurWork'
import { Barbers } from './components/Barbers'
import { WhySlicks } from './components/WhySlicks'
import { Reviews } from './components/Reviews'
import { Booking } from './components/Booking'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { MobileBookBar } from './components/MobileBookBar'
import { Admin } from './components/Admin'

function App() {
  if (window.location.hash === '#admin') return <Admin />

  return (
    <div className="bg-ink text-bone">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <OurWork />
        <Barbers />
        <WhySlicks />
        <Reviews />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <MobileBookBar />
      <div className="h-16 sm:hidden" aria-hidden="true" />
    </div>
  )
}

export default App