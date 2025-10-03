import type { Metadata } from "next"
import { sampleProjects } from "@/lib/data/sample-projects"
import Link from "next/link"
import PageHero from "@/components/common/PageHero"

export const metadata: Metadata = {
  title: "Portfolio - codenies",
  description: "Selected client work from codenies — minimalist, bold, and outcome-driven portfolio.",
  keywords: [
    "codenies portfolio",
    "software case studies",
    "client work",
    "web apps",
    "mobile apps",
    "saas",
  ],
  openGraph: {
    title: "Portfolio - codenies",
    description: "Selected client work — minimalist, bold, and outcome-driven.",
    type: "website",
    url: "/work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - codenies",
    description: "Selected client work — minimalist, bold, and outcome-driven.",
  },
}

export default function WorkPage() {
  const projects = sampleProjects

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Selected Projects"
        title="Outcome‑driven work"
        subtitle="SaaS, e‑commerce, mobile, and web — focused on measurable business impact."
        ctaHref="/consultation"
        ctaLabel="Start a project"
      />
      <section className="section-primary">
        <div className="container-responsive">

          {projects.length === 0 ? (
            <div className="border border-dashed border-border rounded-lg p-10 text-center bg-card">
              <p className="text-sm text-muted-foreground">No projects to show yet. Please check back soon.</p>
            </div>
          ) : (
            <div className="card-grid">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={project.links?.caseStudy ?? project.links?.live ?? project.links?.github ?? "#"}
                  target={project.links?.live ? "_blank" : undefined}
                  rel={project.links?.live ? "noopener noreferrer" : undefined}
                  className="project-card group block"
                  aria-label={`View ${project.title}`}
                >
                  <div className="project-card-content">
                    <div className="mb-3">
                      <span className="inline-block caption uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1">
                        {project.category?.name}
                      </span>
                    </div>
                    <h2 className="subheading text-heading mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                    <p className="body-large text-body mb-4 line-clamp-3 flex-grow">{project.description}</p>
                    <div className="caption text-muted flex items-center flex-wrap gap-x-2 gap-y-1 pt-2 border-t border-border/50">
                      {project.client?.name && <span className="font-medium text-primary">{project.client.name}</span>}
                      <span>•</span>
                      <span className="capitalize">{project.status}</span>
                      {project.timeline?.duration && (
                        <>
                          <span>•</span>
                          <span>{project.timeline.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
