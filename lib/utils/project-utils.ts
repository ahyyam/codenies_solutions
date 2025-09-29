// Utility functions for project data processing
import { Project, ProjectCategory } from '@/lib/types/project';
import { Technology, ProjectStatus } from '@/lib/types/common';

/**
 * Extract unique categories from projects
 */
export function extractCategoriesFromProjects(projects: Project[]): ProjectCategory[] {
  const categoryMap = new Map<string, ProjectCategory>();
  
  projects.forEach(project => {
    if (!categoryMap.has(project.category.id)) {
      categoryMap.set(project.category.id, project.category);
    }
  });
  
  return Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Extract unique technologies from projects
 */
export function extractTechnologiesFromProjects(projects: Project[]): Technology[] {
  const technologyMap = new Map<string, Technology>();
  
  projects.forEach(project => {
    project.technologies.forEach(tech => {
      if (!technologyMap.has(tech.id)) {
        technologyMap.set(tech.id, tech);
      }
    });
  });
  
  return Array.from(technologyMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Filter projects based on search criteria
 */
export interface ProjectFilterCriteria {
  searchQuery?: string;
  categories?: string[];
  technologies?: string[];
  status?: ProjectStatus[];
  featured?: boolean;
}

export function filterProjects(projects: Project[], criteria: ProjectFilterCriteria): Project[] {
  return projects.filter(project => {
    // Search query filter
    if (criteria.searchQuery) {
      const query = criteria.searchQuery.toLowerCase();
      const searchableText = [
        project.title,
        project.description,
        project.longDescription || '',
        project.client.name,
        ...project.technologies.map(t => t.name),
        ...project.features,
        project.category.name
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) {
        return false;
      }
    }
    
    // Category filter
    if (criteria.categories && criteria.categories.length > 0) {
      if (!criteria.categories.includes(project.category.id)) {
        return false;
      }
    }
    
    // Technology filter
    if (criteria.technologies && criteria.technologies.length > 0) {
      const projectTechIds = project.technologies.map(t => t.id);
      const hasMatchingTech = criteria.technologies.some(techId => 
        projectTechIds.includes(techId)
      );
      if (!hasMatchingTech) {
        return false;
      }
    }
    
    // Status filter
    if (criteria.status && criteria.status.length > 0) {
      if (!criteria.status.includes(project.status)) {
        return false;
      }
    }
    
    // Featured filter
    if (criteria.featured !== undefined) {
      if (project.featured !== criteria.featured) {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * Sort projects based on different criteria
 */
export type ProjectSortOption = 'newest' | 'oldest' | 'title' | 'status' | 'featured';

export function sortProjects(projects: Project[], sortBy: ProjectSortOption): Project[] {
  const sorted = [...projects];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    case 'oldest':
      return sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    
    case 'status':
      const statusOrder = { completed: 0, active: 1, maintenance: 2 };
      return sorted.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    
    default:
      return sorted;
  }
}

/**
 * Get project statistics
 */
export interface ProjectStats {
  total: number;
  active: number;
  completed: number;
  maintenance: number;
  featured: number;
  topCategories: Array<{ category: ProjectCategory; count: number }>;
  topTechnologies: Array<{ technology: Technology; count: number }>;
}

export function getProjectStats(projects: Project[]): ProjectStats {
  const categoryCount = new Map<string, number>();
  const technologyCount = new Map<string, number>();
  
  let active = 0;
  let completed = 0;
  let maintenance = 0;
  let featured = 0;
  
  projects.forEach(project => {
    // Count by status
    switch (project.status) {
      case 'active':
        active++;
        break;
      case 'completed':
        completed++;
        break;
      case 'maintenance':
        maintenance++;
        break;
    }
    
    // Count featured
    if (project.featured) {
      featured++;
    }
    
    // Count categories
    const categoryId = project.category.id;
    categoryCount.set(categoryId, (categoryCount.get(categoryId) || 0) + 1);
    
    // Count technologies
    project.technologies.forEach(tech => {
      technologyCount.set(tech.id, (technologyCount.get(tech.id) || 0) + 1);
    });
  });
  
  // Get top categories
  const categories = extractCategoriesFromProjects(projects);
  const topCategories = Array.from(categoryCount.entries())
    .map(([categoryId, count]) => ({
      category: categories.find(c => c.id === categoryId)!,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // Get top technologies
  const technologies = extractTechnologiesFromProjects(projects);
  const topTechnologies = Array.from(technologyCount.entries())
    .map(([techId, count]) => ({
      technology: technologies.find(t => t.id === techId)!,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  return {
    total: projects.length,
    active,
    completed,
    maintenance,
    featured,
    topCategories,
    topTechnologies
  };
}

/**
 * Generate project slug from title
 */
export function generateProjectSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Validate project data
 */
export function validateProject(project: Partial<Project>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!project.title || project.title.trim().length === 0) {
    errors.push('Title is required');
  }
  
  if (!project.description || project.description.trim().length === 0) {
    errors.push('Description is required');
  }
  
  if (!project.category) {
    errors.push('Category is required');
  }
  
  if (!project.client) {
    errors.push('Client information is required');
  }
  
  if (!project.timeline) {
    errors.push('Timeline information is required');
  }
  
  if (!project.technologies || project.technologies.length === 0) {
    errors.push('At least one technology is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}