# Technical Test Frontend Developer - Vue.js

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
├── components/    # UI reusable (Card, Input, Spinner, Error/Empty State)
├── views/         # Halaman aplikasi (ProductList, Detail, Favorites, 404)
├── services/      # REST API / Axios (api.js)
├── composables/   # Logic & reactive local state (useProducts.js)
├── stores/        # Global state / Pinia (favorites.js)
└── router/        # Vue Router (index.js)
```

## Keputusan Teknis (Technical Decisions)

Pendekatan teknis yang digunakan untuk memenuhi kriteria *technical test*:

1. **Komponen & UI Reusable:** Elemen UI yang sering dipakai (Card, Input, Spinner, Error State) dipisah ke `src/components/`. Halaman utama (`src/views/`) murni fokus pada struktur *layout*.
2. **State Management:** 
   - **Global (Pinia):** Mengelola data Favorit agar reaktif di semua halaman dan tersimpan permanen di `localStorage`.
   - **Local (Composable):** Logika *fetch* produk, filter, dan pagination dibungkus dalam `useProducts.js` agar file UI tidak membengkak.
3. **REST API & Async:** Semua pemanggilan API dipusatkan di `services/api.js` menggunakan **Axios** dan `async/await`. Menerapkan `AbortController` (signal) untuk membatalkan *request* API lama jika user mengetik/mencari dengan sangat cepat (mencegah *race-condition*).
4. **Error Handling:** Memakai blok `try...catch`. Jika API gagal, aplikasi tidak akan *crash*, melainkan menampilkan komponen `<ErrorState />` dengan tombol *Retry*. Tersedia juga halaman `404 Not Found`.
5. **Struktur Project yang Scalable:** Menerapkan *Separation of Concerns*. Folder dibagi jelas sesuai fungsi (`components`, `views`, `services`, `stores`, `composables`) mengikuti standar requirement.

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
* **WebRTC P2P Text Chat** (Manual Signaling dengan Copy-Paste)

## Known Issues

1. **Filter Search & Category Tidak Bisa Digabungkan** karena keterbatasan DummyJSON API (`/products/search` dan `/products/category/{slug}` adalah endpoint terpisah). Saat ini, penggunaan search akan mereset filter kategori, dan sebaliknya.

## Penggunaan AI & Alur Pengerjaan

AI digunakan sebagai **mentor diskusi dan referensi dokumentasi**, bukan sebagai *auto-generator* kode. ChatGPT (diskusi & konsultasi), Gemini (perencanaan milestone), dan Claude (validasi milestone & struktur), kecuali pada fitur **WebRTC P2P Text Chat** yang dibangun murni dengan AI coding assistant (Antigravity). Pengerjaan requirement utama dilakukan dan diuji secara manual dengan alur *milestone*:

1. **Setup** - Inisialisasi Vue 3, Vite, Tailwind CSS, Vue Router, dan struktur folder.
2. **API & State** - Integrasi DummyJSON menggunakan Axios serta pengelolaan state dan error.
3. **Komponen** - Pembuatan komponen UI reusable seperti ProductCard, SearchInput, dan CategoryFilter.
4. **Product List** - Implementasi daftar produk, pencarian, filter, dan pagination.
5. **Detail & Favorite** - Implementasi detail produk dan sistem favorite dengan Pinia serta localStorage.
6. **Finalisasi** - Pengujian, responsive UI, dokumentasi, dan deployment ke Cloudflare Pages.

Pendekatan ini membantu memastikan setiap fitur dipahami, diimplementasikan, dan diuji secara manual.
