// Project data service with enhanced functionality
import { Project, CreateProjectInput, UpdateProjectInput } from '../types/project';
import { storageService } from './storage-service';
import { ContentValidator } from '../utils/validation';
import { AppErrorHandler } from '../utils/error-handling';

const PROJECT_STORAGE_KEY = 'projects';
const PROJECT_CATEGORIES_KEY = 'project_categories';
const TECHNOLOGIES_KEY = 'technologies';
const CLIENTS_KEY = 'clients';

export class ProjectService {
  private static instance: ProjectService;

  private constructor() {}

  static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  // Get all projects
  getAllProjects(): Project[] {
    return storageService.getItem<Project[]>(PROJECT_STORAGE_KEY, []) || [];
  }

  // Get project by ID
  getProjectById(id: string): Project | null {
    const projects = this.getAllProjects();
    return projects.find(project => project.id === id) || null;
  }

  // Get project by slug
  getProjectBySlug(slug: string): Project | null {
    const projects = this.getAllProjects();
    return projects.find(project => project.slug === slug) || null;
  }

  // Create new project
  async createProject(input: CreateProjectInput): Promise<Project> {
    try {
      // Validate input
      const validation = ContentValidator.validateProject(input);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
      }

      const projects = this.getAllProjects();
      const now = new Date();

      // Generate unique ID and slug
      const id = crypto.randomUUID();
      const slug = this.generateUniqueSlug(input.title, projects);

      const newProject: Project = {
        id,
        title: input.title,
        slug,
        category: {
          id: input.categoryId,
          name: 'General', // This would come from category service
          slug: input.categoryId
        },
        description: input.description,
        longDescription: input.longDescription,
        images: input.imageIds.map(id => ({
          id,
          url: '', // This would be resolved from image service
          alt: input.title
        })),
        technologies: input.technologyIds.map(id => ({
          id,
          name: id, // This would come from technology service
          category: 'other'
        })),
        features: input.features || [],
        challenges: [], // Would be added later through updates
        results: [], // Would be added later through updates
        client: {
          id: input.clientId,
          name: 'Client', // This would come from client service
          industry: 'Technology'
        },
        timeline: {
          startDate: input.timeline.startDate,
          endDate: input.timeline.endDate,
          duration: input.timeline.duration,
          phases: [] // Would be added later through updates
        },
        team: input.teamMemberIds.map(id => ({
          id,
          name: 'Team Member', // This would come from team service
          role: 'Developer'
        })),
        status: input.status || 'active',
        featured: input.featured || false,
        links: input.links || {},
        seo: {
          title: input.seo?.title || input.title,
          description: input.seo?.description || input.description,
          keywords: input.seo?.keywords || [],
          ogImage: input.seo?.ogImage,
          canonicalUrl: input.seo?.canonicalUrl
        },
        settings: {
          showClient: input.settings?.showClient ?? true,
          showTeam: input.settings?.showTeam ?? true,
          showTimeline: input.settings?.showTimeline ?? true,
          showResults: input.settings?.showResults ?? true,
          allowInquiries: input.settings?.allowInquiries ?? true
        },
        createdAt: now,
        updatedAt: now
      };

      const updatedProjects = [newProject, ...projects];
      storageService.setItem(PROJECT_STORAGE_KEY, updatedProjects);

      return newProject;
    } catch (error) {
      throw AppErrorHandler.createError(
        'CREATE_PROJECT_ERROR',
        `Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { input, error }
      );
    }
  }

  // Update existing project
  async updateProject(input: UpdateProjectInput): Promise<Project> {
    try {
      const projects = this.getAllProjects();
      const existingProjectIndex = projects.findIndex(project => project.id === input.id);

      if (existingProjectIndex === -1) {
        throw new Error('Project not found');
      }

      // Validate input
      const validation = ContentValidator.validateProject(input);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
      }

      const existingProject = projects[existingProjectIndex];
      const updatedProject: Project = {
        ...existingProject,
        ...input,
        updatedAt: new Date(),
        slug: input.title && input.title !== existingProject.title 
          ? this.generateUniqueSlug(input.title, projects.filter(p => p.id !== input.id))
          : existingProject.slug,
        timeline: input.timeline ? {
          ...existingProject.timeline,
          ...input.timeline,
          phases: existingProject.timeline.phases
        } : existingProject.timeline,
        seo: {
          ...existingProject.seo,
          ...input.seo,
          keywords: input.seo?.keywords || existingProject.seo.keywords
        },
        settings: {
          ...existingProject.settings,
          ...input.settings,
          showClient: input.settings?.showClient ?? existingProject.settings.showClient,
          showTeam: input.settings?.showTeam ?? existingProject.settings.showTeam,
          showTimeline: input.settings?.showTimeline ?? existingProject.settings.showTimeline,
          showResults: input.settings?.showResults ?? existingProject.settings.showResults,
          allowInquiries: input.settings?.allowInquiries ?? existingProject.settings.allowInquiries
        }
      };

      projects[existingProjectIndex] = updatedProject;
      storageService.setItem(PROJECT_STORAGE_KEY, projects);

      return updatedProject;
    } catch (error) {
      throw AppErrorHandler.createError(
        'UPDATE_PROJECT_ERROR',
        `Failed to update project: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { input, error }
      );
    }
  }

  // Delete project
  async deleteProject(id: string): Promise<void> {
    try {
      const projects = this.getAllProjects();
      const filteredProjects = projects.filter(project => project.id !== id);

      if (filteredProjects.length === projects.length) {
        throw new Error('Project not found');
      }

      storageService.setItem(PROJECT_STORAGE_KEY, filteredProjects);
    } catch (error) {
      throw AppErrorHandler.createError(
        'DELETE_PROJECT_ERROR',
        `Failed to delete project: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { id, error }
      );
    }
  }

  // Get active projects
  getActiveProjects(): Project[] {
    return this.getAllProjects().filter(project => project.status === 'active');
  }

  // Get completed projects
  getCompletedProjects(): Project[] {
    return this.getAllProjects().filter(project => project.status === 'completed');
  }

  // Get featured projects
  getFeaturedProjects(): Project[] {
    return this.getAllProjects().filter(project => project.featured);
  }

  // Search projects
  searchProjects(query: string): Project[] {
    const projects = this.getAllProjects();
    const lowercaseQuery = query.toLowerCase();

    return projects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.longDescription?.toLowerCase().includes(lowercaseQuery) ||
      project.technologies.some(tech => tech.name.toLowerCase().includes(lowercaseQuery)) ||
      project.client.name.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Get projects by category
  getProjectsByCategory(categoryId: string): Project[] {
    return this.getAllProjects().filter(project => project.category.id === categoryId);
  }

  // Get projects by technology
  getProjectsByTechnology(technologyId: string): Project[] {
    return this.getAllProjects().filter(project => 
      project.technologies.some(tech => tech.id === technologyId)
    );
  }

  // Get projects by client
  getProjectsByClient(clientId: string): Project[] {
    return this.getAllProjects().filter(project => project.client.id === clientId);
  }

  // Generate unique slug
  private generateUniqueSlug(title: string, existingProjects: Project[]): string {
    let baseSlug = ContentValidator.generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (existingProjects.some(project => project.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  // Get project statistics
  getStats() {
    const projects = this.getAllProjects();
    
    // Get top technologies
    const technologyCounts = new Map<string, number>();
    projects.forEach(project => {
      project.technologies.forEach(tech => {
        technologyCounts.set(tech.id, (technologyCounts.get(tech.id) || 0) + 1);
      });
    });

    const topTechnologies = Array.from(technologyCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([techId, count]) => ({
        technology: projects
          .flatMap(p => p.technologies)
          .find(t => t.id === techId)!,
        count
      }));

    return {
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'active').length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      featuredProjects: projects.filter(p => p.featured).length,
      topTechnologies
    };
  }

  // Export project data
  exportData() {
    return {
      projects: this.getAllProjects(),
      categories: storageService.getItem(PROJECT_CATEGORIES_KEY, []),
      technologies: storageService.getItem(TECHNOLOGIES_KEY, []),
      clients: storageService.getItem(CLIENTS_KEY, [])
    };
  }

  // Import project data
  importData(data: { 
    projects?: Project[], 
    categories?: any[], 
    technologies?: any[], 
    clients?: any[] 
  }) {
    if (data.projects) {
      storageService.setItem(PROJECT_STORAGE_KEY, data.projects);
    }
    if (data.categories) {
      storageService.setItem(PROJECT_CATEGORIES_KEY, data.categories);
    }
    if (data.technologies) {
      storageService.setItem(TECHNOLOGIES_KEY, data.technologies);
    }
    if (data.clients) {
      storageService.setItem(CLIENTS_KEY, data.clients);
    }
  }
}

// Export singleton instance
export const projectService = ProjectService.getInstance();