<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import FrontendWorkDetailOverlay from '@/components/FrontendWorkDetailOverlay.vue'
import ResponsivePortfolioImage from '@/components/ResponsivePortfolioImage.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({
  frontendWorks: { type: Array, required: true },
})

const { pick, t } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const activeWork = ref(null)
const workList = ref(null)
const galleryTrack = ref(null)
const preview = ref(null)
const isPreviewVisible = ref(false)
const selectedWork = ref(null)
const selectedSource = ref(null)
const selectedNumber = ref('')
const selectedTrigger = ref(null)

const activeMedia = computed(() => activeWork.value?.media)

let canFollowPointer = false
let landscapeQuery
let intersectionObserver
let moveX
let moveY
let touchStartX = 0

function showPreview(work, fromKeyboard = false) {
  activeWork.value = work
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

function openWork(work, index, sourceElement, triggerElement) {
  if (selectedWork.value) return
  selectedWork.value = work
  selectedNumber.value = String(index + 1).padStart(2, '0')
  selectedSource.value = sourceElement ?? null
  selectedTrigger.value = triggerElement ?? null
}

function openDesktopWork(work, index, triggerElement) {
  const source = preview.value?.querySelector(
    '.frontend-work-hover-preview__image, .frontend-work-hover-preview__placeholder',
  )
  openWork(work, index, source, triggerElement)
}

function openMobileWork(work, index, event) {
  const source = event.currentTarget
    .closest('[data-gallery-index]')
    ?.querySelector('.frontend-work-flex-gallery__image, .frontend-work-flex-gallery__placeholder')
  openWork(work, index, source, event.currentTarget)
}

function finishClosingWork() {
  const trigger = selectedTrigger.value
  selectedWork.value = null
  selectedSource.value = null
  selectedNumber.value = ''
  selectedTrigger.value = null
  requestAnimationFrame(() => trigger?.focus())
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
  const activeIndex = props.frontendWorks.findIndex((work) => work.slug === activeWork.value?.slug)
  const isLeavingStart = direction < 0 && activeIndex === 0
  const isLeavingEnd = direction > 0 && activeIndex === props.frontendWorks.length - 1

  if (isLeavingStart || isLeavingEnd) goToAdjacentSection(direction)
}

function goToAdjacentSection(direction) {
  const gallery = galleryTrack.value
  if (!gallery) return

  const outerTrack = gallery.closest('.portfolio-track')
  const frontendWorksSection = gallery.closest('#frontend-works')
  const target =
    direction > 0
      ? document.getElementById('artworks')?.offsetLeft
      : Math.max(0, (frontendWorksSection?.offsetLeft ?? innerWidth) - innerWidth)

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

  if (Number.isInteger(index) && activeWork.value?.slug !== props.frontendWorks[index]?.slug) {
    activeWork.value = props.frontendWorks[index]
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
  activeWork.value = props.frontendWorks[0] ?? null
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
  <div class="frontend-work-gallery">
    <div
      ref="workList"
      class="frontend-work-hover-list"
      data-vertical-scroll
      @pointermove="movePreview"
      @pointerleave="hidePreview"
    >
      <header class="frontend-work-hover-list__heading">
        <p class="chapter-label frontend-work-heading-label frontend-work-heading-label--desktop">
          02 · {{ t('sections.frontendWorks') }}
        </p>
        <p class="chapter-label frontend-work-heading-label frontend-work-heading-label--mobile">
          02 · {{ t('headings.frontendWorks') }}
        </p>
        <h2 id="frontend-works-title">{{ t('headings.frontendWorks') }}</h2>
      </header>

      <button
        v-for="(work, index) in frontendWorks"
        :key="work.slug"
        class="frontend-work-hover-list__item"
        :class="{ 'is-active': activeWork?.slug === work.slug }"
        :data-frontend-work-index="index"
        type="button"
        @pointerenter="showPreview(work)"
        @focus="showPreview(work, true)"
        @blur="hidePreview"
        @click="openDesktopWork(work, index, $event.currentTarget)"
      >
        <span class="frontend-work-hover-list__number">{{
          String(index + 1).padStart(2, '0')
        }}</span>
        <span class="frontend-work-hover-list__title">{{ pick(work.title) }}</span>
        <span class="frontend-work-hover-list__tags">{{ work.tags.join(' · ') }}</span>
        <span class="frontend-work-hover-list__arrow" aria-hidden="true">↗</span>
      </button>
    </div>

    <div
      ref="galleryTrack"
      class="frontend-work-flex-gallery"
      :aria-label="t('headings.frontendWorks')"
      @pointerdown.stop
      @touchstart.stop="handleGalleryTouchStart"
      @touchmove.stop
      @touchend.stop="handleGalleryTouchEnd"
    >
      <button
        class="frontend-work-flex-gallery__section-gate frontend-work-flex-gallery__section-gate--previous"
        type="button"
        @click.stop="goToAdjacentSection(-1)"
      >
        <span>{{ t('goFeatured') }}</span>
        <span class="frontend-work-flex-gallery__gate-line" aria-hidden="true"></span>
      </button>

      <article
        v-for="(work, index) in frontendWorks"
        :key="work.slug"
        class="frontend-work-flex-gallery__card"
        :class="{ 'is-active': activeWork?.slug === work.slug }"
        :data-gallery-index="index"
      >
        <div class="frontend-work-flex-gallery__media">
          <ResponsivePortfolioImage
            v-if="work.media?.type === 'image'"
            :src="work.media.src"
            :alt="pick(work.media.alt)"
            :width="work.media.width"
            :height="work.media.height"
            sizes="100svh"
            image-class="frontend-work-flex-gallery__image"
          />
          <div v-else class="frontend-work-flex-gallery__placeholder">
            <small>{{ t('imageNeeded') }}</small>
          </div>
          <button
            v-if="activeWork?.slug === work.slug"
            class="frontend-work-flex-gallery__link"
            type="button"
            :aria-label="`${t('openProject')}：${pick(work.title)}`"
            @click.stop="openMobileWork(work, index, $event)"
          >
            {{ t('viewProject') }} ↗
          </button>
        </div>
        <div class="frontend-work-flex-gallery__meta">
          <div class="frontend-work-flex-gallery__reveal">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <div class="frontend-work-flex-gallery__reveal">
            <h3>{{ pick(work.title) }}</h3>
          </div>
          <div class="frontend-work-flex-gallery__reveal">
            <p>{{ pick(work.summary) }}</p>
          </div>
        </div>
      </article>

      <button
        class="frontend-work-flex-gallery__section-gate frontend-work-flex-gallery__section-gate--next"
        type="button"
        @click.stop="goToAdjacentSection(1)"
      >
        <span class="frontend-work-flex-gallery__gate-line" aria-hidden="true"></span>
        <span>{{ t('goArtworks') }}</span>
      </button>
    </div>

    <div
      ref="preview"
      class="frontend-work-hover-preview"
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
        image-class="frontend-work-hover-preview__image"
      />
      <div v-else class="frontend-work-hover-preview__placeholder">
        <span>{{ activeWork ? pick(activeWork.title) : t('sections.frontendWorks') }}</span>
        <small>{{ t('imageNeeded') }}</small>
      </div>
    </div>

    <FrontendWorkDetailOverlay
      v-if="selectedWork"
      :work="selectedWork"
      :number="selectedNumber"
      :source-element="selectedSource"
      @closed="finishClosingWork"
    />
  </div>
</template>
