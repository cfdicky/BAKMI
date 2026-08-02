import { lazy, useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import StickyOrderButton from './components/StickyOrderButton.jsx'
import LazySection from './components/LazySection.jsx'

// Sections below the fold are code-split: their JS (and third-party deps like
// framer-motion/swiper) lives in separate chunks that are only imported once
// the section approaches the viewport, so the initial parse/execute cost and
// the startup network burst stay small (no competition with the LCP image).
const About = lazy(() => import('./components/About.jsx'))
const NoodleDivider = lazy(() => import('./components/NoodleDivider.jsx'))
const FeaturedMenu = lazy(() => import('./components/FeaturedMenu.jsx'))
const Gallery = lazy(() => import('./components/Gallery.jsx'))
const Testimonials = lazy(() => import('./components/Testimonials.jsx'))
const Reservation = lazy(() => import('./components/Reservation.jsx'))
const Location = lazy(() => import('./components/Location.jsx'))
const FAQ = lazy(() => import('./components/FAQ.jsx'))
const Footer = lazy(() => import('./components/Footer.jsx'))

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
        <LazySection component={About} />
        <LazySection component={NoodleDivider} color="#E53935" />
        <LazySection component={FeaturedMenu} />
        <LazySection component={NoodleDivider} color="#FFD101" wavy opacity={0.6} />
        <LazySection component={Gallery} />
        <LazySection component={Testimonials} />
        <LazySection component={Reservation} />
        <LazySection component={Location} />
        <LazySection component={FAQ} />
      </main>
      <LazySection component={Footer} />
      <StickyOrderButton />
    </>
  )
}
