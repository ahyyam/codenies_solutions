'use client';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink, Github, Award, Zap, Star, TrendingUp, Users, CheckCircle, Sparkles, Eye, Filter, Grid, List } from "lucide-react"
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
    technologies: ["Vue.js", "Laravel", "MySQL", "Payment Integration"],
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
  { id: "saas", name: "SaaS Development", count: projectsData.filter(p => p.category.includes("SaaS")).length },
  { id: "ecommerce", name: "E-commerce", count: projectsData.filter(p => p.category.includes("E-commerce")).length },
  { id: "mobile", name: "Mobile Apps", count: projectsData.filter(p => p.category.includes("Mobile")).length },
  { id: "ai", name: "AI Integration", count: projectsData.filter(p => p.category.includes("AI")).length },
  { id: "healthcare", name: "Healthcare", count: projectsData.filter(p => p.category.includes("Healthcare")).length },
  { id: "restaurant", name: "Restaurant", count: projectsData.filter(p => p.category.includes("Restaurant")).length },
]

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter projects based on category and search
  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = selectedCategory === "all" || 
      project.category.toLowerCase().includes(selectedCategory) ||
      project.client.toLowerCase().includes(selectedCategory)
    
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  // Featured projects for hero section
  const featuredProjects = projectsData.filter(project => project.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gray-900 text-white px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen flex items-center" aria-labelledby="work-hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
        <div className="container mx-auto text-center max-w-5xl relative z-10">

          
          <h1 id="work-hero-heading" className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-elegant font-bold text-gray-900 mb-6 leading-tight">
            Transforming Ideas Into
            <span className="hero-gradient-text block font-cursive"> Digital Success</span>
          </h1>
          
          <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto font-cursive">
            Explore our portfolio of successful projects across SaaS, e-commerce, mobile applications, and AI-powered
            solutions that have driven <span className="font-semibold text-primary">real business results</span>.
          </p>

          {/* Enhanced CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              asChild 
              size="lg" 
              className="btn-hero-primary text-lg px-8 py-4 group hover:scale-105 transition-all duration-300"
            >
              <Link href="/consultation">
                <Zap className="w-5 h-5 mr-2" />
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="btn-secondary text-lg px-6 py-4 group hover:scale-105 transition-all duration-300 border-2 hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="#projects">
                <Eye className="w-5 h-5 mr-2" />
                Explore Projects
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <span className="group-hover:text-primary transition-colors">{projectsData.length}+ Projects Delivered</span>
            </div>
            <div className="flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span className="group-hover:text-primary transition-colors">99% Success Rate</span>
            </div>
            <div className="flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <span className="group-hover:text-primary transition-colors">Award-Winning Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-16 px-4 bg-white" aria-labelledby="featured-heading">
        <div className="container mx-auto">
          <h2 id="featured-heading" className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-gray-100">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={400} 
                    height={250} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">{project.category}</Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Filter & Search Section */}
      <section className="py-8 px-4 border-b border-gray-200 bg-white" aria-label="Project filtering and search">
        <div className="container mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search projects, technologies, or clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            {projectCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    : "border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 bg-transparent"
                }
              >
                {category.name}
                <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">{category.count}</span>
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className="rounded-r-none border-r-0"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section id="projects" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white" aria-labelledby="projects-heading">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 id="projects-heading" className="text-3xl font-bold text-gray-900">
              All Projects ({filteredProjects.length})
            </h2>
            <p className="text-gray-600">Showing {filteredProjects.length} of {projectsData.length} projects</p>
          </div>
          
          {viewMode === "grid" ? (
            <div className="grid lg:grid-cols-2 gap-12">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <ProjectListItem key={project.id} project={project} />
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No projects found matching your criteria.</p>
              <Button 
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" aria-labelledby="stats-heading">
        <div className="container mx-auto">
          <header className="text-center mb-16">
            <h2 id="stats-heading" className="text-4xl font-bold text-white mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real results from real projects that have transformed businesses across industries.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">{projectsData.length}+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">$50M+</div>
              <div className="text-gray-300">Revenue Generated</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">2M+</div>
              <div className="text-gray-300">Users Served</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
              <div className="text-gray-300">Client Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/90" aria-labelledby="work-cta-heading">
        <div className="container mx-auto text-center">
          <h2 id="work-cta-heading" className="text-4xl font-bold text-white mb-6">Ready to Join Our Success Stories?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and explore how we can help you achieve similar results. Get a free consultation
            today.
          </p>
          <Link href="/consultation">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg group hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <Zap className="w-5 h-5 mr-2" />
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

// Project Card Component - Easy to customize
function ProjectCard({ project }: { project: typeof projectsData[0] }) {
  return (
    <article className="border border-gray-200 hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-xl bg-white group hover:scale-105">
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-white shadow-lg">{project.category}</Badge>
        </div>
        {project.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-yellow-500 text-white shadow-lg">Featured</Badge>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl text-gray-900 group-hover:text-primary transition-colors">{project.title}</h3>
        </div>
        
        <p className="text-gray-600 text-base leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Project Meta */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Client:</span>
            <p className="font-medium text-gray-900">{project.client}</p>
          </div>
          <div>
            <span className="text-gray-500">Duration:</span>
            <p className="font-medium text-gray-900">{project.duration}</p>
          </div>
          <div>
            <span className="text-gray-500">Team:</span>
            <p className="font-medium text-gray-900">{project.teamSize}</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <Badge key={techIndex} variant="outline" className="border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Key Results:</h4>
          <ul className="space-y-1">
            {project.results.map((result, resultIndex) => (
              <li key={resultIndex} className="text-gray-600 flex items-center">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                {result}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90 text-white flex-1 group-hover:scale-105 transition-all duration-300">
            View Case Study
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 bg-transparent">
            <Github className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </article>
  )
}

// Project List Item Component - Alternative view
function ProjectListItem({ project }: { project: typeof projectsData[0] }) {
  return (
    <article className="border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden rounded-xl bg-white group hover:scale-102">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-80 h-48 md:h-auto bg-gray-100 overflow-hidden">
          <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-white shadow-lg">{project.category}</Badge>
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl text-gray-900 group-hover:text-primary transition-colors">{project.title}</h3>
            {project.featured && (
              <Badge className="bg-yellow-500 text-white">Featured</Badge>
            )}
          </div>
          
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-500">Client:</span>
              <p className="font-medium text-gray-900">{project.client}</p>
            </div>
            <div>
              <span className="text-gray-500">Duration:</span>
              <p className="font-medium text-gray-900">{project.duration}</p>
            </div>
            <div>
              <span className="text-gray-500">Team:</span>
              <p className="font-medium text-gray-900">{project.teamSize}</p>
            </div>
            <div>
              <span className="text-gray-500">Category:</span>
              <p className="font-medium text-gray-900">{project.category}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-white group-hover:scale-105 transition-all duration-300">
              View Case Study
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 bg-transparent">
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
