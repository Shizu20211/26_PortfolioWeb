import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

export function useFrontendWorkTransition() {
  let transitionLayer = null

  function createTransitionLayer(sourceElement) {
    if (!sourceElement) return null
    removeTransitionLayer()

    const rect = sourceElement.getBoundingClientRect()
    const layer = document.createElement('div')
    const visual = sourceElement.cloneNode(true)
    visual.style.opacity = '1'

    layer.className = 'frontend-work-transition-image'
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

    const duration = options.duration ?? 1
    if (duration <= 0) {
      Flip.fit(transitionLayer, target, { absolute: true, duration: 0 })
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      try {
        Flip.fit(transitionLayer, target, {
          absolute: true,
          duration,
          ease: options.ease ?? 'power4.inOut',
          onComplete: resolve,
          onInterrupt: resolve,
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  function removeTransitionLayer() {
    if (!transitionLayer) return
    gsap.killTweensOf(transitionLayer)
    transitionLayer.remove()
    transitionLayer = null
  }

  return { createTransitionLayer, fitTo, removeTransitionLayer }
}
