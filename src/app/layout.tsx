import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';

import { Poppins, Merriweather } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Codenies Solutions - Custom Software Development Agency',
    template: '%s | Codenies Solutions'
  },
  description: 'Codenies Solutions is a leading software development agency specializing in custom web & mobile apps, e-commerce solutions, AI automation, and UI/UX design. Transform your business with our innovative software solutions.',
  keywords: [
    'software development agency',
    'custom software solutions',
    'web development',
    'mobile app development',
    'e-commerce development',
    'AI automation',
    'UI/UX design',
    'software consulting',
    'digital transformation',
    'business software'
  ],
  authors: [{ name: 'Codenies Solutions' }],
  creator: 'Codenies Solutions',
  publisher: 'Codenies Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://codenies-solutions.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codenies-solutions.com',
    title: 'Codenies Solutions - Custom Software Development Agency',
    description: 'Transform your business with custom software solutions. Web & mobile development, e-commerce, AI automation, and UI/UX design services.',
    siteName: 'Codenies Solutions',
    images: [
      {
        url: '/pics/hero_image_1920x480.png',
        width: 1920,
        height: 480,
        alt: 'Codenies Solutions - Software Development Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codenies Solutions - Custom Software Development Agency',
    description: 'Transform your business with custom software solutions. Web & mobile development, e-commerce, AI automation, and UI/UX design services.',
    images: ['/pics/hero_image_1920x480.png'],
  },
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.ico', sizes: '180x180', type: 'image/x-icon' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Codenies Solutions",
              "url": "https://codenies-solutions.com",
              "logo": "https://codenies-solutions.com/favicon.ico",
              "description": "Custom software development agency specializing in web & mobile apps, e-commerce, AI automation, and UI/UX design.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://codenies-solutions.com/contact"
              },
              "sameAs": [
                "https://linkedin.com/company/codenies-solutions",
                "https://twitter.com/codenies"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 40.7128,
                  "longitude": -74.0060
                },
                "geoRadius": "50000"
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${merriweather.variable} antialiased`} suppressHydrationWarning={true}>
        <Header/>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

