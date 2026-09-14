<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <nav class="bg-white shadow-sm sticky top-0 z-10 px-4 py-4 flex justify-between items-center max-w-6xl mx-auto">
      <router-link to="/" class="text-xl font-bold text-slate-900">Mini E-Commerce</router-link>
      <div class="space-x-4">
        <router-link to="/" class="hover:text-blue-600 font-medium">Products</router-link>
        <router-link to="/favorites" class="hover:text-blue-600 font-medium">Favorites</router-link>
      </div>
    </nav>
    <main class="container mx-auto px-4 py-8 max-w-6xl">
      <router-view></router-view>
    </main>
  </div>
</template>