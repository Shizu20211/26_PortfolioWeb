<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
const route = useRoute()
const router = useRouter()
const activeWork = ref(null)
const workList = ref(null)
const galleryTrack = ref(null)
const preview = ref(null)
const isPreviewVisible = ref(false)
const selectedWork = ref(null)
const selectedSource = ref(null)
const selectedNumber = ref('')
const selectedTrigger = ref(null)
const detailOverlay = ref(null)

const activeMedia = computed(() => activeWork.value?.media)

let landscapeQuery
let intersectionObserver
let moveX
let moveY
let touchStartX = 0

function positionPreview(x, y, immediate = false) {
  if (!preview.value) return
  const halfWidth = preview.value.offsetWidth / 2
  const halfHeight = preview.value.offsetHeight / 2
  const nextX = Math.max(halfWidth, Math.min(innerWidth - halfWidth, x))
  const nextY = Math.max(halfHeight, Math.min(innerHeight - halfHeight, y))

  if (immediate || prefersReducedMotion.value) {
    moveX?.tween.pause()
    moveY?.tween.pause()
    gsap.set(preview.value, { x: nextX, y: nextY })
  } else {
    moveX?.(nextX)
    moveY?.(nextY)
  }
}

function showPreview(work, event) {
  if (selectedWork.value) return
  activeWork.value = work
  const fromPointer = event?.type === 'pointerenter'
  if (fromPointer && event.pointerType === 'touch') return
  const rect = event?.currentTarget?.getBoundingClientRect()
  positionPreview(
    fromPointer ? event.clientX : innerWidth * 0.72,
    fromPointer ? event.clientY : rect ? rect.top + rect.height / 2 : innerHeight * 0.5,
    true,
  )
  isPreviewVisible.value = true
}

function hidePreview() {
  isPreviewVisible.value = false
}

function movePreview(event) {
  if (event.pointerType === 'touch' || !isPreviewVisible.value || selectedWork.value) return
  positionPreview(event.clientX, event.clientY)
}

function setSelectedWork(work, index, sourceElement = null, triggerElement = null) {
  selectedWork.value = work
  selectedNumber.value = String(index + 1).padStart(2, '0')
  selectedSource.value = sourceElement
  selectedTrigger.value = triggerElement
}

async function openWork(work, index, sourceElement, triggerElement) {
  if (selectedWork.value) return
  setSelectedWork(work, index, sourceElement, triggerElement)
  await router.push({ query: { ...route.query, frontendWork: work.slug } })
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

function hasFrontendWorksHistoryEntry() {
  const previousUrl = window.history.state?.back
  if (!previousUrl) return false
  return new URL(previousUrl, window.location.href).pathname === window.location.pathname
}

async function requestCloseWork() {
  if (!route.query.frontendWork) {
    detailOverlay.value?.closeDetail()
    return
  }
  if (hasFrontendWorksHistoryEntry()) {
    router.back()
    return
  }
  const query = { ...route.query }
  delete query.frontendWork
  await router.replace({ query })
}

watch(
  () => route.query.frontendWork,
  async (slug) => {
    if (slug) {
      if (selectedWork.value?.slug === slug) return
      const index = props.frontendWorks.findIndex((work) => work.slug === slug)
      if (index < 0) {
        const query = { ...route.query }
        delete query.frontendWork
        await router.replace({ query })
        return
      }
      setSelectedWork(props.frontendWorks[index], index)
      return
    }
    if (!selectedWork.value) return
    await nextTick()
    detailOverlay.value?.closeDetail()
  },
  { immediate: true },
)

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
        @pointerenter="showPreview(work, $event)"
        @focus="showPreview(work, $event)"
        @blur="hidePreview"
        @click="openDesktopWork(work, index, $event.currentTarget)"
      >
        <span class="frontend-work-hover-list__number">{{
          String(index + 1).padStart(2, '0')
        }}</span>
        <span class="frontend-work-hover-list__title">{{ pick(work.title) }}</span>
        <span class="frontend-work-hover-list__tags">{{ work.tags.map(pick).join(' · ') }}</span>
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

    <Teleport to="body">
      <div
        ref="preview"
        class="frontend-work-hover-preview"
        :class="{ 'is-visible': isPreviewVisible && !selectedWork }"
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
    </Teleport>

    <FrontendWorkDetailOverlay
      v-if="selectedWork"
      ref="detailOverlay"
      :work="selectedWork"
      :number="selectedNumber"
      :source-element="selectedSource"
      @request-close="requestCloseWork"
      @closed="finishClosingWork"
    />
  </div>
</template>
