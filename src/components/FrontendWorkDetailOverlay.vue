<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useLanguage } from '@/composables/useLanguage'
import { useFrontendWorkTransition } from '@/composables/useFrontendWorkTransition'
import FrontendWorkGallery from '@/components/FrontendWorkGallery.vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({
  work: { type: Object, required: true },
  number: { type: String, required: true },
  sourceElement: { type: Object, default: null },
})
const emit = defineEmits(['closed', 'request-close'])

const { pick, t } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const overlay = ref(null)
const imageTarget = ref(null)
const content = ref(null)
const closeButton = ref(null)
const isTransitioning = ref(true)
const mediaReady = ref(false)
let disposed = false
let closePending = false
const { createTransitionLayer, fitTo, removeTransitionLayer } = useFrontendWorkTransition()

async function enterDetail() {
  await nextTick()
  if (disposed) return
  document.body.classList.add('frontend-work-detail-open')
  gsap.set(content.value, { opacity: 0, y: 24 })

  if (!prefersReducedMotion.value && props.sourceElement) {
    createTransitionLayer(props.sourceElement)
    gsap.set(props.sourceElement, { opacity: 0 })
    await fitTo(imageTarget.value, { duration: 1.05 })
    if (disposed) return
  }

  mediaReady.value = true
  await nextTick()
  if (disposed) return
  removeTransitionLayer()

  await gsap.to(content.value, {
    opacity: 1,
    y: 0,
    duration: prefersReducedMotion.value ? 0 : 0.55,
    ease: 'power3.out',
  })
  if (disposed) return
  isTransitioning.value = false
  if (closePending) {
    closePending = false
    closeDetail()
    return
  }
  closeButton.value?.focus()
}

async function closeDetail() {
  if (isTransitioning.value) {
    closePending = true
    return
  }
  isTransitioning.value = true

  try {
    await gsap.to(content.value, {
      opacity: 0,
      y: 18,
      duration: prefersReducedMotion.value ? 0 : 0.25,
      ease: 'power2.in',
    })

    const canReturn = props.sourceElement?.isConnected
    if (!prefersReducedMotion.value && canReturn) {
      createTransitionLayer(props.sourceElement)
      await fitTo(imageTarget.value, { duration: 0 })
      mediaReady.value = false
    }
    if (!prefersReducedMotion.value && canReturn) {
      await fitTo(props.sourceElement, { duration: 0.9 })
    }
  } finally {
    if (props.sourceElement?.isConnected) gsap.set(props.sourceElement, { opacity: 1 })
    removeTransitionLayer()
    document.body.classList.remove('frontend-work-detail-open')
    emit('closed')
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    emit('request-close')
    return
  }
  if (event.key !== 'Tab' || !overlay.value) return

  const focusable = [
    ...overlay.value.querySelectorAll('a[href], button:not(:disabled), [tabindex="0"]'),
  ].filter(
    (element) =>
      element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden',
  )
  const priority = (element) =>
    element === closeButton.value
      ? 0
      : element.classList.contains('frontend-work-detail__website')
        ? 1
        : element.classList.contains('frontend-work-detail__scroll')
          ? 3
          : 2
  focusable.sort((a, b) => priority(a) - priority(b))
  if (!focusable.length) return
  const current = focusable.indexOf(document.activeElement)
  const next =
    current < 0 ? 0 : (current + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length
  event.preventDefault()
  focusable[next].focus()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  enterDetail()
})

onBeforeUnmount(() => {
  disposed = true
  gsap.killTweensOf(content.value)
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('frontend-work-detail-open')
  if (props.sourceElement?.isConnected) gsap.set(props.sourceElement, { opacity: 1 })
  removeTransitionLayer()
})

defineExpose({ closeDetail })
</script>

<template>
  <Teleport to="body">
    <div
      ref="overlay"
      class="frontend-work-detail is-active"
      :class="{ 'is-design-prototype': work.slug === 'marathon-redesign' }"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`frontend-work-detail-${work.slug}`"
    >
      <button
        ref="closeButton"
        class="frontend-work-detail__close frontend-detail-link"
        type="button"
        :aria-label="t('closeProject')"
        :disabled="isTransitioning"
        @click="emit('request-close')"
      >
        <span class="frontend-detail-link__label">{{ t('back') }}</span>
      </button>
      <section class="frontend-work-detail__media">
        <div ref="imageTarget" class="frontend-work-detail__image-target">
          <FrontendWorkGallery :work="work" :ready="mediaReady" />
        </div>
      </section>
      <section class="frontend-work-detail__content">
        <div ref="content" class="frontend-work-detail__inner">
          <header class="frontend-work-detail__header">
            <span class="frontend-work-detail__number">{{ number }}</span>
            <div class="frontend-work-detail__title-row">
              <h2 :id="`frontend-work-detail-${work.slug}`" class="frontend-work-detail__title">
                {{ pick(work.title) }}
              </h2>
              <a
                v-if="work.demoUrl"
                class="frontend-work-detail__website frontend-detail-link"
                :href="work.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`${t('viewWebsite')} · ${pick(work.title)} (${t('opensNewTab')})`"
                ><span class="frontend-detail-link__label"
                  >{{ t('viewWebsite') }} <span aria-hidden="true">↗</span></span
                ></a
              >
            </div>
            <p class="frontend-work-detail__category">{{ work.tags.map(pick).join(' · ') }}</p>
          </header>
          <div
            class="frontend-work-detail__scroll"
            data-vertical-scroll
            tabindex="0"
            role="region"
            :aria-label="`${pick(work.title)} · ${t('projectDetails')}`"
          >
            <section class="frontend-work-detail__section">
              <h3>{{ t('projectOverview') }}</h3>
              <p class="frontend-work-detail__description">{{ pick(work.summary) }}</p>
            </section>
            <dl
              v-if="work.tools?.length && !work.tools.some((tool) => tool.includes('待補'))"
              class="frontend-work-detail__meta"
            >
              <div>
                <dt>{{ t('toolsLabel') }}</dt>
                <dd>{{ work.tools.join(' / ') }}</dd>
              </div>
            </dl>
            <section v-if="work.details" class="frontend-work-detail__section">
              <h3>{{ t('projectDetails') }}</h3>
              <p class="frontend-work-detail__description">{{ pick(work.details) }}</p>
            </section>
            <p
              v-if="work.imageNotice"
              class="frontend-work-detail__description frontend-work-detail__notice"
            >
              {{ pick(work.imageNotice) }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </Teleport>
</template>
