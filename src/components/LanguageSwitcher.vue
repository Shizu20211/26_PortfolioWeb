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
  <div class="language-switcher" :aria-label="t('language')">
    <template v-for="(option, index) in options" :key="option.value">
      <span v-if="index" class="language-switcher__separator" aria-hidden="true">/</span>
      <button
        type="button"
        :class="{ active: language === option.value }"
        :aria-pressed="language === option.value"
        @click="setLanguage(option.value)"
      >
        {{ option.label }}
      </button>
    </template>
  </div>
</template>
