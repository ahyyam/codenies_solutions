'use client';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink, Github, Award, Zap, Star, TrendingUp, Users, CheckCircle, Sparkles, Eye, Filter, Grid, List, Code, Shield, Zap as ZapIcon, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

// Project data structure - easy to add new projects
const projectsData = [
  {
    id: 1,
    title: "CloudSync SaaS Platform",
    category: "SaaS Development",
    description: "A comprehensive cloud storage and collaboration platform serving 10,000+ users with real-time sync and AI-powered file organization.",
    image: "/modern-saas-dashboard.png",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "AWS", "AI Integration"],
    results: ["300% increase in user productivity", "99.9% uptime", "50% reduction in storage costs"],
    link: "#",
    featured: true,
    client: "TechCorp Inc.",
    duration: "6 months",
    teamSize: "8 developers"
  },
  {
    id: 2,
    title: "EcoMart E-commerce",
    category: "E-commerce",
    description: "Sustainable products marketplace with advanced filtering, AI recommendations, and integrated payment processing.",
    image: "/modern-ecommerce-green.png",
    technologies: ["React", "Node.js", "Stripe", "MongoDB", "Machine Learning"],
    results: ["$2M+ in sales", "40% conversion rate", "25,000+ active users"],
    link: "#",
    featured: true,
    client: "EcoMart",
    duration: "4 months",
    teamSize: "6 developers"
  },
  {
    id: 3,
    title: "FitTracker Mobile App",
    category: "Mobile Application",
    description: "Cross-platform fitness tracking app with social features, workout plans, and nutrition tracking.",
    image: "/placeholder-vnct0.png",
    technologies: ["React Native", "Firebase", "AI Analytics", "HealthKit"],
    results: ["100K+ downloads", "4.8 App Store rating", "80% user retention"],
    link: "#",
    featured: false,
    client: "FitTech Solutions",
    duration: "5 months",
    teamSize: "5 developers"
  },
  {
    id: 4,
    title: "MedConnect Telemedicine",
    category: "Healthcare SaaS",
    description: "HIPAA-compliant telemedicine platform connecting patients with healthcare providers through secure video calls.",
    image: "/placeholder-qvoz2.png",
    technologies: ["Next.js", "WebRTC", "PostgreSQL", "HIPAA Compliance"],
    results: ["50,000+ consultations", "95% patient satisfaction", "60% cost reduction"],
    link: "#",
    featured: true,
    client: "HealthConnect",
    duration: "8 months",
    teamSize: "10 developers"
  },
  {
    id: 5,
    title: "AI Content Studio",
    category: "AI Integration",
    description: "Content creation platform powered by AI for generating marketing copy, images, and social media posts.",
    image: "/ai-content-dashboard.png",
    technologies: ["Python", "OpenAI API", "React", "Redis", "Docker"],
    results: ["10x faster content creation", "500+ businesses served", "90% time savings"],
    link: "#",
    featured: false,
    client: "ContentAI",
    duration: "3 months",
    teamSize: "4 developers"
  },
  {
    id: 6,
    title: "RestaurantOS",
    category: "Restaurant Management",
    description: "Complete restaurant management system with POS, inventory tracking, and customer analytics.",
    image: "/modern-restaurant-pos.png",
    technologies: ["React", "Laravel", "MySQL", "Payment Integration"],
    results: ["200+ restaurants", "30% revenue increase", "50% order accuracy improvement"],
    link: "#",
    featured: false,
    client: "RestaurantTech",
    duration: "7 months",
    teamSize: "7 developers"
  },
]

// Categories for easy filtering
const projectCategories = [
  { id: "all", name: "All Projects", count: projectsData.length },
  { id: "SaaS Development", name: "SaaS Development", count: projectsData.filter(p => p.category === "SaaS Development").length },
  { id: "E-commerce", name: "E-commerce", count: projectsData.filter(p => p.category === "E-commerce").length },
  { id: "Mobile Application", name: "Mobile Application", count: projectsData.filter(p => p.category === "Mobile Application").length },
  { id: "Healthcare SaaS", name: "Healthcare SaaS", count: projectsData.filter(p => p.category === "Healthcare SaaS").length },
  { id: "AI Integration", name: "AI Integration", count: projectsData.filter(p => p.category === "AI Integration").length },
  { id: "Restaurant Management", name: "Restaurant Management", count: projectsData.filter(p => p.category === "Restaurant Management").length },
]

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter projects based on category
  const filteredProjects = projectsData.filter(project => {
    if (selectedCategory === "all") return true
    return project.category === selectedCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-primary/10 text-primary">
            <Award className="w-3 h-3 mr-2" />
            Our Portfolio
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
            Our Work
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover how we've helped businesses transform their ideas into powerful, scalable software solutions 
            that drive real results and measurable impact.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3"
            >
              <Link href="/consultation">
                <Zap className="w-4 h-4 mr-2" />
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-border hover:border-primary text-foreground hover:text-primary px-6 py-3"
            >
              <Link href="#portfolio">
                <Eye className="w-4 h-4 mr-2" />
                View Portfolio
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-primary" />
              </div>
              <span>50+ Projects</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <span>99% Success Rate</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span>Enterprise Grade</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & View Controls */}
      <section className="py-8 px-4 border-b border-border">
        <div className="container mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {projectCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 bg-transparent"
                }
              >
                {category.name}
                <span className="ml-2 text-xs bg-primary/20 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground text-center">
              {filteredProjects.length === 0 ? 'No Projects Found' : `Portfolio (${filteredProjects.length})`}
            </h2>
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No projects found in this category.</p>
                <Button 
                  onClick={() => setSelectedCategory("all")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  View All Projects
                </Button>
              </div>
            )}
          </div>
          
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <ProjectCardList key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your ideas to life with our expertise in software development.
          </p>
          <Link href="/consultation">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 px-6 py-3 text-base group hover:scale-105 transition-all duration-300">
              <ZapIcon className="w-4 h-4 mr-2" />
              Get Free Strategy Session
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

// Grid Project Card Component
function ProjectCard({ project }: { project: any }) {
  return (
    <article className="group cursor-pointer">
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="aspect-video bg-muted overflow-hidden relative">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-yellow-500 text-white shadow-lg">
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground shadow-lg">
              {project.category}
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-foreground group-hover:text-primary transition-colors line-clamp-2 text-lg font-semibold mb-3">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.slice(0, 3).map((tech: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs border-border text-muted-foreground">
                {tech}
              </Badge>
            ))}
          </div>
          
          {/* Project Details */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {project.teamSize}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {project.duration}
            </div>
          </div>
          
          {/* Results */}
          <div className="space-y-2 mb-4">
            {project.results.slice(0, 2).map((result: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>{result}</span>
              </div>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 border-border text-muted-foreground hover:border-primary hover:text-primary">
              <Eye className="w-3 h-3 mr-1" />
              View Details
            </Button>
            <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:border-primary hover:text-primary">
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

// List Project Card Component
function ProjectCardList({ project }: { project: any }) {
  return (
    <article className="group cursor-pointer">
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 aspect-video bg-muted overflow-hidden relative">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={250}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {project.featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-500 text-white shadow-lg">
                  Featured
                </Badge>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground shadow-lg">
                {project.category}
              </Badge>
            </div>
          </div>
          
          <div className="lg:w-2/3 p-6">
            <h3 className="text-foreground group-hover:text-primary transition-colors text-xl font-semibold mb-3">
              {project.title}
            </h3>
            
            <p className="text-muted-foreground mb-4">
              {project.description}
            </p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.technologies.map((tech: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs border-border text-muted-foreground">
                  {tech}
                </Badge>
              ))}
            </div>
            
            {/* Project Details & Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Project Details</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{project.teamSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>{project.client}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Key Results</h4>
                <div className="space-y-1">
                  {project.results.map((result: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:border-primary hover:text-primary">
                <Eye className="w-3 h-3 mr-1" />
                View Details
              </Button>
              <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:border-primary hover:text-primary">
                <ExternalLink className="w-3 h-3 mr-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
