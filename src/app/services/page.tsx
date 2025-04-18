'use client';

const ServicesPage = () => {
  const services = [
    {
      id: 'web-mobile',
      title: 'Web & Mobile App Development',
      description:
        'We offer comprehensive web and mobile app development services, creating custom solutions tailored to your specific business needs. Our expertise spans across various platforms and technologies, ensuring a seamless user experience and optimal performance.',
      image: 'https://picsum.photos/id/237/600/400',
    },
    {
      id: 'custom-software',
      title: 'Custom Software Solutions',
      description:
        'Our custom software solutions are designed to address complex business challenges. We work closely with you to understand your unique requirements and develop bespoke software that streamlines your operations and drives efficiency.',
      image: 'https://picsum.photos/id/238/600/400',
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Development',
      description:
        'We build robust and scalable e-commerce platforms that deliver seamless online retail experiences. From storefront design to payment gateway integration, we provide end-to-end e-commerce solutions that maximize your online sales potential.',
      image: 'https://picsum.photos/id/239/600/400',
    },
    {
      id: 'ai-automation',
      title: 'AI & Automation Tools',
      description:
        'Leverage the power of artificial intelligence and automation to streamline your workflows and reduce manual effort. Our AI and automation tools are designed to improve efficiency, reduce costs, and drive innovation within your organization.',
      image: 'https://picsum.photos/id/240/600/400',
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description:
        'We create engaging and intuitive user interfaces that drive user satisfaction and enhance brand loyalty. Our UI/UX design services focus on creating seamless user experiences that align with your business goals and user needs.',
      image: 'https://picsum.photos/id/241/600/400',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
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
