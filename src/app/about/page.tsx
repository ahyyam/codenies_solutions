'use client';
import React from 'react';
import {motion} from 'framer-motion';

const AboutPage = () => {
  return (
    <motion.section
      className="py-16 bg-background"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">About Us</h2>
        <p className="text-lg text-center text-muted-foreground mb-8">
          Codenies Solutions is a software agency dedicated to crafting innovative
          digital solutions. We specialize in web and mobile app development,
          custom software solutions, and e-commerce development.
        </p>

        <h3 className="text-2xl font-semibold text-center mb-6">Our Mission</h3>
        <p className="text-lg text-center text-muted-foreground mb-8">
          To transform ideas into reality through technology, providing exceptional
          software solutions that drive business growth and exceed client
          expectations.
        </p>

        <h3 className="text-2xl font-semibold text-center mb-6">Our Vision</h3>
        <p className="text-lg text-center text-muted-foreground mb-8">
          To be a leading software agency recognized for innovation, quality, and
          client satisfaction, shaping the future of digital solutions worldwide.
        </p>

        <p className="text-lg text-center text-muted-foreground">
          With a focus on quality and client satisfaction, we strive to exceed
          expectations and deliver results that drive business growth. Our team of
          experienced developers, designers, and project managers work
          collaboratively to ensure every project is a success.
        </p>
      </div>
    </motion.section>
  );
};

export default AboutPage;
