<script setup>
import { computed } from 'vue'
const props = defineProps({
  top: String,
  left: String,
  size: String,
  color: { type: String, default: '#fffaf1' },
  duration: { type: String, default: '8s' },
  delay: { type: String, default: '0s' },
  opacity: { type: Number, default: 0.72 },
})
const style = computed(() => ({
  top: props.top,
  left: props.left,
  width: props.size,
  '--cloud-color': props.color,
  '--cloud-duration': props.duration,
  '--cloud-delay': props.delay,
  opacity: props.opacity,
}))
</script>
<template>
  <span class="floating-cloud" :style="style" aria-hidden="true"><i></i><i></i><i></i></span>
</template>
