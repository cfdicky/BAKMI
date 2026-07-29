export default function FoodIcon({ tone = '#4a2c1c' }) {
  return (
    <svg viewBox="0 0 200 160" className="w-[52%]">
      <ellipse cx="100" cy="150" rx="70" ry="8" fill="#000" opacity=".08" />
      <ellipse cx="100" cy="90" rx="86" ry="66" fill="#fdfaf4" stroke="#e7dfd0" strokeWidth="2" />
      <ellipse cx="100" cy="90" rx="68" ry="46" fill={tone} />
      <g stroke="#F6DFAE" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".95">
        <path d="M50 88 Q75 68 100 88 T150 88" />
        <path d="M45 100 Q72 118 98 100 T148 100" />
        <path d="M58 72 Q82 92 108 72 T155 74" />
      </g>
      <circle cx="80" cy="78" r="8" fill="#FFF3D6" stroke="#E8A93B" strokeWidth="1" />
      <circle cx="80" cy="78" r="3.4" fill="#FFC107" />
      <path
        d="M128 80c4-6 14-6 16 1 2 5-3 9-9 8-5 5-12 1-11-5 0-3 2-4 4-4z"
        fill="#E8A26B"
        stroke="#C97A44"
        strokeWidth="1"
      />
    </svg>
  )
}
