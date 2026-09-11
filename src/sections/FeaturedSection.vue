<script setup>
import ProjectSummaryCard from '@/components/ProjectSummaryCard.vue'
import SectionDecorations from '@/components/SectionDecorations.vue'
import { useLanguage } from '@/composables/useLanguage'
defineProps({ project: Object })
const { t } = useLanguage()
</script>
<template>
  <section
    id="featured"
    class="portfolio-section featured-section"
    aria-labelledby="featured-title"
  >
    <SectionDecorations section="featured" />
    <div class="section-heading">
      <p class="chapter-label">01 · {{ t('sections.featured') }}</p>
      <h2 id="featured-title">{{ t('headings.featured') }}</h2>
      <p>{{ t('featuredNote') }}</p>
    </div>
    <ProjectSummaryCard :project="project" featured />
  </section>
</template>
