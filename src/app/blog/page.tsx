import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Blog - Software Development Insights | Codenies Solutions',
  description: 'Stay updated with the latest trends in software development, web & mobile app development, AI automation, and digital transformation. Expert insights from Codenies Solutions.',
  keywords: [
    'software development blog',
    'web development insights',
    'mobile app development tips',
    'AI automation blog',
    'digital transformation',
    'software development trends',
    'technology insights',
    'coding best practices'
  ],
  openGraph: {
    title: 'Blog - Software Development Insights | Codenies Solutions',
    description: 'Stay updated with the latest trends in software development, web & mobile app development, AI automation, and digital transformation.',
    url: 'https://codenies-solutions.com/blog',
    siteName: 'Codenies Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Software Development Insights | Codenies Solutions',
    description: 'Stay updated with the latest trends in software development, web & mobile app development, AI automation, and digital transformation.',
  },
  alternates: {
    canonical: 'https://codenies-solutions.com/blog',
  },
};

const BlogPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Codenies Solutions Blog",
            "description": "Software development insights and technology trends",
            "url": "https://codenies-solutions.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Codenies Solutions"
            }
          })
        }}
      />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary">Our Blog</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest trends in software development, 
              technology insights, and industry best practices. Our team shares 
              expert knowledge to help you navigate the digital landscape.
            </p>
          </header>

          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Coming Soon
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're working on creating valuable content to share our expertise 
                and insights with the software development community.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 bg-card rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-primary">
                    Web Development
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Latest trends in web development, frameworks, and best practices.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-primary">
                    Mobile Development
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Insights on mobile app development, cross-platform solutions, and user experience.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-primary">
                    AI & Automation
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Exploring the future of AI, machine learning, and business automation.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-muted-foreground">
                  Be the first to know when we publish new articles and insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Topics */}
          <section className="mt-16">
            <h2 className="text-3xl font-semibold text-center mb-12 text-primary">
              Topics We'll Cover
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary">Technology Trends</h3>
                <p className="text-muted-foreground text-sm">
                  Latest developments in software development and emerging technologies.
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary">Best Practices</h3>
                <p className="text-muted-foreground text-sm">
                  Proven methodologies and practices for successful software development.
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary">Case Studies</h3>
                <p className="text-muted-foreground text-sm">
                  Real-world examples of how we've helped businesses achieve their goals.
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary">Industry Insights</h3>
                <p className="text-muted-foreground text-sm">
                  Analysis of market trends and their impact on software development.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
