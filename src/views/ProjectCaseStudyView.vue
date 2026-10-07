<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import LazyCaseStudyMedia from '@/components/LazyCaseStudyMedia.vue'
import ProjectHighlightGallery from '@/components/ProjectHighlightGallery.vue'
import { projects } from '@/data/projects'
import { useCaseStudyPointerEffects } from '@/composables/useCaseStudyPointerEffects'
import { useLanguage } from '@/composables/useLanguage'
import { useMagneticHover } from '@/composables/useMagneticHover'
import { useReducedMotion } from '@/composables/useReducedMotion'

const route = useRoute()
const { pick, t } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const {
  view,
  heroVisual,
  cursorDot,
  cursorRing,
  sporeCanvas,
  move,
  leave,
  addRipple,
  updateParallax,
} = useCaseStudyPointerEffects()
useMagneticHover()
const project = computed(() => projects.find(({ slug }) => slug === route.params.slug))
const caseStudy = computed(() => project.value?.caseStudy)
const showBackToTop = ref(false)
let observer

function handleCaseStudyScroll(event) {
  updateParallax(event)
  const showOffset = window.innerWidth <= 768 ? 321 : 541
  showBackToTop.value = event.currentTarget.scrollTop > showOffset
}

function scrollCaseStudyToTop() {
  view.value?.scrollTo({ top: 0, behavior: prefersReducedMotion.value ? 'auto' : 'smooth' })
}

onMounted(() => {
  if (prefersReducedMotion.value) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { root: view.value, threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
  )
  view.value?.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <main
    v-if="project && caseStudy"
    ref="view"
    class="case-study-view"
    @pointermove="move"
    @pointerleave="leave"
    @scroll.passive="handleCaseStudyScroll"
  >
    <canvas ref="sporeCanvas" class="case-study-spores" aria-hidden="true"></canvas>
    <span
      ref="cursorDot"
      class="case-study-cursor case-study-cursor--dot"
      aria-hidden="true"
    ></span>
    <div class="case-study-bg-pattern" aria-hidden="true">
      <span class="case-study-bg-shape case-study-bg-shape--a"></span>
      <span class="case-study-bg-shape case-study-bg-shape--b"></span>
      <span class="case-study-bg-shape case-study-bg-shape--c"></span>
      <span class="case-study-bg-shape case-study-bg-shape--d"></span>
      <span class="case-study-bg-ring case-study-bg-ring--a"></span>
      <span class="case-study-bg-ring case-study-bg-ring--b"></span>
      <span class="case-study-bg-ring case-study-bg-ring--c"></span>
    </div>
    <span
      ref="cursorRing"
      class="case-study-cursor case-study-cursor--ring"
      aria-hidden="true"
    ></span>
    <header class="case-study-header">
      <RouterLink :to="{ path: '/', hash: '#featured' }" data-magnetic>CHING-YUNG HUANG</RouterLink>
      <LanguageSwitcher />
    </header>

    <div class="case-study-orientation" role="status">
      <strong>{{ t('rotateCaseStudy') }}</strong>
      <span>{{ t('rotateCaseStudyNote') }}</span>
    </div>

    <div class="case-study-content">
      <section class="case-study-hero" aria-labelledby="case-study-title">
        <div class="case-study-water-orbits" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="case-study-hero__copy">
          <p class="case-study-kicker">01 · {{ pick(caseStudy.eyebrow) }}</p>
          <h1 id="case-study-title">
            <span v-for="line in pick(caseStudy.heroTitleLines)" :key="line">{{ line }}</span>
          </h1>
          <p class="case-study-hero__lead">{{ pick(caseStudy.introduction) }}</p>
          <a :href="caseStudy.externalUrl" target="_blank" rel="noreferrer" data-magnetic>
            {{ t('viewWebsite') }} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div ref="heroVisual" class="case-study-hero__visual" @pointerdown="addRipple">
          <LazyCaseStudyMedia :media="caseStudy.heroMedia" />
        </div>
        <a class="case-study-scroll" href="#project-overview" data-magnetic>
          {{ t('scrollExplore') }} ↓
        </a>
      </section>

      <section id="project-overview" class="case-study-section case-study-overview">
        <div class="case-study-sticky" data-reveal>
          <p class="case-study-kicker">02 · {{ t('projectOverview') }}</p>
          <h2>{{ pick(caseStudy.overview.title) }}</h2>
        </div>
        <div class="case-study-overview__body" data-reveal>
          <p v-for="paragraph in pick(caseStudy.overview.body)" :key="paragraph">
            {{ paragraph }}
          </p>
          <dl>
            <div>
              <dt>{{ t('roleLabel') }}</dt>
              <dd>{{ pick(project.role) }}</dd>
            </div>
            <div>
              <dt>{{ t('toolsLabel') }}</dt>
              <dd>{{ project.tools.join(' / ') }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        class="case-study-section case-study-before-after"
        aria-labelledby="before-after-title"
      >
        <header data-reveal>
          <p class="case-study-kicker">03 · {{ t('beforeAfterTitle') }}</p>
          <h2 id="before-after-title">{{ t('beforeAfterTitle') }}</h2>
        </header>
        <div class="case-study-comparison-grid">
          <article v-for="(item, index) in caseStudy.beforeAfter" :key="index" data-reveal>
            <span class="case-study-card-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="case-study-comparison-side case-study-before">
              <LazyCaseStudyMedia
                :media="item.beforeMedia"
                :style="{ aspectRatio: item.ratio ?? '4 / 3' }"
              />
              <div class="case-study-comparison-copy">
                <small>{{ t('beforeLabel') }}</small>
                <h3>{{ pick(item.before) }}</h3>
                <p>{{ pick(item.beforeDetail) }}</p>
              </div>
            </div>
            <div class="case-study-comparison-side case-study-after">
              <LazyCaseStudyMedia
                :media="item.afterMedia"
                :style="{ aspectRatio: item.ratio ?? '4 / 3' }"
              />
              <div class="case-study-comparison-copy">
                <small>{{ t('afterLabel') }}</small>
                <h3>{{ pick(item.after) }}</h3>
                <p>{{ pick(item.afterDetail) }}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="case-study-section case-study-process" aria-labelledby="process-title">
        <header data-reveal>
          <p class="case-study-kicker">04 · {{ pick(caseStudy.processTitle) }}</p>
          <h2 id="process-title">{{ pick(caseStudy.processTitle) }}</h2>
        </header>
        <article
          v-for="(item, index) in caseStudy.process"
          :key="item.key"
          class="case-study-process__item"
          :class="{ 'is-media-right': item.side === 'right' }"
          data-reveal
        >
          <LazyCaseStudyMedia
            class="case-study-process__media"
            :media="item.media"
            :style="{ aspectRatio: item.ratio }"
          />
          <div>
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ pick(item.label) }}</h3>
            <p>{{ pick(item.note) }}</p>
          </div>
        </article>
      </section>

      <section class="case-study-section case-study-highlights" aria-labelledby="highlights-title">
        <header data-reveal>
          <p class="case-study-kicker">05 · {{ t('highlightsKicker') }}</p>
          <h2 id="highlights-title">{{ t('highlightsTitle') }}</h2>
        </header>
        <ProjectHighlightGallery :items="caseStudy.highlights" />
      </section>

      <section class="case-study-closing" aria-labelledby="reflection-title">
        <div data-reveal>
          <p class="case-study-kicker">06 · {{ t('reflectionTitle') }}</p>
          <h2 id="reflection-title">{{ t('reflectionTitle') }}</h2>
          <div class="case-study-reflection-copy">
            <p v-for="paragraph in pick(caseStudy.reflection)" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>
        <nav :aria-label="t('caseStudyLinks')">
          <a :href="caseStudy.externalUrl" target="_blank" rel="noreferrer" data-magnetic>
            {{ t('viewWebsite') }} ↗
          </a>
          <RouterLink :to="{ path: '/', hash: '#featured' }" data-magnetic>
            ← {{ t('backProjects') }}
          </RouterLink>
        </nav>
      </section>
    </div>
    <button
      class="case-study-back-to-top"
      :class="{ 'is-visible': showBackToTop }"
      type="button"
      :aria-label="t('backToTop')"
      @click="scrollCaseStudyToTop"
    >
      <span class="case-study-back-to-top__wave" aria-hidden="true"></span>
      <span class="case-study-back-to-top__arrow" aria-hidden="true">↑<small>TOP</small></span>
    </button>
  </main>

  <main v-else class="case-study-view case-study-not-found">
    <p>{{ t('projectNotFound') }}</p>
    <RouterLink :to="{ path: '/', hash: '#featured' }">← {{ t('backProjects') }}</RouterLink>
  </main>
</template>

<style scoped>
.case-study-view {
  --case-bg: #263957;
  --case-bg-deep: #17263d;
  --case-ink: #f3ead9;
  --case-muted: #bdc7cc;
  --case-accent: #91cbc8;
  --case-line: rgb(243 234 217 / 24%);
  --case-line-soft: rgba(145, 203, 200, 0.422);
  --case-line-strong: rgb(243 234 217 / 34%);
  --case-panel: rgb(255 255 255 / 5%);
  --case-parallax-near: 0px;
  --case-parallax-far: 0px;
  --case-display: 'Klee One', 'LXGW WenKai Mono TC', 'Noto Serif TC', 'Noto Serif JP', serif;
  height: 100svh;
  overflow-x: hidden;
  overflow-y: auto;
  background:
    radial-gradient(ellipse at 78% 7%, rgb(145 203 200 / 20%), transparent 32rem),
    radial-gradient(ellipse at 14% 56%, rgb(23 38 61 / 24%), transparent 38rem),
    linear-gradient(155deg, var(--case-bg-deep), var(--case-bg) 48%, #1d304b);
  color: var(--case-ink);
  font-family: var(--font-body);
  scroll-behavior: smooth;
  animation: case-study-enter 640ms var(--ease-soft) both;
  scrollbar-color: rgb(145 203 200 / 55%) rgb(23 38 61 / 42%);
  scrollbar-width: thin;
}
.case-study-view::-webkit-scrollbar {
  width: 7px;
}
.case-study-view::-webkit-scrollbar-track {
  background: rgb(23 38 61 / 42%);
}
.case-study-view::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 999px;
  background: rgb(145 203 200 / 58%);
  background-clip: padding-box;
}
.case-study-view::before {
  position: fixed;
  z-index: 0;
  inset: 0;
  background:
    linear-gradient(115deg, transparent 34%, rgb(202 235 228 / 3%) 49%, transparent 63%),
    radial-gradient(circle at 76% 18%, rgb(145 203 200 / 9%), transparent 28rem),
    radial-gradient(circle at 50% 120%, rgb(117 179 180 / 10%), transparent 45%);
  content: '';
  pointer-events: none;
}
.case-study-spores {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: none;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: screen;
}
.case-study-bg-pattern {
  position: fixed;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.case-study-bg-shape {
  position: absolute;
  display: block;
  background: rgb(83 112 145 / 12%);
  border: 1px solid rgb(145 203 200 / 7%);
  border-radius: 58% 42% 63% 37% / 42% 61% 39% 58%;
  transform: translate3d(0, var(--case-parallax-near), 0) rotate(var(--shape-rotation, 0deg));
  will-change: transform;
}
.case-study-bg-shape--a {
  --shape-rotation: -18deg;
  top: 8%;
  left: -8%;
  width: 34vw;
  aspect-ratio: 1.35;
}
.case-study-bg-shape--b {
  --shape-rotation: 16deg;
  top: 38%;
  right: -12%;
  width: 39vw;
  aspect-ratio: 1.15;
  background: rgb(145 203 200 / 8%);
}
.case-study-bg-shape--c {
  --shape-rotation: 9deg;
  bottom: -13%;
  left: 18%;
  width: 31vw;
  aspect-ratio: 1.5;
  background: rgb(35 53 81 / 22%);
}
.case-study-bg-shape--d {
  --shape-rotation: -9deg;
  top: 62%;
  left: -5%;
  width: 22vw;
  aspect-ratio: 0.9;
  background: rgb(109 143 169 / 8%);
}
.case-study-bg-ring {
  position: absolute;
  display: block;
  width: var(--ring-size);
  aspect-ratio: 1;
  border: 1px solid var(--case-line-soft);
  border-radius: 50%;
  opacity: 0.82;
  transform: translate3d(0, var(--case-parallax-far), 0);
  will-change: transform;
  -webkit-mask-image: repeating-conic-gradient(#000 0deg 64deg, transparent 68deg 78deg);
  mask-image: repeating-conic-gradient(#000 0deg 64deg, transparent 68deg 78deg);
}
.case-study-bg-ring::before,
.case-study-bg-ring::after {
  position: absolute;
  border: 1px solid var(--case-line-soft);
  border-radius: inherit;
  content: '';
}
.case-study-bg-ring::before {
  inset: 19%;
}
.case-study-bg-ring::after {
  inset: 37%;
  border-color: var(--case-line-strong);
}
.case-study-bg-ring--a {
  --ring-size: clamp(14rem, 27vw, 32rem);
  top: 7%;
  right: -7%;
}
.case-study-bg-ring--b {
  --ring-size: clamp(10rem, 18vw, 22rem);
  top: 47%;
  left: 4%;
}
.case-study-bg-ring--c {
  --ring-size: clamp(16rem, 32vw, 38rem);
  right: 12%;
  bottom: -18%;
}
.case-study-cursor {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  display: none;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  will-change: transform;
  transition:
    width 180ms ease,
    height 180ms ease,
    margin 180ms ease,
    opacity 220ms ease,
    border-color 180ms ease,
    background-color 180ms ease;
}
.case-study-cursor--dot {
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  background: #d9efe7;
  box-shadow:
    0 0 8px #d9efe7,
    0 0 18px rgb(217 239 231 / 55%);
  mix-blend-mode: screen;
}
.case-study-cursor--ring {
  z-index: 9998;
  width: 32px;
  height: 32px;
  margin: -16px 0 0 -16px;
  border: 1px solid rgb(243 234 217 / 55%);
}
.case-study-view.has-active-cursor .case-study-cursor {
  opacity: 1;
}
.case-study-cursor--dot.is-hovering {
  width: 12px;
  height: 12px;
  margin: -6px 0 0 -6px;
  background: var(--case-ink);
}
.case-study-cursor--ring.is-hovering {
  width: 44px;
  height: 44px;
  margin: -22px 0 0 -22px;
  border-color: rgb(145 203 200 / 62%);
}
.case-study-header {
  position: fixed;
  z-index: 20;
  inset: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem var(--page-pad);
  color: var(--case-ink);
  font-family: var(--font-label);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  pointer-events: none;
}
.case-study-header > * {
  pointer-events: auto;
}
.case-study-header :deep(.language-switcher) {
  color: var(--case-muted);
}
.case-study-header :deep(.language-switcher__option:hover),
.case-study-header :deep(.language-switcher__option:focus-visible),
.case-study-header :deep(.language-switcher__option.is-active) {
  color: var(--case-ink);
}
.case-study-content {
  position: relative;
  z-index: 1;
  min-height: 100%;
}
.case-study-hero,
.case-study-section,
.case-study-closing {
  position: relative;
  width: min(100%, 120rem);
  margin-inline: auto;
  padding-inline: var(--page-pad);
}
.case-study-hero {
  display: grid;
  grid-template-columns: minmax(18rem, 0.76fr) minmax(32rem, 1.24fr);
  align-items: center;
  gap: clamp(2rem, 6vw, 8rem);
  min-height: 100svh;
  padding-block: clamp(7rem, 14vh, 11rem) clamp(5rem, 10vh, 8rem);
}
.case-study-water-orbits {
  position: absolute;
  z-index: -1;
  top: 50%;
  right: clamp(-18rem, -12vw, -8rem);
  width: clamp(28rem, 55vw, 68rem);
  aspect-ratio: 1;
  border: 1px solid var(--case-line-soft);
  border-radius: 50%;
  pointer-events: none;
  transform: translateY(-50%);
}
.case-study-water-orbits i {
  position: absolute;
  inset: 12%;
  border: 1px solid var(--case-line-soft);
  border-radius: 50%;
}
.case-study-water-orbits i:nth-child(2) {
  inset: 28%;
}
.case-study-water-orbits i:nth-child(3) {
  inset: 43%;
  background: radial-gradient(circle, rgb(145 203 200 / 13%), transparent 66%);
}
.case-study-kicker {
  margin: 0 0 1.25rem;
  color: var(--case-accent);
  font-family: var(--font-hand);
  font-size: clamp(0.6rem, 0.8vw, 0.75rem);
  letter-spacing: 0.11em;
  text-transform: uppercase;
}
.case-study-hero h1,
.case-study-section h2,
.case-study-closing h2 {
  margin: 0;
  color: var(--case-ink);
  font-family: var(--case-display);
  font-weight: 400;
  letter-spacing: -0.055em;
  text-wrap: balance;
}
.case-study-hero h1 {
  font-size: clamp(2.4rem, 4.6vw, 5.6rem);
  line-height: 1.02;
}
.case-study-hero h1 span {
  display: block;
}
.case-study-section h2,
.case-study-closing h2 {
  font-size: clamp(2.3rem, 4.5vw, 5.4rem);
  line-height: 1;
}
.case-study-hero__lead {
  max-width: 32rem;
  margin: clamp(1.5rem, 4vh, 2.5rem) 0;
  color: var(--case-muted);
  font-size: clamp(0.95rem, 1.2vw, 1.2rem);
  line-height: 1.85;
}
.case-study-hero a,
.case-study-closing a {
  display: inline-block;
  padding-block: 0.6rem;
  border-bottom: 1px solid currentColor;
  font-family: var(--font-label);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.case-study-hero__visual {
  position: relative;
  aspect-ratio: 2996 / 1502;
  overflow: hidden;
  border: 1px solid var(--case-line);
  border-radius: clamp(1.5rem, 4vw, 4rem);
  background: var(--case-panel);
  box-shadow: 0 2rem 6rem rgb(0 0 0 / 28%);
}
.case-study-hero__visual::after {
  position: absolute;
  inset: -30% -55%;
  background: linear-gradient(110deg, transparent 42%, rgb(246 238 218 / 12%) 50%, transparent 58%);
  content: '';
  pointer-events: none;
  transform: translateX(-28%);
  animation: case-study-water-light 11s ease-in-out infinite alternate;
}
.case-study-hero__visual :deep(.case-study-media) {
  width: 100%;
  height: 100%;
  min-height: 0;
}
.case-study-hero__visual :deep(.case-study-ripple) {
  position: absolute;
  z-index: 3;
  width: 5rem;
  height: 5rem;
  margin: -2.5rem 0 0 -2.5rem;
  border: 1px solid rgb(243 234 217 / 72%);
  border-radius: 50%;
  box-shadow:
    0 0 0 0.35rem rgb(145 203 200 / 9%),
    inset 0 0 1.2rem rgb(145 203 200 / 16%);
  pointer-events: none;
  mix-blend-mode: screen;
  animation: case-study-ripple 1350ms var(--ease-soft) var(--ripple-delay, 0ms) forwards;
}
.case-study-scroll {
  position: absolute;
  right: var(--page-pad);
  bottom: 2rem;
  color: var(--case-muted);
}
.case-study-section {
  padding-block: clamp(7rem, 16vh, 14rem);
}
.case-study-section::before {
  position: absolute;
  top: 0;
  right: var(--page-pad);
  left: var(--page-pad);
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--case-line) 18%,
    var(--case-line) 82%,
    transparent
  );
  content: '';
}
.case-study-overview {
  display: grid;
  grid-template-columns: minmax(17rem, 0.9fr) minmax(22rem, 1.1fr);
  gap: clamp(3rem, 10vw, 12rem);
}
.case-study-sticky {
  position: sticky;
  top: 8rem;
  align-self: start;
}
.case-study-overview__body {
  padding-top: clamp(5rem, 15vh, 12rem);
}
.case-study-overview__body > p {
  margin: 0;
  color: var(--case-muted);
  font-size: clamp(0.95rem, 1.25vw, 1.2rem);
  line-height: 1.85;
}
.case-study-overview__body > p + p {
  margin-top: 1.25rem;
}
.case-study-overview dl {
  margin-top: 4rem;
  border-top: 1px solid var(--case-line);
}
.case-study-overview dl div {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 1rem;
  padding-block: 1rem;
  border-bottom: 1px solid var(--case-line);
}
.case-study-overview dt {
  color: var(--case-muted);
  font-family: var(--font-label);
  font-size: 0.65rem;
}
.case-study-overview dd {
  min-width: 0;
  margin: 0;
  overflow-wrap: anywhere;
}
.case-study-before-after > header,
.case-study-process > header,
.case-study-highlights > header {
  max-width: 56rem;
  margin-bottom: clamp(3rem, 8vh, 7rem);
}
.case-study-comparison-grid {
  display: grid;
  width: min(100%, 78rem);
  margin-inline: auto;
  gap: clamp(4rem, 12vh, 9rem);
}
.case-study-comparison-grid article {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: center;
  min-height: 25rem;
}
.case-study-comparison-side {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--case-line);
  border-radius: var(--radius-md);
  background: var(--case-panel);
  backdrop-filter: blur(10px);
  box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 16%);
  isolation: isolate;
}
.case-study-comparison-side::after {
  position: absolute;
  z-index: 1;
  inset: 38% 0 0;
  background: linear-gradient(transparent, rgb(12 24 39 / 88%));
  content: '';
  pointer-events: none;
}
.case-study-before {
  z-index: 1;
  grid-column: 1 / span 7;
  grid-row: 1;
  margin-bottom: 3.5rem;
  opacity: 0.76;
}
.case-study-comparison-grid .case-study-after {
  z-index: 2;
  grid-column: 6 / -1;
  grid-row: 1;
  margin-top: 3.5rem;
  background: linear-gradient(145deg, rgb(145 203 200 / 12%), rgb(91 142 151 / 5%));
}
.case-study-comparison-side :deep(.case-study-media) {
  min-height: 0;
  transition:
    transform 520ms var(--ease-soft),
    filter 520ms var(--ease-standard);
}
.case-study-comparison-copy {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  left: 0;
  padding: clamp(1rem, 2.2vw, 1.8rem);
}
.case-study-card-number {
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  color: var(--case-muted);
  font-family: var(--font-label);
  font-size: clamp(3rem, 8vw, 8rem);
  opacity: 0.12;
  transform: translate(-50%, -50%);
}
.case-study-comparison-grid small {
  color: var(--case-accent);
  font-family: var(--font-label);
  text-transform: uppercase;
}
.case-study-comparison-grid h3 {
  margin: 0.4rem 0;
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2vw, 2.2rem);
  font-weight: 400;
  transition: color 420ms var(--ease-standard);
}
@media (hover: hover) and (pointer: fine) {
  .case-study-comparison-side:hover :deep(.case-study-media) {
    transform: scale(0.97);
  }
  .case-study-before:hover :deep(.case-study-media) {
    filter: saturate(0.72);
  }
  .case-study-comparison-side:hover h3 {
    color: var(--case-accent);
  }
}
.case-study-comparison-grid p {
  margin: 0;
  color: var(--case-muted);
  line-height: 1.7;
}
.case-study-process__item {
  display: grid;
  grid-template-columns: minmax(25rem, 1.35fr) minmax(15rem, 0.65fr);
  align-items: center;
  gap: clamp(2rem, 7vw, 8rem);
  margin-block: clamp(5rem, 12vh, 10rem);
}
.case-study-process__item.is-media-right {
  grid-template-columns: minmax(15rem, 0.65fr) minmax(25rem, 1.35fr);
}
.case-study-process__item.is-media-right .case-study-process__media {
  order: 2;
}
.case-study-process__media {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: transparent;
}
.case-study-process__media :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.case-study-process__item > div:last-child > span {
  color: var(--case-accent);
  font-family: var(--font-label);
}
.case-study-process__item h3 {
  margin: 1rem 0;
  font-family: var(--case-display);
  font-size: clamp(2rem, 4vw, 4.8rem);
  font-weight: 400;
}
.case-study-process__item p {
  color: var(--case-muted);
  line-height: 1.8;
}
.case-study-closing {
  display: grid;
  align-content: center;
  min-height: 90svh;
  padding-block: 8rem;
  text-align: center;
}
.case-study-back-to-top {
  position: fixed;
  z-index: 30;
  right: calc(max(1.25rem, env(safe-area-inset-right)) + 10px);
  bottom: calc(max(1.25rem, env(safe-area-inset-bottom)) + 10px);
  display: grid;
  width: 4.5rem;
  aspect-ratio: 1;
  overflow: hidden;
  place-items: center;
  border: 0.5px solid rgb(243 234 217 / 48%);
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 22%, rgb(255 255 255 / 32%), transparent 22%),
    linear-gradient(145deg, rgb(243 234 217 / 13%), rgb(38 57 87 / 46%));
  backdrop-filter: blur(14px) saturate(145%);
  box-shadow:
    inset 0 0 0.7rem rgb(243 234 217 / 18%),
    inset 0 -1rem 1.2rem rgb(145 203 200 / 13%),
    0 0.8rem 2rem rgb(0 0 0 / 26%);
  color: var(--case-ink);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateY(0.75rem) scale(0.92);
  transition:
    opacity 240ms var(--ease-standard),
    transform 360ms var(--ease-soft);
}
.case-study-back-to-top::before {
  position: absolute;
  z-index: 3;
  top: 0.55rem;
  left: 0.65rem;
  width: 1.05rem;
  height: 0.55rem;
  border-radius: 50%;
  background: rgba(244, 248, 250, 0.75);
  content: '';
  filter: blur(0.75px);
  pointer-events: none;
  transform: rotate(-35deg);
}
.case-study-back-to-top::after {
  position: absolute;
  z-index: 4;
  inset: 0.22rem;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: inherit;
  content: '';
  pointer-events: none;
}
.case-study-back-to-top.is-visible {
  opacity: 0.86;
  pointer-events: auto;
  transform: none;
}
.case-study-back-to-top__wave {
  position: absolute;
  inset: 4% -16% -20%;
  background: linear-gradient(180deg, rgb(145 203 200 / 82%), rgb(49 91 126 / 94%));
  box-shadow: inset 0 0.55rem 0.8rem rgb(243 234 217 / 14%);
}
.case-study-back-to-top__wave::before,
.case-study-back-to-top__wave::after {
  position: absolute;
  top: 0;
  left: 50%;
  width: 200%;
  height: 200%;
  border-radius: 45%;
  background: rgb(243 234 217 / 88%);
  content: '';
  transform: translate(-50%, -75%) rotate(0deg);
  transform-origin: center;
  animation: case-study-wave 5s linear infinite;
}
.case-study-back-to-top__wave::after {
  border-radius: 40%;
  background: rgba(157, 187, 195, 0.843);
  animation-duration: 10s;
}
.case-study-back-to-top__arrow {
  position: relative;
  z-index: 5;
  display: grid;
  place-items: center;
  gap: 0.05rem;
  color: #263957;
  font-family: var(--font-label);
  font-size: 1.05rem;
  line-height: 1;
  text-shadow: 0 1px 0.35rem rgb(10 23 39 / 90%);
}
.case-study-back-to-top__arrow small {
  color: #263957;
  font-size: 0.59rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}
.case-study-closing::before {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(76vw, 70rem);
  aspect-ratio: 2 / 1;
  border: 1px solid rgb(145 203 200 / 9%);
  border-radius: 50%;
  content: '';
  pointer-events: none;
  transform: translate(-50%, -50%);
}
.case-study-closing > div {
  max-width: 60rem;
  margin-inline: auto;
}
.case-study-reflection-copy {
  margin-top: 2rem;
}
.case-study-reflection-copy p {
  margin: 0 auto;
  max-width: 48rem;
  color: var(--case-muted);
  font-size: clamp(1rem, 1.5vw, 1.3rem);
  line-height: 1.9;
}
.case-study-reflection-copy p + p {
  margin-top: 1.25rem;
}
.case-study-closing nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
}
[data-reveal] {
  opacity: 0;
  transform: translateY(2rem);
  transition:
    opacity 850ms var(--ease-soft),
    transform 850ms var(--ease-soft);
}
[data-reveal].is-visible {
  opacity: 1;
  transform: none;
}
.case-study-orientation {
  display: none;
}
.case-study-not-found {
  display: grid;
  place-content: center;
  gap: 1rem;
  text-align: center;
}
@keyframes case-study-water-light {
  to {
    transform: translateX(28%);
  }
}
@keyframes case-study-enter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes case-study-ripple {
  from {
    opacity: 0.72;
    transform: scale(0.15);
  }
  to {
    opacity: 0;
    transform: scale(var(--ripple-scale, 5));
  }
}
@keyframes case-study-wave {
  from {
    transform: translate(-50%, -75%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}

@media (hover: hover) and (pointer: fine) {
  .case-study-view.has-custom-cursor,
  .case-study-view.has-custom-cursor :deep(a),
  .case-study-view.has-custom-cursor :deep(button) {
    cursor: none;
  }
  .case-study-view.has-custom-cursor .case-study-cursor {
    display: block;
  }
  .case-study-view.has-custom-cursor .case-study-spores {
    display: block;
  }
}

@media (max-width: 1180px) and (max-height: 720px) and (orientation: landscape) {
  .case-study-header {
    padding-block: 0.75rem;
  }
  .case-study-hero {
    grid-template-columns: 0.78fr 1.22fr;
    gap: 2rem;
    padding-block: 4.5rem 3rem;
  }
  .case-study-hero h1 {
    font-size: clamp(2.2rem, 5.5vw, 4.3rem);
  }
  .case-study-hero__lead {
    margin-block: 1rem;
    font-size: 0.78rem;
    line-height: 1.6;
  }
  .case-study-section {
    padding-block: clamp(5rem, 15vh, 7rem);
  }
  .case-study-section h2,
  .case-study-closing h2 {
    font-size: clamp(2.1rem, 5.2vw, 4rem);
  }
  .case-study-sticky {
    top: 4.25rem;
  }
  .case-study-overview__body {
    padding-top: 3rem;
  }
  .case-study-overview__body > p {
    font-size: 0.9rem;
    line-height: 1.7;
  }
  .case-study-comparison-grid article {
    min-height: 16rem;
  }
  .case-study-process__item {
    margin-block: 4rem;
  }
}

@media (max-width: 860px) {
  .case-study-back-to-top {
    width: 3.375rem;
  }
  .case-study-back-to-top::before {
    top: 0.41rem;
    left: 0.49rem;
    width: 0.79rem;
    height: 0.41rem;
  }
  .case-study-back-to-top::after {
    inset: 0.165rem;
  }
  .case-study-back-to-top__arrow {
    font-size: 0.79rem;
  }
  .case-study-back-to-top__arrow small {
    font-size: 0.44rem;
  }
  .case-study-bg-pattern {
    opacity: 0.66;
  }
  .case-study-bg-shape {
    width: 48vw;
  }
  .case-study-hero,
  .case-study-overview,
  .case-study-process__item {
    grid-template-columns: 1fr;
  }
  .case-study-process__item.is-media-right {
    grid-template-columns: 1fr;
  }
  .case-study-hero {
    gap: 3rem;
  }
  .case-study-sticky {
    position: static;
  }
  .case-study-overview__body {
    padding-top: 0;
  }
  .case-study-process__item.is-media-right .case-study-process__media {
    order: initial;
  }
  .case-study-comparison-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  .case-study-comparison-grid article {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    min-height: 0;
  }
  .case-study-before,
  .case-study-comparison-grid .case-study-after {
    grid-column: 1;
    grid-row: auto;
    margin: 0;
  }
  .case-study-before {
    width: 88%;
  }
  .case-study-comparison-grid .case-study-after {
    width: 92%;
    margin-left: auto;
  }
  .case-study-card-number {
    top: 50%;
    right: 0;
    left: auto;
    transform: translateY(-50%);
  }
}

@media (max-width: 600px) and (orientation: portrait) {
  .case-study-content,
  .case-study-header {
    display: none;
  }
  .case-study-orientation {
    display: grid;
    place-content: center;
    gap: 0.7rem;
    min-height: 100svh;
    padding: 2rem;
    text-align: center;
  }
  .case-study-orientation strong {
    font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: 400;
  }
  .case-study-orientation span {
    color: var(--case-muted);
    font-size: 0.78rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-study-view {
    scroll-behavior: auto;
  }
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .case-study-hero__visual::after {
    animation: none;
    transform: none;
  }
  .case-study-cursor {
    display: none !important;
  }
  .case-study-spores {
    display: none !important;
  }
  .case-study-hero__visual :deep(.case-study-ripple) {
    display: none;
  }
  .case-study-view {
    animation: none;
  }
  .case-study-back-to-top__wave::before,
  .case-study-back-to-top__wave::after {
    animation: none;
  }
}
</style>
