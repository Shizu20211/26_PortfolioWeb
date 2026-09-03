<script setup>
import LayeredHeroArtwork from '@/components/LayeredHeroArtwork.vue'
import ScrollHint from '@/components/ScrollHint.vue'
import { useLanguage } from '@/composables/useLanguage'
const emit = defineEmits(['next'])
const { t } = useLanguage()
</script>
<template>
  <section id="home" class="portfolio-section home-section" aria-labelledby="home-title">
    <div class="hero-copy">
      <p class="chapter-label">00 · {{ t('sections.home') }}</p>
      <p class="role">Creative Front-end Designer<br />Interactive Experience Designer</p>
      <h1 id="home-title">{{ t('homeTitle') }}</h1>
      <p class="lead">{{ t('homeLead') }}</p>
      <p class="hero-short">{{ t('homeShort') }}</p>
      <div class="skill-pills" aria-label="Core skills">
        <span>Visual Design</span><span>Vue / Front-end</span><span>Craft & Culture</span>
      </div>
      <button class="primary-link" type="button" @click="emit('next')">
        {{ t('viewWork') }} <span>↗</span></button
      ><button class="text-link" type="button" disabled>
        {{ t('resume') }} <span aria-hidden="true">↓</span>
      </button>
    </div>
    <LayeredHeroArtwork />
    <ScrollHint />
  </section>
</template>
