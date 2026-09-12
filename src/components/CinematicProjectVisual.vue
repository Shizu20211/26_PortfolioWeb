<script setup>
import ResponsivePortfolioImage from '@/components/ResponsivePortfolioImage.vue'
import { useLanguage } from '@/composables/useLanguage'

defineProps({
  project: { type: Object, required: true },
  panel: { type: String, required: true },
})

const { pick, t } = useLanguage()
</script>

<template>
  <div
    class="cinematic-project-visual"
    :class="{ 'cinematic-project-visual--media': project.media }"
    :role="project.media ? undefined : 'img'"
    :aria-label="
      project.media ? undefined : `${pick(project.title)}：${t(`featuredPanels.${panel}.image`)}`
    "
  >
    <ResponsivePortfolioImage
      v-if="project.media?.type === 'image'"
      :src="project.media.src"
      :alt="pick(project.media.alt)"
      :width="project.media.width"
      :height="project.media.height"
      sizes="(max-width: 760px) 100vw, 65vw"
      image-class="cinematic-project-visual__image"
    />
    <video
      v-else-if="project.media?.type === 'video'"
      class="cinematic-project-visual__video"
      :poster="project.media.poster"
      controls
      playsinline
      preload="metadata"
    >
      <source :src="project.media.src" :type="project.media.mimeType" />
      {{ pick(project.media.fallbackText) }}
    </video>
    <template v-else>
      <span>{{ t(`featuredPanels.${panel}.label`) }}</span>
      <small>{{ t(`featuredPanels.${panel}.image`) }} · 1600 × 1000 · WebP / PNG</small>
    </template>
  </div>
</template>
