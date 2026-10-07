<script setup>
import FrontendWorkList from '@/components/FrontendWorkList.vue'
import SectionDecorations from '@/components/SectionDecorations.vue'
defineProps({ frontendWorks: Array })
</script>
<template>
  <section
    id="frontend-works"
    class="portfolio-section frontend-works-section"
    aria-labelledby="frontend-works-title"
  >
    <SectionDecorations section="frontend-works" />
    <FrontendWorkList :frontend-works="frontendWorks" />
  </section>
</template>
