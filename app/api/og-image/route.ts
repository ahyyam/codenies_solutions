import { NextRequest, NextResponse } from 'next/server';
import { generateOGImageSVG } from '@/lib/utils/og-image-generator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = (searchParams.get('title') || 'Codenies - Tech Innovation').slice(0, 100);
    const subtitle = (searchParams.get('subtitle') || '').slice(0, 200);
    const type = searchParams.get('type') || 'default';
    const width = Math.min(Math.max(parseInt(searchParams.get('width') || '1200'), 400), 2048);
    const height = Math.min(Math.max(parseInt(searchParams.get('height') || '630'), 200), 2048);

    // Validate type parameter
    const validTypes = ['default' as const, 'blog' as const, 'service' as const, 'project' as const];
    const validatedType = validTypes.includes(type as any) ? type as 'default' | 'blog' | 'service' | 'project' : 'default';
    
    // Validate dimensions
    if (isNaN(width) || isNaN(height)) {
      return new NextResponse('Invalid dimensions', { status: 400 });
    }

    // Generate SVG
    const svg = generateOGImageSVG({
      title,
      subtitle,
      type: validatedType,
      width,
      height
    });

    // Return SVG with proper headers
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'CDN-Cache-Control': 'public, max-age=31536000',
        'Vercel-CDN-Cache-Control': 'public, max-age=31536000'
      }
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    // Return a simple fallback SVG
    const fallbackSvg = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#5A00D2" />
        <text x="60" y="300" font-family="system-ui, sans-serif" font-size="48" font-weight="bold" fill="white">
          Codenies - Tech Innovation
        </text>
      </svg>
    `;

    return new NextResponse(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
}