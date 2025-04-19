'use client';

import Link from "next/link";

const Services = () => {
  const services = [
    {
      id: "web-mobile",
      title: "Web & Mobile App Development",
      description: "Custom web and mobile applications tailored to your needs.",
      image: 'https://ai-generated.art/wp-content/uploads/2023/05/Mobile-app-development-on-a-laptop-AI-generated.jpg',
    },
    {
      id: "custom-software",
      title: "Custom Software Solutions",
      description: "Bespoke software designed to solve complex business challenges.",
      image: 'https://ai-generated.art/wp-content/uploads/2023/05/Custom-Software-Development-AI-Generated.jpg',
    },
    {
      id: "ecommerce",
      title: "E-commerce Development",
      description: "Robust e-commerce platforms for seamless online retail experiences.",
      image: 'https://ai-generated.art/wp-content/uploads/2023/05/E-commerce-website-on-a-laptop-AI-generated.jpg',
    },
    {
      id: "ai-automation",
      title: "AI & Automation Tools",
      description: "Intelligent automation solutions to streamline your workflows.",
      image: 'https://ai-generated.art/wp-content/uploads/2023/05/AI-automation-tools-on-a-laptop-AI-generated.jpg',
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "Engaging user interfaces that drive user satisfaction.",
      image: 'https://ai-generated.art/wp-content/uploads/2023/05/UI-UX-design-on-a-laptop-AI-generated.jpg',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={`/services#${service.id}`}>
              <div
                className="p-6 rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow duration-300 hover:scale-105"
              >
                 <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
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
