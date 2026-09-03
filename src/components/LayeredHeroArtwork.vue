<script setup>
import { usePointerParallax } from '@/composables/usePointerParallax'
import { useLanguage } from '@/composables/useLanguage'
import FloatingCloud from './FloatingCloud.vue'
const { target, move, reset } = usePointerParallax()
const { language } = useLanguage()
</script>
<template>
  <div ref="target" class="layered-hero" @pointermove="move" @pointerleave="reset">
    <div class="hero-sun hero-layer" aria-hidden="true"></div>
    <div class="hero-image-frame hero-layer"><img src="@/assets/images/intro/intro-flower-window.png" :alt="({ 'zh-Hant': '暖色花叢與窗景插畫', en: 'Warm-toned illustration of flowers beside a window', ja: '暖色の花々と窓辺を描いたイラスト' })[language]" /></div>
    <FloatingCloud top="7%" left="-4%" size="22%" duration="9s" :opacity=".82" />
    <FloatingCloud top="19%" left="76%" size="18%" duration="11s" delay="-3s" :opacity=".64" />
    <span class="floating-note">finding light<br>in the everyday</span>
  </div>
</template>
