<script setup>
import { useLanguage } from '@/composables/useLanguage'
const { language, setLanguage, t } = useLanguage()

const options = [
  { value: 'zh-Hant', label: '中' },
  { value: 'en', label: 'EN' },
  { value: 'ja', label: '日' },
]
</script>

<template>
  <div class="language-switcher" role="group" :aria-label="t('language')">
    <button
      v-for="option in options"
      :key="option.value"
      class="language-switcher__option"
      :class="{ 'is-active': language === option.value }"
      type="button"
      data-magnetic
      :aria-pressed="language === option.value"
      @click="setLanguage(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
