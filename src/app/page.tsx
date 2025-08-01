import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';

export const metadata: Metadata = {
  title: 'Custom Software Development Agency | Codenies Solutions',
  description: 'Transform your business with custom software solutions. Expert web & mobile development, e-commerce platforms, AI automation, and UI/UX design services. Get a free consultation today.',
  keywords: [
    'custom software development',
    'web development agency',
    'mobile app development',
    'e-commerce development',
    'AI automation',
    'UI/UX design',
    'software consulting',
    'digital transformation'
  ],
  openGraph: {
    title: 'Custom Software Development Agency | Codenies Solutions',
    description: 'Transform your business with custom software solutions. Expert web & mobile development, e-commerce platforms, AI automation, and UI/UX design services.',
    url: 'https://codenies-solutions.com',
    siteName: 'Codenies Solutions',
    images: [
      {
        url: '/pics/hero_image_1920x480.png',
        width: 1920,
        height: 480,
        alt: 'Codenies Solutions - Software Development Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Software Development Agency | Codenies Solutions',
    description: 'Transform your business with custom software solutions. Expert web & mobile development, e-commerce platforms, AI automation, and UI/UX design services.',
    images: ['/pics/hero_image_1920x480.png'],
  },
  alternates: {
    canonical: 'https://codenies-solutions.com',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Codenies Solutions",
            "url": "https://codenies-solutions.com",
            "description": "Custom software development agency specializing in web & mobile apps, e-commerce, AI automation, and UI/UX design.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://codenies-solutions.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Custom Software Development",
            "provider": {
              "@type": "Organization",
              "name": "Codenies Solutions"
            },
            "description": "Custom software development services including web & mobile apps, e-commerce, AI automation, and UI/UX design.",
            "serviceType": "Software Development",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Software Development Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web & Mobile App Development"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Custom Software Solutions"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-commerce Development"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI & Automation Tools"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "UI/UX Design"
                  }
                }
              ]
            }
          })
        }}
      />
      <Hero />
      <Services />
      <Portfolio />
    </>
  );
}
