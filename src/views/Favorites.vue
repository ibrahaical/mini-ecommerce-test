<script setup>
import { ref, watch, computed } from "vue";
import { RouterLink } from "vue-router";
import { useFavoritesStore } from "@/stores/favorites";
import { fetchProductById } from "@/services/api";
import ProductCard from "@/components/ProductCard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import EmptyState from "@/components/EmptyState.vue";
import ErrorState from "@/components/ErrorState.vue";

const favorites = useFavoritesStore();
const products = ref([]);
const isLoading = ref(false);
const isError = ref(false);

const hasFavorites = computed(() => favorites.ids.length > 0);

async function loadFavoriteProducts() {
  if (!hasFavorites.value) {
    products.value = [];
    return;
  }
  isLoading.value = true;
  isError.value = false;
  try {
    const results = await Promise.all(
      favorites.ids.map((id) => fetchProductById(id)),
    );
    products.value = results;
  } catch {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}

watch(() => favorites.ids, loadFavoriteProducts, { immediate: true })
</script>

<template>
  <!-- Hero Section (left-aligned) -->
  <section class="bg-neutral-100 border-b border-neutral-200">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <RouterLink to="/" class="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800">
        &larr; Back to Products
      </RouterLink>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
        My Favorites
      </h1>
      <p class="mt-3 text-neutral-600">
        Produk yang telah kamu simpan sebagai favorit.
      </p>
    </div>
  </section>

  <!-- Content Section -->
  <section class="mx-auto max-w-6xl px-4 py-8">
    <LoadingSpinner v-if="isLoading" />

    <ErrorState
      v-else-if="isError"
      message="Gagal memuat produk favorit."
      @retry="loadFavoriteProducts"
    />

    <EmptyState
      v-else-if="!hasFavorites"
      title="Belum ada produk favorite."
      description="Tambahkan produk dari halaman Products."
    >
      <RouterLink to="/" class="text-sm font-medium text-neutral-900 underline">
        Ke halaman Products
      </RouterLink>
    </EmptyState>

    <template v-else>
      <!-- Row: jumlah produk di kanan atas -->
      <div class="mb-4 flex items-center">
        <span class="py-1 text-sm font-light text-neutral-700">
          {{ favorites.ids.length }} produk tersimpan
        </span>
      </div>

      <div class="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </template>
  </section>
</template>
