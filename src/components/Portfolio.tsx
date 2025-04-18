
const Portfolio = () => {
  const projects = [
    {
      title: "Project 1",
      description: "Description of Project 1.",
      imageUrl: "https://picsum.photos/400/300",
    },
    {
      title: "Project 2",
      description: "Description of Project 2.",
      imageUrl: "https://picsum.photos/400/300",
    },
    {
      title: "Project 3",
      description: "Description of Project 3.",
      imageUrl: "https://picsum.photos/400/300",
    },
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Portfolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="rounded-lg shadow-md overflow-hidden bg-card">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
