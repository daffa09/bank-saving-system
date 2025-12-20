<!-- portfolio -->
<!-- slug: bank-saving-system -->
<!-- title: Sistem Simpanan Bank -->
<!-- description: Sistem manajemen akun deposito modern dengan perhitungan bunga otomatis -->
<!-- image: https://github.com/user-attachments/assets/5fda74e9-1582-4a75-86a1-45e09c404ff0 -->
<!-- tags: react, nodejs, express, postgresql, tailwindcss, shadcn-ui, deposito, perbankan -->

# 1. 🏦 Sistem Simpanan Bank

Sistem manajemen akun deposito modern yang dibangun dengan React, Node.js, Express, dan PostgreSQL. Menampilkan perhitungan bunga otomatis, arsitektur bersih, dan UI yang cantik dengan shadcn/ui.

<img width="1218" height="669" alt="image" src="https://github.com/user-attachments/assets/5fda74e9-1582-4a75-86a1-45e09c404ff0" />

## ✨ Fitur

### 🎯 Fungsionalitas Inti
- **Manajemen Pelanggan** - Membuat, memperbarui, dan mengelola profil pelanggan.
- **Tipe Deposito** - Mengonfigurasi berbagai paket deposito dengan suku bunga yang berbeda.
- **Manajemen Akun** - Membuka dan mengelola akun deposito dengan penautan pelanggan.
- **Transaksi Cerdas** - Pemrosesan setoran dan penarikan otomatis dengan perhitungan bunga.
- **Perhitungan Bunga** - Perhitungan otomatis berdasarkan durasi dan tingkat pengembalian bulanan.

### 💎 Sorotan Teknis
- **Arsitektur Bersih** - Pemisahan lapisan (routes → controllers → services).
- **UI Modern** - Dibangun dengan React, Tailwind CSS, dan komponen shadcn/ui.
- **API Type-Safe** - API RESTful dengan middleware validasi.
- **Keamanan Transaksi** - Transaksi PostgreSQL dengan penguncian tingkat baris (row-level locking).
- **Desain Responsif** - Berjalan mulus di perangkat desktop dan seluler.

## 📸 Cuplikan Layar

### Dashboard
![Dashboard Overview](./docs/screenshots/dashboard.png)
*Gambaran umum statistik dengan total pelanggan, akun, dan saldo.*

### Manajemen Pelanggan
![Customers Page](./docs/screenshots/customers.png)
*Operasi CRUD untuk manajemen pelanggan dengan formulir dialog.*

### Tipe Deposito
![Deposito Types](./docs/screenshots/deposito-types.png)
*Konfigurasi paket deposito dengan suku bunga berbeda.*

### Manajemen Akun
![Accounts](./docs/screenshots/accounts.png)
*Melihat dan mengelola akun pelanggan dengan pelacakan saldo.*

### Transaksi
![Transactions](./docs/screenshots/transactions.png)
*Memproses setoran dan penarikan dengan perhitungan bunga otomatis.*

## 2. 🏗️ Arsitektur

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                     │
│  React Router │ shadcn/ui │ Tailwind CSS │ Lucide Icons │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/JSON REST API
┌────────────────────┴────────────────────────────────────┐
│                  Backend (Node.js/Express)               │
│  Routes → Controllers → Services → Database              │
└────────────────────┬────────────────────────────────────┘
                     │ SQL Queries
┌────────────────────┴────────────────────────────────────┐
│                  Database (PostgreSQL)                   │
│  customers │ deposito_types │ accounts │ transactions    │
└─────────────────────────────────────────────────────────┘
```

### Struktur Backend
```
backend/src/
├── config/          # Konfigurasi database
├── utils/           # Fungsi pembantu (tanggal, hitung bunga)
├── middleware/      # Validasi & penanganan kesalahan
├── services/        # Lapisan logika bisnis
├── controllers/     # Penangan permintaan HTTP
├── routes/          # Definisi endpoint API
└── index.js         # Titik masuk server
```

### Struktur Frontend
```
frontend/src/
├── components/
│   ├── ui/          # Komponen dasar shadcn/ui
│   └── layout/      # Komponen tata letak (Sidebar, AppLayout)
├── pages/           # Komponen halaman (Dashboard, Customers, dll.)
├── lib/             # Utilitas
├── api.js           # Klien API
└── App.jsx          # Pengaturan Router
```

## 3. 🚀 Memulai Cepat

### Prasyarat
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Instalasi

1. **Clone repositori**
```bash
git clone https://github.com/daffa09/bank-saving-system.git
cd bank-saving-system
```

2. **Setup Database**
```bash
# Buat database PostgreSQL
createdb bank_saving_system

# Jalankan skema (lihat docs/DATABASE_DESIGN.md untuk SQL)
psql bank_saving_system < schema.sql
```

3. **Setup Backend**
```bash
cd backend
npm install

# Buat file .env
echo "DATABASE_URL=postgresql://user:password@localhost:5432/bank_saving_system" > .env
echo "PORT=5000" >> .env

# Jalankan server backend
npm run dev
```

4. **Setup Frontend**
```bash
cd frontend
npm install

# Install dependensi yang diperlukan
npm install react-router-dom lucide-react class-variance-authority clsx tailwind-merge sonner date-fns
npm install @radix-ui/react-dialog
npm install -D tailwindcss@3 postcss autoprefixer

# Jalankan server pengembangan frontend
npm run dev
```

5. **Akses aplikasi**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## 4. 🐳 Deployment Docker

### Mulai Cepat dengan Docker

**Backend:**
```bash
cd backend
docker build -t bank-system-backend .
docker run -p 5000:5000 -e DATABASE_URL=postgresql://user:pass@host:5432/db bank-system-backend
```

**Frontend:**
```bash
cd frontend
docker build -t bank-system-frontend .
docker run -p 3000:3000 bank-system-frontend
```

Untuk detail pengaturan Docker, variabel lingkungan, dan konfigurasi Docker Compose, lihat [DOCKER.md](./DOCKER.md).

## 5. 📚 Dokumentasi

Dokumentasi komprehensif tersedia di folder `docs/`:

- **[Desain Database](./docs/DATABASE_DESIGN.md)** - ERD, skema, relasi.
- **[Dokumentasi API](./docs/API_DOCUMENTATION.md)** - Semua endpoint dengan contoh.
- **[Diagram UML](./docs/UML_DIAGRAMS.md)** - Diagram Class, sequence, use case.
- **[User Journey](./docs/USER_JOURNEY.md)** - Alur pengguna dan wireframe.
- **[Koleksi Postman](./docs/Bank_Saving_System_API.postman_collection.json)** - Tes API siap impor.
- **[API Blueprint (Apiary)](./docs/apiary.apib)** - Format dokumentasi API online.

### Dokumentasi API Online
Lihat dokumentasi API secara online: [Dokumentasi Apiary](https://bankapi.docs.apiary.io/)

## 6. 🔌 Endpoint API

### URL Dasar: `http://localhost:5000`

| Metode | Endpoint | Deskripsi |
|--------|----------|-------------|
| GET | `/health` | Pemeriksaan kesehatan |
| GET | `/customers` | Mendapatkan semua pelanggan |
| POST | `/customers` | Membuat pelanggan |
| PUT | `/customers/:id` | Memperbarui pelanggan |
| DELETE | `/customers/:id` | Menghapus pelanggan |
| GET | `/deposito-types` | Mendapatkan semua tipe deposito |
| POST | `/deposito-types` | Membuat tipe deposito |
| PUT | `/deposito-types/:id` | Memperbarui tipe deposito |
| DELETE | `/deposito-types/:id` | Menghapus tipe deposito |
| GET | `/accounts` | Mendapatkan semua akun |
| POST | `/accounts` | Membuat akun |
| PUT | `/accounts/:id` | Memperbarui akun |
| DELETE | `/accounts/:id` | Menghapus akun |
| POST | `/accounts/:id/deposit` | Menyetor uang |
| POST | `/accounts/:id/withdraw` | Menarik dengan bunga |

## 7. 💰 Perhitungan Bunga

Sistem menghitung bunga menggunakan rumus berikut:

```javascript
bulan = selisihBulan(tanggal_buka, tanggal_penarikan)
pengembalian_bulanan = pengembalian_tahunan / 12 / 100
bunga = saldo × bulan × pengembalian_bulanan
saldo_akhir = saldo + bunga
```

**Contoh:**
- Saldo Awal: Rp 10.000.000
- Pengembalian Tahunan: 6%
- Durasi: 12 bulan
- **Bunga yang Didapat**: Rp 600.000
- **Total Pembayaran**: Rp 10.600.000

## 8. 🛠️ Tech Stack

### Frontend
- **React 19** - Library UI.
- **React Router** - Navigasi.
- **Tailwind CSS** - CSS utility-first.
- **shadcn/ui** - Library komponen.
- **Lucide React** - Ikon.
- **Sonner** - Notifikasi toast.
- **Vite** - Alat build.

### Backend
- **Node.js** - Runtime.
- **Express.js** - Framework web.
- **PostgreSQL** - Database.
- **pg** - Klien PostgreSQL.
- **dotenv** - Variabel lingkungan.
- **cors** - Middleware CORS.

### Alat Pengembangan
- **ESLint** - Linting kode.
- **Postman** - Pengujian API.
- **Git** - Kontrol versi.

## 9. 📊 Skema Database

```sql
customers
├── id (PK)
└── name

deposito_types
├── id (PK)
├── name
└── yearly_return

accounts
├── id (PK)
├── packet
├── customer_id (FK → customers)
├── deposito_type_id (FK → deposito_types)
├── balance
└── opened_at

transactions
├── id (PK)
├── account_id (FK → accounts)
├── type (DEPOSIT/WITHDRAW)
├── amount
└── created_at
```

## 10. 🎨 Komponen UI

Aplikasi menggunakan komponen shadcn/ui untuk antarmuka yang konsisten dan modern:

- **Button** - Tindakan utama dengan varian.
- **Card** - Wadah konten.
- **Dialog** - Formulir modal.
- **Input** - Input formulir dengan validasi.
- **Table** - Tampilan data.
- **Badge** - Indikator status.
- **Toast** - Notifikasi.
- **Select** - Dropdown.

## 11. 🔒 Fitur Keamanan

- Pencegahan injeksi SQL melalui query berparameter.
- Penguncian tingkat baris untuk keamanan transaksi.
- Middleware validasi input.
- Penanganan kesalahan dengan respons yang disanitasi.
- Konfigurasi CORS.

## 12. 🚦 Pengujian

### Pengujian Manual
1. Impor koleksi Postman dari `docs/Bank_Saving_System_API.postman_collection.json`.
2. Atur variabel lingkungan `base_url` ke `http://localhost:5000`.
3. Jalankan permintaan secara berurutan:
   - Buat pelanggan.
   - Buat tipe deposito.
   - Buat akun.
   - Proses transaksi.

### Skenario Pengujian
- Buat pelanggan → Buka akun → Setor → Tarik.
- Beberapa setoran ke akun yang sama.
- Verifikasi perhitungan bunga penarikan.
- Hapus cascade (pelanggan dengan akun).

## 13. 📈 Peningkatan Masa Depan

- [ ] Autentikasi & otorisasi pengguna.
- [ ] Tampilan riwayat transaksi.
- [ ] Ekspor laporan (PDF/Excel).
- [ ] Notifikasi email.
- [ ] Pelacakan riwayat suku bunga.
- [ ] Aplikasi seluler (React Native).
- [ ] Tes otomatis (Jest, Cypress).
- [ ] Kontainerisasi Docker.
- [ ] Pipeline CI/CD.

## 14. 🤝 Kontribusi

Kontribusi sangat diterima! Silakan ikuti langkah-langkah ini:

1. Fork repositori.
2. Buat branch fitur (`git checkout -b feature/FiturLuarBiasa`).
3. Commit perubahan Anda (`git commit -m 'Menambah FiturLuarBiasa'`).
4. Push ke branch tersebut (`git push origin feature/FiturLuarBiasa`).
5. Buka Pull Request.

## 15. 📝 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detailnya.

## 16. 👨‍💻 Penulis

**Daffa Fathan**
- GitHub: [@daffa09](https://github.com/daffa09)
- LinkedIn: [Daffa Fathan](https://linkedin.com/in/daffa-fathan)

## 17. 🌟 Ucapan Terima Kasih

- [shadcn/ui](https://ui.shadcn.com/) - Library komponen yang luar biasa.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first.
- [Lucide Icons](https://lucide.dev/) - Set ikon yang cantik.
- [Radix UI](https://www.radix-ui.com/) - Komponen aksesibel tanpa gaya.

---
