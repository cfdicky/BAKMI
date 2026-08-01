import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarClock, CheckCircle2, ExternalLink, ShoppingBag } from 'lucide-react'

const IG_USERNAME = 'bakmiccjakarta'
const GFOOD_URL = 'https://gofood.link/a/AtUMy6o'

const INPUT =
  'w-full px-4 py-3.5 border-[1.5px] border-border rounded-xl bg-bg text-text focus:outline-none focus:border-primary transition-colors'

const FLIP = { duration: 0.55, ease: [0.16, 0.84, 0.44, 1] }

const MODES = [
  { id: 'reserve', label: 'Reserve Table', icon: CalendarClock },
  { id: 'order', label: 'Order Online', icon: ShoppingBag },
]

const COPY = {
  reserve: {
    eyebrow: 'Reservation',
    title: ['Save your table,', "we'll save the seat."],
    body: "Walk-ins are always welcome, but for groups of four or more — or weekend dinner service — we recommend booking ahead. We'll confirm by Instagram DM shortly.",
  },
  order: {
    eyebrow: 'Order Online',
    title: ['Order via GoFood,', 'hot & ready when you are.'],
    body: 'Skip the queue and order your favourites through GoFood — delivery or pickup, right from your phone.',
  },
}

export default function Reservation() {
  const [mode, setMode] = useState('reserve')
  const [resSubmitted, setResSubmitted] = useState(false)

  useEffect(() => {
    const onOpenOrder = () => setMode('order')
    window.addEventListener('bakmi:open-order', onOpenOrder)
    return () => window.removeEventListener('bakmi:open-order', onOpenOrder)
  }, [])

  function switchMode(next) {
    if (next !== mode) setMode(next)
  }

  function handleReserveSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const message = [
      'Halo Bakmi Jakarta! Saya ingin reservasi meja.',
      `Nama: ${data.get('name')}`,
      `No. HP/WA: ${data.get('phone')}`,
      `Tamu: ${data.get('guests')}`,
      `Tanggal: ${data.get('date')}`,
      `Jam: ${data.get('time')}`,
      data.get('message') ? `Catatan: ${data.get('message')}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    window.open(`https://ig.me/m/${IG_USERNAME}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setResSubmitted(true)
  }

  return (
    <section id="reservation" className="bg-bg py-24 md:py-[150px]">
      <div className="container mx-auto px-8 max-w-[1280px] grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-[70px] items-center">
        <div>
          <div className="inline-flex items-center gap-2.5 font-sans font-semibold text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-4 before:content-[''] before:w-[26px] before:h-[1.5px] before:bg-primary before:block">
            {COPY[mode].eyebrow}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-serif font-bold text-dark text-[2.1rem] md:text-[2.8rem] lg:text-[3.4rem] leading-tight mb-5">
                {COPY[mode].title.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h2>
              <p className="text-muted text-[1.05rem] max-w-[520px]">{COPY[mode].body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-section rounded-[28px] p-8 sm:p-11 border border-border shadow-[0_40px_80px_-40px_rgba(24,24,24,.2)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-1.5 bg-bg rounded-full border border-border mb-8">
            {MODES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => switchMode(id)}
                aria-pressed={mode === id}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  mode === id
                    ? 'bg-dark text-white shadow-[0_8px_20px_-8px_rgba(24,24,24,.45)]'
                    : 'text-muted hover:text-dark'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            {mode === 'reserve' ? (
              <motion.div
                key="reserve"
                className="w-full"
                initial={{ rotateY: -90, opacity: 0, transformPerspective: 1200 }}
                animate={{ rotateY: 0, opacity: 1, transformPerspective: 1200 }}
                exit={{ rotateY: 90, opacity: 0, transformPerspective: 1200 }}
                transition={FLIP}
              >
                {resSubmitted ? (
                  <Success
                    title="Request sent!"
                    text="Thank you — our team will confirm your table over Instagram DM shortly."
                  />
                ) : (
                  <form onSubmit={handleReserveSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" htmlFor="res-name" className="sm:col-span-2">
                      <input id="res-name" name="name" type="text" required placeholder="Your name" className={INPUT} />
                    </Field>
                    <Field label="Phone / WhatsApp" htmlFor="res-phone">
                      <input id="res-phone" name="phone" type="tel" required placeholder="+62 8xx xxxx xxxx" className={INPUT} />
                    </Field>
                    <Field label="Guests" htmlFor="res-guests">
                      <select id="res-guests" name="guests" required className={INPUT} defaultValue="">
                        <option value="" disabled>
                          Select
                        </option>
                        <option>1–2 people</option>
                        <option>3–4 people</option>
                        <option>5–8 people</option>
                        <option>9+ people</option>
                      </select>
                    </Field>
                    <Field label="Date" htmlFor="res-date">
                      <input id="res-date" name="date" type="date" required className={INPUT} />
                    </Field>
                    <Field label="Time" htmlFor="res-time">
                      <input id="res-time" name="time" type="time" required className={INPUT} />
                    </Field>
                    <Field label="Message (optional)" htmlFor="res-message" className="sm:col-span-2">
                      <textarea
                        id="res-message"
                        name="message"
                        rows={3}
                        placeholder="Allergies, celebrations, seating preference..."
                        className={INPUT}
                      />
                    </Field>
                    <button
                      type="submit"
                      className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white bg-primary shadow-[0_8px_24px_-8px_rgba(229,57,53,.55)] hover:-translate-y-0.5 transition-transform"
                    >
                      Reserve Table
                    </button>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="order"
                className="w-full"
                initial={{ rotateY: 90, opacity: 0, transformPerspective: 1200 }}
                animate={{ rotateY: 0, opacity: 1, transformPerspective: 1200 }}
                exit={{ rotateY: -90, opacity: 0, transformPerspective: 1200 }}
                transition={FLIP}
              >
                <GoFoodCard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function GoFoodCard() {
  return (
    <div className="text-center py-10 px-2 sm:py-16">
      <div className="inline-flex items-center gap-2.5 mb-6">
        <span className="w-11 h-11 rounded-full bg-[#00AA13] text-white flex items-center justify-center font-serif font-bold text-lg">
          G
        </span>
        <span className="text-left leading-none">
          <span className="block font-extrabold text-lg text-[#00AA13]">GoFood</span>
          <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-muted font-semibold mt-1">
            by Gojek
          </span>
        </span>
      </div>
      <h3 className="font-serif text-2xl sm:text-[1.7rem] font-bold text-dark mb-3">
        Order straight from GoFood
      </h3>
      <p className="text-muted text-sm max-w-[380px] mx-auto mb-8">
        Delivery or pickup — we'll have your order ready the moment you arrive.
      </p>
      <a
        href={GFOOD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-9 py-4 rounded-full font-semibold text-xs sm:text-sm text-white bg-[#00AA13] shadow-[0_8px_24px_-8px_rgba(0,170,19,.55)] hover:-translate-y-0.5 transition-transform"
      >
        <ShoppingBag size={17} className="shrink-0" />
        Order on GoFood
        <ExternalLink size={15} className="opacity-80 shrink-0" />
      </a>
      <p className="text-[0.72rem] text-muted mt-5">Opens in a new tab</p>
    </div>
  )
}

function Success({ title, text }) {
  return (
    <div className="text-center py-8 px-2">
      <CheckCircle2 size={56} className="text-primary mx-auto mb-4" />
      <h3 className="font-serif text-xl mb-2 text-dark">{title}</h3>
      <p className="text-muted text-sm">{text}</p>
    </div>
  )
}

function Field({ label, htmlFor, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-xs font-semibold text-muted uppercase tracking-wide mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}
