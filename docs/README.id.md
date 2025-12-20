# Dokumentasi Sistem - Bank Saving System

Folder ini berisi dokumentasi komprehensif untuk proyek Bank Saving System (Sistem Simpanan Bank).

## Dokumen

### 1. [Desain Database](DATABASE_DESIGN.md)
Dokumentasi skema database lengkap, termasuk:
- Entity Relationship Diagram (ERD).
- Spesifikasi tabel dengan semua kolom dan batasan (constraints).
- Hubungan dan foreign keys.
- Skrip SQL pengaturan database.
- Contoh kueri.

### 2. [Dokumentasi API](API_DOCUMENTATION.md)
Spesifikasi lengkap REST API:
- Semua endpoint dengan contoh permintaan/respons.
- Aturan validasi.
- Penanganan error.
- Deskripsi logika bisnis.
- Panggilan API per layar.

### 3. [Diagram UML](UML_DIAGRAMS.md)
Diagram UML yang komprehensif:
- Diagram Kelas (arsitektur backend).
- Diagram Use Case.
- Diagram Sequence (alur setoran & penarikan).
- Diagram Activity (pembuatan akun).
- Diagram Component (arsitektur sistem).
- Diagram State (siklus hidup akun).
- Diagram Deployment.

### 4. [User Journey & Flow](USER_JOURNEY.md)
Dokumentasi pengalaman pengguna:
- Persona pengguna.
- Peta perjalanan pengguna (user journey maps).
- Diagram alur aplikasi.
- Wireframe layar.
- Interaksi utama pengguna.

### 5. [Koleksi Postman](Bank_Saving_System_API.postman_collection.json)
Koleksi Postman yang siap diimpor:
- Semua endpoint API.
- Contoh permintaan dengan data sampel.
- Variabel lingkungan.

## Memulai Cepat (Quick Start)

### Impor Koleksi Postman
1. Buka Postman.
2. Klik "Import".
3. Pilih `Bank_Saving_System_API.postman_collection.json`.
4. Koleksi akan diimpor dengan semua endpoint yang siap diuji.

## Ringkasan Skema Database

- **customers**: Menyimpan data nasabah.
- **deposito_types**: Jenis deposito dan bunga tahunannya.
- **accounts**: Akun simpanan yang menghubungkan nasabah dengan jenis deposito.
- **transactions**: Catatan transaksi setoran (deposit) dan penarikan (withdrawal).

## Rumus Utama

### Perhitungan Bunga
```javascript
bulan = selisihBulan(tanggal_buka, tanggal_penarikan)
bunga_bulanan = bunga_tahunan / 12 / 100
bunga = saldo × bulan × bunga_bulanan
saldo_akhir = saldo + bunga
```

## Arsitektur Sistem

```
Frontend (React + shadcn/ui)
    ↓ REST API (HTTP/JSON)
Backend (Express.js)
    ├── Routes → Controllers → Services
    └── Database Connection Pool
          ↓
Database (PostgreSQL)
```

---

**Sistem Simpanan Bank** 🏦💰  
Dokumentasi Lengkap untuk Pengembangan dan Pengujian!
