import { Instagram, MessageCircle } from 'lucide-react'
import logo from '../assets/logo.webp'
import restaurant from '../data/restaurant.json'

export default function Footer() {
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
            <h4 className="text-white text-xs uppercase tracking-wide mb-5 font-semibold">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href={restaurant.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Bakmi Jakarta CC on Instagram"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/18 text-white hover:bg-primary hover:border-primary transition-colors"
              >
                <Instagram size={22} />
              </a>
              <a
                href={restaurant.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat Bakmi Jakarta CC on WhatsApp"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/18 text-white hover:bg-primary hover:border-primary transition-colors"
              >
                <MessageCircle size={22} />
              </a>
            </div>
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
      <h4 className="text-white text-xs uppercase tracking-wide mb-5 font-semibold">{title}</h4>
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
