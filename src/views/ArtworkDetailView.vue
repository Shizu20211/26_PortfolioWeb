<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import KaohsiungMapCaseStudy from '@/components/KaohsiungMapCaseStudy.vue'
import LacquerwareCaseStudy from '@/components/LacquerwareCaseStudy.vue'
import MetalworkGallery from '@/components/MetalworkGallery.vue'
import SceneIllustrationGallery from '@/components/SceneIllustrationGallery.vue'
import SnoozeCafeCaseStudy from '@/components/SnoozeCafeCaseStudy.vue'
import SplitArtworkGalleryCaseStudy from '@/components/SplitArtworkGalleryCaseStudy.vue'
import ThreeDModelViewer from '@/components/ThreeDModelViewer.vue'
import { artworks } from '@/data/artworks'
import { useArtworkTransition } from '@/composables/useArtworkTransition'
import { useLanguage } from '@/composables/useLanguage'

const route = useRoute()
const router = useRouter()
const { pick, t } = useLanguage()
const { enterDetail, getReturnState, cleanup } = useArtworkTransition()
const caseStudy = ref(null)
const heroTarget = ref(null)
const heroImage = ref(null)
const metalworkGallery = ref(null)
const isReady = ref(false)
const activeThreeDIndex = ref(0)
const artwork = computed(() =>
  artworks.find(
    (item) =>
      item.published &&
      (item.slug === route.params.slug || item.legacySlugs?.includes(route.params.slug)),
  ),
)
const threeDWorks = computed(() => artwork.value?.works ?? [])
const activeThreeDWork = computed(() => threeDWorks.value[activeThreeDIndex.value] ?? null)
let initializationId = 0

function selectThreeDWork(index) {
  if (index < 0 || index >= threeDWorks.value.length) return
  activeThreeDIndex.value = index
}

async function back() {
  const { route: returnRoute } = getReturnState()
  if (returnRoute) {
    router.back()
    return
  }
  await router.replace('/#artworks')
}

async function initializeDetail(resetTransition = false) {
  const currentInitialization = ++initializationId
  if (resetTransition) cleanup()
  isReady.value = false
  activeThreeDIndex.value = 0

  if (!artwork.value) {
    await router.replace('/artworks')
    return
  }

  if (route.params.slug !== artwork.value.slug) {
    await router.replace({
      name: 'artwork-detail',
      params: { slug: artwork.value.slug },
      query: route.query,
    })
    return
  }

  await nextTick()
  if (currentInitialization !== initializationId) return
  const image = caseStudy.value?.heroImage ?? metalworkGallery.value?.heroImage ?? heroImage.value
  const target = caseStudy.value?.heroTarget ?? heroTarget.value
  const imageReady = image?.decode ? image.decode().catch(() => {}) : Promise.resolve()
  await enterDetail(
    target,
    () => {
      isReady.value = true
    },
    imageReady,
  )
}

watch(
  () => route.params.slug,
  (slug, previousSlug) => {
    if (previousSlug !== undefined && slug !== previousSlug) initializeDetail(true)
  },
)

onMounted(() => {
  initializeDetail(false)
})

onBeforeUnmount(() => {
  initializationId += 1
  cleanup()
})
</script>

<template>
  <KaohsiungMapCaseStudy
    v-if="artwork?.caseStudy === 'kaohsiung-map'"
    ref="caseStudy"
    :ready="isReady"
    @back="back"
  />
  <SnoozeCafeCaseStudy
    v-else-if="artwork?.caseStudy === 'snooze-cafe'"
    ref="caseStudy"
    :artwork="artwork"
    :ready="isReady"
    @back="back"
  />
  <LacquerwareCaseStudy
    v-else-if="artwork?.caseStudy === 'lacquerware'"
    ref="caseStudy"
    :artwork="artwork"
    :ready="isReady"
    @back="back"
  />
  <SplitArtworkGalleryCaseStudy
    v-else-if="['printmaking', 'botanical-dyeing'].includes(artwork?.caseStudy)"
    ref="caseStudy"
    :artwork="artwork"
    :ready="isReady"
    @back="back"
  />
  <SceneIllustrationGallery
    v-else-if="artwork?.caseStudy === 'scene-illustration'"
    ref="caseStudy"
    :artwork="artwork"
    :ready="isReady"
    @back="back"
  />
  <main
    v-else-if="artwork"
    class="artwork-detail-view"
    :class="{
      'is-ready': isReady,
      'artwork-detail-view--three-d': artwork.caseStudy === '3d-creation',
      'artwork-detail-view--metalwork': artwork.caseStudy === 'metalwork',
    }"
  >
    <button class="artwork-detail-view__back" type="button" data-magnetic @click="back">
      ← {{ t('backArtworks') }}
    </button>
    <section
      class="artwork-detail-view__media"
      :aria-hidden="['3d-creation', 'metalwork'].includes(artwork.caseStudy) ? undefined : true"
    >
      <div
        ref="heroTarget"
        class="artwork-detail-view__hero-target"
        :class="{
          'has-image': artwork.cover?.src && artwork.caseStudy !== '3d-creation',
        }"
      >
        <div v-if="artwork.caseStudy === '3d-creation' && activeThreeDWork" class="three-d-gallery">
          <ThreeDModelViewer :work="activeThreeDWork" />
          <button
            class="three-d-gallery__arrow three-d-gallery__arrow--previous"
            type="button"
            :disabled="activeThreeDIndex === 0"
            :aria-label="pick({ 'zh-Hant': '上一件作品', en: 'Previous work', ja: '前の作品' })"
            @click="selectThreeDWork(activeThreeDIndex - 1)"
          >
            ←
          </button>
          <button
            class="three-d-gallery__arrow three-d-gallery__arrow--next"
            type="button"
            :disabled="activeThreeDIndex === threeDWorks.length - 1"
            :aria-label="pick({ 'zh-Hant': '下一件作品', en: 'Next work', ja: '次の作品' })"
            @click="selectThreeDWork(activeThreeDIndex + 1)"
          >
            →
          </button>
          <ol class="three-d-gallery__index" :aria-label="pick(artwork.title)">
            <li v-for="(work, index) in threeDWorks" :key="work.id">
              <button
                type="button"
                :aria-current="index === activeThreeDIndex ? 'true' : undefined"
                @click="selectThreeDWork(index)"
              >
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                {{ pick(work.title) }}
              </button>
            </li>
          </ol>
        </div>
        <MetalworkGallery
          v-else-if="artwork.caseStudy === 'metalwork'"
          ref="metalworkGallery"
          :images="artwork.gallery"
        />
        <img v-else-if="artwork.cover?.src" ref="heroImage" :src="artwork.cover.src" alt="" />
        <div v-else class="artwork-detail-view__placeholder">{{ t('imageNeeded') }}</div>
      </div>
    </section>
    <section class="artwork-detail-view__content">
      <p class="chapter-label">{{ pick(artwork.type) }}</p>
      <h1>{{ pick(artwork.title) }}</h1>
      <template v-if="artwork.caseStudy === 'metalwork'">
        <div class="artwork-detail-view__narrative">
          <p class="artwork-detail-view__concept">{{ pick(artwork.concept) }}</p>
          <p class="artwork-detail-view__process">{{ pick(artwork.process) }}</p>
        </div>
        <dl class="artwork-detail-view__metadata artwork-detail-view__metadata--metalwork">
          <div>
            <dt>{{ pick({ 'zh-Hant': '材料', en: 'Material', ja: '素材' }) }}</dt>
            <dd>{{ pick(artwork.material) }}</dd>
          </div>
          <div>
            <dt>{{ pick({ 'zh-Hant': '創作日期', en: 'Date', ja: '制作時期' }) }}</dt>
            <dd>{{ pick(artwork.date) }}</dd>
          </div>
        </dl>
      </template>
      <template v-else>
        <p>
          {{ activeThreeDWork ? pick(activeThreeDWork.summary) : t('artworkDetailsPending') }}
        </p>
        <dl>
          <div>
            <dt>
              {{
                artwork.caseStudy === '3d-creation'
                  ? pick({ 'zh-Hant': '製作內容', en: 'Created', ja: '制作内容' })
                  : t('contribution')
              }}
            </dt>
            <dd>{{ artwork.contribution ? pick(artwork.contribution) : t('comingSoon') }}</dd>
          </div>
        </dl>
      </template>
    </section>
  </main>
</template>
