import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'product-list',
        component: () => import('@/views/ProductList.vue'),
    },
    {
        path: '/products/:id',
        name: 'product-detail',
        component: () => import('@/views/ProductDetail.vue'),
        props: true,
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: () => import('@/views/Favorites.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFound.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
