<script setup>
import introFlowerWindow from '@/assets/images/intro/intro-flower-window-wide.png'
import { usePointerParallax } from '@/composables/usePointerParallax'
import { useLanguage } from '@/composables/useLanguage'
import FloatingCloud from './FloatingCloud.vue'
import HomeDecorativeFlowers from './HomeDecorativeFlowers.vue'
import ResponsivePortfolioImage from './ResponsivePortfolioImage.vue'
const { target, move, reset } = usePointerParallax()
const { pick } = useLanguage()

const introAlt = {
  'zh-Hant': '暖色花叢與窗景插畫',
  en: 'Warm-toned illustration of flowers beside a window',
  ja: '暖色の花々と窓辺を描いたイラスト',
}
</script>
<template>
  <div ref="target" class="layered-hero" @pointermove="move" @pointerleave="reset">
    <div class="hero-sun hero-layer" aria-hidden="true"></div>
    <div class="hero-image-frame hero-layer">
      <ResponsivePortfolioImage
        :src="introFlowerWindow"
        :alt="pick(introAlt)"
        :width="3100"
        :height="2067"
        sizes="(max-width: 760px) 92vw, 58vw"
        loading="eager"
        fetchpriority="high"
      />
    </div>
    <FloatingCloud
      top="7%"
      left="-4%"
      size="22%"
      variant="a"
      duration="9s"
      :opacity="0.82"
      loading="eager"
    />
    <FloatingCloud
      top="19%"
      left="76%"
      size="18%"
      variant="b"
      duration="11s"
      delay="-3s"
      :opacity="0.64"
      loading="eager"
    />
    <HomeDecorativeFlowers />
  </div>
</template>
