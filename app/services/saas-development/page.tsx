import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/common/PageHero';
import CTA from '@/components/common/CTA';

export const metadata: Metadata = {
  title: 'SaaS Development Services - codenies',
  description: 'Professional SaaS development services. We build scalable, secure, and high-performance software-as-a-service platforms.',
  keywords: ['SaaS development', 'software as a service', 'cloud software development'],
};

const SaaSDevelopmentPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="SaaS Development"
        subtitle="Build scalable, secure, and high‑performance SaaS platforms that drive growth and engagement."
        ctaHref="/consultation"
        ctaLabel="Start a project"
      />

      {/* What is SaaS Section */}
      <section className="section-primary">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="heading-large text-heading mb-6">
                What is SaaS Development?
              </h2>
              <p className="body-large text-body leading-relaxed mb-6">
                Software-as-a-Service (SaaS) is a software licensing and delivery model where software 
                is licensed on a subscription basis and is centrally hosted. SaaS applications are typically 
                accessed by users via a web browser.
              </p>
              <p className="body-large text-body leading-relaxed">
                Our SaaS development services focus on creating robust, scalable applications that can 
                handle multiple users, provide secure access, and offer seamless updates without user intervention.
              </p>
            </div>
            <div className="card-accent">
              <div className="w-12 h-12 bg-gradient-tech rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">☁️</span>
              </div>
              <h3 className="heading-medium text-heading mb-4">Key Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Lower upfront costs</span>
                    <p className="body-small text-muted mt-1">Subscription-based pricing model</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Automatic updates</span>
                    <p className="body-small text-muted mt-1">Always up-to-date features and security</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Scalable infrastructure</span>
                    <p className="body-small text-muted mt-1">Grows with your business needs</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Cross-platform accessibility</span>
                    <p className="body-small text-muted mt-1">Access from any device, anywhere</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTA 
        variant="gradient"
        title="Ready to Build Your SaaS Platform?"
        subtitle="Let's discuss your SaaS project and create a solution that scales with your business."
        primaryText="Start Your Project"
        secondaryText="View Our Work"
        benefits={["Scalable architecture", "Security first", "Cloud native"]}
      />

    </>
  );
};

export default SaaSDevelopmentPage;
