import { onBeforeUnmount, onMounted } from 'vue'
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
  let gestureLocked = false
  let gestureTimer

  function goTo(index, options = {}) {
    const boundedIndex = Math.max(0, Math.min(index, sectionIds.length - 1))
    const left = getSectionOffset(boundedIndex)

    trackRef.value?.scrollTo({
      left,
      behavior: options.immediate || prefersReducedMotion.value ? 'auto' : 'smooth',
    })
  }

  function scrollToOffset(left, options = {}) {
    trackRef.value?.scrollTo({
      left,
      behavior: options.immediate || prefersReducedMotion.value ? 'auto' : 'smooth',
    })
  }

  function resetWheelGesture() {
    accumulatedDelta = 0
    gestureLocked = false
  }

  function onWheel(event) {
    const isPortrait = matchMedia('(max-width: 760px) and (orientation: portrait)').matches
    const isHorizontalGesture = Math.abs(event.deltaX) >= Math.abs(event.deltaY)

    if (isPortrait || isHorizontalGesture || event.ctrlKey) return

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
    trackRef.value?.removeEventListener('wheel', onWheel)
    document.removeEventListener('keydown', onKeydown)
  })

  return { goTo }
}
