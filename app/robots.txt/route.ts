import { NextResponse } from 'next/server';
import { generateRobotsTxt } from '@/lib/utils/sitemap';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codenies.com';
  const robotsTxt = generateRobotsTxt(siteUrl);
  
  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}