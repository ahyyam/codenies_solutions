
const ServicesPage = () => {
  const services = [
    {
      id: "web-mobile",
      title: "Web & Mobile App Development",
      description:
        "We offer comprehensive web and mobile app development services, creating custom solutions tailored to your specific business needs. Our expertise spans across various platforms and technologies, ensuring a seamless user experience and optimal performance.",
      image: "https://images.unsplash.com/photo-1555059718-5ca674a428f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYiUyMGFwcGxpY2F0aW9ufGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "custom-software",
      title: "Custom Software Solutions",
      description:
        "Our custom software solutions are designed to address complex business challenges. We work closely with you to understand your unique requirements and develop bespoke software that streamlines your operations and drives efficiency.",
      image: "https://images.unsplash.com/photo-1542903660-7d7272c5f08b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mdHdhcmUlMjBzb2x1dGlvbnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "ecommerce",
      title: "E-commerce Development",
      description:
        "We build robust and scalable e-commerce platforms that deliver seamless online retail experiences. From storefront design to payment gateway integration, we provide end-to-end e-commerce solutions that maximize your online sales potential.",
      image: "https://images.unsplash.com/photo-1517976455494-1b5d8b8ea99b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbW1lcmNlfGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "ai-automation",
      title: "AI & Automation Tools",
      description:
        "Leverage the power of artificial intelligence and automation to streamline your workflows and reduce manual effort. Our AI and automation tools are designed to improve efficiency, reduce costs, and drive innovation within your organization.",
      image: "https://images.unsplash.com/photo-1605068484543-7420e6ca011b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWklMjBhdXRvbWF0aW9ufGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description:
        "We create engaging and intuitive user interfaces that drive user satisfaction and enhance brand loyalty. Our UI/UX design services focus on creating seamless user experiences that align with your business goals and user needs.",
      image: "https://images.unsplash.com/photo-1611262584954-46249a855339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dWklVTB1eCUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="p-6 rounded-lg shadow-md bg-card">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
