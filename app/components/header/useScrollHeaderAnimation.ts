import { useMotionValue, useTransform, useViewportScroll } from 'framer-motion'
import { useRef, useEffect } from 'react'

const useScrollHeaderAnimation = (scrollThreshold: [number, number]) => {
  const { scrollY } = useViewportScroll(),
    scrollYOnDirectionChange = useRef(scrollY.get()),
    lastPixelsScrolled = useRef<number>(0),
    lastScrollDirection = useRef<'down' | 'up'>(),
    pixelsScrolled = useMotionValue(0),
    headerHeight = useTransform(pixelsScrolled, scrollThreshold, [100, 60]),
    logoHeight = useTransform(pixelsScrolled, scrollThreshold, [33, 30]),
    backgroundOpacity = useTransform(
      pixelsScrolled,
      scrollThreshold,
      [0.6, 0.3]
    )

  useEffect(() => {
    return scrollY.onChange(latest => {
      if (latest < 0) return

      const isScrollingDown = scrollY.getPrevious() - latest < 0,
        scrollDirection = isScrollingDown ? 'down' : 'up',
        currentPixelsScrolled = pixelsScrolled.get()
      let newPixelsScrolled: number

      if (lastScrollDirection.current !== scrollDirection) {
        lastPixelsScrolled.current = currentPixelsScrolled
        scrollYOnDirectionChange.current = latest
      }

      if (isScrollingDown) {
        newPixelsScrolled = Math.min(
          lastPixelsScrolled.current +
            (latest - scrollYOnDirectionChange.current),
          scrollThreshold[1]!
        )
      } else {
        newPixelsScrolled = Math.max(
          lastPixelsScrolled.current -
            (scrollYOnDirectionChange.current - latest),
          scrollThreshold[0]!
        )
      }

      pixelsScrolled.set(newPixelsScrolled)
      lastScrollDirection.current = scrollDirection
    })
  }, [pixelsScrolled, scrollY, scrollThreshold])

  return {
    logoHeight,
    headerHeight,
    backgroundOpacity
  }
}

export default useScrollHeaderAnimation
