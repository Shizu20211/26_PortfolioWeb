<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({
  media: { type: Object, required: true },
  enabled: { type: Boolean, default: true },
})

const root = ref(null)
const video = ref(null)
const isVisible = ref(false)
const hasLoaded = ref(false)
const hasError = ref(false)
const { pick, t } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const label = computed(() => pick(props.media.alt ?? props.media.label))
let observer
let replayTimer

function playWhenReady() {
  if (!video.value || !isVisible.value || !props.enabled || prefersReducedMotion.value) return
  video.value.play().catch((error) => {
    if (import.meta.env.DEV) console.warn(`Unable to autoplay video: ${label.value}`, error)
  })
}

function handleMediaError(event) {
  hasError.value = true
  if (import.meta.env.DEV) {
    console.warn(`Unable to load media: ${label.value}`, event.currentTarget?.error ?? event)
  }
}

function scheduleReplay() {
  window.clearTimeout(replayTimer)
  if (!isVisible.value || !props.enabled || prefersReducedMotion.value) return
  replayTimer = window.setTimeout(() => {
    if (!video.value || !isVisible.value) return
    video.value.currentTime = 0
    playWhenReady()
  }, 3000)
}

watch([isVisible, () => props.enabled], ([visible, enabled]) => {
  if (visible && enabled) {
    playWhenReady()
  } else {
    window.clearTimeout(replayTimer)
    video.value?.pause()
  }
})

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting
    },
    { rootMargin: '160px 0px', threshold: 0.18 },
  )
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.clearTimeout(replayTimer)
})
</script>

<template>
  <div ref="root" class="case-study-media" :class="`case-study-media--${media.type}`">
    <component
      :is="media.href ? 'a' : 'div'"
      class="case-study-media__surface"
      :href="media.href"
      :target="media.href ? '_blank' : undefined"
      :rel="media.href ? 'noreferrer' : undefined"
      :aria-label="media.href ? `${label} ↗` : undefined"
    >
      <video
        v-if="media.type === 'video' && isVisible && enabled"
        ref="video"
        :aria-label="label"
        :controls="prefersReducedMotion"
        :poster="media.poster"
        :style="{
          objectPosition: media.objectPosition ?? '50% 50%',
          '--media-fit': media.fit ?? 'contain',
          '--media-x': media.translateX ?? '0%',
          '--media-y': media.translateY ?? '0%',
          '--media-scale': media.scale ?? 1,
          '--media-compact-x': media.compactTranslateX ?? media.translateX ?? '0%',
          '--media-compact-y': media.compactTranslateY ?? media.translateY ?? '0%',
          '--media-compact-scale': media.compactScale ?? media.scale ?? 1,
          '--media-mobile-x': media.mobileTranslateX ?? '0%',
          '--media-mobile-y': media.mobileTranslateY ?? '0%',
          '--media-mobile-scale': media.mobileScale ?? 1,
        }"
        muted
        playsinline
        autoplay
        preload="metadata"
        @canplay="playWhenReady"
        @ended="scheduleReplay"
        @loadeddata="hasLoaded = true"
        @error="handleMediaError"
      >
        <source :src="media.src" :type="media.mimeType ?? 'video/mp4'" />
      </video>

      <div v-else-if="media.type === 'video'" class="case-study-media__placeholder">
        <span>{{ label }}</span>
      </div>

      <img
        v-else-if="media.type === 'image'"
        :src="media.src"
        :alt="label"
        :width="media.width"
        :height="media.height"
        :style="{
          objectPosition: media.objectPosition ?? '50% 50%',
          '--media-fit': media.fit ?? 'contain',
          '--media-x': media.translateX ?? '0%',
          '--media-y': media.translateY ?? '0%',
          '--media-scale': media.scale ?? 1,
          '--media-compact-x': media.compactTranslateX ?? media.translateX ?? '0%',
          '--media-compact-y': media.compactTranslateY ?? media.translateY ?? '0%',
          '--media-compact-scale': media.compactScale ?? media.scale ?? 1,
          '--media-mobile-x': media.mobileTranslateX ?? '0%',
          '--media-mobile-y': media.mobileTranslateY ?? '0%',
          '--media-mobile-scale': media.mobileScale ?? 1,
        }"
        loading="lazy"
        decoding="async"
        @load="hasLoaded = true"
        @error="handleMediaError"
      />

      <div v-else class="case-study-media__placeholder">
        <span>{{ label }}</span>
      </div>

      <span v-if="hasError" class="case-study-media__loading" role="alert">
        {{ t('mediaLoadError') }}
      </span>

      <span
        v-else-if="media.type !== 'placeholder' && !hasLoaded"
        class="case-study-media__loading"
        role="status"
      >
        Loading…
      </span>
    </component>
  </div>
</template>

<style scoped>
.case-study-media {
  position: relative;
  display: grid;
  width: 100%;
  min-width: 0;
  min-height: 12rem;
  overflow: hidden;
  place-items: center;
  background:
    radial-gradient(circle at 68% 28%, rgb(145 203 200 / 10%), transparent 28%),
    repeating-linear-gradient(135deg, rgb(141 196 189 / 4%) 0 1px, transparent 1px 16px);
}
.case-study-media video,
.case-study-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: var(--media-fit, contain);
  transform: translate3d(var(--media-x), var(--media-y), 0) scale(var(--media-scale));
  transform-origin: center;
}
.case-study-media__surface {
  display: grid;
  width: 100%;
  height: 100%;
  min-width: 0;
  place-items: center;
  color: inherit;
  text-decoration: none;
}
.case-study-media__placeholder {
  display: grid;
  padding: 2rem;
  place-items: center;
  gap: 0.7rem;
  color: var(--case-muted);
  text-align: center;
}
.case-study-media__loading {
  font-family: var(--font-label);
  font-size: 0.55rem;
  letter-spacing: 0.08em;
}
.case-study-media__loading {
  position: absolute;
  color: var(--case-muted);
}
@media (max-width: 1599px) {
  .case-study-media video,
  .case-study-media img {
    transform: translate3d(var(--media-compact-x), var(--media-compact-y), 0)
      scale(var(--media-compact-scale));
  }
}
@media (max-width: 860px) {
  .case-study-media {
    min-height: clamp(10rem, 44vh, 18rem);
  }
  .case-study-media video,
  .case-study-media img {
    transform: translate3d(var(--media-mobile-x), var(--media-mobile-y), 0)
      scale(var(--media-mobile-scale));
  }
}
</style>
