'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, Play, CheckCircle, Users, Clock, Star, TrendingUp, Zap, Shield, Award, Sparkles } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate stats counter
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "500+", label: "Happy Clients", icon: Users, color: "from-blue-500 to-blue-600" },
    { number: "150+", label: "Projects Delivered", icon: CheckCircle, color: "from-green-500 to-green-600" },
    { number: "99%", label: "Success Rate", icon: TrendingUp, color: "from-purple-500 to-purple-600" }
  ];

  return (
    <section className="relative py-20 lg:py-32 flex items-center bg-background overflow-hidden pt-20" role="banner" aria-label="Hero section">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 bg-cover bg-center">
        <Image
          src="/hero_image_1920x480.png"
          alt="Modern software development workspace with technology and innovation"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-15"
          priority
          sizes="100vw"
        />
        {/* Enhanced Gradient Overlay for better text readability */}
        <div className="absolute inset-0 hero-overlay"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 py-8">
        <div className="text-center max-w-6xl mx-auto">


          {/* Main Headline with Better Hierarchy */}
          <header className={`mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1
              className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-elegant font-bold mb-4 text-primary leading-tight"
              id="main-heading">
              <span className="block hero-gradient-text">
                Transform
              </span>
              <span className="block text-foreground">Your Business</span>
              <span className="text-gradient block font-cursive bg-gradient-to-r from-primary via-muted-foreground to-foreground bg-clip-text text-transparent">
                With Technology
              </span>
            </h1>
            
            {/* Enhanced Value Proposition */}
            <p
              className="hero-subtitle text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 max-w-4xl mx-auto leading-relaxed font-cursive"
              role="doc-subtitle">
              We build <span className="font-semibold text-primary">custom software solutions</span> that drive 
              <span className="font-semibold text-primary"> real business results</span>. 
              From AI-powered automation to scalable SaaS platforms, we help businesses 
              <span className="font-semibold text-primary"> grow faster</span> and <span className="font-semibold text-primary">stay ahead</span>.
            </p>
          </header>
          
          {/* Enhanced Call to Action Section */}
          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            {/* Primary CTA with Urgency */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="btn-hero-primary text-lg px-8 py-4 group hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Link href="/consultation" aria-describedby="main-heading" className="hero-focus-visible">
                    <Zap className={`w-5 h-5 mr-2 transition-transform duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
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
                  <Link href="#services" className="hero-focus-visible">
                    <Play className="w-5 h-5 mr-2" />
                    Explore Solutions
                  </Link>
                </Button>
              </div>
              
              {/* Urgency and Social Proof */}
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Limited availability this month</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>100% risk-free consultation</span>
                </p>
              </div>
            </div>
            
            {/* Enhanced Trust Indicators with Animation */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div 
                      key={index}
                      className={`trust-indicator flex items-center justify-center gap-3 group transition-all duration-500 ${
                        currentStat === index ? 'active scale-110 text-primary' : ''
                      }`}
                    >
                      <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center group-hover:bg-opacity-80 transition-all duration-300 ${
                        currentStat === index ? 'scale-110 shadow-lg' : ''
                      }`}>
                        <IconComponent className={`w-5 h-5 text-white transition-all duration-300 ${
                          currentStat === index ? 'scale-110' : ''
                        }`} />
                      </div>
                      <div className="text-left">
                        <div className={`font-bold text-lg transition-all duration-300 ${
                          currentStat === index ? 'text-primary' : 'text-foreground'
                        }`}>
                          {stat.number}
                        </div>
                        <div className={`transition-all duration-300 ${
                          currentStat === index ? 'text-primary' : ''
                        }`}>
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Client Logos/Testimonials Preview */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <p className="text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Trusted by innovative companies worldwide
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
                <div className="w-16 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse"></div>
                <div className="w-20 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse"></div>
                <div className="w-16 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse"></div>
                <div className="w-18 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="lg:hidden">
        <Button 
          asChild
          size="lg" 
          className="fab-mobile bg-primary hover:bg-primary/90 text-white"
        >
          <Link href="/consultation" aria-label="Get free consultation" className="hero-focus-visible">
            <Zap className="w-6 h-6" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;


