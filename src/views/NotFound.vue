<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center py-24 text-center px-4">
    <h1 class="text-9xl font-bold text-neutral-200">404</h1>
    <h2 class="mt-4 text-2xl font-bold text-neutral-900">Halaman Tidak Ditemukan</h2>
    <p class="mt-2 text-neutral-600">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
    <RouterLink
      to="/"
      class="mt-8 rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
    >
      Kembali ke Menu Utama
    </RouterLink>
  </div>
</template>
