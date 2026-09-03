<script setup>
import { useLanguage } from '@/composables/useLanguage'
defineProps({ activeIndex: Number, total: Number })
const { t } = useLanguage()
</script>
<template><p class="section-progress"><span class="sr-only">{{ t('page') }}</span>{{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(total).padStart(2, '0') }}</p></template>
