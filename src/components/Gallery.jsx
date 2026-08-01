import { useState } from 'react'
import { motion } from 'framer-motion'
import { Expand } from 'lucide-react'
import galleryItems from '../data/gallery.json'
import Lightbox from './Lightbox.jsx'

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 0.84, 0.44, 1] } },
}

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="bg-bg py-24 md:py-[140px]">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="max-w-[640px] mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2.5 justify-center font-sans font-semibold text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-4 before:content-[''] before:w-[26px] before:h-[1.5px] before:bg-primary before:block">
            A Look Inside
          </div>
          <h2 className="font-serif font-bold text-dark text-[2.1rem] md:text-[2.8rem] lg:text-[3.4rem] leading-tight">
            Kitchen to table
          </h2>
        </div>

        <div className="masonry-columns">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ delay: (i % 4) * 0.06 }}
              className="masonry-item rounded-[22px] overflow-hidden relative cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.label}`}
              onClick={() => setActive(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActive(item)
                }
              }}
            >
              <div
                className="relative flex items-end p-5 transition-transform duration-600 group-hover:scale-105"
                style={{ height: item.height, background: item.gradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <Expand
                  size={22}
                  className="absolute right-3.5 top-3.5 text-white/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                />
                <div className="relative z-[2]">
                  <span className="block text-white/70 text-xs uppercase tracking-wide mb-1.5">
                    {item.category}
                  </span>
                  <span className="font-serif font-semibold text-white text-[1.05rem]">{item.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </section>
  )
}
