import { nextTick, onBeforeUnmount, onMounted, readonly, ref, shallowRef } from 'vue'

/**
 * Keeps one shared map of the real horizontal positions used by navigation,
 * active-section detection, progress indicators, and future expanded panels.
 */
export function useTrackMeasurements(sectionIds, trackRef) {
  const measurements = shallowRef([])
  const trackScrollWidth = ref(0)
  const trackClientWidth = ref(0)
  const navigationStops = shallowRef([])

  let resizeObserver
  let measureFrame = 0

  function measure() {
    const track = trackRef.value
    if (!track) return

    const trackRect = track.getBoundingClientRect()
    const isPortrait = window.matchMedia('(max-width: 760px) and (orientation: portrait)').matches
    measurements.value = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .map((element) => {
        const panels = [...element.querySelectorAll('[data-track-panel]')]
        const panelOffsets = isPortrait
          ? []
          : panels.map(
              (panel) => panel.getBoundingClientRect().left - trackRect.left + track.scrollLeft,
            )

        return {
          id: element.id,
          start: element.offsetLeft,
          end: element.offsetLeft + element.offsetWidth,
          width: element.offsetWidth,
          panelOffsets,
        }
      })

    navigationStops.value = measurements.value.flatMap((section, sectionIndex) =>
      (section.panelOffsets.length ? section.panelOffsets : [section.start]).map((offset) => ({
        sectionIndex,
        offset,
      })),
    )

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

  function getSectionEndOffset(index) {
    const section = measurements.value[index]
    if (!section) return undefined

    return Math.max(section.start, section.end - trackClientWidth.value)
  }

  function getAdjacentOffset(scrollLeft, direction) {
    const tolerance = 4
    const offsets = navigationStops.value.map(({ offset }) => offset)

    if (direction > 0) return offsets.find((offset) => offset > scrollLeft + tolerance)
    for (let index = offsets.length - 1; index >= 0; index -= 1) {
      if (offsets[index] < scrollLeft - tolerance) return offsets[index]
    }

    return undefined
  }

  async function refreshAfterLayout() {
    const track = trackRef.value
    if (!track) return

    const activeIndex = getSectionIndex(track.scrollLeft)
    const previousSection = measurements.value[activeIndex]
    const previousStart = previousSection?.start ?? 0
    const sectionId = previousSection?.id
    const sectionProgress = previousSection?.width
      ? (track.scrollLeft - previousStart) / previousSection.width
      : 0

    await nextTick()
    measure()

    const nextSection = measurements.value.find(({ id }) => id === sectionId)
    const nextStart = nextSection?.start ?? previousStart
    track.scrollLeft =
      nextStart + Math.max(0, Math.min(sectionProgress, 1)) * (nextSection?.width ?? 0)
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
    navigationStops: readonly(navigationStops),
    getSectionIndex,
    getSectionOffset,
    getSectionEndOffset,
    getAdjacentOffset,
    refreshAfterLayout,
    requestMeasure,
  }
}
