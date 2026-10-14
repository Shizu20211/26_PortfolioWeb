<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ResponsivePortfolioImage from '@/components/ResponsivePortfolioImage.vue'
import { useArtworkTransition } from '@/composables/useArtworkTransition'
import { useLanguage } from '@/composables/useLanguage'
import { usePointerPosition } from '@/composables/usePointerPosition'

const props = defineProps({ artwork: { type: Object, required: true }, index: Number })
const { pick, t } = useLanguage()
const router = useRouter()
const { openArtwork } = useArtworkTransition()
const { position, connect, disconnect } = usePointerPosition()
const card = ref(null)
const cursor = ref(null)
const cursorVisible = ref(false)

const label = computed(() => `${t('viewArtwork')}：${pick(props.artwork.title)}`)
const imageStyle = computed(() => ({
  objectPosition: props.artwork.focalPosition || '50% 50%',
}))

function moveCursor() {
  if (!cursorVisible.value || !card.value || !cursor.value) return
  const bounds = card.value.$el?.getBoundingClientRect?.() ?? card.value.getBoundingClientRect()
  cursor.value.style.transform = `translate3d(${position.value.x - bounds.left}px, ${position.value.y - bounds.top}px, 0)`
}

function showCursor() {
  cursorVisible.value = true
  moveCursor()
}

function resetCursor() {
  cursorVisible.value = false
}

function open(event) {
  event.preventDefault()
  resetCursor()
  const element = card.value.$el ?? card.value
  openArtwork({
    artwork: props.artwork,
    source: element.querySelector('.artwork-card__visual'),
    router,
    track: element.closest('.portfolio-track'),
  })
}

function resetWhenHidden() {
  if (document.hidden) resetCursor()
}

onMounted(() => {
  connect()
  window.addEventListener('blur', resetCursor)
  document.addEventListener('visibilitychange', resetWhenHidden)
})

watch(position, moveCursor)

onBeforeUnmount(() => {
  disconnect()
  window.removeEventListener('blur', resetCursor)
  document.removeEventListener('visibilitychange', resetWhenHidden)
})
</script>

<template>
  <RouterLink
    ref="card"
    class="artwork-card"
    :class="`artwork-card--${artwork.layout || 'square'}`"
    :to="`/artworks/${artwork.slug}`"
    :aria-label="label"
    :data-artwork-key="artwork.key"
    :data-parallax-strength="artwork.parallaxStrength ?? 1"
    @click="open"
    @pointerenter="showCursor"
    @pointerleave="resetCursor"
    @focus="resetCursor"
  >
    <span class="artwork-card__visual">
      <ResponsivePortfolioImage
        v-if="artwork.cover?.src"
        :src="artwork.cover.src"
        :sources="artwork.cover.sources || []"
        :srcset="artwork.cover.srcset || ''"
        :sizes="artwork.cover.sizes || '(max-width: 760px) 92vw, 42vw'"
        :width="artwork.cover.width"
        :height="artwork.cover.height"
        :alt="pick(artwork.alt || artwork.title)"
        image-class="artwork-card__image"
        :image-style="imageStyle"
      />
      <span v-else class="artwork-placeholder" aria-hidden="true">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <small>LONG EDGE 1600PX · WEBP / PNG</small>
      </span>
      <span class="artwork-card__focus-label">{{ t('viewArtwork') }} ↗</span>
      <span ref="cursor" class="artwork-view-cursor" :class="{ 'is-visible': cursorVisible }">
        {{ artwork.cursorLabel || 'VIEW' }}
      </span>
    </span>
    <span class="sr-only">{{ pick(artwork.title) }} · {{ pick(artwork.type) }}</span>
  </RouterLink>
</template>
