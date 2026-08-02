import { AnimatePresence, motion } from 'framer-motion'
import { X, Image } from 'lucide-react'
import GALLERY_IMAGES from '../data/galleryImages.js'

export default function Lightbox({ item, src, aspect = 'aspect-[3/4]', onClose }) {
  const imageSrc = src || (item && GALLERY_IMAGES[item.image])
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] bg-dark/90 flex items-center justify-center p-8 sm:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-[640px] w-full bg-dark-2 rounded-3xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-7 text-white w-11 h-11 rounded-full bg-white/10 flex items-center justify-center z-10"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            {imageSrc ? (
              <img src={imageSrc} alt={item.label || item.name} className={`w-full ${aspect} object-cover`} />
            ) : (
              <div
                className="aspect-[5/4] flex items-center justify-center relative"
                style={{ background: `linear-gradient(155deg, ${item.tone}, #181818)` }}
              >
                <Image size={70} className="text-white/40" />
              </div>
            )}
            <div className="px-7 py-6 text-white">
              <small className="text-white/50 uppercase tracking-wide text-xs">{item.category || item.categoryLabel}</small>
              <h3 className="font-serif text-xl mt-1">{item.label || item.name}</h3>
              {item.description && <p className="text-white/70 text-sm mt-2">{item.description}</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
