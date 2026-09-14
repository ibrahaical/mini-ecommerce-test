import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'product-list',
        component: () => import('@/views/ProductList.vue'),
        meta: { title: 'Discover Products — Mini E-Commerce' },
    },
    {
        path: '/products/:id',
        name: 'product-detail',
        component: () => import('@/views/ProductDetail.vue'),
        props: true,
        // Judul dinamis diatur langsung dari dalam komponen ProductDetail
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: () => import('@/views/Favorites.vue'),
        meta: { title: 'Favorites — Mini E-Commerce' },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFound.vue'),
        meta: { title: 'Halaman Tidak Ditemukan — Mini E-Commerce' },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

// Set document.title otomatis berdasarkan meta.title tiap route
router.afterEach((to) => {
    if (to.meta?.title) {
        document.title = to.meta.title
    }
})

export default router
