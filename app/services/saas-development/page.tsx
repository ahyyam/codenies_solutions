import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SaaS Development Services - codenies',
  description: 'Professional SaaS development services. We build scalable, secure, and high-performance software-as-a-service platforms.',
  keywords: ['SaaS development', 'software as a service', 'cloud software development'],
};

const SaaSDevelopmentPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 text-white overflow-hidden min-h-screen flex items-center pt-20">
        <div className="container-mobile section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-elegant font-bold mb-6 text-white leading-tight">
              SaaS Development
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8 font-cursive">
              Build scalable, secure, and high-performance software-as-a-service platforms 
              that drive business growth and user engagement.
            </p>
            <Link href="/consultation" className="btn-primary bg-white text-gray-700 hover:bg-gray-100 text-lg px-8 py-4">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* What is SaaS Section */}
      <section className="section-padding bg-white">
        <div className="container-mobile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                What is SaaS Development?
              </h2>
              <p className="text-mobile text-gray-600 leading-relaxed mb-6">
                Software-as-a-Service (SaaS) is a software licensing and delivery model where software 
                is licensed on a subscription basis and is centrally hosted. SaaS applications are typically 
                accessed by users via a web browser.
              </p>
              <p className="text-mobile text-gray-600 leading-relaxed">
                Our SaaS development services focus on creating robust, scalable applications that can 
                handle multiple users, provide secure access, and offer seamless updates without user intervention.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Lower upfront costs</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Automatic updates</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Scalable infrastructure</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Cross-platform accessibility</span>
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
            Ready to Build Your SaaS Platform?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let's discuss your SaaS project and create a solution that scales with your business.
          </p>
          <Link href="/consultation" className="btn-primary bg-white text-gray-700 hover:bg-gray-100">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
};

export default SaaSDevelopmentPage;
