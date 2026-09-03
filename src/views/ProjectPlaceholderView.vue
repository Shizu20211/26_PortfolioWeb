<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '@/data/projects'
import { useLanguage } from '@/composables/useLanguage'
const route = useRoute()
const { pick, t } = useLanguage()
const project = computed(() => projects.find(({ slug }) => slug === route.params.slug))
</script>
<template>
  <main class="placeholder-view">
    <RouterLink to="/">← CHING-YUNG HUANG</RouterLink>
    <div v-if="project">
      <p class="chapter-label">PROJECT · {{ project.slug }}</p>
      <h1>{{ pick(project.title) }}</h1>
      <p>{{ pick(project.summary) }}</p>
      <div class="media-placeholder">
        <span>CASE STUDY IMAGE SLOT</span><small>2400 × 1500 · WEBP / PNG</small>
      </div>
      <p class="status-pill">{{ t('comingSoon') }}</p>
    </div>
  </main>
</template>
