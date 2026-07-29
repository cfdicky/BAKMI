import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // NOTE: this only shows a confirmation UI. Wire this up to your own backend,
    // a form service (e.g. Formspree), or a WhatsApp deep link before going live.
    setSubmitted(true)
  }

  return (
    <section id="reservation" className="bg-bg py-24 md:py-[150px]">
      <div className="container mx-auto px-8 max-w-[1280px] grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-[70px] items-center">
        <div>
          <div className="inline-flex items-center gap-2.5 font-sans font-semibold text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-4 before:content-[''] before:w-[26px] before:h-[1.5px] before:bg-primary before:block">
            Reservation
          </div>
          <h2 className="font-serif font-bold text-dark text-[2.1rem] md:text-[2.8rem] lg:text-[3.4rem] leading-tight mb-5">
            Save your table,
            <br />
            we'll save the seat.
          </h2>
          <p className="text-muted text-[1.05rem] max-w-[520px]">
            Walk-ins are always welcome, but for groups of four or more — or weekend dinner service — we
            recommend booking ahead. We'll confirm by WhatsApp within the hour.
          </p>
        </div>

        <div className="bg-section rounded-[28px] p-8 sm:p-11 border border-border shadow-[0_40px_80px_-40px_rgba(24,24,24,.2)]">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <Field label="Full Name" className="sm:col-span-2">
                  <input type="text" required placeholder="Your name" className={inputClass} />
                </Field>
                <Field label="Phone / WhatsApp">
                  <input type="tel" required placeholder="+62 8xx xxxx xxxx" className={inputClass} />
                </Field>
                <Field label="Guests">
                  <select required className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select
                    </option>
                    <option>1–2 people</option>
                    <option>3–4 people</option>
                    <option>5–8 people</option>
                    <option>9+ people</option>
                  </select>
                </Field>
                <Field label="Date">
                  <input type="date" required className={inputClass} />
                </Field>
                <Field label="Time">
                  <input type="time" required className={inputClass} />
                </Field>
                <Field label="Message (optional)" className="sm:col-span-2">
                  <textarea
                    rows={3}
                    placeholder="Allergies, celebrations, seating preference..."
                    className={inputClass}
                  />
                </Field>
                <button
                  type="submit"
                  className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white bg-primary shadow-[0_8px_24px_-8px_rgba(229,57,53,.55)] hover:-translate-y-0.5 transition-transform"
                >
                  Reserve Table
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 px-2"
              >
                <CheckCircle2 size={56} className="text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl mb-2 text-dark">Request received!</h3>
                <p className="text-muted text-sm">
                  Thank you — our team will confirm your table over WhatsApp shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const inputClass =
  'w-full px-4 py-3.5 border-[1.5px] border-border rounded-xl bg-bg text-text focus:outline-none focus:border-primary transition-colors'

function Field({ label, className = '', children }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-2">{label}</label>
      {children}
    </div>
  )
}
