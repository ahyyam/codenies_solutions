import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import GlobalSEO from "@/components/common/GlobalSEO"
import PerformanceMonitor from "@/components/common/PerformanceMonitor"
import { AuthProvider } from "@/lib/contexts/AuthContext"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"
import { MetaPixel } from "@/components/analytics/MetaPixel"

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
        
        
        {/* Optimized font loading */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        
        {/* Critical font preloads */}
        <link 
          rel="preload" 
          href="https://api.fontshare.com/fonts/touvlo/fonts/touvlo-400.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/geist/v1/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Font optimization and Web Vitals monitoring */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* System font stack for immediate text rendering */
            html {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            /* Optimize font loading */
            .font-loading {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-display: swap;
            }
            
            /* Improve layout stability */
            body {
              font-synthesis: none;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* Prevent layout shift during font load */
            * {
              font-display: swap;
            }
          `
        }} />
        
        {/* Schema.org structured data for better SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Codenies",
            "description": "Leading tech innovation agency specializing in cutting-edge software development, AI integration, and modern digital solutions.",
            "url": "https://codenies.com",
            "logo": "https://codenies.com/logo/web.png",
            "foundingDate": "2024",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "sameAs": [
              "https://linkedin.com/company/codenies",
              "https://github.com/codenies"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Business inquiries",
              "url": "https://codenies.com/consultation"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Software Development Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Software Development",
                    "description": "Custom software solutions and modern web development"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI Integration",
                    "description": "Artificial intelligence solutions and machine learning integration"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "UI/UX Design",
                    "description": "Modern user interface and user experience design"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile App Development",
                    "description": "Native and cross-platform mobile applications"
                  }
                }
              ]
            }
          })
        }} />
        
        {/* Core Web Vitals Monitoring */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Core Web Vitals measurement
            function measureWebVitals() {
              // Largest Contentful Paint
              try {
                new PerformanceObserver((list) => {
                  const entries = list.getEntries();
                  const lastEntry = entries[entries.length - 1];
                  if (lastEntry) {
                    performance.mark('lcp', lastEntry.startTime);
                  }
                }).observe({entryTypes: ['largest-contentful-paint']});
              } catch (e) {}

              // First Input Delay
              try {
                new PerformanceObserver((list) => {
                  const firstInput = list.getEntries()[0];
                  if (firstInput) {
                    const fid = firstInput.processingStart - firstInput.startTime;
                    performance.mark('fid', fid);
                  }
                }).observe({entryTypes: ['first-input']});
              } catch (e) {}

              // Cumulative Layout Shift
              try {
                let clsValue = 0;
                new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput && entry.value) {
                      clsValue += entry.value;
                    }
                  }
                  performance.mark('cls', clsValue);
                }).observe({entryTypes: ['layout-shift']});
              } catch (e) {}
            }
            
            // Font loading optimization
            if ('fonts' in document) {
              document.fonts.ready.then(() => {
                performance.mark('fonts-loaded');
                document.body.classList.remove('font-loading');
              });
            } else {
              setTimeout(() => document.body.classList.remove('font-loading'), 3000);
            }
            
            // Start measuring when DOM is ready
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', measureWebVitals);
            } else {
              measureWebVitals();
            }
          `
        }} />
      </head>
      <body suppressHydrationWarning={true} className="font-loading">
        <AuthProvider>
          <PerformanceMonitor />
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
          <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID || ''} />
          <Header />
          <main id="main-content" role="main" className="pt-20 lg:pt-16">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
