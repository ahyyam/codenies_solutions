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

  // Generate service structured data for main services with innovation focus
  const services = [
    {
      name: 'Modern Web Development',
      description: 'Cutting-edge web development solutions using the latest technologies, frameworks, and design systems for exceptional user experiences.',
      url: '/services/website-development',
      priceRange: '$'
    },
    {
      name: 'SaaS Innovation',
      description: 'End-to-end SaaS application development with scalable architecture, modern UI/UX design, and advanced technology integration.',
      url: '/services/saas-development',
      priceRange: '$'
    },
    {
      name: 'Mobile App Innovation',
      description: 'Native and cross-platform mobile application development with modern design principles and cutting-edge technology.',
      url: '/services/mobile-applications',
      priceRange: '$'
    },
    {
      name: 'AI Integration & Innovation',
      description: 'Advanced artificial intelligence and machine learning integration to transform your business with intelligent automation and insights.',
      url: '/services/ai-integration',
      priceRange: '$'
    },
    {
      name: 'Advanced UI/UX Design',
      description: 'User-centered design solutions with modern design systems, accessibility focus, and innovation-driven user experiences.',
      url: '/services/ui-ux-design',
      priceRange: '$'
    },
    {
      name: 'E-commerce Innovation',
      description: 'Complete e-commerce platforms with modern design, advanced functionality, and seamless user experiences.',
      url: '/services/ecommerce-solutions',
      priceRange: '$'
    }
  ];

  const serviceStructuredData = services.map(service => generateServiceStructuredData(service));

  return (
    <>
      {/* Global Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      
      {/* Theme and App Configuration - Updated with brand colors */}
      <meta name="theme-color" content="#5A00D2" />
      <meta name="msapplication-TileColor" content="#5A00D2" />
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Brand Color Meta Tags */}
      <meta name="brand-primary-color" content="#5A00D2" />
      <meta name="brand-accent-color" content="#E60073" />
      <meta name="brand-secondary-color" content="#007BFF" />
      <meta name="design-system" content="Minimal Tech-Innovation" />
      
      {/* Innovation and Tech Expertise Keywords */}
      <meta name="keywords" content="tech innovation, software development, AI integration, modern web development, UI/UX design, SaaS development, mobile app development, digital transformation, custom software solutions, business technology consulting, innovation consulting, tech expertise, cutting-edge technology, modern design systems" />
      
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
      
      {/* Font Preloading - Commented out until font file is available */}
      {/* <link 
        rel="preload" 
        href="/fonts/geist-sans.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      /> */}
      
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
    </>
  );
}

export default GlobalSEO;