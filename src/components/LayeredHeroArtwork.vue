<script setup>
import introMain from '@/assets/images/intro/intro-main.png'
import { usePointerParallax } from '@/composables/usePointerParallax'
import { useLanguage } from '@/composables/useLanguage'
import FloatingCloud from './FloatingCloud.vue'
import HomeCelestialToggle from './HomeCelestialToggle.vue'
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
    <HomeCelestialToggle />
    <div class="hero-image-frame hero-layer">
      <ResponsivePortfolioImage
        :src="introMain"
        :alt="pick(introAlt)"
        :width="2656"
        :height="1768"
        sizes="(max-width: 760px) 92vw, 58vw"
        loading="eager"
        fetchpriority="high"
      />
    </div>
    <FloatingCloud top="-5%" left="-11%" size="22%" variant="a" duration="9s" loading="eager" />
    <FloatingCloud
      top="24%"
      left="91%"
      size="18%"
      variant="b"
      duration="11s"
      delay="-3s"
      loading="eager"
    />
    <HomeDecorativeFlowers />
  </div>
</template>
