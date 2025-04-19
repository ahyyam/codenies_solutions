'use client';
import React from 'react';

const AboutPage = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Text Content Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">About Us</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Codenies Solutions is a software agency dedicated to crafting innovative digital solutions.
            We specialize in web and mobile app development, custom software solutions, and e-commerce development.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p className="text-muted-foreground mb-4">
            To transform ideas into reality through technology, providing exceptional software solutions
            that drive business growth and exceed client expectations.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
          <p className="text-muted-foreground mb-4">
            To be a leading software agency recognized for innovation, quality, and client satisfaction,
            shaping the future of digital solutions worldwide.
          </p>

          <p className="text-muted-foreground">
            With a focus on quality and client satisfaction, we strive to exceed expectations and deliver
            results that drive business growth. Our team of experienced developers, designers, and project
            managers work collaboratively to ensure every project is a success.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
