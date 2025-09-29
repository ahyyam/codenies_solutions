import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle, Users, Clock, Star, TrendingUp, Zap, Shield, Code, Sparkles } from "lucide-react";
import { ThumbnailImage } from "@/components/common/OptimizedImage";

const Hero = () => {

  const highlights = [
    { title: "Expert Team", description: "Skilled professionals", icon: Users, color: "from-blue-500 to-blue-600" },
    { title: "Quality Focus", description: "Excellence driven", icon: CheckCircle, color: "from-green-500 to-green-600" },
    { title: "Business Growth", description: "Results oriented", icon: TrendingUp, color: "from-purple-500 to-purple-600" }
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center bg-background overflow-hidden pt-12 lg:pt-10" role="banner" aria-label="Hero section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:24px_24px]"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="text-left space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Star className="w-3 h-3" />
                Leading Software Development Agency
              </div>
              
              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="block text-foreground">Transform</span>
                  <span className="block text-primary">Your Business</span>
                  <span className="block text-foreground">With Technology</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  We build <span className="font-semibold text-primary">custom software solutions</span> that 
                  <span className="font-semibold text-primary">increase revenue, reduce costs, and accelerate growth</span>. 
                  From AI automation to scalable SaaS platforms that deliver measurable ROI.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Link href="/consultation" aria-describedby="main-heading">
                    <Zap className="w-4 h-4 mr-2" />
                    Get Free Strategy Session
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-border hover:border-primary text-foreground hover:text-primary px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Link href="#services">
                    <Play className="w-4 h-4 mr-2" />
                    Explore Solutions
                  </Link>
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-3 gap-4">
                  {highlights.map((highlight, index) => {
                    const IconComponent = highlight.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className={`w-10 h-10 bg-gradient-to-br ${highlight.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-bold text-sm text-foreground mb-1">{highlight.title}</div>
                        <div className="text-xs text-muted-foreground">{highlight.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual Elements */}
            <div className="relative">
              {/* Floating Cards */}
              <div className="relative space-y-4">
                {/* Card 1 */}
                <div className="bg-card p-4 rounded-xl shadow-lg border border-border transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground text-sm">Custom Development</h3>
                      <p className="text-xs text-muted-foreground">Tailored solutions for your business</p>
                    </div>
                  </div>
                </div>
                
                {/* Card 2 */}
                <div className="bg-card p-4 rounded-xl shadow-lg border border-border transform -rotate-1 hover:rotate-0 transition-transform duration-300 ml-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground text-sm">AI Integration</h3>
                      <p className="text-xs text-muted-foreground">Smart automation & insights</p>
                    </div>
                  </div>
                </div>
                
                {/* Card 3 */}
                <div className="bg-card p-4 rounded-xl shadow-lg border border-border transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground text-sm">Enterprise Security</h3>
                      <p className="text-xs text-muted-foreground">Bank-grade protection</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Partners Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Trusted by innovative companies worldwide
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center justify-center p-2">
                <ThumbnailImage 
                  src="/partners/apple.png" 
                  alt="Apple" 
                  width={80}
                  height={48}
                  className="h-10 md:h-12 opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="flex items-center justify-center p-2">
                <ThumbnailImage 
                  src="/partners/google.png" 
                  alt="Google" 
                  width={80}
                  height={48}
                  className="h-10 md:h-12 opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="flex items-center justify-center p-2">
                <ThumbnailImage 
                  src="/partners/shopify.png" 
                  alt="Shopify" 
                  width={80}
                  height={48}
                  className="h-10 md:h-12 opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="flex items-center justify-center p-2">
                <ThumbnailImage 
                  src="/partners/aws.png" 
                  alt="AWS" 
                  width={80}
                  height={48}
                  className="h-10 md:h-12 opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


