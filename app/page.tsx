import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Smartphone, Palette, Brain, ShoppingCart, Globe, Star } from "lucide-react"
import Link from "next/link"
import Hero from "@/components/Hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>

      <Hero />



      {/* Services Section */}
      <section id="services" className="section-padding bg-gray-50" aria-labelledby="services-heading">
        <div className="container-mobile">
          <header className="text-center mb-12 sm:mb-16">
            <h2 id="services-heading" className="heading-mobile text-gray-900 mb-4">Our Expertise</h2>
            <p className="text-mobile text-gray-600 max-w-2xl mx-auto">
              From concept to deployment, we deliver comprehensive digital solutions tailored to your business needs.
            </p>
          </header>

          <div className="grid-mobile">
            <Card className="card-mobile hover:shadow-lg transition-smooth group hover:scale-105 flex flex-col h-full">
              <CardHeader className="p-4 sm:p-6 flex flex-col h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 text-lg sm:text-xl group-hover:text-gray-700 transition-colors">SaaS Development</CardTitle>
                <CardDescription className="text-gray-600 text-sm sm:text-base flex-grow">
                  Generate recurring revenue with subscription-based platforms that scale automatically and reduce operational costs.
                </CardDescription>
                <div className="mt-4 pt-4 border-t border-gray-100 mt-auto">
                  <Link href="/services/saas-development" className="flex items-center text-sm text-gray-700 font-medium hover:text-gray-800 transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardHeader>
            </Card>

            <Card className="card-mobile hover:shadow-lg transition-smooth group hover:scale-105 flex flex-col h-full">
              <CardHeader className="p-4 sm:p-6 flex flex-col h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 text-lg sm:text-xl group-hover:text-gray-600 transition-colors">E-commerce Solutions</CardTitle>
                <CardDescription className="text-gray-600 text-sm sm:text-base flex-grow">
                  Increase online sales by up to 200% with conversion-optimized stores that turn visitors into customers.
                </CardDescription>
                <div className="mt-4 pt-4 border-t border-gray-100 mt-auto">
                  <Link href="/services/ecommerce-solutions" className="flex items-center text-sm text-gray-600 font-medium hover:text-gray-700 transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardHeader>
            </Card>

            <Card className="card-mobile hover:shadow-lg transition-smooth group hover:scale-105 flex flex-col h-full">
              <CardHeader className="p-4 sm:p-6 flex flex-col h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 text-lg sm:text-xl group-hover:text-gray-800 transition-colors">Website Development</CardTitle>
                <CardDescription className="text-gray-600 text-sm sm:text-base flex-grow">
                  Generate more leads and improve search rankings with websites designed for business growth and conversion.
                </CardDescription>
                <div className="mt-4 pt-4 border-t border-gray-100 mt-auto">
                  <Link href="/services/website-development" className="flex items-center text-sm text-gray-800 font-medium hover:text-gray-900 transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardHeader>
            </Card>

            <Card className="card-mobile hover:shadow-lg transition-smooth group hover:scale-105 flex flex-col h-full">
              <CardHeader className="p-4 sm:p-6 flex flex-col h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 text-lg sm:text-xl group-hover:text-gray-700 transition-colors">Mobile Applications</CardTitle>
                <CardDescription className="text-gray-600 text-sm sm:text-base flex-grow">
                  Reach customers directly and increase engagement with mobile apps that drive loyalty and new revenue streams.
                </CardDescription>
                <div className="mt-4 pt-4 border-t border-gray-100 mt-auto">
                  <Link href="/services/mobile-applications" className="flex items-center text-sm text-gray-700 font-medium hover:text-gray-800 transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardHeader>
            </Card>

            <Card className="card-mobile hover:shadow-lg transition-smooth group hover:scale-105 flex flex-col h-full">
              <CardHeader className="p-4 sm:p-6 flex flex-col h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 text-lg sm:text-xl group-hover:text-gray-600 transition-colors">UI/UX Design</CardTitle>
                <CardDescription className="text-gray-600 text-sm sm:text-base flex-grow">
                  Increase conversion rates and reduce support costs with user-centered design that drives business results.
                </CardDescription>
                <div className="mt-4 pt-4 border-t border-gray-100 mt-auto">
                  <Link href="/services/ui-ux-design" className="flex items-center text-sm text-gray-600 font-medium hover:text-gray-700 transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardHeader>
            </Card>

            <Card className="card-mobile hover:shadow-lg transition-smooth group hover:scale-105 flex flex-col h-full">
              <CardHeader className="p-4 sm:p-6 flex flex-col h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 text-lg sm:text-xl group-hover:text-gray-800 transition-colors">AI Integration</CardTitle>
                <CardDescription className="text-gray-600 text-sm sm:text-base flex-grow">
                  Reduce operational costs by up to 60% with AI automation that eliminates manual work and improves efficiency.
                </CardDescription>
                <div className="mt-4 pt-4 border-t border-gray-100 mt-auto">
                  <Link href="/services/ai-integration" className="flex items-center text-sm text-gray-800 font-medium hover:text-gray-900 transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="section-padding" aria-labelledby="about-heading">
        <div className="container-mobile">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 id="about-heading" className="heading-mobile text-gray-900 mb-4 sm:mb-6">Why Choose codenies?</h2>
              <p className="text-mobile text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                We're your strategic technology partners, combining technical expertise with business acumen to deliver solutions that drive measurable growth and competitive advantage for your business.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Business Growth Focus</h3>
                    <p className="text-gray-600 text-sm">Solutions designed to increase revenue and operational efficiency</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Competitive Advantage</h3>
                    <p className="text-gray-600 text-sm">Cutting-edge technology that keeps you ahead of the competition</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Measurable ROI</h3>
                    <p className="text-gray-600 text-sm">Proven track record of delivering quantifiable business results</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Business Impact</h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                <strong>Revenue Growth:</strong> Our solutions help clients increase sales and operational efficiency.
              </p>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                <strong>Cost Reduction:</strong> Automation and optimization reduce operational expenses.
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>Market Leadership:</strong> Stay ahead with innovative technology solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white" aria-labelledby="testimonials-heading">
        <div className="container-mobile">
          <header className="text-center mb-12 sm:mb-16">
            <h2 id="testimonials-heading" className="heading-mobile text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-mobile text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </header>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  J
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">John Smith</h4>
                  <p className="text-sm text-gray-600">CEO, TechStart Inc.</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "codenies built our SaaS platform that generated $2M in recurring revenue within the first year. Their business-focused approach delivered exceptional ROI."
              </p>
              <div className="flex text-gray-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Founder, EcoMart</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "The e-commerce platform codenies built increased our online sales by 300% and reduced cart abandonment by 40%. Outstanding business impact."
              </p>
              <div className="flex text-gray-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Mike Chen</h4>
                  <p className="text-sm text-gray-600">CTO, HealthTech</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "codenies' AI integration reduced our operational costs by 50% and improved patient care efficiency. The ROI was immediate and substantial."
              </p>
              <div className="flex text-gray-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding bg-white" aria-labelledby="tech-heading">
        <div className="container-mobile">
          <header className="text-center mb-12 sm:mb-16">
            <h2 id="tech-heading" className="heading-mobile text-gray-900 mb-4">Technologies We Master</h2>
            <p className="text-mobile text-gray-600 max-w-2xl mx-auto">
              We use cutting-edge technologies to build robust, scalable, and future-proof solutions.
            </p>
          </header>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
            {[
              { name: "React", icon: "⚛️", color: "from-gray-600 to-gray-700" },
              { name: "Next.js", icon: "▲", color: "from-gray-800 to-gray-900" },
              { name: "Node.js", icon: "🟢", color: "from-gray-500 to-gray-600" },
              { name: "TypeScript", icon: "🔷", color: "from-gray-700 to-gray-800" },
              { name: "Python", icon: "🐍", color: "from-gray-600 to-gray-700" },
              { name: "AWS", icon: "☁️", color: "from-gray-500 to-gray-600" },
              { name: "Docker", icon: "🐳", color: "from-gray-600 to-gray-700" },
              { name: "PostgreSQL", icon: "🐘", color: "from-gray-700 to-gray-800" },
              { name: "MongoDB", icon: "🍃", color: "from-gray-500 to-gray-600" },
              { name: "Firebase", icon: "🔥", color: "from-gray-600 to-gray-700" },
              { name: "AI/ML", icon: "🤖", color: "from-gray-700 to-gray-800" },
              { name: "Flutter", icon: "📱", color: "from-gray-600 to-gray-700" }
            ].map((tech, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                  {tech.icon}
                </div>
                <h4 className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {tech.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-900" aria-labelledby="cta-heading">
        <div className="container-mobile text-center">
          <h2 id="cta-heading" className="heading-mobile text-white mb-4 sm:mb-6">Ready to Accelerate Your Business Growth?</h2>
          <p className="text-mobile text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Discover how our technology solutions can increase your revenue, reduce costs, and give you competitive advantage. Get a free strategic consultation today.
          </p>
          <Link href="/consultation">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
              Schedule Free Consultation
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
        </div>
      </section>


    </div>
  )
}
