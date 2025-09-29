import { NextResponse } from 'next/server';
import { SitemapGenerator } from '@/lib/utils/sitemap';
import { blogService } from '@/lib/data/blog-service';
import { projectService } from '@/lib/data/project-service';

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codenies.com';
    
    // Get data to calculate last modification dates
    const posts = blogService.getPublishedPosts();
    const projects = projectService.getAllProjects()
      .filter(project => project.status === 'completed' || project.status === 'active');
    
    // Create sitemap generator
    const generator = new SitemapGenerator({
      siteUrl,
      includeImages: false,
      excludePatterns: ['/admin', '/api', '/_next']
    });
    
    // Generate sitemap index
    const sitemapIndex = generator.generateSitemapIndex(posts, projects);
    
    return new NextResponse(sitemapIndex, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    return new NextResponse('Error generating sitemap index', { status: 500 });
  }
}