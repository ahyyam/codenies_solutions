
const Services = () => {
  const services = [
    {
      title: "Web & Mobile App Development",
      description: "Custom web and mobile applications tailored to your needs.",
    },
    {
      title: "Custom Software Solutions",
      description: "Bespoke software designed to solve complex business challenges.",
    },
    {
      title: "E-commerce Development",
      description: "Robust e-commerce platforms for seamless online retail experiences.",
    },
    {
      title: "AI & Automation Tools",
      description: "Intelligent automation solutions to streamline your workflows.",
    },
    {
      title: "UI/UX Design",
      description: "Engaging user interfaces that drive user satisfaction.",
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
            <div
              key={index}
              className="p-6 rounded-lg shadow-md bg-card"
            >
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
