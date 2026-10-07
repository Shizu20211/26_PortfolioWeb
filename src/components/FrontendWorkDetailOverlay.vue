<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useLanguage } from '@/composables/useLanguage'
import { useFrontendWorkTransition } from '@/composables/useFrontendWorkTransition'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({
  work: { type: Object, required: true },
  number: { type: String, required: true },
  sourceElement: { type: Object, default: null },
})
const emit = defineEmits(['closed'])

const { pick, t } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const overlay = ref(null)
const imageTarget = ref(null)
const content = ref(null)
const closeButton = ref(null)
const isTransitioning = ref(true)
const { createTransitionLayer, fitTo, removeTransitionLayer, getTransitionLayer } =
  useFrontendWorkTransition()

async function enterDetail() {
  await nextTick()
  document.body.classList.add('frontend-work-detail-open')
  gsap.set(content.value, { opacity: 0, y: 24 })

  if (!prefersReducedMotion.value && props.sourceElement) {
    createTransitionLayer(props.sourceElement)
    gsap.set(props.sourceElement, { opacity: 0 })
    await fitTo(imageTarget.value, { duration: 1.05 })
  }

  await gsap.to(content.value, {
    opacity: 1,
    y: 0,
    duration: prefersReducedMotion.value ? 0 : 0.55,
    ease: 'power3.out',
  })
  isTransitioning.value = false
  closeButton.value?.focus()
}

async function closeDetail() {
  if (isTransitioning.value) return
  isTransitioning.value = true

  await gsap.to(content.value, {
    opacity: 0,
    y: 18,
    duration: prefersReducedMotion.value ? 0 : 0.25,
    ease: 'power2.in',
  })

  const canReturn = props.sourceElement?.isConnected && getTransitionLayer()
  if (!prefersReducedMotion.value && canReturn) {
    await fitTo(props.sourceElement, { duration: 0.9 })
  }

  if (props.sourceElement?.isConnected) gsap.set(props.sourceElement, { opacity: 1 })
  removeTransitionLayer()
  document.body.classList.remove('frontend-work-detail-open')
  emit('closed')
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeDetail()
    return
  }
  if (event.key !== 'Tab' || !overlay.value) return

  const focusable = [...overlay.value.querySelectorAll('a[href], button:not(:disabled)')]
  const first = focusable[0]
  const last = focusable.at(-1)
  if (!first || !last) return

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  enterDetail()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('frontend-work-detail-open')
  if (props.sourceElement?.isConnected) gsap.set(props.sourceElement, { opacity: 1 })
  removeTransitionLayer()
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="overlay"
      class="frontend-work-detail is-active"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`frontend-work-detail-${work.slug}`"
    >
      <section class="frontend-work-detail__media" aria-hidden="true">
        <div ref="imageTarget" class="frontend-work-detail__image-target">
          <img
            v-if="work.media?.type === 'image'"
            class="frontend-work-detail__target-visual"
            :class="{ 'is-visible': prefersReducedMotion || !sourceElement }"
            :src="work.media.src"
            alt=""
          />
          <div
            v-else
            class="frontend-work-detail__target-visual frontend-work-detail__target-placeholder"
            :class="{ 'is-visible': prefersReducedMotion || !sourceElement }"
          >
            {{ t('imageNeeded') }}
          </div>
        </div>
      </section>
      <section class="frontend-work-detail__content">
        <div ref="content" class="frontend-work-detail__inner">
          <span class="frontend-work-detail__number">{{ number }}</span>
          <h2 :id="`frontend-work-detail-${work.slug}`" class="frontend-work-detail__title">
            {{ pick(work.title) }}
          </h2>
          <p class="frontend-work-detail__category">{{ work.tags.join(' · ') }}</p>
          <section class="frontend-work-detail__section">
            <h3>{{ t('projectOverview') }}</h3>
            <p class="frontend-work-detail__description">{{ pick(work.summary) }}</p>
          </section>
          <dl class="frontend-work-detail__meta">
            <div>
              <dt>{{ t('roleLabel') }}</dt>
              <dd>{{ pick(work.role) }}</dd>
            </div>
            <div>
              <dt>{{ t('toolsLabel') }}</dt>
              <dd>{{ work.tools.join(' / ') }}</dd>
            </div>
            <div>
              <dt>{{ t('statusLabel') }}</dt>
              <dd>{{ t('comingSoon') }}</dd>
            </div>
          </dl>
          <section class="frontend-work-detail__section">
            <h3>{{ t('projectDetails') }}</h3>
            <p class="frontend-work-detail__description">{{ t('projectDetailsPending') }}</p>
          </section>
        </div>
      </section>
      <button
        ref="closeButton"
        class="frontend-work-detail__close"
        type="button"
        data-magnetic
        :aria-label="t('closeProject')"
        :disabled="isTransitioning"
        @click="closeDetail"
      >
        {{ t('back') }}
      </button>
    </div>
  </Teleport>
</template>
