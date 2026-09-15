<script setup>
import CinematicProjectVisual from '@/components/CinematicProjectVisual.vue'
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
    <div class="featured-panels">
      <article class="featured-panel featured-panel--overview" data-track-panel>
        <div class="section-heading">
          <p class="chapter-label">01 · {{ t('sections.featured') }}</p>
          <h2 id="featured-title">{{ t('headings.featured') }}</h2>
          <p>{{ t('featuredNote') }}</p>
        </div>
        <ProjectSummaryCard :project="project" featured />
      </article>
      <div
        class="section-heading section-heading--subpanel featured-shared-heading"
        aria-hidden="true"
      >
        <p class="chapter-label">01 · {{ t('sections.featured') }}</p>
        <h2>{{ t('headings.featured') }}</h2>
      </div>
      <article class="featured-panel featured-panel--visual" data-track-panel>
        <div class="featured-panel__copy">
          <p class="chapter-label">01 · {{ t('featuredPanels.visual.label') }}</p>
          <h3>{{ t('featuredPanels.visual.title') }}</h3>
          <p>{{ t('featuredPanels.visual.description') }}</p>
        </div>
        <CinematicProjectVisual :project="project" panel="visual" />
      </article>
      <article class="featured-panel featured-panel--interaction" data-track-panel>
        <CinematicProjectVisual :project="project" panel="interaction" />
        <div class="featured-panel__copy">
          <p class="chapter-label">01 · {{ t('featuredPanels.interaction.label') }}</p>
          <h3>{{ t('featuredPanels.interaction.title') }}</h3>
          <p>{{ t('featuredPanels.interaction.description') }}</p>
          <dl class="featured-panel__meta">
            <div>
              <dt>{{ t('roleLabel') }}</dt>
              <dd>{{ t('comingSoon') }}</dd>
            </div>
            <div>
              <dt>{{ t('toolsLabel') }}</dt>
              <dd>{{ project.tools.join(' / ') }}</dd>
            </div>
          </dl>
          <RouterLink :to="`/projects/${project.slug}`">{{ t('viewProject') }} ↗</RouterLink>
        </div>
      </article>
    </div>
  </section>
</template>
