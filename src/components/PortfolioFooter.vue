<script setup>
import { useLanguage } from '@/composables/useLanguage'
import goBackMotion from '@/assets/images/about/goback-slow.gif'

defineEmits(['home'])
const { t } = useLanguage()
</script>

<template>
  <footer class="portfolio-footer">
    <p>© 2026 CHING-YUNG HUANG</p>
    <button
      class="portfolio-footer__home"
      type="button"
      :aria-label="t('backHome')"
      @click="$emit('home')"
    >
      <img
        class="portfolio-footer__home-motion"
        :src="goBackMotion"
        alt=""
        width="500"
        height="500"
        draggable="false"
        aria-hidden="true"
      />
      <svg class="portfolio-footer__home-label" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id="footer-home-label-arc" d="M 15 61 A 45 45 0 0 1 105 61" />
        </defs>
        <text>
          <textPath href="#footer-home-label-arc" startOffset="50%" text-anchor="middle">
            {{ t('backHome') }}
          </textPath>
        </text>
      </svg>
    </button>
  </footer>
</template>
