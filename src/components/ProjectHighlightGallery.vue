<script setup>
import { ref } from 'vue'
import LazyCaseStudyMedia from '@/components/LazyCaseStudyMedia.vue'
import { useLanguage } from '@/composables/useLanguage'

defineProps({ items: { type: Array, required: true } })
const activeIndex = ref(0)
const { pick, t } = useLanguage()

function select(index) {
  activeIndex.value = index
}

function onKeydown(event, index, length) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  if (event.key === 'Home') return select(0)
  if (event.key === 'End') return select(length - 1)
  select((index + (event.key === 'ArrowRight' ? 1 : -1) + length) % length)
}
</script>

<template>
  <div class="case-study-gallery" role="list">
    <article
      v-for="(item, index) in items"
      :key="item.key"
      class="case-study-gallery__item"
      :class="{ 'is-active': activeIndex === index }"
      role="listitem"
      @mouseenter="select(index)"
    >
      <button
        class="case-study-gallery__toggle"
        type="button"
        :aria-expanded="activeIndex === index"
        @focus="select(index)"
        @click="select(index)"
        @keydown="onKeydown($event, index, items.length)"
      >
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ pick(item.title) }}</strong>
      </button>

      <div class="case-study-gallery__body">
        <LazyCaseStudyMedia :media="item.media" :enabled="activeIndex === index" />
        <div class="case-study-gallery__copy">
          <div>
            <h3>{{ pick(item.title) }}</h3>
            <p>{{ pick(item.description) }}</p>
          </div>
          <div class="case-study-gallery__contribution">
            <small>{{ t('myContribution') }}</small>
            <span>{{ pick(item.contribution).join(' · ') }}</span>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.case-study-gallery {
  display: flex;
  height: clamp(22rem, 54vh, 34rem);
  overflow: hidden;
  border: 1px solid var(--case-line);
  border-radius: var(--radius-md);
}
.case-study-gallery__item {
  position: relative;
  flex: 0.55 1 0;
  min-width: 0;
  overflow: hidden;
  border-right: 1px solid var(--case-line);
  background: var(--case-panel);
  transition:
    flex 700ms var(--ease-soft),
    background-color 300ms var(--ease-standard);
}
.case-study-gallery__item:last-child {
  border-right: 0;
}
.case-study-gallery__item.is-active {
  flex: 4.6 1 0;
  background: linear-gradient(150deg, rgb(145 203 200 / 12%), rgb(83 130 142 / 6%));
}
.case-study-gallery__toggle {
  position: absolute;
  z-index: 3;
  inset: 0 auto 0 0;
  display: flex;
  width: 4rem;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 0;
  background: transparent;
  color: var(--case-ink);
  cursor: pointer;
  font-family: var(--font-label);
  writing-mode: vertical-rl;
}
.case-study-gallery__toggle strong {
  overflow: hidden;
  max-height: 0;
  font-family: var(--case-display);
  font-size: 1rem;
  font-weight: 400;
  opacity: 0;
  transition:
    max-height 500ms var(--ease-soft),
    opacity 300ms var(--ease-standard);
}
.case-study-gallery__item:not(.is-active) .case-study-gallery__toggle strong {
  max-height: 15rem;
  opacity: 0.72;
}
.case-study-gallery__body {
  position: relative;
  display: block;
  width: calc(100% - 4rem);
  height: 100%;
  margin-left: 4rem;
  opacity: 0;
  transform: translateX(-1rem);
  transition:
    opacity 350ms var(--ease-standard),
    transform 550ms var(--ease-soft);
}
.case-study-gallery__body::after {
  position: absolute;
  z-index: 1;
  inset: 28% 0 0;
  background: linear-gradient(transparent, rgb(12 24 39 / 86%));
  content: '';
  pointer-events: none;
}
.case-study-gallery__item.is-active .case-study-gallery__body {
  opacity: 1;
  transform: none;
}
.case-study-gallery__body :deep(.case-study-media) {
  position: absolute;
  inset: 0;
  min-height: 0;
}
.case-study-gallery__body :deep(.case-study-media video),
.case-study-gallery__body :deep(.case-study-media img) {
  object-fit: cover;
}
.case-study-gallery__copy {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 2rem;
  padding: clamp(1rem, 2.2vw, 1.75rem);
}
.case-study-gallery__copy p {
  max-width: 38rem;
  margin: 0;
  color: var(--case-muted);
  line-height: 1.7;
}
.case-study-gallery__copy h3 {
  margin: 0 0 0.55rem;
  font-family: var(--case-display);
  font-size: clamp(1.35rem, 2.4vw, 2.5rem);
  font-weight: 400;
}
.case-study-gallery__contribution {
  display: grid;
  max-width: 18rem;
  gap: 0.45rem;
  text-align: right;
}
.case-study-gallery__contribution small {
  color: var(--case-accent);
  font-family: var(--font-label);
  font-size: 0.55rem;
  letter-spacing: 0.12em;
}
.case-study-gallery__contribution span {
  color: var(--case-muted);
  font-size: 0.68rem;
  line-height: 1.5;
}
@media (max-width: 1180px) and (max-height: 720px) and (orientation: landscape) {
  .case-study-gallery {
    height: clamp(20rem, 72vh, 28rem);
  }
  .case-study-gallery__copy {
    padding: 1rem 1.25rem;
  }
  .case-study-gallery__copy p {
    font-size: 0.72rem;
  }
  .case-study-gallery__copy h3 {
    font-size: 1.2rem;
  }
}
@media (max-width: 860px) {
  .case-study-gallery {
    display: grid;
    height: auto;
  }
  .case-study-gallery__item,
  .case-study-gallery__item.is-active {
    width: 100%;
    border-right: 0;
    border-bottom: 1px solid var(--case-line);
  }
  .case-study-gallery__item:last-child {
    border-bottom: 0;
  }
  .case-study-gallery__item {
    min-height: 3.75rem;
  }
  .case-study-gallery__item.is-active {
    min-height: clamp(18rem, 70vh, 24rem);
  }
  .case-study-gallery__toggle {
    inset: 0 0 auto;
    width: 100%;
    height: 3.75rem;
    justify-content: space-between;
    writing-mode: initial;
  }
  .case-study-gallery__toggle strong,
  .case-study-gallery__item:not(.is-active) .case-study-gallery__toggle strong {
    max-width: calc(100% - 3rem);
    max-height: none;
    overflow: hidden;
    opacity: 0.78;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .case-study-gallery__body {
    width: 100%;
    height: calc(100% - 3.75rem);
    margin: 3.75rem 0 0;
  }
  .case-study-gallery__body::after {
    inset-block-start: 20%;
  }
  .case-study-gallery__copy {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    padding: 1rem;
  }
  .case-study-gallery__copy h3 {
    font-size: clamp(1.15rem, 4vw, 1.6rem);
  }
  .case-study-gallery__contribution {
    max-width: none;
    text-align: left;
  }
}
@media (prefers-reduced-motion: reduce) {
  .case-study-gallery__item,
  .case-study-gallery__toggle strong,
  .case-study-gallery__body {
    transition: none;
  }
}
</style>
