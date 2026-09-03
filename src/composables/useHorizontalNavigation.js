import { onBeforeUnmount, onMounted } from 'vue'
import { useReducedMotion } from './useReducedMotion'

export function useHorizontalNavigation(sectionIds, trackRef, activeSectionIndex) {
  const { prefersReducedMotion } = useReducedMotion()
  let accumulated = 0
  let locked = false
  let timer
  const goTo = (index) =>
    document
      .getElementById(sectionIds[Math.max(0, Math.min(index, sectionIds.length - 1))])
      ?.scrollIntoView({
        behavior: prefersReducedMotion.value ? 'auto' : 'smooth',
        inline: 'start',
      })
  const onWheel = (event) => {
    if (
      matchMedia('(max-width: 760px) and (orientation: portrait)').matches ||
      Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
      event.ctrlKey
    )
      return
    clearTimeout(timer)
    timer = setTimeout(() => {
      accumulated = 0
      locked = false
    }, 220)
    if (locked) {
      event.preventDefault()
      return
    }
    accumulated += event.deltaY
    if (Math.abs(accumulated) < 28) {
      event.preventDefault()
      return
    }
    const next = activeSectionIndex.value + (accumulated > 0 ? 1 : -1)
    if (next < 0 || next >= sectionIds.length) return
    event.preventDefault()
    locked = true
    accumulated = 0
    goTo(next)
  }
  const onKeydown = (event) => {
    if (
      !['ArrowLeft', 'ArrowRight'].includes(event.key) ||
      event.target.closest('input, button, a')
    )
      return
    event.preventDefault()
    goTo(activeSectionIndex.value + (event.key === 'ArrowRight' ? 1 : -1))
  }
  let dragging = false
  let startX = 0
  let startScroll = 0
  const onPointerDown = (event) => {
    if (event.target.closest('a, button') || (event.pointerType === 'mouse' && event.button !== 0))
      return
    dragging = true
    startX = event.clientX
    startScroll = trackRef.value.scrollLeft
    trackRef.value.classList.add('is-dragging')
    trackRef.value.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event) => {
    if (dragging) trackRef.value.scrollLeft = startScroll - (event.clientX - startX)
  }
  const onPointerEnd = (event) => {
    if (!dragging) return
    dragging = false
    trackRef.value.classList.remove('is-dragging')
    if (trackRef.value.hasPointerCapture(event.pointerId))
      trackRef.value.releasePointerCapture(event.pointerId)
  }
  onMounted(() => {
    const track = trackRef.value
    track.addEventListener('wheel', onWheel, { passive: false })
    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', onPointerEnd)
    track.addEventListener('pointercancel', onPointerEnd)
    document.addEventListener('keydown', onKeydown)
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ inline: 'start' })
  })
  onBeforeUnmount(() => {
    const track = trackRef.value
    clearTimeout(timer)
    track?.removeEventListener('wheel', onWheel)
    track?.removeEventListener('pointerdown', onPointerDown)
    track?.removeEventListener('pointermove', onPointerMove)
    track?.removeEventListener('pointerup', onPointerEnd)
    track?.removeEventListener('pointercancel', onPointerEnd)
    document.removeEventListener('keydown', onKeydown)
  })
  return { goTo }
}
