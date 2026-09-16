<script setup>
import flowerBlue from '@/assets/illustrations/decorations/FlowerBlue.png'
import flowerPink from '@/assets/illustrations/decorations/FlowerPink.png'
import FloatingCloud from '@/components/FloatingCloud.vue'
import ResponsivePortfolioImage from '@/components/ResponsivePortfolioImage.vue'

const boundaries = [
  {
    key: 'home-featured',
    offset: '100vw',
    cloud: 'a',
    flower: flowerPink,
    width: 231,
    height: 231,
  },
  {
    key: 'featured-projects',
    offset: '400vw',
    cloud: 'b',
    flower: flowerBlue,
    width: 233,
    height: 232,
  },
  {
    key: 'projects-artworks',
    offset: '500vw',
    cloud: 'a',
    flower: flowerPink,
    width: 231,
    height: 231,
  },
  {
    key: 'artworks-about',
    offset: '600vw',
    cloud: 'b',
    flower: flowerBlue,
    width: 233,
    height: 232,
  },
]
</script>

<template>
  <div class="portfolio-decorations" aria-hidden="true">
    <div
      v-for="boundary in boundaries"
      :key="boundary.key"
      class="portfolio-boundary-decoration"
      :style="{ '--boundary-offset': boundary.offset }"
    >
      <FloatingCloud
        class="portfolio-decoration portfolio-decoration--cloud"
        size="clamp(7rem, 12vw, 12rem)"
        :variant="boundary.cloud"
        duration="14s"
      />
      <ResponsivePortfolioImage
        class="portfolio-decoration portfolio-decoration--flower"
        :src="boundary.flower"
        alt=""
        :width="boundary.width"
        :height="boundary.height"
        sizes="(max-width: 760px) 64px, 108px"
        fetchpriority="low"
      />
    </div>
  </div>
</template>
