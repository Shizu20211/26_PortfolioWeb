import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

export function useProjectTransition() {
  let transitionLayer = null

  function createTransitionLayer(sourceElement) {
    if (!sourceElement) return null

    const rect = sourceElement.getBoundingClientRect()
    const layer = document.createElement('div')
    const visual = sourceElement.cloneNode(true)

    layer.className = 'project-transition-image'
    layer.setAttribute('aria-hidden', 'true')
    layer.appendChild(visual)
    document.body.appendChild(layer)
    gsap.set(layer, {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    })

    transitionLayer = layer
    return layer
  }

  function fitTo(target, options = {}) {
    if (!transitionLayer || !target) return Promise.resolve()

    return new Promise((resolve) => {
      Flip.fit(transitionLayer, target, {
        absolute: true,
        duration: options.duration ?? 1,
        ease: options.ease ?? 'power4.inOut',
        onComplete: resolve,
      })
    })
  }

  function removeTransitionLayer() {
    if (!transitionLayer) return
    gsap.killTweensOf(transitionLayer)
    transitionLayer.remove()
    transitionLayer = null
  }

  function getTransitionLayer() {
    return transitionLayer
  }

  return { createTransitionLayer, fitTo, removeTransitionLayer, getTransitionLayer }
}
