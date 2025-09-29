'use client';

import Head from 'next/head';
import { Project } from '@/lib/types/project';
import { 
  generateProjectStructuredData, 
  generateBreadcrumbStructuredData 
} from '@/lib/utils/seo';

interface ProjectSEOProps {
  project: Project;
  siteUrl?: string;
  siteName?: string;
  twitterHandle?: string;
}

export function ProjectSEO({ 
  project, 
  siteUrl = 'https://codenies.com',
  siteName = 'Codenies',
  twitterHandle = '@codenies'
}: ProjectSEOProps) {
  const projectUrl = `${siteUrl}/work/${project.slug}`;
  const imageUrl = project.images[0]?.url ? 
    (project.images[0].url.startsWith('http') ? project.images[0].url : `${siteUrl}${project.images[0].url}`) :
    `${siteUrl}/og-default-project.jpg`;

  // Generate structured data for the project
  const projectStructuredData = generateProjectStructuredData(project);
  
  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
    { name: project.category.name, url: `/work/category/${project.category.slug}` },
    { name: project.title, url: `/work/${project.slug}` }
  ]);

  // Generate organization structured data for the client
  const clientData = project.client ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": project.client.name,
    "industry": project.client.industry,
    "workPerformed": {
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.description,
      "creator": {
        "@type": "Organization",
        "name": siteName,
        "url": siteUrl
      }
    }
  } : null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{project.seo.title || `${project.title} | ${siteName} Portfolio`}</title>
      <meta name="description" content={project.seo.description || project.description} />
      <meta name="keywords" content={project.seo.keywords.join(', ')} />
      <link rel="canonical" href={project.seo.canonicalUrl || projectUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={project.seo.title || project.title} />
      <meta property="og:description" content={project.seo.description || project.description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={project.images[0]?.alt || project.title} />
      <meta property="og:url" content={projectUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="article:published_time" content={project.createdAt.toISOString()} />
      <meta property="article:modified_time" content={project.updatedAt.toISOString()} />
      <meta property="article:section" content={project.category.name} />
      {project.technologies.map((tech, index) => (
        <meta key={index} property="article:tag" content={tech.name} />
      ))}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={project.seo.title || project.title} />
      <meta name="twitter:description" content={project.seo.description || project.description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={project.images[0]?.alt || project.title} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Project-specific meta tags */}
      <meta name="project-status" content={project.status} />
      <meta name="project-category" content={project.category.name} />
      {project.client && <meta name="client" content={project.client.name} />}
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-US" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {clientData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clientData) }}
        />
      )}
    </Head>
  );
}

// SEO component for project listing pages
interface ProjectListSEOProps {
  title?: string;
  description?: string;
  category?: string;
  technology?: string;
  page?: number;
  totalProjects?: number;
  siteUrl?: string;
  siteName?: string;
}

export function ProjectListSEO({
  title,
  description,
  category,
  technology,
  page = 1,
  totalProjects,
  siteUrl = 'https://codenies.com',
  siteName = 'Codenies'
}: ProjectListSEOProps) {
  const pageTitle = title || 
    (category ? `${category} Projects` : 
     technology ? `${technology} Projects` : 
     'Our Work & Portfolio') + 
    (page > 1 ? ` - Page ${page}` : '') + 
    ` | ${siteName}`;

  const pageDescription = description || 
    (category ? `Explore our ${category.toLowerCase()} projects and case studies.` :
     technology ? `Projects and solutions built with ${technology}.` :
     'Discover our portfolio of successful projects, case studies, and client solutions across various industries and technologies.');

  const pageUrl = `${siteUrl}/work` + 
    (category ? `/category/${category.toLowerCase().replace(/\s+/g, '-')}` : '') +
    (technology ? `/technology/${technology.toLowerCase().replace(/\s+/g, '-')}` : '') +
    (page > 1 ? `?page=${page}` : '');

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={pageUrl} />
      
      {/* Pagination */}
      {page > 1 && (
        <link rel="prev" href={`${pageUrl.split('?')[0]}${page > 2 ? `?page=${page - 1}` : ''}`} />
      )}
      {totalProjects && Math.ceil(totalProjects / 12) > page && (
        <link rel="next" href={`${pageUrl.split('?')[0]}?page=${page + 1}`} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
    </Head>
  );
}