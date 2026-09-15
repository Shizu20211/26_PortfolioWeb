<script setup>
import { computed, ref, watch } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import PortfolioDecorations from '@/components/PortfolioDecorations.vue'
import SectionNavigation from '@/components/SectionNavigation.vue'
import SectionProgress from '@/components/SectionProgress.vue'
import HomeSection from '@/sections/HomeSection.vue'
import FeaturedSection from '@/sections/FeaturedSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import ArtworksSection from '@/sections/ArtworksSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import { sections } from '@/data/sections'
import { projects } from '@/data/projects'
import { artworks } from '@/data/artworks'
import { useActiveSection } from '@/composables/useActiveSection'
import { useHorizontalNavigation } from '@/composables/useHorizontalNavigation'
import { useFeaturedGalleryMotion } from '@/composables/useFeaturedGalleryMotion'
import { useHomeIntro } from '@/composables/useHomeIntro'
import { useHomeTheme } from '@/composables/useHomeTheme'
import { useLanguage } from '@/composables/useLanguage'
import { useTrackMeasurements } from '@/composables/useTrackMeasurements'

const track = ref(null)
const sectionIds = sections.map(({ id }) => id)
const { measurements, getSectionIndex, getSectionOffset, getAdjacentOffset, refreshAfterLayout } =
  useTrackMeasurements(sectionIds, track)
const { activeSectionIndex } = useActiveSection(sectionIds, track, measurements, getSectionIndex)
const { goTo } = useHorizontalNavigation({
  sectionIds,
  trackRef: track,
  getSectionOffset,
  getAdjacentOffset,
})
useFeaturedGalleryMotion(track)
const activeColor = computed(() => sections[activeSectionIndex.value]?.color)
const activeSectionId = computed(() => sections[activeSectionIndex.value]?.id ?? 'home')
const { language, isLanguageChanging, t } = useLanguage()
const { isHomeIntroPlaying } = useHomeIntro()
const { isHomeNight } = useHomeTheme()
const isHomeNightActive = computed(() => isHomeNight.value && activeSectionIndex.value === 0)

watch(language, refreshAfterLayout, { flush: 'post' })
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
    <a class="skip-link" href="#home-title">{{ t('skip') }}</a
    ><AppHeader />
    <p class="orientation-note">{{ t('rotate') }}</p>
    <PortfolioDecorations :active-section="activeSectionId" />
    <main ref="track" class="portfolio-track" tabindex="-1">
      <HomeSection @next="goTo(1)" /><FeaturedSection :project="projects[0]" /><ProjectsSection
        :projects="projects.slice(1)"
      /><ArtworksSection :artworks="artworks" /><AboutSection />
    </main>
    <SectionNavigation
      :sections="sections"
      :active-index="activeSectionIndex"
      @navigate="goTo"
    /><SectionProgress :active-index="activeSectionIndex" :total="sections.length" />
  </div>
</template>
