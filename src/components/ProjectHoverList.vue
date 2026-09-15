<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import ResponsivePortfolioImage from '@/components/ResponsivePortfolioImage.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({
  projects: { type: Array, required: true },
})

const { pick, t } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const activeProject = ref(null)
const projectList = ref(null)
const preview = ref(null)
const isPreviewVisible = ref(false)

const activeMedia = computed(() => activeProject.value?.media)

let canFollowPointer = false
let landscapeQuery
let intersectionObserver
let moveX
let moveY

function showPreview(project, fromKeyboard = false) {
  activeProject.value = project
  isPreviewVisible.value = true

  if (fromKeyboard && preview.value) {
    gsap.set(preview.value, { x: innerWidth * 0.72, y: innerHeight * 0.5 })
  }
}

function hidePreview() {
  isPreviewVisible.value = false
}

function movePreview(event) {
  if (!canFollowPointer || !isPreviewVisible.value) return
  moveX?.(event.clientX)
  moveY?.(event.clientY)
}

function setupIntersectionObserver() {
  intersectionObserver?.disconnect()
  if (!landscapeQuery?.matches || !projectList.value) return

  const visibility = new Map()
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visibility.set(entry.target, entry.intersectionRatio))

      const current = [...visibility.entries()]
        .filter(([, ratio]) => ratio > 0)
        .sort((a, b) => b[1] - a[1])[0]?.[0]
      const index = Number(current?.dataset.projectIndex)

      if (Number.isInteger(index)) activeProject.value = props.projects[index]
    },
    {
      root: projectList.value,
      rootMargin: '-28% 0px -28% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    },
  )

  projectList.value
    .querySelectorAll('[data-project-index]')
    .forEach((item) => intersectionObserver.observe(item))
}

onMounted(() => {
  canFollowPointer = matchMedia('(hover: hover) and (pointer: fine)').matches
  landscapeQuery = matchMedia(
    '(max-width: 1024px) and (max-height: 600px) and (orientation: landscape)',
  )
  activeProject.value = props.projects[0] ?? null
  landscapeQuery.addEventListener('change', setupIntersectionObserver)
  setupIntersectionObserver()
  if (!preview.value) return

  gsap.set(preview.value, { xPercent: -50, yPercent: -50 })
  moveX = gsap.quickTo(preview.value, 'x', { duration: 0.45, ease: 'power3.out' })
  moveY = gsap.quickTo(preview.value, 'y', { duration: 0.45, ease: 'power3.out' })
})

onBeforeUnmount(() => {
  landscapeQuery?.removeEventListener('change', setupIntersectionObserver)
  intersectionObserver?.disconnect()
  if (preview.value) gsap.killTweensOf(preview.value)
})
</script>

<template>
  <div class="project-gallery">
    <div
      ref="projectList"
      class="project-hover-list"
      data-vertical-scroll
      @pointermove="movePreview"
      @pointerleave="hidePreview"
    >
      <header class="project-hover-list__heading">
        <span class="project-hover-list__number">00</span>
        <div class="project-hover-list__heading-copy">
          <p class="chapter-label">02 · {{ t('sections.projects') }}</p>
          <h2 id="projects-title">{{ t('headings.projects') }}</h2>
        </div>
      </header>

      <RouterLink
        v-for="(project, index) in projects"
        :key="project.slug"
        class="project-hover-list__item"
        :class="{ 'is-active': activeProject?.slug === project.slug }"
        :data-project-index="index"
        :to="`/projects/${project.slug}`"
        @pointerenter="showPreview(project)"
        @focus="showPreview(project, true)"
        @blur="hidePreview"
      >
        <span class="project-hover-list__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="project-hover-list__title">{{ pick(project.title) }}</span>
        <span class="project-hover-list__tags">{{ project.tags.join(' · ') }}</span>
        <span class="project-hover-list__arrow" aria-hidden="true">↗</span>
      </RouterLink>
    </div>

    <aside class="project-sticky-preview" aria-hidden="true">
      <div class="project-strip-gallery">
        <div
          v-for="project in projects"
          :key="project.slug"
          class="project-strip-gallery__panel"
          :class="{ 'is-active': activeProject?.slug === project.slug }"
        >
          <ResponsivePortfolioImage
            v-if="project.media?.type === 'image'"
            :src="project.media.src"
            :alt="pick(project.media.alt)"
            :width="project.media.width"
            :height="project.media.height"
            sizes="60vw"
            image-class="project-strip-gallery__image"
          />
          <div v-else class="project-strip-gallery__placeholder"></div>
          <p>{{ pick(project.title) }}</p>
        </div>
      </div>
    </aside>

    <div
      ref="preview"
      class="project-hover-preview"
      :class="{ 'is-visible': isPreviewVisible && !prefersReducedMotion }"
      aria-hidden="true"
    >
      <ResponsivePortfolioImage
        v-if="activeMedia?.type === 'image'"
        :src="activeMedia.src"
        :alt="pick(activeMedia.alt)"
        :width="activeMedia.width"
        :height="activeMedia.height"
        sizes="28vw"
        image-class="project-hover-preview__image"
      />
      <div v-else class="project-hover-preview__placeholder">
        <span>{{ activeProject ? pick(activeProject.title) : t('sections.projects') }}</span>
        <small>{{ t('imageNeeded') }}</small>
      </div>
    </div>
  </div>
</template>
