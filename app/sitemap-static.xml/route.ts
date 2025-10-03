import { NextResponse } from 'next/server';
import { SitemapGenerator } from '@/lib/utils/sitemap';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Revalidate daily (static pages change less frequently)

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codenies.com';
    const startTime = Date.now();
    
    // Create sitemap generator with optimized settings for static pages
    const generator = new SitemapGenerator({
      siteUrl,
      includeImages: false, // Static pages don't need images
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
    
    // Generate static pages sitemap
    const sitemap = generator.generateStaticSitemap();
    
    const generationTime = Date.now() - startTime;
    console.log(`Static sitemap generated in ${generationTime}ms`);
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, max-age=43200, stale-while-revalidate=172800',
        'X-Generated-At': new Date().toISOString(),
        'X-Generation-Time': `${generationTime}ms`,
        'X-Sitemap-Type': 'static'
      }
    });
  } catch (error) {
    console.error('Critical error generating static sitemap:', error);
    
    // Fallback static sitemap with core pages
    const fallbackStatic = `<?xml version="1.0" encoding="UTF-8"?>
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
    <loc>https://codenies.com/services/website-development</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://codenies.com/services/ui-ux-design</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://codenies.com/services/ai-integration</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://codenies.com/work</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://codenies.com/consultation</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>https://codenies.com/privacy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://codenies.com/terms</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackStatic, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=600', // Shorter cache for fallback
        'X-Fallback': 'true',
        'X-Sitemap-Type': 'static'
      }
    });
  }
}