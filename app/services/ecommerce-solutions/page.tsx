import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'E-commerce Solutions - Codenies Solutions',
  description: 'Custom e-commerce development services. We build online stores and marketplaces that drive sales and enhance customer experience.',
  keywords: ['e-commerce development', 'online store', 'marketplace', 'shopping cart', 'payment integration'],
};

const EcommerceSolutionsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 text-white overflow-hidden min-h-screen flex items-center pt-20">
        <div className="container-mobile section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-elegant font-bold mb-6 text-white leading-tight">
              E-commerce Solutions
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8 font-cursive">
              Custom online stores and marketplaces that drive sales and enhance customer experience 
              with modern design and powerful features.
            </p>
            <Link href="/consultation" className="btn-primary bg-white text-gray-700 hover:bg-gray-100 text-lg px-8 py-4">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="section-padding bg-white">
        <div className="container-mobile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                Complete E-commerce Solutions
              </h2>
              <p className="text-mobile text-gray-600 leading-relaxed mb-6">
                From simple online stores to complex marketplaces, we deliver e-commerce solutions 
                that convert visitors into customers and drive business growth.
              </p>
              <p className="text-mobile text-gray-600 leading-relaxed">
                Our platforms include inventory management, secure payment processing, 
                customer analytics, and mobile-responsive design for optimal user experience.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Secure payment gateways</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Inventory management</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Customer analytics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Mobile optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-gray-600 to-gray-700 text-white">
        <div className="container-mobile text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Launch Your Online Store?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let's build an e-commerce platform that grows your business and delights your customers.
          </p>
          <Link href="/consultation" className="btn-primary bg-white text-gray-700 hover:bg-gray-100">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
};

export default EcommerceSolutionsPage;
