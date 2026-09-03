<script setup>
import ArtworkPreviewCard from '@/components/ArtworkPreviewCard.vue'
import { useLanguage } from '@/composables/useLanguage'
defineProps({ artworks: Array })
const { t } = useLanguage()
</script>
<template><section id="artworks" class="portfolio-section artworks-section" aria-labelledby="artworks-title"><div class="section-heading compact"><p class="chapter-label">03 · {{ t('sections.artworks') }}</p><h2 id="artworks-title">{{ t('headings.artworks') }}</h2></div><div class="artworks-grid"><ArtworkPreviewCard v-for="(artwork, index) in artworks" :key="artwork.key" :artwork="artwork" :index="index" /></div><RouterLink class="corner-link" to="/artworks">{{ t('viewProject') }} ↗</RouterLink></section></template>
