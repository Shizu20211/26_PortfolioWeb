<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({ artwork: { type: Object, required: true }, ready: Boolean })
const emit = defineEmits(['back'])
const route = useRoute()
const router = useRouter()
const { pick } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const sceneRoot = ref(null)
const heroTarget = ref(null)
const heroImage = ref(null)
const lightbox = ref(null)
const closeButton = ref(null)
const activeIndex = ref(0)
const isLightboxOpen = ref(false)
const needsMotionPermission = ref(false)
let pointerStartX = 0
let lightboxTrigger = null
let spatialFrame = 0
let orientationListening = false

const gallery = computed(() => props.artwork.gallery ?? [])
const activeImage = computed(() => gallery.value[activeIndex.value] ?? gallery.value[0])
const previousImage = computed(
  () => gallery.value[(activeIndex.value - 1 + gallery.value.length) % gallery.value.length],
)
const nextImage = computed(() => gallery.value[(activeIndex.value + 1) % gallery.value.length])
const backgroundStyle = computed(() => ({ backgroundImage: `url(${activeImage.value?.src})` }))
const activeRatio = computed(() => activeImage.value.width / activeImage.value.height)
const layoutClass = computed(() => {
  if (activeRatio.value < 0.9) return 'is-portrait'
  if (activeRatio.value > 1.85) return 'is-ultrawide'
  return 'is-landscape'
})
const stageStyle = computed(() => ({ '--scene-ratio': activeRatio.value }))
const direction = ref('forward')

function applySpatialPosition(x, y) {
  if (!sceneRoot.value || prefersReducedMotion.value || isLightboxOpen.value) return
  const clampedX = Math.max(-1, Math.min(1, x))
  const clampedY = Math.max(-1, Math.min(1, y))
  window.cancelAnimationFrame(spatialFrame)
  spatialFrame = window.requestAnimationFrame(() => {
    sceneRoot.value?.style.setProperty('--scene-bg-x', `${clampedX * -18}px`)
    sceneRoot.value?.style.setProperty('--scene-bg-y', `${clampedY * -14}px`)
    sceneRoot.value?.style.setProperty('--scene-stage-x', `${clampedX * 8}px`)
    sceneRoot.value?.style.setProperty('--scene-stage-y', `${clampedY * 6}px`)
    sceneRoot.value?.style.setProperty('--scene-rotate-x', `${clampedY * -2.4}deg`)
    sceneRoot.value?.style.setProperty('--scene-rotate-y', `${clampedX * 3.2}deg`)
  })
}

function resetSpatialPosition() {
  applySpatialPosition(0, 0)
}

function onPointerMove(event) {
  if (event.pointerType === 'touch' || !sceneRoot.value) return
  const bounds = sceneRoot.value.getBoundingClientRect()
  applySpatialPosition(
    ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
    ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
  )
}

function onDeviceOrientation(event) {
  if (event.gamma === null || event.beta === null) return
  const angle = window.screen.orientation?.angle ?? window.orientation ?? 0
  if (Math.abs(angle) === 90) {
    applySpatialPosition((event.beta ?? 0) / 28, (event.gamma ?? 0) / 34)
  } else {
    applySpatialPosition((event.gamma ?? 0) / 28, ((event.beta ?? 45) - 45) / 34)
  }
}

function startOrientationTracking() {
  if (orientationListening) return
  window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true })
  orientationListening = true
  needsMotionPermission.value = false
}

async function enableMotion() {
  const orientation = window.DeviceOrientationEvent
  if (typeof orientation?.requestPermission !== 'function') {
    startOrientationTracking()
    return
  }
  try {
    if ((await orientation.requestPermission()) === 'granted') startOrientationTracking()
  } catch {
    needsMotionPermission.value = false
  }
}

function showImage(offset) {
  if (!gallery.value.length) return
  direction.value = offset < 0 ? 'backward' : 'forward'
  activeIndex.value = (activeIndex.value + offset + gallery.value.length) % gallery.value.length
  if (isLightboxOpen.value) {
    router.replace({ query: { ...route.query, artworkImage: activeImage.value.id } })
  }
}

function selectImage(index) {
  if (!gallery.value[index] || index === activeIndex.value) return
  direction.value = index < activeIndex.value ? 'backward' : 'forward'
  activeIndex.value = index
}

function openLightboxVisual() {
  if (isLightboxOpen.value) return
  isLightboxOpen.value = true
  document.body.classList.add('artwork-lightbox-open')
  document.querySelector('#app')?.setAttribute('inert', '')
  nextTick(() => closeButton.value?.focus())
}

function closeLightboxVisual(restoreFocus = true) {
  if (!isLightboxOpen.value) return
  isLightboxOpen.value = false
  document.body.classList.remove('artwork-lightbox-open')
  document.querySelector('#app')?.removeAttribute('inert')
  if (restoreFocus) nextTick(() => lightboxTrigger?.focus?.())
}

async function openLightbox(event) {
  lightboxTrigger = event?.currentTarget ?? document.activeElement
  await router.push({
    query: { ...route.query, artworkImage: activeImage.value.id },
  })
}

function hasArtworkHistoryEntry() {
  const previousUrl = window.history.state?.back
  if (!previousUrl) return false
  return new URL(previousUrl, window.location.href).pathname.endsWith(route.path)
}

async function closeLightbox() {
  if (!route.query.artworkImage) {
    closeLightboxVisual()
    return
  }
  if (hasArtworkHistoryEntry()) {
    router.back()
    return
  }
  const query = { ...route.query }
  delete query.artworkImage
  await router.replace({ query })
}

function onPointerDown(event) {
  pointerStartX = event.clientX
}

function onPointerUp(event) {
  const distance = event.clientX - pointerStartX
  if (Math.abs(distance) >= 48) showImage(distance > 0 ? -1 : 1)
}

function onKeydown(event) {
  if (event.key === 'Escape' && isLightboxOpen.value) {
    closeLightbox()
    return
  }
  if (event.key === 'ArrowLeft') showImage(-1)
  if (event.key === 'ArrowRight') showImage(1)
  if (!isLightboxOpen.value || event.key !== 'Tab' || !lightbox.value) return

  const focusable = [...lightbox.value.querySelectorAll('button:not([disabled])')]
  const first = focusable[0]
  const last = focusable.at(-1)
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => route.query.artworkImage,
  (imageId) => {
    const imageIndex = gallery.value.findIndex((image) => image.id === imageId)
    if (imageIndex >= 0) {
      activeIndex.value = imageIndex
      openLightboxVisual()
    } else {
      closeLightboxVisual()
    }
  },
  { immediate: true },
)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  if (prefersReducedMotion.value || !window.matchMedia('(pointer: coarse)').matches) return
  const orientation = window.DeviceOrientationEvent
  if (!orientation) return
  if (typeof orientation.requestPermission === 'function') needsMotionPermission.value = true
  else startOrientationTracking()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (orientationListening) window.removeEventListener('deviceorientation', onDeviceOrientation)
  window.cancelAnimationFrame(spatialFrame)
  closeLightboxVisual(false)
})

defineExpose({ heroTarget, heroImage })
</script>

<template>
  <main
    ref="sceneRoot"
    class="scene-gallery"
    :class="[{ 'is-ready': ready, 'is-backward': direction === 'backward' }, layoutClass]"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointerleave="resetSpatialPosition"
  >
    <button class="scene-gallery__back" type="button" data-magnetic @click="emit('back')">
      ← {{ pick({ 'zh-Hant': '返回創作列表', en: 'Back to artworks', ja: '作品一覧へ戻る' }) }}
    </button>
    <button
      v-if="needsMotionPermission"
      class="scene-gallery__motion-permission"
      type="button"
      @click="enableMotion"
    >
      {{
        pick({
          'zh-Hant': '開啟空間感應',
          en: 'Enable spatial motion',
          ja: '空間モーションを有効にする',
        })
      }}
    </button>

    <Transition name="scene-background">
      <div :key="activeImage.id" class="scene-gallery__background" :style="backgroundStyle"></div>
    </Transition>

    <button
      class="scene-gallery__preview scene-gallery__preview--previous"
      type="button"
      :aria-label="`${pick({ 'zh-Hant': '上一張', en: 'Previous image', ja: '前の画像' })}：${pick(previousImage.title)}`"
      :style="{ '--preview-ratio': previousImage.width / previousImage.height }"
      @click="showImage(-1)"
    >
      <img
        :src="previousImage.src"
        :alt="pick(previousImage.title)"
        :width="previousImage.width"
        :height="previousImage.height"
      />
    </button>

    <section ref="heroTarget" class="scene-gallery__stage" :style="stageStyle" aria-live="polite">
      <Transition name="scene-slide" mode="out-in">
        <button
          :key="activeImage.id"
          class="scene-gallery__image-button"
          type="button"
          :aria-label="`${pick({ 'zh-Hant': '放大圖片', en: 'Enlarge image', ja: '画像を拡大' })}：${pick(activeImage.title)}`"
          @click="openLightbox"
        >
          <img
            ref="heroImage"
            :src="activeImage.src"
            :alt="pick(activeImage.title)"
            :width="activeImage.width"
            :height="activeImage.height"
            fetchpriority="high"
          />
        </button>
      </Transition>

      <Transition name="scene-copy" mode="out-in">
        <div :key="activeImage.id" class="scene-gallery__copy">
          <span
            >{{ String(activeIndex + 1).padStart(2, '0') }} /
            {{ String(gallery.length).padStart(2, '0') }}</span
          >
          <p class="chapter-label">{{ pick(artwork.type) }}</p>
          <p class="scene-gallery__description">
            <span>{{ pick(activeImage.title) }}</span>
            <span aria-hidden="true"> · </span>
            <span>{{ pick(activeImage.caption) }}</span>
          </p>
        </div>
      </Transition>
    </section>

    <button
      class="scene-gallery__preview scene-gallery__preview--next"
      type="button"
      :aria-label="`${pick({ 'zh-Hant': '下一張', en: 'Next image', ja: '次の画像' })}：${pick(nextImage.title)}`"
      :style="{ '--preview-ratio': nextImage.width / nextImage.height }"
      @click="showImage(1)"
    >
      <img
        :src="nextImage.src"
        :alt="pick(nextImage.title)"
        :width="nextImage.width"
        :height="nextImage.height"
      />
    </button>

    <button
      class="scene-gallery__arrow scene-gallery__arrow--previous"
      type="button"
      :aria-label="pick({ 'zh-Hant': '上一張', en: 'Previous image', ja: '前の画像' })"
      @click="showImage(-1)"
    >
      ←
    </button>
    <button
      class="scene-gallery__arrow scene-gallery__arrow--next"
      type="button"
      :aria-label="pick({ 'zh-Hant': '下一張', en: 'Next image', ja: '次の画像' })"
      @click="showImage(1)"
    >
      →
    </button>

    <ol class="scene-gallery__dots" :aria-label="pick(artwork.title)">
      <li v-for="(image, index) in gallery" :key="image.id">
        <button
          type="button"
          :aria-label="pick(image.title)"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="selectImage(index)"
        ></button>
      </li>
    </ol>

    <Teleport to="body">
      <Transition name="artwork-gallery-lightbox">
        <div
          v-if="isLightboxOpen"
          ref="lightbox"
          class="scene-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="pick(activeImage.title)"
          @click.self="closeLightbox"
          @pointerdown="onPointerDown"
          @pointerup="onPointerUp"
        >
          <button
            ref="closeButton"
            class="scene-gallery-lightbox__close"
            type="button"
            :aria-label="pick({ 'zh-Hant': '關閉圖片', en: 'Close image', ja: '画像を閉じる' })"
            @click="closeLightbox"
          >
            ×
          </button>
          <button
            class="scene-gallery-lightbox__arrow scene-gallery-lightbox__arrow--previous"
            type="button"
            :aria-label="pick({ 'zh-Hant': '上一張', en: 'Previous image', ja: '前の画像' })"
            @click="showImage(-1)"
          >
            ←
          </button>
          <img
            :src="activeImage.src"
            :alt="pick(activeImage.title)"
            :width="activeImage.width"
            :height="activeImage.height"
          />
          <button
            class="scene-gallery-lightbox__arrow scene-gallery-lightbox__arrow--next"
            type="button"
            :aria-label="pick({ 'zh-Hant': '下一張', en: 'Next image', ja: '次の画像' })"
            @click="showImage(1)"
          >
            →
          </button>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>
