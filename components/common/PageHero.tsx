import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  ctaHref?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

export default function PageHero({
  eyebrow = "Leading Software Development Agency",
  title,
  subtitle,
  ctaHref,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
}: PageHeroProps) {
  return (
    <section className="bg-background pt-20 lg:pt-16 pb-12" aria-labelledby="page-hero-heading">
      <div className="container-responsive text-center max-w-4xl">
        <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
          <Star className="w-3 h-3 mr-2" />
          {eyebrow}
        </Badge>

        <h1 id="page-hero-heading" className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {(ctaHref || secondaryHref) && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {ctaHref && ctaLabel && (
              <Button asChild size="lg" className="bg-primary hover:bg-[var(--primary-hover)] text-primary-foreground px-6 py-3">
                <Link href={ctaHref}>
                  {ctaLabel}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            )}
            {secondaryHref && secondaryLabel && (
              <Button asChild variant="outline" size="lg" className="border-border hover:border-primary text-foreground hover:text-primary px-6 py-3">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}




