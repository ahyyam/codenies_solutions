import { NextResponse } from 'next/server';
import { SitemapGenerator } from '@/lib/utils/sitemap';
import { blogService } from '@/lib/data/blog-service';
import { projectService } from '@/lib/data/project-service';

export const dynamic = 'force-dynamic';
export const revalidate = 7200; // Revalidate every 2 hours (indexes change less frequently)

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codenies.com';
    const startTime = Date.now();
    
    // Get data to calculate last modification dates with error handling
    let posts = [];
    let projects = [];
    
    try {
      posts = blogService.getPublishedPosts();
      console.log(`Sitemap Index: Found ${posts.length} published blog posts`);
    } catch (error) {
      console.error('Error fetching blog posts for sitemap index:', error);
      posts = [];
    }
    
    try {
      projects = projectService.getAllProjects()
        .filter(project => project.status === 'completed' || project.status === 'active');
      console.log(`Sitemap Index: Found ${projects.length} active/completed projects`);
    } catch (error) {
      console.error('Error fetching projects for sitemap index:', error);
      projects = [];
    }
    
    // Create sitemap generator with optimized settings
    const generator = new SitemapGenerator({
      siteUrl,
      includeImages: false, // Index doesn't need image data
      excludePatterns: [
        '/admin', 
        '/api', 
        '/_next', 
        '/private',
        '/auth',
        '/dashboard'
      ]
    });
    
    // Generate sitemap index
    const sitemapIndex = generator.generateSitemapIndex(posts, projects);
    
    const generationTime = Date.now() - startTime;
    const totalUrls = posts.length + projects.length + 6; // 6 static pages
    
    console.log(`Sitemap Index generated in ${generationTime}ms`);
    
    return new NextResponse(sitemapIndex, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=7200, max-age=3600, stale-while-revalidate=86400',
        'X-Generated-At': new Date().toISOString(),
        'X-Generation-Time': `${generationTime}ms`,
        'X-Total-Urls': totalUrls.toString(),
        'X-Sitemap-Count': '4'
      }
    });
  } catch (error) {
    console.error('Critical error generating sitemap index:', error);
    
    // Fallback sitemap index with basic structure
    const fallbackIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://codenies.com/sitemap-static.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://codenies.com/sitemap-blog.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://codenies.com/sitemap-projects.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;

    return new NextResponse(fallbackIndex, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=600', // Shorter cache for fallback
        'X-Fallback': 'true'
      }
    });
  }
}