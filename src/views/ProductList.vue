<script setup>
import { onMounted } from "vue";
import { useProducts } from "@/composables/useProducts";
import ProductCard from "@/components/ProductCard.vue";
import SearchInput from "@/components/SearchInput.vue";
import CategoryFilter from "@/components/CategoryFilter.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorState from "@/components/ErrorState.vue";
import EmptyState from "@/components/EmptyState.vue";

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
} = useProducts({ pageSize: 12 });

onMounted(() => {
  loadProducts();
  loadCategories();
});
</script>

<template>
  <section class="bg-neutral-100">
    <div class="mx-auto max-w-6xl px-4 py-12 text-center sm:py-16">
      <h1
        class="mt-2 text-3xl font-semibold tracking-tight text-neutral-800 sm:text-4xl"
      >
        Discover Our Products
      </h1>

      <p class="mx-auto mt-3 max-w-2xl text-neutral-600">
        Temukan berbagai produk pilihan dengan mudah dan cepat.
      </p>

      <div class="mx-auto mt-6 max-w-2xl">
        <SearchInput
          :model-value="search"
          class="w-full"
          @update:model-value="setSearch"
        />
      </div>
    </div>
  </section>
  <section class="mx-auto max-w-6xl px-4 py-6">
    <div class="flex justify-end">
      <CategoryFilter
        :model-value="category"
        :categories="categories"
        @update:model-value="setCategory"
      />
    </div>

    <LoadingSpinner v-if="isLoading" />
    <ErrorState
      v-else-if="isError"
      :message="errorMessage"
      @retry="loadProducts"
    />
    <EmptyState
      v-else-if="products.length === 0"
      title="Produk tidak ditemukan."
      description="Coba kata kunci atau kategori lain."
    />

    <template v-else>
      <div
        class="mt-6 grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>

      <div class="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          class="rounded-md border border-neutral-300 px-3 py-1.5 text-sm disabled:opacity-40"
          :disabled="page <= 1"
          @click="setPage(page - 1)"
        >
          Previous
        </button>
        <span class="text-sm text-neutral-600"
          >Page {{ page }} of {{ totalPages }}</span
        >
        <button
          type="button"
          class="rounded-md border border-neutral-300 px-3 py-1.5 text-sm disabled:opacity-40"
          :disabled="page >= totalPages"
          @click="setPage(page + 1)"
        >
          Next
        </button>
      </div>
    </template>
  </section>
</template>
