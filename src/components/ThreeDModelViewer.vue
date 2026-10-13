<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({
  work: { type: Object, required: true },
})

const { language, pick } = useLanguage()
const { prefersReducedMotion } = useReducedMotion()
const canvas = ref(null)
const status = ref('')
const progress = ref(0)
const isNight = ref(false)
const isLoaded = ref(false)
const DAY_BACKGROUND_COLOR = '#bfd5d0'
const NIGHT_BACKGROUND_COLOR = '#34435b'

const labels = {
  'zh-Hant': {
    loading: '正在載入 3D 模型',
    failed: '模型載入失敗，請稍後再試。',
    night: '夜間模式',
    day: '午後模式',
    reset: '重設視角',
    hint: '拖曳旋轉 · 滾輪或雙指縮放',
  },
  en: {
    loading: 'Loading 3D model',
    failed: 'Unable to load the model. Please try again later.',
    night: 'Night mode',
    day: 'Afternoon mode',
    reset: 'Reset view',
    hint: 'Drag to rotate · Scroll or pinch to zoom',
  },
  ja: {
    loading: '3Dモデルを読み込み中',
    failed: 'モデルを読み込めませんでした。',
    night: '夜間モード',
    day: '午後モード',
    reset: '視点をリセット',
    hint: 'ドラッグで回転 · スクロールまたはピンチで拡大縮小',
  },
}

let three
let renderer
let scene
let camera
let controls
let model
let ambient
let sun
let homePosition
let homeTarget
let resizeObserver
let animationFrame
let loadGeneration = 0
let glowMaterials = []
let nightLights = []
let starField

function text(key) {
  return labels[language.value]?.[key] ?? labels['zh-Hant'][key]
}

function render() {
  if (!renderer || !scene || !camera) return
  renderer.render(scene, camera)
}

function startRendering() {
  if (animationFrame) return
  const frame = (time = performance.now()) => {
    controls?.update()
    updateNightEffects(time)
    render()
    animationFrame = requestAnimationFrame(frame)
  }
  frame()
}

function stopRendering() {
  if (!animationFrame) return
  cancelAnimationFrame(animationFrame)
  animationFrame = 0
}

function disposeObject(object) {
  object?.traverse((node) => {
    if (!node.isMesh) return
    node.geometry?.dispose()
    const materials = Array.isArray(node.material) ? node.material : [node.material]
    materials.filter(Boolean).forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value?.isTexture) value.dispose()
      })
      material.dispose()
    })
  })
}

function excludeConstructionMeshes(object, displayBounds) {
  if (!displayBounds?.min || !displayBounds?.max) return

  object.updateMatrixWorld(true)
  const bounds = new three.Box3(
    new three.Vector3(...displayBounds.min),
    new three.Vector3(...displayBounds.max),
  )
  object.traverse((node) => {
    if (!node.isMesh) return
    const center = new three.Box3().setFromObject(node).getCenter(new three.Vector3())
    node.visible = bounds.containsPoint(center)
  })
}

function getVisibleBounds(object, ignoredNames = []) {
  const bounds = new three.Box3()
  const ignored = new Set(ignoredNames)
  object.updateMatrixWorld(true)
  object.traverse((node) => {
    if (!node.isMesh || !node.visible || ignored.has(node.name)) return
    bounds.union(new three.Box3().setFromObject(node))
  })
  return bounds
}

function applyLighting() {
  if (!scene || !ambient || !sun || !renderer) return
  const dayLighting = props.work.dayLighting ?? {}
  if (!scene.background?.isColor) scene.background = new three.Color()
  scene.background.set(isNight.value ? NIGHT_BACKGROUND_COLOR : DAY_BACKGROUND_COLOR)
  ambient.color.set(isNight.value ? '#8da4cc' : '#fff5e7')
  ambient.intensity = isNight.value ? 0.55 : (dayLighting.ambientIntensity ?? 2.4)
  sun.color.set(isNight.value ? '#9bb9e7' : '#ffe7c8')
  sun.intensity = isNight.value ? 0.68 : (dayLighting.sunIntensity ?? 2.2)
  glowMaterials.forEach(({ material, baseEmissive, baseIntensity, type }) => {
    const nightColors = {
      'side-lamp': '#ffd69a',
      'boat-outdoor': '#f2b84f',
      'boat-freezer': '#c7e4ee',
      'boat-sign': '#e4a152',
      'boat-interior': '#f0a35b',
    }
    const nightColor = nightColors[type] ?? '#ff7a1a'
    material.emissive.copy(isNight.value ? new three.Color(nightColor) : baseEmissive)
    material.emissiveIntensity = isNight.value
      ? type === 'boat-freezer'
        ? 0.9
        : type === 'boat-outdoor'
          ? 2.2
          : type === 'boat-sign'
            ? 0.85
            : type === 'boat-interior'
              ? 1.3
              : type === 'upper-front'
                ? 2.8
                : type === 'light'
                  ? 3.1
                  : 0.54
      : baseIntensity
  })
  nightLights.forEach((light) => {
    light.intensity = isNight.value ? light.userData.nightIntensity : 0
  })
  if (starField) starField.visible = isNight.value
  renderer.toneMappingExposure = isNight.value ? 0.86 : (dayLighting.exposure ?? 1.3)
  render()
}

function updateNightEffects(time) {
  if (!isNight.value || prefersReducedMotion.value) return
  const phase = time % 5000
  const flicker = phase < 520 ? 1 - Math.sin((phase / 520) * Math.PI) ** 2 * 0.12 : 1
  nightLights.forEach((light) => {
    if (light.userData.role === 'side-lamp') {
      light.intensity = light.userData.nightIntensity * flicker
    }
  })
}

function createStarField(center, extent) {
  const positions = []
  let seed = 1259
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  for (let index = 0; index < 120; index += 1) {
    const radius = extent * (4.8 + random() * 2.6)
    const theta = random() * Math.PI * 2
    const phi = Math.acos(2 * random() - 1)
    positions.push(
      center.x + radius * Math.sin(phi) * Math.cos(theta),
      center.y + radius * Math.cos(phi),
      center.z + radius * Math.sin(phi) * Math.sin(theta),
    )
  }

  const geometry = new three.BufferGeometry()
  geometry.setAttribute('position', new three.Float32BufferAttribute(positions, 3))
  const material = new three.PointsMaterial({
    color: '#f4ead8',
    size: extent * 0.018,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
  })
  starField = new three.Points(geometry, material)
  starField.visible = false
  scene.add(starField)
}

function clearModelLighting() {
  nightLights.forEach((light) => scene?.remove(light))
  if (starField) {
    scene?.remove(starField)
    starField.geometry.dispose()
    starField.material.dispose()
    starField = undefined
  }
  nightLights = []
  glowMaterials = []
}

function setupFlowerHouseLighting(object, extent) {
  const materials = new Map()

  object.updateMatrixWorld(true)
  object.traverse((node) => {
    if (!node.isMesh || !node.visible) return
    if (['pSphere1', 'pSphere2'].includes(node.name)) {
      node.material = Array.isArray(node.material)
        ? node.material.map((material) =>
            material?.name === 'light' ? material.clone() : material,
          )
        : node.material.clone()
    }
    const nodeMaterials = Array.isArray(node.material) ? node.material : [node.material]

    nodeMaterials.filter(Boolean).forEach((material) => {
      if (!['light', 'glass'].includes(material.name) || !material.emissive) return
      if (!materials.has(material.uuid)) {
        materials.set(material.uuid, {
          material,
          baseEmissive: material.emissive.clone(),
          baseIntensity: material.emissiveIntensity ?? 1,
          type:
            material.name === 'light' && node.name === 'pSphere1'
              ? 'side-lamp'
              : material.name === 'light' && node.name === 'pSphere2'
                ? 'upper-front'
                : material.name,
        })
      }
    })

    if (!nodeMaterials.some((material) => material?.name === 'light')) return
    const position = new three.Box3().setFromObject(node).getCenter(new three.Vector3())
    const isSideLamp = node.name === 'pSphere1'
    const isUpperFront = node.name === 'pSphere2'
    const light = new three.PointLight(isSideLamp ? '#ffd29a' : '#ff7a1a', 0, extent * 1.35, 2)
    light.position.copy(position)
    light.userData.role = isSideLamp ? 'side-lamp' : isUpperFront ? 'upper-front' : 'interior'
    light.userData.nightIntensity = isSideLamp ? 0.88 : isUpperFront ? 0.82 : 0.46
    scene.add(light)
    nightLights.push(light)
  })

  glowMaterials = [...materials.values()]
}

function hasAncestor(node, name) {
  let current = node.parent
  while (current) {
    if (current.name === name) return true
    current = current.parent
  }
  return false
}

function getBoathouseRole(node) {
  if (hasAncestor(node, 'light_left')) return 'boat-outdoor-left'
  if (hasAncestor(node, 'light_right')) return 'boat-outdoor-right'
  if (hasAncestor(node, 'cooler_outside') || hasAncestor(node, 'cooler_inside')) {
    return 'boat-freezer'
  }
  if (hasAncestor(node, 'kannban')) return 'boat-sign'
  return 'boat-interior'
}

function setupBoathouseLighting(object, extent, center) {
  const materialVariants = new Map()
  const materials = new Map()
  const lightPositions = new Map()

  object.updateMatrixWorld(true)
  object.traverse((node) => {
    if (!node.isMesh || !node.visible) return
    const originalMaterials = Array.isArray(node.material) ? node.material : [node.material]
    const role = originalMaterials.some((material) => material?.name === 'light')
      ? getBoathouseRole(node)
      : null

    if (role) {
      const replaceMaterial = (material) => {
        if (material?.name !== 'light') return material
        const key = `${material.uuid}:${role}`
        if (!materialVariants.has(key)) materialVariants.set(key, material.clone())
        return materialVariants.get(key)
      }
      node.material = Array.isArray(node.material)
        ? node.material.map(replaceMaterial)
        : replaceMaterial(node.material)
    }

    const nodeMaterials = Array.isArray(node.material) ? node.material : [node.material]
    nodeMaterials.filter(Boolean).forEach((material) => {
      if (material.name !== 'light' || !material.emissive || !role) return
      const type = role.startsWith('boat-outdoor') ? 'boat-outdoor' : role
      if (!materials.has(material.uuid)) {
        materials.set(material.uuid, {
          material,
          baseEmissive: material.emissive.clone(),
          baseIntensity: material.emissiveIntensity ?? 1,
          type,
        })
      }
    })

    if (!role) return
    const position = new three.Box3().setFromObject(node).getCenter(new three.Vector3())
    if (!lightPositions.has(role)) lightPositions.set(role, [])
    lightPositions.get(role).push(position)
  })

  const pointLightSettings = {
    'boat-outdoor-left': { color: '#f2b84f', intensity: 0.38 },
    'boat-outdoor-right': { color: '#f2b84f', intensity: 0.38 },
    'boat-freezer': { color: '#c7e4ee', intensity: 0.18 },
    'boat-sign': { color: '#e4a152', intensity: 0.08 },
    'boat-interior': { color: '#f0a35b', intensity: 0.36 },
  }

  lightPositions.forEach((positions, role) => {
    const setting = pointLightSettings[role]
    if (!setting) return
    const position = positions
      .reduce((sum, value) => sum.add(value), new three.Vector3())
      .multiplyScalar(1 / positions.length)
    const light = new three.PointLight(setting.color, 0, extent * 2.2, 2)
    light.position.copy(position)
    light.userData.role = role
    light.userData.nightIntensity = setting.intensity
    scene.add(light)
    nightLights.push(light)
  })

  const interior = new three.PointLight('#f0a35b', 0, extent * 1.8, 2)
  interior.position.copy(center).add(new three.Vector3(0, extent * 0.18, 0))
  interior.userData.role = 'boat-interior'
  interior.userData.nightIntensity = 0.3
  scene.add(interior)
  nightLights.push(interior)
  glowMaterials = [...materials.values()]
}

function setupModelLighting(object, extent, center, work) {
  clearModelLighting()
  if (work.lightingProfile === 'boathouse') setupBoathouseLighting(object, extent, center)
  else setupFlowerHouseLighting(object, extent)
  createStarField(center, extent)
}

function resetView() {
  if (!homePosition || !homeTarget || !camera || !controls) return
  camera.position.copy(homePosition)
  controls.target.copy(homeTarget)
  controls.update()
  render()
}

function toggleLighting(event) {
  isNight.value = event?.target ? event.target.checked : !isNight.value
  applyLighting()
}

function resize() {
  const host = canvas.value?.parentElement
  if (!host || !renderer || !camera) return
  const width = Math.max(1, host.clientWidth)
  const height = Math.max(1, host.clientHeight)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height, false)
  render()
}

async function loadModel(work) {
  const generation = ++loadGeneration
  status.value = text('loading')
  progress.value = 0
  isLoaded.value = false

  try {
    const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js')
    const { DRACOLoader } = await import('three/addons/loaders/DRACOLoader.js')
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(`${import.meta.env.BASE_URL}draco/`)
    loader.setDRACOLoader(dracoLoader)
    let gltf
    try {
      gltf = await loader.loadAsync(work.modelUrl, (event) => {
        if (generation !== loadGeneration || !event.total) return
        progress.value = Math.round((event.loaded / event.total) * 100)
      })
    } finally {
      dracoLoader.dispose()
    }
    const object = gltf.scene
    if (generation !== loadGeneration) {
      disposeObject(object)
      return
    }

    if (model) {
      clearModelLighting()
      scene.remove(model)
      disposeObject(model)
    }
    model = object
    excludeConstructionMeshes(model, work.displayBounds)
    scene.add(model)

    model.traverse((node) => {
      if (!node.isMesh) return
      node.castShadow = true
      node.receiveShadow = !work.boundsIgnoreNodes?.includes(node.name)
      const materials = Array.isArray(node.material) ? node.material : [node.material]
      materials.filter(Boolean).forEach((material) => {
        if (material.map) material.map.colorSpace = three.SRGBColorSpace
        material.side = three.DoubleSide
      })
    })

    const bounds = getVisibleBounds(model, work.boundsIgnoreNodes)
    const center = bounds.getCenter(new three.Vector3())
    const size = bounds.getSize(new three.Vector3())
    const extent = Math.max(size.x, size.y, size.z)
    if (!Number.isFinite(extent) || extent <= 0) throw new Error('Invalid model bounds')

    setupModelLighting(model, extent, center, work)

    controls.target.copy(center)
    const initialViewScale = Math.max(1, work.initialViewScale ?? 1)
    const distance = (extent * 2.6) / initialViewScale
    camera.position.copy(center).add(new three.Vector3(distance * 0.85, distance * 0.7, distance))
    camera.near = Math.max(0.001, extent / 10000)
    camera.far = Math.max(100, extent * 100)
    camera.updateProjectionMatrix()
    controls.minDistance = extent * 0.5
    controls.maxDistance = extent * 9

    sun.position.copy(center).add(new three.Vector3(-extent * 2, extent * 3, extent * 2))
    sun.shadow.bias = -0.0002
    sun.shadow.normalBias = extent * 0.002
    sun.target.position.copy(center)
    scene.add(sun.target)

    homePosition = camera.position.clone()
    homeTarget = controls.target.clone()
    controls.update()
    applyLighting()
    status.value = ''
    isLoaded.value = true
    render()
  } catch (error) {
    console.error('Unable to load 3D artwork:', error)
    status.value = text('failed')
  }
}

onMounted(async () => {
  three = await import('three')
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js')
  if (!canvas.value) return

  scene = new three.Scene()
  camera = new three.PerspectiveCamera(35, 1, 0.01, 10000)
  renderer = new three.WebGLRenderer({ canvas: canvas.value, antialias: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = three.PCFSoftShadowMap
  renderer.outputColorSpace = three.SRGBColorSpace
  renderer.toneMapping = three.ACESFilmicToneMapping

  controls = new OrbitControls(camera, canvas.value)
  controls.enableDamping = !prefersReducedMotion.value
  controls.dampingFactor = 0.06
  controls.maxPolarAngle = Math.PI * 0.89
  controls.addEventListener('change', render)

  ambient = new three.HemisphereLight(0xfff5e7, 0xb3b9c2, 2)
  sun = new three.DirectionalLight(0xffe7c8, 3.2)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  scene.add(ambient, sun)
  applyLighting()

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas.value.parentElement)
  resize()
  if (!prefersReducedMotion.value) startRendering()
  await loadModel(props.work)
})

watch(
  () => props.work,
  (work) => {
    if (scene && work) loadModel(work)
  },
)

watch(prefersReducedMotion, (reduced) => {
  if (controls) controls.enableDamping = !reduced
  if (reduced) stopRendering()
  else startRendering()
})

onBeforeUnmount(() => {
  loadGeneration += 1
  stopRendering()
  resizeObserver?.disconnect()
  controls?.removeEventListener('change', render)
  controls?.dispose()
  clearModelLighting()
  if (model) disposeObject(model)
  renderer?.dispose()
  renderer?.forceContextLoss()
})
</script>

<template>
  <section class="three-d-viewer" :class="{ 'is-night': isNight }">
    <canvas
      ref="canvas"
      class="three-d-viewer__canvas"
      :aria-label="pick(work.title)"
      @contextmenu.prevent
    ></canvas>

    <div class="three-d-viewer__actions">
      <label class="day-night-switch" :aria-label="isNight ? text('day') : text('night')">
        <input type="checkbox" :checked="isNight" @change="toggleLighting" />
        <span class="day-night-switch__track" aria-hidden="true">
          <span class="day-night-switch__stars"></span>
          <span class="day-night-switch__clouds"></span>
          <span class="day-night-switch__thumb"><span></span></span>
        </span>
      </label>
      <button type="button" :disabled="!isLoaded" @click="resetView">
        {{ text('reset') }}
      </button>
    </div>

    <p v-if="status" class="three-d-viewer__status" role="status">
      {{ status }}<span v-if="progress"> {{ progress }}%</span>
    </p>
    <p class="three-d-viewer__hint">{{ text('hint') }}</p>
  </section>
</template>

<style scoped>
.three-d-viewer {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 22rem;
  overflow: hidden;
  border-radius: inherit;
  background: #bfd5d0;
  color: #55483f;
  transition:
    background-color 400ms ease,
    color 400ms ease;
}

.three-d-viewer.is-night {
  background: #34435b;
  color: #f1e7d9;
}

.three-d-viewer__canvas {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
}

.three-d-viewer__actions {
  position: absolute;
  z-index: 2;
  top: clamp(0.75rem, 2vw, 1.5rem);
  right: clamp(0.75rem, 2vw, 1.5rem);
  display: flex;
  gap: 0.5rem;
}

.day-night-switch {
  position: relative;
  display: block;
  width: 4.3rem;
  height: 2rem;
  cursor: pointer;
}

.day-night-switch input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.day-night-switch__track {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 48%);
  border-radius: 999px;
  background: linear-gradient(120deg, #e3c8af, #f4e8d8);
  box-shadow: inset 0 0.25rem 0.8rem rgb(106 76 54 / 14%);
  transition: background 500ms ease;
}

.day-night-switch__thumb {
  position: absolute;
  z-index: 2;
  top: 0.2rem;
  left: 0.2rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #fff9dc;
  box-shadow: 0 0 0.6rem rgb(255 242 170 / 80%);
  transition:
    transform 500ms cubic-bezier(0.175, 0.885, 0.32, 1.2),
    background-color 500ms ease,
    box-shadow 500ms ease;
}

.day-night-switch__thumb span,
.day-night-switch__thumb::before,
.day-night-switch__thumb::after {
  position: absolute;
  content: '';
  border-radius: 50%;
  background: rgb(191 184 207 / 45%);
  opacity: 0;
  transition: opacity 350ms ease;
}

.day-night-switch__thumb span {
  top: 0.34rem;
  left: 0.3rem;
  width: 0.34rem;
  height: 0.34rem;
}

.day-night-switch__thumb::before {
  right: 0.25rem;
  bottom: 0.3rem;
  width: 0.25rem;
  height: 0.25rem;
}

.day-night-switch__thumb::after {
  top: 0.22rem;
  right: 0.3rem;
  width: 0.18rem;
  height: 0.18rem;
}

.day-night-switch__stars {
  position: absolute;
  top: 0.48rem;
  left: 0.65rem;
  width: 0.16rem;
  height: 0.16rem;
  border-radius: 50%;
  background: #fff;
  box-shadow:
    0.75rem 0.62rem 0 -0.02rem #fff,
    1.3rem -0.08rem 0 -0.04rem #fff;
  opacity: 0;
  transition: opacity 400ms ease;
}

.day-night-switch__clouds {
  position: absolute;
  right: 0.35rem;
  bottom: 0.3rem;
  width: 1.15rem;
  height: 0.38rem;
  border-radius: 999px;
  background: rgb(255 255 255 / 82%);
  box-shadow: -0.45rem 0.08rem 0 -0.02rem rgb(255 255 255 / 72%);
  transition:
    opacity 400ms ease,
    transform 500ms ease;
}

.day-night-switch input:checked + .day-night-switch__track {
  background: linear-gradient(120deg, #21163e, #354580);
}

.day-night-switch input:checked + .day-night-switch__track .day-night-switch__thumb {
  background: #f6e7f0;
  box-shadow:
    inset 0.18rem -0.12rem 0 #d8c8dc,
    0 0 0.65rem rgb(243 226 240 / 58%);
  transform: translateX(2.3rem);
}

.day-night-switch input:checked + .day-night-switch__track .day-night-switch__thumb span,
.day-night-switch input:checked + .day-night-switch__track .day-night-switch__thumb::before,
.day-night-switch input:checked + .day-night-switch__track .day-night-switch__thumb::after,
.day-night-switch input:checked + .day-night-switch__track .day-night-switch__stars {
  opacity: 1;
}

.day-night-switch input:checked + .day-night-switch__track .day-night-switch__clouds {
  opacity: 0;
  transform: translateX(1rem);
}

.day-night-switch input:focus-visible + .day-night-switch__track {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.three-d-viewer button {
  padding: 0.55rem 0.85rem;
  border: 1px solid currentColor;
  border-radius: 999px;
  background: color-mix(in srgb, white 72%, transparent);
  color: inherit;
  font: inherit;
  font-size: 0.72rem;
  cursor: pointer;
  backdrop-filter: blur(12px);
}

.three-d-viewer.is-night button {
  background: color-mix(in srgb, #273244 78%, transparent);
}

.three-d-viewer button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.three-d-viewer button:disabled {
  cursor: wait;
  opacity: 0.45;
}

.three-d-viewer__status {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  max-width: min(28rem, 82%);
  margin: 0;
  padding: 0.8rem 1.1rem;
  border-radius: 0.8rem;
  background: color-mix(in srgb, white 82%, transparent);
  color: #55483f;
  text-align: center;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(12px);
}

.three-d-viewer__hint {
  position: absolute;
  z-index: 2;
  bottom: 0.8rem;
  left: 50%;
  margin: 0;
  font-size: 0.68rem;
  white-space: nowrap;
  opacity: 0.7;
  transform: translateX(-50%);
  pointer-events: none;
}

@media (max-width: 1180px) and (max-height: 720px) and (orientation: landscape) {
  .three-d-viewer {
    min-height: 0;
  }

  .three-d-viewer__actions {
    top: 0.55rem;
    right: 0.55rem;
  }

  .three-d-viewer button {
    padding: 0.4rem 0.65rem;
    font-size: 0.62rem;
  }

  .three-d-viewer__hint {
    bottom: 0.5rem;
    font-size: 0.58rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .three-d-viewer {
    transition: none;
  }
}
</style>
