// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"
// import Link from "next/link"
import Hero from "@/components/Hero"
import CTA from "@/components/common/CTA"
import { GradientText, GradientCard, GradientDivider, GradientHighlight } from "@/components/common"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>

      <Hero />



      {/* Services Section removed as requested */}



      {/* About Section */}
      <section id="about" className="section-primary" aria-labelledby="about-heading">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 id="about-heading" className="heading-large text-heading mb-4 sm:mb-6">Why Choose codenies?</h2>
              <p className="body-large text-body mb-4 sm:mb-6 leading-relaxed">
                We're your strategic technology partners, combining technical expertise with business acumen to deliver solutions that drive measurable growth and competitive advantage for your business.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="subheading text-heading">Business Growth Focus</h3>
                    <p className="body-small text-body">Solutions designed to increase revenue and operational efficiency</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="subheading text-heading">Competitive Advantage</h3>
                    <p className="body-small text-body">Cutting-edge technology that keeps you ahead of the competition</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="subheading text-heading">Measurable ROI</h3>
                    <p className="body-small text-body">Proven track record of delivering quantifiable business results</p>
                  </div>
                </div>
              </div>
            </div>
            <GradientCard variant="innovation" className="text-center">
              <GradientText variant="innovation" as="h3" className="text-2xl sm:text-3xl font-bold mb-4">
                Business Impact
              </GradientText>
              <p className="body-large text-body mb-4">
                <GradientHighlight variant="innovation">Revenue Growth:</GradientHighlight> Our solutions help clients increase sales and operational efficiency.
              </p>
              <p className="body-large text-body mb-4">
                <GradientHighlight variant="tech">Cost Reduction:</GradientHighlight> Automation and optimization reduce operational expenses.
              </p>
              <p className="body-large text-body">
                <GradientHighlight variant="innovation">Market Leadership:</GradientHighlight> Stay ahead with innovative technology solutions.
              </p>
            </GradientCard>
          </div>
        </div>
      </section>


      {/* Technologies Section */}
      <section className="section-primary" aria-labelledby="tech-heading">
        <div className="container-responsive">
          <header className="text-center mb-12 sm:mb-16">
            <GradientText variant="tech" as="h2" className="heading-mobile mb-4">
              Technologies We Master
            </GradientText>
            <p className="body-large text-body max-w-2xl mx-auto">
              We use cutting-edge technologies to build robust, scalable, and future-proof solutions.
            </p>
            <GradientDivider variant="tech" className="max-w-24 mx-auto mt-6" />
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
            {[
              { name: "React", icon: "⚛️" },
              { name: "Next.js", icon: "▲" },
              { name: "Node.js", icon: "🟢" },
              { name: "TypeScript", icon: "🔷" },
              { name: "Python", icon: "🐍" },
              { name: "AWS", icon: "☁️" },
              { name: "Docker", icon: "🐳" },
              { name: "PostgreSQL", icon: "🐘" },
              { name: "MongoDB", icon: "🍃" },
              { name: "Firebase", icon: "🔥" },
              { name: "AI/ML", icon: "🤖" },
              { name: "Flutter", icon: "📱" }
            ].map((tech, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[var(--primary)] to-[#E60073] rounded-xl flex items-center justify-center text-primary-foreground text-2xl sm:text-3xl mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                  {tech.icon}
                </div>
                <h4 className="body-small font-medium text-heading group-hover:text-accent transition-colors">
                  {tech.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA 
        variant="gradient"
        title="Ready to start your project?"
        subtitle="Free strategy session. Roadmap, estimate, and next steps in 24 hours."
        primaryText="Start a project"
        secondaryText="View our work"
        benefits={["Senior team", "Transparent pricing", "24h response"]}
      />

    </div>
  )
}

