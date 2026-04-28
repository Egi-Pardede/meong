# Panduan Deploy MEONG Project

## 1. Setup Supabase (Database)

1. Daftar gratis di https://supabase.com
2. Buat project baru (nama bebas, misal "meong-project")
3. Buka **SQL Editor** di dashboard Supabase
4. Copy seluruh isi file `supabase/schema.sql` → paste → klik Run
5. Buka **Settings → API**, copy:
   - `Project URL` → simpan sebagai `VITE_SUPABASE_URL`
   - `anon public key` → simpan sebagai `VITE_SUPABASE_ANON_KEY`

## 2. Setup Netlify (Hosting)

### Cara A: Drag & Drop (paling mudah)
1. Jalankan `npm run build` di folder project
2. Folder `dist/` akan terbuat
3. Buka https://app.netlify.com → Sites → drag folder `dist/` ke area upload
4. Site langsung live! Salin URL-nya.

### Cara B: GitHub + Netlify (recommended untuk update otomatis)
1. Upload project ke GitHub (buat repo baru, push semua file)
2. Buka https://app.netlify.com → Add new site → Import from Git
3. Pilih repo, set:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Klik Deploy

### Tambahkan Environment Variables di Netlify
1. Netlify → site kamu → Site settings → Environment variables
2. Tambahkan:
   - `VITE_SUPABASE_URL` = URL dari Supabase
   - `VITE_SUPABASE_ANON_KEY` = anon key dari Supabase
3. Re-deploy (Deploys → Trigger deploy)

## 3. Tambahkan QR Code QRIS

1. Simpan gambar QRIS kamu sebagai file, misal `qris.jpg`
2. Copy file tersebut ke folder `public/`
3. Edit `src/pages/Donasi.tsx` bagian `{/* QR Code area */}`, ganti dengan:
```jsx
<img src="/qris.jpg" alt="QRIS MEONG Project" className="w-48 h-48 object-contain" />
```

## 4. Tanpa Supabase (Mode Demo)

Jika tidak setup Supabase, app tetap berjalan menggunakan **localStorage**.
Data forum, donasi, dan adopt tersimpan di browser masing-masing user.
Cocok untuk demo/presentasi.

## Custom Domain (opsional)
Di Netlify → Domain settings → Add domain → ikuti petunjuknya.
Domain gratis dari Netlify: `nama-anda.netlify.app`
