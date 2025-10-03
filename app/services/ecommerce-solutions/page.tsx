import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'E-commerce Solutions - codenies',
  description: 'Custom e-commerce development services. We build online stores and marketplaces that drive sales and enhance customer experience.',
  keywords: ['e-commerce development', 'online store', 'marketplace', 'shopping cart', 'payment integration'],
};

const EcommerceSolutionsPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="E‑commerce Solutions"
        subtitle="Online stores and marketplaces that convert — modern design and powerful features."
        ctaHref="/consultation"
        ctaLabel="Start a project"
      />

      {/* What We Offer Section */}
      <section className="section-primary">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="heading-large text-heading mb-6">
                Complete E-commerce Solutions
              </h2>
              <p className="body-large text-body leading-relaxed mb-6">
                From simple online stores to complex marketplaces, we deliver e-commerce solutions 
                that convert visitors into customers and drive business growth.
              </p>
              <p className="body-large text-body leading-relaxed">
                Our platforms include inventory management, secure payment processing, 
                customer analytics, and mobile-responsive design for optimal user experience.
              </p>
            </div>
            <div className="card-accent">
              <div className="w-12 h-12 bg-gradient-innovation rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="heading-medium text-heading mb-4">Key Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Secure payment gateways</span>
                    <p className="body-small text-muted mt-1">Multiple payment options with security</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Inventory management</span>
                    <p className="body-small text-muted mt-1">Real-time stock tracking and alerts</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Customer analytics</span>
                    <p className="body-small text-muted mt-1">Insights into customer behavior and sales</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Mobile optimization</span>
                    <p className="body-small text-muted mt-1">Seamless shopping on all devices</p>
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

export default EcommerceSolutionsPage;
