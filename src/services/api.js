import axios from 'axios'

const http = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000,
})

export async function fetchProducts({ limit = 12, skip = 0, search = '', category = '', signal } = {}) {
    let url = '/products'

    if (search) {
        url = '/products/search'
    } else if (category) {
        url = `/products/category/${encodeURIComponent(category)}`
    }

    const { data } = await http.get(url, {
        params: { limit, skip, ...(search ? { q: search } : {}) },
        signal,
    })

    return data
}

export async function fetchProductById(id, { signal } = {}) {
    const { data } = await http.get(`/products/${id}`, { signal })
    return data
}

export async function fetchCategories({ signal } = {}) {
    const { data } = await http.get('/products/categories', { signal })
    return data
}

export default http