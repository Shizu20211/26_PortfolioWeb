<script setup>
import { useLanguage } from '@/composables/useLanguage'

defineEmits(['home'])
const { t } = useLanguage()
</script>

<template>
  <footer class="portfolio-footer">
    <p>© 2026 CHING-YUNG HUANG</p>
    <button type="button" data-magnetic @click="$emit('home')">{{ t('backHome') }} ↑</button>
  </footer>
</template>
