<script setup>
import { useLanguage } from '@/composables/useLanguage'
const { language, t } = useLanguage()
const options = [{ value: 'zh-Hant', label: '中' }, { value: 'en', label: 'EN' }, { value: 'ja', label: '日' }]
</script>
<template>
  <div class="language-switcher" :aria-label="t('language')">
    <button v-for="option in options" :key="option.value" type="button" :class="{ active: language === option.value }" :aria-pressed="language === option.value" @click="language = option.value">{{ option.label }}</button>
  </div>
</template>
