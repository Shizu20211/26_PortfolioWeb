<script setup>
import { computed } from 'vue'
import ArtworkPreviewCard from '@/components/ArtworkPreviewCard.vue'
import SectionDecorations from '@/components/SectionDecorations.vue'
import { useArtworkArchiveMotion } from '@/composables/useArtworkArchiveMotion'
import { useLanguage } from '@/composables/useLanguage'
const props = defineProps({ artworks: Array })
const { t } = useLanguage()
const { sectionRef, isSharedHeadingVisible, sharedHeadingTop } = useArtworkArchiveMotion()
const overviewArtworks = computed(() =>
  props.artworks
    .filter((artwork) => artwork.published && artwork.showOnOverview)
    .sort((first, second) => first.overviewOrder - second.overviewOrder)
    .slice(0, 8),
)
const columnCount = computed(() => Math.max(1, Math.ceil(overviewArtworks.value.length / 2)))
const artworkRows = computed(() =>
  [
    overviewArtworks.value.slice(0, columnCount.value),
    overviewArtworks.value.slice(columnCount.value),
  ].filter((row) => row.length),
)
</script>
<template>
  <section
    ref="sectionRef"
    id="artworks"
    class="portfolio-section artworks-section"
    aria-labelledby="artworks-title"
  >
    <SectionDecorations section="artworks" />
    <header class="artworks-intro" data-track-panel>
      <div class="section-heading compact">
        <p class="chapter-label">03 · {{ t('sections.artworks') }}</p>
        <h2 id="artworks-title">{{ t('headings.artworks') }}</h2>
        <p class="artworks-intro__description">{{ t('artworksNote') }}</p>
      </div>
    </header>
    <Teleport to="body">
      <div
        class="artworks-shared-heading"
        :class="{ 'is-visible': isSharedHeadingVisible }"
        :style="{ top: `${sharedHeadingTop}px` }"
        aria-hidden="true"
      >
        <p class="chapter-label">03 · {{ t('sections.artworks') }}</p>
      </div>
    </Teleport>
    <div v-if="overviewArtworks.length" class="artworks-archive">
      <div
        v-for="(row, rowIndex) in artworkRows"
        :key="rowIndex"
        class="artworks-row"
        :class="`artworks-row--${rowIndex === 0 ? 'upper' : 'lower'}`"
      >
        <ArtworkPreviewCard
          v-for="(artwork, index) in row"
          :key="artwork.key"
          :artwork="artwork"
          :index="index + rowIndex * columnCount"
          :data-track-panel="rowIndex === 0 ? '' : undefined"
        />
      </div>
    </div>
    <p v-else class="artworks-empty">{{ t('imageNeeded') }}</p>
  </section>
</template>
