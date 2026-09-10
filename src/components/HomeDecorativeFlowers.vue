<script setup>
import flowerBlue from '@/assets/illustrations/decorations/FlowerBlue.png'
import flowerPink from '@/assets/illustrations/decorations/FlowerPink.png'
import ResponsivePortfolioImage from './ResponsivePortfolioImage.vue'
</script>

<template>
  <div class="home-decorative-flowers" aria-hidden="true">
    <ResponsivePortfolioImage
      class="hero-decoration hero-decoration--blue"
      :src="flowerBlue"
      alt=""
      :width="233"
      :height="232"
      sizes="(max-width: 760px) 72px, 116px"
      loading="eager"
      fetchpriority="low"
    />
    <ResponsivePortfolioImage
      class="hero-decoration hero-decoration--pink"
      :src="flowerPink"
      alt=""
      :width="231"
      :height="231"
      sizes="(max-width: 760px) 64px, 104px"
      loading="eager"
      fetchpriority="low"
    />
  </div>
</template>
