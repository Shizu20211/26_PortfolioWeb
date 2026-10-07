import { nextTick, readonly, shallowRef } from 'vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

const selectedArtwork = shallowRef(null)
let transitionLayer
let sourceElement
let sourceRoute
let returnScrollLeft = 0
let shouldRestore = false
let transitioning = false

function cleanup() {
  if (transitionLayer) {
    gsap.killTweensOf(transitionLayer)
    transitionLayer.remove()
  }
  if (sourceElement?.isConnected) gsap.set(sourceElement, { opacity: 1 })
  transitionLayer = undefined
  sourceElement = undefined
  transitioning = false
  document.body.classList.remove('artwork-transition-open')
}

function createLayer(element) {
  const image = element?.querySelector('img')
  if (!image?.currentSrc) return null
  const rect = element.getBoundingClientRect()
  const imageStyle = getComputedStyle(image)
  const layer = document.createElement('div')
  const clone = image.cloneNode(true)
  clone.src = image.currentSrc
  clone.removeAttribute('class')
  clone.style.objectFit = imageStyle.objectFit
  clone.style.objectPosition = imageStyle.objectPosition
  clone.style.transform = 'none'
  clone.style.filter = 'none'
  layer.className = 'artwork-transition-image'
  layer.setAttribute('aria-hidden', 'true')
  layer.appendChild(clone)
  document.body.appendChild(layer)
  gsap.set(layer, { left: rect.left, top: rect.top, width: rect.width, height: rect.height })
  transitionLayer = layer
  sourceElement = element
  gsap.set(sourceElement, { opacity: 0 })
  return layer
}

export function useArtworkTransition() {
  async function openArtwork({ artwork, source, router, track }) {
    if (transitioning) return
    transitioning = true
    selectedArtwork.value = artwork
    sourceRoute = router.currentRoute.value.fullPath
    returnScrollLeft = track?.scrollLeft ?? 0
    shouldRestore = true
    document.body.classList.add('artwork-transition-open')

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduceMotion) createLayer(source)

    try {
      await router.push(`/artworks/${artwork.slug}`)
    } catch {
      cleanup()
      return
    }

    if (!transitionLayer) {
      transitioning = false
      document.body.classList.remove('artwork-transition-open')
    }
  }

  async function enterDetail(target, onArrive) {
    await nextTick()
    if (!transitionLayer || !target) {
      onArrive?.()
      transitioning = false
      document.body.classList.remove('artwork-transition-open')
      return
    }

    await new Promise((resolve) => {
      Flip.fit(transitionLayer, target, {
        absolute: true,
        duration: 0.72,
        ease: 'power4.inOut',
        onComplete: resolve,
      })
    })
    onArrive?.()
    await nextTick()
    await gsap.to(transitionLayer, {
      opacity: 0,
      duration: 0.1,
      ease: 'power1.out',
    })
    cleanup()
  }

  function getReturnState() {
    return { route: sourceRoute || '/#artworks', scrollLeft: returnScrollLeft }
  }

  function consumeReturnScroll() {
    if (!shouldRestore) return null
    shouldRestore = false
    return returnScrollLeft
  }

  return {
    selectedArtwork: readonly(selectedArtwork),
    openArtwork,
    enterDetail,
    getReturnState,
    consumeReturnScroll,
    cleanup,
  }
}
