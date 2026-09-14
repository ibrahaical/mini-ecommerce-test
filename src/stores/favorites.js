import { defineStore } from 'pinia'

const STORAGE_KEY = 'favorite-product-ids'

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        ids: loadFromStorage(),
    }),
    getters: {
        isFavorite: (state) => (id) => state.ids.includes(id),
        count: (state) => state.ids.length,
    },
    actions: {
        toggle(id) {
            const index = this.ids.indexOf(id)
            if (index === -1) {
                this.ids.push(id)
            } else {
                this.ids.splice(index, 1)
            }
            this.persist()
        },
        remove(id) {
            this.ids = this.ids.filter((favId) => favId !== id)
            this.persist()
        },
        persist() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids))
        },
    },
})