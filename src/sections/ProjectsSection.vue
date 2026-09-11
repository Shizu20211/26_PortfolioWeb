<script setup>
import ProjectSummaryCard from '@/components/ProjectSummaryCard.vue'
import SectionDecorations from '@/components/SectionDecorations.vue'
import { useLanguage } from '@/composables/useLanguage'
defineProps({ projects: Array })
const { t } = useLanguage()
</script>
<template>
  <section
    id="projects"
    class="portfolio-section projects-section"
    aria-labelledby="projects-title"
  >
    <SectionDecorations section="projects" />
    <div class="section-heading compact">
      <p class="chapter-label">02 · {{ t('sections.projects') }}</p>
      <h2 id="projects-title">{{ t('headings.projects') }}</h2>
    </div>
    <div class="project-grid">
      <ProjectSummaryCard v-for="project in projects" :key="project.slug" :project="project" />
    </div>
  </section>
</template>
