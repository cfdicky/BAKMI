import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import restaurant from '../data/restaurant.json'
import seedData from '../data/testimonials.json'

// Google Maps Platform API key, exposed to the client via Vite's import.meta.env.
// Set VITE_GOOGLE_MAPS_API_KEY in a .env file (see README) to pull LIVE reviews
// straight from Google Maps. Without it, the component falls back to the
// reviews saved in src/data/testimonials.json.
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function initials(name = 'Google User') {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Testimonials() {
  const [reviews, setReviews] = useState(seedData.reviews)
  const [rating, setRating] = useState(seedData.rating)
  const [reviewCount, setReviewCount] = useState(seedData.reviewCount)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) return // stay on the static fallback above

    let cancelled = false
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`
    script.async = true
    script.onload = async () => {
      try {
        const place = new window.google.maps.places.Place({ id: restaurant.googlePlaceId })
        await place.fetchFields({ fields: ['reviews', 'rating', 'userRatingCount'] })
        if (cancelled || !place.reviews?.length) return
        const colors = ['#E53935', '#FFD101', '#181818', '#4C8C4A', '#E8A93B', '#7A3B2E']
        setReviews(
          place.reviews.map((r, i) => ({
            id: `live-${i}`,
            author: r.authorAttribution?.displayName || 'Google User',
            initials: initials(r.authorAttribution?.displayName),
            color: colors[i % colors.length],
            rating: r.rating || 5,
            text: r.text || '',
            photo: r.authorAttribution?.photoURI,
          })),
        )
        if (place.rating) setRating(place.rating)
        if (place.userRatingCount) setReviewCount(place.userRatingCount)
        setIsLive(true)
      } catch (err) {
        console.warn('Live Google reviews unavailable, showing saved reviews.', err)
      }
    }
    script.onerror = () => console.warn('Could not load Google Maps script, showing saved reviews.')
    document.head.appendChild(script)
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="reviews" className="bg-section py-24 md:py-[140px]">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="max-w-[640px] mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2.5 justify-center font-sans font-semibold text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-4 before:content-[''] before:w-[26px] before:h-[1.5px] before:bg-primary before:block">
Reviews
          </div>
          <h2 className="font-serif font-bold text-dark text-[2.1rem] md:text-[2.8rem] lg:text-[3.4rem] leading-tight">
            What our guests say
          </h2>
          <div className="inline-flex items-center gap-3 bg-bg border border-border px-5 py-3 rounded-full mt-4 flex-wrap justify-center">
            <span className="text-accent tracking-[2px]">★★★★★</span>
            <strong className="font-serif text-dark">{rating.toFixed(1)}</strong>
            <span className="text-muted text-sm">
              · {reviewCount} ulasan Google {isLive && <em className="not-italic text-primary">(live)</em>}
            </span>
            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold text-sm hover:underline whitespace-nowrap"
            >
              View all on Google →
            </a>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={26}
          slidesPerView={1}
          breakpoints={{ 860: { slidesPerView: 3 } }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.tst-pagination' }}
          className="!pb-14 mt-10"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="p-8 rounded-[26px] bg-bg border border-border h-full">
                <div className="text-accent tracking-[2px] mb-4">{'★'.repeat(review.rating || 5)}</div>
                <p className="text-text mb-6 min-h-[96px]">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white font-serif font-bold text-sm overflow-hidden flex-shrink-0"
                    style={{ background: review.color }}
                  >
                    {review.photo ? (
                      <img src={review.photo} alt={review.author} className="w-full h-full object-cover" />
                    ) : (
                      review.initials
                    )}
                  </div>
                  <div>
                    <strong className="block text-sm text-dark">{review.author}</strong>
                    <small className="text-muted text-xs">Google Review</small>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="tst-pagination flex justify-center gap-2 -mt-6" />
      </div>
    </section>
  )
}
