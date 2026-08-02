import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.webp'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#location', label: 'Location' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[200] flex justify-center px-6 py-5">
        <div
          className={`w-full max-w-[1180px] flex items-center justify-between pl-6 pr-3 py-3 rounded-full border border-white/70 backdrop-blur-none md:backdrop-blur-xl transition-all duration-400 ${
            scrolled
              ? 'bg-white/95 md:bg-white/85 shadow-[0_12px_34px_-10px_rgba(24,24,24,.14)]'
              : 'bg-white/80 md:bg-glass shadow-[0_8px_30px_-12px_rgba(24,24,24,.08)]'
          }`}
        >
          <a href="#home" className="flex items-center gap-3 font-serif font-bold text-[1.05rem] text-dark">
            <img src={logo} alt="Bakmi Jakarta CC logo" className="w-[46px] h-[46px] rounded-2xl object-cover shadow-md" />
            <span>
              Bakmi Jakarta{' '}
              <small className="block font-sans font-semibold text-[0.55rem] tracking-[0.18em] text-muted uppercase mt-0.5">
                CC · BALI
              </small>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text relative py-1 group"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#reservation"
            className="hidden md:inline-flex ml-2 items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-dark bg-accent shadow-[0_8px_24px_-8px_rgba(255,209,1,.45)] hover:-translate-y-0.5 transition-transform"
          >
            Reserve Table
          </a>

          <button
            className="md:hidden w-[42px] h-[42px] rounded-full bg-dark text-white flex items-center justify-center"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[250] bg-dark flex flex-col justify-center items-center gap-7 transition-transform duration-500 ${
          mobileOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <button
          className="absolute top-7 right-7 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-serif text-3xl text-white"
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#reservation"
          className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-dark bg-accent"
          onClick={() => setMobileOpen(false)}
        >
          Reserve Table
        </a>
      </div>
    </>
  )
}
