import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import GlobalSEO from "@/components/common/GlobalSEO"
import PerformanceMonitor from "@/components/common/PerformanceMonitor"

export const metadata: Metadata = {
  title: {
    default: "codenies - Software Development Agency",
    template: "%s | codenies"
  },
  description: "Expert software development agency specializing in SaaS, e-commerce, mobile apps, UI/UX design, and AI integration. Transform your business with cutting-edge technology solutions.",
  keywords: [
    "software development agency",
    "custom software development",
    "web development",
    "mobile app development",
    "SaaS development",
    "e-commerce solutions",
    "UI/UX design",
    "AI integration",
    "digital transformation",
    "business software solutions"
  ],
  authors: [{ name: "codenies" }],
  creator: "codenies",
  publisher: "codenies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://codenies.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
          url: 'https://codenies.com',
    title: 'codenies - Software Development Agency',
    description: 'Expert software development agency specializing in SaaS, e-commerce, mobile apps, UI/UX design, and AI integration.',
    siteName: 'codenies',
    images: [
      {
        url: '/pics/hero_image_1920x480.png',
        width: 1920,
        height: 480,
        alt: 'codenies - Software Development Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'codenies - Software Development Agency',
    description: 'Expert software development agency specializing in SaaS, e-commerce, mobile apps, UI/UX design, and AI integration.',
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
  },
  icons: {
    icon: [
      { url: '/logo/Fav.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo/Fav.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: [
      { url: '/logo/Fav.png', sizes: 'any', type: 'image/png' },
    ],
    apple: [
      { url: '/logo/Fav.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <GlobalSEO />
        <link href="https://api.fontshare.com/v2/css?f[]=touvlo@400,500,700&display=swap" rel="stylesheet" />
        {/* Preload fonts for consistent cross-browser rendering */}
        <link rel="preload" href="https://fonts.gstatic.com/s/dancingscript/v24/If2cXTr6YS-zW4S1c83p8W6F7ACWkH7qygSq.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDX8X_w.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning={true}>
        <PerformanceMonitor />
        <Header />
        <main id="main-content" role="main" className="pt-20 lg:pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
