<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  sources: { type: Array, default: () => [] },
  srcset: { type: String, default: '' },
  sizes: { type: String, default: '100vw' },
  width: { type: [Number, String], required: true },
  height: { type: [Number, String], required: true },
  loading: { type: String, default: 'lazy' },
  fetchpriority: { type: String, default: 'auto' },
  imageClass: { type: [String, Array, Object], default: '' },
})

const imageElement = ref(null)
const currentSrc = computed(() => imageElement.value?.currentSrc || props.src)

defineExpose({ imageElement, currentSrc })
</script>

<template>
  <picture>
    <source
      v-for="source in sources"
      :key="`${source.type}-${source.media || 'all'}-${source.srcset}`"
      :type="source.type"
      :media="source.media"
      :srcset="source.srcset"
      :sizes="source.sizes || sizes"
    />
    <img
      ref="imageElement"
      :class="imageClass"
      :src="src"
      :srcset="srcset || undefined"
      :sizes="srcset ? sizes : undefined"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      decoding="async"
      :fetchpriority="fetchpriority"
    />
  </picture>
</template>
