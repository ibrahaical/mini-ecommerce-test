import { ref, computed } from 'vue'
import { fetchProducts, fetchCategories } from '@/services/api'

export function useProducts({ pageSize = 12 } = {}) {
    const products = ref([])
    const categories = ref([])
    const total = ref(0)
    const page = ref(1)
    const search = ref('')
    const category = ref('')
    const isLoading = ref(false)
    const isError = ref(false)
    const errorMessage = ref('')
    let controller = null

    const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

    async function loadProducts() {
        controller?.abort()
        controller = new AbortController()

        isLoading.value = true
        isError.value = false
        errorMessage.value = ''

        try {
            const skip = (page.value - 1) * pageSize
            const data = await fetchProducts({
                limit: pageSize,
                skip,
                search: search.value,
                category: category.value,
                signal: controller.signal,
            })
            products.value = data.products
            total.value = data.total
        } catch (err) {
            if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return
            isError.value = true
            errorMessage.value = 'Gagal mengambil data produk.'
        } finally {
            isLoading.value = false
        }
    }

    async function loadCategories() {
        try {
            categories.value = await fetchCategories()
        } catch {
            categories.value = []
        }
    }

    function setSearch(value) {
        search.value = value
        page.value = 1
        loadProducts()
    }

    function setCategory(value) {
        category.value = value
        page.value = 1
        loadProducts()
    }

    function setPage(value) {
        page.value = value
        loadProducts()
    }

    return {
        products, categories, total, page, totalPages, search, category,
        isLoading, isError, errorMessage, loadProducts, loadCategories,
        setSearch, setCategory, setPage,
    }
}