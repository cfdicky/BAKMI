import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import faqItems from '../data/faq.json'

export default function FAQ() {
  const [openId, setOpenId] = useState(null)

  return (
    <section className="bg-bg py-24 md:py-[140px]">
      <div className="container mx-auto px-8 max-w-[820px]">
        <div className="max-w-[640px] mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2.5 justify-center font-sans font-semibold text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-4 before:content-[''] before:w-[26px] before:h-[1.5px] before:bg-primary before:block">
            FAQ
          </div>
          <h2 className="font-serif font-bold text-dark text-[2.1rem] md:text-[2.8rem] leading-tight">
            Good to know
          </h2>
        </div>

        <div>
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            return (
              <div key={item.id} className="border-b border-border">
                <button
                  className="w-full flex items-center justify-between gap-5 py-7 text-left"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                >
                  <h4 className="text-[1.05rem] font-semibold text-dark">{item.question}</h4>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                      isOpen ? 'bg-primary text-white rotate-180' : 'bg-section text-dark'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: isOpen ? '200px' : '0px' }}
                >
                  <p className="text-muted text-[0.94rem] pb-7 max-w-[640px]">{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
