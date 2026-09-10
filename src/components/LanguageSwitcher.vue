<script setup>
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
const { language, setLanguage, t } = useLanguage()

const options = [
  { value: 'zh-Hant', label: '中' },
  { value: 'en', label: 'EN' },
  { value: 'ja', label: '日' },
]

const activeIndex = computed(() => options.findIndex((option) => option.value === language.value))
const nextOption = computed(() => options[(activeIndex.value + 1) % options.length])

function switchToNextLanguage() {
  setLanguage(nextOption.value.value)
}
</script>

<template>
  <button
    class="language-toggle"
    type="button"
    :aria-label="`${t('language')}：${nextOption.label}`"
    @click="switchToNextLanguage"
  >
    <template v-for="(option, index) in options" :key="option.value">
      <span v-if="index" class="language-toggle__separator" aria-hidden="true">/</span>
      <span
        class="language-toggle__option"
        :class="{ 'is-active': language === option.value }"
        aria-hidden="true"
      >
        {{ option.label }}
      </span>
    </template>
  </button>
</template>
