<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import PortfolioDecorations from '@/components/PortfolioDecorations.vue'
import CatFollower from '@/components/CatFollower.vue'
import SectionNavigation from '@/components/SectionNavigation.vue'
import SectionProgress from '@/components/SectionProgress.vue'
import HomeSection from '@/sections/HomeSection.vue'
import FeaturedSection from '@/sections/FeaturedSection.vue'
import FrontendWorksSection from '@/sections/FrontendWorksSection.vue'
import ArtworksSection from '@/sections/ArtworksSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import { sections } from '@/data/sections'
import { frontendWorks } from '@/data/frontendWorks'
import { projects } from '@/data/projects'
import { artworks } from '@/data/artworks'
import { useActiveSection } from '@/composables/useActiveSection'
import { useHorizontalNavigation } from '@/composables/useHorizontalNavigation'
import { useHomeIntro } from '@/composables/useHomeIntro'
import { useHomeTheme } from '@/composables/useHomeTheme'
import { useLanguage } from '@/composables/useLanguage'
import { useMagneticHover } from '@/composables/useMagneticHover'
import { useTrackMeasurements } from '@/composables/useTrackMeasurements'
import { useArtworkTransition } from '@/composables/useArtworkTransition'

const track = ref(null)
const sectionIds = sections.map(({ id }) => id)
const {
  measurements,
  trackScrollWidth,
  getSectionIndex,
  getSectionOffset,
  getSectionEndOffset,
  getAdjacentOffset,
  refreshAfterLayout,
} = useTrackMeasurements(sectionIds, track)
const { activeSectionIndex, trackProgress } = useActiveSection(
  sectionIds,
  track,
  measurements,
  getSectionIndex,
)
const { goTo } = useHorizontalNavigation({
  sectionIds,
  trackRef: track,
  getSectionIndex,
  getSectionOffset,
  getSectionEndOffset,
  getAdjacentOffset,
})
useMagneticHover()
const { consumeReturnScroll } = useArtworkTransition()
const activeColor = computed(() => sections[activeSectionIndex.value]?.color)
const { language, isLanguageChanging, t } = useLanguage()
const { isHomeIntroPlaying } = useHomeIntro()
const { isHomeNight } = useHomeTheme()
const isHomeNightActive = computed(() => isHomeNight.value && activeSectionIndex.value === 0)

watch(language, refreshAfterLayout, { flush: 'post' })

onMounted(async () => {
  const returnScroll = consumeReturnScroll()
  if (returnScroll === null) return
  await nextTick()
  requestAnimationFrame(() => track.value?.scrollTo({ left: returnScroll, behavior: 'auto' }))
})
</script>
<template>
  <div
    class="portfolio-app"
    :class="{
      'is-language-changing': isLanguageChanging,
      'is-home-intro-playing': isHomeIntroPlaying,
      'is-home-night-active': isHomeNightActive,
    }"
    :style="{ '--active-section-color': activeColor }"
  >
    <a class="skip-link" href="#main-content">{{ t('skip') }}</a
    ><AppHeader />
    <p class="orientation-note">{{ t('rotate') }}</p>
    <main id="main-content" ref="track" class="portfolio-track" tabindex="-1">
      <PortfolioDecorations
        :measurements="measurements"
        :style="{ width: `${trackScrollWidth}px` }"
      /><HomeSection @about="goTo(4)" /><FeaturedSection
        :project="projects[0]"
      /><FrontendWorksSection :frontend-works="frontendWorks" /><ArtworksSection
        :artworks="artworks"
      /><AboutSection @home="goTo(0)" />
    </main>
    <CatFollower :progress="trackProgress" />
    <SectionNavigation
      :sections="sections"
      :active-index="activeSectionIndex"
      @navigate="goTo"
    /><SectionProgress :active-index="activeSectionIndex" :total="sections.length" />
  </div>
</template>
