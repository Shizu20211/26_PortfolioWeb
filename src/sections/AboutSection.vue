<script setup>
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import SectionDecorations from '@/components/SectionDecorations.vue'
import PortfolioFooter from '@/components/PortfolioFooter.vue'
import { contactItems } from '@/data/contact'
defineEmits(['home'])
const { language, pick, t } = useLanguage()
const skills = [
  'Visual — Illustrator / Photoshop / Figma',
  'Front-end — Vue / HTML5 / CSS / JavaScript',
  'Motion & 3D — Video / Maya',
  'Craft — Metalwork / Printmaking / Dyeing',
]
const contacts = computed(() =>
  contactItems.map((contact) => ({
    ...contact,
    href: contact.documents?.[language.value] ?? contact.href,
  })),
)
</script>
<template>
  <section id="about" class="portfolio-section about-section" aria-labelledby="about-title">
    <SectionDecorations section="about" />
    <div class="about-content" data-vertical-scroll>
      <div class="about-intro">
        <p class="chapter-label">04 · {{ t('sections.about') }}</p>
        <h2 id="about-title">{{ t('aboutTitle') }}</h2>
        <p v-for="paragraph in t('aboutBody')" :key="paragraph">{{ paragraph }}</p>
      </div>
      <div class="about-meta">
        <section>
          <h3>{{ t('capabilities') }}</h3>
          <ul>
            <li v-for="skill in skills" :key="skill">{{ skill }}</li>
          </ul>
        </section>
        <section>
          <h3>{{ t('aiCollaboration') }}</h3>
          <p>{{ t('aiStatement') }}</p>
        </section>
        <section>
          <h3>{{ t('contact') }}</h3>
          <div class="contact-grid">
            <component
              :is="contact.href ? 'a' : 'div'"
              v-for="contact in contacts"
              :key="contact.key"
              class="contact-placeholder"
              :class="{ 'is-linked': contact.href }"
              :href="contact.href || undefined"
              :target="contact.external && contact.href ? '_blank' : undefined"
              :rel="contact.external && contact.href ? 'noreferrer' : undefined"
            >
              <span class="contact-icon" aria-hidden="true">
                <img v-if="contact.icon" :src="contact.icon" alt="" width="24" height="24" />
                <span v-else>＋</span>
              </span>
              <span>{{
                typeof contact.label === 'string' ? contact.label : pick(contact.label)
              }}</span>
              <small v-if="contact.detail">{{
                typeof contact.detail === 'string' ? contact.detail : pick(contact.detail)
              }}</small>
              <small v-else-if="!contact.href">{{ t('contactPending') }}</small>
            </component>
          </div>
        </section>
      </div>
    </div>
    <PortfolioFooter @home="$emit('home')" />
  </section>
</template>
