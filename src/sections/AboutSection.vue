<script setup>
import { useLanguage } from '@/composables/useLanguage'
const { t } = useLanguage()
const skills = [
  'Visual — Illustrator / Photoshop / Figma',
  'Front-end — Vue / HTML5 / CSS / JavaScript',
  'Motion & 3D — Video / Maya',
  'Craft — Metalwork / Printmaking / Dyeing',
]
const contacts = ['Email', 'GitHub', '104', 'Résumé PDF']
</script>
<template>
  <section id="about" class="portfolio-section about-section" aria-labelledby="about-title">
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
          <div v-for="contact in contacts" :key="contact" class="contact-placeholder">
            <span class="contact-icon" aria-hidden="true">＋</span><span>{{ contact }}</span
            ><small>{{ t('contactPending') }}</small>
          </div>
        </div>
      </section>
    </div>
    <footer class="about-footer">© 2026 CHING-YUNG HUANG</footer>
  </section>
</template>
