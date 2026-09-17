<script setup>
import { useLanguage } from '@/composables/useLanguage'
defineProps({
  sections: { type: Array, required: true },
  activeIndex: { type: Number, required: true },
})
defineEmits(['navigate'])
const { t } = useLanguage()
</script>
<template>
  <nav class="section-navigation" :aria-label="t('nav')">
    <ol>
      <li v-for="(section, index) in sections" :key="section.id">
        <a
          :href="`#${section.id}`"
          data-magnetic
          :aria-current="activeIndex === index ? 'page' : undefined"
          @click.prevent="$emit('navigate', index)"
          ><span>{{ section.number }}</span
          ><span>{{ t(`sections.${section.key}`) }}</span></a
        >
      </li>
    </ol>
  </nav>
</template>
