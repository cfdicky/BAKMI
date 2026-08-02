import { useState } from 'react'
import { motion } from 'framer-motion'
import galleryItems from '../data/gallery.json'
import GALLERY_IMAGES from '../data/galleryImages.js'
import Lightbox from './Lightbox.jsx'

const PIN_COLORS = ['#E53935', '#FFD101', '#232020', '#4C8C4A', '#E8A93B', '#5A7A3A']

const LAYOUT = [
  { w: 'w-[38%] md:w-[23%]', pos: 'left-[3%] md:left-[2%] top-[0%] md:top-[0%]', rotate: -6, scale: 1, z: 3 },
  { w: 'w-[38%] md:w-[24%]', pos: 'left-[55%] md:left-[27%] top-[2%] md:top-[4%]', rotate: 3, scale: 1.04, z: 2 },
  { w: 'w-[38%] md:w-[22%]', pos: 'left-[6%] md:left-[49%] top-[25%] md:top-[0%]', rotate: -2, scale: 0.97, z: 4 },
  { w: 'w-[38%] md:w-[23%]', pos: 'left-[56%] md:left-[73%] top-[28%] md:top-[6%]', rotate: 5, scale: 1.02, z: 2 },
  { w: 'w-[38%] md:w-[24%]', pos: 'left-[1%] md:left-[9%] top-[50%] md:top-[34%]', rotate: 4, scale: 1.03, z: 3 },
  { w: 'w-[38%] md:w-[23%]', pos: 'left-[53%] md:left-[32%] top-[53%] md:top-[38%]', rotate: -5, scale: 0.98, z: 5 },
  { w: 'w-[38%] md:w-[24%]', pos: 'left-[3%] md:left-[54%] top-[76%] md:top-[34%]', rotate: 2, scale: 1.05, z: 2 },
  { w: 'w-[38%] md:w-[24%]', pos: 'left-[57%] md:left-[75%] top-[78%] md:top-[40%]', rotate: -3, scale: 0.97, z: 4 },
]

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="bg-mading-wood py-24 md:py-[140px] relative overflow-hidden">
      <div className="container mx-auto px-8 max-w-[1280px] relative z-[1]">
        <div className="max-w-[640px] mx-auto text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2.5 justify-center font-sans font-semibold text-[0.72rem] tracking-[0.22em] uppercase text-white/85 mb-4 before:content-[''] before:w-[26px] before:h-[1.5px] before:bg-accent before:block">
            A Look Inside
          </div>
          <h2 className="font-serif font-bold text-[#fff6e8] text-[2.1rem] md:text-[2.8rem] lg:text-[3.4rem] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,.3)]">
            More than a meal, it&apos;s a memory
          </h2>
        </div>

        <div className="relative h-[1280px] md:h-[1010px]">
          {galleryItems.map((item, i) => {
            const l = LAYOUT[i % LAYOUT.length]
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, rotate: l.rotate, scale: l.scale }}
                whileInView={{ opacity: 1, y: 0, rotate: l.rotate, scale: l.scale }}
                whileHover={{ rotate: 0, y: -12, scale: 1.06 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 0.84, 0.44, 1], delay: (i % 4) * 0.07 }}
                className={`absolute cursor-pointer ${l.w} ${l.pos}`}
                style={{ zIndex: l.z }}
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
                {item.pin === 'tape' ? <Tape /> : <Pin color={PIN_COLORS[i % PIN_COLORS.length]} />}
                <div className="bg-[#fffdf7] p-3 pb-4 rounded-[6px] shadow-[0_18px_40px_-14px_rgba(0,0,0,.5)] transition-shadow duration-300 hover:shadow-[0_32px_64px_-18px_rgba(0,0,0,.55)]">
                  <div className={`${item.aspect || 'aspect-[3/4]'} overflow-hidden rounded-[3px] bg-section`}>
                    {GALLERY_IMAGES[item.image] ? (
                      <img
                        src={GALLERY_IMAGES[item.image]}
                        alt={item.label}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: `linear-gradient(155deg, ${item.tone}, #181818)` }}
                      />
                    )}
                  </div>
                  <div className="pt-3 text-center">
                    <p className="font-hand text-[1.05rem] md:text-[1.15rem] leading-tight text-[#4a3420]">{item.label}</p>
                    {item.category && (
                      <span className="block text-[0.58rem] uppercase tracking-[0.2em] text-[#a08763] font-semibold mt-1">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <Lightbox item={active} aspect={active?.aspect} onClose={() => setActive(null)} />
    </section>
  )
}

function Pin({ color }) {
  return (
    <span
      className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 w-[18px] h-[18px] rounded-full"
      style={{
        background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.85), ${color} 55%)`,
        boxShadow: '0 2px 5px rgba(0,0,0,.4), inset 0 -2px 3px rgba(0,0,0,.25)',
      }}
    />
  )
}

function Tape() {
  return (
    <span
      className="absolute -top-3 left-1/2 z-10 w-[88px] h-[26px]"
      style={{
        background: 'rgba(255,243,196,.75)',
        transform: 'translateX(-50%) rotate(-3deg)',
        boxShadow: '0 1px 3px rgba(0,0,0,.18)',
        borderLeft: '1px dashed rgba(160,140,90,.4)',
        borderRight: '1px dashed rgba(160,140,90,.4)',
      }}
    />
  )
}
