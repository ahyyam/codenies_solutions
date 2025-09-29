import { NextResponse } from 'next/server';
import { SitemapGenerator } from '@/lib/utils/sitemap';

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codenies.com';
    
    // Create sitemap generator
    const generator = new SitemapGenerator({
      siteUrl,
      includeImages: false, // Static pages don't need images
      excludePatterns: ['/admin', '/api', '/_next']
    });
    
    // Generate static pages sitemap
    const sitemap = generator.generateStaticSitemap();
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400' // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error('Error generating static sitemap:', error);
    return new NextResponse('Error generating static sitemap', { status: 500 });
  }
}