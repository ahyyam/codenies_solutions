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
    url: 'https://codenies.com/about',
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
      <section className="section-primary" aria-labelledby="about-hero-heading">
        <div className="container-responsive text-center max-w-4xl">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            <Star className="w-3 h-3 mr-2" />
            Leading Software Development Agency
          </Badge>
          
          <h1 id="about-hero-heading" className="heading-display text-heading mb-6 leading-tight">
            Building the Future,{' '}
            <span className="text-primary block">
              One Line at a Time
            </span>
          </h1>
          
          <p className="body-large text-body mb-8 leading-relaxed max-w-2xl mx-auto">
            We are strategic technology partners dedicated to 
            <span className="text-emphasis">driving measurable business growth</span> through 
            <span className="text-emphasis">innovative solutions that deliver real ROI</span>.
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
                Start a project
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
      <section className="section-subtle">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="heading-large text-heading">
                Who We Are
              </h2>
              <p className="body-large text-body leading-relaxed">
                codenies is a strategic technology partner focused on delivering measurable business results. 
                We specialize in solutions that increase revenue, reduce operational costs, and provide competitive advantage. 
                Our team combines deep technical expertise with business acumen to deliver technology investments 
                that generate substantial ROI and accelerate your growth.
              </p>
            </div>
            <div className="relative">
              <div className="bg-primary rounded-xl p-6 text-primary-foreground shadow-lg">
                <div className="text-center">
                  <Target className="w-10 h-10 mx-auto mb-3 text-primary-foreground/90" />
                  <h3 className="subheading text-white mb-3">Technology Excellence</h3>
                  <p className="body-large text-white/90">
                    We leverage the latest technologies to create scalable, secure, and high-performance solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-primary">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300">
              <Target className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="subheading text-heading mb-3">Our Mission</h3>
              <p className="body-large text-body leading-relaxed">
                To be the strategic technology partner that accelerates business growth through innovative solutions 
                that deliver measurable ROI and sustainable competitive advantage.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300">
              <Eye className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="subheading text-heading mb-3">Our Vision</h3>
              <p className="body-large text-body leading-relaxed">
                To be recognized as the premier technology partner that consistently delivers breakthrough business results, 
                helping companies achieve market leadership through strategic technology investments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="section-subtle">
        <div className="container-responsive">
          <h2 className="heading-large text-heading text-center mb-8">
            Our Approach to Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="subheading text-heading mb-2">Technical Excellence</h3>
              <p className="body-small text-body">Cutting-edge technologies and best practices</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="subheading text-heading mb-2">Client Partnership</h3>
              <p className="body-small text-body">Collaborative approach to every project</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="subheading text-heading mb-2">Innovation Focus</h3>
              <p className="body-small text-body">Forward-thinking solutions for modern challenges</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="subheading text-heading mb-2">Global Impact</h3>
              <p className="body-small text-body">Solutions that scale across markets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-primary">
        <div className="container-responsive">
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
      <section className="section-subtle">
        <div className="container-responsive">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-foreground">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-5 bg-background rounded-xl border border-border hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-primary-foreground text-lg font-bold">
                AE
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Ahyam Emad</h3>
              <p className="text-primary mb-2 text-sm font-medium">Project Manager</p>
              <p className="text-xs text-muted-foreground">
                Experienced project manager ensuring smooth delivery and client satisfaction.
              </p>
            </div>
            <div className="text-center p-5 bg-background rounded-xl border border-border hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-primary-foreground text-lg font-bold">
                SA
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Sara Ahmed</h3>
              <p className="text-primary mb-2 text-sm font-medium">Lead Software Engineer</p>
              <p className="text-xs text-muted-foreground">
                Full-stack developer with expertise in React, Node.js, and cloud architecture.
              </p>
            </div>
            <div className="text-center p-5 bg-background rounded-xl border border-border hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-primary-foreground text-lg font-bold">
                JH
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Jana Hazem</h3>
              <p className="text-primary mb-2 text-sm font-medium">UI/UX Designer</p>
              <p className="text-xs text-muted-foreground">
                Creative designer focused on user experience and modern interface design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-gradient">
        <div className="container-responsive text-center">
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
                Start a project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-6 py-3"
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
