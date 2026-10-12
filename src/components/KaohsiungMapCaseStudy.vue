<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { kaohsiungMap as project } from '@/data/kaohsiungMap'
import { useLanguage } from '@/composables/useLanguage'
import { useReducedMotion } from '@/composables/useReducedMotion'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
const props = defineProps({ ready: Boolean })
const emit = defineEmits(['back'])
const { pick } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const page = ref(null)
const heroTarget = ref(null)
const heroImage = ref(null)
const backgroundMap = ref(null)
let observer
let scrollFrame = 0
let wheelTarget
function syncBackground() {
  scrollFrame = 0
  if (backgroundMap.value) {
    const distance = prefersReducedMotion.value
      ? 0
      : Math.min(100, (page.value?.scrollTop ?? 0) * 0.035)
    backgroundMap.value.style.transform = `translate3d(0, ${-distance}px, 0)`
  }
}
function onScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(syncBackground)
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
    prefersReducedMotion.value
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
    duration: 0.45,
    ease: 'power2.out',
    overwrite: 'auto',
    onComplete: () => {
      wheelTarget = undefined
    },
  })
}
watch(prefersReducedMotion, () => {
  stopSmoothScroll()
  syncBackground()
})
onMounted(() => {
  // Keep content visible by default; motion only adds a brief arrival effect.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!prefersReducedMotion.value) entry.target.classList.add('is-arriving')
          observer.unobserve(entry.target)
        }
      }
    },
    { root: page.value, threshold: 0.15 },
  )
  page.value?.querySelectorAll('[data-arrival]').forEach((element) => observer.observe(element))
})
onBeforeUnmount(() => {
  observer?.disconnect()
  stopSmoothScroll()
  if (scrollFrame) cancelAnimationFrame(scrollFrame)
})
defineExpose({ heroTarget, heroImage })
</script>

<template>
  <main
    ref="page"
    class="map-story"
    :class="{ 'is-ready': props.ready }"
    @scroll.passive="onScroll"
    @wheel="smoothWheel"
    @touchstart.passive="stopSmoothScroll"
    @pointerdown="stopSmoothScroll"
    @keydown="stopSmoothScroll"
  >
    <div class="map-story__ambience" aria-hidden="true">
      <img ref="backgroundMap" :src="project.mapBackground" alt="" />
    </div>
    <header class="map-story__header">
      <button class="map-story__back" type="button" @click="emit('back')">
        <span>← {{ pick(project.ui.backToArtworks) }}</span>
      </button>
      <LanguageSwitcher />
    </header>

    <section class="map-story__scene map-story__proposal" aria-labelledby="map-story-title">
      <div class="map-story__papers">
        <figure ref="heroTarget" class="map-story__paper map-story__paper--front">
          <img
            ref="heroImage"
            :src="project.cover.src"
            :alt="pick(project.ui.front)"
            width="4252"
            height="2481"
            fetchpriority="high"
          />
        </figure>
        <figure class="map-story__paper map-story__paper--back">
          <img
            :src="project.brochureBack"
            :alt="pick(project.ui.back)"
            width="4252"
            height="2481"
          />
        </figure>
      </div>
      <div class="map-story__copy">
        <p class="chapter-label">01 · {{ project.ui.eyebrow }}</p>
        <h1 id="map-story-title">{{ pick(project.title) }}</h1>
        <h2>{{ pick(project.ui.concept) }}</h2>
        <p>{{ pick(project.ui.conceptText) }}</p>
      </div>
    </section>

    <section class="map-story__scene map-story__scenery" aria-labelledby="map-scenery-title">
      <div class="map-story__copy" data-arrival>
        <p class="chapter-label">02 · DRAWING</p>
        <h2 id="map-scenery-title">{{ pick(project.ui.scenery) }}</h2>
        <p>{{ pick(project.ui.sceneryText) }}</p>
      </div>
      <div class="map-story__landscapes" data-arrival>
        <figure
          v-for="(item, i) in project.spots"
          :key="item.id"
          class="map-story__landscape"
          :class="`map-story__landscape--${i + 1}`"
        >
          <img :src="item.image" :alt="pick(item.title)" loading="lazy" />
        </figure>
      </div>
    </section>

    <section class="map-story__scene map-story__game" aria-labelledby="map-game-title">
      <div class="map-story__copy" data-arrival>
        <p class="chapter-label">03 · EXPERIENCE</p>
        <h2 id="map-game-title">{{ pick(project.ui.game) }}</h2>
        <p>{{ pick(project.ui.gameText) }}</p>
        <p>{{ pick(project.ui.journeyText) }}</p>
      </div>
      <div class="map-story__objects" data-arrival>
        <div class="map-story__stamps">
          <img
            v-for="(image, i) in project.stamps"
            :key="image"
            :src="image"
            :alt="`${pick(project.ui.stampAlt)} · ${i + 1}`"
            loading="lazy"
          />
        </div>
        <p>{{ pick(project.ui.patternText) }}</p>
        <div class="map-story__photos">
          <figure v-for="(image, i) in project.photos" :key="image">
            <img :src="image" :alt="`${pick(project.ui.photoAlt)} · ${i + 1}`" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
    <footer class="map-story__footer">
      <button class="map-story__back" type="button" @click="emit('back')">
        <span>← {{ pick(project.ui.backToArtworks) }}</span>
      </button>
    </footer>
  </main>
</template>

<style scoped>
.map-story {
  position: relative;
  isolation: isolate;
  height: 100dvh;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
  background: var(--color-paper);
  color: var(--color-ink);
  padding-inline: var(--page-pad);
  scrollbar-width: thin;
  scrollbar-color: var(--color-muted) transparent;
}
.map-story__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 0.75rem;
}
.map-story__back {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-family: var(--font-label), var(--font-body);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
}
.map-story__back span {
  border-bottom: 1px solid currentColor;
  padding-block: 0.6rem;
}
.map-story__back:hover {
  color: var(--color-ink-teal);
}
.map-story__scene {
  display: grid;
  gap: clamp(2rem, 4vw, 5rem);
  align-items: center;
  max-width: 92rem;
  margin-inline: auto;
  padding-block: clamp(2rem, 5vw, 5rem);
  min-height: calc(100svh - 5rem);
}
.map-story__proposal {
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.85fr);
}
.map-story__copy {
  min-width: 0;
  max-width: 35rem;
}
.map-story h1,
.map-story h2 {
  font-family: var(--font-display);
  font-weight: 400;
  overflow-wrap: anywhere;
}
.map-story h1 {
  font-size: clamp(2.25rem, 3.6vw, 4.25rem);
  line-height: 1.15;
  margin-block: 0.8rem 2rem;
}
.map-story h2 {
  font-size: clamp(1.5rem, 2.6vw, 2.75rem);
  line-height: 1.3;
  margin-block: 0.75rem 1rem;
}
.map-story p {
  font-size: clamp(0.9375rem, 1vw, 1.0625rem);
  line-height: 1.85;
}
.map-story .chapter-label {
  font-size: 0.65rem;
  line-height: 1.6;
}
.map-story__copy > h2 {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-line);
}
.map-story figure {
  margin: 0;
  min-width: 0;
}
.map-story__papers {
  position: relative;
  aspect-ratio: 1.15;
}
.map-story__paper {
  position: absolute;
  width: 76%;
  box-shadow: 0.35rem 0.5rem 0.8rem color-mix(in srgb, var(--color-ink) 28%, transparent);
}
.map-story__paper img {
  display: block;
  width: 100%;
  height: auto;
}
.map-story__paper--front {
  top: 0;
  left: 0;
  z-index: 2;
}
.map-story__paper--back {
  top: 40%;
  right: 0;
  z-index: 1;
}
.map-story__paper--front img {
  opacity: 0;
}
.is-ready .map-story__paper--front img {
  opacity: 1;
}
.map-story__scenery {
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr);
}
.map-story__landscapes {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 2.5rem);
  align-items: center;
}
.map-story__landscape {
  grid-column: span 2;
}
.map-story__landscape--1 {
  grid-column: 1 / span 3;
}
.map-story__landscape--2 {
  grid-column: 4 / span 3;
  padding-top: 2rem;
}
.map-story__landscape--3 {
  padding-top: 2rem;
}
.map-story__landscape--5 {
  padding-top: 3rem;
}
.map-story__landscape img {
  display: block;
  width: 100%;
  height: auto;
}
/* Dragon and Tiger Pagodas / Museum of Fine Arts. */
.map-story__landscape--1 img,
.map-story__landscape--2 img {
  transform: scale(0.8);
  transform-origin: center;
}
.map-story__game {
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr);
}
.map-story__stamps {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: clamp(0.75rem, 1.5vw, 2rem);
  align-items: center;
}
.map-story__stamps img {
  display: block;
  width: 100%;
  height: clamp(5rem, 9vw, 9rem);
  object-fit: contain;
}
.map-story__objects > p {
  max-width: 42rem;
  margin-block: 1.5rem 2rem;
}
.map-story__photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: start;
}
.map-story__photos figure:nth-child(2) {
  margin-top: 2rem;
}
.map-story__photos img {
  display: block;
  width: 100%;
  height: auto;
}
.map-story__footer {
  padding-block: 1.5rem;
}
.map-story :where(button, a):focus-visible {
  outline: 2px solid var(--color-ink-teal);
  outline-offset: 3px;
}
.is-arriving {
  animation: map-arrive 500ms var(--ease-soft) both;
}
@keyframes map-arrive {
  from {
    opacity: 0.5;
    transform: translateY(0.75rem);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (max-width: 900px) {
  .map-story__scene {
    grid-template-columns: minmax(0, 1fr);
    min-height: auto;
    padding-block: 2rem 3rem;
  }
  .map-story__copy {
    max-width: 45rem;
  }
  .map-story__papers {
    display: grid;
    gap: 1.5rem;
    aspect-ratio: auto;
  }
  .map-story__paper {
    position: static;
    width: 100%;
  }
  .map-story__stamps {
    gap: 0.75rem;
  }
}
@media (max-width: 480px) {
  .map-story__landscapes {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .map-story__landscape,
  .map-story__landscape--1,
  .map-story__landscape--2 {
    grid-column: span 1;
    padding-top: 0;
  }
  .map-story__landscape--5 {
    grid-column: 1 / -1;
    width: 65%;
    justify-self: center;
    padding-top: 0;
  }
  .map-story__stamps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.map-story__ambience {
  position: fixed;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.map-story__ambience > img {
  position: absolute;
  bottom: calc(-24vh - 40%);
  width: clamp(38rem, 65vw, 80rem);
  max-width: none;
  height: auto;
  opacity: 0.2;
  will-change: transform;
}
.map-story__ambience::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIj48ZmlsdGVyIGlkPSJncmFpbiI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9Ii42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjZ3JhaW4pIiBvcGFjaXR5PSIuNyIvPjwvc3ZnPg==');
  background-size: 160px 160px;
  opacity: 0.09;
  mix-blend-mode: multiply;
}
.map-story__header,
.map-story__scene,
.map-story__footer {
  position: relative;
  z-index: 1;
}
@media (prefers-reduced-motion: reduce) {
  .is-arriving {
    animation: none;
  }
  .map-story__ambience > img {
    will-change: auto;
  }
}
</style>
