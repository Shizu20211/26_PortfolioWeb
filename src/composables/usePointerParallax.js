import { onBeforeUnmount, ref } from 'vue'
import { useReducedMotion } from './useReducedMotion'

export function usePointerParallax() {
  const target = ref(null)
  const { prefersReducedMotion } = useReducedMotion()
  let frame = 0
  const setPoint = (x, y) => { if (!target.value) return; target.value.style.setProperty('--pointer-x', `${x}px`); target.value.style.setProperty('--pointer-y', `${y}px`) }
  const move = (event) => { if (prefersReducedMotion.value || event.pointerType === 'touch') return; const rect = target.value.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5; if (frame) return; frame = requestAnimationFrame(() => { setPoint(x * 12, y * 10); frame = 0 }) }
  const reset = () => setPoint(0, 0)
  onBeforeUnmount(() => frame && cancelAnimationFrame(frame))
  return { target, move, reset }
}
