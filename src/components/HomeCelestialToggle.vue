<script setup>
import { useHomeTheme } from '@/composables/useHomeTheme'
import { useLanguage } from '@/composables/useLanguage'

const { isHomeNight, toggleHomeTheme } = useHomeTheme()
const { t } = useLanguage()
</script>

<template>
  <div class="home-atmosphere" :class="{ 'is-night': isHomeNight }">
    <div class="home-night-stars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
    <button
      class="home-celestial-toggle"
      type="button"
      data-magnetic
      :aria-label="isHomeNight ? t('switchToDay') : t('switchToNight')"
      :aria-pressed="isHomeNight"
      @click="toggleHomeTheme"
    >
      <span class="home-celestial-toggle__body" aria-hidden="true"></span>
    </button>
  </div>
</template>
