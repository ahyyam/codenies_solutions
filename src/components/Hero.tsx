'use client';

import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden fade-in">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-464c4c52ef31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero Image"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-30"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-primary">
          Innovate. Transform. Succeed.
        </h1>
        <p
          className="text-lg text-center text-muted-foreground mb-8">
          Crafting bespoke software solutions that drive your business forward.
        </p>
        <div className="text-center">
          <Button asChild size="lg" className="scale-on-hover">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
