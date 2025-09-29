'use client';

import Head from 'next/head';
import { BlogPost } from '@/lib/types/blog';

interface BlogSEOProps {
  post: BlogPost;
  siteUrl?: string;
  siteName?: string;
  twitterHandle?: string;
}

export function BlogSEO({ 
  post, 
  siteUrl = 'https://codenies.com',
  siteName = 'Codenies',
  twitterHandle = '@codenies'
}: BlogSEOProps) {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.featuredImage?.url ? 
    (post.featuredImage.url.startsWith('http') ? post.featuredImage.url : `${siteUrl}${post.featuredImage.url}`) :
    `${siteUrl}/og-default-blog.jpg`;

  // Generate structured data for the blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      ...(post.author.avatar && { "image": post.author.avatar }),
      ...(post.author.bio && { "description": post.author.bio })
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo/web.png`
      }
    },
    "datePublished": post.publishedAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "url": postUrl,
    "wordCount": Math.ceil(post.content.length / 5), // Rough word count estimation
    "timeRequired": `PT${post.readTime}M`,
    "articleSection": post.category.name,
    "keywords": post.tags.map(tag => tag.name).join(', '),
    ...(post.analytics.views > 0 && {
      "interactionStatistic": [
        {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/ReadAction",
          "userInteractionCount": post.analytics.views
        },
        ...(post.analytics.likes > 0 ? [{
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/LikeAction",
          "userInteractionCount": post.analytics.likes
        }] : [])
      ]
    })
  };

  // Generate breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category.name,
        "item": `${siteUrl}/blog/category/${post.category.slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": postUrl
      }
    ]
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{post.seo.title || `${post.title} | ${siteName}`}</title>
      <meta name="description" content={post.seo.description || post.excerpt} />
      <meta name="keywords" content={post.seo.keywords.join(', ')} />
      <meta name="author" content={post.author.name} />
      <link rel="canonical" href={postUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.seo.title || post.title} />
      <meta property="og:description" content={post.seo.description || post.excerpt} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={post.featuredImage?.alt || post.title} />
      <meta property="og:url" content={postUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="article:published_time" content={post.publishedAt.toISOString()} />
      <meta property="article:modified_time" content={post.updatedAt.toISOString()} />
      <meta property="article:author" content={post.author.name} />
      <meta property="article:section" content={post.category.name} />
      {post.tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag.name} />
      ))}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={post.seo.title || post.title} />
      <meta name="twitter:description" content={post.seo.description || post.excerpt} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={post.featuredImage?.alt || post.title} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Reading Time */}
      <meta name="reading-time" content={`${post.readTime} minutes`} />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-US" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </Head>
  );
}

// SEO component for blog listing pages
interface BlogListSEOProps {
  title?: string;
  description?: string;
  category?: string;
  tag?: string;
  page?: number;
  totalPosts?: number;
  siteUrl?: string;
  siteName?: string;
}

export function BlogListSEO({
  title,
  description,
  category,
  tag,
  page = 1,
  totalPosts,
  siteUrl = 'https://codenies.com',
  siteName = 'Codenies'
}: BlogListSEOProps) {
  const pageTitle = title || 
    (category ? `${category} Articles` : 
     tag ? `Articles tagged "${tag}"` : 
     'Blog') + 
    (page > 1 ? ` - Page ${page}` : '') + 
    ` | ${siteName}`;

  const pageDescription = description || 
    (category ? `Explore our ${category.toLowerCase()} articles and insights.` :
     tag ? `Articles and tutorials about ${tag}.` :
     'Stay updated with the latest trends, best practices, and insights from the world of software development.');

  const pageUrl = `${siteUrl}/blog` + 
    (category ? `/category/${category.toLowerCase().replace(/\s+/g, '-')}` : '') +
    (tag ? `/tag/${tag.toLowerCase().replace(/\s+/g, '-')}` : '') +
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
      {totalPosts && Math.ceil(totalPosts / 10) > page && (
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