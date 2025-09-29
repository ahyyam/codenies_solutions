import { NextResponse } from 'next/server';
import { SitemapGenerator } from '@/lib/utils/sitemap';
import { blogService } from '@/lib/data/blog-service';
import { projectService } from '@/lib/data/project-service';

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codenies.com';
    
    // Get all published blog posts and active/completed projects
    const posts = blogService.getPublishedPosts();
    const projects = projectService.getAllProjects()
      .filter(project => project.status === 'completed' || project.status === 'active');
    
    // Create sitemap generator with enhanced settings
    const generator = new SitemapGenerator({
      siteUrl,
      includeImages: true,
      excludePatterns: ['/admin', '/api', '/_next', '/private']
    });
    
    // Generate complete sitemap with enhanced metadata
    const sitemap = generator.generateCompleteSitemap(posts, projects);
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}