import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import FeaturedMenu from './components/FeaturedMenu.jsx'
import Gallery from './components/Gallery.jsx'
import Testimonials from './components/Testimonials.jsx'
import Reservation from './components/Reservation.jsx'
import Location from './components/Location.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'
import StickyOrderButton from './components/StickyOrderButton.jsx'
import NoodleDivider from './components/NoodleDivider.jsx'

export default function App() {
  useEffect(() => {
    // Respect users who've asked their OS/browser for reduced motion.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Let touch devices use native scrolling — Lenis's rAF loop can make
    // scroll feel heavier on mobile.
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (prefersReducedMotion || isTouchDevice) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <NoodleDivider color="#E53935" />
        <FeaturedMenu />
        <NoodleDivider color="#FFD101" wavy opacity={0.6} />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Location />
        <FAQ />
      </main>
      <Footer />
      <StickyOrderButton />
    </>
  )
}
