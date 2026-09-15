<script setup>
import { RouterLink } from "vue-router";
import { useFavoritesStore } from "@/stores/favorites";

const props = defineProps({
  product: { type: Object, required: true },
});

const favorites = useFavoritesStore();
</script>

<template>
  <div
    class="flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
  >
    <div class="aspect-square w-full bg-neutral-100">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </div>

    <div class="flex flex-1 flex-col gap-1 p-2">
      <h3 class="line-clamp-1 text-sm font-semibold text-neutral-900">
        {{ product.title }}
      </h3>
      <p class="flex items-center gap-0.5 text-xs font-normal text-neutral-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-neutral-800" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        {{ product.rating }}
      </p>
      <p class="text-base font-semibold text-sky-400">${{ product.price }}</p>
      <p class="text-xs text-neutral-500 capitalize">Category: {{ product.category }}</p>

      <div class="mt-3 flex items-center gap-1">
        <RouterLink
          :to="`/products/${product.id}`"
          :aria-label="`Lihat detail produk ${product.title}`"
          class="flex h-8 flex-1 items-center justify-center rounded-md border border-transparent bg-neutral-800 px-3 text-xs font-medium text-white hover:bg-neutral-700 transition-colors"
        >
          Lihat Detail
        </RouterLink>
        <button
          type="button"
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-300 text-xs hover:bg-neutral-50 transition-colors"
          :aria-label="favorites.isFavorite(product.id) ? `Hapus ${product.title} dari favorit` : `Tambah ${product.title} ke favorit`"
          :aria-pressed="favorites.isFavorite(product.id)"
          @click="favorites.toggle(product.id)"
        >
          <span aria-hidden="true">{{ favorites.isFavorite(product.id) ? "♥" : "♡" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
