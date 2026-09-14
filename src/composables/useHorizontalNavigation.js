import { onBeforeUnmount, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from './useReducedMotion'

export function useHorizontalNavigation({
  sectionIds,
  trackRef,
  getSectionOffset,
  getAdjacentOffset,
}) {
  const { prefersReducedMotion } = useReducedMotion()
  const initialSectionId = location.hash.slice(1)

  let accumulatedDelta = 0
  let featuredTarget
  let gestureLocked = false
  let gestureTimer

  function goTo(index, options = {}) {
    const boundedIndex = Math.max(0, Math.min(index, sectionIds.length - 1))
    const left = getSectionOffset(boundedIndex)

    if (trackRef.value) gsap.killTweensOf(trackRef.value, 'scrollLeft')
    featuredTarget = undefined
    trackRef.value?.scrollTo({
      left,
      behavior: options.immediate || prefersReducedMotion.value ? 'auto' : 'smooth',
    })
  }

  function scrollToOffset(left, options = {}) {
    if (trackRef.value) gsap.killTweensOf(trackRef.value, 'scrollLeft')
    featuredTarget = undefined
    trackRef.value?.scrollTo({
      left,
      behavior: options.immediate || prefersReducedMotion.value ? 'auto' : 'smooth',
    })
  }

  function resetWheelGesture() {
    accumulatedDelta = 0
    gestureLocked = false
  }

  function normalizeWheelDelta(event) {
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 18
    if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * innerWidth
    return event.deltaY
  }

  function scrollFeaturedGallery(event) {
    const track = trackRef.value
    const featured = document.getElementById('featured')
    if (!track || !featured) return false

    const start = featured.offsetLeft
    const end = start + featured.offsetWidth - track.clientWidth
    const current = track.scrollLeft
    const delta = normalizeWheelDelta(event)
    const direction = Math.sign(delta)
    const tolerance = 6
    const isWithinFeatured = current >= start - tolerance && current <= end + tolerance
    const isLeavingStart = direction < 0 && current <= start + tolerance
    const isLeavingEnd = direction > 0 && current >= end - tolerance

    if (!isWithinFeatured || isLeavingStart || isLeavingEnd) return false

    event.preventDefault()
    resetWheelGesture()

    const base = featuredTarget ?? current
    featuredTarget = Math.max(start, Math.min(end, base + delta))

    if (prefersReducedMotion.value) {
      track.scrollLeft = featuredTarget
      return true
    }

    gsap.to(track, {
      scrollLeft: featuredTarget,
      duration: 0.62,
      ease: 'power3.out',
      overwrite: 'auto',
    })
    return true
  }

  function onWheel(event) {
    const isPortrait = matchMedia('(max-width: 760px) and (orientation: portrait)').matches
    const isHorizontalGesture = Math.abs(event.deltaX) >= Math.abs(event.deltaY)

    if (isPortrait || isHorizontalGesture || event.ctrlKey) return
    if (scrollFeaturedGallery(event)) return

    featuredTarget = undefined
    window.clearTimeout(gestureTimer)
    gestureTimer = window.setTimeout(resetWheelGesture, 220)

    if (gestureLocked) {
      event.preventDefault()
      return
    }

    accumulatedDelta += event.deltaY
    if (Math.abs(accumulatedDelta) < 28) {
      event.preventDefault()
      return
    }

    const direction = accumulatedDelta > 0 ? 1 : -1
    const targetOffset = getAdjacentOffset(trackRef.value.scrollLeft, direction)
    if (targetOffset === undefined) {
      resetWheelGesture()
      return
    }

    event.preventDefault()
    gestureLocked = true
    accumulatedDelta = 0
    scrollToOffset(targetOffset)
  }

  function onKeydown(event) {
    const isArrowKey = ['ArrowLeft', 'ArrowRight'].includes(event.key)
    const isInteractiveTarget = event.target.closest('input, button, a, textarea, select')

    if (!isArrowKey || isInteractiveTarget) return

    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const targetOffset = getAdjacentOffset(trackRef.value.scrollLeft, direction)
    if (targetOffset !== undefined) scrollToOffset(targetOffset)
  }

  onMounted(() => {
    const track = trackRef.value
    track.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('keydown', onKeydown)

    if (initialSectionId) {
      const targetIndex = sectionIds.indexOf(initialSectionId)
      if (targetIndex >= 0) requestAnimationFrame(() => goTo(targetIndex, { immediate: true }))
    }
  })

  onBeforeUnmount(() => {
    window.clearTimeout(gestureTimer)
    if (trackRef.value) gsap.killTweensOf(trackRef.value, 'scrollLeft')
    trackRef.value?.removeEventListener('wheel', onWheel)
    document.removeEventListener('keydown', onKeydown)
  })

  return { goTo }
}
