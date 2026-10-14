<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useLanguage } from '@/composables/useLanguage'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({
  artwork: { type: Object, required: true },
  ready: Boolean,
})
const emit = defineEmits(['back'])
const { pick } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const page = ref(null)
const desktopHeroTarget = ref(null)
const desktopHeroImage = ref(null)
const mobileHeroTarget = ref(null)
const isPortraitLayout = ref(false)
const activeStep = ref(0)
const hasStartedScrolling = ref(false)
let scrollFrame = 0
let wheelTarget
let portraitQuery
const stepCount = 5
const stepIntervals = stepCount - 1

const heroTarget = computed(() =>
  isPortraitLayout.value ? mobileHeroTarget.value : desktopHeroTarget.value,
)
const heroImage = computed(() =>
  isPortraitLayout.value ? mobileHeroTarget.value : desktopHeroImage.value,
)

const nunome = computed(() => props.artwork.works?.[0])
const wagami = computed(() => props.artwork.works?.[1])
const leftPanel = computed(() => {
  if (activeStep.value === 0) return 'mix'
  if (activeStep.value <= 2) return 'nunome'
  return 'wagami'
})
const rightPanel = computed(() => {
  if (activeStep.value <= 1) return 'intro'
  if (activeStep.value <= 3) return 'nunome'
  return 'wagami'
})

function syncStep() {
  scrollFrame = 0
  const scroller = page.value
  if (!scroller) return
  const stepHeight = Math.max(1, (scroller.scrollHeight - scroller.clientHeight) / stepIntervals)
  activeStep.value = Math.max(0, Math.min(4, Math.round(scroller.scrollTop / stepHeight)))
  hasStartedScrolling.value = scroller.scrollTop > 32
}

function scrollToFirstStoryStep() {
  const scroller = page.value
  if (!scroller) return
  const stepHeight = Math.max(1, (scroller.scrollHeight - scroller.clientHeight) / stepIntervals)
  gsap.to(scroller, {
    scrollTop: stepHeight,
    duration: prefersReducedMotion.value ? 0 : 0.7,
    ease: 'power2.inOut',
    overwrite: 'auto',
  })
}

function onScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(syncStep)
}

function stopSmoothScroll() {
  if (page.value) gsap.killTweensOf(page.value, 'scrollTop')
  wheelTarget = undefined
}

function smoothWheel(event) {
  if (
    !page.value ||
    event.ctrlKey ||
    Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
    prefersReducedMotion.value ||
    window.matchMedia('(max-width: 760px) and (orientation: portrait)').matches
  )
    return

  const scroller = page.value
  const delta =
    event.deltaY * (event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? scroller.clientHeight : 1)
  const end = scroller.scrollHeight - scroller.clientHeight
  if (end <= 0) return

  event.preventDefault()
  wheelTarget = Math.max(0, Math.min(end, (wheelTarget ?? scroller.scrollTop) + delta))
  gsap.to(scroller, {
    scrollTop: wheelTarget,
    duration: 0.55,
    ease: 'power2.out',
    overwrite: 'auto',
    onComplete: () => {
      wheelTarget = undefined
    },
  })
}

function syncLayout(event) {
  isPortraitLayout.value = event.matches
}

onMounted(() => {
  portraitQuery = window.matchMedia('(max-width: 760px) and (orientation: portrait)')
  isPortraitLayout.value = portraitQuery.matches
  portraitQuery.addEventListener('change', syncLayout)
})

onBeforeUnmount(() => {
  stopSmoothScroll()
  if (scrollFrame) cancelAnimationFrame(scrollFrame)
  portraitQuery?.removeEventListener('change', syncLayout)
})

defineExpose({ heroTarget, heroImage })
</script>

<template>
  <main
    ref="page"
    class="lacquer-story"
    :class="{ 'is-ready': props.ready }"
    @scroll.passive="onScroll"
    @wheel="smoothWheel"
    @touchstart.passive="stopSmoothScroll"
    @pointerdown="stopSmoothScroll"
  >
    <button class="lacquer-story__back" type="button" data-magnetic @click="emit('back')">
      ← {{ pick({ 'zh-Hant': '返回創作列表', en: 'Back to artworks', ja: '作品一覧へ戻る' }) }}
    </button>

    <div class="lacquer-story__sequence">
      <div class="lacquer-story__canvas">
        <div class="lacquer-story__lane lacquer-story__lane--left">
          <figure
            class="lacquer-story__panel lacquer-story__panel--square"
            :class="{ 'is-visible': leftPanel === 'mix' }"
            :aria-hidden="leftPanel === 'mix' ? undefined : true"
          >
            <div ref="desktopHeroTarget" class="lacquer-story__media-frame">
              <img
                ref="desktopHeroImage"
                :src="artwork.cover.src"
                :alt="pick(artwork.alt)"
                :width="artwork.cover.width"
                :height="artwork.cover.height"
                fetchpriority="high"
              />
            </div>
          </figure>
          <figure
            class="lacquer-story__panel lacquer-story__panel--square"
            :class="{ 'is-visible': leftPanel === 'nunome' }"
            :aria-hidden="leftPanel === 'nunome' ? undefined : true"
          >
            <div class="lacquer-story__media-frame">
              <img
                :src="nunome.processImage.src"
                :alt="pick(nunome.title)"
                :width="nunome.processImage.width"
                :height="nunome.processImage.height"
                loading="lazy"
              />
            </div>
          </figure>
          <figure
            class="lacquer-story__panel lacquer-story__panel--square"
            :class="{ 'is-visible': leftPanel === 'wagami' }"
            :aria-hidden="leftPanel === 'wagami' ? undefined : true"
          >
            <div class="lacquer-story__media-frame">
              <img
                :src="wagami.processImage.src"
                :alt="pick(wagami.title)"
                :width="wagami.processImage.width"
                :height="wagami.processImage.height"
                loading="lazy"
              />
            </div>
          </figure>
        </div>

        <div class="lacquer-story__lane lacquer-story__lane--right">
          <article
            class="lacquer-story__panel lacquer-story__copy"
            :class="{ 'is-visible': rightPanel === 'intro' }"
            :aria-hidden="rightPanel === 'intro' ? undefined : true"
          >
            <div>
              <header class="lacquer-story__heading">
                <p class="chapter-label">{{ pick(artwork.type) }}</p>
                <h1>{{ pick(artwork.title) }}</h1>
                <p class="lacquer-story__date">{{ pick(artwork.date) }}</p>
              </header>
              <section>
                <h2>{{ pick(nunome.title) }}</h2>
                <p>{{ pick(nunome.description) }}</p>
              </section>
              <section>
                <h2>{{ pick(wagami.title) }}</h2>
                <p>{{ pick(wagami.description) }}</p>
              </section>
            </div>
          </article>
          <figure
            class="lacquer-story__panel lacquer-story__panel--wide"
            :class="{ 'is-visible': rightPanel === 'nunome' }"
            :aria-hidden="rightPanel === 'nunome' ? undefined : true"
          >
            <div class="lacquer-story__media-frame">
              <img
                :src="nunome.image.src"
                :alt="pick(nunome.title)"
                :width="nunome.image.width"
                :height="nunome.image.height"
                loading="lazy"
              />
            </div>
          </figure>
          <figure
            class="lacquer-story__panel lacquer-story__panel--wide"
            :class="{ 'is-visible': rightPanel === 'wagami' }"
            :aria-hidden="rightPanel === 'wagami' ? undefined : true"
          >
            <div class="lacquer-story__media-frame">
              <img
                :src="wagami.image.src"
                :alt="pick(wagami.title)"
                :width="wagami.image.width"
                :height="wagami.image.height"
                loading="lazy"
              />
            </div>
          </figure>
        </div>

        <button
          class="lacquer-story__scroll-hint"
          :class="{ 'is-hidden': hasStartedScrolling }"
          type="button"
          @click="scrollToFirstStoryStep"
        >
          <span class="lacquer-story__scroll-line" aria-hidden="true"></span>
          <span>{{
            pick({ 'zh-Hant': '向下看更多', en: 'Scroll Down', ja: '下へスクロール' })
          }}</span>
        </button>
      </div>
      <div class="lacquer-story__steps" aria-hidden="true">
        <span v-for="step in stepCount" :key="step"></span>
      </div>
    </div>

    <div class="lacquer-story__mobile-flow">
      <img
        ref="mobileHeroTarget"
        :src="artwork.cover.src"
        :alt="pick(artwork.alt)"
        :width="artwork.cover.width"
        :height="artwork.cover.height"
      />
      <article class="lacquer-story__mobile-copy lacquer-story__heading">
        <p class="chapter-label">{{ pick(artwork.type) }}</p>
        <h1>{{ pick(artwork.title) }}</h1>
        <p>{{ pick(artwork.date) }}</p>
      </article>
      <img
        :src="nunome.processImage.src"
        :alt="pick(nunome.title)"
        :width="nunome.processImage.width"
        :height="nunome.processImage.height"
        loading="lazy"
      />
      <article class="lacquer-story__mobile-copy">
        <h2>{{ pick(nunome.title) }}</h2>
        <p>{{ pick(nunome.description) }}</p>
      </article>
      <img
        :src="nunome.image.src"
        :alt="pick(nunome.title)"
        :width="nunome.image.width"
        :height="nunome.image.height"
        loading="lazy"
      />
      <img
        :src="wagami.processImage.src"
        :alt="pick(wagami.title)"
        :width="wagami.processImage.width"
        :height="wagami.processImage.height"
        loading="lazy"
      />
      <article class="lacquer-story__mobile-copy">
        <h2>{{ pick(wagami.title) }}</h2>
        <p>{{ pick(wagami.description) }}</p>
      </article>
      <img
        :src="wagami.image.src"
        :alt="pick(wagami.title)"
        :width="wagami.image.width"
        :height="wagami.image.height"
        loading="lazy"
      />
    </div>
  </main>
</template>
