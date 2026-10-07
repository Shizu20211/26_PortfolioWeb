import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from './useReducedMotion'

const SPORE_LIMIT = 72
const SPORE_COLORS = ['145, 203, 200', '217, 239, 231', '143, 170, 187']

export function useCaseStudyPointerEffects() {
  const view = ref(null)
  const heroVisual = ref(null)
  const cursorDot = ref(null)
  const cursorRing = ref(null)
  const sporeCanvas = ref(null)
  const { prefersReducedMotion } = useReducedMotion()

  let finePointerQuery
  let cursorFrame = 0
  let sporeFrame = 0
  let parallaxFrame = 0
  let context
  let canvasWidth = 0
  let canvasHeight = 0
  let targetX = 0
  let targetY = 0
  let ringX = 0
  let ringY = 0
  let lastSporeX = -100
  let lastSporeY = -100
  let spores = []

  function renderCursor() {
    cursorFrame = 0
    ringX += (targetX - ringX) * 0.12
    ringY += (targetY - ringY) * 0.12
    cursorRing.value?.style.setProperty('transform', `translate3d(${ringX}px, ${ringY}px, 0)`)

    if (Math.abs(targetX - ringX) >= 0.1 || Math.abs(targetY - ringY) >= 0.1) {
      cursorFrame = requestAnimationFrame(renderCursor)
    }
  }

  function requestCursorRender() {
    if (!cursorFrame) cursorFrame = requestAnimationFrame(renderCursor)
  }

  function resizeCanvas() {
    if (!sporeCanvas.value || !context) return
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
    canvasWidth = window.innerWidth
    canvasHeight = window.innerHeight
    sporeCanvas.value.width = Math.round(canvasWidth * ratio)
    sporeCanvas.value.height = Math.round(canvasHeight * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  function addSpore(x, y) {
    const distance = Math.hypot(x - lastSporeX, y - lastSporeY)
    if (distance < 18 || Math.random() < 0.32) return
    lastSporeX = x
    lastSporeY = y

    spores.push({
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      radius: 1.4 + Math.random() * 2.6,
      velocityX: (Math.random() - 0.5) * 0.7,
      velocityY: -0.35 - Math.random() * 0.65,
      life: 1,
      decay: 0.014 + Math.random() * 0.018,
      color: SPORE_COLORS[Math.floor(Math.random() * SPORE_COLORS.length)],
    })
    if (spores.length > SPORE_LIMIT) spores.splice(0, spores.length - SPORE_LIMIT)
    if (!sporeFrame) sporeFrame = requestAnimationFrame(renderSpores)
  }

  function renderSpores() {
    sporeFrame = 0
    if (!context) return
    context.clearRect(0, 0, canvasWidth, canvasHeight)
    spores = spores.filter((spore) => spore.life > 0)

    spores.forEach((spore) => {
      spore.x += spore.velocityX
      spore.y += spore.velocityY
      spore.velocityY *= 0.992
      spore.life -= spore.decay

      const alpha = Math.max(0, spore.life) * 0.7
      context.beginPath()
      context.arc(spore.x, spore.y, spore.radius, 0, Math.PI * 2)
      context.fillStyle = `rgba(${spore.color}, ${alpha})`
      context.shadowBlur = 9
      context.shadowColor = `rgba(${spore.color}, ${alpha * 0.7})`
      context.fill()
      context.shadowBlur = 0
    })

    if (spores.length) sporeFrame = requestAnimationFrame(renderSpores)
  }

  function move(event) {
    if (!finePointerQuery?.matches || prefersReducedMotion.value || event.pointerType === 'touch') {
      return
    }

    targetX = event.clientX
    targetY = event.clientY
    cursorDot.value?.style.setProperty('transform', `translate3d(${targetX}px, ${targetY}px, 0)`)

    const isInteractive = Boolean(event.target.closest('a, button, [role="button"]'))
    cursorDot.value?.classList.toggle('is-hovering', isInteractive)
    cursorRing.value?.classList.toggle('is-hovering', isInteractive)
    view.value?.classList.add('has-active-cursor')
    addSpore(targetX, targetY)
    requestCursorRender()
  }

  function leave() {
    view.value?.classList.remove('has-active-cursor')
  }

  function updateParallax(event) {
    if (prefersReducedMotion.value || parallaxFrame) return

    const scrollTop = event.currentTarget.scrollTop
    parallaxFrame = requestAnimationFrame(() => {
      parallaxFrame = 0
      const mobileFactor = window.innerWidth <= 860 ? 0.5 : 1
      view.value?.style.setProperty(
        '--case-parallax-near',
        `${Math.max(-36, scrollTop * -0.025 * mobileFactor)}px`,
      )
      view.value?.style.setProperty(
        '--case-parallax-far',
        `${Math.max(-20, scrollTop * -0.012 * mobileFactor)}px`,
      )
    })
  }

  function addRipple(event) {
    if (prefersReducedMotion.value || !heroVisual.value) return
    const rect = heroVisual.value.getBoundingClientRect()

    for (let index = 0; index < 3; index += 1) {
      const ripple = document.createElement('span')
      ripple.className = 'case-study-ripple'
      ripple.style.left = `${event.clientX - rect.left}px`
      ripple.style.top = `${event.clientY - rect.top}px`
      ripple.style.setProperty('--ripple-delay', `${index * 90}ms`)
      ripple.style.setProperty('--ripple-scale', `${4.5 + index * 1.35}`)
      heroVisual.value.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
    }
  }

  onMounted(() => {
    finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointerQuery.matches || prefersReducedMotion.value) return

    ringX = window.innerWidth / 2
    ringY = window.innerHeight / 2
    context = sporeCanvas.value?.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })
    view.value?.classList.add('has-custom-cursor')
  })

  onBeforeUnmount(() => {
    if (cursorFrame) cancelAnimationFrame(cursorFrame)
    if (sporeFrame) cancelAnimationFrame(sporeFrame)
    if (parallaxFrame) cancelAnimationFrame(parallaxFrame)
    window.removeEventListener('resize', resizeCanvas)
    spores = []
    context?.clearRect(0, 0, canvasWidth, canvasHeight)
    heroVisual.value?.querySelectorAll('.case-study-ripple').forEach((ripple) => ripple.remove())
  })

  return {
    view,
    heroVisual,
    cursorDot,
    cursorRing,
    sporeCanvas,
    move,
    leave,
    addRipple,
    updateParallax,
  }
}
