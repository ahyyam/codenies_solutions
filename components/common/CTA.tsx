import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryText?: string;
  secondaryText?: string;
  primaryHref?: string;
  secondaryHref?: string;
  benefits?: string[];
  variant?: 'default' | 'gradient' | 'minimal';
  className?: string;
}

export default function CTA({
  title = "Ready to Start Your Project?",
  subtitle = "Let's discuss how we can help you achieve your goals with innovative solutions.",
  primaryText = "Start a project",
  secondaryText = "View our work",
  primaryHref = "/consultation",
  secondaryHref = "/work",
  benefits = ["Free consultation", "24h response", "Senior team"],
  variant = 'default',
  className = ""
}: CTAProps) {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return {
          container: "section-gradient",
          titleClass: "text-3xl lg:text-4xl font-bold mb-4 text-white",
          subtitleClass: "text-lg text-white/90 mb-8 max-w-2xl mx-auto"
        };
      case 'minimal':
        return {
          container: "section-primary",
          titleClass: "text-2xl lg:text-3xl font-bold mb-4 text-heading",
          subtitleClass: "text-base text-body mb-8 max-w-2xl mx-auto"
        };
      default:
        return {
          container: "section-contrast",
          titleClass: "text-3xl lg:text-4xl font-bold mb-4 text-white",
          subtitleClass: "text-lg text-white/90 mb-8 max-w-2xl mx-auto"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <section className={`${styles.container} ${className}`}>
      <div className="container-responsive text-center">
        <h2 className={styles.titleClass}>
          {title}
        </h2>
        
        <p className={styles.subtitleClass}>
          {subtitle}
        </p>

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-sm text-white/80">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/70"></div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            variant={variant === 'minimal' ? 'primary' : "secondary"}
            size="default"
            className={`font-bold px-8 py-4 shadow-lg hover:shadow-xl group ${
              variant === 'gradient' 
                ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-gray-900'
                : variant === 'default'
                ? 'bg-white text-gray-800 hover:text-gray-900'
                : ''
            }`}
          >
            <Link href={primaryHref}>
              <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              {primaryText}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="secondary" 
            size="default" 
            className={`font-bold px-8 py-4 shadow-lg hover:shadow-xl group ${
              variant === 'default'
                ? 'border-2 border-white text-white hover:bg-white hover:text-gray-800'
                : variant === 'gradient'
                ? 'border-2 border-white text-white hover:bg-white hover:text-gray-800'
                : ''
            }`}
          >
            <Link href={secondaryHref}>
              {secondaryText}
              <CheckCircle className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
