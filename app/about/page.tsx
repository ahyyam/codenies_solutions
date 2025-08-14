import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, CheckCircle, TrendingUp, Zap, Shield, Star, Sparkles, Target, Eye, Heart, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: 'About Codenies Solutions',
  description: 'Learn about Codenies Solutions, a leading software development agency. We specialize in custom software, web & mobile development, e-commerce, AI automation, and UI/UX design. Discover our mission, vision, and commitment to excellence.',
  keywords: [
    'about codenies solutions',
    'software development agency',
    'custom software company',
    'web development team',
    'mobile app developers',
    'e-commerce development company',
    'AI automation experts',
    'UI/UX design agency',
    'digital transformation',
    'business software solutions'
  ],
  openGraph: {
    title: 'About Codenies Solutions - Software Development Agency',
    description: 'Learn about Codenies Solutions, a leading software development agency specializing in custom software, web & mobile development, e-commerce, AI automation, and UI/UX design.',
    type: 'website',
    url: 'https://codenis.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Codenies Solutions - Software Development Agency',
    description: 'Learn about Codenies Solutions, a leading software development agency specializing in custom software, web & mobile development, e-commerce, AI automation, and UI/UX design.',
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
            "mainEntity": {
              "@type": "Organization",
              "name": "Codenies Solutions",
              "description": "Custom software development agency specializing in web & mobile apps, e-commerce, AI automation, and UI/UX design.",
              "foundingDate": "2020",
              "numberOfEmployees": "10-50",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              }
            }
          })
        }}
      />
      
      {/* Enhanced Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-20 min-h-screen flex items-center" aria-labelledby="about-hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
        <div className="container mx-auto text-center max-w-5xl relative z-10">

          
          <h1 id="about-hero-heading" className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-elegant font-bold text-gray-900 mb-6 leading-tight">
            Building the Future,{' '}
            <span className="hero-gradient-text block">
              One Line at a Time
            </span>
          </h1>
          
          <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto font-cursive">
            We are a passionate team of software developers, designers, and strategists 
            dedicated to <span className="font-semibold text-primary">transforming businesses</span> through 
            <span className="font-semibold text-primary"> innovative technology solutions</span>.
          </p>

          {/* Enhanced CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              asChild 
              size="lg" 
              className="btn-hero-primary text-lg px-8 py-4 group hover:scale-105 transition-all duration-300"
            >
              <Link href="/consultation">
                <Zap className="w-5 h-5 mr-2" />
                Get Free Strategy Session
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="btn-secondary text-lg px-6 py-4 group hover:scale-105 transition-all duration-300 border-2 hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="/work">
                <Eye className="w-5 h-5 mr-2" />
                View Our Portfolio
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span className="group-hover:text-primary transition-colors">100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span className="group-hover:text-primary transition-colors">24/7 Expert Support</span>
            </div>
            <div className="flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <span className="group-hover:text-primary transition-colors">Award-Winning Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                  Who We Are
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Codenies Solutions is a software agency dedicated to crafting innovative digital solutions. 
                  We specialize in web and mobile app development, custom software solutions, e-commerce development, 
                  AI automation, and UI/UX design. Our team combines technical expertise with creative problem-solving 
                  to deliver solutions that drive real business value.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-white shadow-xl">
                <div className="text-center">
                  <Target className="w-12 h-12 mx-auto mb-4 text-white/90" />
                  <h3 className="text-2xl font-bold mb-4">Technology Excellence</h3>
                  <p className="text-white/90">
                    We leverage the latest technologies to create scalable, secure, and high-performance solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To transform ideas into reality through technology, providing exceptional software solutions 
                that drive business growth and exceed client expectations.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <Eye className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be a leading software agency recognized for innovation, quality, and client satisfaction, 
                shaping the future of digital solutions worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 text-gray-900">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-gray-600 font-medium">Projects Delivered</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">25+</div>
              <div className="text-gray-600 font-medium">Happy Clients</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">3+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Core Values Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 text-gray-900">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold mb-4 text-gray-900">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We constantly explore new technologies and methodologies to deliver cutting-edge solutions.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105">
              <Star className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold mb-4 text-gray-900">Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Every line of code, every design element, and every solution meets our high standards of excellence.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105">
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold mb-4 text-gray-900">Partnership</h3>
              <p className="text-gray-600 leading-relaxed">
                We build lasting relationships with our clients, working as an extension of their team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:scale-105">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                JD
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">John Doe</h3>
              <p className="text-primary mb-3 font-medium">Lead Software Engineer</p>
              <p className="text-sm text-gray-500">
                Full-stack developer with expertise in React, Node.js, and cloud architecture.
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:scale-105">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                JS
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Jane Smith</h3>
              <p className="text-primary mb-3 font-medium">UI/UX Designer</p>
              <p className="text-sm text-gray-500">
                Creative designer focused on user experience and modern interface design.
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:scale-105">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/90 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                MJ
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Mike Johnson</h3>
              <p className="text-primary mb-3 font-medium">Project Manager</p>
              <p className="text-sm text-gray-500">
                Experienced project manager ensuring smooth delivery and client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and explore how we can help you achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="btn-hero-primary text-lg px-8 py-4 group hover:scale-105 transition-all duration-300"
            >
              <Link href="/consultation">
                <Zap className="w-5 h-5 mr-2" />
                Get Free Strategy Session
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="btn-secondary text-lg px-6 py-4 group hover:scale-105 transition-all duration-300 border-2 hover:bg-white hover:text-gray-800"
            >
              <Link href="/work">
                <Eye className="w-5 h-5 mr-2" />
                View Our Portfolio
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
