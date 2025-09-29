import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Globe, ShoppingCart, Code, Smartphone, Palette, Brain, ArrowRight } from 'lucide-react';

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden min-h-screen flex items-center pt-20">
        <div className="container-mobile section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-elegant font-bold mb-6 text-white leading-tight">
              Our Services
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 font-cursive">
              Strategic technology solutions that drive revenue growth, reduce operational costs, and deliver competitive advantage. 
              Explore services designed to accelerate your business success and maximize ROI.
            </p>
            <Link 
              href="/consultation" 
              className="btn-primary bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-mobile">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card-mobile hover:shadow-lg transition-smooth group flex flex-col h-full">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={service.href}
                    className={`inline-flex items-center text-sm font-medium ${service.textColor} ${service.hoverColor} transition-colors`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-mobile">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 text-gray-900">
            Why Choose Our Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-700">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Expert Team</h3>
              <p className="text-gray-600">
                Business-focused experts who understand how technology drives revenue growth and operational efficiency.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-700">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Modern Technologies</h3>
              <p className="text-gray-600">
                Cutting-edge technologies that provide competitive advantage and reduce long-term operational costs.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-700">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Quality Assurance</h3>
              <p className="text-gray-600">
                Quality standards that ensure long-term business value and minimize maintenance costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-gray-700 to-gray-800 text-white">
        <div className="container-mobile text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
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
