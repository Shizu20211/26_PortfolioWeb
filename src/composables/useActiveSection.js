import { onBeforeUnmount, onMounted, readonly, ref, watch } from 'vue'

export function useActiveSection(sectionIds, trackRef, measurements, getSectionIndex) {
  const activeSectionIndex = ref(0)
  const trackProgress = ref(0)

  let intersectionObserver
  let scrollFrame = 0

  const portraitQuery = window.matchMedia('(max-width: 760px) and (orientation: portrait)')

  function updateHash(index) {
    const id = sectionIds[index]
    if (!id) return

    const nextUrl = index === 0 ? location.pathname : `#${id}`
    if (`${location.pathname}${location.hash}` !== nextUrl) {
      history.replaceState(null, '', nextUrl)
    }
  }

  function setActiveSection(index) {
    if (index < 0 || index >= sectionIds.length) return
    if (activeSectionIndex.value !== index) activeSectionIndex.value = index
    updateHash(index)
  }

  function updateFromTrack() {
    const track = trackRef.value
    if (!track) return

    const maximum = Math.max(track.scrollWidth - track.clientWidth, 0)
    trackProgress.value = maximum ? Math.max(0, Math.min(track.scrollLeft / maximum, 1)) : 0
    if (portraitQuery.matches) return
    setActiveSection(getSectionIndex(track.scrollLeft))
  }

  function onTrackScroll() {
    if (scrollFrame) return
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0
      updateFromTrack()
    })
  }

  function onPortraitIntersection(entries) {
    if (!portraitQuery.matches) return

    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

    if (visible) setActiveSection(sectionIds.indexOf(visible.target.id))
  }

  function onLayoutModeChange() {
    if (!portraitQuery.matches) updateFromTrack()
  }

  onMounted(() => {
    trackRef.value.addEventListener('scroll', onTrackScroll, { passive: true })
    portraitQuery.addEventListener('change', onLayoutModeChange)

    intersectionObserver = new IntersectionObserver(onPortraitIntersection, {
      root: null,
      rootMargin: '-25% 0px -50% 0px',
      threshold: [0, 0.25, 0.5],
    })

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) intersectionObserver.observe(section)
    })

    updateFromTrack()
  })

  watch(measurements, updateFromTrack)

  onBeforeUnmount(() => {
    trackRef.value?.removeEventListener('scroll', onTrackScroll)
    portraitQuery.removeEventListener('change', onLayoutModeChange)
    intersectionObserver?.disconnect()
    if (scrollFrame) cancelAnimationFrame(scrollFrame)
  })

  return {
    activeSectionIndex: readonly(activeSectionIndex),
    trackProgress: readonly(trackProgress),
    setActiveSection,
  }
}
