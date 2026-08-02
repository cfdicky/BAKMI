import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import menuItems from '../data/menus.json'
import FoodIcon from './icons/FoodIcon.jsx'
import Lightbox from './Lightbox.jsx'
import bakmiAyamPangsitImg from '../assets/bakmi-ayam-pangsit.webp'
import dimsumImg from '../assets/dimsum.webp'
import dimsumMentaiImg from '../assets/dimsum-mentai.webp'
import nasiGorengImg from '../assets/nasi-goreng.webp'
import gadoGadoImg from '../assets/gadogado.webp'
import mieGorengImg from '../assets/mie-goreng.webp'

const itemImages = {
  'bakmi-ayam-pangsit': bakmiAyamPangsitImg,
  'dimsum-combo': dimsumImg,
  'dimsum-mentai': dimsumMentaiImg,
  'nasi-goreng-kampung': nasiGorengImg,
  'gado-gado': gadoGadoImg,
  'mie-goreng': mieGorengImg,
}

export default function FeaturedMenu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeItem, setActiveItem] = useState(null)

  const categories = useMemo(() => {
    const seen = new Map()
    menuItems.forEach((item) => {
      if (!seen.has(item.category)) seen.set(item.category, item.categoryLabel.split(' · ')[0])
    })
    return [{ id: 'all', label: 'All' }, ...Array.from(seen, ([id, label]) => ({ id, label }))]
  }, [])

  const filtered = useMemo(
    () => (activeCategory === 'all' ? menuItems : menuItems.filter((item) => item.category === activeCategory)),
    [activeCategory],
  )

  return (
    <section id="menu" className="bg-section py-24 md:py-[140px]">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="max-w-[640px] mb-16">
          <div className="inline-flex items-center gap-2.5 font-sans font-semibold text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-4 before:content-[''] before:w-[26px] before:h-[1.5px] before:bg-primary before:block">
            The Menu
          </div>
          <h2 className="font-serif font-bold text-dark text-[2.1rem] md:text-[2.8rem] lg:text-[3.4rem] leading-tight">
            More than bakmi, made the same way
          </h2>
        </div>

        <div className="flex gap-2.5 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-dark text-white border-dark'
                  : 'border-border text-muted hover:bg-dark hover:text-white hover:border-dark'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="rounded-[26px] bg-bg border border-border overflow-hidden hover:-translate-y-2 hover:shadow-[0_34px_60px_-26px_rgba(24,24,24,.2)] transition-all duration-500 group"
              >
                <div
                  className="relative aspect-[5/4] flex items-center justify-center overflow-hidden cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.name}`}
                  onClick={() => setActiveItem(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveItem(item)
                    }
                  }}
                  style={{ background: 'linear-gradient(155deg,#fff7ec,#fbe9d6)' }}
                >
                  {item.favorite && (
                    <span className="absolute top-4 left-4 z-[2] bg-accent text-dark text-[0.68rem] font-extrabold tracking-wide px-3 py-1.5 rounded-full uppercase shadow-[0_6px_14px_-4px_rgba(255,209,1,.6)]">
                      Favorite
                    </span>
                  )}
                  <div className="w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    {itemImages[item.id] ? (
                      <img src={itemImages[item.id]} alt={item.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    ) : (
                      <FoodIcon tone={item.tone} />
                    )}
                  </div>
                </div>
                <div className="px-6 pt-5 pb-6">
                  <span className="block text-[0.68rem] uppercase tracking-wide font-semibold text-muted mb-1.5">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-serif font-semibold text-[1.14rem] text-dark">{item.name}</h3>
                  <p className="text-muted text-[0.87rem]">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Lightbox
        item={activeItem}
        src={activeItem && itemImages[activeItem.id]}
        aspect="aspect-[5/4]"
        onClose={() => setActiveItem(null)}
      />
    </section>
  )
}
