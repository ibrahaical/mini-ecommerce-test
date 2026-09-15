# Technical Test Frontend Developer - Vue.js

**Candidate:** Falachul Akhadihima Ibrahaical
**Position:** Frontend Developer

Aplikasi SPA katalog produk e-commerce menggunakan **Vue 3, Vite, Tailwind CSS v4**, dan **DummyJSON API**. Dibuat untuk Technical Test Frontend Developer dengan fokus pada clean code, separation of concerns, dan struktur aplikasi yang scalable.

**Live Demo:** https://miniecommerce.pages.dev

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
* **WebRTC API** - Native P2P Communication
* **Thunder Client** - API Testing & Exploration

## Status Fitur

### Fitur yang Berhasil Diselesaikan
* Daftar produk dari DummyJSON API
* Search dengan debounce
* Filter berdasarkan kategori
* Detail produk `/products/:id`
* Galeri gambar produk
* Pagination Previous/Next
* Favorite dengan `localStorage`
* Loading spinner, error, dan empty state
* Responsive Mobile, Tablet, dan Desktop
* SPA routing dengan Vue Router
* **Bonus:** WebRTC P2P Text Chat (Manual Signaling dengan Copy-Paste).
* **Bonus:** Standar Accessibility (A11y) untuk dukungan Screen Reader & Keyboard Navigation.

### Fitur yang Belum Diselesaikan (Optional Bonus)
Beberapa poin *bonus tambahan* dari soal belum diimplementasikan pada versi ini untuk berfokus pada stabilitas fitur utama. Fitur yang belum diselesaikan, antara lain:
* WebRTC Video/Audio Call (Camera/Mic toggle)
* Integrasi TypeScript
* Unit Test
* Skeleton Loading (Saat ini menggunakan Loading Spinner biasa)
* Docker

## Manual Testing (Blackbox)

Seluruh fitur telah melewati proses pengujian manual untuk memastikan aplikasi berjalan sesuai dengan *requirement* dan siap digunakan di *production*.

| Skenario Pengujian | Hasil yang Diharapkan | Status |
|---|---|:---:|
| **Koneksi API (Product List)** | Memuat halaman utama, menampilkan *Loading Spinner*, lalu merender daftar produk dengan benar. | ✅ Pass |
| **Simulasi API Error** | Mengganti URL API dengan URL yang salah, aplikasi tidak *crash* dan berhasil menampilkan UI `<ErrorState>` beserta tombol **Coba Lagi**. | ✅ Pass |
| **Empty State (Pencarian)** | Mengetik kata kunci acak (misal: "zxcasdqwe"), aplikasi menampilkan UI `<EmptyState>` "Produk tidak ditemukan". | ✅ Pass |
| **Search Debounce** | Mengetik dengan cepat tidak langsung memicu API, request dikirim setelah jeda berhenti mengetik (menghemat *bandwidth*). | ✅ Pass |
| **Category Filter** | Memilih kategori dari *dropdown* berhasil mengubah daftar produk sesuai kategori terkait. | ✅ Pass |
| **Product Detail & Gallery** | Mengklik produk masuk ke halaman detail. Mengklik *thumbnail* gambar berhasil merubah gambar utama tanpa nge-freeze. | ✅ Pass |
| **Pagination** | Mengklik tombol *Next*, berpindah ke halaman 2. Tombol *Previous* otomatis *disabled* saat di halaman 1. | ✅ Pass |
| **Toggle Favorite** | Mengklik tombol `♡` mengubah warna tombol dan mengupdate *badge counter* di Navbar secara *real-time*. | ✅ Pass |
| **Data Persisten (LocalStorage)** | Menambahkan produk ke Favorite, melakukan *refresh* browser, produk tetap ada di halaman `/favorites`. | ✅ Pass |
| **Halaman Favorite Kosong** | Menghapus semua produk dari Favorite, halaman memunculkan pesan "Belum ada produk tersimpan" (Empty State). | ✅ Pass |
| **WebRTC P2P Chat (Bonus)** | Menghubungkan 2 browser berbeda via pertukaran *Offer/Answer*, memastikan status "Connected", dan pesan teks berhasil terkirim secara *real-time*. | ✅ Pass |
| **Responsivitas Layar** | Mengubah ukuran layar (Desktop, Tablet, Mobile), memastikan layout *grid*, navigasi, dan galeri menyesuaikan dengan rapi tanpa ada elemen yang rusak atau *overflow*. | ✅ Pass |

## Known Issues

1. **Filter Search & Category Tidak Bisa Digabungkan** karena keterbatasan DummyJSON API (`/products/search` dan `/products/category/{slug}` adalah endpoint terpisah). Saat ini, penggunaan search akan mereset filter kategori, dan sebaliknya.
2. **WebRTC P2P Chat Ter-reset di Mobile:** Saat berpindah aplikasi di HP (misal ke WhatsApp untuk menyalin kode), OS sering melakukan *refresh* paksa pada tab browser untuk menghemat RAM. Karena koneksi WebRTC murni berjalan di RAM (tidak bisa di-save ke `localStorage`), proses *refresh* ini akan menghancurkan koneksi dan mereset chat termasuk pada saat copy/paste offer dan answer.
3. **Keterbatasan Jaringan WebRTC:** Chat bisa digunakan antar jaringan berbeda (misal 4G dan WiFi) karena sudah dikonfigurasi menggunakan *STUN Server* publik milik Google. Namun, koneksi akan **gagal** jika salah satu pengguna menggunakan jaringan kantor/publik dengan *Firewall (Symmetric NAT)* yang ketat (karena butuh *TURN Server* berbayar).

## Penggunaan AI & Alur Pengerjaan

AI digunakan sebagai **mentor diskusi dan referensi dokumentasi**, bukan sebagai *auto-generator* kode. ChatGPT (diskusi & konsultasi), Gemini (perencanaan milestone), dan Claude (validasi milestone & struktur), kecuali pada fitur **WebRTC P2P Text Chat** yang dibangun murni dengan AI coding assistant (Antigravity). Pengerjaan requirement utama dilakukan dan diuji secara manual dengan alur *milestone*:

1. **API Testing** - Menganalisa struktur dan *behavior* response DummyJSON menggunakan **Thunder Client** sebelum menulis kode.
2. **Setup** - Inisialisasi Vue 3, Vite, Tailwind CSS, Vue Router, dan struktur folder.
3. **API & State** - Integrasi Axios, pembuatan *composable*, serta pengelolaan *state* dan *error*.
4. **Komponen** - Pembuatan komponen UI reusable seperti ProductCard, SearchInput, dan CategoryFilter.
5. **Product List** - Implementasi daftar produk, pencarian, filter, dan pagination.
6. **Detail & Favorite** - Implementasi detail produk dan sistem favorite dengan Pinia serta localStorage.
7. **Finalisasi** - Pengujian, responsive UI, dokumentasi, dan deployment ke Cloudflare Pages.

Pendekatan ini membantu memastikan setiap fitur dipahami, diimplementasikan, dan diuji secara manual.
