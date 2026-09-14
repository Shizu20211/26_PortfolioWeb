import { onBeforeUnmount, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Adds motion only to Featured media. The main portfolio track remains the
 * source of truth for navigation, active-section state, touch, and keyboard.
 */
export function useFeaturedGalleryMotion(trackRef) {
  const { prefersReducedMotion } = useReducedMotion()
  let context

  function createMotion() {
    const track = trackRef.value
    const featured = document.getElementById('featured')
    if (!track || !featured || prefersReducedMotion.value) return

    context = gsap.context(() => {
      gsap.utils.toArray('.featured-panel .cinematic-project-visual__image').forEach((image) => {
        const panel = image.closest('.featured-panel')

        gsap.fromTo(
          image,
          { xPercent: -2.5, scale: 1.035 },
          {
            xPercent: 2.5,
            scale: 1.035,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              scroller: track,
              horizontal: true,
              start: 'left right',
              end: 'right left',
              scrub: 0.8,
              // 圖片視差
              invalidateOnRefresh: true,
            },
          },
        )
      })
    }, featured)

    ScrollTrigger.refresh()
  }

  onMounted(() => requestAnimationFrame(createMotion))

  onBeforeUnmount(() => {
    context?.revert()
  })
}
