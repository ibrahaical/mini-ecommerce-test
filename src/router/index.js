import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'Home', component: () => import('@/views/ProductList.vue') },
    { path: '/products/:id', name: 'ProductDetail', component: () => import('@/views/ProductDetail.vue') },
    { path: '/favorites', name: 'Favorites', component: () => import('@/views/Favorites.vue') }
]

export default createRouter({
    history: createWebHistory(),
    routes
})