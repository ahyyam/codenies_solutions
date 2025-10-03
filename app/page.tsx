import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Smartphone, Palette, Brain, ShoppingCart, Globe, Star } from "lucide-react"
import Link from "next/link"
import Hero from "@/components/Hero"
import { GradientText, GradientCard, GradientButton, GradientDivider, GradientHighlight } from "@/components/common"

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

      {/* Testimonials Section */}
      <section className="section-primary" aria-labelledby="testimonials-heading">
        <div className="container-responsive">
          <header className="text-center mb-12 sm:mb-16">
            <GradientText variant="innovation" as="h2" className="heading-mobile mb-4">
              What Our Clients Say
            </GradientText>
            <p className="body-large text-body max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
            <GradientDivider variant="innovation" className="max-w-24 mx-auto mt-6" />
          </header>
          
          <div className="card-grid">
            {/* Testimonial 1 */}
            <div className="card group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-innovation rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  J
                </div>
                <div>
                  <h4 className="subheading text-heading">John Smith</h4>
                  <p className="caption text-muted">CEO, TechStart Inc.</p>
                </div>
              </div>
              <p className="body-large text-body italic mb-4">
                "codenies built our SaaS platform that generated $2M in recurring revenue within the first year. Their business-focused approach delivered exceptional ROI."
              </p>
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-innovation rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <h4 className="subheading text-heading">Sarah Johnson</h4>
                  <p className="caption text-muted">Founder, EcoMart</p>
                </div>
              </div>
              <p className="body-large text-body italic mb-4">
                "The e-commerce platform codenies built increased our online sales by 300% and reduced cart abandonment by 40%. Outstanding business impact."
              </p>
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="card group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-innovation rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <h4 className="subheading text-heading">Mike Chen</h4>
                  <p className="caption text-muted">CTO, HealthTech</p>
                </div>
              </div>
              <p className="body-large text-body italic mb-4">
                "codenies' AI integration reduced our operational costs by 50% and improved patient care efficiency. The ROI was immediate and substantial."
              </p>
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
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

      {/* CTA Section */}
      <section className="section-primary" aria-labelledby="cta-heading">
        <div className="container-responsive text-center">
          <h2 id="cta-heading" className="heading-mobile text-heading mb-3 sm:mb-4">
            Ready to start your project?
          </h2>
          <p className="body-large text-body mb-5 sm:mb-6 max-w-2xl mx-auto">
            Free strategy session. Roadmap, estimate, and next steps in 24 hours.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted mb-6">
            <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-primary/70" /> Senior team</div>
            <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-primary/70" /> Transparent pricing</div>
            <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-primary/70" /> 24h response</div>
          </div>
          <Button 
            asChild
            size="sm" 
            className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] px-3 py-1.5 text-xs shadow-sm hover:shadow-md transition-all duration-300 rounded-md whitespace-nowrap"
          >
            <Link href="/consultation">
              Start a project
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </Button>
        </div>
      </section>


    </div>
  )
}

