<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import { fetchProductById } from '@/services/api'
import ProductCard from '@/components/ProductCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'

const favorites = useFavoritesStore()
const products = ref([])
const isLoading = ref(false)

const hasFavorites = computed(() => favorites.ids.length > 0)

async function loadFavoriteProducts() {
  if (!hasFavorites.value) {
    products.value = []
    return
  }
  isLoading.value = true
  try {
    const results = await Promise.all(favorites.ids.map((id) => fetchProductById(id)))
    products.value = results
  } finally {
    isLoading.value = false
  }
}

onMounted(loadFavoriteProducts)
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-6">
    <h1 class="text-2xl font-bold text-slate-900">Favorites</h1>

    <LoadingSpinner v-if="isLoading" />

    <EmptyState
      v-else-if="!hasFavorites"
      title="Belum ada produk favorite."
      description="Tambahkan produk dari halaman Products."
    >
      <RouterLink to="/" class="text-sm font-medium text-slate-900 underline">Ke halaman Products</RouterLink>
    </EmptyState>

    <div v-else class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>
