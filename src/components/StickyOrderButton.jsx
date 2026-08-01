import { ShoppingBag } from 'lucide-react'

export default function StickyOrderButton() {
  function scrollToReservation(e) {
    e.preventDefault()
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToReservation}
      className="md:hidden fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[150] flex items-center gap-2.5 bg-primary text-white px-7 py-4 rounded-full shadow-[0_14px_30px_-10px_rgba(229,57,53,.6)] font-semibold"
    >
      <ShoppingBag size={18} />
      Order Now
    </button>
  )
}
