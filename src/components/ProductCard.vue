<script setup>
import { RouterLink } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps({
  product: { type: Object, required: true },
})

const favorites = useFavoritesStore()
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
    <div class="aspect-square w-full bg-slate-100">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </div>

    <div class="flex flex-1 flex-col gap-1 p-4">
      <h3 class="line-clamp-1 text-sm font-semibold text-slate-900">{{ product.title }}</h3>
      <p class="text-base font-bold text-slate-900">${{ product.price }}</p>
      <p class="text-xs text-slate-500">Category: {{ product.category }}</p>
      <p class="text-xs text-slate-500">Rating: {{ product.rating }}</p>

      <div class="mt-3 flex items-center gap-2">
        <RouterLink
          :to="`/products/${product.id}`"
          class="flex-1 rounded-md bg-slate-900 px-3 py-2 text-center text-xs font-medium text-white hover:bg-slate-700"
        >
          Lihat Detail
        </RouterLink>
        <button
          type="button"
          class="rounded-md border border-slate-300 px-3 py-2 text-xs hover:bg-slate-50"
          :aria-pressed="favorites.isFavorite(product.id)"
          @click="favorites.toggle(product.id)"
        >
          {{ favorites.isFavorite(product.id) ? '♥' : '♡' }}
        </button>
      </div>
    </div>
  </div>
</template>
