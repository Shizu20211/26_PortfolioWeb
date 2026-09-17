<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import bodyImage from '@/assets/cat/body.png'
import headImage from '@/assets/cat/head.png'
import hitomiImage from '@/assets/cat/hitomi.png'
import leftBackImage from '@/assets/cat/left-back.png'
import leftFrontImage from '@/assets/cat/left-front.png'
import rightBackImage from '@/assets/cat/right-back.png'
import rightFrontImage from '@/assets/cat/right-front.png'
import tailImage from '@/assets/cat/tail.png'
import { useReducedMotion } from '@/composables/useReducedMotion'

const CAT_WIDTH = 118
const EDGE_GAP = 12
const { prefersReducedMotion } = useReducedMotion()

const catX = ref(32)
const direction = ref('right')
const isWalking = ref(false)
const isJumping = ref(false)
const eyeX = ref(0)
const eyeY = ref(0)

let finePointerQuery
let pointer = { x: 32, y: 0 }
let animationFrame
let walkTimer
let jumpTimer
let jumpInterval

const moverStyle = computed(() => ({
  left: `${catX.value}px`,
  '--eye-x': `${eyeX.value}px`,
  '--eye-y': `${eyeY.value}px`,
}))

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum)
}

function updateFromPointer() {
  const nextX = clamp(
    pointer.x - CAT_WIDTH / 2,
    EDGE_GAP,
    Math.max(window.innerWidth - CAT_WIDTH - EDGE_GAP, EDGE_GAP),
  )
  direction.value = nextX >= catX.value ? 'right' : 'left'
  catX.value = nextX

  const normalizedX = (pointer.x / window.innerWidth - 0.5) * 2
  const normalizedY = (pointer.y / window.innerHeight - 0.5) * 2
  const nextEyeX = clamp(normalizedX * 5, -5, 5)
  eyeX.value = direction.value === 'left' ? -nextEyeX : nextEyeX
  eyeY.value = clamp(normalizedY * 3, -3, 3)
  isWalking.value = true

  window.clearTimeout(walkTimer)
  walkTimer = window.setTimeout(() => {
    isWalking.value = false
  }, 950)
  animationFrame = undefined
}

function handlePointerMove(event) {
  if (!finePointerQuery.matches || prefersReducedMotion.value) return
  pointer = { x: event.clientX, y: event.clientY }
  if (!animationFrame) animationFrame = window.requestAnimationFrame(updateFromPointer)
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
  window.clearTimeout(jumpTimer)
  jumpTimer = window.setTimeout(() => {
    isJumping.value = false
  }, 850)
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
  window.clearTimeout(walkTimer)
  window.clearTimeout(jumpTimer)
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div
    class="cat-follower-stage"
    :class="{ 'is-reduced': prefersReducedMotion }"
    aria-hidden="true"
  >
    <div
      class="cat-follower-mover"
      :class="{
        'is-left': direction === 'left',
        'is-walking': isWalking,
        'is-jumping': isJumping,
      }"
      :style="moverStyle"
    >
      <div class="cat-follower-facing">
        <div class="cat-follower-pose">
          <div class="cat-follower-puppet">
            <img class="cat-part cat-leg right-back" :src="rightBackImage" alt="" />
            <img class="cat-part cat-leg left-back" :src="leftBackImage" alt="" />
            <img class="cat-part cat-leg right-front" :src="rightFrontImage" alt="" />
            <img class="cat-part cat-leg left-front" :src="leftFrontImage" alt="" />
            <img class="cat-part tail" :src="tailImage" alt="" />
            <img class="cat-part body" :src="bodyImage" alt="" />
            <img class="cat-part head" :src="headImage" alt="" />
            <img class="cat-part hitomi" :src="hitomiImage" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cat-follower-stage {
  position: fixed;
  z-index: 22;
  right: 0;
  bottom: 3.45rem;
  left: 0;
  height: 9rem;
  overflow: visible;
  pointer-events: none;
}
.cat-follower-mover {
  position: absolute;
  bottom: 0;
  width: 118px;
  height: 118px;
  transition: left 900ms var(--ease-soft);
  will-change: left, bottom;
}
.cat-follower-facing,
.cat-follower-pose {
  width: 100%;
  height: 100%;
  transform-origin: center bottom;
}
.cat-follower-mover.is-left .cat-follower-facing {
  transform: scaleX(-1);
}
.cat-follower-puppet {
  position: absolute;
  top: 31px;
  left: 0;
  width: 500px;
  height: 500px;
  transform: scale(0.235);
  transform-origin: top left;
}
.cat-part {
  position: absolute;
  display: block;
  max-width: none;
  pointer-events: none;
  user-select: none;
}
.hitomi {
  z-index: 8;
  top: 172px;
  left: 326px;
  width: 73px;
  height: 25px;
  transform: translate(var(--eye-x), var(--eye-y));
  transition: transform 80ms linear;
}
.head {
  z-index: 7;
  top: 94px;
  left: 280px;
  width: 166px;
  height: 150px;
}
.body {
  z-index: 6;
  top: 170px;
  left: 158px;
  width: 237px;
  height: 135px;
}
.tail {
  z-index: 5;
  top: 59px;
  left: 121px;
  width: 63px;
  height: 191px;
  transform-origin: 85% 95%;
  animation: cat-tail-idle 1.8s ease-in-out infinite;
}
.right-back {
  top: 234px;
  left: 162px;
  width: 48px;
  height: 134px;
}
.left-back {
  top: 233px;
  left: 229px;
  width: 48px;
  height: 134px;
}
.right-front {
  top: 261px;
  left: 314px;
  width: 34px;
  height: 106px;
}
.left-front {
  top: 245px;
  left: 356px;
  width: 38px;
  height: 109px;
}
.cat-leg {
  z-index: 4;
  transform-origin: 50% 8%;
}
.is-walking .right-front,
.is-walking .left-back {
  animation: cat-walk-a 420ms ease-in-out infinite;
}
.is-walking .left-front,
.is-walking .right-back {
  animation: cat-walk-b 420ms ease-in-out infinite;
}
.is-walking .body {
  animation: cat-body-bob 420ms ease-in-out infinite;
}
.is-walking .head {
  animation: cat-head-bob 420ms ease-in-out infinite;
}
.is-jumping {
  animation: cat-jump 850ms cubic-bezier(0.37, 0, 0.63, 1);
}
.is-jumping .cat-follower-pose {
  animation: cat-jump-tilt 850ms ease-in-out;
}
.is-jumping .right-front,
.is-jumping .left-front {
  animation: cat-front-tuck 850ms ease-in-out;
}
.is-jumping .right-back,
.is-jumping .left-back {
  animation: cat-back-tuck 850ms ease-in-out;
}
@keyframes cat-walk-a {
  0%,
  100% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(12deg);
  }
}
@keyframes cat-walk-b {
  0%,
  100% {
    transform: rotate(12deg);
  }
  50% {
    transform: rotate(-10deg);
  }
}
@keyframes cat-body-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}
@keyframes cat-head-bob {
  0%,
  100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-2px) rotate(1deg);
  }
}
@keyframes cat-tail-idle {
  0%,
  100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(7deg);
  }
}
@keyframes cat-jump {
  0%,
  100% {
    bottom: 0;
  }
  48% {
    bottom: 3.4rem;
  }
}
@keyframes cat-jump-tilt {
  0%,
  100% {
    transform: rotate(0);
  }
  45% {
    transform: rotate(-7deg);
  }
}
@keyframes cat-front-tuck {
  0%,
  100% {
    transform: rotate(0);
  }
  40%,
  60% {
    transform: rotate(-45deg);
  }
}
@keyframes cat-back-tuck {
  0%,
  100% {
    transform: rotate(0);
  }
  40%,
  60% {
    transform: rotate(38deg);
  }
}
@media (hover: none), (pointer: coarse) {
  .cat-follower-stage {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .cat-follower-mover {
    left: 50% !important;
    transform: translateX(-50%);
    transition: none;
  }
  .tail,
  .cat-leg,
  .body,
  .head,
  .cat-follower-pose {
    animation: none !important;
  }
}
</style>
