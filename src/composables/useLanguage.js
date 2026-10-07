import { ref, watch } from 'vue'
import { messages } from '@/data/messages'

const stored = typeof window !== 'undefined' ? localStorage.getItem('portfolio-language') : null
const language = ref(['zh-Hant', 'en', 'ja'].includes(stored) ? stored : 'zh-Hant')
const isLanguageChanging = ref(false)
let transitionTimer

watch(
  language,
  (value) => {
    document.documentElement.lang = value
    localStorage.setItem('portfolio-language', value)
  },
  { immediate: true },
)

function setLanguage(nextLanguage) {
  if (nextLanguage === language.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    language.value = nextLanguage
    return
  }

  window.clearTimeout(transitionTimer)
  isLanguageChanging.value = true

  transitionTimer = window.setTimeout(() => {
    language.value = nextLanguage
    requestAnimationFrame(() => {
      isLanguageChanging.value = false
    })
  }, 120)
}

export function useLanguage() {
  const t = (path) =>
    path.split('.').reduce((value, key) => value?.[key], messages[language.value]) ?? path
  const pick = (value) => {
    if (value === null || value === undefined) return ''
    if (typeof value !== 'object') return value
    return value[language.value] ?? value['zh-Hant'] ?? ''
  }

  return { language, isLanguageChanging, setLanguage, t, pick }
}
