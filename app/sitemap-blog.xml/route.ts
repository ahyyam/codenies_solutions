import { NextResponse } from 'next/server';
import { SitemapGenerator } from '@/lib/utils/sitemap';
import { blogService } from '@/lib/data/blog-service';

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codenies.com';
    
    // Get all published blog posts
    const posts = blogService.getPublishedPosts();
    
    // Create sitemap generator
    const generator = new SitemapGenerator({
      siteUrl,
      includeImages: true, // Include images for blog posts
      excludePatterns: ['/admin', '/api', '/_next']
    });
    
    // Generate blog sitemap
    const sitemap = generator.generateBlogSitemap(posts);
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600' // Cache for 1 hour (blog updates more frequently)
      }
    });
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    return new NextResponse('Error generating blog sitemap', { status: 500 });
  }
}