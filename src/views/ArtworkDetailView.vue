<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { artworks } from '@/data/artworks'
import { useArtworkTransition } from '@/composables/useArtworkTransition'
import { useLanguage } from '@/composables/useLanguage'

const route = useRoute()
const router = useRouter()
const { pick, t } = useLanguage()
const { enterDetail, getReturnState, cleanup } = useArtworkTransition()
const heroTarget = ref(null)
const heroImage = ref(null)
const isReady = ref(false)
const artwork = computed(() =>
  artworks.find((item) => item.slug === route.params.slug && item.published),
)

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
  if (heroImage.value?.decode) {
    await heroImage.value.decode().catch(() => {})
  }
  await enterDetail(heroTarget.value, () => {
    isReady.value = true
  })
})

onBeforeUnmount(cleanup)
</script>

<template>
  <main v-if="artwork" class="artwork-detail-view" :class="{ 'is-ready': isReady }">
    <button class="artwork-detail-view__back" type="button" data-magnetic @click="back">
      ← {{ t('backArtworks') }}
    </button>
    <section class="artwork-detail-view__media" aria-hidden="true">
      <div
        ref="heroTarget"
        class="artwork-detail-view__hero-target"
        :class="{ 'has-image': artwork.cover?.src }"
      >
        <img v-if="artwork.cover?.src" ref="heroImage" :src="artwork.cover.src" alt="" />
        <div v-else class="artwork-detail-view__placeholder">{{ t('imageNeeded') }}</div>
      </div>
    </section>
    <section class="artwork-detail-view__content">
      <p class="chapter-label">{{ artwork.type }}</p>
      <h1>{{ pick(artwork.title) }}</h1>
      <p>{{ t('artworkDetailsPending') }}</p>
      <dl>
        <div>
          <dt>{{ t('contribution') }}</dt>
          <dd>{{ artwork.contribution ? pick(artwork.contribution) : t('comingSoon') }}</dd>
        </div>
      </dl>
    </section>
  </main>
</template>
