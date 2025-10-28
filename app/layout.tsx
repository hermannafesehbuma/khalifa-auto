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
  metadataBase: new URL('https://khalifaautotrading.com'),
  title: {
    default:
      'Khalifa Auto Trading - Premium Used Cars & Certified Pre-Owned Vehicles',
    template: '%s | Khalifa Auto Trading',
  },
  description:
    'Khalifa Auto Trading offers premium used cars, certified pre-owned vehicles, financing options, and exceptional customer service in Tokyo, Japan. Find your perfect car today with our extensive inventory.',
  keywords: [
    'used cars Tokyo',
    'certified pre-owned vehicles',
    'car dealership Japan',
    'auto sales Tokyo',
    'car financing',
    'car trade-in',
    'luxury cars',
    'SUVs',
    'sedans',
    'convertibles',
    'Khalifa Auto Trading',
    'premium automotive solutions',
  ],
  authors: [{ name: 'Khalifa Auto Trading' }],
  creator: 'Khalifa Auto Trading',
  publisher: 'Khalifa Auto Trading',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://khalifaautotrading.com',
    siteName: 'Khalifa Auto Trading',
    title:
      'Khalifa Auto Trading - Premium Used Cars & Certified Pre-Owned Vehicles',
    description:
      'Find your perfect car at Khalifa Auto Trading. We offer premium used cars, certified pre-owned vehicles, financing options, and exceptional customer service in Tokyo, Japan.',
    images: [
      {
        url: '/logok.png',
        width: 1200,
        height: 630,
        alt: 'Khalifa Auto Trading Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Khalifa Auto Trading - Premium Used Cars & Certified Pre-Owned Vehicles',
    description:
      'Find your perfect car at Khalifa Auto Trading. Premium used cars, certified pre-owned vehicles, and exceptional service in Tokyo, Japan.',
    images: ['/logok.png'],
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual Google verification code
  },
  alternates: {
    canonical: 'https://khalifaautotrading.com',
  },
  category: 'automotive',
  classification: 'Automotive Sales',
  other: {
    'contact:phone_number': '+9715083633902',
    'contact:email': 'contact@khalifaautotrading.com',
    'contact:address': '1-20-7 SHIMOUMA, SETAGAYA-KU, TOKYO JAPAN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logok.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logok.png" />
      </head>
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
