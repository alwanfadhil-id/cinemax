# 🎬 CineMax - Movie Seat Booking System

**Interactive movie booking interface** — Demo aplikasi pemilihan kursi bioskop secara real-time dengan desain modern dan user-friendly.

> 🎯 **Project ini adalah frontend demo** yang menampilkan user flow lengkap dari pemilihan kursi hingga konfirmasi pembayaran. Siap dikembangkan menjadi aplikasi booking penuh sesuai kebutuhan bisnis Anda.

---

## 🖥️ Live Demo

**Lihat langsung:** [Deploy your demo link here]

**Repository:** [github.com/alwanfadhil-id/cinemax](https://github.com/alwanfadhil-id/cinemax)

---

## ✨ Fitur yang Sudah Tersedia

### 🎟️ Core Booking Flow

| Fitur                           | Status   | Deskripsi                                                             |
| ------------------------------- | -------- | --------------------------------------------------------------------- |
| **Interactive Seat Map**        | ✅ Ready | Visual grid kursi dengan 4 status: Available, Selected, Occupied, VIP |
| **Multi-Seat Selection**        | ✅ Ready | Pilih hingga 10 kursi sekaligus dalam 1 transaksi                     |
| **Real-time Price Calculation** | ✅ Ready | Harga otomatis terhitung setiap kursi dipilih/dihapus                 |
| **Service Fee**                 | ✅ Ready | Biaya layanan per kursi ditampilkan transparan                        |
| **Booking Summary Sidebar**     | ✅ Ready | Ringkasan pesanan real-time di sidebar                                |
| **Payment Method Selection**    | ✅ Ready | 3 metode: Cash, Bank Transfer, QRIS                                   |
| **Checkout Success Modal**      | ✅ Ready | Konfirmasi booking dengan detail lengkap                              |
| **Toast Notifications**         | ✅ Ready | Feedback visual untuk setiap aksi user                                |

### 🎨 UI/UX

- 🌙 **Dark Mode Default** — Tema gelap elegan dengan aksen amber/gold
- 📱 **Fully Responsive** — Optimal di mobile, tablet, dan desktop
- ✨ **Smooth Animations** — Scroll reveal effects & particle background
- 🎬 **Loading Screen** — Transisi halus saat aplikasi dimuat
- 🧭 **Sticky Navigation** — Navbar & sidebar tetap terlihat saat scroll

---

## 🛠️ Tech Stack

```
Frontend:    Next.js 16 + React 19 + TypeScript
Styling:     Tailwind CSS 4 + shadcn/ui Components
Animations:  Custom CSS + Scroll Reveal
Icons:       Lucide React
Notifications: Sonner
Deployment:  Vercel (optimized)
```

---

## 📱 User Flow

```
1. User membuka halaman
   ↓
2. Loading screen menampilkan animasi intro
   ↓
3. User melihat seat map dengan layout bioskop
   ↓
4. User klik kursi yang tersedia (max 10 kursi)
   ↓
5. Sidebar menampilkan ringkasan booking + total harga
   ↓
6. User klik "Proceed to Checkout"
   ↓
7. Modal konfirmasi pembayaran muncul
   ↓
8. User pilih metode pembayaran (Cash/Transfer/QRIS)
   ↓
9. Checkout success modal menampilkan detail booking
   ↓
10. Kursi yang sudah dibooking berubah status menjadi "Occupied"
```

---

## 🚀 Menjalankan Project

### Prerequisites

- Node.js 18 atau lebih baru
- npm atau pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/alwanfadhil-id/cinemax.git
cd cinemax

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka **[http://localhost:3000](http://localhost:3000)** di browser.

### Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Code linting
```

---

## 📂 Project Structure

```
cinemax/
├── app/
│   ├── layout.tsx          # Root layout + providers
│   ├── page.tsx            # Main booking page (state management)
│   └── globals.css         # Global styles + custom animations
│
├── components/
│   ├── seat-map.tsx        # Interactive seat grid component
│   ├── booking-summary.tsx # Sidebar ringkasan booking
│   ├── payment-modal.tsx   # Modal pemilihan pembayaran
│   ├── checkout-modal.tsx  # Success confirmation modal
│   ├── movie-info.tsx      # Informasi film (sidebar)
│   ├── navbar.tsx          # Top navigation bar
│   ├── footer.tsx          # Footer component
│   ├── toast.tsx           # Notification component
│   ├── loading-screen.tsx  # Intro loading animation
│   ├── floating-particles.tsx # Background particles
│   ├── scroll-reveal.tsx   # Scroll animation wrapper
│   └── ui/                 # shadcn/ui component library
│
├── lib/
│   ├── seat-utils.ts       # Seat generation logic
│   └── utils.ts            # Helper functions
│
├── hooks/                  # Custom React hooks
├── public/                 # Static assets (posters, icons)
└── styles/                 # Additional CSS
```

---

## 🎯 Fitur yang Bisa Ditambahkan (Custom Development)

Fitur berikut **belum ada di demo ini** tapi bisa dikembangkan sesuai kebutuhan:

### 📊 Backend & Database

- [ ] User authentication & registration
- [ ] Movie schedule management (admin panel)
- [ ] Real-time seat availability (WebSocket)
- [ ] Booking history per user
- [ ] Payment gateway integration (Midtrans, Xendit)
- [ ] Email/WhatsApp booking confirmation

### 🎬 Movie Management

- [ ] Multiple movie listings
- [ ] Showtime scheduling
- [ ] Multiple studio/theater selection
- [ ] Dynamic pricing (weekday vs weekend)
- [ ] Movie ratings & reviews

### 💳 Payment & Checkout

- [ ] Payment gateway integration
- [ ] Auto-expire booking (timer countdown)
- [ ] Refund & cancellation system
- [ ] Promo codes & discounts
- [ ] Membership/loyalty points

### 📱 Additional Features

- [ ] PWA (Progressive Web App) support
- [ ] Push notifications
- [ ] Social media sharing
- [ ] QR code ticket generation
- [ ] Admin dashboard untuk manajemen

---

## 👤 Developer

**Alwan Fadhil**  
🔗 GitHub: [@alwanfadhil-id](https://github.com/alwanfadhil-id)  
📧 Contact: [alwanfadhil.id@gmail.com]  
💼 Portfolio: [https://v0-myportofo.vercel.app]

_Tertarik untuk mengembangkan project ini? Hubungi saya untuk diskusi kebutuhan aplikasi Anda._

---

## 📝 License

Private project — All rights reserved

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — React framework
- [Vercel](https://vercel.com/) — Hosting & deployment
- [shadcn/ui](https://ui.shadcn.com/) — UI component primitives
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) — Beautiful icons
