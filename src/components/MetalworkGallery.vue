<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useLanguage } from '@/composables/useLanguage'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
})

const { pick } = useLanguage()
const activeIndex = ref(0)
const imageElements = ref([])
const prefersReducedMotion = ref(false)
const heroImage = computed(() => imageElements.value[activeIndex.value] ?? null)

function setImageElement(element, index) {
  if (element) imageElements.value[index] = element
}

async function selectImage(nextIndex) {
  if (nextIndex === activeIndex.value || !props.images[nextIndex]) return

  const previousIndex = activeIndex.value
  const previousImage = imageElements.value[previousIndex]
  const nextImage = imageElements.value[nextIndex]
  activeIndex.value = nextIndex

  await nextTick()

  if (prefersReducedMotion.value) {
    gsap.set(imageElements.value, { clearProps: 'transform', opacity: 0 })
    gsap.set(nextImage, { opacity: 1 })
    return
  }

  gsap.killTweensOf(imageElements.value)
  gsap.set(nextImage, {
    opacity: 0,
    scale: 0.985,
    xPercent: nextIndex > previousIndex ? 2.5 : -2.5,
    zIndex: 2,
  })
  gsap.set(previousImage, { zIndex: 1 })
  gsap.to(previousImage, {
    opacity: 0,
    scale: 1.025,
    duration: 0.42,
    ease: 'power2.inOut',
    overwrite: true,
  })
  gsap.to(nextImage, {
    opacity: 1,
    scale: 1,
    xPercent: 0,
    duration: 0.68,
    ease: 'power2.inOut',
    overwrite: true,
    onComplete: () => gsap.set(nextImage, { clearProps: 'transform,zIndex' }),
  })
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  gsap.set(imageElements.value, { opacity: 0 })
  gsap.set(imageElements.value[0], { opacity: 1 })
})

onBeforeUnmount(() => gsap.killTweensOf(imageElements.value))

defineExpose({ heroImage })
</script>

<template>
  <div class="metalwork-gallery">
    <div class="metalwork-gallery__stage">
      <img
        v-for="(image, index) in images"
        :key="image.id"
        :ref="(element) => setImageElement(element, index)"
        class="metalwork-gallery__image"
        :src="image.src"
        :alt="pick(image.alt)"
        :width="image.width"
        :height="image.height"
        :loading="index === 0 ? 'eager' : 'lazy'"
        decoding="async"
        :aria-hidden="index === activeIndex ? undefined : true"
      />
    </div>

    <ol
      class="metalwork-gallery__pagination"
      :aria-label="pick({ 'zh-Hant': '作品圖片', en: 'Artwork images', ja: '作品画像' })"
    >
      <li v-for="(image, index) in images" :key="image.id">
        <button
          type="button"
          :aria-label="`${index + 1} / ${images.length}：${pick(image.alt)}`"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="selectImage(index)"
        >
          <span aria-hidden="true"></span>
        </button>
      </li>
    </ol>
  </div>
</template>
