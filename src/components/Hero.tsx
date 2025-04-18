'use client';

import {Button} from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div
        className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1605236420470-3315f39b9bb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center opacity-30">
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          Crafting Digital Solutions for Tomorrow
        </h1>
        <p
          className="text-lg text-center text-muted-foreground mb-8">
          We transform ideas into innovative software solutions.
        </p>
        <div className="text-center">
          <Button size="lg">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
