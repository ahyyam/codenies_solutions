import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mobile Applications - codenies',
  description: 'Native and cross-platform mobile apps that engage users across iOS and Android devices with modern design and functionality.',
  keywords: ['mobile app development', 'iOS development', 'Android development', 'cross-platform apps', 'mobile applications'],
};

const MobileApplicationsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 text-white overflow-hidden min-h-screen flex items-center pt-20">
        <div className="container-mobile section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-elegant font-bold mb-6 text-white leading-tight">
              Mobile Applications
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8 font-cursive">
              Native and cross-platform mobile apps that engage users across iOS and Android devices 
              with modern design, smooth performance, and intuitive user experience.
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
                Mobile App Development
              </h2>
              <p className="text-mobile text-gray-600 leading-relaxed mb-6">
                We specialize in creating mobile applications that users love to use. Our apps are built 
                with performance, security, and user experience in mind, ensuring they work seamlessly 
                across all devices and platforms.
              </p>
              <p className="text-mobile text-gray-600 leading-relaxed">
                Whether you need a native iOS app, Android app, or cross-platform solution, 
                we deliver apps that meet your business goals and exceed user expectations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Native performance</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Cross-platform support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Offline functionality</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700">Push notifications</span>
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
            Ready to Build Your Mobile App?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let's create a mobile app that engages your users and grows your business.
          </p>
          <Link href="/consultation" className="btn-primary bg-white text-gray-700 hover:bg-gray-100">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
};

export default MobileApplicationsPage;
