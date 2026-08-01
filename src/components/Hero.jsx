import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import mieImg from '../assets/mie.webp'
import logo from '../assets/logo.webp'
import restaurant from '../data/restaurant.json'

const chips = [
  {
    key: 'egg',
    className: 'w-[58px] h-[58px] sm:w-[84px] sm:h-[84px] top-[6%] left-0',
    delay: '0.2s',
    bg: '#FFF3D6',
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="13" rx="8" ry="7" fill="#FFF6E5" stroke="#E8A93B" strokeWidth="1" />
        <circle cx="12" cy="13" r="3.4" fill="#FFC107" />
      </svg>
    ),
  },
  {
    key: 'chicken',
    className: 'w-[60px] h-[60px] sm:w-[92px] sm:h-[92px] top-[2%] right-[2%]',
    delay: '1.4s',
    bg: '#FDE7DD',
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 15c0-5 3-9 7-9s6 3 6 6-2 5-5 6-8 1-8-3z" fill="#E8A26B" stroke="#C97A44" strokeWidth="1" />
      </svg>
    ),
  },
  {
    key: 'scallion',
    className: 'w-[44px] h-[44px] sm:w-[66px] sm:h-[66px] bottom-[30%] -left-[4%]',
    delay: '0.8s',
    bg: '#E7F3E4',
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M8 4c2 3 2 9 1 15M12 3c1 4 1 10-1 16M16 4c-1 4-2 9-1 15" stroke="#4C8C4A" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'wonton',
    className: 'w-[52px] h-[52px] sm:w-[78px] sm:h-[78px] bottom-[6%] -right-[2%]',
    delay: '2s',
    bg: '#FFF1E4',
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 8l8 4 8-4-8-4-8 4z" fill="#F3D9AE" stroke="#C79A55" strokeWidth="1" />
        <path d="M4 8v6l8 4 8-4V8" fill="none" stroke="#C79A55" strokeWidth="1" />
      </svg>
    ),
  },
  {
    key: 'chili',
    className: 'w-[40px] h-[40px] sm:w-[58px] sm:h-[58px] top-[38%] -right-[8%]',
    delay: '1.7s',
    bg: '#FBE1DE',
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 6c3-1 5 1 5 3 0 5-4 9-2 11 4 2 8-4 8-9" stroke="#E53935" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'sesame',
    className: 'w-[36px] h-[36px] sm:w-[52px] sm:h-[52px] bottom-[14%] left-[14%]',
    delay: '2.6s',
    bg: '#F4EFE4',
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <ellipse cx="8" cy="10" rx="2.2" ry="1.3" fill="#E9DAB4" />
        <ellipse cx="15" cy="8" rx="2.2" ry="1.3" fill="#E9DAB4" transform="rotate(20 15 8)" />
        <ellipse cx="12" cy="16" rx="2.2" ry="1.3" fill="#E9DAB4" transform="rotate(-10 12 16)" />
      </svg>
    ),
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.16, 0.84, 0.44, 1] },
  }),
}

export default function Hero() {
  const blob1Ref = useRef(null)
  const blob2Ref = useRef(null)

  useEffect(() => {
    function onMouseMove(e) {
      if (window.innerWidth < 768) return
      const x = (e.clientX / window.innerWidth - 0.5) * 24
      const y = (e.clientY / window.innerHeight - 0.5) * 24
      if (blob1Ref.current) blob1Ref.current.style.transform = `translate(${x}px, ${y}px)`
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate(${-x}px, ${-y}px)`
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-bg pt-28 md:pt-[150px] pb-12 md:pb-24" style={{ minHeight: '100dvh' }}>
      <div
        ref={blob1Ref}
        className="absolute w-[640px] h-[640px] rounded-full opacity-55 blur-[70px] -top-40 -right-36 transition-transform duration-500 ease-out"
        style={{ background: 'radial-gradient(circle, rgba(255,209,1,.65), transparent 70%)' }}
      />
      <div
        ref={blob2Ref}
        className="absolute w-[320px] h-[320px] rounded-full opacity-40 blur-[80px] bottom-0 -left-16 transition-transform duration-500 ease-out"
        style={{ background: 'radial-gradient(circle, rgba(229,57,53,.16), transparent 70%)' }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
        <img src={mieImg} alt="" className="w-[130%] h-[130%] max-w-none object-cover scale-x-[-1]" />
        <div className="absolute bottom-0 left-0 w-full h-40 md:h-56" style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }} />
      </div>

      <div className="container mx-auto px-8 max-w-[1280px] relative z-[2] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div className="text-center md:text-left order-2 md:order-1">
          <motion.span
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 font-sans font-semibold text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-4 before:content-[''] before:w-[26px] before:h-[1.5px] before:bg-primary before:block"
          >
            {restaurant.tagline}
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="font-serif font-bold text-dark leading-[1.08] tracking-tight text-[2.8rem] md:text-[3.6rem] lg:text-[5.2rem] mb-5"
          >
            Handmade <em className="italic text-primary">Bakmi</em>,<br />
            Made Like Home.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="text-dark text-[1.15rem] mb-9 max-w-[520px] mx-auto md:mx-0"
          >
            {restaurant.description}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            className="flex gap-4 flex-wrap justify-center md:justify-start mb-11"
          >
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white bg-primary shadow-[0_8px_24px_-8px_rgba(229,57,53,.55)] hover:-translate-y-0.5 transition-transform"
            >
              Explore Menu
            </a>
            <a
              href="#reservation"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-dark bg-accent shadow-[0_8px_24px_-8px_rgba(255,209,1,.45)] hover:-translate-y-0.5 transition-transform"
            >
              Reserve Table
            </a>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 0.84, 0.44, 1], delay: 0.3 }}
          className="relative flex items-center justify-center order-1 md:order-2 w-full max-w-[520px] mx-auto md:mx-0 md:max-w-none"
        >
          <div className="relative w-full max-w-[560px]">
            {/* Bakmi photo with frame */}
            <div className="relative z-[1] rounded-[24px] sm:rounded-[32px] border-[4px] sm:border-[6px] border-white overflow-hidden" style={{ boxShadow: '0 30px 60px -16px rgba(0,0,0,0.35), 0 12px 28px -8px rgba(0,0,0,0.2), inset 0 -8px 20px -6px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.3)' }}>
              <img
                src="/bakmi.webp"
                srcSet="/bakmi-560.webp 560w, /bakmi.webp 922w"
                sizes="(min-width: 768px) 560px, calc(100vw - 4rem)"
                alt="Bakmi Jakarta"
                className="w-full"
                width={922}
                height={1152}
                decoding="async"
                fetchpriority="high"
              />
            </div>

            {/* Steam */}
            <div className="absolute left-1/2 top-[2%] w-[160px] h-[180px] sm:w-[220px] sm:h-[260px] -translate-x-1/2 z-[2] pointer-events-none">
              <span className="absolute bottom-0 left-[20px] sm:left-[40px] w-[24px] sm:w-[34px] h-[80px] sm:h-[120px] rounded-full bg-gradient-to-t from-white/85 to-transparent blur-[8px] sm:blur-[10px] animate-steam" style={{ animationDelay: '0s' }} />
              <span className="absolute bottom-0 left-[65px] sm:left-[95px] w-[24px] sm:w-[34px] h-[100px] sm:h-[150px] rounded-full bg-gradient-to-t from-white/85 to-transparent blur-[8px] sm:blur-[10px] animate-steam" style={{ animationDelay: '1.1s' }} />
              <span className="absolute bottom-0 left-[110px] sm:left-[150px] w-[24px] sm:w-[34px] h-[80px] sm:h-[120px] rounded-full bg-gradient-to-t from-white/85 to-transparent blur-[8px] sm:blur-[10px] animate-steam" style={{ animationDelay: '2.2s' }} />
            </div>

            {/* Chopsticks */}
            <div className="absolute w-[140px] sm:w-[210px] h-[5px] sm:h-[6px] top-[16%] right-[6%] sm:right-[8%] rounded-md shadow-lg animate-chop origin-right z-[2]" style={{ background: 'linear-gradient(90deg,#7a5230,#a9764a)', transform: 'rotate(38deg)' }} />
            <div className="absolute w-[140px] sm:w-[210px] h-[5px] sm:h-[6px] top-[20%] right-[9%] sm:right-[11%] rounded-md shadow-lg animate-chop origin-right z-[2]" style={{ background: 'linear-gradient(90deg,#7a5230,#a9764a)', transform: 'rotate(38deg)', animationDelay: '0.4s' }} />

            {/* Floating ingredient chips */}
            {chips.map((chip) => (
              <div
                key={chip.key}
                className={`absolute rounded-full bg-white flex items-center justify-center shadow-[0_16px_34px_-12px_rgba(24,24,24,0.22)] animate-floaty z-[2] ${chip.className}`}
                style={{ background: chip.bg, animationDelay: chip.delay }}
              >
                <div className="w-[56%] h-[56%]">{chip.svg}</div>
              </div>
            ))}

            {/* Logo stamp */}
            <div className="absolute z-[3] w-[72px] h-[72px] sm:w-[132px] sm:h-[132px] -bottom-[2%] sm:-bottom-[6%] left-[-2%] sm:-left-[9%] animate-stamp" style={{ transform: 'rotate(-13deg)' }}>
              <img src={logo} alt="Bakmi Jakarta CC logo stamp" className="w-full h-full rounded-full object-cover border-[3px] sm:border-[4px] border-white" style={{ boxShadow: '0 18px 34px -12px rgba(24,24,24,.35), 0 0 0 6px rgba(255,209,1,.35)' }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
