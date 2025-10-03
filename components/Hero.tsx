import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle, Users, Star, TrendingUp, Zap, Sparkles } from "lucide-react";
import { ThumbnailImage } from "@/components/common/OptimizedImage";
import { GradientText } from "@/components/common";

const Hero = () => {

  const highlights = [
    { title: "Expert Team", description: "Skilled professionals", icon: Users, gradient: "innovation" },
    { title: "Quality Focus", description: "Excellence driven", icon: CheckCircle, gradient: "tech" },
    { title: "Business Growth", description: "Results oriented", icon: TrendingUp, gradient: "innovation" }
  ];

  return (
    <section 
      className="relative min-h-[85vh] flex items-center bg-background overflow-hidden gradient-overlay-innovation" 
      role="banner" 
      aria-label="Hero section showcasing Codenies software development services"
    >
      {/* Subtle gradient background pattern for visual depth */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(90,0,210,0.4)_1px,transparent_0)] bg-[length:32px_32px]"></div>
      </div>
      
      {/* Main Content Container */}
      <div className="container-responsive relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Hero Content with Enhanced Visual Hierarchy */}
          <div className="text-center">
            
            {/* Trust Badge with Animation */}
            <div className="hero-animate-badge mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/8 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/12 hover:border-primary/30 transition-all duration-300">
                <Star className="w-4 h-4" aria-hidden="true" />
                <span>Leading Software Development Agency</span>
              </div>
            </div>
            
            {/* Main Headline with Gradient Text Effect and Animation */}
            <div className="hero-animate-title mb-8">
              <h1 
                id="main-heading" 
                className="hero-headline mb-6"
              >
                <span className="block text-foreground mb-2">We design, build, and scale</span>
                <GradientText 
                  variant="innovation" 
                  hero 
                  animated 
                  as="span" 
                  className="block font-bold"
                >
                  revenue‑generating software
                </GradientText>
                <span className="block text-foreground mt-2">that grows your business</span>
              </h1>
            </div>
            
            {/* Subtitle with Animation and Improved Typography */}
            <div className="hero-animate-subtitle mb-10">
              <p 
                className="text-muted-foreground leading-relaxed max-w-3xl mx-auto"
              >
                Senior engineers and designers delivering SaaS, AI, mobile, and web products that increase revenue, reduce costs, and accelerate time‑to‑market.
              </p>
            </div>
            
            {/* Enhanced Call-to-Action Buttons with Animation */}
            <div className="hero-animate-buttons mb-12">
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-center">
                <Button 
                  asChild 
                  className="w-full sm:w-auto bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] hover:from-[var(--color-secondary)] hover:to-[var(--color-accent)] text-white px-4 py-2.5 text-sm font-medium rounded-md shadow-sm hover:shadow-md hero-button-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap min-w-fit"
                  aria-describedby="cta-description"
                >
                  <Link href="/consultation">
                    <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                    Start a project
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm" 
                  className="w-full sm:w-auto border border-primary/20 hover:border-primary text-foreground hover:text-primary px-4 py-2.5 text-sm font-medium rounded-md hero-button-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap min-w-fit"
                >
                  <Link href="/work">
                    <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                    See our work
                  </Link>
                </Button>
              </div>
              
              {/* Screen reader description for CTA */}
              <div id="cta-description" className="sr-only">
                Get started with a free consultation to discuss your software development needs
              </div>
            </div>
            
            {/* Trust Indicators with Enhanced Animation and Accessibility */}
            <div className="hero-animate-indicators">
              <div className="pt-8 border-t border-border/50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {highlights.map((highlight, index) => {
                    const IconComponent = highlight.icon;
                    return (
                      <div 
                        key={index} 
                        className="text-center group hero-trust-indicator"
                        role="group"
                        aria-label={`${highlight.title}: ${highlight.description}`}
                      >
                        <div 
                          className={`w-12 h-12 ${highlight.gradient === 'innovation' ? 'bg-gradient-innovation' : 'bg-gradient-tech'} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}
                          aria-hidden="true"
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="font-semibold text-foreground mb-1">{highlight.title}</div>
                        <div className="text-sm text-muted-foreground">{highlight.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Partners Section with Enhanced Animation and Accessibility */}
          <div className="hero-animate-partners">
            <div className="mt-16 pt-12 border-t border-border/30">
              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Trusted by innovative companies worldwide</span>
                </p>
              </div>
              <div 
                className="flex flex-wrap justify-center items-center gap-8 opacity-90 hover:opacity-100 transition-opacity duration-300"
                role="group"
                aria-label="Partner companies"
              >
                {[
                  { src: "/partners/apple.png", alt: "Apple", name: "Apple" },
                  { src: "/partners/google.png", alt: "Google", name: "Google" },
                  { src: "/partners/shopify.png", alt: "Shopify", name: "Shopify" },
                  { src: "/partners/aws.png", alt: "AWS", name: "Amazon Web Services" }
                ].map((partner, index) => (
                  <div key={index} className="flex items-center justify-center p-3 group">
                    <ThumbnailImage 
                      src={partner.src} 
                      alt={`${partner.name} logo - trusted partner`}
                      width={80}
                      height={48}
                      className="h-12 md:h-14 group-hover:scale-105 transition-transform duration-300 filter brightness-100 opacity-80 hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


