<script setup>
defineProps({
  label: { type: String, default: 'Loading products...' },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-16 text-neutral-500">
    <div class="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
    <p class="text-sm">{{ label }}</p>
  </div>
</template>
