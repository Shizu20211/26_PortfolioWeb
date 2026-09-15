<script setup>
import { computed } from 'vue'
import flowerBlue from '@/assets/illustrations/decorations/FlowerBlue.png'
import flowerPink from '@/assets/illustrations/decorations/FlowerPink.png'
import FloatingCloud from '@/components/FloatingCloud.vue'
import ResponsivePortfolioImage from '@/components/ResponsivePortfolioImage.vue'

const props = defineProps({
  activeSection: { type: String, required: true },
})

const decoration = computed(() => {
  const variants = {
    home: { cloud: 'a', flower: flowerPink, width: 231, height: 231 },
    featured: { cloud: 'b', flower: flowerBlue, width: 233, height: 232 },
    projects: { cloud: 'a', flower: flowerPink, width: 231, height: 231 },
    artworks: { cloud: 'b', flower: flowerBlue, width: 233, height: 232 },
    about: { cloud: 'a', flower: flowerPink, width: 231, height: 231 },
  }

  return variants[props.activeSection] ?? variants.home
})
</script>

<template>
  <div class="portfolio-decorations" :data-section="activeSection" aria-hidden="true">
    <FloatingCloud
      class="portfolio-decoration portfolio-decoration--cloud"
      size="clamp(7rem, 12vw, 12rem)"
      :variant="decoration.cloud"
      duration="14s"
    />
    <ResponsivePortfolioImage
      class="portfolio-decoration portfolio-decoration--flower"
      :src="decoration.flower"
      alt=""
      :width="decoration.width"
      :height="decoration.height"
      sizes="(max-width: 760px) 64px, 108px"
      fetchpriority="low"
    />
  </div>
</template>
