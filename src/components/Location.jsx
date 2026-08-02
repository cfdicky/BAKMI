import { motion } from 'framer-motion'
import { MapPin, Clock, MessageCircle, Car, Instagram, Send } from 'lucide-react'
import restaurant from '../data/restaurant.json'

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 0.84, 0.44, 1] } },
}

export default function Location() {
  const { lat, lng } = restaurant.mapCoordinates
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`

  return (
    <section id="location" className="bg-section py-24 md:py-[140px]">
      <div className="container mx-auto px-8 max-w-[1280px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 items-stretch">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className="rounded-[26px] overflow-hidden border border-border min-h-[340px] md:min-h-[480px]"
        >
          <iframe
            src={mapSrc}
            loading="lazy"
            allowFullScreen
            title="Bakmi Jakarta CC location"
            className="w-full h-full min-h-[340px] md:min-h-[480px] border-0"
          />
        </motion.div>

        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2.5 font-sans font-semibold text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-1 before:content-[''] before:w-[26px] before:h-[1.5px] before:bg-primary before:block">
            Find Us
          </div>
          <h2 className="font-serif font-bold text-dark text-[2rem] -mt-3 mb-1">Visit Bakmi Jakarta CC</h2>

          <LocBlock icon={<MapPin size={22} />} title="Address">
            <p className="text-muted text-[0.92rem]">{restaurant.address}</p>
          </LocBlock>

          <LocBlock icon={<Clock size={22} />} title="Opening Hours">
            <div className="grid grid-cols-[1fr_auto] gap-x-5 gap-y-1.5 text-[0.9rem] text-muted">
              {restaurant.hours.map((h) => (
                <div className="contents" key={h.days}>
                  <span>{h.days}</span>
                  <strong className="text-text font-semibold">{h.time}</strong>
                </div>
              ))}
            </div>
          </LocBlock>

          <LocBlock icon={<MessageCircle size={22} />} title="Contact">
            <p className="text-muted text-[0.92rem]">
              Phone / WhatsApp: {restaurant.phone}
              <br />
              Instagram: {restaurant.instagram}
            </p>
          </LocBlock>

          <LocBlock icon={<Car size={22} />} title="Parking" last>
            <p className="text-muted text-[0.92rem]">{restaurant.parkingNote}</p>
          </LocBlock>

          <div className="flex gap-3 mt-1">
            <SocialLink href={restaurant.whatsapp} label="WhatsApp">
              <MessageCircle size={19} />
            </SocialLink>
            <SocialLink href={restaurant.instagramUrl} label="Instagram">
              <Instagram size={19} />
            </SocialLink>
            <SocialLink href={restaurant.googleMapsUrl} label="Google Maps">
              <Send size={19} />
            </SocialLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function LocBlock({ icon, title, children, last = false }) {
  return (
    <div className={`flex gap-[18px] ${last ? '' : 'pb-6 border-b border-border'}`}>
      <div className="w-12 h-12 rounded-2xl bg-bg flex items-center justify-center text-primary flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-[1.02rem] mb-1.5 font-semibold text-dark">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 rounded-full bg-dark text-white flex items-center justify-center hover:bg-primary hover:-translate-y-0.5 transition-all duration-300"
    >
      {children}
    </a>
  )
}
