'use client';

import Link from "next/link";
import Image from 'next/image';

const Services = () => {
  const services = [
    {
      id: "web-mobile",
      title: "Web & Mobile App Development",
      description: "Custom web and mobile applications tailored to your needs.",
 image: '/src/pics/service_mobile_web_dev_600x400.png',
    },
    {
      id: "custom-software",
      title: "Custom Software Solutions",
      description: "Bespoke software designed to solve complex business challenges.",
 image: '/src/pics/service_custom_software_600x400.png',
    },
    {
      id: "ecommerce",
      title: "E-commerce Development",
      description: "Robust e-commerce platforms for seamless online retail experiences.",
 image: '/src/pics/Ecom.png',
    },
    {
      id: "ai-automation",
      title: "AI & Automation Tools",
      description: "Intelligent automation solutions to streamline your workflows.",
 image: '/src/pics/Ai .png',
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "Engaging user interfaces that drive user satisfaction.",
 image: '/src/pics/service_uiux_600x400.png',
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
