'use client';

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Award, Zap, Star, Code, Shield } from "lucide-react"
import Link from "next/link"
import { ProjectGrid } from "@/components/projects/ProjectGrid"
import { ProjectFilter } from "@/components/projects/ProjectFilter"
import { ProjectModal } from "@/components/projects/ProjectModal"
import { Project } from "@/lib/types/project"
import { ProjectStatus } from "@/lib/types/common"
import { initializeSampleProjects } from "@/lib/data/sample-projects"
import { 
  extractCategoriesFromProjects, 
  extractTechnologiesFromProjects,
  filterProjects,
  sortProjects,
  ProjectFilterCriteria,
  ProjectSortOption
} from "@/lib/utils/project-utils"

export default function WorkPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<ProjectSortOption>('featured')

  useEffect(() => {
    // Initialize sample data if needed
    initializeSampleProjects()
    
    // Load projects from localStorage
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('projects') : null
      if (stored) {
        const parsed = JSON.parse(stored).map((p: any) => {
          // Ensure all required fields exist with defaults
          const project = {
            ...p,
            createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
            updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
            timeline: {
              duration: '',
              phases: [],
              ...p.timeline,
              startDate: p.timeline?.startDate ? new Date(p.timeline.startDate) : new Date(),
              endDate: p.timeline?.endDate ? new Date(p.timeline.endDate) : undefined
            },
            // Ensure other required fields exist
            images: p.images || [],
            technologies: p.technologies || [],
            features: p.features || [],
            challenges: p.challenges || [],
            results: p.results || [],
            team: p.team || [],
            links: p.links || {},
            seo: p.seo || { title: p.title, description: p.description, keywords: [] },
            settings: p.settings || { showClient: true, showTeam: true, showTimeline: true, showResults: true, allowInquiries: true }
          };
          return project;
        })
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllProjects(parsed)
          setFilteredProjects(parsed)
        } else {
          // If no valid projects found, try to reload sample projects
          const sampleStored = localStorage.getItem('projects')
          if (sampleStored) {
            const sampleParsed = JSON.parse(sampleStored)
            if (Array.isArray(sampleParsed) && sampleParsed.length > 0) {
              setAllProjects(sampleParsed)
              setFilteredProjects(sampleParsed)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Apply filters whenever filter criteria change
  useEffect(() => {
    const criteria: ProjectFilterCriteria = {
      searchQuery: searchQuery.trim() || undefined,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      technologies: selectedTechnologies.length > 0 ? selectedTechnologies : undefined,
      status: selectedStatus.length > 0 ? selectedStatus : undefined
    }

    let filtered = filterProjects(allProjects, criteria)
    filtered = sortProjects(filtered, sortBy)
    setFilteredProjects(filtered)
  }, [allProjects, searchQuery, selectedCategories, selectedTechnologies, selectedStatus, sortBy])

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const handleClearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setSelectedTechnologies([])
    setSelectedStatus([])
  }

  // Extract filter options from all projects
  const categories = extractCategoriesFromProjects(allProjects)
  const technologies = extractTechnologiesFromProjects(allProjects)

  const featuredProjects = allProjects.filter(p => p.featured)
  const projectForPreview = featuredProjects.length > 0 ? featuredProjects[0] : allProjects[0]
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
            Our portfolio is currently private. Contact us to request access.
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
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-primary" />
              </div>
              <span>Expert Engineers</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <span>Client Satisfaction</span>
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

      {/* Projects Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Portfolio</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our recent projects and see how we've helped businesses achieve their goals through innovative technology solutions.
            </p>
          </div>

          {/* Project Filter */}
          <ProjectFilter
            categories={categories}
            technologies={technologies}
            selectedCategories={selectedCategories}
            selectedTechnologies={selectedTechnologies}
            selectedStatus={selectedStatus}
            searchQuery={searchQuery}
            viewMode={viewMode}
            onCategoryChange={setSelectedCategories}
            onTechnologyChange={setSelectedTechnologies}
            onStatusChange={setSelectedStatus}
            onSearchChange={setSearchQuery}
            onViewModeChange={setViewMode}
            onClearAll={handleClearAllFilters}
            className="mb-8"
          />

          {/* Results Summary */}
          {!loading && (
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredProjects.length} of {allProjects.length} projects
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as ProjectSortOption)}
                  className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          <ProjectGrid 
            projects={filteredProjects}
            onProjectSelect={handleProjectSelect}
            loading={loading}
            className="mb-12"
          />

          {/* Empty State */}
          {filteredProjects.length === 0 && !loading && allProjects.length > 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-6">
                No projects match your current filters. Try adjusting your search criteria.
              </p>
              <Button onClick={handleClearAllFilters}>
                Clear All Filters
              </Button>
            </div>
          )}

          {allProjects.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-6">
                Our portfolio is currently being updated. Contact us to learn more about our recent work.
              </p>
              <Button asChild>
                <Link href="/consultation">
                  <Zap className="w-4 h-4 mr-2" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* CTA Section */}
      <section className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your ideas to life with our expertise in software development.
          </p>
          <Link href="/consultation">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 px-6 py-3 text-base group hover:scale-105 transition-all duration-300">
              <Zap className="w-4 h-4 mr-2" />
              Get Free Strategy Session
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
