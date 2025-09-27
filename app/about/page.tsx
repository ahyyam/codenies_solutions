import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, CheckCircle, TrendingUp, Zap, Shield, Star, Sparkles, Target, Eye, Heart, Clock, Code, Globe, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: 'About codenies',
  description: 'Learn about codenies, a leading software development agency. We specialize in custom software, web & mobile development, e-commerce, AI automation, and UI/UX design. Discover our mission, vision, and commitment to excellence.',
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
    title: 'About codenies - Software Development Agency',
    description: 'Learn about codenies, a leading software development agency specializing in custom software, web & mobile development, e-commerce, AI automation, and UI/UX design.',
    type: 'website',
    url: 'https://codenis.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About codenies - Software Development Agency',
    description: 'Learn about codenies, a leading software development agency specializing in custom software, web & mobile development, e-commerce, AI automation, and UI/UX design.',
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
            "name": "About codenies",
            "description": "Learn about codenies, a leading software development agency specializing in custom software, web & mobile development, e-commerce, AI automation, and UI/UX design.",
            "mainEntity": {
              "@type": "Organization",
              "name": "codenies",
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
      
      {/* Hero Section */}
      <section className="relative pt-16 lg:pt-20 pb-12 px-4 bg-background" aria-labelledby="about-hero-heading">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            <Star className="w-3 h-3 mr-2" />
            Leading Software Development Agency
          </Badge>
          
          <h1 id="about-hero-heading" className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
            Building the Future,{' '}
            <span className="text-primary block">
              One Line at a Time
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            We are a passionate team of software developers, designers, and strategists 
            dedicated to <span className="font-semibold text-primary">transforming businesses</span> through 
            <span className="font-semibold text-primary"> innovative technology solutions</span>.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3"
            >
              <Link href="/consultation">
                <Zap className="w-4 h-4 mr-2" />
                Get Free Strategy Session
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-border hover:border-primary text-foreground hover:text-primary px-6 py-3"
            >
              <Link href="/work">
                <Eye className="w-4 h-4 mr-2" />
                View Our Portfolio
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-primary" />
              </div>
              <span>100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-3 h-3 text-primary" />
              </div>
              <span>24/7 Expert Support</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-primary" />
              </div>
              <span>Award-Winning Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-12 px-4 bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Who We Are
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                codenies is a software agency dedicated to crafting innovative digital solutions. 
                We specialize in web and mobile app development, custom software solutions, e-commerce development, 
                AI automation, and UI/UX design. Our team combines technical expertise with creative problem-solving 
                to deliver solutions that drive real business value.
              </p>
            </div>
            <div className="relative">
              <div className="bg-primary rounded-xl p-6 text-primary-foreground shadow-lg">
                <div className="text-center">
                  <Target className="w-10 h-10 mx-auto mb-3 text-primary-foreground/90" />
                  <h3 className="text-xl font-bold mb-3">Technology Excellence</h3>
                  <p className="text-primary-foreground/90 text-sm">
                    We leverage the latest technologies to create scalable, secure, and high-performance solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300">
              <Target className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="text-xl font-bold mb-3 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To transform ideas into reality through technology, providing exceptional software solutions 
                that drive business growth and exceed client expectations.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300">
              <Eye className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="text-xl font-bold mb-3 text-foreground">Our Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To be a leading software agency recognized for innovation, quality, and client satisfaction, 
                shaping the future of digital solutions worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-foreground">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground text-sm font-medium">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground text-sm font-medium">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">3+</div>
              <div className="text-muted-foreground text-sm font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-muted-foreground text-sm font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-foreground">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-card rounded-xl border border-border hover:shadow-md transition-all duration-300">
              <Sparkles className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="text-lg font-bold mb-3 text-foreground">Innovation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We constantly explore new technologies and methodologies to deliver cutting-edge solutions.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border hover:shadow-md transition-all duration-300">
              <Star className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="text-lg font-bold mb-3 text-foreground">Quality</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every line of code, every design element, and every solution meets our high standards of excellence.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border hover:shadow-md transition-all duration-300">
              <Heart className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="text-lg font-bold mb-3 text-foreground">Partnership</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We build lasting relationships with our clients, working as an extension of their team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-foreground">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-5 bg-background rounded-xl border border-border hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-primary-foreground text-lg font-bold">
                JD
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">John Doe</h3>
              <p className="text-primary mb-2 text-sm font-medium">Lead Software Engineer</p>
              <p className="text-xs text-muted-foreground">
                Full-stack developer with expertise in React, Node.js, and cloud architecture.
              </p>
            </div>
            <div className="text-center p-5 bg-background rounded-xl border border-border hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-primary-foreground text-lg font-bold">
                JS
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Jane Smith</h3>
              <p className="text-primary mb-2 text-sm font-medium">UI/UX Designer</p>
              <p className="text-xs text-muted-foreground">
                Creative designer focused on user experience and modern interface design.
              </p>
            </div>
            <div className="text-center p-5 bg-background rounded-xl border border-border hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-primary-foreground text-lg font-bold">
                MJ
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Mike Johnson</h3>
              <p className="text-primary mb-2 text-sm font-medium">Project Manager</p>
              <p className="text-xs text-muted-foreground">
                Experienced project manager ensuring smooth delivery and client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Let's discuss your project and explore how we can help you achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              asChild
              size="lg" 
              variant="secondary"
              className="px-6 py-3"
            >
              <Link href="/consultation">
                <Zap className="w-4 h-4 mr-2" />
                Get Free Strategy Session
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary px-6 py-3"
            >
              <Link href="/work">
                <Eye className="w-4 h-4 mr-2" />
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
