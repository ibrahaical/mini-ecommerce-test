import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'product-list',
        component: () => import('@/views/ProductList.vue'),
        meta: { title: 'Discover Products - MiniStore.' },
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
        meta: { title: 'Favorites - MiniStore.' },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFound.vue'),
        meta: { title: 'Halaman Tidak Ditemukan - MiniStore.' },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

router.afterEach((to) => {
    if (to.meta?.title) {
        document.title = to.meta.title
    }
})

export default router
