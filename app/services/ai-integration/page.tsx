import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'AI Integration - codenies',
  description: 'Cutting-edge artificial intelligence solutions to automate processes and enhance functionality with modern AI technologies.',
  keywords: ['AI integration', 'artificial intelligence', 'machine learning', 'automation', 'AI development'],
};

const AIIntegrationPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="AI Integration"
        subtitle="Automate processes and enhance functionality with practical machine learning."
        ctaHref="/consultation"
        ctaLabel="Start a project"
      />

      {/* What We Offer Section */}
      <section className="section-primary">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="heading-large text-heading mb-6">
                AI-Powered Solutions
              </h2>
              <p className="body-large text-body leading-relaxed mb-6">
                We integrate artificial intelligence into your existing systems to automate repetitive tasks, 
                provide intelligent insights, and enhance user experience. Our AI solutions are designed 
                to be scalable, secure, and cost-effective.
              </p>
              <p className="body-large text-body leading-relaxed">
                From chatbots to predictive analytics, we help businesses leverage AI to gain competitive 
                advantages and improve operational efficiency.
              </p>
            </div>
            <div className="card-accent">
              <div className="w-12 h-12 bg-gradient-tech rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="heading-medium text-heading mb-4">Key Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Machine learning</span>
                    <p className="body-small text-muted mt-1">Intelligent algorithms that learn and adapt</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Natural language processing</span>
                    <p className="body-small text-muted mt-1">Understanding and processing human language</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Predictive analytics</span>
                    <p className="body-small text-muted mt-1">Forecasting trends and outcomes</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <span className="body-large text-body font-medium">Process automation</span>
                    <p className="body-small text-muted mt-1">Streamlining workflows and operations</p>
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

export default AIIntegrationPage;
