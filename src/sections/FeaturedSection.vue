<script setup>
import ProjectSummaryCard from '@/components/ProjectSummaryCard.vue'
import FloatingCloud from '@/components/FloatingCloud.vue'
import { useLanguage } from '@/composables/useLanguage'
defineProps({ project: Object })
const { t } = useLanguage()
</script>
<template><section id="featured" class="portfolio-section featured-section" aria-labelledby="featured-title"><FloatingCloud top="8%" left="62%" size="13rem" duration="12s" :opacity=".42" /><div class="section-heading"><p class="chapter-label">01 · {{ t('sections.featured') }}</p><h2 id="featured-title">{{ t('headings.featured') }}</h2><p>{{ t('featuredNote') }}</p></div><ProjectSummaryCard :project="project" featured /></section></template>
