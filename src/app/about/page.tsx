import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Codenies Solutions - Software Development Agency',
  description: 'Learn about Codenies Solutions, a leading software development agency. We specialize in custom software, web & mobile development, e-commerce, AI automation, and UI/UX design. Discover our mission, vision, and commitment to excellence.',
  keywords: [
    'about codenies solutions',
    'software development agency',
    'custom software company',
    'web development team',
    'mobile app developers',
    'e-commerce development company',
    'AI automation experts',
    'UI/UX design agency'
  ],
  openGraph: {
    title: 'About Codenies Solutions - Software Development Agency',
    description: 'Learn about Codenies Solutions, a leading software development agency specializing in custom software, web & mobile development, e-commerce, AI automation, and UI/UX design.',
    url: 'https://codenies-solutions.com/about',
    siteName: 'Codenies Solutions',
    images: [
      {
        url: '/pics/about_image_768x512.png',
        width: 768,
        height: 512,
        alt: 'Codenies Solutions Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Codenies Solutions - Software Development Agency',
    description: 'Learn about Codenies Solutions, a leading software development agency specializing in custom software, web & mobile development, e-commerce, AI automation, and UI/UX design.',
    images: ['/pics/about_image_768x512.png'],
  },
  alternates: {
    canonical: 'https://codenies-solutions.com/about',
  },
};

const AboutPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Codenies Solutions",
            "description": "Learn about Codenies Solutions, a leading software development agency specializing in custom software, web & mobile development, e-commerce, AI automation, and UI/UX design.",
            "url": "https://codenies-solutions.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "Codenies Solutions",
              "description": "Custom software development agency specializing in web & mobile apps, e-commerce, AI automation, and UI/UX design.",
              "foundingDate": "2020",
              "numberOfEmployees": "10-50",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://codenies-solutions.com/contact"
              }
            }
          })
        }}
      />
      <section className="section-padding bg-background fade-in">
        <div className="container mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">About Codenies Solutions</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We are a passionate team of software developers, designers, and strategists 
              dedicated to transforming businesses through innovative technology solutions.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Image Section */}
            <div className="order-2 lg:order-1">
              <div className="card overflow-hidden">
                <Image
                  src="/pics/about_image_768x512.png"
                  alt="Codenies Solutions team collaborating on software development projects"
                  width={768}
                  height={512}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Text Content Section */}
            <div className="order-1 lg:order-2 space-y-8">
              <article>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Who We Are</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Codenies Solutions is a software agency dedicated to crafting innovative digital solutions. 
                  We specialize in web and mobile app development, custom software solutions, e-commerce development, 
                  AI automation, and UI/UX design. Our team combines technical expertise with creative problem-solving 
                  to deliver solutions that drive real business value.
                </p>
              </article>

              <article>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Our Mission</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  To transform ideas into reality through technology, providing exceptional software solutions 
                  that drive business growth and exceed client expectations. We believe in building long-term 
                  partnerships with our clients, understanding their unique challenges, and delivering solutions 
                  that create lasting impact.
                </p>
              </article>

              <article>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Our Vision</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  To be a leading software agency recognized for innovation, quality, and client satisfaction, 
                  shaping the future of digital solutions worldwide. We strive to be at the forefront of 
                  technological advancement while maintaining the highest standards of quality and service.
                </p>
              </article>

              <article>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Our Approach</h2>
                <p className="text-muted-foreground leading-relaxed">
                  With a focus on quality and client satisfaction, we strive to exceed expectations and deliver 
                  results that drive business growth. Our team of experienced developers, designers, and project 
                  managers work collaboratively to ensure every project is a success. We follow agile methodologies, 
                  maintain transparent communication, and prioritize delivering value at every stage of development.
                </p>
              </article>
            </div>
          </div>

          {/* Values Section */}
          <section className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 card hover:shadow-medium transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">Innovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We constantly explore new technologies and methodologies to deliver cutting-edge solutions.
                </p>
              </div>
              <div className="text-center p-8 card hover:shadow-medium transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">Quality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every line of code, every design element, and every solution meets our high standards of excellence.
                </p>
              </div>
              <div className="text-center p-8 card hover:shadow-medium transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">Partnership</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We build lasting relationships with our clients, working as an extension of their team.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
