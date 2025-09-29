// Enhanced Project interface with detailed case study fields
import { Client, Technology, TeamMember, Image, SEOMetadata, ProjectStatus } from './common';

export interface Project {
  id: string;                    // UUID instead of number
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  longDescription?: string;      // Detailed case study
  images: Image[];               // Multiple images
  technologies: Technology[];
  features: string[];            // Key features implemented
  challenges: ProjectChallenge[]; // Challenges overcome
  results: ProjectResult[];
  client: Client;
  timeline: ProjectTimeline;
  team: TeamMember[];
  status: ProjectStatus;
  featured: boolean;
  links: ProjectLinks;
  seo: SEOMetadata;
  settings: ProjectSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface ProjectChallenge {
  id: string;
  title: string;
  description: string;
  solution: string;
  impact?: string;
}

export interface ProjectResult {
  id: string;
  metric: string;
  value: string;
  description: string;
  type: 'performance' | 'business' | 'technical' | 'user_experience';
  icon?: string;
}

export interface ProjectTimeline {
  startDate: Date;
  endDate?: Date;
  duration: string;
  phases: ProjectPhase[];
}

export interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  deliverables: string[];
  status: 'completed' | 'in_progress' | 'planned';
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  caseStudy?: string;
  demo?: string;
  documentation?: string;
}

export interface ProjectSettings {
  showClient: boolean;
  showTeam: boolean;
  showTimeline: boolean;
  showResults: boolean;
  allowInquiries: boolean;
}

// Form types for creating/editing projects
export interface CreateProjectInput {
  title: string;
  categoryId: string;
  description: string;
  longDescription?: string;
  imageIds: string[];
  technologyIds: string[];
  features: string[];
  clientId: string;
  timeline: Omit<ProjectTimeline, 'phases'>;
  teamMemberIds: string[];
  status?: ProjectStatus;
  featured?: boolean;
  links?: Partial<ProjectLinks>;
  seo?: Partial<SEOMetadata>;
  settings?: Partial<ProjectSettings>;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string;
}

// Project-specific filter and search types
export interface ProjectFilterOptions {
  categories?: string[];
  technologies?: string[];
  clients?: string[];
  status?: ProjectStatus[];
  featured?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  teamMembers?: string[];
}

export interface ProjectSearchParams {
  query?: string;
  filters?: ProjectFilterOptions;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'timeline.startDate';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Project statistics and analytics
export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  topCategories: Array<{
    category: ProjectCategory;
    count: number;
  }>;
  topTechnologies: Array<{
    technology: Technology;
    count: number;
  }>;
  topClients: Array<{
    client: Client;
    projectCount: number;
  }>;
  recentActivity: Array<{
    type: 'created' | 'updated' | 'completed';
    projectId: string;
    projectTitle: string;
    timestamp: Date;
  }>;
}

// Project configuration
export interface ProjectConfig {
  projectsPerPage: number;
  enableInquiries: boolean;
  defaultCategory: string;
  seoDefaults: {
    titleTemplate: string;
    descriptionTemplate: string;
    keywords: string[];
  };
}