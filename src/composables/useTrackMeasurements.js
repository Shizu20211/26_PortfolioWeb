import { nextTick, onBeforeUnmount, onMounted, readonly, ref, shallowRef } from 'vue'

/**
 * Keeps one shared map of the real horizontal positions used by navigation,
 * active-section detection, progress indicators, and future expanded panels.
 */
export function useTrackMeasurements(sectionIds, trackRef) {
  const measurements = shallowRef([])
  const trackScrollWidth = ref(0)
  const trackClientWidth = ref(0)

  let resizeObserver
  let measureFrame = 0

  function measure() {
    const track = trackRef.value
    if (!track) return

    measurements.value = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .map((element) => ({
        id: element.id,
        start: element.offsetLeft,
        end: element.offsetLeft + element.offsetWidth,
        width: element.offsetWidth,
      }))

    trackScrollWidth.value = track.scrollWidth
    trackClientWidth.value = track.clientWidth
  }

  function requestMeasure() {
    if (measureFrame) cancelAnimationFrame(measureFrame)

    measureFrame = requestAnimationFrame(() => {
      measureFrame = 0
      measure()
    })
  }

  function getSectionIndex(scrollLeft) {
    const positions = measurements.value
    if (!positions.length) return 0

    const position = Math.max(0, scrollLeft) + 1
    const index = positions.findIndex(({ start, end }) => position >= start && position < end)

    return index === -1 ? positions.length - 1 : index
  }

  function getSectionOffset(index) {
    return measurements.value[index]?.start ?? 0
  }

  async function refreshAfterLayout() {
    const track = trackRef.value
    if (!track) return

    const activeIndex = getSectionIndex(track.scrollLeft)
    const previousStart = getSectionOffset(activeIndex)
    const sectionId = measurements.value[activeIndex]?.id

    await nextTick()
    measure()

    const nextStart = measurements.value.find(({ id }) => id === sectionId)?.start ?? previousStart
    track.scrollLeft += nextStart - previousStart
  }

  onMounted(() => {
    resizeObserver = new ResizeObserver(requestMeasure)
    resizeObserver.observe(trackRef.value)

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) resizeObserver.observe(section)
    })

    measure()
    document.fonts?.ready.then(requestMeasure)
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    if (measureFrame) cancelAnimationFrame(measureFrame)
  })

  return {
    measurements: readonly(measurements),
    trackScrollWidth: readonly(trackScrollWidth),
    trackClientWidth: readonly(trackClientWidth),
    getSectionIndex,
    getSectionOffset,
    refreshAfterLayout,
    requestMeasure,
  }
}
