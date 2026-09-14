<script setup>
import { onMounted } from 'vue'
import { useProducts } from '@/composables/useProducts'
import ProductCard from '@/components/ProductCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorState from '@/components/ErrorState.vue'
import EmptyState from '@/components/EmptyState.vue'

const {
  products,
  categories,
  page,
  totalPages,
  search,
  category,
  isLoading,
  isError,
  errorMessage,
  loadProducts,
  loadCategories,
  setSearch,
  setCategory,
  setPage,
} = useProducts({ pageSize: 12 })

onMounted(() => {
  loadProducts()
  loadCategories()
})
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-6">
    <h1 class="text-2xl font-bold text-slate-900">Products</h1>

    <div class="mt-4 flex flex-col gap-3 sm:flex-row">
      <SearchInput :model-value="search" class="sm:max-w-sm" @update:model-value="setSearch" />
      <CategoryFilter :model-value="category" :categories="categories" @update:model-value="setCategory" />
    </div>

    <LoadingSpinner v-if="isLoading" />
    <ErrorState v-else-if="isError" :message="errorMessage" @retry="loadProducts" />
    <EmptyState
      v-else-if="products.length === 0"
      title="Produk tidak ditemukan."
      description="Coba kata kunci atau kategori lain."
    />

    <template v-else>
      <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>

      <div class="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          class="rounded-md border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-40"
          :disabled="page <= 1"
          @click="setPage(page - 1)"
        >
          Previous
        </button>
        <span class="text-sm text-slate-600">Page {{ page }} of {{ totalPages }}</span>
        <button
          type="button"
          class="rounded-md border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-40"
          :disabled="page >= totalPages"
          @click="setPage(page + 1)"
        >
          Next
        </button>
      </div>
    </template>
  </section>
</template>
