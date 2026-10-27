<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { useLanguage } from '@/composables/useLanguage'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({ artwork: { type: Object, required: true }, ready: Boolean })
const emit = defineEmits(['back'])
const route = useRoute()
const router = useRouter()
const { pick } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const heroTarget = ref(null)
const heroImage = ref(null)
const lightbox = ref(null)
const lightboxClose = ref(null)
const activeIndex = ref(0)
const isLightboxOpen = ref(false)
let triggerElement = null
let pointerStartX = 0

const gallery = computed(() => props.artwork.gallery ?? [])
const activeImage = computed(() => gallery.value[activeIndex.value] ?? gallery.value[0])
const statement = computed(() => pick(props.artwork.statement) ?? [])
const isIntroduction = computed(() => activeIndex.value === 0)
const remainingImages = computed(() =>
  gallery.value
    .map((image, index) => ({ image, index }))
    .filter(({ index }) => index !== activeIndex.value),
)
const layoutClass = computed(() => `is-${activeImage.value?.orientation ?? 'landscape'}`)
const themeClass = computed(() =>
  props.artwork.caseStudy === 'botanical-dyeing' ? 'is-botanical-dyeing' : null,
)
const contentClass = computed(() =>
  activeImage.value?.kind === 'process' ? 'has-active-process' : null,
)

async function selectImage(index) {
  if (!gallery.value[index] || index === activeIndex.value) return
  gsap.killTweensOf(heroImage.value)
  if (prefersReducedMotion.value || !heroImage.value) {
    activeIndex.value = index
    return
  }
  await gsap.to(heroImage.value, {
    opacity: 0,
    scale: 0.985,
    duration: 0.24,
    ease: 'power2.in',
  })
  activeIndex.value = index
  await nextTick()
  gsap.fromTo(
    heroImage.value,
    { opacity: 0, scale: 1.018 },
    { opacity: 1, scale: 1, duration: 0.58, ease: 'power3.out', clearProps: 'transform' },
  )
}

function openLightboxVisual() {
  if (isLightboxOpen.value) return
  isLightboxOpen.value = true
  document.body.classList.add('artwork-lightbox-open')
  document.querySelector('#app')?.setAttribute('inert', '')
  nextTick(() => lightboxClose.value?.focus())
}

function closeLightboxVisual(restoreFocus = true) {
  if (!isLightboxOpen.value) return
  isLightboxOpen.value = false
  document.body.classList.remove('artwork-lightbox-open')
  document.querySelector('#app')?.removeAttribute('inert')
  if (restoreFocus) nextTick(() => triggerElement?.focus?.())
}

async function openLightbox(event) {
  triggerElement = event?.currentTarget ?? document.activeElement
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

function showImage(offset) {
  if (!gallery.value.length) return
  activeIndex.value = (activeIndex.value + offset + gallery.value.length) % gallery.value.length
  if (isLightboxOpen.value) {
    router.replace({ query: { ...route.query, artworkImage: activeImage.value.id } })
  }
}

function onKeydown(event) {
  if (!isLightboxOpen.value) return
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowLeft') showImage(-1)
  if (event.key === 'ArrowRight') showImage(1)
  if (event.key !== 'Tab' || !lightbox.value) return

  const focusable = [...lightbox.value.querySelectorAll('button:not([disabled])')]
  if (!focusable.length) return
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

function onPointerDown(event) {
  pointerStartX = event.clientX
}

function onPointerUp(event) {
  const distance = event.clientX - pointerStartX
  if (Math.abs(distance) >= 48) showImage(distance > 0 ? -1 : 1)
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

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  closeLightboxVisual(false)
  gsap.killTweensOf(heroImage.value)
})

defineExpose({ heroTarget, heroImage })
</script>

<template>
  <main
    class="split-artwork-gallery"
    :class="[{ 'is-ready': props.ready }, layoutClass, themeClass, contentClass]"
  >
    <button class="split-artwork-gallery__back" type="button" data-magnetic @click="emit('back')">
      ← {{ pick({ 'zh-Hant': '返回創作列表', en: 'Back to artworks', ja: '作品一覧へ戻る' }) }}
    </button>

    <div class="split-artwork-gallery__stage">
      <section ref="heroTarget" class="split-artwork-gallery__main">
        <button
          class="split-artwork-gallery__main-button"
          type="button"
          :aria-label="`${pick({ 'zh-Hant': '放大圖片', en: 'Enlarge image', ja: '画像を拡大' })}：${pick(activeImage.title)}`"
          @click="openLightbox"
        >
          <img
            ref="heroImage"
            :key="activeImage.id"
            :src="activeImage.src"
            :alt="pick(activeImage.alt)"
            :width="activeImage.width"
            :height="activeImage.height"
            fetchpriority="high"
          />
        </button>

        <Transition name="split-gallery-copy" mode="out-in">
          <div
            v-if="!isIntroduction"
            :key="activeImage.id"
            class="split-artwork-gallery__selected-copy"
          >
            <span
              >{{ String(activeIndex + 1).padStart(2, '0') }} /
              {{ String(gallery.length).padStart(2, '0') }}</span
            >
            <h1>{{ pick(activeImage.title) }}</h1>
            <p class="split-artwork-gallery__meta">{{ pick(activeImage.meta) }}</p>
            <p>{{ pick(activeImage.caption) }}</p>
          </div>
        </Transition>
      </section>

      <aside class="split-artwork-gallery__wall">
        <TransitionGroup name="split-gallery-grid" tag="div" class="split-artwork-gallery__grid">
          <button
            v-for="{ image, index } in remainingImages"
            :key="image.id"
            class="split-artwork-gallery__tile"
            :class="[`is-${image.orientation}`, image.kind && `is-${image.kind}`]"
            type="button"
            :aria-label="`${pick({ 'zh-Hant': '查看作品', en: 'View artwork', ja: '作品を見る' })}：${pick(image.title)}`"
            @click="selectImage(index)"
          >
            <img
              :src="image.thumbnailSrc ?? image.src"
              :alt="pick(image.alt)"
              :width="image.width"
              :height="image.height"
              loading="lazy"
              decoding="async"
            />
          </button>
        </TransitionGroup>

        <Transition name="split-gallery-copy">
          <article v-if="isIntroduction" class="split-artwork-gallery__introduction">
            <p class="chapter-label">{{ pick(artwork.type) }}</p>
            <h1>{{ pick(artwork.title) }}</h1>
            <div>
              <p v-for="paragraph in statement" :key="paragraph">{{ paragraph }}</p>
            </div>
          </article>
        </Transition>
      </aside>
    </div>

    <Teleport to="body">
      <Transition name="artwork-gallery-lightbox">
        <div
          v-if="isLightboxOpen"
          ref="lightbox"
          class="artwork-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="pick(activeImage.title)"
          @click.self="closeLightbox"
          @pointerdown="onPointerDown"
          @pointerup="onPointerUp"
        >
          <button
            ref="lightboxClose"
            class="artwork-gallery-lightbox__close"
            type="button"
            :aria-label="pick({ 'zh-Hant': '關閉圖片', en: 'Close image', ja: '画像を閉じる' })"
            @click="closeLightbox"
          >
            ×
          </button>
          <button
            class="artwork-gallery-lightbox__arrow artwork-gallery-lightbox__arrow--previous"
            type="button"
            :aria-label="pick({ 'zh-Hant': '上一張', en: 'Previous image', ja: '前の画像' })"
            @click="showImage(-1)"
          >
            ←
          </button>
          <figure class="artwork-gallery-lightbox__figure">
            <div class="artwork-gallery-lightbox__image">
              <img
                :src="activeImage.src"
                :alt="pick(activeImage.alt)"
                :width="activeImage.width"
                :height="activeImage.height"
              />
            </div>
            <figcaption>
              <div>
                <span
                  >{{ String(activeIndex + 1).padStart(2, '0') }} /
                  {{ String(gallery.length).padStart(2, '0') }}</span
                >
                <strong>{{ pick(activeImage.title) }}</strong>
                <span>{{ pick(activeImage.meta) }}</span>
              </div>
              <p>{{ pick(activeImage.caption) }}</p>
            </figcaption>
          </figure>
          <button
            class="artwork-gallery-lightbox__arrow artwork-gallery-lightbox__arrow--next"
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
