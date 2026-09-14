<script setup>
defineProps({
  title: { type: String, default: 'Tidak ada produk.' },
  description: { type: String, default: '' },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-1 py-16 text-center text-neutral-500">
    <p class="text-sm font-medium text-neutral-700">{{ title }}</p>
    <p v-if="description" class="text-sm">{{ description }}</p>
    <div class="mt-2">
      <slot />
    </div>
  </div>
</template>
