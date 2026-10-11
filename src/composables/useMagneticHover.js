import { onBeforeUnmount, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/composables/useReducedMotion'

export function useMagneticHover() {
  const { prefersReducedMotion } = useReducedMotion()
  const cleanups = new Map()
  let observer
  let finePointerQuery

  function attach(element) {
    if (cleanups.has(element)) return

    const xTo = gsap.quickTo(element, 'x', {
      duration: 0.55,
      ease: 'power3.out',
    })
    const yTo = gsap.quickTo(element, 'y', {
      duration: 0.55,
      ease: 'power3.out',
    })

    const move = (event) => {
      if (prefersReducedMotion.value || !finePointerQuery.matches) return
      const bounds = element.getBoundingClientRect()
      const x = event.clientX - (bounds.left + bounds.width / 2)
      const y = event.clientY - (bounds.top + bounds.height / 2)
      xTo(x * 0.16)
      yTo(y * 0.16)
    }
    const reset = () => {
      xTo(0)
      yTo(0)
    }

    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', reset)
    element.addEventListener('blur', reset)
    cleanups.set(element, () => {
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', reset)
      element.removeEventListener('blur', reset)
      gsap.killTweensOf(element)
      gsap.set(element, { clearProps: 'x,y' })
    })
  }

  function scan(root = document) {
    if (root instanceof Element && root.matches('[data-magnetic]')) attach(root)
    root.querySelectorAll?.('[data-magnetic]').forEach(attach)
  }

  onMounted(() => {
    finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    scan()
    observer = new MutationObserver((records) => {
      records.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node)
        })
      })
      for (const [element, cleanup] of cleanups) {
        if (!element.isConnected) {
          cleanup()
          cleanups.delete(element)
        }
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    cleanups.forEach((cleanup) => cleanup())
    cleanups.clear()
  })
}
