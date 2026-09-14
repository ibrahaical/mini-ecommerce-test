<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import P2PChat from '@/components/P2PChat.vue'

const favorites = useFavoritesStore()
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <header class="border-b border-neutral-200 bg-white">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <RouterLink to="/" class="text-lg font-semibold text-neutral-800">MiniStore.</RouterLink>
        <RouterLink
          to="/favorites"
          class="flex items-center gap-1 text-sm font-medium text-neutral-800 hover:text-neutral-900"
        >
          ♥ Favorites
          <span v-if="favorites.count" class="rounded-full bg-neutral-800 px-1.5 py-0.5 text-xs text-white">
            {{ favorites.count }}
          </span>
        </RouterLink>
      </nav>
    </header>

    <main class="pb-24">
      <RouterView />
    </main>

    <P2PChat />
  </div>
</template>
