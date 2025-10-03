import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Globe, ShoppingCart, Code, Smartphone, Palette, Brain, ArrowRight } from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import { generateBreadcrumbStructuredData } from '@/lib/utils/seo';

export const metadata: Metadata = {
  title: 'Our Services - codenies',
  description: 'Comprehensive software development services including SaaS development, e-commerce solutions, website development, mobile apps, UI/UX design, and AI integration.',
  keywords: [
    'software development services',
    'SaaS development',
    'e-commerce solutions',
    'website development',
    'mobile app development',
    'UI/UX design',
    'AI integration'
  ],
  openGraph: {
    title: 'Our Services - codenies',
    description: 'Comprehensive software development services for modern businesses.',
    type: 'website',
          url: 'https://codenies.com/services',
  },
};

const ServicesPage = () => {
  const services = [
    {
      title: 'SaaS Development',
      description: 'Scalable software-as-a-service platforms built with modern technologies and best practices.',
      icon: Globe,
      color: 'from-gray-600 to-gray-700',
      textColor: 'text-gray-700',
      hoverColor: 'hover:text-gray-800',
      href: '/services/saas-development'
    },
    {
      title: 'E-commerce Solutions',
      description: 'Custom online stores and marketplaces that drive sales and enhance customer experience.',
      icon: ShoppingCart,
      color: 'from-gray-500 to-gray-600',
      textColor: 'text-gray-600',
      hoverColor: 'hover:text-gray-700',
      href: '/services/ecommerce-solutions'
    },
    {
      title: 'Website Development',
      description: 'High-performance websites that convert visitors into customers with optimal user experience.',
      icon: Code,
      color: 'from-gray-700 to-gray-800',
      textColor: 'text-gray-800',
      hoverColor: 'hover:text-gray-900',
      href: '/services/website-development'
    },
    {
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps that engage users across iOS and Android devices.',
      icon: Smartphone,
      color: 'from-gray-600 to-gray-700',
      textColor: 'text-gray-700',
      hoverColor: 'hover:text-gray-800',
      href: '/services/mobile-applications'
    },
    {
      title: 'UI/UX Design',
      description: 'Intuitive and beautiful interfaces that prioritize user experience and business goals.',
      icon: Palette,
      color: 'from-gray-500 to-gray-600',
      textColor: 'text-gray-600',
      hoverColor: 'hover:text-gray-700',
      href: '/services/ui-ux-design'
    },
    {
      title: 'AI Integration',
      description: 'Cutting-edge artificial intelligence solutions to automate processes and enhance functionality.',
      icon: Brain,
      color: 'from-gray-700 to-gray-800',
      textColor: 'text-gray-800',
      hoverColor: 'hover:text-gray-900',
      href: '/services/ai-integration'
    }
  ];

  return (
    <>
      {/* Breadcrumb JSON-LD */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbStructuredData([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' }
          ])) }}
        />
      </Head>
      <PageHero
        eyebrow="Leading Software Development Agency"
        title="Services engineered for business outcomes"
        subtitle="Strategy, design, and engineering to launch and scale SaaS, AI, mobile, and web products."
        ctaHref="/consultation"
        ctaLabel="Start a project"
        secondaryHref="/work"
        secondaryLabel="View our work"
      />

      {/* Services Grid */}
      <section className="section-primary">
        <div className="container-responsive">
          <div className="card-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card group">
                <div className="service-card-icon">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="subheading text-heading mb-4">
                  {service.title}
                </h3>
                <p className="body-large text-body mb-6 flex-grow">
                  {service.description}
                </p>
                <Link 
                  href={service.href}
                  className="text-primary font-medium hover:text-accent transition-colors inline-flex items-center mt-auto"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-subtle">
        <div className="container-responsive">
          <h2 className="heading-large text-heading text-center mb-16">
            Why Choose Our Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-700">✓</span>
              </div>
              <h3 className="subheading text-heading mb-3">Expert Team</h3>
              <p className="body-large text-body">
                Business-focused experts who understand how technology drives revenue growth and operational efficiency.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-700">✓</span>
              </div>
              <h3 className="subheading text-heading mb-3">Modern Technologies</h3>
              <p className="body-large text-body">
                Cutting-edge technologies that provide competitive advantage and reduce long-term operational costs.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-700">✓</span>
              </div>
              <h3 className="subheading text-heading mb-3">Quality Assurance</h3>
              <p className="body-large text-body">
                Quality standards that ensure long-term business value and minimize maintenance costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-contrast">
        <div className="container-responsive text-center">
          <h2 className="heading-large text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="body-large text-white/90 mb-8 max-w-2xl mx-auto">
            Discover how our strategic technology solutions can increase your revenue, reduce costs, and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation" className="btn-primary bg-white text-gray-800 hover:bg-gray-100">
              Get Free Consultation
            </Link>
            <Link href="/work" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-gray-800">
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
