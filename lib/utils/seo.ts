import { BlogPost } from '@/lib/types/blog';
import { Project } from '@/lib/types/project';
import { Metadata } from 'next';

interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  twitterHandle?: string;
  facebookAppId?: string;
  organizationName: string;
  organizationLogo: string;
}

const defaultSEOConfig: SEOConfig = {
  siteName: 'Codenies',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://codenies.com',
  defaultTitle: 'Codenies - Tech Innovation & Modern Software Development',
  defaultDescription: 'Leading tech innovation agency specializing in cutting-edge software development, AI integration, and modern digital solutions. Transform your business with our expertise in SaaS, mobile apps, and advanced UI/UX design.',
  defaultKeywords: [
    'tech innovation',
    'software development',
    'AI integration',
    'modern web development',
    'SaaS development',
    'digital transformation',
    'UI/UX design',
    'mobile app development',
    'custom software solutions',
    'business technology',
    'innovation consulting',
    'tech expertise'
  ],
  twitterHandle: '@codenies',
  organizationName: 'Codenies',
  organizationLogo: '/logo/web.png'
};

/**
 * Generate comprehensive metadata for pages
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noIndex = false,
  canonical
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  canonical?: string;
}): Metadata {
  const config = defaultSEOConfig;
  
  const fullTitle = title 
    ? `${title} | ${config.siteName}`
    : config.defaultTitle;
  
  const metaDescription = description || config.defaultDescription;
  const metaKeywords = [...config.defaultKeywords, ...keywords];
  const fullUrl = url ? `${config.siteUrl}${url}` : config.siteUrl;
  const ogImage = image ? `${config.siteUrl}${image}` : `${config.siteUrl}/hero_image_1920x480.png`;

  const metadata: Metadata = {
    title: fullTitle,
    description: metaDescription,
    keywords: metaKeywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: config.organizationName }],
    creator: config.organizationName,
    publisher: config.organizationName,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    canonical: canonical || fullUrl,
    
    // Open Graph
    openGraph: {
      type,
      title: fullTitle,
      description: metaDescription,
      url: fullUrl,
      siteName: config.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || config.defaultTitle
        }
      ],
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags })
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
      ...(config.twitterHandle && { site: config.twitterHandle }),
      ...(config.twitterHandle && { creator: config.twitterHandle })
    },

    // Additional meta tags
    other: {
      'application-name': config.siteName,
      'apple-mobile-web-app-title': config.siteName,
      'msapplication-TileColor': '#000000',
      'theme-color': '#000000',
      ...(config.facebookAppId && { 'fb:app_id': config.facebookAppId })
    }
  };

  return metadata;
}

/**
 * Generate metadata for blog posts
 */
export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const config = defaultSEOConfig;
  
  return generateMetadata({
    title: post.seo.title || post.title,
    description: post.seo.description || post.excerpt,
    keywords: post.seo.keywords || post.tags.map(tag => tag.name),
    image: post.featuredImage?.url || post.seo.ogImage,
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    author: post.author.name,
    section: post.category.name,
    tags: post.tags.map(tag => tag.name),
    canonical: post.seo.canonicalUrl
  });
}

/**
 * Generate metadata for projects
 */
export function generateProjectMetadata(project: Project): Metadata {
  return generateMetadata({
    title: project.seo.title || project.title,
    description: project.seo.description || project.description,
    keywords: project.seo.keywords || project.technologies.map(tech => tech.name),
    image: project.images[0]?.url || project.seo.ogImage,
    url: `/work/${project.slug}`,
    type: 'article',
    modifiedTime: project.updatedAt.toISOString(),
    section: project.category.name,
    tags: project.technologies.map(tech => tech.name),
    canonical: project.seo.canonicalUrl
  });
}

/**
 * Generate structured data (JSON-LD) for organization
 */
export function generateOrganizationStructuredData() {
  const config = defaultSEOConfig;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.organizationName,
    url: config.siteUrl,
    logo: `${config.siteUrl}${config.organizationLogo}`,
    description: config.defaultDescription,
    slogan: 'Transforming Ideas into Innovation',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${config.siteUrl}/consultation`,
      availableLanguage: ['English']
    },
    sameAs: [
      // Add social media URLs here when available
    ],
    foundingDate: '2020',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '10-50'
    },
    knowsAbout: [
      'Tech Innovation',
      'Software Development',
      'AI Integration',
      'Modern Web Development',
      'SaaS Development',
      'Digital Transformation',
      'UI/UX Design',
      'Mobile App Development',
      'Custom Software Solutions',
      'Business Technology Consulting'
    ],
    areaServed: 'Worldwide',
    serviceType: [
      'Tech Innovation Consulting',
      'Custom Software Development',
      'AI Integration Services',
      'Modern Web Development',
      'SaaS Development',
      'Mobile App Development',
      'UI/UX Design',
      'Digital Transformation'
    ],
    brand: {
      '@type': 'Brand',
      name: config.organizationName,
      description: 'Leading tech innovation agency',
      logo: `${config.siteUrl}${config.organizationLogo}`,
      color: '#5A00D2', // Deep Purple - Primary brand color
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Primary Color',
          value: '#5A00D2',
          description: 'Deep Purple - Innovation and expertise'
        },
        {
          '@type': 'PropertyValue',
          name: 'Accent Color',
          value: '#E60073',
          description: 'Magenta Pink - Energy and creativity'
        },
        {
          '@type': 'PropertyValue',
          name: 'Secondary Color',
          value: '#007BFF',
          description: 'Electric Blue - Tech-forward thinking'
        },
        {
          '@type': 'PropertyValue',
          name: 'Design Philosophy',
          value: 'Minimal Tech-Innovation',
          description: 'Clean, modern design emphasizing innovation and technology'
        }
      ]
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Tech Innovation Consulting',
          description: 'Strategic technology consulting to drive business innovation'
        },
        category: 'Technology Consulting'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Integration Services',
          description: 'Cutting-edge AI integration for modern business solutions'
        },
        category: 'Artificial Intelligence'
      }
    ]
  };
}

/**
 * Generate structured data for blog post
 */
export function generateBlogPostStructuredData(post: BlogPost) {
  const config = defaultSEOConfig;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.url ? `${config.siteUrl}${post.featuredImage.url}` : undefined,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `${config.siteUrl}/about`
    },
    publisher: {
      '@type': 'Organization',
      name: config.organizationName,
      logo: {
        '@type': 'ImageObject',
        url: `${config.siteUrl}${config.organizationLogo}`
      }
    },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${config.siteUrl}/blog/${post.slug}`
    },
    articleSection: post.category.name,
    keywords: post.tags.map(tag => tag.name).join(', '),
    wordCount: Math.floor(post.content.replace(/<[^>]*>/g, '').split(/\s+/).length),
    timeRequired: `PT${post.readTime}M`,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    ...(post.analytics.views > 0 && {
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/ReadAction',
        userInteractionCount: post.analytics.views
      }
    })
  };
}

/**
 * Generate structured data for project/case study
 */
export function generateProjectStructuredData(project: Project) {
  const config = defaultSEOConfig;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.images.map(img => `${config.siteUrl}${img.url}`),
    creator: {
      '@type': 'Organization',
      name: config.organizationName,
      url: config.siteUrl
    },
    dateCreated: project.createdAt.toISOString(),
    dateModified: project.updatedAt.toISOString(),
    genre: project.category.name,
    keywords: project.technologies.map(tech => tech.name).join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${config.siteUrl}/work/${project.slug}`
    },
    about: {
      '@type': 'Thing',
      name: project.category.name,
      description: project.description
    },
    ...(project.client && {
      client: {
        '@type': 'Organization',
        name: project.client.name,
        industry: project.client.industry
      }
    }),
    ...(project.links.live && {
      url: project.links.live
    }),
    workExample: project.features.map(feature => ({
      '@type': 'CreativeWork',
      name: feature
    })),
    technology: project.technologies.map(tech => ({
      '@type': 'SoftwareApplication',
      name: tech.name,
      applicationCategory: tech.category
    }))
  };
}

/**
 * Generate structured data for website
 */
export function generateWebsiteStructuredData() {
  const config = defaultSEOConfig;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.siteName,
    alternateName: 'Codenies Tech Innovation Agency',
    url: config.siteUrl,
    description: config.defaultDescription,
    about: {
      '@type': 'Thing',
      name: 'Tech Innovation',
      description: 'Cutting-edge technology solutions and software development services'
    },
    publisher: {
      '@type': 'Organization',
      name: config.organizationName,
      logo: `${config.siteUrl}${config.organizationLogo}`,
      description: 'Leading tech innovation agency specializing in modern software development'
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${config.siteUrl}/blog?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      {
        '@type': 'ContactAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${config.siteUrl}/consultation`
        }
      }
    ],
    mainEntity: {
      '@type': 'Organization',
      name: config.organizationName,
      url: config.siteUrl,
      description: 'Tech innovation agency transforming businesses with cutting-edge software solutions'
    },
    keywords: [
      'tech innovation',
      'software development',
      'AI integration',
      'modern web development',
      'UI/UX design',
      'digital transformation',
      'business technology'
    ],
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: config.organizationName
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Business'
    },
    category: 'Technology Services',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Design System',
        value: 'Minimal Tech-Innovation Palette',
        description: 'Modern design system emphasizing innovation and technology'
      },
      {
        '@type': 'PropertyValue',
        name: 'Primary Focus',
        value: 'Tech Innovation',
        description: 'Specializing in cutting-edge technology solutions'
      }
    ]
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  const config = defaultSEOConfig;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${config.siteUrl}${item.url}`
    }))
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate service structured data
 */
export function generateServiceStructuredData(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceRange?: string;
}) {
  const config = defaultSEOConfig;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${config.siteUrl}${service.url}`,
    provider: {
      '@type': 'Organization',
      name: config.organizationName,
      url: config.siteUrl,
      brand: {
        '@type': 'Brand',
        name: config.organizationName,
        description: 'Leading tech innovation agency'
      }
    },
    areaServed: 'Worldwide',
    serviceType: service.name,
    category: 'Technology Services',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Business'
    },
    ...(service.image && { image: `${config.siteUrl}${service.image}` }),
    ...(service.priceRange && { priceRange: service.priceRange }),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Services`,
      description: `Professional ${service.name.toLowerCase()} services with cutting-edge technology`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
            category: 'Technology Innovation'
          },
          seller: {
            '@type': 'Organization',
            name: config.organizationName
          }
        }
      ]
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Innovation Focus',
        value: 'true',
        description: 'Service emphasizes cutting-edge technology and innovation'
      },
      {
        '@type': 'PropertyValue',
        name: 'Expertise Level',
        value: 'Expert',
        description: 'Professional-grade service delivery'
      }
    ]
  };
}

/**
 * Utility to inject structured data into page
 */
export function createStructuredDataScript(data: object) {
  return {
    __html: JSON.stringify(data)
  };
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const config = defaultSEOConfig;
  return `${config.siteUrl}${path}`;
}

/**
 * Generate hreflang tags for international SEO
 */
export function generateHreflangTags(path: string) {
  const config = defaultSEOConfig;
  
  return [
    { hreflang: 'en', href: `${config.siteUrl}${path}` },
    { hreflang: 'x-default', href: `${config.siteUrl}${path}` }
  ];
}