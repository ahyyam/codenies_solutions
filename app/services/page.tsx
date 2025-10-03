import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Globe, ShoppingCart, Code, Smartphone, Palette, Brain, ArrowRight, CheckCircle, Star } from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import CTA from '@/components/common/CTA';
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
      href: '/services/saas-development'
    },
    {
      title: 'E-commerce Solutions',
      description: 'Custom online stores and marketplaces that drive sales and enhance customer experience.',
      icon: ShoppingCart,
      href: '/services/ecommerce-solutions'
    },
    {
      title: 'Website Development',
      description: 'High-performance websites that convert visitors into customers with optimal user experience.',
      icon: Code,
      href: '/services/website-development'
    },
    {
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps that engage users across iOS and Android devices.',
      icon: Smartphone,
      href: '/services/mobile-applications'
    },
    {
      title: 'UI/UX Design',
      description: 'Intuitive and beautiful interfaces that prioritize user experience and business goals.',
      icon: Palette,
      href: '/services/ui-ux-design'
    },
    {
      title: 'AI Integration',
      description: 'Cutting-edge artificial intelligence solutions to automate processes and enhance functionality.',
      icon: Brain,
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  href={service.href}
                  className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-subtle">
        <div className="container-responsive">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 text-gray-900">
            Why Choose Our Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Team</h3>
              <p className="text-gray-600 leading-relaxed">
                Business-focused experts who understand how technology drives revenue growth and operational efficiency.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Modern Technologies</h3>
              <p className="text-gray-600 leading-relaxed">
                Cutting-edge technologies that provide competitive advantage and reduce long-term operational costs.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                Quality standards that ensure long-term business value and minimize maintenance costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA 
        variant="gradient"
        title="Ready to Start Your Project?"
        subtitle="Discover how our strategic technology solutions can increase your revenue, reduce costs, and accelerate growth."
        primaryText="Get Free Consultation"
        secondaryText="View Our Portfolio"
        benefits={["Expert team", "Modern technologies", "Quality assurance"]}
      />

    </>
  );
};

export default ServicesPage;
