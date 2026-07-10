# 🌐 GoGlobal AI Content Factory

> Transform any topic or YouTube URL into viral content — powered by Claude AI. Now installable as a PWA, in ID / EN / MY.

**Live Demo:** [your-username.github.io/goglobal-ai](https://your-username.github.io/goglobal-ai)

---

## ✨ Apa ini?

GoGlobal AI Content Factory adalah tools berbasis browser yang mengubah satu topik atau URL YouTube menjadi berbagai format konten siap pakai — menggunakan Claude API secara langsung dari browser, tanpa backend, tanpa server. Sekarang bisa di-install seperti aplikasi native (PWA) dan mendukung 3 bahasa output: Indonesia, English, Melayu.

---

## 🚀 6 Mode Output

| Mode | Output |
|------|--------|
| 🔥 **Viral Analysis** | Hook, pattern storytelling, emosi dominan, 10 ide remake per niche |
| ⚡ **Shorts Generator** | 5 script YouTube Shorts siap rekam dengan 5 angle berbeda |
| 🧵 **X Thread** | 12 tweet viral terstruktur siap posting |
| 🎬 **Storyboard AI** | 10 scene + image prompt Flux/Midjourney + video prompt Veo3/Kling |
| 🛒 **Affiliate Content** | Artikel SEO + Instagram carousel + 3 variasi X post + proyeksi komisi |
| 🎥 **AI Movie Maker** | Blueprint film AI lengkap: logline, karakter, visual bible, 5 scene kunci |

Semua mode bisa di-generate dalam **Bahasa Indonesia / English / Bahasa Melayu** — tinggal pilih di language selector di topbar (ID / EN / MY), tersimpan otomatis untuk kunjungan berikutnya.

---

## 🛠 Setup

### 1. Clone atau download repo ini

```bash
git clone https://github.com/your-username/goglobal-ai.git
```

### 2. Tidak perlu install apapun

File `index.html` bisa langsung dibuka di browser. Tidak ada dependency, tidak ada build step.

### 3. Dapatkan Claude API Key

Daftar di [console.anthropic.com](https://console.anthropic.com/keys) dan buat API key baru.

### 4. Jalankan

Buka `index.html` di browser, masukkan API key di pojok kanan atas, dan langsung pakai.

> Catatan: service worker (`sw.js`) hanya aktif saat file di-serve lewat HTTP/HTTPS (misalnya `http://localhost` atau GitHub Pages) — membuka `index.html` langsung dari `file://` tidak akan meng-install PWA-nya, walau fitur generate konten tetap jalan normal.

---

## 🌍 Deploy ke GitHub Pages

1. Push semua file (`index.html`, `manifest.json`, `sw.js`, `offline.html`, `icon-192.svg`, `icon-512.svg`, `README.md`) ke GitHub
2. Buka **Settings → Pages**
3. Source: **Deploy from branch → main → / (root)**
4. Klik **Save**
5. Tunggu 1-2 menit → live di `https://your-username.github.io/goglobal-ai`

**Kalau repo kamu bukan user/org root page** (misalnya `your-username.github.io/goglobal-ai`, bukan `your-username.github.io`), situsnya live di subpath `/goglobal-ai/`, bukan di root domain `/`. `manifest.json` di sini pakai `start_url: "/"` dan `scope: "/"` sesuai default — kalau setelah deploy install prompt tidak muncul atau app terbuka ke halaman yang salah, ubah keduanya jadi relatif:

```json
"start_url": "./",
"scope": "./"
```

---

## 📱 Test PWA Install di Chrome

1. Deploy dulu ke GitHub Pages (atau jalankan lewat local server, PWA butuh HTTPS/localhost — lihat langkah di bawah)
2. Buka URL live-nya di **Chrome desktop**
3. Perhatikan ikon **install (⊕ / monitor kecil)** muncul di address bar sebelah kanan — atau tombol **"Install App"** akan muncul otomatis di topbar aplikasi
4. Klik salah satu → konfirmasi **Install**
5. App akan terbuka di window sendiri (tanpa address bar), dan muncul sebagai aplikasi terpisah di Start Menu / Applications

**Cek dari DevTools:**
- Buka **DevTools → Application tab**
- **Manifest**: pastikan nama, icon, dan warna terbaca dengan benar, tanpa error
- **Service Workers**: pastikan `sw.js` berstatus *activated and is running*
- **Cache Storage**: pastikan cache `goglobal-cache-v1` berisi `index.html`, `manifest.json`, icon, dan `offline.html`

**Test mode offline:**
1. Di DevTools → Application → Service Workers, centang **Offline**
2. Reload halaman → harusnya tetap muncul (cache-first), atau jatuh ke halaman offline sederhana kalau route belum pernah di-cache
3. Uncentang **Offline** untuk kembali normal — generate konten tetap butuh koneksi karena manggil Claude API langsung

**Test di Android (Chrome mobile):**
- Buka URL live via Chrome Android → menu ⋮ → **Add to Home screen** / banner install otomatis muncul di bawah

---

## 🔑 API Key & Keamanan

- API key dimasukkan langsung di browser
- Disimpan di **localStorage** browser kamu — tidak dikirim ke server manapun selain Anthropic
- Setiap request langsung dari browser kamu ke `api.anthropic.com`
- Untuk production dengan banyak user, disarankan menggunakan backend proxy agar API key tidak expose

---

## 💡 Tips Penggunaan

**Input tidak harus URL YouTube.** Bisa ketik topik bebas:
- `cara jualan digital produk dari nol`
- `kisah Nabi Yusuf menghadapi cobaan`
- `workflow buat app dengan Claude Code untuk pemula`
- `passive income online 2024 tanpa modal`

**Ganti bahasa output:** Klik ID / EN / MY di topbar sebelum generate — pilihan tersimpan otomatis (localStorage `gg_lang`) untuk kunjungan berikutnya.

**Shortcut keyboard:** `Ctrl + Enter` untuk langsung generate.

**Setelah generate selesai:** Gunakan tombol **Copy semua** atau **Download .txt** untuk simpan hasilnya.

---

## 🗺 Roadmap

- [ ] Integrasi Apify untuk scrape transcript YouTube asli
- [ ] History output (simpan hasil generate sebelumnya)
- [x] Multi-bahasa output (EN / ID / MY)
- [ ] Export ke Google Docs
- [ ] Mode batch (generate semua 6 mode sekaligus)
- [x] PWA (installable di mobile & desktop)

---

## 🏗 Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript — zero framework, zero dependency
- **AI:** Claude Sonnet (Anthropic API) dengan streaming
- **Hosting:** GitHub Pages (static)
- **Storage:** localStorage (API key, pilihan bahasa)
- **PWA:** `manifest.json` + `sw.js` (cache-first, offline fallback), installable di desktop & mobile

### Struktur file

```
index.html      – app utama (UI, generate logic, language selector)
manifest.json   – metadata PWA (nama, icon, warna, display mode)
sw.js           – service worker (cache-first + offline fallback)
offline.html    – halaman fallback saat offline & route belum ter-cache
icon-192.svg    – icon app 192x192 (placeholder, emoji 🌐)
icon-512.svg    – icon app 512x512 (placeholder, emoji 🌐)
README.md       – dokumentasi ini
```

---

## 📄 Lisensi

MIT License — bebas dipakai, dimodifikasi, dan didistribusikan.

---

<div align="center">
  <strong>GoGlobal AI Content Factory</strong><br>
  Built with Claude · Hosted on GitHub Pages
</div>
