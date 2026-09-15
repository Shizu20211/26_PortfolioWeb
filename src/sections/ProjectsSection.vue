<script setup>
import ProjectHoverList from '@/components/ProjectHoverList.vue'
import SectionDecorations from '@/components/SectionDecorations.vue'
defineProps({ projects: Array })
</script>
<template>
  <section
    id="projects"
    class="portfolio-section projects-section"
    aria-labelledby="projects-title"
  >
    <SectionDecorations section="projects" />
    <ProjectHoverList :projects="projects" />
  </section>
</template>
