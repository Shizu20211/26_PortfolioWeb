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
const galleryTrack = ref(null)
const preview = ref(null)
const isPreviewVisible = ref(false)

const activeMedia = computed(() => activeProject.value?.media)

let canFollowPointer = false
let landscapeQuery
let intersectionObserver
let moveX
let moveY
let touchStartX = 0

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

function handleGalleryTouchStart(event) {
  touchStartX = event.touches[0]?.clientX ?? 0
}

function handleGalleryTouchEnd(event) {
  const gallery = galleryTrack.value
  const endX = event.changedTouches[0]?.clientX ?? touchStartX
  const delta = touchStartX - endX
  const distance = Math.abs(delta)
  if (!gallery || distance < 36) return

  const direction = delta > 0 ? 1 : -1
  const activeIndex = props.projects.findIndex(
    (project) => project.slug === activeProject.value?.slug,
  )
  const isLeavingStart = direction < 0 && activeIndex === 0
  const isLeavingEnd = direction > 0 && activeIndex === props.projects.length - 1

  if (isLeavingStart || isLeavingEnd) goToAdjacentSection(direction)
}

function goToAdjacentSection(direction) {
  const gallery = galleryTrack.value
  if (!gallery) return

  const outerTrack = gallery.closest('.portfolio-track')
  const projectsSection = gallery.closest('#projects')
  const target =
    direction > 0
      ? document.getElementById('artworks')?.offsetLeft
      : Math.max(0, (projectsSection?.offsetLeft ?? innerWidth) - innerWidth)

  if (outerTrack && Number.isFinite(target)) {
    outerTrack.scrollTo({ left: target, behavior: 'smooth' })
  }
}

function updateGalleryActive() {
  const gallery = galleryTrack.value
  if (!landscapeQuery?.matches || !gallery) return

  const galleryRect = gallery.getBoundingClientRect()
  const marker = galleryRect.left + gallery.clientWidth * 0.5
  const cards = [...gallery.querySelectorAll('[data-gallery-index]')]
  const current = cards.sort((a, b) => {
    const aRect = a.getBoundingClientRect()
    const bRect = b.getBoundingClientRect()
    const aCenter = aRect.left + aRect.width / 2
    const bCenter = bRect.left + bRect.width / 2
    return Math.abs(aCenter - marker) - Math.abs(bCenter - marker)
  })[0]
  const index = Number(current?.dataset.galleryIndex)

  if (Number.isInteger(index) && activeProject.value?.slug !== props.projects[index]?.slug) {
    activeProject.value = props.projects[index]
  }
}

function setupIntersectionObserver() {
  intersectionObserver?.disconnect()
  if (!landscapeQuery?.matches || !galleryTrack.value) return

  intersectionObserver = new IntersectionObserver(updateGalleryActive, {
    root: galleryTrack.value,
    rootMargin: '0px -40% 0px -40%',
    threshold: [0, 0.2, 0.5],
  })

  galleryTrack.value
    .querySelectorAll('[data-gallery-index]')
    .forEach((item) => intersectionObserver.observe(item))
}

onMounted(() => {
  canFollowPointer = matchMedia('(hover: hover) and (pointer: fine)').matches
  landscapeQuery = matchMedia(
    '(max-width: 1180px) and (max-height: 720px) and (orientation: landscape)',
  )
  activeProject.value = props.projects[0] ?? null
  landscapeQuery.addEventListener('change', setupIntersectionObserver)
  galleryTrack.value?.addEventListener('scroll', updateGalleryActive, { passive: true })
  setupIntersectionObserver()
  requestAnimationFrame(() => {
    const firstCard = galleryTrack.value?.querySelector('[data-gallery-index="0"]')
    if (!firstCard || !galleryTrack.value) return
    galleryTrack.value.scrollLeft =
      firstCard.offsetLeft - (galleryTrack.value.clientWidth - firstCard.offsetWidth) / 2
  })
  if (!preview.value) return

  gsap.set(preview.value, { xPercent: -50, yPercent: -50 })
  moveX = gsap.quickTo(preview.value, 'x', { duration: 0.45, ease: 'power3.out' })
  moveY = gsap.quickTo(preview.value, 'y', { duration: 0.45, ease: 'power3.out' })
})

onBeforeUnmount(() => {
  landscapeQuery?.removeEventListener('change', setupIntersectionObserver)
  galleryTrack.value?.removeEventListener('scroll', updateGalleryActive)
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
        <p class="chapter-label project-heading-label project-heading-label--desktop">
          02 · {{ t('sections.projects') }}
        </p>
        <p class="chapter-label project-heading-label project-heading-label--mobile">
          02 · {{ t('headings.projects') }}
        </p>
        <h2 id="projects-title">{{ t('headings.projects') }}</h2>
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

    <div
      ref="galleryTrack"
      class="project-flex-gallery"
      :aria-label="t('headings.projects')"
      @pointerdown.stop
      @touchstart.stop="handleGalleryTouchStart"
      @touchmove.stop
      @touchend.stop="handleGalleryTouchEnd"
    >
      <article
        v-for="(project, index) in projects"
        :key="project.slug"
        class="project-flex-gallery__card"
        :class="{ 'is-active': activeProject?.slug === project.slug }"
        :data-gallery-index="index"
      >
        <div class="project-flex-gallery__media">
          <ResponsivePortfolioImage
            v-if="project.media?.type === 'image'"
            :src="project.media.src"
            :alt="pick(project.media.alt)"
            :width="project.media.width"
            :height="project.media.height"
            sizes="100svh"
            image-class="project-flex-gallery__image"
          />
          <div v-else class="project-flex-gallery__placeholder">
            <small>{{ t('imageNeeded') }}</small>
          </div>
          <RouterLink
            v-if="activeProject?.slug === project.slug"
            class="project-flex-gallery__link"
            :to="`/projects/${project.slug}`"
            @click.stop
          >
            {{ t('viewProject') }} ↗
          </RouterLink>
          <button
            v-if="index === 0 && activeProject?.slug === project.slug"
            class="project-flex-gallery__section-link project-flex-gallery__section-link--previous"
            type="button"
            @click.stop="goToAdjacentSection(-1)"
          >
            ← {{ t('goFeatured') }}
          </button>
          <button
            v-if="index === projects.length - 1 && activeProject?.slug === project.slug"
            class="project-flex-gallery__section-link project-flex-gallery__section-link--next"
            type="button"
            @click.stop="goToAdjacentSection(1)"
          >
            {{ t('goArtworks') }} →
          </button>
        </div>
        <div class="project-flex-gallery__meta">
          <div class="project-flex-gallery__reveal">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <div class="project-flex-gallery__reveal">
            <h3>{{ pick(project.title) }}</h3>
          </div>
          <div class="project-flex-gallery__reveal">
            <p>{{ pick(project.summary) }}</p>
          </div>
        </div>
      </article>
    </div>

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
