<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import bodyImage from '@/assets/cat/body.png'
import headImage from '@/assets/cat/head.png'
import hitomiImage from '@/assets/cat/hitomi.png'
import leftBackImage from '@/assets/cat/left-back.png'
import leftFrontImage from '@/assets/cat/left-front.png'
import rightBackImage from '@/assets/cat/right-back.png'
import rightFrontImage from '@/assets/cat/right-front.png'
import tailImage from '@/assets/cat/tail.png'
import loadWhiteImage from '@/assets/cat/loading/load-w.png'
import loadGrayImage from '@/assets/cat/loading/load-b01.png'
import loadDarkGrayImage from '@/assets/cat/loading/load-b02.png'
import loadBlackImage from '@/assets/cat/loading/load-black.png'
import { useReducedMotion } from '@/composables/useReducedMotion'

const EDGE_GAP = 12
const props = defineProps({
  progress: { type: Number, default: 0 },
})
const { prefersReducedMotion } = useReducedMotion()

const stageRef = ref(null)
const catX = ref(32)
const direction = ref('right')
const isWalking = ref(false)
const isJumping = ref(false)
const isLoading = ref(false)
const eyeX = ref(0)
const eyeY = ref(0)

let finePointerQuery
let mobileLandscapeQuery
let pointer = { x: 32, y: 0 }
let animationFrame
let walkTimer
let jumpTimer
let jumpInterval
let idleTimer

const loadingDots = [
  loadWhiteImage,
  loadGrayImage,
  loadDarkGrayImage,
  loadBlackImage,
  loadBlackImage,
  loadDarkGrayImage,
  loadGrayImage,
  loadWhiteImage,
]

const moverStyle = computed(() => ({
  left: `${catX.value}px`,
  '--eye-x': `${eyeX.value}px`,
  '--eye-y': `${eyeY.value}px`,
}))

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum)
}

function updateFromPointer() {
  const stage = stageRef.value
  if (!stage) return
  const stageBounds = stage.getBoundingClientRect()
  const catWidth = stage.querySelector('.cat-follower-mover')?.offsetWidth ?? 118
  const nextX = clamp(
    pointer.x - stageBounds.left - catWidth / 2,
    EDGE_GAP,
    Math.max(stageBounds.width - catWidth - EDGE_GAP, EDGE_GAP),
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

function usesMobileProgress() {
  return mobileLandscapeQuery?.matches && !finePointerQuery?.matches
}

function startIdleTimer() {
  window.clearTimeout(idleTimer)
  const delay = usesMobileProgress() ? 8000 : finePointerQuery?.matches ? 5000 : 0
  if (!delay) return

  idleTimer = window.setTimeout(() => {
    isWalking.value = false
    isJumping.value = false
    isLoading.value = true
  }, delay)
}

function registerActivity() {
  isLoading.value = false
  startIdleTimer()
}

function updateFromProgress() {
  if (!usesMobileProgress()) return
  const stage = stageRef.value
  if (!stage) return

  const catWidth = stage.querySelector('.cat-follower-mover')?.offsetWidth ?? 88
  const nextX = clamp(props.progress, 0, 1) * Math.max(stage.clientWidth - catWidth, 0)
  if (Math.abs(nextX - catX.value) < 0.5) return

  registerActivity()
  direction.value = nextX >= catX.value ? 'right' : 'left'
  catX.value = nextX
  isWalking.value = !prefersReducedMotion.value
  window.clearTimeout(walkTimer)
  walkTimer = window.setTimeout(() => {
    isWalking.value = false
  }, 220)
}

function updateLayoutMode() {
  if (usesMobileProgress()) updateFromProgress()
  startIdleTimer()
}

function handlePointerMove(event) {
  if (!finePointerQuery.matches) return
  registerActivity()
  if (prefersReducedMotion.value) return
  pointer = { x: event.clientX, y: event.clientY }
  if (!animationFrame) animationFrame = window.requestAnimationFrame(updateFromPointer)
}

function handleMobileActivity() {
  if (usesMobileProgress()) registerActivity()
}

function considerJump() {
  if (
    prefersReducedMotion.value ||
    !finePointerQuery.matches ||
    isLoading.value ||
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
  mobileLandscapeQuery = window.matchMedia(
    '(max-width: 1180px) and (max-height: 720px) and (orientation: landscape)',
  )
  pointer.y = window.innerHeight
  document.addEventListener('pointermove', handlePointerMove, { passive: true })
  document.addEventListener('pointerdown', handleMobileActivity, { passive: true })
  document.addEventListener('touchmove', handleMobileActivity, { passive: true })
  window.addEventListener('resize', updateLayoutMode, { passive: true })
  finePointerQuery.addEventListener('change', updateLayoutMode)
  mobileLandscapeQuery.addEventListener('change', updateLayoutMode)
  jumpInterval = window.setInterval(considerJump, 1000)
  updateLayoutMode()
})

watch(() => props.progress, updateFromProgress, { flush: 'post' })

onBeforeUnmount(() => {
  document.removeEventListener('pointermove', handlePointerMove)
  document.removeEventListener('pointerdown', handleMobileActivity)
  document.removeEventListener('touchmove', handleMobileActivity)
  window.removeEventListener('resize', updateLayoutMode)
  finePointerQuery?.removeEventListener('change', updateLayoutMode)
  mobileLandscapeQuery?.removeEventListener('change', updateLayoutMode)
  window.clearInterval(jumpInterval)
  window.clearTimeout(walkTimer)
  window.clearTimeout(jumpTimer)
  window.clearTimeout(idleTimer)
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div
    ref="stageRef"
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
        'is-loading': isLoading,
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
          <div class="cat-loading-spinner">
            <div class="cat-loading-ring">
              <img
                v-for="(dot, index) in loadingDots"
                :key="index"
                class="cat-loading-dot"
                :src="dot"
                alt=""
                :style="{ '--dot-angle': `${index * 45}deg` }"
              />
            </div>
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
.cat-loading-spinner {
  --spinner-size: 29px;
  --dot-size: 6px;
  --dot-radius: 10px;
  position: absolute;
  z-index: 12;
  top: 45%;
  left: 72%;
  width: var(--spinner-size);
  height: var(--spinner-size);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.86);
  transform-origin: center;
  transition:
    opacity 280ms var(--ease-standard),
    transform 360ms var(--ease-soft);
  pointer-events: none;
}
.cat-loading-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--dot-size);
  height: var(--dot-size);
  max-width: none;
  object-fit: contain;
  transform: translate(-50%, -50%) rotate(var(--dot-angle)) translateY(calc(var(--dot-radius) * -1));
  transform-origin: center;
}
.cat-loading-ring {
  position: relative;
  width: 100%;
  height: 100%;
}
.is-loading .cat-loading-spinner {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
.is-loading .cat-loading-ring {
  animation: cat-loading-rotate 1.1s linear infinite;
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
@keyframes cat-loading-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@media (hover: none), (pointer: coarse) {
  .cat-follower-stage {
    display: none;
  }
}
@media (max-width: 1180px) and (max-height: 720px) and (orientation: landscape) {
  .cat-follower-stage {
    right: var(--page-pad);
    bottom: 2.4rem;
    left: var(--page-pad);
    display: block;
    height: 6.5rem;
  }
  .cat-follower-mover {
    width: 88px;
    height: 88px;
    transition: left 180ms linear;
  }
  .cat-follower-puppet {
    top: 23px;
    transform: scale(0.175);
  }
  .cat-loading-spinner {
    --spinner-size: 22px;
    --dot-size: 4.5px;
    --dot-radius: 7.5px;
  }
  .is-jumping {
    animation: none;
  }
}
@media (max-width: 760px) and (orientation: portrait) {
  .cat-follower-stage {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .cat-follower-mover {
    transition: none;
  }
  .tail,
  .cat-leg,
  .body,
  .head,
  .cat-follower-pose {
    animation: none !important;
  }
  .is-loading .cat-loading-ring {
    animation: none;
  }
}
</style>
