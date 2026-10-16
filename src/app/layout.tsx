import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/common/Toast';
import PwaInstallBanner from '@/components/common/PwaInstallBanner';
import AuthModal from '@/components/modals/AuthModal';
import BuyCreditsModal from '@/components/modals/BuyCreditsModal';
import UniversalCartDrawer from '@/components/cart/UniversalCartDrawer';

export const metadata: Metadata = {
  title: 'Vibin — Your Space, Your Vibe',
  description:
    'See your room’s next vibe before spending money. India-first AI room makeovers for college students, hostel/PG residents, renters, and young apartment owners.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icons/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vibin',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#FBF9F8',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#FBF9F8]">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      {/* Crisp Cream (#FBF9F8) Background & Deep Charcoal (#464B4F) Body Text */}
      <body className="flex min-h-full flex-col font-sans antialiased text-[#464B4F] bg-[#FBF9F8]">
        <AppProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <PwaInstallBanner />
            <main className="flex-1">{children}</main>
            <Footer />
            <BottomNav />
            <AuthModal />
            <BuyCreditsModal />
            <UniversalCartDrawer />
            <Toast />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
