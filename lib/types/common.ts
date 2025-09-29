// Common types used across the application

export interface Image {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  social?: SocialLinks;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface SEOMetadata {
  title?: string;
  description?: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  count?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'ai' | 'language' | 'styling' | 'payment' | 'cache' | 'security' | 'cloud' | 'other';
  icon?: string;
  color?: string;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  logo?: string;
  website?: string;
  testimonial?: {
    content: string;
    author: string;
    position: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

// Utility types
export type Status = 'draft' | 'published' | 'archived';
export type ProjectStatus = 'active' | 'completed' | 'maintenance';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter types
export interface FilterOptions {
  categories?: string[];
  tags?: string[];
  technologies?: string[];
  status?: Status | ProjectStatus;
  featured?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Search types
export interface SearchParams {
  query: string;
  filters?: FilterOptions;
  pagination?: PaginationParams;
}