<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchProductById } from '@/services/api'
import { useFavoritesStore } from '@/stores/favorites'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorState from '@/components/ErrorState.vue'

const props = defineProps({
  id: { type: [String, Number], required: true },
})

const favorites = useFavoritesStore()
const product = ref(null)
const isLoading = ref(false)
const isError = ref(false)
const activeImage = ref('')

async function load() {
  isLoading.value = true
  isError.value = false
  try {
    product.value = await fetchProductById(props.id)
    activeImage.value = product.value.thumbnail
    document.title = `${product.value.title} - MiniStore.`
  } catch {
    isError.value = true
    document.title = 'Produk Tidak Ditemukan - MiniStore.'
  } finally {
    isLoading.value = false
  }
}

onMounted(load)
watch(() => props.id, load)
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-8">
    <RouterLink to="/" class="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to Products
    </RouterLink>

    <LoadingSpinner v-if="isLoading" />
    <ErrorState v-else-if="isError" @retry="load" />

    <div v-else-if="product" class="mt-4 grid gap-8 sm:grid-cols-2">
      <div class="min-w-0">
        <div class="aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
          <img :src="activeImage" :alt="product.title" class="h-full w-full object-cover" />
        </div>
        <div v-if="product.images?.length > 1" class="mt-3 flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="img in product.images"
            :key="img"
            type="button"
            class="h-16 w-16 shrink-0 overflow-hidden rounded-md border"
            :class="img === activeImage ? 'border-neutral-900' : 'border-neutral-200'"
            @click="activeImage = img"
          >
            <img :src="img" :alt="`${product.title} - gambar tambahan`" class="h-full w-full object-cover" />
          </button>
        </div>
      </div>

      <div>
        <h1 class="text-2xl font-bold text-neutral-900">{{ product.title }}</h1>
        <p class="mt-1 flex items-center gap-1 text-sm text-neutral-800 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-neutral-800" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {{ product.rating }}
        </p>
        <p class="mt-4 text-sm text-neutral-600">{{ product.description }}</p>

        <div class="mt-4 flex items-baseline gap-2">
          <span class="text-2xl font-semibold text-sky-400">${{ product.price }}</span>
          <span v-if="product.discountPercentage" class="text-sm text-emerald-600">
            -{{ product.discountPercentage }}%
          </span>
        </div>

        <dl class="mt-4 grid grid-cols-2 gap-2 text-sm">
          <dt class="text-neutral-500">Category</dt>
          <dd class="font-medium capitalize">{{ product.category }}</dd>
          <dt class="text-neutral-500">Stock</dt>
          <dd class="font-medium">{{ product.stock }}</dd>
        </dl>

        <button
          type="button"
          class="mt-6 w-full rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition-colors"
          @click="favorites.toggle(product.id)"
        >
          {{ favorites.isFavorite(product.id) ? '♥ Favorite' : '♡ Add to Favorite' }}
        </button>
      </div>
    </div>
  </section>
</template>
