'use client';

import Link from "next/link";
import Image from 'next/image';

const Services = () => {
  const services = [
    {
      id: "web-mobile",
      title: "Web & Mobile App Development",
      description: "Custom web and mobile applications built with cutting-edge technologies. We create responsive, scalable, and user-friendly applications that work seamlessly across all devices and platforms.",
      longDescription: "Our web and mobile development services include React, React Native, Flutter, Node.js, and modern frameworks. We focus on performance, security, and user experience.",
      image: '/pics/service_mobile_web_dev_600x400.png',
      features: ["Responsive Design", "Cross-platform Development", "API Integration", "Performance Optimization"]
    },
    {
      id: "custom-software",
      title: "Custom Software Solutions",
      description: "Bespoke software designed to solve complex business challenges. We analyze your workflows and create tailored solutions that streamline operations and boost productivity.",
      longDescription: "From enterprise applications to workflow automation tools, we build custom software that integrates with your existing systems and grows with your business.",
      image: '/pics/service_custom_software_600x400.png',
      features: ["Business Process Automation", "System Integration", "Scalable Architecture", "Custom APIs"]
    },
    {
      id: "ecommerce",
      title: "E-commerce Development",
      description: "Robust e-commerce platforms that deliver seamless online retail experiences. We build secure, scalable online stores that convert visitors into customers.",
      longDescription: "Our e-commerce solutions include payment gateway integration, inventory management, order processing, and marketing tools to maximize your online sales.",
      image: '/pics/Ecom.png',
      features: ["Payment Gateway Integration", "Inventory Management", "Order Processing", "Marketing Tools"]
    },
    {
      id: "ai-automation",
      title: "AI & Automation Tools",
      description: "Intelligent automation solutions that streamline your workflows and reduce manual effort. Leverage AI to improve efficiency, reduce costs, and drive innovation.",
      longDescription: "We implement AI-powered chatbots, data analysis tools, process automation, and machine learning solutions to transform your business operations.",
      image: '/pics/Ai.png',
      features: ["AI Chatbots", "Data Analysis", "Process Automation", "Machine Learning"]
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "Engaging user interfaces that drive user satisfaction and enhance brand loyalty. We create intuitive, accessible designs that deliver exceptional user experiences.",
      longDescription: "Our design process includes user research, wireframing, prototyping, and usability testing to ensure your product meets user needs and business goals.",
      image: '/pics/service_uiux_600x400.png',
      features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"]
    },
  ];

  return (
    <section className="section-padding bg-background fade-in" id="services" aria-labelledby="services-heading">
      <div className="container mx-auto">
        <header className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary"
            id="services-heading">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive software development services tailored to your business needs. 
            From concept to deployment, we deliver innovative solutions that drive growth.
          </p>
        </header>
        
        <div className="grid-responsive">
          {services.map((service, index) => (
            <article 
              key={service.id} 
              className="card scale-on-hover transition-all duration-300 overflow-hidden group"
              role="listitem">
              <Link href={`#${service.id}`} className="block">
                <div className="relative mb-6 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} service illustration`}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <header className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-primary group-hover:text-primary/80 transition-colors">
                      {service.title}
                    </h3>
                  </header>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-primary mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
