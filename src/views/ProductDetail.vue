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
  } catch {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(load)
watch(() => props.id, load)
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-6">
    <RouterLink to="/" class="text-sm text-slate-500 hover:text-slate-800">&larr; Back to Products</RouterLink>

    <LoadingSpinner v-if="isLoading" />
    <ErrorState v-else-if="isError" @retry="load" />

    <div v-else-if="product" class="mt-4 grid gap-8 sm:grid-cols-2">
      <div>
        <div class="aspect-square w-full overflow-hidden rounded-lg bg-slate-100">
          <img :src="activeImage" :alt="product.title" class="h-full w-full object-cover" />
        </div>
        <div v-if="product.images?.length > 1" class="mt-3 flex gap-2 overflow-x-auto">
          <button
            v-for="img in product.images"
            :key="img"
            type="button"
            class="h-16 w-16 shrink-0 overflow-hidden rounded-md border"
            :class="img === activeImage ? 'border-slate-900' : 'border-slate-200'"
            @click="activeImage = img"
          >
            <img :src="img" class="h-full w-full object-cover" />
          </button>
        </div>
      </div>

      <div>
        <h1 class="text-2xl font-bold text-slate-900">{{ product.title }}</h1>
        <p class="mt-1 text-sm text-slate-500">{{ product.category }}</p>
        <p class="mt-4 text-sm text-slate-600">{{ product.description }}</p>

        <div class="mt-4 flex items-baseline gap-2">
          <span class="text-2xl font-bold text-slate-900">${{ product.price }}</span>
          <span v-if="product.discountPercentage" class="text-sm text-emerald-600">
            -{{ product.discountPercentage }}%
          </span>
        </div>

        <dl class="mt-4 grid grid-cols-2 gap-2 text-sm">
          <dt class="text-slate-500">Rating</dt>
          <dd class="font-medium">{{ product.rating }}</dd>
          <dt class="text-slate-500">Stock</dt>
          <dd class="font-medium">{{ product.stock }}</dd>
        </dl>

        <button
          type="button"
          class="mt-6 w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          @click="favorites.toggle(product.id)"
        >
          {{ favorites.isFavorite(product.id) ? '♥ Favorite' : '♡ Add to Favorite' }}
        </button>
      </div>
    </div>
  </section>
</template>
