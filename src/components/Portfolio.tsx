'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Portfolio = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "E-commerce Development",
      description: "A comprehensive e-commerce platform with advanced inventory management, payment processing, and analytics dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/pics/Ecom.png",
      results: ["40% increase in sales", "Improved user experience", "Reduced cart abandonment"]
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "Mobile Development",
      description: "Secure mobile banking application with biometric authentication, real-time transactions, and financial planning tools.",
      technologies: ["React Native", "Firebase", "AWS", "Biometric API"],
      image: "/pics/service_mobile_web_dev_600x400.png",
      results: ["50,000+ active users", "99.9% uptime", "Enhanced security"]
    },
    {
      id: 3,
      title: "AI-Powered Analytics Dashboard",
      category: "AI & Automation",
      description: "Intelligent analytics platform that provides real-time insights and predictive analytics for business decision-making.",
      technologies: ["Python", "TensorFlow", "React", "PostgreSQL"],
      image: "/pics/Ai.png",
      results: ["30% faster decision making", "Automated reporting", "Predictive insights"]
    },
    {
      id: 4,
      title: "Custom CRM System",
      category: "Custom Software",
      description: "Tailored customer relationship management system designed to streamline sales processes and improve customer engagement.",
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis"],
      image: "/pics/service_custom_software_600x400.png",
      results: ["25% increase in sales efficiency", "Better customer tracking", "Automated workflows"]
    },
    {
      id: 5,
      title: "Healthcare Management Platform",
      category: "Custom Software",
      description: "Comprehensive healthcare management system for patient records, appointment scheduling, and medical billing.",
      technologies: ["Angular", "Spring Boot", "PostgreSQL", "HIPAA Compliant"],
      image: "/pics/service_custom_software_600x400.png",
      results: ["HIPAA compliant", "Improved patient care", "Streamlined operations"]
    },
    {
      id: 6,
      title: "UI/UX Design System",
      category: "UI/UX Design",
      description: "Complete design system and component library for consistent user experience across multiple applications.",
      technologies: ["Figma", "Storybook", "React", "Design Tokens"],
      image: "/pics/service_uiux_600x400.png",
      results: ["Consistent brand experience", "Faster development", "Improved accessibility"]
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechStart Inc.",
      content: "Codenies Solutions transformed our business with their custom e-commerce platform. The team was professional, responsive, and delivered exactly what we needed. Our sales increased by 40% within the first quarter.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CTO",
      company: "InnovateCorp",
      content: "Working with Codenies Solutions was a game-changer for our company. Their AI-powered analytics dashboard has given us insights we never had before, helping us make data-driven decisions.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Product Manager",
      company: "HealthTech Solutions",
      content: "The healthcare management platform developed by Codenies Solutions exceeded our expectations. It's HIPAA compliant, user-friendly, and has significantly improved our operational efficiency.",
      rating: 5
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentProject(index);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextProject();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding bg-background" id="portfolio" aria-labelledby="portfolio-heading">
      <div className="container mx-auto">
        <header className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary"
            id="portfolio-heading">
            Our Portfolio
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover how we've helped businesses transform their operations and achieve 
            remarkable results through innovative software solutions.
          </p>
        </header>

        {/* Featured Projects Carousel */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-12 text-primary text-center">Featured Projects</h3>
          
          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-lg"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-lg"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Project Cards */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentProject * 100}%)` }}
              >
                {projects.map((project) => (
                  <div key={project.id} className="w-full flex-shrink-0 px-4">
                    <article className="card scale-on-hover transition-all duration-300 overflow-hidden group max-w-4xl mx-auto">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="relative h-64 lg:h-full overflow-hidden">
                          <Image
                            src={project.image}
                            alt={`${project.title} project screenshot`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                              {project.category}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-6 lg:p-8">
                          <h4 className="text-xl md:text-2xl font-bold mb-4 text-primary group-hover:text-primary/80 transition-colors">
                            {project.title}
                          </h4>
                          <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                          
                          <div className="mb-6">
                            <h5 className="text-sm font-semibold mb-3 text-primary">Technologies Used</h5>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, techIndex) => (
                                <span 
                                  key={techIndex}
                                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="text-sm font-semibold mb-3 text-primary">Key Results</h5>
                            <ul className="space-y-2">
                              {project.results.map((result, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start">
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentProject 
                      ? 'bg-primary scale-125' 
                      : 'bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-12 text-primary text-center">What Our Clients Say</h3>
          <div className="grid-responsive">
            {testimonials.map((testimonial) => (
              <blockquote 
                key={testimonial.id}
                className="card p-6 hover:shadow-medium transition-shadow duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <footer>
                  <div className="font-bold text-primary text-lg">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.position}, {testimonial.company}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Ready to Start Your Project?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can help you achieve similar results for your business.
          </p>
          <Link href="/contact">
            <button className="btn-primary text-lg px-8 py-4">
              Get Free Consultation
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
