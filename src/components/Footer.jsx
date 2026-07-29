import { useState } from 'react'
import logo from '../assets/logo.png'
import restaurant from '../data/restaurant.json'

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    // NOTE: wire this up to your real newsletter provider (Mailchimp, Resend, etc.)
    setSubscribed(true)
  }

  return (
    <footer className="bg-dark text-white/75 pt-16 md:pt-[90px] pb-8">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 pb-14 md:pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3.5 mb-4 font-serif font-bold text-2xl text-white">
              <img src={logo} alt="Bakmi Jakarta CC logo" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
              Bakmi Jakarta CC
            </div>
            <p className="max-w-[280px] text-sm text-white/55">
              Authentic Jakarta-style handmade bakmi, dimsum and comfort food, served with warmth in the heart
              of Bali.
            </p>
          </div>

          <FooterCol title="Quick Links">
            <FooterLink href="#about">About Us</FooterLink>
            <FooterLink href="#menu">Our Menu</FooterLink>
            <FooterLink href="#gallery">Gallery</FooterLink>
            <FooterLink href="#reservation">Reservation</FooterLink>
          </FooterCol>

          <FooterCol title="Opening Hours">
            {restaurant.hours.map((h) => (
              <li key={h.days} className="mb-3 text-sm">
                {h.days}: {h.time}
              </li>
            ))}
          </FooterCol>

          <div>
            <h5 className="text-white text-xs uppercase tracking-wide mb-5 font-semibold">Newsletter</h5>
            <p className="text-sm text-white/55 mb-3.5">Get our weekend promos straight to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex border border-white/18 rounded-full p-1.5 pl-5">
              <input
                type="email"
                required
                placeholder="Your email"
                className="bg-transparent border-0 text-white flex-1 text-sm focus:outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap"
              >
                {subscribed ? 'Subscribed ✓' : 'Join'}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3.5 pt-7 text-sm text-white/40">
          <span>© {new Date().getFullYear()} Bakmi Jakarta CC. All rights reserved.</span>
          <div className="flex gap-4">
            <a href={restaurant.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Instagram
            </a>
            <a href={restaurant.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              WhatsApp
            </a>
            <a href={restaurant.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h5 className="text-white text-xs uppercase tracking-wide mb-5 font-semibold">{title}</h5>
      <ul>{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }) {
  return (
    <li className="mb-3 text-sm">
      <a href={href} className="hover:text-white transition-colors">
        {children}
      </a>
    </li>
  )
}
