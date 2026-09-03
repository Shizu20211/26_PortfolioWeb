<script setup>
import { useLanguage } from '@/composables/useLanguage'
defineProps({ artwork: { type: Object, required: true }, index: Number })
const { pick, t } = useLanguage()
</script>
<template><article class="artwork-card"><div class="artwork-placeholder"><span>{{ String(index + 1).padStart(2, '0') }}</span><small>LONG EDGE 1600PX · WEBP / PNG</small></div><div><p>{{ artwork.type }}</p><h3>{{ pick(artwork.title) }}</h3><small>{{ t('contribution') }} · {{ artwork.contribution ? pick(artwork.contribution) : t('comingSoon') }}</small></div></article></template>
