<script setup>
defineProps({
  message: { type: String, default: 'Gagal mengambil data produk.' },
})
defineEmits(['retry'])
</script>

<template>
  <div class="mt-4 flex flex-col items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 py-16 text-center">
    <p class="text-sm font-medium text-red-700">{{ message }}</p>
    <button
      type="button"
      class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      @click="$emit('retry')"
    >
      Coba Lagi
    </button>
  </div>
</template>
