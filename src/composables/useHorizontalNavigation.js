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

  function onWheel(event) {
    const isPortrait = matchMedia('(max-width: 760px) and (orientation: portrait)').matches
    const isHorizontalGesture = Math.abs(event.deltaX) >= Math.abs(event.deltaY)

    if (isPortrait || isHorizontalGesture || event.ctrlKey) return
    event.preventDefault()
    trackRef.value.scrollBy({ left: event.deltaY, behavior: 'auto' })
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
    trackRef.value?.removeEventListener('wheel', onWheel)
    document.removeEventListener('keydown', onKeydown)
  })

  return { goTo }
}
