import { onBeforeUnmount, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from './useReducedMotion'

export function useHorizontalNavigation({
  sectionIds,
  trackRef,
  getSectionIndex,
  getSectionOffset,
  getSectionEndOffset,
  getAdjacentOffset,
}) {
  const { prefersReducedMotion } = useReducedMotion()
  const initialSectionId = location.hash.slice(1)

  let accumulatedDelta = 0
  let wideSectionTarget
  let activeWideSectionId
  let gestureLocked = false
  let sectionTransitioning = false
  let gestureTimer

  function restoreSectionSnap() {
    const track = trackRef.value
    sectionTransitioning = false
    gestureLocked = false
    track?.classList.remove('is-featured-scrubbing', 'is-wide-section-scrubbing')
  }

  function goTo(index, options = {}) {
    const boundedIndex = Math.max(0, Math.min(index, sectionIds.length - 1))
    const left = getSectionOffset(boundedIndex)
    scrollToOffset(left, options)
  }

  function scrollToOffset(left, options = {}) {
    const track = trackRef.value
    if (!track) return

    gsap.killTweensOf(track, 'scrollLeft')
    wideSectionTarget = undefined
    activeWideSectionId = undefined
    sectionTransitioning = true
    track.classList.add('is-wide-section-scrubbing')

    if (options.immediate || prefersReducedMotion.value) {
      track.scrollLeft = left
      restoreSectionSnap()
      return
    }

    gsap.to(track, {
      scrollLeft: left,
      duration: 0.72,
      ease: 'power3.inOut',
      overwrite: 'auto',
      onComplete: restoreSectionSnap,
      onInterrupt: restoreSectionSnap,
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

  function scrollWideSection(event, sectionId) {
    const track = trackRef.value
    const section = document.getElementById(sectionId)
    if (!track || !section || section.offsetWidth <= track.clientWidth + 8) return false

    const start = section.offsetLeft
    const end = start + section.offsetWidth - track.clientWidth
    const current = track.scrollLeft
    const delta = normalizeWheelDelta(event)
    const direction = Math.sign(delta)
    const sectionIndex = sectionIds.indexOf(sectionId)
    const tolerance = 6
    const isWithinSection = current >= start - tolerance && current <= end + tolerance
    const isLeavingStart = direction < 0 && current <= start + tolerance
    const isLeavingEnd = direction > 0 && current >= end - tolerance
    if (activeWideSectionId !== sectionId) {
      activeWideSectionId = sectionId
      wideSectionTarget = current
    }

    const targetReachedStart = direction < 0 && wideSectionTarget <= start + tolerance
    const targetReachedEnd = direction > 0 && wideSectionTarget >= end - tolerance

    if (isWithinSection && (isLeavingStart || targetReachedStart)) {
      const previousOffset = sectionIndex > 0 ? getSectionOffset(sectionIndex - 1) : undefined
      if (Number.isFinite(previousOffset)) {
        event.preventDefault()
        scrollToOffset(previousOffset)
        return true
      }
    }

    if (isWithinSection && (isLeavingEnd || targetReachedEnd)) {
      const nextOffset =
        sectionIndex < sectionIds.length - 1 ? getSectionOffset(sectionIndex + 1) : undefined
      if (Number.isFinite(nextOffset)) {
        event.preventDefault()
        scrollToOffset(nextOffset)
        return true
      }
    }

    if (!isWithinSection || isLeavingStart || isLeavingEnd) return false

    event.preventDefault()
    resetWheelGesture()
    track.classList.add('is-wide-section-scrubbing')

    const base = wideSectionTarget ?? current
    wideSectionTarget = Math.max(start, Math.min(end, base + delta))

    if (prefersReducedMotion.value) {
      track.scrollLeft = wideSectionTarget
      return true
    }

    gsap.to(track, {
      scrollLeft: wideSectionTarget,
      duration: 0.78,
      ease: 'power3.out',
      overwrite: 'auto',
    })
    return true
  }

  function canScrollNestedContent(event) {
    const scroller = event.target.closest('[data-vertical-scroll]')
    if (!scroller) return false

    const direction = Math.sign(event.deltaY)
    const canScrollUp = scroller.scrollTop > 1
    const canScrollDown = scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 1

    return (direction < 0 && canScrollUp) || (direction > 0 && canScrollDown)
  }

  function onWheel(event) {
    if (document.body.classList.contains('frontend-work-detail-open')) return
    const isPortrait = matchMedia('(max-width: 760px) and (orientation: portrait)').matches
    const isHorizontalGesture = Math.abs(event.deltaX) >= Math.abs(event.deltaY)

    if (isPortrait || event.ctrlKey) return
    if (sectionTransitioning) {
      event.preventDefault()
      return
    }
    if (isHorizontalGesture) {
      wideSectionTarget = undefined
      activeWideSectionId = undefined
      return
    }
    if (canScrollNestedContent(event)) return
    if (scrollWideSection(event, 'artworks')) return

    wideSectionTarget = undefined
    activeWideSectionId = undefined
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
    const current = trackRef.value.scrollLeft
    const currentSectionIndex = getSectionIndex(current)
    const currentSectionStart = getSectionOffset(currentSectionIndex)
    const isAtSectionStart = Math.abs(current - currentSectionStart) <= 8
    const previousSectionEnd =
      direction < 0 && isAtSectionStart && currentSectionIndex > 0
        ? getSectionEndOffset(currentSectionIndex - 1)
        : undefined
    const targetOffset = Number.isFinite(previousSectionEnd)
      ? previousSectionEnd
      : getAdjacentOffset(current, direction)
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
    if (document.body.classList.contains('frontend-work-detail-open')) return
    const isArrowKey = ['ArrowLeft', 'ArrowRight'].includes(event.key)
    const isInteractiveTarget = event.target.closest('input, button, a, textarea, select')

    if (!isArrowKey || isInteractiveTarget) return

    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const current = trackRef.value.scrollLeft
    const currentSectionIndex = getSectionIndex(current)
    const currentSectionStart = getSectionOffset(currentSectionIndex)
    const previousSectionEnd =
      direction < 0 && Math.abs(current - currentSectionStart) <= 8 && currentSectionIndex > 0
        ? getSectionEndOffset(currentSectionIndex - 1)
        : undefined
    const targetOffset = Number.isFinite(previousSectionEnd)
      ? previousSectionEnd
      : getAdjacentOffset(current, direction)
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
    if (trackRef.value) {
      gsap.killTweensOf(trackRef.value, 'scrollLeft')
      trackRef.value.classList.remove('is-featured-scrubbing', 'is-wide-section-scrubbing')
    }
    trackRef.value?.removeEventListener('wheel', onWheel)
    document.removeEventListener('keydown', onKeydown)
  })

  return { goTo }
}
