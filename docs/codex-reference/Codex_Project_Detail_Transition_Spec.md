# Codex Implementation Spec — Project Card → Detail Overlay Transition

## 目標

請在目前既有的 Vue 3 作品集專案中，實作「點擊作品圖片／作品卡後，圖片平滑移動並放大到作品細節展示區」的互動。

此功能參考既有 CodePen 範例中的以下核心概念：

- 點擊 `.grid-item`
- 進入 `enterZoomMode()`
- 由 `createScalingOverlay()` 建立過渡用圖片
- 使用 GSAP `Flip.fit()` 將圖片從原位置移動到 detail target
- 動畫完成後顯示作品標題、編號、說明等 detail content

**不要直接複製原始 CodePen 的 DOM 操作架構。**

目前專案是 Vue，因此：

- 不使用 `document.createElement()` 生成主要 UI
- 不用 index 綁作品資料
- 不用 `DOMContentLoaded`
- 不大量使用全域 `document.querySelector()`
- 使用 Vue `ref`、`v-if`、props、emit、`onMounted()`、`onUnmounted()`
- 使用 `selectedProject` 管理目前作品
- GSAP Flip 只負責 transition animation

---

# 1. 預期互動流程

```text
Selected Works / Project Gallery

[ Project 01 ] [ Project 02 ] [ Project 03 ]
       ↓ click

記錄被點擊的 project
       ↓

建立 transition image overlay
       ↓

隱藏原作品圖片
       ↓

打開 ProjectDetailOverlay
       ↓

Flip.fit()

來源圖片
→→→
Detail Image Target
       ↓

圖片抵達
       ↓

顯示 title / metadata / description
       ↓

使用者點擊 Close / Back
       ↓

Reverse transition
       ↓

回到原 Project Card
```

---

# 2. Vue Component Architecture

建議不要把所有功能寫在同一個 component。

```text
src/
├─ components/
│  ├─ projects/
│  │  ├─ ProjectCard.vue
│  │  ├─ ProjectGallery.vue
│  │  └─ ProjectDetailOverlay.vue
│  │
│  └─ common/
│     └─ RevealImage.vue
│
├─ composables/
│  └─ useProjectTransition.js
│
└─ data/
   └─ projects.js
```

如果目前專案已經有類似 component，**沿用目前名稱與架構，不要重建一套重複 component。**

---

# 3. Project Data

不要像原始範例使用：

```js
imageData[index]
```

改為每個作品都使用完整物件。

例如：

```js
export const projects = [
  {
    id: 'kaohsiung-map',
    slug: 'kaohsiung-map',
    number: '01',
    title: '高雄地圖集章',
    titleEn: 'Kaohsiung Map',
    category: 'Graphic / Experience Design',
    year: '2026',
    cover: '/images/projects/kaohsiung-map.webp',
    description: '...',
    role: 'Visual Design / Map Design / Interaction'
  },

  {
    id: 'textile-memory',
    slug: 'textile-memory',
    number: '02',
    title: 'Textile Memory',
    category: 'Craft / Textile',
    year: '2026',
    cover: '/images/projects/textile-memory.webp',
    description: '...',
    role: 'Pattern / Dyeing / Material Research'
  }
]
```

點擊後直接：

```js
selectedProject.value = project
```

不要：

```js
selectedProject.value = projects[index]
```

除非目前既有資料結構只能使用 index。

---

# 4. ProjectCard.vue

作品卡負責：

- 顯示作品圖片
- 顯示 title / category
- 接收 project prop
- emit `open`
- 將真正被點擊圖片 DOM 傳回 parent

建議：

```vue
<template>
  <article
    class="project-card"
    @click="handleOpen"
  >
    <div class="project-card__image">
      <img
        ref="imageRef"
        :src="project.cover"
        :alt="project.title"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="project-card__meta">
      <span>{{ project.number }}</span>
      <h3>{{ project.title }}</h3>
      <p>{{ project.category }}</p>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['open'])

const imageRef = ref(null)

function handleOpen() {
  emit('open', {
    project: props.project,
    sourceImage: imageRef.value
  })
}
</script>
```

---

# 5. ProjectGallery.vue

Parent component 負責：

```js
selectedProject
isDetailOpen
sourceImage
```

建議：

```vue
<script setup>
import { ref } from 'vue'

const selectedProject = ref(null)
const sourceImage = ref(null)
const isDetailOpen = ref(false)

function openProject({ project, sourceImage: image }) {
  selectedProject.value = project
  sourceImage.value = image
  isDetailOpen.value = true
}

function closeProject() {
  isDetailOpen.value = false
}
</script>
```

template：

```vue
<ProjectCard
  v-for="project in projects"
  :key="project.id"
  :project="project"
  @open="openProject"
/>

<ProjectDetailOverlay
  v-if="selectedProject"
  :project="selectedProject"
  :source-image="sourceImage"
  :open="isDetailOpen"
  @close="closeProject"
/>
```

---

# 6. Detail Overlay HTML Structure

參考原始 CodePen 的 split screen concept，但改成 Vue component。

```vue
<template>
  <div
    ref="overlayRef"
    class="project-detail"
    :class="{ 'is-active': open }"
  >
    <section class="project-detail__media">
      <div
        ref="imageTargetRef"
        class="project-detail__image-target"
      />
    </section>

    <section class="project-detail__content">
      <div class="project-detail__inner">

        <span class="project-detail__number">
          {{ project.number }}
        </span>

        <h1 class="project-detail__title">
          {{ project.title }}
        </h1>

        <p class="project-detail__category">
          {{ project.category }}
        </p>

        <dl class="project-detail__meta">
          <div>
            <dt>Year</dt>
            <dd>{{ project.year }}</dd>
          </div>

          <div>
            <dt>Role</dt>
            <dd>{{ project.role }}</dd>
          </div>
        </dl>

        <p class="project-detail__description">
          {{ project.description }}
        </p>
      </div>
    </section>

    <button
      class="project-detail__close"
      type="button"
      aria-label="Close project detail"
      @click="$emit('close')"
    >
      Back
    </button>
  </div>
</template>
```

---

# 7. Detail Overlay CSS

原始範例是：

```text
left 50vw
+
right 50vw
```

目前作品集可以先維持同樣的 split layout。

```css
.project-detail {
  position: fixed;
  inset: 0;

  width: 100vw;
  height: 100dvh;

  display: grid;
  grid-template-columns: 1fr 1fr;

  z-index: 100;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  background: var(--color-bg);
}

.project-detail.is-active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.project-detail__media,
.project-detail__content {
  min-width: 0;
  min-height: 0;
}

.project-detail__media {
  position: relative;
  overflow: hidden;
}

.project-detail__image-target {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;
}

.project-detail__content {
  display: flex;
  align-items: flex-end;

  padding: clamp(24px, 4vw, 72px);
}

.project-detail__inner {
  width: min(100%, 680px);
}

.project-detail__title {
  font-size: clamp(3rem, 7vw, 8rem);
  line-height: 0.92;
}

.project-detail__close {
  position: absolute;
  top: 24px;
  right: 24px;

  z-index: 3;
}
```

注意：

Detail Overlay 不應建立大量 card UI。

維持目前作品集的：

- editorial
- minimal
- image-led
- large typography
- generous whitespace

---

# 8. Scaling Image Overlay

原始程式不是直接移動作品卡裡的 `<img>`。

它的邏輯是：

```text
原圖片
↓
getBoundingClientRect()
↓
建立一張一模一樣的 temporary image
↓
temporary image fixed 在原位置
↓
原圖片 opacity: 0
↓
temporary image → Flip.fit → detail target
```

Vue 版本可以保留這個核心概念。

---

# 9. createScalingOverlay()

建議抽到：

```text
useProjectTransition.js
```

例如：

```js
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

export function createScalingOverlay(sourceImage) {
  if (!sourceImage) return null

  const sourceRect =
    sourceImage.getBoundingClientRect()

  const overlay =
    document.createElement('div')

  overlay.className =
    'project-transition-image'

  const image =
    document.createElement('img')

  image.src = sourceImage.currentSrc || sourceImage.src
  image.alt = sourceImage.alt || ''

  overlay.appendChild(image)
  document.body.appendChild(overlay)

  gsap.set(overlay, {
    position: 'fixed',

    left: sourceRect.left,
    top: sourceRect.top,

    width: sourceRect.width,
    height: sourceRect.height,

    zIndex: 200,

    pointerEvents: 'none',

    transformOrigin: 'center center'
  })

  return overlay
}
```

這裡允許使用 `document.createElement()`，因為它只是建立 **temporary animation layer**。

不要用它建立正式的 Vue UI。

---

# 10. Transition Overlay CSS

Global CSS：

```css
.project-transition-image {
  position: fixed;

  overflow: hidden;

  z-index: 200;

  pointer-events: none;

  will-change:
    transform,
    width,
    height;
}

.project-transition-image img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
}
```

---

# 11. Open Transition

ProjectDetailOverlay mounted / opened 後：

```text
1. overlay 顯示
2. detail content 先隱藏
3. createScalingOverlay(sourceImage)
4. sourceImage opacity 0
5. Flip.fit(tempImage, imageTarget)
6. animation complete
7. detail content reveal
```

建議：

```js
async function enterDetail() {
  await nextTick()

  if (!props.sourceImage) return
  if (!imageTargetRef.value) return

  const transitionImage =
    createScalingOverlay(
      props.sourceImage
    )

  transitionOverlay.value =
    transitionImage

  gsap.set(
    props.sourceImage,
    {
      opacity: 0
    }
  )

  gsap.set(
    contentRef.value,
    {
      opacity: 0,
      y: 30
    }
  )

  Flip.fit(
    transitionImage,
    imageTargetRef.value,
    {
      duration: 1.1,

      ease:
        'power4.inOut',

      absolute: true,

      onComplete() {
        revealDetailContent()
      }
    }
  )
}
```

如果目前專案已經使用：

```js
CustomEase
```

則沿用目前 easing system。

不要重複建立 easing。

---

# 12. Detail Text Reveal

圖片到達之後：

```js
function revealDetailContent() {
  gsap.to(
    contentRef.value,
    {
      opacity: 1,
      y: 0,

      duration: 0.7,
      ease: 'power3.out'
    }
  )
}
```

若要更接近 reference：

可以分別 animate：

```text
number
↓
title
↓
metadata
↓
description
```

例如：

```js
const tl = gsap.timeline()

tl
  .from(numberRef.value, {
    yPercent: 100,
    opacity: 0,
    duration: 0.6
  })
  .from(
    titleRef.value,
    {
      yPercent: 100,
      opacity: 0,
      duration: 0.8
    },
    '-=0.35'
  )
  .from(
    metaRef.value,
    {
      y: 20,
      opacity: 0,
      duration: 0.5
    },
    '-=0.3'
  )
  .from(
    descriptionRef.value,
    {
      y: 20,
      opacity: 0,
      duration: 0.5
    },
    '-=0.3'
  )
```

動畫需 restrained。

不要讓每個字元都做動畫。

---

# 13. Open Transition State

避免重複點擊。

Vue state：

```js
const isTransitioning = ref(false)
```

open：

```js
if (isTransitioning.value) return

isTransitioning.value = true
```

animation complete：

```js
isTransitioning.value = false
```

避免：

```text
click
click
click
click
```

造成多個 overlay。

---

# 14. Close Transition

關閉時不要直接：

```js
isDetailOpen.value = false
```

否則會瞬間消失。

理想流程：

```text
detail content fade out
↓
temporary image
↓
Flip.fit 回原 Project Card image
↓
source image opacity 恢復
↓
remove temporary overlay
↓
detail overlay close
```

Pseudo code：

```js
function closeDetail() {
  if (isTransitioning.value) return

  isTransitioning.value = true

  gsap.to(
    contentRef.value,
    {
      opacity: 0,
      y: 20,

      duration: 0.3,

      onComplete() {

        Flip.fit(
          transitionOverlay.value,
          props.sourceImage,
          {
            duration: 1,

            ease:
              'power4.inOut',

            absolute: true,

            onComplete() {

              gsap.set(
                props.sourceImage,
                {
                  opacity: 1
                }
              )

              transitionOverlay.value?.remove()

              transitionOverlay.value =
                null

              isTransitioning.value =
                false

              emit('closed')
            }
          }
        )
      }
    }
  )
}
```

Parent 收到 `closed` 後：

```js
selectedProject.value = null
isDetailOpen.value = false
```

---

# 15. 如果原 Project 已經不在 Viewport

需要處理：

使用者打開 detail 後，
若原 gallery 因為 scroll / horizontal scroll 改變，
原 source image 可能已不在 viewport。

這種狀況不要強制 reverse Flip。

Fallback：

```text
如果 sourceImage 不存在
或
sourceImage 不在 DOM

→ detail image fade out
→ overlay fade out
→ close
```

避免 animation error。

---

# 16. Horizontal Selected Works 相容性

目前作品集的 Selected Works 若採用：

```text
vertical wheel
↓
ScrollTrigger pin
↓
horizontal track translation
```

打開 detail 時：

暫停該 section 的 interaction。

例如：

```text
isDetailOpen = true

→ disable page scroll
→ prevent horizontal ScrollTrigger interaction
```

最簡單先使用：

```css
body.project-detail-open {
  overflow: hidden;
}
```

但如果目前專案有 Lenis：

```js
lenis.stop()
```

close：

```js
lenis.start()
```

如果目前沒有 Lenis：

不要新增 Lenis。

---

# 17. ScrollTrigger 注意事項

Detail Overlay 打開時不要：

```js
ScrollTrigger.killAll()
```

因為會破壞整站動畫。

應只：

- 暫停目前需要停用的 interaction
- 或 lock scroll

close 後：

```js
ScrollTrigger.refresh()
```

僅在 layout 尺寸真的發生變化時使用。

---

# 18. Accessibility

ProjectCard 不應只是：

```html
<div @click>
```

更推薦：

```html
<article>
  <button
    class="project-card__trigger"
    type="button"
    @click="..."
  >
    ...
  </button>
</article>
```

或：

```html
<a>
```

如果它最終真的會導向 project route。

Detail close button：

```html
<button
  type="button"
  aria-label="Close project detail"
>
```

支援：

```text
Escape
→ close detail
```

例如：

```js
function handleKeydown(event) {
  if (
    event.key === 'Escape' &&
    props.open
  ) {
    closeDetail()
  }
}
```

onMounted：

```js
window.addEventListener(
  'keydown',
  handleKeydown
)
```

onUnmounted：

```js
window.removeEventListener(
  'keydown',
  handleKeydown
)
```

---

# 19. prefers-reduced-motion

必須考慮：

```css
@media (
  prefers-reduced-motion: reduce
) {
  .project-transition-image {
    transition: none;
  }
}
```

JS：

```js
const reduceMotion =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
```

如果：

```js
reduceMotion === true
```

則：

```text
直接顯示 detail
不用 Flip transition
```

---

# 20. Mobile / Landscape

目前作品集 mobile 主要支援：

```text
landscape orientation
```

Desktop：

```text
Gallery
↓ click
50 / 50 Detail Overlay
```

Landscape mobile：

建議改：

```text
60% image
40% content
```

或：

```text
55 / 45
```

例如：

```css
@media (
  max-width: 900px
) and (
  orientation: landscape
) {

  .project-detail {
    grid-template-columns:
      55% 45%;
  }

  .project-detail__content {
    padding: 24px;
  }

  .project-detail__title {
    font-size:
      clamp(
        2.5rem,
        6vw,
        5rem
      );
  }
}
```

---

# 21. Router Strategy

Detail Overlay 不一定等於完整 Case Study。

建議資訊架構：

```text
Selected Works
↓ click

Detail Preview Overlay
↓
View Case Study

/project/:slug
```

所以 Detail Overlay 內可以保留：

```vue
<RouterLink
  :to="`/project/${project.slug}`"
>
  View Case Study
</RouterLink>
```

不要一點 project card 就直接跳 route，
否則會失去目前要做的圖片 transition experience。

但如果目前既有架構已經是：

```text
card → project route
```

則可以把 Overlay 當成 route transition layer，
不要破壞原本 router。

---

# 22. Performance

圖片：

```html
loading="lazy"
decoding="async"
```

transition 時優先：

```js
sourceImage.currentSrc
```

避免 `<picture>` responsive image 過渡時拿到錯誤 URL。

temporary overlay：

animation complete / component unmount 後一定：

```js
overlay.remove()
```

避免 DOM leak。

onUnmounted：

```js
gsap.killTweensOf(...)
transitionOverlay.value?.remove()
```

---

# 23. 不要搬入的 Reference 功能

這次只要做：

```text
Project Card
→
Detail Transition
```

不要一起搬：

- full draggable infinite grid
- sound system
- zoom percentage control
- global cursor grab
- full CodePen preloader
- global vignette
- entire FashionGallery class
- 8 × 12 grid generator
- viewport observer
- full image dataset

除非目前 Vue 專案本身需要。

---

# 24. 最小可執行範圍

第一階段只完成：

```text
ProjectCard
↓ click
ProjectDetailOverlay open
↓
temporary image clone
↓
Flip.fit
↓
detail text reveal
↓
close
↓
reverse Flip
```

確認正常後再增加：

```text
Escape close
responsive
router link
horizontal section lock
reduced motion
```

---

# 25. 完成條件

Codex 完成後請確認：

- [ ] 點擊任意 ProjectCard 都可正確打開對應作品
- [ ] 圖片從實際 clicked image 位置開始移動
- [ ] 圖片會移動到 Detail Image Target
- [ ] transition 過程沒有閃爍
- [ ] 原 ProjectCard 圖片 transition 中不會重複顯示
- [ ] Detail title / description 與 clicked project 一致
- [ ] 關閉後圖片能回到原位置
- [ ] 快速重複點擊不會產生多個 overlay
- [ ] temporary overlay 關閉後會從 DOM 移除
- [ ] Vue component unmount 後沒有殘留 event listener
- [ ] 不破壞現有 Router
- [ ] 不破壞現有 Selected Works horizontal scroll
- [ ] desktop 正常
- [ ] landscape mobile 正常
- [ ] `prefers-reduced-motion` 有 fallback
- [ ] Console 無 error / warning

---

# 26. 最終視覺目標

此功能的目的不是單純「放大圖片」。

視覺上必須讓使用者感覺：

```text
我點擊的是同一件作品
        ↓
作品從 Gallery 的空間中
        ↓
自然移動到 Detail View
        ↓
然後才展開作品資訊
```

因此 transition 必須保留：

```text
spatial continuity
```

而不是：

```text
click
↓
fade out
↓
突然出現另一頁
```

整體動畫應：

- calm
- refined
- editorial
- restrained
- 不搶作品本身視覺焦點
