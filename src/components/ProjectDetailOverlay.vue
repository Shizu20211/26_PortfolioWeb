<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useLanguage } from '@/composables/useLanguage'
import { useProjectTransition } from '@/composables/useProjectTransition'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({
  project: { type: Object, required: true },
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
  useProjectTransition()

async function enterDetail() {
  await nextTick()
  document.body.classList.add('project-detail-open')
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
  document.body.classList.remove('project-detail-open')
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
  document.body.classList.remove('project-detail-open')
  if (props.sourceElement?.isConnected) gsap.set(props.sourceElement, { opacity: 1 })
  removeTransitionLayer()
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="overlay"
      class="project-detail is-active"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`project-detail-${project.slug}`"
    >
      <section class="project-detail__media" aria-hidden="true">
        <div ref="imageTarget" class="project-detail__image-target">
          <img
            v-if="project.media?.type === 'image'"
            class="project-detail__target-visual"
            :class="{ 'is-visible': prefersReducedMotion || !sourceElement }"
            :src="project.media.src"
            alt=""
          />
          <div
            v-else
            class="project-detail__target-visual project-detail__target-placeholder"
            :class="{ 'is-visible': prefersReducedMotion || !sourceElement }"
          >
            {{ t('imageNeeded') }}
          </div>
        </div>
      </section>
      <section class="project-detail__content">
        <div ref="content" class="project-detail__inner">
          <span class="project-detail__number">{{ number }}</span>
          <h2 :id="`project-detail-${project.slug}`" class="project-detail__title">
            {{ pick(project.title) }}
          </h2>
          <p class="project-detail__category">{{ project.tags.join(' · ') }}</p>
          <dl class="project-detail__meta">
            <div>
              <dt>{{ t('roleLabel') }}</dt>
              <dd>{{ project.role }}</dd>
            </div>
            <div>
              <dt>{{ t('toolsLabel') }}</dt>
              <dd>{{ project.tools.join(' / ') }}</dd>
            </div>
          </dl>
          <p class="project-detail__description">{{ pick(project.summary) }}</p>
          <RouterLink class="project-detail__case-link" :to="`/projects/${project.slug}`">
            {{ t('viewProject') }} ↗
          </RouterLink>
        </div>
      </section>
      <button
        ref="closeButton"
        class="project-detail__close"
        type="button"
        :aria-label="t('closeProject')"
        :disabled="isTransitioning"
        @click="closeDetail"
      >
        {{ t('back') }}
      </button>
    </div>
  </Teleport>
</template>
