<script setup>
import ResponsivePortfolioImage from '@/components/ResponsivePortfolioImage.vue'
import { useLanguage } from '@/composables/useLanguage'
defineProps({ project: { type: Object, required: true }, featured: Boolean })
const { pick, t } = useLanguage()
</script>
<template>
  <article class="project-card" :class="{ 'project-card--featured': featured }">
    <ResponsivePortfolioImage
      v-if="project.media?.type === 'image'"
      :src="project.media.src"
      :alt="pick(project.media.alt)"
      :width="project.media.width"
      :height="project.media.height"
      sizes="(max-width: 760px) 100vw, 50vw"
      image-class="project-card__image"
    />
    <div
      v-else
      class="media-placeholder"
      role="img"
      :aria-label="`${pick(project.title)}：${t('imageNeeded')}`"
    >
      <span>IMAGE SLOT</span
      ><small>{{ featured ? '1600 × 1000 · WebP / PNG' : '1440 × 900 · WebP / PNG' }}</small>
    </div>
    <div class="project-card__content">
      <p class="project-card__eyebrow">{{ project.tags.join(' · ') }}</p>
      <h3>{{ pick(project.title) }}</h3>
      <p>{{ pick(project.summary) }}</p>
      <dl>
        <div>
          <dt>{{ t('roleLabel') }}</dt>
          <dd>{{ project.role.includes('待補') ? t('comingSoon') : project.role }}</dd>
        </div>
        <div>
          <dt>{{ t('toolsLabel') }}</dt>
          <dd>
            {{ project.tools[0]?.includes('待補') ? t('comingSoon') : project.tools.join(' / ') }}
          </dd>
        </div>
      </dl>
      <RouterLink :to="`/projects/${project.slug}`"
        >{{ t('viewProject') }} <span>↗</span></RouterLink
      >
    </div>
  </article>
</template>
