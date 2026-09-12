<script setup>
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
    role="img"
    :aria-label="`${pick(project.title)}：${t(`featuredPanels.${panel}.image`)}`"
  >
    <span>{{ t(`featuredPanels.${panel}.label`) }}</span>
    <small>{{ t(`featuredPanels.${panel}.image`) }} · 1600 × 1000 · WebP / PNG</small>
  </div>
</template>
