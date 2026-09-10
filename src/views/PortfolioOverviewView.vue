<script setup>
import { computed, ref, watch } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
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
import { useHomeIntro } from '@/composables/useHomeIntro'
import { useLanguage } from '@/composables/useLanguage'
import { useTrackMeasurements } from '@/composables/useTrackMeasurements'

const track = ref(null)
const sectionIds = sections.map(({ id }) => id)
const { measurements, getSectionIndex, getSectionOffset, refreshAfterLayout } =
  useTrackMeasurements(sectionIds, track)
const { activeSectionIndex } = useActiveSection(sectionIds, track, measurements, getSectionIndex)
const { goTo } = useHorizontalNavigation({
  sectionIds,
  trackRef: track,
  activeSectionIndex,
  getSectionOffset,
})
const activeColor = computed(() => sections[activeSectionIndex.value]?.color)
const { language, isLanguageChanging, t } = useLanguage()
const { isHomeIntroPlaying } = useHomeIntro()

watch(language, refreshAfterLayout, { flush: 'post' })
</script>
<template>
  <div
    class="portfolio-app"
    :class="{
      'is-language-changing': isLanguageChanging,
      'is-home-intro-playing': isHomeIntroPlaying,
    }"
    :style="{ '--active-section-color': activeColor }"
  >
    <a class="skip-link" href="#home-title">{{ t('skip') }}</a
    ><AppHeader />
    <p class="orientation-note">{{ t('rotate') }}</p>
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
