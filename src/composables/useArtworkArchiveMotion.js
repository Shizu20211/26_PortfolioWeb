import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from './useReducedMotion'

const revealedArtworkKeys = new Set()

export function useArtworkArchiveMotion() {
  const sectionRef = ref(null)
  const isSharedHeadingVisible = ref(false)
  const { prefersReducedMotion } = useReducedMotion()
  let track
  let frame = 0
  let layoutFrame = 0
  let observer
  const visibleCards = new Set()

  function update() {
    frame = 0
    const viewportWidth = window.innerWidth
    visibleCards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      if (rect.right <= 0 || rect.left >= viewportWidth) return
      if (prefersReducedMotion.value) {
        card.style.setProperty('--artwork-parallax', '0%')
        return
      }

      const center = rect.left + rect.width / 2
      const progress = Math.max(-1, Math.min(1, (center - viewportWidth / 2) / viewportWidth))
      const strength = Number(card.dataset.parallaxStrength || 1)
      card.style.setProperty('--artwork-parallax', `${progress * -6 * strength}%`)
    })

    const section = sectionRef.value
    const intro = section?.querySelector('.artworks-intro')
    if (section && intro) {
      const sectionRect = section.getBoundingClientRect()
      const introRect = intro.getBoundingClientRect()
      isSharedHeadingVisible.value =
        introRect.right < window.innerWidth * 0.36 && sectionRect.right > window.innerWidth * 0.18
    }
  }

  function requestUpdate() {
    if (!frame) frame = requestAnimationFrame(update)
  }

  function measureRows() {
    layoutFrame = 0
    const section = sectionRef.value
    if (!section) return

    const isPortrait = matchMedia('(max-width: 760px) and (orientation: portrait)').matches
    section.style.removeProperty('--artworks-row-width')
    if (isPortrait) return

    const rows = [...section.querySelectorAll('.artworks-row')]
    const widestRow = Math.max(0, ...rows.map((row) => row.scrollWidth))
    if (widestRow) section.style.setProperty('--artworks-row-width', `${Math.ceil(widestRow)}px`)
  }

  function requestLayout() {
    if (!layoutFrame) layoutFrame = requestAnimationFrame(measureRows)
    requestUpdate()
  }

  onMounted(() => {
    track = sectionRef.value?.closest('.portfolio-track')
    const isPortrait = matchMedia('(max-width: 760px) and (orientation: portrait)').matches
    const cards = [...sectionRef.value.querySelectorAll('.artwork-card')]

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target
          const key = card.dataset.artworkKey

          if (entry.isIntersecting) {
            visibleCards.add(card)
            card.classList.add('is-revealed')
            if (key) revealedArtworkKeys.add(key)
          } else {
            visibleCards.delete(card)
          }
        })
        requestUpdate()
      },
      {
        root: isPortrait ? null : track,
        rootMargin: isPortrait ? '0px' : '0px -8% 0px 0px',
        threshold: 0.12,
      },
    )

    cards.forEach((card) => {
      const key = card.dataset.artworkKey
      if (prefersReducedMotion.value || (key && revealedArtworkKeys.has(key))) {
        card.classList.add('is-revealed')
      }
      observer.observe(card)
    })

    track?.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestLayout, { passive: true })
    requestLayout()
  })

  onBeforeUnmount(() => {
    track?.removeEventListener('scroll', requestUpdate)
    window.removeEventListener('resize', requestLayout)
    observer?.disconnect()
    visibleCards.clear()
    if (frame) cancelAnimationFrame(frame)
    if (layoutFrame) cancelAnimationFrame(layoutFrame)
  })

  return { sectionRef, requestUpdate, isSharedHeadingVisible }
}
