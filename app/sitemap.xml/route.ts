import { NextResponse } from 'next/server';
import { SitemapGenerator } from '@/lib/utils/sitemap';
import { blogService } from '@/lib/data/blog-service';
import { projectService } from '@/lib/data/project-service';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codenies.com';
    const startTime = Date.now();
    
    // Get all published blog posts and active/completed projects with error handling
    let posts = [];
    let projects = [];
    
    try {
      posts = blogService.getPublishedPosts();
      console.log(`Found ${posts.length} published blog posts`);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      posts = []; // Fallback to empty array
    }
    
    try {
      projects = projectService.getAllProjects()
        .filter(project => project.status === 'completed' || project.status === 'active');
      console.log(`Found ${projects.length} active/completed projects`);
    } catch (error) {
      console.error('Error fetching projects:', error);
      projects = []; // Fallback to empty array
    }
    
    // Create sitemap generator with enhanced settings
    const generator = new SitemapGenerator({
      siteUrl,
      includeImages: true,
      excludePatterns: [
        '/admin', 
        '/api', 
        '/_next', 
        '/private',
        '/auth',
        '/dashboard',
        '/404',
        '/500'
      ]
    });
    
    // Generate complete sitemap with enhanced metadata
    const sitemap = generator.generateCompleteSitemap(posts, projects);
    
    const generationTime = Date.now() - startTime;
    console.log(`Sitemap generated in ${generationTime}ms with ${posts.length} posts and ${projects.length} projects`);
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400, immutable',
        'X-Generated-At': new Date().toISOString(),
        'X-Generation-Time': `${generationTime}ms`,
        'X-Post-Count': posts.length.toString(),
        'X-Project-Count': projects.length.toString()
      }
    });
  } catch (error) {
    console.error('Critical error generating sitemap:', error);
    
    // Fallback to basic sitemap if full generation fails
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://codenies.com</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://codenies.com/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://codenies.com/services</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://codenies.com/work</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://codenies.com/consultation</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300', // Shorter cache for fallback
        'X-Fallback': 'true'
      }
    });
  }
}