'use client';

import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative section-padding bg-background overflow-hidden fade-in" role="banner" aria-label="Hero section">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center">
        <Image
          src="/pics/hero_image_1920x480.png"
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-20"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <header className="mb-12">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 text-primary leading-tight"
              id="main-heading">
              Innovate. Transform. 
              <span className="text-gradient block">Succeed.</span>
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
              role="doc-subtitle">
              Crafting bespoke software solutions that drive your business forward. 
              From custom web applications to AI-powered automation tools, we help 
              businesses achieve digital transformation and competitive advantage.
            </p>
          </header>
          
          {/* Call to Action */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="btn-primary text-lg px-8 py-4">
                <Link href="#contact" aria-describedby="main-heading">
                  Get Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-secondary text-lg px-8 py-4">
                <Link href="#services">
                  View Our Services
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Trusted by businesses worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Free Quote</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
