<script setup>
import { computed } from 'vue'
import cloudA from '@/assets/illustrations/clouds/cloudA.png'
import cloudB from '@/assets/illustrations/clouds/cloudB.png'
import ResponsivePortfolioImage from './ResponsivePortfolioImage.vue'

const props = defineProps({
  top: String,
  left: String,
  size: String,
  variant: { type: String, default: 'a', validator: (value) => ['a', 'b'].includes(value) },
  duration: { type: String, default: '8s' },
  delay: { type: String, default: '0s' },
  opacity: { type: Number, default: 1 },
  loading: { type: String, default: 'lazy' },
})

const cloud = computed(() =>
  props.variant === 'b'
    ? { src: cloudB, width: 372, height: 123 }
    : { src: cloudA, width: 370, height: 183 },
)
const style = computed(() => ({
  top: props.top,
  left: props.left,
  width: props.size,
  '--cloud-duration': props.duration,
  '--cloud-delay': props.delay,
  opacity: props.opacity,
}))
</script>
<template>
  <ResponsivePortfolioImage
    class="floating-cloud"
    :style="style"
    :src="cloud.src"
    alt=""
    :width="cloud.width"
    :height="cloud.height"
    :loading="loading"
    fetchpriority="low"
    aria-hidden="true"
  />
</template>
