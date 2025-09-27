import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

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
  metadataBase: new URL('https://codenis.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
          url: 'https://codenis.com',
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo/Fav.png" type="image/png" />
        <meta name="theme-color" content="#111827" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <link href="https://api.fontshare.com/v2/css?f[]=touvlo@400,500,700&display=swap" rel="stylesheet" />
        {/* Preload fonts for consistent cross-browser rendering */}
        <link rel="preload" href="https://fonts.gstatic.com/s/dancingscript/v24/If2cXTr6YS-zW4S1c83p8W6F7ACWkH7qygSq.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDX8X_w.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "codenies",
                      "url": "https://codenis.com",
        "logo": "https://codenis.com/logo/web.png",
              "description": "Expert software development agency specializing in SaaS, e-commerce, mobile apps, UI/UX design, and AI integration.",
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "hello@codenis.com",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://www.linkedin.com/company/codenies-solutions/",
                "https://www.facebook.com/share/1LNgesBeTc/?mibextid=wwXIfr",
                "https://www.instagram.com/codeniess/"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 40.7128,
                  "longitude": -74.0060
                },
                "geoRadius": "50000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Software Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "SaaS Development",
                      "description": "Scalable software-as-a-service platforms"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "E-commerce Solutions",
                      "description": "Custom online stores and marketplaces"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mobile Applications",
                      "description": "Native and cross-platform mobile apps"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "UI/UX Design",
                      "description": "Intuitive and beautiful interfaces"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Integration",
                      "description": "Cutting-edge artificial intelligence solutions"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <Header />
        <main id="main-content" role="main" className="pt-32 lg:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
