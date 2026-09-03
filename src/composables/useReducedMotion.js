import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useReducedMotion() {
  const prefersReducedMotion = ref(false)
  let query
  const update = () => {
    prefersReducedMotion.value = query.matches
  }
  onMounted(() => {
    query = window.matchMedia('(prefers-reduced-motion: reduce)')
    update()
    query.addEventListener('change', update)
  })
  onBeforeUnmount(() => query?.removeEventListener('change', update))
  return { prefersReducedMotion }
}
