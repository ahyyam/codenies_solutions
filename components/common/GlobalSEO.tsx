'use client';

import Head from 'next/head';
import { 
  generateOrganizationStructuredData, 
  generateWebsiteStructuredData,
  generateServiceStructuredData
} from '@/lib/utils/seo';

interface GlobalSEOProps {
  siteUrl?: string;
  siteName?: string;
}

export function GlobalSEO({ 
  siteUrl = 'https://codenies.com',
  siteName = 'Codenies'
}: GlobalSEOProps) {
  // Generate organization structured data
  const organizationData = generateOrganizationStructuredData();
  
  // Generate website structured data
  const websiteData = generateWebsiteStructuredData();

  // Generate service structured data for main services
  const services = [
    {
      name: 'Web Development',
      description: 'Custom web development solutions using modern technologies and frameworks.',
      url: '/services/website-development',
      priceRange: '$$'
    },
    {
      name: 'SaaS Development',
      description: 'End-to-end SaaS application development with scalable architecture.',
      url: '/services/saas-development',
      priceRange: '$$$'
    },
    {
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile application development.',
      url: '/services/mobile-applications',
      priceRange: '$$'
    },
    {
      name: 'AI Integration',
      description: 'Integrate artificial intelligence and machine learning into your applications.',
      url: '/services/ai-integration',
      priceRange: '$$$'
    },
    {
      name: 'UI/UX Design',
      description: 'User-centered design solutions that enhance user experience and engagement.',
      url: '/services/ui-ux-design',
      priceRange: '$$'
    },
    {
      name: 'E-commerce Solutions',
      description: 'Complete e-commerce platforms and online store development.',
      url: '/services/ecommerce-solutions',
      priceRange: '$$'
    }
  ];

  const serviceStructuredData = services.map(service => generateServiceStructuredData(service));

  return (
    <Head>
      {/* Global Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      
      {/* Theme and App Configuration */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Security Headers */}
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/logo/Fav.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo/Fav.png" />
      <link rel="apple-touch-icon" href="/logo/Fav.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Font Preloading */}
      <link 
        rel="preload" 
        href="/fonts/geist-sans.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
      
      {/* Global Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      {serviceStructuredData.map((serviceData, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
        />
      ))}
      
      {/* Verification Tags (add when available) */}
      {/* <meta name="google-site-verification" content="your-verification-code" /> */}
      {/* <meta name="msvalidate.01" content="your-bing-verification-code" /> */}
      
      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />
      
      {/* Cache Control for Static Assets */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
    </Head>
  );
}

export default GlobalSEO;