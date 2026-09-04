# 🌳 Kawal RTH Pekanbaru

![ITechno Cup 2026](https://img.shields.io/badge/ITechno_Cup-2026-blue?style=flat-square)
![Kategori](https://img.shields.io/badge/Kategori-Web_Development-green?style=flat-square)
![SDG 11](https://img.shields.io/badge/SDG-11_Kota_&_Komunitas_Berkelanjutan-orange?style=flat-square)

**Kawal RTH Pekanbaru** adalah solusi digital partisipatif yang menggabungkan direktori Ruang Terbuka Hijau (RTH), sistem pelaporan kondisi taman, dan sistem reservasi kegiatan komunitas secara terintegrasi. 

🔗 **Live Preview:** [rth-rekreasi-pku.netlify.app](https://rth-rekreasi-pku.netlify.app/)

---

##  Penjelasan Aplikasi
### Latar Belakang
Pemerintah Kota Pekanbaru saat ini tengah memperkuat program *Green City* dengan mewajibkan pengembang menyediakan 30% Ruang Terbuka Hijau (RTH) di setiap proyek. Namun, berdasarkan riset akademik, ketersediaan RTH di Pekanbaru secara historis masih berada di bawah kebutuhan ideal. Di sisi lain, masyarakat belum memiliki sarana yang mudah untuk melaporkan RTH atau taman yang terbengkalai. Selain itu, pemanfaatan RTH untuk kegiatan komunitas (seperti senam pagi, gotong royong, atau acara RT) belum terkoordinasi dengan baik secara digital.

### Tujuan
Aplikasi ini dibuat untuk menjadi **lapisan aksi (action layer)** bagi masyarakat Pekanbaru, bukan sekadar peta informasi. Tujuannya adalah memberdayakan warga untuk ikut serta merawat RTH melalui sistem pelaporan kondisi fasilitas, serta memaksimalkan penggunaan RTH sebagai ruang inklusif melalui sistem reservasi yang tertib dan terintegrasi.

---

##  Fitur Utama (Keunggulan)
1. **Sistem Lapor Kondisi RTH (Ticketing):** Warga dapat melaporkan kerusakan atau kondisi taman yang terbengkalai dengan menyertakan foto dan deskripsi. Laporan dapat dipantau statusnya (Baru → Diproses → Selesai).
2. **Sistem Reservasi Cerdas:** Warga dapat mengajukan penggunaan taman untuk kegiatan komunitas. Sistem ini unggul karena dilengkapi dengan algoritma pengecekan konflik jadwal otomatis untuk mencegah bentrok acara di taman dan waktu yang sama.
3. **Direktori RTH Terintegrasi:** Daftar RTH di Pekanbaru yang mencakup informasi operasional, fasilitas, dan kondisi terkini dalam bentuk direktori kartu yang mudah diakses.
4. **Dashboard Admin Tersentralisasi:** Panel khusus pengelola untuk memverifikasi dan mengubah status laporan warga, menyetujui (*approve/reject*) reservasi, serta mengelola data taman.

---

##  Teknologi yang Digunakan
Aplikasi ini dibangun menggunakan *stack* modern untuk memastikan performa yang cepat, dan sesuai dengan syarat kompetisi:

* **Next.js (App Router):** Digunakan sebagai framework utama untuk membangun antarmuka pengguna (Frontend) sekaligus menangani logika *Server-Side* dan API Routes. Framework ini dipilih karena memiliki dokumentasi yang baik dan komunitas yang luas.
* **Supabase:** Digunakan sebagai *Backend-as-a-Service* (BaaS) yang menangani Autentikasi Admin, menyediakan database relasional (PostgreSQL) untuk menyimpan data (taman, laporan, reservasi), serta fitur *Storage* untuk menyimpan unggahan foto laporan warga.
* **Tailwind CSS:** Framework CSS *utility-first* yang peruntukannya adalah mempercepat proses *styling* antarmuka (UI) agar responsif di berbagai perangkat (HP/Desktop) dengan rapi tanpa CSS yang kompleks.
* **Netlify / Vercel:** Platform *hosting* yang digunakan untuk men-*deploy* aplikasi agar dapat diakses secara *live* melalui internet dengan CI/CD yang terhubung langsung ke GitHub.

---

## ⚙️ Cara Instalasi
Berikut adalah langkah-langkah yang harus dilakukan untuk melakukan *set-up* aplikasi di komputer lokal:

1. **Clone repositori dari GitHub:**
   ```bash
   git clone https://github.com/username-github-kamu/kawal-rth-pekanbaru.git
   cd kawal-rth-pekanbaru 
   ```

2. **Instalasi Dependensi**
Pastikan Node.js sudah terpasang di perangkat Anda, lalu jalankan perintah berikut di terminal VS Code:

```bash
npm run dev
```

3. **Konfigurasi Environment Variables:**
   Buat file bernama .env.local pada root directory proyek, lalu masukkan konfigurasi Supabase Anda:
   ```
   NEXT_PUBLIC_SUPABASE_URL=url_project_supabase_kamu
   NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_key_supabase_kamu

4. **Menjalankan Server Pengembangan:**
Jalankan perintah berikut untuk mengaktifkan mode development:
```Bash
   npm run dev
```
Aplikasi akan berjalan dalam mode pengembangan (*development*). Buka *browser* dan akses aplikasi melalui:
👉 **[http://localhost:3000](http://localhost:3000)**

**Panduan Penggunaan Singkat:**
- **Warga (Publik):** Buka halaman utama, masuk ke menu direktori taman. Pilih taman yang diinginkan, lalu isi form untuk **"Buat Laporan"** (jika ada masalah di taman) atau form **"Reservasi"** (jika ingin menggunakan taman).
- **Admin:** Buka *path* `/admin/login` di browser, masuk menggunakan akun pengelola. Melalui dashboard, admin dapat mengelola ketersediaan taman, mengubah status pelaporan (misal: "Baru" menjadi "Diproses"), dan menerima/menolak pengajuan reservasi dari warga.
