export default function NoodleDivider({ color = '#E53935', wavy = false, opacity = 0.35 }) {
  const path = wavy
    ? 'M0 30 Q60 55 120 30 T240 30 T360 30 T480 30 T600 30 T720 30 T840 30 T960 30 T1080 30 T1200 30 T1320 30 T1440 30'
    : 'M0 30 Q60 5 120 30 T240 30 T360 30 T480 30 T600 30 T720 30 T840 30 T960 30 T1080 30 T1200 30 T1320 30 T1440 30'

  return (
    <div className="w-full overflow-hidden leading-none relative z-[1]">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-auto block">
        <path d={path} fill="none" stroke={color} strokeWidth={wavy ? 2 : 1.5} opacity={opacity} />
      </svg>
    </div>
  )
}
