<script setup>
import { computed } from 'vue'
import { artworks } from '@/data/artworks'
import ArtworkPreviewCard from '@/components/ArtworkPreviewCard.vue'
const publishedArtworks = computed(() => artworks.filter((artwork) => artwork.published))
</script>
<template>
  <main class="placeholder-view">
    <RouterLink to="/">← CHING-YUNG HUANG</RouterLink>
    <p class="chapter-label">ARTWORKS</p>
    <h1>Art & Material</h1>
    <div class="artworks-grid">
      <ArtworkPreviewCard
        v-for="(artwork, index) in publishedArtworks"
        :key="artwork.key"
        :artwork="artwork"
        :index="index"
      />
    </div>
  </main>
</template>
