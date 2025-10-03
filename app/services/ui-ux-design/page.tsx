import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'UI/UX Design - codenies',
  description: 'User-centered UI/UX design services that improve conversion and reduce friction.',
  keywords: ['ui ux design', 'product design', 'user experience', 'wireframes', 'prototyping'],
};

const UIDesignPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="UI/UX Design"
        subtitle="User‑centered design that reduces friction and increases conversion."
        ctaHref="/consultation"
        ctaLabel="Start a project"
      />

      {/* What We Offer Section */}
      <section className="section-padding bg-background">
        <div className="container-mobile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="heading-large text-heading mb-6">
                Design That Drives Outcomes
              </h2>
              <p className="body-large text-body leading-relaxed mb-6">
                We design interfaces that are delightful and clear, using research and rapid prototyping
                to validate ideas and remove friction across the journey.
              </p>
              <p className="body-large text-body leading-relaxed">
                From discovery workshops to handoff, we collaborate closely with your team to ensure
                the shipped product matches user needs and business goals.
              </p>
            </div>
            <div className="card-accent">
              <div className="w-12 h-12 bg-gradient-innovation rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="heading-medium text-heading mb-4">Key Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">User research</span>
                    <p className="body-small text-muted mt-1">Understanding user needs and behaviors</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Wireframing</span>
                    <p className="body-small text-muted mt-1">Structural blueprints for optimal flow</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Prototyping</span>
                    <p className="body-small text-muted mt-1">Interactive mockups for validation</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">User testing</span>
                    <p className="body-small text-muted mt-1">Validating design decisions with real users</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-innovation relative overflow-hidden section-py-lg">
        <div className="absolute inset-0 bg-gradient-radial-innovation opacity-30" aria-hidden="true" />
        <div className="container-mobile text-center relative z-10">
          <h2 className="heading-large text-white mb-6">
            Ready to Elevate Your Product?
          </h2>
          <p className="body-large text-white/90 mb-8 max-w-2xl mx-auto">
            Let’s redesign with clarity and speed to increase conversion and satisfaction.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90 mb-6">
            <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-white/80" /> User-centered design</div>
            <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-white/80" /> Conversion focused</div>
            <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-white/80" /> Rapid prototyping</div>
          </div>
          <Link 
            href="/consultation" 
            className="btn-primary bg-white text-foreground hover:bg-gray-100 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
};

export default UIDesignPage;
