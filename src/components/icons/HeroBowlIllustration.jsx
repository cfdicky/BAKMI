import logo from '../../assets/logo.png'

const chips = [
  {
    key: 'egg',
    className: 'w-[84px] h-[84px] top-[6%] left-0',
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
    className: 'w-[92px] h-[92px] top-[2%] right-[2%]',
    delay: '1.4s',
    bg: '#FDE7DD',
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M6 15c0-5 3-9 7-9s6 3 6 6-2 5-5 6-8 1-8-3z"
          fill="#E8A26B"
          stroke="#C97A44"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    key: 'scallion',
    className: 'w-[66px] h-[66px] bottom-[30%] -left-[4%]',
    delay: '0.8s',
    bg: '#E7F3E4',
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M8 4c2 3 2 9 1 15M12 3c1 4 1 10-1 16M16 4c-1 4-2 9-1 15"
          stroke="#4C8C4A"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: 'wonton',
    className: 'w-[78px] h-[78px] bottom-[6%] -right-[2%]',
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
    className: 'w-[58px] h-[58px] top-[38%] -right-[8%]',
    delay: '1.7s',
    bg: '#FBE1DE',
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M5 6c3-1 5 1 5 3 0 5-4 9-2 11 4 2 8-4 8-9"
          stroke="#E53935"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: 'sesame',
    className: 'w-[52px] h-[52px] bottom-[14%] left-[14%]',
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

export default function HeroBowlIllustration() {
  return (
    <div className="relative w-full max-w-[560px]">
      {/* Steam */}
      <div className="absolute left-1/2 top-[2%] w-[220px] h-[260px] -translate-x-1/2 z-[3] pointer-events-none">
        <span
          className="absolute bottom-0 left-[40px] w-[34px] h-[120px] rounded-full bg-gradient-to-t from-white/85 to-transparent blur-[10px] animate-steam"
          style={{ animationDelay: '0s' }}
        />
        <span
          className="absolute bottom-0 left-[95px] w-[34px] h-[150px] rounded-full bg-gradient-to-t from-white/85 to-transparent blur-[10px] animate-steam"
          style={{ animationDelay: '1.1s' }}
        />
        <span
          className="absolute bottom-0 left-[150px] w-[34px] h-[120px] rounded-full bg-gradient-to-t from-white/85 to-transparent blur-[10px] animate-steam"
          style={{ animationDelay: '2.2s' }}
        />
      </div>

      {/* Chopsticks */}
      <div
        className="absolute w-[210px] h-[6px] top-[16%] right-[8%] rounded-md shadow-lg animate-chop origin-right"
        style={{ background: 'linear-gradient(90deg,#7a5230,#a9764a)', transform: 'rotate(38deg)' }}
      />
      <div
        className="absolute w-[210px] h-[6px] top-[20%] right-[11%] rounded-md shadow-lg animate-chop origin-right"
        style={{ background: 'linear-gradient(90deg,#7a5230,#a9764a)', transform: 'rotate(38deg)', animationDelay: '0.4s' }}
      />

      {/* Signature logo stamp */}
      <div
        className="absolute z-[4] w-[96px] h-[96px] sm:w-[132px] sm:h-[132px] -bottom-[2%] sm:-bottom-[6%] left-[-2%] sm:-left-[9%] animate-stamp"
        style={{ transform: 'rotate(-13deg)' }}
      >
        <img
          src={logo}
          alt="Bakmi Jakarta CC logo stamp"
          className="w-full h-full rounded-full object-cover border-4 border-white"
          style={{ boxShadow: '0 18px 34px -12px rgba(24,24,24,.35), 0 0 0 8px rgba(255,209,1,.35)' }}
        />
      </div>

      {/* Floating ingredient chips */}
      {chips.map((chip) => (
        <div
          key={chip.key}
          className={`absolute rounded-full bg-white flex items-center justify-center shadow-[0_16px_34px_-12px_rgba(24,24,24,0.22)] animate-floaty ${chip.className}`}
          style={{ background: chip.bg, animationDelay: chip.delay }}
        >
          <div className="w-[56%] h-[56%]">{chip.svg}</div>
        </div>
      ))}

      {/* The bowl itself */}
      <svg
        viewBox="0 0 520 480"
        width="100%"
        className="relative z-[2]"
        style={{ filter: 'drop-shadow(0 40px 50px rgba(24,24,24,.22))' }}
      >
        <defs>
          <linearGradient id="broth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a2c1c" />
            <stop offset="100%" stopColor="#2b1811" />
          </linearGradient>
          <linearGradient id="bowlOuter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1ece3" />
          </linearGradient>
          <linearGradient id="noodleGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F6DFAE" />
            <stop offset="100%" stopColor="#EFC77E" />
          </linearGradient>
        </defs>
        <ellipse cx="260" cy="440" rx="170" ry="24" fill="#000" opacity=".08" />
        <path
          d="M60 210 Q60 400 260 400 Q460 400 460 210 L460 190 L60 190 Z"
          fill="url(#bowlOuter)"
          stroke="#e3dccd"
          strokeWidth="2"
        />
        <ellipse cx="260" cy="190" rx="200" ry="34" fill="url(#bowlOuter)" stroke="#e3dccd" strokeWidth="2" />
        <ellipse cx="260" cy="192" rx="168" ry="24" fill="url(#broth)" />
        <g stroke="url(#noodleGrad)" strokeWidth="7" fill="none" strokeLinecap="round" opacity=".95">
          <path d="M130 190 Q170 165 210 190 T290 190 T370 190" />
          <path d="M120 200 Q165 225 205 200 T285 200 T365 200" />
          <path d="M150 178 Q190 200 225 178 T300 178 T375 178" />
        </g>
        <circle cx="205" cy="184" r="15" fill="#FFF3D6" stroke="#E8A93B" strokeWidth="1.5" />
        <circle cx="205" cy="184" r="6" fill="#FFC107" />
        <path
          d="M310 178c6-10 22-10 26 2 3 9-6 16-14 14-9 8-20 2-18-8 1-6 4-8 6-8z"
          fill="#E8A26B"
          stroke="#C97A44"
          strokeWidth="1"
        />
        <path
          d="M255 170c2 6 2 14 1 22M270 168c1 7 1 15-1 22"
          stroke="#4C8C4A"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="345" cy="196" r="10" fill="#F3D9AE" stroke="#C79A55" strokeWidth="1" />
      </svg>
    </div>
  )
}
