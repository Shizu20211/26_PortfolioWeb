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
const preview = ref(null)
const isPreviewVisible = ref(false)

const activeMedia = computed(() => activeProject.value?.media)

let canFollowPointer = false
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

onMounted(() => {
  canFollowPointer = matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!preview.value) return

  gsap.set(preview.value, { xPercent: -50, yPercent: -50 })
  moveX = gsap.quickTo(preview.value, 'x', { duration: 0.45, ease: 'power3.out' })
  moveY = gsap.quickTo(preview.value, 'y', { duration: 0.45, ease: 'power3.out' })
})

onBeforeUnmount(() => {
  if (preview.value) gsap.killTweensOf(preview.value)
})
</script>

<template>
  <div class="project-hover-list" @pointermove="movePreview" @pointerleave="hidePreview">
    <RouterLink
      v-for="(project, index) in projects"
      :key="project.slug"
      class="project-hover-list__item"
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
