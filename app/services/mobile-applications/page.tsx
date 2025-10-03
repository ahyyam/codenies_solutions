import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'Mobile Applications - codenies',
  description: 'Native and cross-platform mobile apps that engage users across iOS and Android devices with modern design and functionality.',
  keywords: ['mobile app development', 'iOS development', 'Android development', 'cross-platform apps', 'mobile applications'],
};

const MobileApplicationsPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Mobile Applications"
        subtitle="Native and cross‑platform apps with modern design, performance, and UX."
        ctaHref="/consultation"
        ctaLabel="Start a project"
      />

      {/* What We Offer Section */}
      <section className="section-primary">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="heading-large text-heading mb-6">
                Mobile App Development
              </h2>
              <p className="body-large text-body leading-relaxed mb-6">
                We specialize in creating mobile applications that users love to use. Our apps are built 
                with performance, security, and user experience in mind, ensuring they work seamlessly 
                across all devices and platforms.
              </p>
              <p className="body-large text-body leading-relaxed">
                Whether you need a native iOS app, Android app, or cross-platform solution, 
                we deliver apps that meet your business goals and exceed user expectations.
              </p>
            </div>
            <div className="card-accent">
              <div className="w-12 h-12 bg-gradient-tech rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="heading-medium text-heading mb-4">Key Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Native performance</span>
                    <p className="body-small text-muted mt-1">Optimized for iOS and Android platforms</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Cross-platform support</span>
                    <p className="body-small text-muted mt-1">Single codebase for multiple platforms</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Offline functionality</span>
                    <p className="body-small text-muted mt-1">Works seamlessly without internet</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Push notifications</span>
                    <p className="body-small text-muted mt-1">Engage users with timely updates</p>
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

export default MobileApplicationsPage;
