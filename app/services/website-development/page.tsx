import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'Website Development - codenies',
  description: 'High-performance websites that convert visitors into customers with optimal user experience and modern design.',
  keywords: ['website development', 'web design', 'responsive design', 'custom websites', 'web applications'],
};

const WebsiteDevelopmentPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Website Development"
        subtitle="High‑performance websites engineered to rank, convert, and tell your story."
        ctaHref="/consultation"
        ctaLabel="Start a project"
      />

      {/* What We Offer Section */}
      <section className="section-primary">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="heading-large text-heading mb-6">
                Professional Website Development
              </h2>
              <p className="body-large text-body leading-relaxed mb-6">
                We create custom websites that not only look stunning but also perform exceptionally well.
                Our websites are built with modern technologies, SEO best practices, and conversion optimization.
              </p>
              <p className="body-large text-body leading-relaxed">
                From simple landing pages to complex web applications, we deliver solutions that
                meet your business objectives and exceed user expectations.
              </p>
            </div>
            <div className="card-accent">
              <div className="w-12 h-12 bg-gradient-innovation rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="heading-medium text-heading mb-4">Key Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Responsive design</span>
                    <p className="body-small text-muted mt-1">Optimized for all devices and screen sizes</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">SEO optimization</span>
                    <p className="body-small text-muted mt-1">Built for search engine visibility</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Fast loading</span>
                    <p className="body-small text-muted mt-1">Optimized performance and speed</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Conversion focused</span>
                    <p className="body-small text-muted mt-1">Designed to turn visitors into customers</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default WebsiteDevelopmentPage;
