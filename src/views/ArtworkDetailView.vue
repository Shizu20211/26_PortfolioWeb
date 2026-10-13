<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import KaohsiungMapCaseStudy from '@/components/KaohsiungMapCaseStudy.vue'
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

function selectThreeDWork(index) {
  if (index < 0 || index >= threeDWorks.value.length) return
  activeThreeDIndex.value = index
}

async function back() {
  const { route: returnRoute } = getReturnState()
  await router.push(returnRoute || '/#artworks')
}

onMounted(async () => {
  if (!artwork.value) {
    router.replace('/artworks')
    return
  }
  await nextTick()
  const image = caseStudy.value?.heroImage ?? heroImage.value
  const target = caseStudy.value?.heroTarget ?? heroTarget.value
  if (image?.decode) {
    await image.decode().catch(() => {})
  }
  await enterDetail(target, () => {
    isReady.value = true
  })
})

onBeforeUnmount(cleanup)
</script>

<template>
  <KaohsiungMapCaseStudy
    v-if="artwork?.caseStudy === 'kaohsiung-map'"
    ref="caseStudy"
    :ready="isReady"
    @back="back"
  />
  <main
    v-else-if="artwork"
    class="artwork-detail-view"
    :class="{
      'is-ready': isReady,
      'artwork-detail-view--three-d': artwork.caseStudy === '3d-creation',
    }"
  >
    <button class="artwork-detail-view__back" type="button" data-magnetic @click="back">
      ← {{ t('backArtworks') }}
    </button>
    <section
      class="artwork-detail-view__media"
      :aria-hidden="artwork.caseStudy === '3d-creation' ? undefined : true"
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
        <img v-else-if="artwork.cover?.src" ref="heroImage" :src="artwork.cover.src" alt="" />
        <div v-else class="artwork-detail-view__placeholder">{{ t('imageNeeded') }}</div>
      </div>
    </section>
    <section class="artwork-detail-view__content">
      <p class="chapter-label">{{ artwork.type }}</p>
      <h1>{{ pick(artwork.title) }}</h1>
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
    </section>
  </main>
</template>
