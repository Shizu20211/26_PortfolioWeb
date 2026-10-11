<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/composables/useReducedMotion'
import { useLanguage } from '@/composables/useLanguage'

const props = defineProps({ work: { type: Object, required: true }, ready: Boolean })
const { t, pick } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const index = ref(0)
const playing = ref(true)
const resetting = ref(false)
const loaded = ref({})
const root = ref(null)
const compact = ref(false)
const images = computed(() => props.work.images ?? (props.work.media ? [props.work.media] : []))
const longImages = computed(() => props.work.longImages ?? [])
const failed = ref({})
const hovering = ref(false)
let animationFrame
let previousTime
let elapsed = 0
let bottomHold = 0
const positions = new WeakMap()
const wheelTargets = new WeakMap()
let query
let resetTimer
function tick(time) {
  const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.1) : 0
  previousTime = time
  const focused =
    document.activeElement?.closest('[data-long-frame]') &&
    root.value?.contains(document.activeElement)
  if (props.ready && !prefersReducedMotion.value && !document.hidden) {
    if (!longImages.value.length) {
      if (
        images.value.length > 1 &&
        (loaded.value[images.value[index.value]?.src] ||
          failed.value[images.value[index.value]?.src])
      ) {
        elapsed += delta
        if (elapsed >= 5) {
          for (let step = 1; step < images.value.length; step++) {
            const next = (index.value + step) % images.value.length
            if (loaded.value[images.value[next]?.src]) {
              index.value = next
              elapsed = 0
              break
            }
          }
        }
      }
    } else if (playing.value && !hovering.value && !focused && !resetting.value) {
      elapsed += delta
      if (elapsed > 3) {
        const frames = [...(root.value?.querySelectorAll('[data-long-frame]') ?? [])].filter(
          (frame) => frame.clientHeight > 0,
        )
        let complete = frames.length > 0
        for (const frame of frames) {
          const image = frame.querySelector('img')
          if (image && failed.value[image.getAttribute('src')]) continue
          if (!image?.complete || !image.naturalWidth) {
            complete = false
            continue
          }
          const end = frame.scrollHeight - frame.clientHeight
          const position = Math.min(end, (positions.get(frame) ?? frame.scrollTop) + delta * 28)
          positions.set(frame, position)
          frame.scrollTop = position
          if (frame.scrollTop < end - 1) complete = false
        }
        if (complete) {
          bottomHold += delta
          if (bottomHold >= 3) {
            resetting.value = true
            resetTimer = window.setTimeout(() => {
              frames.forEach((frame) => {
                frame.scrollTop = 0
                positions.delete(frame)
                wheelTargets.delete(frame)
              })
              if (compact.value) index.value = (index.value + 1) % longImages.value.length
              elapsed = 0
              bottomHold = 0
              resetting.value = false
            }, 400)
          }
        } else {
          bottomHold = 0
        }
      }
    }
  }
  animationFrame = requestAnimationFrame(tick)
}
function updateCompact() {
  compact.value = query.matches
}
function stopOnInteraction() {
  playing.value = false
}
function resumePlayback() {
  hovering.value = false
  root.value?.querySelectorAll('[data-long-frame]').forEach((frame) => {
    gsap.killTweensOf(frame)
    positions.set(frame, frame.scrollTop)
    wheelTargets.delete(frame)
  })
  playing.value = true
  bottomHold = 0
}
function smoothWheel(event) {
  if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
  const frame = event.target.closest('[data-long-frame]')
  if (!frame) return
  playing.value = false
  if (prefersReducedMotion.value) return
  event.preventDefault()
  const delta =
    event.deltaY * (event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? frame.clientHeight : 1)
  const target = Math.max(
    0,
    Math.min(
      frame.scrollHeight - frame.clientHeight,
      (wheelTargets.get(frame) ?? frame.scrollTop) + delta,
    ),
  )
  wheelTargets.set(frame, target)
  gsap.to(frame, { scrollTop: target, duration: 0.4, ease: 'power2.out', overwrite: true })
}
watch(prefersReducedMotion, (reduced) => {
  if (!reduced) return
  window.clearTimeout(resetTimer)
  resetting.value = false
  index.value = 0
  root.value?.querySelectorAll('[data-long-frame]').forEach((frame) => gsap.killTweensOf(frame))
})
onMounted(() => {
  query = matchMedia('(max-width: 1180px) and (max-height: 720px), (max-width: 760px)')
  updateCompact()
  query.addEventListener('change', updateCompact)
  animationFrame = requestAnimationFrame(tick)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame)
  root.value?.querySelectorAll('[data-long-frame]').forEach((frame) => gsap.killTweensOf(frame))
  window.clearTimeout(resetTimer)
  query?.removeEventListener('change', updateCompact)
})
</script>

<template>
  <div ref="root" class="frontend-detail-gallery" :class="{ 'is-ready': ready }">
    <template v-if="longImages.length">
      <div
        class="frontend-detail-gallery__long"
        :class="{ 'is-resetting': resetting }"
        @pointerenter="hovering = true"
        @pointerleave="resumePlayback"
        @wheel="smoothWheel"
        @touchstart.passive="stopOnInteraction"
      >
        <div
          v-for="(image, i) in longImages"
          :key="i"
          v-show="!compact || index === i"
          class="frontend-detail-gallery__frame"
          :class="{ 'is-child': i === 1 && !compact, 'is-mobile': i === 1 }"
          data-long-frame
          tabindex="0"
          :aria-label="`${pick(image.alt)} · ${t('scrollExplore')}`"
        >
          <img
            :src="image.src"
            :alt="pick(image.alt)"
            :width="image.width"
            :height="image.height"
            @error="failed[image.src] = true"
          />
          <span v-if="failed[image.src]" class="frontend-detail-gallery__error">{{
            t('mediaLoadError')
          }}</span>
        </div>
      </div>
    </template>
    <template v-else-if="images.length">
      <div class="frontend-detail-gallery__slides">
        <img
          v-for="(image, i) in images"
          :key="image.src"
          :src="image.src"
          :alt="i === index ? pick(image.alt) : ''"
          :aria-hidden="i !== index"
          :class="{ 'is-current': i === index }"
          :width="image.width"
          :height="image.height"
          decoding="async"
          @load="loaded[image.src] = true"
          @error="failed[image.src] = true"
        />
        <span v-if="failed[images[index]?.src]" class="frontend-detail-gallery__error">{{
          t('mediaLoadError')
        }}</span>
      </div>
    </template>
    <div v-else class="frontend-work-detail__target-placeholder is-visible">
      {{ t('imageNeeded') }}
    </div>
  </div>
</template>
