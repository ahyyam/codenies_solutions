import { BlogPost } from '@/lib/types/blog';
import { Project } from '@/lib/types/project';

interface SitemapUrl {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: SitemapImage[];
}

interface SitemapImage {
  url: string;
  caption?: string;
  title?: string;
  geoLocation?: string;
  license?: string;
}

interface SitemapOptions {
  siteUrl: string;
  includeImages?: boolean;
  excludePatterns?: string[];
}

export class SitemapGenerator {
  private siteUrl: string;
  private includeImages: boolean;
  private excludePatterns: string[];

  constructor(options: SitemapOptions) {
    this.siteUrl = options.siteUrl.replace(/\/$/, ''); // Remove trailing slash
    this.includeImages = options.includeImages ?? true;
    this.excludePatterns = options.excludePatterns ?? [];
  }

  /**
   * Generate sitemap XML for static pages
   */
  generateStaticSitemap(): string {
    const now = new Date();
    const staticPages: SitemapUrl[] = [
      {
        url: '/',
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 1.0
      },
      {
        url: '/about',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: '/services',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9
      },
      {
        url: '/services/website-development',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.85 // Higher priority for design-focused services
      },
      {
        url: '/services/saas-development',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: '/services/ecommerce-solutions',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: '/services/mobile-applications',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: '/services/ui-ux-design',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9 // Highest priority for UX design service
      },
      {
        url: '/services/ai-integration',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.85 // Higher priority for innovation-focused AI service
      },
      {
        url: '/blog',
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9
      },
      {
        url: '/work',
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85 // Higher priority for showcasing design work
      },
      {
        url: '/consultation',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75 // Slightly higher for business conversion
      },
      {
        url: '/privacy',
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3
      },
      {
        url: '/terms',
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3
      }
    ];

    return this.generateSitemapXML(staticPages);
  }

  /**
   * Generate sitemap XML for blog posts
   */
  generateBlogSitemap(posts: BlogPost[]): string {
    const blogUrls: SitemapUrl[] = posts
      .filter(post => post.status === 'published')
      .filter(post => !this.isExcluded(`/blog/${post.slug}`))
      .map(post => {
        // Calculate change frequency based on post age and activity
        const daysSinceUpdate = Math.floor((Date.now() - new Date(post.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
        let changeFreq: SitemapUrl['changeFrequency'] = 'monthly';
        
        if (daysSinceUpdate < 7) {
          changeFreq = 'weekly';
        } else if (daysSinceUpdate < 30) {
          changeFreq = 'monthly';
        } else if (daysSinceUpdate < 365) {
          changeFreq = 'yearly';
        } else {
          changeFreq = 'never';
        }

        // Calculate priority based on featured status, views, and recency
        let priority = 0.5;
        if (post.featured) priority += 0.2;
        if (post.analytics.views > 1000) priority += 0.1;
        if (daysSinceUpdate < 30) priority += 0.1;
        priority = Math.min(priority, 0.9); // Cap at 0.9

        // Include images if available
        const images: SitemapImage[] = [];
        if (post.featuredImage?.url) {
          images.push({
            url: post.featuredImage.url,
            caption: post.featuredImage.alt || post.title,
            title: post.title
          });
        }
        if (post.images) {
          post.images.forEach(img => {
            if (img.url) {
              images.push({
                url: img.url,
                caption: img.alt || post.title,
                title: post.title
              });
            }
          });
        }

        return {
          url: `/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt),
          changeFrequency: changeFreq,
          priority: Math.round(priority * 10) / 10,
          images: this.includeImages ? images : undefined
        };
      });

    return this.generateSitemapXML(blogUrls);
  }

  /**
   * Generate sitemap XML for projects
   */
  generateProjectSitemap(projects: Project[]): string {
    const projectUrls: SitemapUrl[] = projects
      .filter(project => project.status === 'completed' || project.status === 'active')
      .filter(project => !this.isExcluded(`/work/${project.slug}`))
      .map(project => {
        // Calculate change frequency based on project status and age
        const daysSinceUpdate = Math.floor((Date.now() - new Date(project.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
        let changeFreq: SitemapUrl['changeFrequency'] = 'monthly';
        
        if (project.status === 'active') {
          changeFreq = daysSinceUpdate < 30 ? 'weekly' : 'monthly';
        } else if (project.status === 'completed') {
          changeFreq = daysSinceUpdate < 90 ? 'monthly' : 'yearly';
        }

        // Calculate priority based on featured status, completion, and recency
        let priority = 0.4;
        if (project.featured) priority += 0.2;
        if (project.status === 'completed') priority += 0.1;
        if (project.results.length > 0) priority += 0.1;
        if (daysSinceUpdate < 60) priority += 0.1;
        priority = Math.min(priority, 0.8); // Cap at 0.8

        // Include project images
        const images: SitemapImage[] = [];
        project.images.forEach(img => {
          if (img.url) {
            images.push({
              url: img.url,
              caption: img.alt || project.title,
              title: project.title
            });
          }
        });

        return {
          url: `/work/${project.slug}`,
          lastModified: new Date(project.updatedAt),
          changeFrequency: changeFreq,
          priority: Math.round(priority * 10) / 10,
          images: this.includeImages ? images : undefined
        };
      });

    return this.generateSitemapXML(projectUrls);
  }

  /**
   * Generate sitemap index XML
   */
  generateSitemapIndex(posts?: BlogPost[], projects?: Project[]): string {
    const now = new Date().toISOString();
    
    // Calculate last modification dates for each sitemap
    const blogLastMod = posts && posts.length > 0 
      ? new Date(Math.max(...posts.map(p => new Date(p.updatedAt).getTime()))).toISOString()
      : now;
    
    const projectsLastMod = projects && projects.length > 0
      ? new Date(Math.max(...projects.map(p => new Date(p.updatedAt).getTime()))).toISOString()
      : now;

    const sitemaps = [
      {
        loc: `${this.siteUrl}/sitemap-static.xml`,
        lastmod: now
      },
      {
        loc: `${this.siteUrl}/sitemap-blog.xml`,
        lastmod: blogLastMod
      },
      {
        loc: `${this.siteUrl}/sitemap-projects.xml`,
        lastmod: projectsLastMod
      }
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    sitemaps.forEach(sitemap => {
      xml += '  <sitemap>\n';
      xml += `    <loc>${sitemap.loc}</loc>\n`;
      xml += `    <lastmod>${sitemap.lastmod}</lastmod>\n`;
      xml += '  </sitemap>\n';
    });
    
    xml += '</sitemapindex>';
    return xml;
  }

  /**
   * Generate complete sitemap XML
   */
  generateCompleteSitemap(posts: BlogPost[], projects: Project[]): string {
    const now = new Date();
    
    // Calculate last modification for dynamic pages based on content
    const blogLastMod = posts.length > 0 
      ? new Date(Math.max(...posts.filter(p => p.status === 'published').map(p => new Date(p.updatedAt).getTime())))
      : now;
    
    const workLastMod = projects.length > 0
      ? new Date(Math.max(...projects.filter(p => p.status === 'completed' || p.status === 'active').map(p => new Date(p.updatedAt).getTime())))
      : now;

    const staticUrls: SitemapUrl[] = [
      {
        url: '/',
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 1.0
      },
      {
        url: '/about',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: '/services',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9
      },
      {
        url: '/blog',
        lastModified: blogLastMod,
        changeFrequency: 'daily',
        priority: 0.9
      },
      {
        url: '/work',
        lastModified: workLastMod,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: '/consultation',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7
      }
    ];

    // Get blog URLs with enhanced metadata
    const blogUrls = posts
      .filter(post => post.status === 'published')
      .filter(post => !this.isExcluded(`/blog/${post.slug}`))
      .map(post => this.createBlogUrl(post));

    // Get project URLs with enhanced metadata
    const projectUrls = projects
      .filter(project => project.status === 'completed' || project.status === 'active')
      .filter(project => !this.isExcluded(`/work/${project.slug}`))
      .map(project => this.createProjectUrl(project));

    const allUrls = [...staticUrls, ...blogUrls, ...projectUrls];
    return this.generateSitemapXML(allUrls);
  }

  /**
   * Create blog URL with enhanced metadata
   */
  private createBlogUrl(post: BlogPost): SitemapUrl {
    const daysSinceUpdate = Math.floor((Date.now() - new Date(post.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
    
    let changeFreq: SitemapUrl['changeFrequency'] = 'monthly';
    if (daysSinceUpdate < 7) changeFreq = 'weekly';
    else if (daysSinceUpdate < 30) changeFreq = 'monthly';
    else if (daysSinceUpdate < 365) changeFreq = 'yearly';
    else changeFreq = 'never';

    let priority = 0.5;
    if (post.featured) priority += 0.2;
    if (post.analytics.views > 1000) priority += 0.1;
    if (daysSinceUpdate < 30) priority += 0.1;
    priority = Math.min(priority, 0.9);

    const images: SitemapImage[] = [];
    if (post.featuredImage?.url) {
      images.push({
        url: post.featuredImage.url,
        caption: post.featuredImage.alt || post.title,
        title: post.title
      });
    }

    return {
      url: `/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: changeFreq,
      priority: Math.round(priority * 10) / 10,
      images: this.includeImages ? images : undefined
    };
  }

  /**
   * Create project URL with enhanced metadata
   */
  private createProjectUrl(project: Project): SitemapUrl {
    const daysSinceUpdate = Math.floor((Date.now() - new Date(project.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
    
    let changeFreq: SitemapUrl['changeFrequency'] = 'monthly';
    if (project.status === 'active') {
      changeFreq = daysSinceUpdate < 30 ? 'weekly' : 'monthly';
    } else if (project.status === 'completed') {
      changeFreq = daysSinceUpdate < 90 ? 'monthly' : 'yearly';
    }

    let priority = 0.4;
    if (project.featured) priority += 0.2;
    if (project.status === 'completed') priority += 0.1;
    if (project.results.length > 0) priority += 0.1;
    if (daysSinceUpdate < 60) priority += 0.1;
    priority = Math.min(priority, 0.8);

    const images: SitemapImage[] = [];
    project.images.forEach(img => {
      if (img.url) {
        images.push({
          url: img.url,
          caption: img.alt || project.title,
          title: project.title
        });
      }
    });

    return {
      url: `/work/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: changeFreq,
      priority: Math.round(priority * 10) / 10,
      images: this.includeImages ? images : undefined
    };
  }

  /**
   * Generate XML from URL array
   */
  private generateSitemapXML(urls: SitemapUrl[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
    
    if (this.includeImages) {
      xml += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
    }
    
    xml += '>\n';

    urls.forEach(urlData => {
      xml += '  <url>\n';
      xml += `    <loc>${this.siteUrl}${urlData.url}</loc>\n`;
      
      if (urlData.lastModified) {
        xml += `    <lastmod>${urlData.lastModified.toISOString()}</lastmod>\n`;
      }
      
      if (urlData.changeFrequency) {
        xml += `    <changefreq>${urlData.changeFrequency}</changefreq>\n`;
      }
      
      if (urlData.priority !== undefined) {
        xml += `    <priority>${urlData.priority.toFixed(1)}</priority>\n`;
      }

      // Add image information if available
      if (this.includeImages && urlData.images && urlData.images.length > 0) {
        urlData.images.forEach(image => {
          xml += '    <image:image>\n';
          xml += `      <image:loc>${image.url}</image:loc>\n`;
          
          if (image.caption) {
            xml += `      <image:caption><![CDATA[${image.caption}]]></image:caption>\n`;
          }
          
          if (image.title) {
            xml += `      <image:title><![CDATA[${image.title}]]></image:title>\n`;
          }
          
          if (image.geoLocation) {
            xml += `      <image:geo_location>${image.geoLocation}</image:geo_location>\n`;
          }
          
          if (image.license) {
            xml += `      <image:license>${image.license}</image:license>\n`;
          }
          
          xml += '    </image:image>\n';
        });
      }
      
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  /**
   * Check if URL should be excluded
   */
  private isExcluded(url: string): boolean {
    return this.excludePatterns.some(pattern => {
      const regex = new RegExp(pattern);
      return regex.test(url);
    });
  }
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(siteUrl: string): string {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps - SEO optimized
Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/sitemap-index.xml

# Individual category sitemaps for better indexing
Sitemap: ${siteUrl}/sitemap-static.xml
Sitemap: ${siteUrl}/sitemap-blog.xml
Sitemap: ${siteUrl}/sitemap-projects.xml

# Google-specific optimization
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing-specific optimization  
User-agent: bingbot
Allow: /
Crawl-delay: 1

# All other crawlers
User-agent: *
Crawl-delay: 2

# Block admin and API areas completely
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /.next/
Disallow: /private/
Disallow: /.well-known/

# Block internal Next.js files
Disallow: /_vercel
Disallow: /.vercel/
Disallow: /404
Disallow: /500

# Allow critical pages and directories
Allow: /blog/
Allow: /work/
Allow: /services/
Allow: /about/
Allow: /consultation/
Allow: /privacy/
Allow: /terms/

# Optimize crawling of important service pages
Allow: /services/website-development
Allow: /services/ui-ux-design
Allow: /services/ai-integration
Allow: /services/mobile-applications
Allow: /services/saas-development
Allow: /services/ecommerce-solutions

# Block non-content file types
Disallow: /*.json$
Disallow: /*.log$
Disallow: /*.env$
Disallow: /*.config$
Disallow: /*.md$
Disallow: /*.txt$
Disallow: /*.xml$
Disallow: /*.css$
Disallow: /*.js$
Disallow: /*.map$

# Explicitly allow important static assets
Allow: /images/
Allow: /logo/
Allow: /public/

# Allow XML sitemaps and essential files
Allow: /sitemap*.xml$
Allow: /robots.txt$
Allow: /manifest.json$
Allow: /favicon.ico$
Allow: /apple-touch-icon.*
`;

  return robotsTxt;
}

/**
 * Utility functions for SEO
 */
export const seoUtils = {
  /**
   * Generate meta description from content
   */
  generateMetaDescription(content: string, maxLength: number = 160): string {
    // Remove HTML tags and extra whitespace
    const cleanContent = content
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleanContent.length <= maxLength) {
      return cleanContent;
    }
    
    // Find the last complete sentence within the limit
    const truncated = cleanContent.substring(0, maxLength);
    const lastSentence = truncated.lastIndexOf('.');
    
    if (lastSentence > maxLength * 0.7) {
      return cleanContent.substring(0, lastSentence + 1);
    }
    
    // If no good sentence break, truncate at word boundary
    const lastSpace = truncated.lastIndexOf(' ');
    return cleanContent.substring(0, lastSpace) + '...';
  },

  /**
   * Generate slug from title
   */
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  },

  /**
   * Calculate reading time
   */
  calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
    const wordCount = content
      .replace(/<[^>]*>/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0).length;
    
    return Math.ceil(wordCount / wordsPerMinute);
  },

  /**
   * Extract keywords from content
   */
  extractKeywords(content: string, maxKeywords: number = 10): string[] {
    // Simple keyword extraction - in production, use more sophisticated NLP
    const words = content
      .toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // Count word frequency
    const wordCount: Record<string, number> = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    // Sort by frequency and return top keywords
    return Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, maxKeywords)
      .map(([word]) => word);
  }
};