import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Website Development - codenies',
  description: 'High-performance websites that convert visitors into customers with optimal user experience and modern design.',
  keywords: ['website development', 'web design', 'responsive design', 'custom websites', 'web applications'],
};

const WebsiteDevelopmentPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white overflow-hidden min-h-screen flex items-center pt-20">
        <div className="container-mobile section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-elegant font-bold mb-6 text-white leading-tight">
              Website Development
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8 font-cursive">
              High-performance websites that convert visitors into customers with optimal user experience, 
              modern design, and powerful functionality.
            </p>
            <Link href="/consultation" className="btn-primary bg-white text-gray-800 hover:bg-gray-100 text-lg px-8 py-4">
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
                Professional Website Development
              </h2>
              <p className="text-mobile text-gray-600 leading-relaxed mb-6">
                We create custom websites that not only look stunning but also perform exceptionally well. 
                Our websites are built with modern technologies, SEO best practices, and conversion optimization.
              </p>
              <p className="text-mobile text-gray-600 leading-relaxed">
                From simple landing pages to complex web applications, we deliver solutions that 
                meet your business objectives and exceed user expectations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Responsive design</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">SEO optimization</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Fast loading</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Conversion focused</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-gray-700 to-gray-800 text-white">
        <div className="container-mobile text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Build Your Website?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let's create a website that represents your brand and drives business results.
          </p>
          <Link href="/consultation" className="btn-primary bg-white text-gray-800 hover:bg-gray-100">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
};

export default WebsiteDevelopmentPage;
