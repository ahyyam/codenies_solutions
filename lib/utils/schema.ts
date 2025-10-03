/**
 * Schema.org structured data utilities for better SEO
 */

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  logo: string;
  foundingDate?: string;
  address?: {
    '@type': string;
    addressCountry: string;
    addressCity?: string;
  };
  sameAs?: string[];
  contactPoint?: {
    '@type': string;
    contactType: string;
    url: string;
  };
  hasOfferCatalog?: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      itemOffered: {
        '@type': string;
        name: string;
        description: string;
      };
    }>;
  };
}

export interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  potentialAction: {
    '@type': string;
    target: string;
    'query-input': string;
  };
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  image?: string;
}

export interface ProjectSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  image?: string;
  url?: string;
  author: {
    '@type': string;
    name: string;
  };
  dateCreated?: string;
  dateModified?: string;
  softwareRequirements?: string[];
  platform?: string[];
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Codenies',
    description: 'Leading tech innovation agency specializing in cutting-edge software development, AI integration, and modern digital solutions.',
    url: 'https://codenies.com',
    logo: 'https://codenies.com/logo/web.png',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    sameAs: [
      'https://linkedin.com/company/codenies',
      'https://github.com/codenies',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Business inquiries',
      url: 'https://codenies.com/consultation',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Software Development',
            description: 'Custom software solutions and modern web development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Integration',
            description: 'Artificial intelligence solutions and machine learning integration',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UI/UX Design',
            description: 'Modern user interface and user experience design',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications',
          },
        },
      ],
    },
  };
}

/**
 * Generate Website Schema with search functionality
 */
export function generateWebsiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Codenies - Tech Innovation & Modern Software Development',
    url: 'https://codenies.com',
    description: 'Leading tech innovation agency specializing in cutting-edge software development, AI integration, and modern digital solutions.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://codenies.com/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbSchema(pathname: string, siteUrl: string): BreadcrumbSchema {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    
    return {
      '@type': 'ListItem',
      position: index + 2,
      name,
      item: `${siteUrl}${path}`,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      ...breadcrumbs,
    ],
  };
}

/**
 * Generate Article Schema for blog posts
 */
export function generateArticleSchema(post: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage?: string;
  slug: string;
}): ArticleSchema {
  const siteUrl = 'https://codenies.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: 'Codenies Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Codenies',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo/web.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.featuredImage ? `${siteUrl}${post.featuredImage}` : undefined,
  };
}

/**
 * Generate Project Schema for portfolio items
 */
export function generateProjectSchema(project: {
  title: string;
  description: string;
  images: Array<{ url: string; alt: string }>;
  technologies: string[];
  platform: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  link?: string;
}): ProjectSchema {
  const siteUrl = 'https://codenies.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.images[0]?.url ? `${siteUrl}${project.images[0].url}` : undefined,
    url: project.link ? `${siteUrl}/work/${project.slug}` : undefined,
    author: {
      '@type': 'Organization',
      name: 'Codenies',
    },
    dateCreated: project.createdAt,
    dateModified: project.updatedAt,
    softwareRequirements: project.technologies,
    platform: project.platform,
  };
}

/**
 * Get schema markup as JSON-LD script
 */
export function getSchemaJsonLD(schema: object): string {
  return JSON.stringify(schema);
}

/**
 * Enhance SEO with local business schema
 */
export function generateLocalBusinessSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Codenies',
    description: 'Professional software development and tech innovation services',
    url: 'https://codenies.com',
    telephone: '1-555-123-4567', // Replace with actual phone
    email: 'hello@codenies.com', // Replace with actual email
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Tech Street',
      addressCity: 'San Francisco',
      addressState: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.7749',
      longitude: '-122.4194',
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$',
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '37.7749',
        longitude: '-122.4194',
      },
      geoRadius: '50000',
    },
  };
}
