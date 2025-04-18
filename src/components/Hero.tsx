'use client';

import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
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
          <Button asChild size="lg">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
