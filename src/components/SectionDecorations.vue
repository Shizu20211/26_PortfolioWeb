<script setup>
import { computed } from 'vue'
import flowerBlue from '@/assets/illustrations/decorations/FlowerBlue.png'
import flowerPink from '@/assets/illustrations/decorations/FlowerPink.png'
import FloatingCloud from './FloatingCloud.vue'
import ResponsivePortfolioImage from './ResponsivePortfolioImage.vue'

const props = defineProps({
  section: {
    type: String,
    required: true,
    validator: (value) => ['featured', 'projects', 'artworks', 'about'].includes(value),
  },
})

const decoration = computed(() => {
  const variants = {
    featured: { cloud: 'a', flower: flowerPink, width: 231, height: 231 },
    projects: { cloud: 'b', flower: flowerBlue, width: 233, height: 232 },
    artworks: { cloud: 'a', flower: flowerPink, width: 231, height: 231 },
    about: { cloud: 'b', flower: flowerBlue, width: 233, height: 232 },
  }

  return variants[props.section]
})
</script>

<template>
  <div class="section-decorations" :class="`section-decorations--${section}`" aria-hidden="true">
    <FloatingCloud
      class="section-decoration section-decoration--cloud"
      size="var(--section-decoration-cloud-size)"
      :variant="decoration.cloud"
      duration="12s"
    />
    <ResponsivePortfolioImage
      class="section-decoration section-decoration--flower"
      :src="decoration.flower"
      alt=""
      :width="decoration.width"
      :height="decoration.height"
      sizes="(max-width: 760px) 64px, 112px"
      fetchpriority="low"
    />
  </div>
</template>
