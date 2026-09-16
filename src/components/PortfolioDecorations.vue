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
    cloudTop: '12%',
    cloudX: '-5rem',
    flowerBottom: '12%',
    flowerX: '-2.5rem',
    flowerRotation: '-8deg',
  },
  {
    key: 'featured-projects',
    offset: '400vw',
    cloud: 'b',
    flower: flowerBlue,
    width: 233,
    height: 232,
    cloudTop: '8%',
    cloudX: '-4rem',
    flowerBottom: '18%',
    flowerX: '-3rem',
    flowerRotation: '6deg',
  },
  {
    key: 'projects-artworks',
    offset: '500vw',
    cloud: 'a',
    flower: flowerPink,
    width: 231,
    height: 231,
    cloudTop: '16%',
    cloudX: '-6rem',
    flowerBottom: '10%',
    flowerX: '-2rem',
    flowerRotation: '-10deg',
  },
  {
    key: 'artworks-about',
    offset: '600vw',
    cloud: 'b',
    flower: flowerBlue,
    width: 233,
    height: 232,
    cloudTop: '10%',
    cloudX: '-4.5rem',
    flowerBottom: '20%',
    flowerX: '-3.5rem',
    flowerRotation: '8deg',
  },
]
</script>

<template>
  <div class="portfolio-decorations" aria-hidden="true">
    <div
      v-for="boundary in boundaries"
      :key="boundary.key"
      class="portfolio-boundary-decoration"
      :style="{
        '--boundary-offset': boundary.offset,
        '--boundary-cloud-top': boundary.cloudTop,
        '--boundary-cloud-x': boundary.cloudX,
        '--boundary-flower-bottom': boundary.flowerBottom,
        '--boundary-flower-x': boundary.flowerX,
        '--boundary-flower-rotation': boundary.flowerRotation,
      }"
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
