# Technical Test Frontend Developer — Vue.js

**Candidate:** Falachul Akhadihima Ibrahaical
**Position:** Frontend Developer

Aplikasi SPA katalog produk e-commerce menggunakan **Vue 3, Vite, Tailwind CSS v4**, dan **DummyJSON API**. Dibuat untuk Technical Test Frontend Developer dengan fokus pada clean code, separation of concerns, dan struktur aplikasi yang scalable.

**Live Demo:** https://mini-ecommerce.pages.dev

## Installation

```bash
npm install
npm run dev
```

Untuk production:

```bash
npm run build
```

## Struktur

```text
src/
├── components/    # UI reusable
├── views/         # Halaman aplikasi
├── services/      # REST API / Axios
├── composables/   # Logic & reactive state
├── stores/        # Global state / Pinia
└── router/        # Vue Router
```

## Tech Stack

* **Vue 3** - Composition API
* **Vite** - Build tool
* **Vue Router** - SPA routing
* **Pinia** - State management
* **Axios** - HTTP client
* **Tailwind CSS v4** - Responsive styling
* **DummyJSON** - Product REST API

## Fitur

* Daftar produk dari DummyJSON API
* Search dengan debounce
* Filter berdasarkan kategori
* Detail produk `/products/:id`
* Galeri gambar produk
* Pagination Previous/Next
* Favorite dengan `localStorage`
* Loading, error, dan empty state
* Responsive Mobile, Tablet, dan Desktop
* SPA routing dengan Vue Router

## Known Issues

1. **WebRTC P2P Chat** belum diimplementasikan agar fokus pada stabilitas fitur utama dan kualitas struktur aplikasi.
2. **Filter Search & Category Tidak Bisa Digabungkan** karena keterbatasan DummyJSON API (`/products/search` dan `/products/category/{slug}` adalah endpoint terpisah). Saat ini, penggunaan search akan mereset filter kategori, dan sebaliknya.

## Penggunaan AI & Alur Pengerjaan

AI digunakan sebagai **mentor diskusi dan referensi dokumentasi**, bukan sebagai *auto-generator* kode. ChatGPT (diskusi & konsultasi), Gemini (perencanaan milestone), dan Claude (validasi milestone & struktur).. Pengerjaan dilakukan dan diuji secara manual dengan alur *milestone*:

1. **Setup** - Inisialisasi Vue 3, Vite, Tailwind CSS, Vue Router, dan struktur folder.
2. **API & State** - Integrasi DummyJSON menggunakan Axios serta pengelolaan state dan error.
3. **Komponen** - Pembuatan komponen UI reusable seperti ProductCard, SearchInput, dan CategoryFilter.
4. **Product List** - Implementasi daftar produk, pencarian, filter, dan pagination.
5. **Detail & Favorite** - Implementasi detail produk dan sistem favorite dengan Pinia serta localStorage.
6. **Finalisasi** - Pengujian, responsive UI, dokumentasi, dan deployment ke Cloudflare Pages.

Pendekatan ini membantu memastikan setiap fitur dipahami, diimplementasikan, dan diuji secara manual.
