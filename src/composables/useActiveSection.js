import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useActiveSection(sectionIds, trackRef) {
  const activeSectionIndex = ref(0)
  let observer
  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        activeSectionIndex.value = sectionIds.indexOf(visible.target.id)
        history.replaceState(
          null,
          '',
          activeSectionIndex.value ? `#${visible.target.id}` : location.pathname,
        )
      },
      { root: trackRef.value, threshold: [0.55, 0.72] },
    )
    sectionIds.forEach(
      (id) => document.getElementById(id) && observer.observe(document.getElementById(id)),
    )
  })
  onBeforeUnmount(() => observer?.disconnect())
  return { activeSectionIndex }
}
