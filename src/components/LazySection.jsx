import { Suspense, useEffect, useRef, useState } from 'react'

// Defers mounting (and therefore the dynamic import()) of a below-fold
// section until it gets close to the viewport. This keeps the initial
// network burst small so it never competes with the LCP image, while the
// section's code still loads long before the user actually scrolls to it.
export default function LazySection({ component: Component, ...props }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect()
          setVisible(true)
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <Suspense fallback={null}>{visible ? <Component {...props} /> : null}</Suspense>
    </div>
  )
}
