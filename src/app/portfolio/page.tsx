import type { Metadata } from 'next';
import Portfolio from '@/components/Portfolio';

export const metadata: Metadata = {
  title: 'Portfolio | Codenies Solutions',
  description: 'Explore our featured projects and client success stories across web, mobile, AI, and custom software.',
  alternates: { canonical: 'https://codenies-solutions.com/portfolio' },
  openGraph: {
    title: 'Portfolio | Codenies Solutions',
    description: 'Explore our featured projects and client success stories across web, mobile, AI, and custom software.',
    url: 'https://codenies-solutions.com/portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Codenies Solutions',
    description: 'Explore our featured projects and client success stories.',
  },
};

export default function PortfolioPage() {
  return (
    <Portfolio />
  );
}


