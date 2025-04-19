'use client';

import Link from "next/link";
import Image from 'next/image';

const Services = () => {
  const services = [
    {
      id: "web-mobile",
      title: "Web & Mobile App Development",
      description: "Custom web and mobile applications tailored to your needs.",
      image: 'https://images.unsplash.com/photo-1583508915404-0412f4c9ca5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "custom-software",
      title: "Custom Software Solutions",
      description: "Bespoke software designed to solve complex business challenges.",
      image: 'https://images.unsplash.com/photo-1518770660439-464c4c52ef31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "ecommerce",
      title: "E-commerce Development",
      description: "Robust e-commerce platforms for seamless online retail experiences.",
      image: 'https://images.unsplash.com/photo-1505740420928-3e0456750d47?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "ai-automation",
      title: "AI & Automation Tools",
      description: "Intelligent automation solutions to streamline your workflows.",
      image: 'https://images.unsplash.com/photo-1542831323-533a4f0eb57e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "Engaging user interfaces that drive user satisfaction.",
      image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <section className="py-16 bg-background fade-in">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12 text-primary">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={`/services#${service.id}`}>
              <div
                className="p-6 rounded-lg shadow-md bg-card scale-on-hover transition-all duration-300"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h3 className="text-xl font-semibold mb-4 text-primary">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
     </section>
   );
 };
 
 export default Services;
