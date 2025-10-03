import { NextResponse } from 'next/server';
import { generateRobotsTxt } from '@/lib/utils/sitemap';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Revalidate daily

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codenies.com';
    const startTime = Date.now();
    
    // Generate optimized robots.txt
    const robotsTxt = generateRobotsTxt(siteUrl);
    
    const generationTime = Date.now() - startTime;
    console.log(`Robots.txt generated in ${generationTime}ms`);
    
    return new NextResponse(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, max-age=43200, stale-while-revalidate=172800',
        'X-Generated-At': new Date().toISOString(),
        'X-Generation-Time': `${generationTime}ms`,
        'X-Robots-Sitemaps': '4'
      }
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    
    // Fallback robots.txt
    const fallbackRobots = `User-agent: *
Allow: /

Sitemap: https://codenies.com/sitemap.xml
Sitemap: https://codenies.com/sitemap-index.xml

# Blocked areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allowed areas
Allow: /blog/
Allow: /work/
Allow: /services/
Allow: /about/
Allow: /consultation/`;

    return new NextResponse(fallbackRobots, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=600', // Shorter cache for fallback
        'X-Fallback': 'true'
      }
    });
  }
}