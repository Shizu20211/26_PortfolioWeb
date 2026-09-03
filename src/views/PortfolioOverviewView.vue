<script setup>
import { computed, ref } from 'vue'
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
import { useLanguage } from '@/composables/useLanguage'

const track = ref(null)
const { activeSectionIndex } = useActiveSection(
  sections.map(({ id }) => id),
  track,
)
const { goTo } = useHorizontalNavigation(
  sections.map(({ id }) => id),
  track,
  activeSectionIndex,
)
const activeColor = computed(() => sections[activeSectionIndex.value]?.color)
const { isLanguageChanging, t } = useLanguage()
</script>
<template>
  <div
    class="portfolio-app"
    :class="{ 'is-language-changing': isLanguageChanging }"
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
