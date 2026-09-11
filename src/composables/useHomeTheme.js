import { readonly, ref } from 'vue'

const isHomeNight = ref(false)

export function useHomeTheme() {
  const toggleHomeTheme = () => {
    isHomeNight.value = !isHomeNight.value
  }

  return {
    isHomeNight: readonly(isHomeNight),
    toggleHomeTheme,
  }
}
