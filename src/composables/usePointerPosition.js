import { readonly, shallowRef } from 'vue'

const position = shallowRef({ x: 0, y: 0, pointerType: '' })
let consumers = 0
let frame = 0
let pending

function publish() {
  frame = 0
  if (pending) position.value = pending
}

function handlePointerMove(event) {
  pending = { x: event.clientX, y: event.clientY, pointerType: event.pointerType }
  if (!frame) frame = requestAnimationFrame(publish)
}

function connect() {
  consumers += 1
  if (consumers === 1)
    document.addEventListener('pointermove', handlePointerMove, { passive: true })
}

function disconnect() {
  consumers = Math.max(0, consumers - 1)
  if (consumers) return
  document.removeEventListener('pointermove', handlePointerMove)
  if (frame) cancelAnimationFrame(frame)
  frame = 0
  pending = undefined
}

export function usePointerPosition() {
  return { position: readonly(position), connect, disconnect }
}
