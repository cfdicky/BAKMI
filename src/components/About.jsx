import { motion } from 'framer-motion'
import restaurant from '../data/restaurant.json'
import mieImg from '../assets/mie.png'
import bakmi2Img from '../assets/bakmi-2.png'

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 0.84, 0.44, 1] } },
}

export default function About() {
  return (
    <section id="about" className="relative bg-bg py-24 md:py-[150px] overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 65%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 65%)',
        }}
      >
        <img src={mieImg} alt="" className="w-[130%] h-[130%] max-w-none object-cover" />
      </div>
      <div className="container mx-auto px-8 max-w-[1280px] relative z-[1] grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-16 md:gap-20 items-start">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="md:sticky md:top-[130px]"
        >
          <div
            className="relative aspect-[4/5] rounded-[28px] overflow-hidden flex items-center justify-center shadow-[0_40px_70px_-30px_rgba(24,24,24,.35)]"
            style={{ background: 'linear-gradient(155deg,#2c2c2c,#181818 60%)' }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,193,7,.18), transparent 55%)' }}
            />
            <img src={bakmi2Img} alt="Bakmi Jakarta" className="w-full h-full object-cover relative z-[1]" />
            <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-[2] bg-black/40 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/15 shadow-xl text-center">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-accent tracking-wide leading-none mb-1">10</p>
              <p className="text-white/95 text-[0.62rem] md:text-[0.72rem] font-sans font-medium leading-relaxed tracking-widest uppercase">
                Years serving
                <br />
                Bakmie
              </p>
            </div>
          </div>
        </motion.div>

        <div>
          <div className="inline-flex items-center gap-2.5 font-sans font-semibold text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-4 before:content-[''] before:w-[26px] before:h-[1.5px] before:bg-primary before:block">
            Our Story
          </div>
          <h2 className="font-serif font-bold text-dark text-[2.1rem] md:text-[3rem] lg:text-[3.4rem] leading-tight mb-6">
            A Jakarta kitchen,
            <br />
            now open in Bali.
          </h2>
          {restaurant.aboutParagraphs.map((p, i) => (
            <p key={i} className="text-muted text-[1.05rem] mb-5 max-w-none">
              {p}
            </p>
          ))}

          <div className="mt-12 border-t border-border">
            {restaurant.timeline.map((item, i) => (
              <motion.div
                key={item.year + item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={reveal}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[70px_1fr] sm:grid-cols-[110px_1fr] gap-4 sm:gap-7 py-6 sm:py-7 border-b border-border"
              >
                <div className="font-serif font-bold text-[1.3rem] text-primary">{item.year}</div>
                <div>
                  <h4 className="text-[1.08rem] mb-2 font-serif font-semibold text-dark">{item.title}</h4>
                  <p className="text-muted text-[0.92rem] max-w-[460px]">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
