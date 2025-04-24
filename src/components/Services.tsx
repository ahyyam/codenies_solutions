'use client';

import Link from "next/link";
import Image from 'next/image';

const Services = () => {
  const services = [
    {
      id: "web-mobile",
      title: "Web & Mobile App Development",
      description: "Custom web and mobile applications tailored to your needs.",
      image: 'https://images.unsplash.com/photo-1555057250-a67c6986614a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "custom-software",
      title: "Custom Software Solutions",
      description: "Bespoke software designed to solve complex business challenges.",
      image: 'https://images.unsplash.com/photo-1542831323-533a4f0eb57e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "ecommerce",
      title: "E-commerce Development",
      description: "Robust e-commerce platforms for seamless online retail experiences.",
      image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "ai-automation",
      title: "AI & Automation Tools",
      description: "Intelligent automation solutions to streamline your workflows.",
      image: 'https://images.unsplash.com/photo-1587820043529-b79c1f525a49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "Engaging user interfaces that drive user satisfaction.",
      image: 'https://images.unsplash.com/photo-1517694712202-14f924a81a18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
