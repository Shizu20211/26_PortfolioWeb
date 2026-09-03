import { computed, ref, watch } from 'vue'
import { messages } from '@/data/messages'

const stored = typeof window !== 'undefined' ? localStorage.getItem('portfolio-language') : null
const language = ref(['zh-Hant', 'en', 'ja'].includes(stored) ? stored : 'zh-Hant')

export function useLanguage() {
  const t = (path) => path.split('.').reduce((value, key) => value?.[key], messages[language.value]) ?? path
  const pick = (value) => value?.[language.value] ?? value?.['zh-Hant'] ?? ''
  const languageLabel = computed(() => ({ 'zh-Hant': '中文', en: 'English', ja: '日本語' })[language.value])

  watch(language, (value) => {
    document.documentElement.lang = value
    localStorage.setItem('portfolio-language', value)
  }, { immediate: true })

  return { language, languageLabel, t, pick }
}
