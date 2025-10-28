import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/components/theme-provider';
import { CartProvider } from '@/components/CartContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Khalifa Auto - Premium Used Cars & Certified Pre-Owned Vehicles',
  description:
    'Find your perfect car at Khalifa Auto. We offer premium used cars, certified pre-owned vehicles, financing options, and exceptional customer service. Visit our showroom today!',
  keywords:
    'used cars, certified pre-owned, car dealership, auto sales, financing, car trade-in',
  authors: [{ name: 'Khalifa Auto' }],
  openGraph: {
    title: 'Khalifa Auto - Premium Used Cars & Certified Pre-Owned Vehicles',
    description:
      'Find your perfect car at Khalifa Auto. We offer premium used cars, certified pre-owned vehicles, financing options, and exceptional customer service.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Layout>{children}</Layout>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}