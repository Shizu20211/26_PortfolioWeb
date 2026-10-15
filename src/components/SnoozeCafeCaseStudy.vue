<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const props = defineProps({ artwork: { type: Object, required: true }, ready: Boolean })
const emit = defineEmits(['back'])
const { pick } = useLanguage()

const heroTarget = ref(null)
const heroImage = ref(null)
const isOpen = ref(false)
const activeIndex = ref(0)
const mobileIndex = ref(0)
const direction = ref('next')
const isTurning = ref(false)
const isPortraitMobile = ref(false)
let pointerStartX = 0
let turnTimer = 0
let portraitQuery

const pages = computed(() => [
  { id: 'introduction', kind: 'introduction' },
  ...props.artwork.menuSpreads.map((spread) => ({ ...spread, kind: 'menu' })),
  { id: 'process', kind: 'process' },
  { id: 'continuation', kind: 'continuation' },
])
const activePage = computed(() => pages.value[activeIndex.value])
const mobilePages = computed(() => [
  { spreadIndex: 0, side: 'left' },
  { spreadIndex: 0, side: 'right' },
  ...props.artwork.menuSpreads.map((_, index) => ({ spreadIndex: index + 1, side: 'full' })),
  { spreadIndex: pages.value.length - 2, side: 'left' },
  { spreadIndex: pages.value.length - 2, side: 'right' },
  { spreadIndex: pages.value.length - 1, side: 'left' },
  { spreadIndex: pages.value.length - 1, side: 'right' },
])
const mobileSide = computed(() => mobilePages.value[mobileIndex.value]?.side ?? 'left')
const displayIndex = computed(() =>
  isPortraitMobile.value ? mobileIndex.value : activeIndex.value,
)
const displayTotal = computed(() =>
  isPortraitMobile.value ? mobilePages.value.length : pages.value.length,
)

function openBook() {
  isOpen.value = true
}

function turnPage(offset) {
  if (isTurning.value) return
  const currentIndex = isPortraitMobile.value ? mobileIndex.value : activeIndex.value
  const total = isPortraitMobile.value ? mobilePages.value.length : pages.value.length
  const nextIndex = currentIndex + offset
  if (nextIndex < 0) {
    isOpen.value = false
    activeIndex.value = 0
    mobileIndex.value = 0
    return
  }
  if (nextIndex >= total) return
  direction.value = offset > 0 ? 'next' : 'previous'
  isTurning.value = true
  window.clearTimeout(turnTimer)
  turnTimer = window.setTimeout(() => {
    if (isPortraitMobile.value) {
      mobileIndex.value = nextIndex
      activeIndex.value = mobilePages.value[nextIndex].spreadIndex
    } else {
      activeIndex.value = nextIndex
    }
    isTurning.value = false
  }, 760)
}

function updatePortraitMode(event) {
  isPortraitMobile.value = event.matches
  if (event.matches) {
    const matchingIndex = mobilePages.value.findIndex(
      (page) => page.spreadIndex === activeIndex.value,
    )
    mobileIndex.value = Math.max(0, matchingIndex)
  } else {
    activeIndex.value = mobilePages.value[mobileIndex.value]?.spreadIndex ?? activeIndex.value
  }
}

function onPointerDown(event) {
  pointerStartX = event.clientX
}

function onPointerUp(event) {
  const distance = event.clientX - pointerStartX
  if (Math.abs(distance) >= 48) turnPage(distance > 0 ? -1 : 1)
}

function turnFromPage(event) {
  if (event.target.closest('button')) return
  const bounds = event.currentTarget.getBoundingClientRect()
  const position = (event.clientX - bounds.left) / bounds.width
  if (position <= 0.42) turnPage(-1)
  if (position >= 0.58) turnPage(1)
}

function onKeydown(event) {
  if (!isOpen.value && ['Enter', ' '].includes(event.key)) openBook()
  if (isOpen.value && event.key === 'ArrowLeft') turnPage(-1)
  if (isOpen.value && event.key === 'ArrowRight') turnPage(1)
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  portraitQuery = window.matchMedia('(max-width: 760px) and (orientation: portrait)')
  updatePortraitMode(portraitQuery)
  portraitQuery.addEventListener('change', updatePortraitMode)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  portraitQuery?.removeEventListener('change', updatePortraitMode)
  window.clearTimeout(turnTimer)
})

defineExpose({ heroTarget, heroImage })
</script>

<template>
  <main
    class="cafe-book-view"
    :class="[
      { 'is-ready': props.ready, 'is-open': isOpen, 'is-page-turning': isTurning },
      `is-turning-${direction}`,
    ]"
    :style="{ '--book-background': `url(${artwork.bookBackground.src})` }"
  >
    <button class="cafe-book-view__back" type="button" data-magnetic @click="emit('back')">
      ← {{ pick({ 'zh-Hant': '返回創作列表', en: 'Back to artworks', ja: '作品一覧へ戻る' }) }}
    </button>

    <div class="cafe-book-view__ambient" aria-hidden="true"></div>

    <section
      ref="heroTarget"
      class="cafe-book"
      :class="{ 'is-closed': !isOpen }"
      :aria-label="pick(artwork.title)"
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
    >
      <button v-if="!isOpen" class="cafe-book__cover" type="button" @click="openBook">
        <span
          class="cafe-book__paper"
          :style="{ backgroundImage: `url(${artwork.bookBackground.src})` }"
          aria-hidden="true"
        ></span>
        <img
          ref="heroImage"
          class="cafe-book__cover-logo"
          :src="artwork.coverLogo.src"
          :alt="pick(artwork.title)"
          :width="artwork.coverLogo.width"
          :height="artwork.coverLogo.height"
          fetchpriority="high"
        />
        <span class="cafe-book__cover-art">
          <img
            :src="artwork.coverArtwork.src"
            alt=""
            :width="artwork.coverArtwork.width"
            :height="artwork.coverArtwork.height"
          />
        </span>
        <span class="cafe-book__open-label">
          {{ pick({ 'zh-Hant': '翻開書頁', en: 'Open the book', ja: '本を開く' }) }}
        </span>
      </button>

      <div v-else class="cafe-book__spread" @click="turnFromPage">
        <article
          :key="activePage.id"
          class="cafe-book__page-content"
          :class="[
            isTurning ? `is-flipping-${direction}` : '',
            isPortraitMobile ? `is-mobile-single-page is-mobile-side-${mobileSide}` : '',
          ]"
        >
          <template v-if="activePage.kind === 'introduction'">
            <section class="cafe-book__leaf cafe-book__leaf--intro-image">
              <p class="chapter-label">{{ pick(artwork.type) }}</p>
              <div class="cafe-book__intro-group">
                <img
                  :src="artwork.introImage.src"
                  :alt="pick(artwork.title)"
                  :width="artwork.introImage.width"
                  :height="artwork.introImage.height"
                />
                <h1>{{ pick(artwork.title) }}</h1>
                <p>{{ pick(artwork.introduction.world) }}</p>
              </div>
            </section>
            <section class="cafe-book__leaf cafe-book__leaf--copy cafe-book__leaf--intro-copy">
              <p class="chapter-label">
                {{ pick({ 'zh-Hant': '引言', en: 'Introduction', ja: 'はじめに' }) }}
              </p>
              <h2>
                {{
                  pick({
                    'zh-Hant': '設計與版畫的融合',
                    en: 'Where Design Meets Printmaking',
                    ja: 'デザインと版画の融合',
                  })
                }}
              </h2>
              <img
                class="cafe-book__content-design"
                :src="artwork.contentDesign.src"
                alt=""
                :width="artwork.contentDesign.width"
                :height="artwork.contentDesign.height"
              />
              <p>{{ pick(artwork.introduction.design) }}</p>
            </section>
          </template>

          <template v-else-if="activePage.kind === 'menu'">
            <div class="cafe-book__full-spread" :class="`is-${activePage.id}`">
              <img
                :src="activePage.src"
                :alt="pick(activePage.title)"
                :width="activePage.width"
                :height="activePage.height"
                decoding="async"
              />
            </div>
          </template>

          <template v-else-if="activePage.kind === 'process'">
            <section class="cafe-book__leaf cafe-book__leaf--process-images">
              <figure v-for="image in artwork.process.images" :key="image.src">
                <img
                  :src="image.src"
                  alt=""
                  :width="image.width"
                  :height="image.height"
                  loading="lazy"
                />
              </figure>
            </section>
            <section class="cafe-book__leaf cafe-book__leaf--copy cafe-book__leaf--process-copy">
              <p class="chapter-label">
                {{ pick({ 'zh-Hant': '版畫製程', en: 'Print Process', ja: '版画制作' }) }}
              </p>
              <h2>
                {{
                  pick({
                    'zh-Hant': '色彩的調整與重疊',
                    en: 'Five to Six Layers of Colour',
                    ja: '五、六色の重ね刷り',
                  })
                }}
              </h2>
              <p>{{ pick(artwork.process.copy) }}</p>
              <dl>
                <div>
                  <dt>{{ pick({ 'zh-Hant': '技法', en: 'Technique', ja: '技法' }) }}</dt>
                  <dd>
                    {{
                      pick({
                        'zh-Hant': '木版多色套印',
                        en: 'Multi-colour woodblock print',
                        ja: '木版多色刷り',
                      })
                    }}
                  </dd>
                </div>
                <div>
                  <dt>{{ pick({ 'zh-Hant': '形式', en: 'Format', ja: '形態' }) }}</dt>
                  <dd>
                    {{ pick({ 'zh-Hant': '手工製本', en: 'Hand-bound book', ja: '手製本' }) }}
                  </dd>
                </div>
              </dl>
            </section>
          </template>

          <template v-else>
            <section class="cafe-book__leaf cafe-book__leaf--continuation-image">
              <img
                :src="artwork.continuation.image.src"
                :alt="pick(artwork.continuation.workTitle)"
                :width="artwork.continuation.image.width"
                :height="artwork.continuation.image.height"
              />
            </section>
            <section class="cafe-book__leaf cafe-book__leaf--copy cafe-book__leaf--colophon">
              <p class="chapter-label">
                {{ pick({ 'zh-Hant': '尾頁', en: 'Epilogue', ja: '終章' }) }}
              </p>
              <h2>{{ pick(artwork.continuation.title) }}</h2>
              <p>{{ pick(artwork.continuation.copy) }}</p>
              <dl>
                <div>
                  <dt>{{ pick({ 'zh-Hant': '作品', en: 'Work', ja: '作品' }) }}</dt>
                  <dd>{{ pick(artwork.continuation.workTitle) }}</dd>
                </div>
                <div>
                  <dt>{{ pick({ 'zh-Hant': '技法', en: 'Technique', ja: '技法' }) }}</dt>
                  <dd>{{ pick(artwork.continuation.technique) }}</dd>
                </div>
                <div>
                  <dt>{{ pick({ 'zh-Hant': '尺寸', en: 'Size', ja: 'サイズ' }) }}</dt>
                  <dd>{{ artwork.continuation.size }}</dd>
                </div>
                <div>
                  <dt>{{ pick({ 'zh-Hant': '年份', en: 'Year', ja: '制作年' }) }}</dt>
                  <dd>{{ artwork.continuation.year }}</dd>
                </div>
              </dl>
            </section>
          </template>
        </article>

        <span class="cafe-book__gutter" aria-hidden="true"></span>
        <span class="cafe-book__page-shadow" aria-hidden="true"></span>
      </div>
    </section>

    <nav v-if="isOpen" class="cafe-book__navigation" :aria-label="pick(artwork.title)">
      <button
        type="button"
        :disabled="isTurning"
        :aria-label="pick({ 'zh-Hant': '上一頁', en: 'Previous page', ja: '前のページ' })"
        @click="turnPage(-1)"
      >
        ←
      </button>
      <span
        >{{ String(displayIndex + 1).padStart(2, '0') }} /
        {{ String(displayTotal).padStart(2, '0') }}</span
      >
      <button
        type="button"
        :disabled="isTurning || displayIndex === displayTotal - 1"
        :aria-label="pick({ 'zh-Hant': '下一頁', en: 'Next page', ja: '次のページ' })"
        @click="turnPage(1)"
      >
        →
      </button>
    </nav>
  </main>
</template>

<style scoped>
.cafe-book-view {
  --cafe-ink: #17456a;
  --cafe-accent: #d86525;
  position: relative;
  display: grid;
  width: 100%;
  height: 100svh;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 28%, rgb(255 249 235 / 20%), transparent 38%),
    linear-gradient(145deg, #25394a, #142a3d 58%, #0c2032);
  color: var(--cafe-ink);
  opacity: 0;
  transition: opacity 640ms var(--ease-standard);
  place-items: center;
}
.cafe-book-view.is-ready {
  opacity: 1;
}
.cafe-book-view__ambient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgb(4 13 21 / 40%), transparent 22% 78%, rgb(4 13 21 / 40%)),
    radial-gradient(ellipse at 50% 100%, rgb(0 0 0 / 42%), transparent 55%),
    var(--book-background) center / cover;
  background-blend-mode: normal, normal, soft-light;
  opacity: 0.72;
}
.cafe-book-view__ambient::after {
  position: absolute;
  inset: 0;
  content: '';
  background: rgba(34, 15, 7, 0.546);
}
.cafe-book-view__back {
  position: fixed;
  z-index: 10;
  top: 1.5rem;
  left: var(--page-pad);
  padding: 0;
  border: 0;
  border-bottom: 1px solid currentColor;
  background: transparent;
  color: #f5ecdd;
  font-family: var(--font-label);
  font-size: 0.72rem;
  cursor: pointer;
}
.cafe-book {
  position: relative;
  z-index: 2;
  width: min(88vw, calc(78svh * 2.02), 94rem);
  aspect-ratio: 2.02;
  filter: drop-shadow(0 2rem 3.5rem rgb(0 0 0 / 38%));
  perspective: 120rem;
  transition:
    width 800ms var(--ease-soft),
    aspect-ratio 800ms var(--ease-soft);
}
.cafe-book.is-closed {
  width: min(31vw, calc(78svh * 0.7), 32rem);
  aspect-ratio: 0.7;
}
.cafe-book__cover {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  padding: clamp(1.1rem, 3.5vw, 2.6rem);
  overflow: hidden;
  border: clamp(0.2rem, 0.4vw, 0.38rem) double var(--cafe-ink);
  border-radius: clamp(0.8rem, 2.2vw, 1.8rem);
  background: #efe1d4;
  box-shadow:
    inset 0 0 0 0.45rem rgb(255 255 255 / 35%),
    inset -1rem 0 2rem rgb(70 49 37 / 10%);
  color: var(--cafe-ink);
  cursor: pointer;
  grid-template-rows: 0.82fr 3fr auto;
  place-items: center;
}
.cafe-book__paper {
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
  mix-blend-mode: multiply;
  opacity: 0.13;
  pointer-events: none;
}
.cafe-book__cover-logo {
  z-index: 1;
  width: 86%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  margin-bottom: 1rem;
}
.cafe-book__cover-art {
  z-index: 1;
  display: grid;
  width: 83%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  border: 0;
  background: #e5d9cb;
  place-items: center;
}
.cafe-book__cover-art img {
  position: relative;
  top: -10px;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.cafe-book__open-label {
  z-index: 1;
  align-self: end;
  padding-top: 0.35rem;
  font-family: var(--font-label);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
}
.cafe-book__spread,
.cafe-book__page-content {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.cafe-book__spread {
  overflow: hidden;
  border-radius: 0.35rem 0.8rem 0.8rem 0.35rem;
  background: #eee6d9;
  box-shadow:
    inset 0 0 1.5rem rgb(69 48 35 / 16%),
    0 0 0 1px rgb(255 255 255 / 25%);
  transform-style: preserve-3d;
}
.cafe-book__page-content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  transform-style: preserve-3d;
}
.cafe-book__leaf {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: #f1eadf;
}
.cafe-book__leaf:nth-child(odd) {
  box-shadow: inset -1.4rem 0 2rem -1.6rem rgb(61 42 31 / 42%);
}
.cafe-book__leaf:nth-child(even) {
  box-shadow: inset 1.4rem 0 2rem -1.6rem rgb(61 42 31 / 42%);
}
.cafe-book__intro-group img {
  display: block;
  width: min(72%, 40rem);
  height: auto;
  max-height: 55%;
  margin-inline: auto;
  object-fit: contain;
}
.cafe-book__leaf--intro-image {
  display: flex;
  flex-direction: column;
  padding: clamp(1rem, 2.8vw, 2.8rem);
  text-align: center;
  min-height: 0;
}
.cafe-book__leaf--intro-image .chapter-label {
  justify-self: start;
  margin: 0;
}
.cafe-book__intro-group {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  gap: clamp(0.35rem, 0.8vw, 0.75rem);
}
.cafe-book__intro-group h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.92vw, 2.28rem);
  font-weight: 400;
  line-height: 1;
}
.cafe-book__intro-group > p:last-child,
.cafe-book__leaf--copy > p:last-of-type {
  max-width: 32rem;
  margin: 0 auto;
  font-size: clamp(0.66rem, 1.05vw, 1rem);
  line-height: 1.75;
}
.cafe-book__leaf--copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2rem, 5vw, 6rem);
  isolation: isolate;
}
.cafe-book__leaf--copy h2 {
  margin: 0.45rem 0 1.4rem;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.92vw, 2.4rem);
  font-weight: 400;
  line-height: 1.08;
}
.cafe-book__full-spread {
  position: relative;
  grid-column: 1 / -1;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  border: 0;
  background: #eee8dd;
  cursor: pointer;
}
.cafe-book__full-spread img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 500ms var(--ease-standard);
}
.cafe-book__full-spread.is-kohakucha img {
  transform: translateX(1.5%) scale(1.055);
}
.cafe-book__full-spread.is-lemon-tart img {
  transform: translateX(-1.35%) scale(1.045);
}
.cafe-book__leaf--intro-copy {
  gap: clamp(0.45rem, 1vw, 0.9rem);
  padding-block: clamp(1.2rem, 3vw, 3rem);
}
.cafe-book__leaf--intro-copy h2 {
  margin-bottom: 0;
}
.cafe-book__content-design {
  display: block;
  width: min(100%, 34rem);
  height: auto;
  max-height: 42%;
  margin-inline: auto;
  object-fit: contain;
}
.cafe-book__leaf--process-images {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(0.5rem, 1.2vw, 1.2rem);
  padding: clamp(1.2rem, 3vw, 3rem);
  place-items: center;
}
.cafe-book__leaf--process-images figure {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: transparent;
}
.cafe-book__leaf--process-images img,
.cafe-book__leaf--continuation-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.cafe-book__leaf--continuation-image {
  padding: clamp(1rem, 2vw, 2rem);
}
.cafe-book__leaf--process-copy dl,
.cafe-book__leaf--colophon dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin: 1.5rem 0 0;
  padding-top: 1rem;
  border-top: 1px solid rgb(23 69 106 / 24%);
}
.cafe-book__leaf--process-copy dt,
.cafe-book__leaf--colophon dt {
  font-family: var(--font-label);
  font-size: 0.6rem;
}
.cafe-book__leaf--process-copy dd,
.cafe-book__leaf--colophon dd {
  margin: 0.35rem 0 0;
  font-size: 0.75rem;
}
.cafe-book__gutter {
  position: absolute;
  z-index: 4;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1.6rem;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent,
    rgb(65 43 29 / 18%),
    rgb(255 255 255 / 24%),
    transparent
  );
  transform: translateX(-50%);
}
.cafe-book__page-shadow {
  position: absolute;
  z-index: 5;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 12%;
  pointer-events: none;
  background: linear-gradient(90deg, rgb(46 30 20 / 20%), transparent);
  opacity: 0.28;
  transform-origin: left center;
}
.cafe-book__navigation {
  position: fixed;
  z-index: 8;
  bottom: 1rem;
  left: 50%;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.4rem 0.55rem;
  border: 1px solid rgb(255 255 255 / 28%);
  border-radius: 100vh;
  background: rgb(7 22 34 / 56%);
  color: #f5ecdd;
  font-family: var(--font-label);
  font-size: 0.62rem;
  transform: translateX(-50%);
  backdrop-filter: blur(12px);
}
.cafe-book__navigation button {
  display: grid;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 28%);
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  place-items: center;
}
.cafe-book__navigation button:disabled {
  opacity: 0.24;
  cursor: default;
}
.cafe-book__page-content.is-flipping-next,
.cafe-book__page-content.is-flipping-previous {
  z-index: 2;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  pointer-events: none;
}
.cafe-book__page-content.is-flipping-next {
  animation: cafe-page-next 760ms cubic-bezier(0.645, 0.045, 0.355, 1) both;
}
.cafe-book__page-content.is-flipping-previous {
  animation: cafe-page-previous 760ms cubic-bezier(0.645, 0.045, 0.355, 1) both;
}
.cafe-book__page-content.is-flipping-next::after,
.cafe-book__page-content.is-flipping-previous::after {
  position: absolute;
  z-index: 8;
  inset: 0;
  content: '';
  pointer-events: none;
  animation: cafe-page-shadow 760ms ease-in-out both;
  background: linear-gradient(90deg, transparent 35%, rgb(40 26 18 / 38%), rgb(255 255 255 / 14%));
}
@keyframes cafe-page-next {
  0% {
    clip-path: inset(0 0 0 50%);
    filter: brightness(1);
    transform: perspective(120rem) rotateY(0);
    transform-origin: 50% center;
  }
  100% {
    clip-path: inset(0 0 0 50%);
    filter: brightness(0.68);
    transform: perspective(120rem) rotateY(-178deg);
    transform-origin: 50% center;
  }
}
@keyframes cafe-page-previous {
  0% {
    clip-path: inset(0 50% 0 0);
    filter: brightness(1);
    transform: perspective(120rem) rotateY(0);
    transform-origin: 50% center;
  }
  100% {
    clip-path: inset(0 50% 0 0);
    filter: brightness(0.68);
    transform: perspective(120rem) rotateY(178deg);
    transform-origin: 50% center;
  }
}
@keyframes cafe-page-shadow {
  0%,
  100% {
    opacity: 0;
  }
  48% {
    opacity: 0.82;
  }
}
@media (max-width: 1180px) and (max-height: 720px) and (orientation: landscape) {
  .cafe-book-view {
    height: 100dvh;
  }
  .cafe-book {
    width: min(calc(100vw - 1rem), calc((100dvh - 1rem) * 2.02));
  }
  .cafe-book.is-closed {
    width: min(29vw, calc((100dvh - 1rem) * 0.7));
  }
  .cafe-book__leaf--copy {
    padding: clamp(1.2rem, 3.4vw, 3rem);
  }
  .cafe-book__navigation {
    right: 1rem;
    bottom: 0.7rem;
    left: auto;
    transform: none;
  }
}

@media (max-width: 760px) and (orientation: portrait) {
  .cafe-book-view {
    display: block;
    height: calc(100dvh + 1px);
    min-height: calc(100dvh + 1px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .cafe-book {
    position: absolute;
    top: max(0.5rem, env(safe-area-inset-top));
    right: max(0.5rem, env(safe-area-inset-right));
    bottom: max(0.5rem, env(safe-area-inset-bottom));
    left: max(0.5rem, env(safe-area-inset-left));
    width: auto;
    height: auto;
    aspect-ratio: auto;
  }
  .cafe-book.is-closed {
    top: 50%;
    right: auto;
    bottom: auto;
    left: 50%;
    width: min(calc(100vw - 3rem), 24rem);
    height: auto;
    aspect-ratio: 0.7;
    transform: translate(-50%, -50%);
  }
  .cafe-book__page-content.is-mobile-single-page {
    display: block;
  }
  .cafe-book__page-content.is-mobile-single-page .cafe-book__leaf {
    position: absolute;
    inset: 0;
    display: none;
    clip-path: none;
    box-shadow: none;
  }
  .cafe-book__page-content.is-mobile-side-left .cafe-book__leaf:first-child,
  .cafe-book__page-content.is-mobile-side-right .cafe-book__leaf:nth-child(2) {
    display: flex;
  }
  .cafe-book__page-content.is-mobile-side-left .cafe-book__leaf--process-images {
    display: grid;
  }
  .cafe-book__page-content.is-mobile-side-full .cafe-book__full-spread {
    position: absolute;
    inset: 0;
    display: block;
  }
  .cafe-book__full-spread img {
    object-fit: contain;
  }
  .cafe-book__gutter {
    display: none;
  }
  .cafe-book__page-shadow {
    display: none;
  }
  .cafe-book__page-content.is-mobile-single-page.is-flipping-next {
    animation-name: cafe-mobile-page-next;
  }
  .cafe-book__page-content.is-mobile-single-page.is-flipping-previous {
    animation-name: cafe-mobile-page-previous;
  }
  .cafe-book__leaf--intro-image h1 {
    font-size: clamp(0.96rem, 4.8vw, 1.56rem);
  }
  .cafe-book__leaf--intro-image > p:last-child,
  .cafe-book__leaf--copy > p:last-of-type {
    font-size: clamp(0.58rem, 2.3vw, 0.72rem);
    line-height: 1.55;
  }
  .cafe-book__leaf--copy {
    padding: 1.25rem;
  }
  .cafe-book__leaf--copy h2 {
    margin-bottom: 0.75rem;
    font-size: clamp(0.75rem, 3.3vw, 1.08rem);
  }
  .cafe-book__navigation {
    bottom: max(0.75rem, env(safe-area-inset-bottom));
  }
  .cafe-book-view__back {
    top: max(1rem, env(safe-area-inset-top));
    left: max(1rem, env(safe-area-inset-left));
  }
}

@keyframes cafe-mobile-page-next {
  0% {
    opacity: 1;
    filter: brightness(1);
    clip-path: none;
    transform: perspective(80rem) rotateY(0) translateX(0);
    transform-origin: left center;
  }
  100% {
    opacity: 0;
    filter: brightness(0.72);
    clip-path: none;
    transform: perspective(80rem) rotateY(-22deg) translateX(-8%);
    transform-origin: left center;
  }
}

@keyframes cafe-mobile-page-previous {
  0% {
    opacity: 1;
    filter: brightness(1);
    clip-path: none;
    transform: perspective(80rem) rotateY(0) translateX(0);
    transform-origin: right center;
  }
  100% {
    opacity: 0;
    filter: brightness(0.72);
    clip-path: none;
    transform: perspective(80rem) rotateY(22deg) translateX(8%);
    transform-origin: right center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cafe-book,
  .cafe-book-view,
  .cafe-book__page-content.is-flipping-next,
  .cafe-book__page-content.is-flipping-previous {
    animation-duration: 1ms;
  }
}
</style>
