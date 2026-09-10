import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from './useReducedMotion'

let hasPlayedHomeIntro = false

export function useHomeIntro() {
  const { prefersReducedMotion } = useReducedMotion()
  const shouldPlay =
    !hasPlayedHomeIntro &&
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isHomeIntroPlaying = ref(shouldPlay)
  let finishTimer

  hasPlayedHomeIntro = true

  const finish = () => {
    window.clearTimeout(finishTimer)
    isHomeIntroPlaying.value = false
  }

  onMounted(() => {
    if (isHomeIntroPlaying.value) finishTimer = window.setTimeout(finish, 1100)
  })

  watch(prefersReducedMotion, (reduced) => reduced && finish())
  onBeforeUnmount(() => window.clearTimeout(finishTimer))

  return { isHomeIntroPlaying }
}
