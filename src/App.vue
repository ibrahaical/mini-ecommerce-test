<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'

const favorites = useFavoritesStore()
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="border-b border-slate-200 bg-white">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <RouterLink to="/" class="text-lg font-bold text-slate-900">Mini E-Commerce</RouterLink>
        <RouterLink
          to="/favorites"
          class="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ♥ Favorites
          <span v-if="favorites.count" class="rounded-full bg-slate-900 px-1.5 py-0.5 text-xs text-white">
            {{ favorites.count }}
          </span>
        </RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>
