<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CinematicProjectVisual from '@/components/CinematicProjectVisual.vue'
import ProjectSummaryCard from '@/components/ProjectSummaryCard.vue'
import SectionDecorations from '@/components/SectionDecorations.vue'
import { useLanguage } from '@/composables/useLanguage'
defineProps({ project: Object })
const { t } = useLanguage()
const featuredSection = ref(null)
const isSharedHeadingEnding = ref(false)
let portfolioTrack

function updateSharedHeading() {
  if (!portfolioTrack || !featuredSection.value) return
  const end = featuredSection.value.offsetLeft + featuredSection.value.offsetWidth
  isSharedHeadingEnding.value = portfolioTrack.scrollLeft >= end - innerWidth * 0.12
}

onMounted(() => {
  portfolioTrack = featuredSection.value?.closest('.portfolio-track')
  portfolioTrack?.addEventListener('scroll', updateSharedHeading, { passive: true })
  window.addEventListener('resize', updateSharedHeading)
  updateSharedHeading()
})

onBeforeUnmount(() => {
  portfolioTrack?.removeEventListener('scroll', updateSharedHeading)
  window.removeEventListener('resize', updateSharedHeading)
})
</script>
<template>
  <section
    ref="featuredSection"
    id="featured"
    class="portfolio-section featured-section"
    aria-labelledby="featured-title"
  >
    <SectionDecorations section="featured" />
    <div class="featured-panels">
      <article class="featured-panel featured-panel--overview" data-track-panel>
        <div class="section-heading">
          <p id="featured-title" class="chapter-label">01 · {{ t('headings.featured') }}</p>
          <p>{{ t('featuredNote') }}</p>
        </div>
        <ProjectSummaryCard :project="project" featured />
      </article>
      <div
        class="section-heading section-heading--subpanel featured-shared-heading"
        :class="{ 'is-ending': isSharedHeadingEnding }"
        aria-hidden="true"
      >
        <p class="chapter-label">01 · {{ t('headings.featured') }}</p>
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
