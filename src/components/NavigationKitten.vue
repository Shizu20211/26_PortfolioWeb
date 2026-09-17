<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

const { prefersReducedMotion } = useReducedMotion()
const x = ref(32)
const direction = ref('right')
const isWalking = ref(false)
const isJumping = ref(false)

let finePointerQuery
let jumpInterval
let jumpTimeout
let walkTimeout
let animationFrame
let pointer = { x: 32, y: 0 }

const kittenStyle = computed(() => ({ left: `${x.value}px` }))

function clampTarget(value) {
  return Math.min(Math.max(value - 38, 12), Math.max(window.innerWidth - 88, 12))
}

function updatePosition() {
  const nextX = clampTarget(pointer.x)
  direction.value = nextX >= x.value ? 'right' : 'left'
  x.value = nextX
  isWalking.value = true
  window.clearTimeout(walkTimeout)
  walkTimeout = window.setTimeout(() => {
    isWalking.value = false
  }, 720)
  animationFrame = undefined
}

function handlePointerMove(event) {
  if (!finePointerQuery.matches || prefersReducedMotion.value) return
  pointer = { x: event.clientX, y: event.clientY }
  if (!animationFrame) animationFrame = window.requestAnimationFrame(updatePosition)
}

function considerJump() {
  if (
    prefersReducedMotion.value ||
    !finePointerQuery.matches ||
    pointer.y >= window.innerHeight - 150 ||
    isJumping.value
  ) {
    return
  }
  isJumping.value = true
  window.clearTimeout(jumpTimeout)
  jumpTimeout = window.setTimeout(() => {
    isJumping.value = false
  }, 760)
}

onMounted(() => {
  finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  pointer.y = window.innerHeight
  document.addEventListener('pointermove', handlePointerMove, { passive: true })
  jumpInterval = window.setInterval(considerJump, 1000)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointermove', handlePointerMove)
  window.clearInterval(jumpInterval)
  window.clearTimeout(jumpTimeout)
  window.clearTimeout(walkTimeout)
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div class="navigation-kitten-track" aria-hidden="true">
    <div
      class="navigation-kitten"
      :class="[`is-facing-${direction}`, { 'is-walking': isWalking, 'is-jumping': isJumping }]"
      :style="kittenStyle"
    >
      <span class="navigation-kitten__tail"></span>
      <span class="navigation-kitten__body"></span>
      <span class="navigation-kitten__head"><i></i><i></i></span>
      <span class="navigation-kitten__legs"><i></i><i></i><i></i><i></i></span>
    </div>
  </div>
</template>
