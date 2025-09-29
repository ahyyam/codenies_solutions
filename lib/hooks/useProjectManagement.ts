// Project management hook for admin interface
import { useState, useCallback, useMemo } from 'react';
import { Project, CreateProjectInput, UpdateProjectInput } from '../types/project';
import { ProjectManagementState } from '../types/admin';
import { useLocalStorage } from './useLocalStorage';
import { useSearch } from './useSearch';
import { usePagination } from './usePagination';
import { ContentValidator } from '../utils/validation';
import { AppErrorHandler } from '../utils/error-handling';

const STORAGE_KEY = 'projects';

export function useProjectManagement() {
  const [projects, setProjects] = useLocalStorage<Project[]>(STORAGE_KEY, []);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search and filter functionality
  const {
    query,
    filters,
    results: filteredProjects,
    updateQuery,
    updateFilter,
    clearFilters,
    reset: resetSearch
  } = useSearch({
    items: projects,
    searchFields: ['title', 'description'],
    filterFunctions: {
      status: (project, value) => Array.isArray(value) ? value.includes(project.status) : project.status === value,
      category: (project, value) => Array.isArray(value) ? value.includes(project.category.id) : project.category.id === value,
      featured: (project, value) => project.featured === value,
      client: (project, value) => Array.isArray(value) ? value.includes(project.client.id) : project.client.id === value,
      'client.name': (project, value) => project.client.name.toLowerCase().includes(value.toLowerCase()),
      'longDescription': (project, value) => project.longDescription?.toLowerCase().includes(value.toLowerCase()) || false,
      technologies: (project, value) => {
        if (Array.isArray(value)) {
          return value.some((tech: string) => project.technologies.some((projectTech: any) => projectTech.id === tech));
        }
        return project.technologies.some((tech: any) => tech.id === value);
      }
    }
  });

  // Pagination
  const pagination = usePagination({
    totalItems: filteredProjects.length,
    initialLimit: 12
  });

  // Get paginated projects
  const paginatedProjects = useMemo(() => {
    return pagination.paginateArray(filteredProjects);
  }, [filteredProjects, pagination]);

  // Generate unique ID
  const generateId = useCallback(() => {
    return crypto.randomUUID();
  }, []);

  // Generate slug from title
  const generateSlug = useCallback((title: string, existingProjects: Project[] = projects) => {
    let baseSlug = ContentValidator.generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (existingProjects.some(project => project.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }, [projects]);

  // Create project
  const createProject = useCallback(async (input: CreateProjectInput): Promise<Project> => {
    setLoading(true);
    setError(null);

    try {
      // Validate input
      const validation = ContentValidator.validateProject(input);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
      }

      const now = new Date();
      const newProject: Project = {
        id: generateId(),
        title: input.title,
        slug: generateSlug(input.title),
        category: {
          id: input.categoryId,
          name: 'General', // This would come from category data
          slug: input.categoryId
        },
        description: input.description,
        longDescription: input.longDescription,
        images: input.imageIds.map(id => ({
          id,
          url: '', // This would be resolved from image data
          alt: input.title
        })),
        technologies: input.technologyIds.map((id: string) => ({
          id,
          name: id, // This would come from technology data
          category: 'other' as const
        })),
        features: input.features || [],
        challenges: [], // Would be added later through updates
        results: [], // Would be added later through updates
        client: {
          id: input.clientId,
          name: 'Client', // This would come from client data
          industry: 'Technology'
        },
        timeline: {
          ...input.timeline,
          phases: [] // Would be added later through updates
        },
        team: input.teamMemberIds.map((id: string) => ({
          id,
          name: 'Team Member', // This would come from team data
          role: 'Developer'
        })),
        status: input.status || 'active',
        featured: input.featured || false,
        links: input.links || {},
        seo: {
          title: input.seo?.title || input.title,
          description: input.seo?.description || input.description,
          keywords: input.seo?.keywords || [],
          ogImage: input.seo?.ogImage
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

      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      const error = AppErrorHandler.createError(
        'CREATE_PROJECT_ERROR',
        `Failed to create project: ${err instanceof Error ? err.message : 'Unknown error'}`,
        { input, error: err }
      );
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [generateId, generateSlug, setProjects]);

  // Update project
  const updateProject = useCallback(async (input: UpdateProjectInput): Promise<Project> => {
    setLoading(true);
    setError(null);

    try {
      const existingProject = projects.find(project => project.id === input.id);
      if (!existingProject) {
        throw new Error('Project not found');
      }

      // Validate input
      const validation = ContentValidator.validateProject(input);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
      }

      const updatedProject: Project = {
        ...existingProject,
        ...input,
        updatedAt: new Date(),
        slug: input.title && input.title !== existingProject.title 
          ? generateSlug(input.title, projects.filter(p => p.id !== input.id))
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

      setProjects(prev => prev.map(project => project.id === input.id ? updatedProject : project));
      return updatedProject;
    } catch (err) {
      const error = AppErrorHandler.createError(
        'UPDATE_PROJECT_ERROR',
        `Failed to update project: ${err instanceof Error ? err.message : 'Unknown error'}`,
        { input, error: err }
      );
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [projects, generateSlug, setProjects]);

  // Delete project
  const deleteProject = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const projectExists = projects.some(project => project.id === id);
      if (!projectExists) {
        throw new Error('Project not found');
      }

      setProjects(prev => prev.filter(project => project.id !== id));
      setSelectedProjects(prev => prev.filter(projectId => projectId !== id));
    } catch (err) {
      const error = AppErrorHandler.createError(
        'DELETE_PROJECT_ERROR',
        `Failed to delete project: ${err instanceof Error ? err.message : 'Unknown error'}`,
        { id, error: err }
      );
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [projects, setProjects]);

  // Bulk delete projects
  const bulkDeleteProjects = useCallback(async (ids: string[]): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      setProjects(prev => prev.filter(project => !ids.includes(project.id)));
      setSelectedProjects([]);
    } catch (err) {
      const error = AppErrorHandler.createError(
        'BULK_DELETE_ERROR',
        `Failed to delete projects: ${err instanceof Error ? err.message : 'Unknown error'}`,
        { ids, error: err }
      );
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setProjects]);

  // Toggle project selection
  const toggleProjectSelection = useCallback((id: string) => {
    setSelectedProjects(prev => 
      prev.includes(id) 
        ? prev.filter(projectId => projectId !== id)
        : [...prev, id]
    );
  }, []);

  // Select all projects
  const selectAllProjects = useCallback(() => {
    setSelectedProjects(paginatedProjects.map(project => project.id));
  }, [paginatedProjects]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedProjects([]);
  }, []);

  // Get project by ID
  const getProjectById = useCallback((id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  }, [projects]);

  // Get project by slug
  const getProjectBySlug = useCallback((slug: string): Project | undefined => {
    return projects.find(project => project.slug === slug);
  }, [projects]);

  // Get projects statistics
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(project => project.status === 'active').length;
    const completedProjects = projects.filter(project => project.status === 'completed').length;
    const featuredProjects = projects.filter(project => project.featured).length;

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
          .find((tech: any) => tech.id === techId)!,
        count
      }));

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      featuredProjects,
      topTechnologies
    };
  }, [projects]);

  return {
    // Data
    projects: paginatedProjects,
    allProjects: projects,
    filteredProjects,
    selectedProjects,
    stats,

    // State
    loading,
    error,
    query,
    filters,

    // Pagination
    pagination,

    // Actions
    createProject,
    updateProject,
    deleteProject,
    bulkDeleteProjects,

    // Selection
    toggleProjectSelection,
    selectAllProjects,
    clearSelection,

    // Search and filter
    updateQuery,
    updateFilter,
    clearFilters,
    resetSearch,

    // Utilities
    getProjectById,
    getProjectBySlug,
    generateSlug,

    // Helpers
    clearError: () => setError(null)
  };
}