'use client';

import Link from "next/link";

const Services = () => {
  const services = [
    {
      id: "web-mobile",
      title: "Web & Mobile App Development",
      description: "Custom web and mobile applications tailored to your needs.",
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: "custom-software",
      title: "Custom Software Solutions",
      description: "Bespoke software designed to solve complex business challenges.",
      image: 'https://images.unsplash.com/photo-1518770660439-464c4c52ef31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: "ecommerce",
      title: "E-commerce Development",
      description: "Robust e-commerce platforms for seamless online retail experiences.",
      image: 'https://images.unsplash.com/photo-1505740420928-3e0456750d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: "ai-automation",
      title: "AI & Automation Tools",
      description: "Intelligent automation solutions to streamline your workflows.",
      image: 'https://images.unsplash.com/photo-1542831323-533a4f0eb57e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGF1dG9tYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "Engaging user interfaces that drive user satisfaction.",
      image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VVUlMkZVeHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
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
