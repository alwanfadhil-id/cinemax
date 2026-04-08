# 🎬 CineMax - Movie Booking Application

A modern, responsive movie booking application built with Next.js 16 and React 19. Select your seats, checkout, and pay—all in one seamless experience.

## ✨ Features

- 🎟️ **Interactive Seat Selection** - Visual seat map with real-time availability
- 💳 **Payment Modal** - Multiple payment method support
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark/Light Mode** - Theme switching with next-themes
- ✨ **Smooth Animations** - Scroll reveal effects and floating particles
- 🔔 **Toast Notifications** - Real-time feedback for user actions
- 🎯 **Booking Summary** - Real-time price calculation with service fees
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components

## 🚀 Tech Stack

- **Framework**: Next.js 16.2.0
- **UI Library**: React 19
- **Language**: TypeScript 5.7.3
- **Styling**: Tailwind CSS 4.2.0
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Form Management**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Analytics**: Vercel Analytics

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alwanfadhil-id/cinemax.git
   cd cinemax
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
cinemax/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main booking page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui primitives
│   ├── seat-map.tsx      # Interactive seat selection
│   ├── booking-summary.tsx # Booking overview
│   ├── payment-modal.tsx # Payment confirmation
│   ├── checkout-modal.tsx # Success modal
│   └── ...               # Other UI components
├── lib/                   # Utilities
│   ├── seat-utils.ts     # Seat generation logic
│   └── utils.ts          # Helper functions
├── hooks/                 # Custom React hooks
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎯 Key Features

### Seat Selection
- Visual seat map with different seat statuses (available, selected, occupied)
- Maximum 10 seats per booking
- Real-time seat status updates
- Click to select/deselect seats

### Booking Flow
1. Select your seats from the interactive seat map
2. Review booking details in the sidebar summary
3. Proceed to checkout
4. Choose payment method
5. Confirm and receive booking confirmation

### UI/UX
- Sticky sidebar with movie info and booking summary
- Smooth scroll reveal animations
- Floating particle background effects
- Loading screen for better UX
- Toast notifications for user feedback

## 🌐 Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will auto-detect Next.js configuration
4. Click Deploy

### Environment Variables

If needed, create a `.env.local` file:

```env
# Add your environment variables here
```

Then add them to your Vercel project settings.

## 📝 License

Private project - All rights reserved

## 👤 Author

**Alwan Fadhil**
- GitHub: [@alwanfadhil-id](https://github.com/alwanfadhil-id)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
