import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import GlobalSEO from "@/components/common/GlobalSEO"
import PerformanceMonitor from "@/components/common/PerformanceMonitor"

export const metadata: Metadata = {
  title: {
    default: "Codenies - Tech Innovation & Modern Software Development",
    template: "%s | Codenies"
  },
  description: "Leading tech innovation agency specializing in cutting-edge software development, AI integration, and modern digital solutions. Transform your business with our expertise in SaaS, mobile apps, and advanced UI/UX design.",
  keywords: [
    "tech innovation",
    "software development agency",
    "AI integration",
    "modern web development",
    "UI/UX design",
    "SaaS development",
    "mobile app development",
    "digital transformation",
    "custom software solutions",
    "business technology consulting",
    "innovation consulting",
    "tech expertise",
    "cutting-edge technology",
    "modern design systems"
  ],
  authors: [{ name: "Codenies" }],
  creator: "Codenies",
  publisher: "Codenies",
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
    title: 'Codenies - Tech Innovation & Modern Software Development',
    description: 'Leading tech innovation agency specializing in cutting-edge software development, AI integration, and modern digital solutions. Expert UI/UX design and business technology consulting.',
    siteName: 'Codenies',
    images: [
      {
        url: '/hero_image_1920x480.png',
        width: 1920,
        height: 480,
        alt: 'Codenies - Tech Innovation & Modern Software Development Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codenies - Tech Innovation & Modern Software Development',
    description: 'Leading tech innovation agency specializing in cutting-edge software development, AI integration, and modern digital solutions.',
    images: ['/hero_image_1920x480.png'],
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
        
        
        {/* Optimized font loading with preload hints and fallbacks */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        
        {/* Primary font stylesheet */}
        <link 
          href="https://api.fontshare.com/v2/css?f[]=touvlo@400,500,700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/geist/v1/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Fallback font system */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Font fallback system */
            @font-face {
              font-family: 'Geist Sans Fallback';
              src: local('system-ui'), local('-apple-system'), local('BlinkMacSystemFont'), local('Segoe UI'), local('Roboto');
              font-display: swap;
            }
            
            /* Ensure text remains visible during font load */
            .font-loading {
              font-family: 'Geist Sans Fallback', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
          `
        }} />
        
        {/* Performance monitoring script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Track font loading performance
            if ('fonts' in document) {
              document.fonts.ready.then(() => {
                performance.mark('fonts-loaded');
                document.body.classList.remove('font-loading');
              });
            }
            
            // Fallback for older browsers
            setTimeout(() => {
              document.body.classList.remove('font-loading');
            }, 3000);
          `
        }} />
      </head>
      <body suppressHydrationWarning={true} className="font-loading">
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
