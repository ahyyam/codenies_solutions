import { NextResponse } from 'next/server';
import { SitemapGenerator } from '@/lib/utils/sitemap';
import { projectService } from '@/lib/data/project-service';

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codenies.com';
    
    // Get all active and completed projects
    const projects = projectService.getAllProjects()
      .filter(project => project.status === 'completed' || project.status === 'active');
    
    // Create sitemap generator
    const generator = new SitemapGenerator({
      siteUrl,
      includeImages: true, // Include images for projects
      excludePatterns: ['/admin', '/api', '/_next']
    });
    
    // Generate projects sitemap
    const sitemap = generator.generateProjectSitemap(projects);
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=7200, s-maxage=7200' // Cache for 2 hours
      }
    });
  } catch (error) {
    console.error('Error generating projects sitemap:', error);
    return new NextResponse('Error generating projects sitemap', { status: 500 });
  }
}