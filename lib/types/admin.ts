// Admin interface types and state management

import { BlogPost, CreateBlogPostInput, UpdateBlogPostInput } from './blog';
import { Project, CreateProjectInput, UpdateProjectInput } from './project';
import { ValidationResult, FormSubmissionState } from './validation';

export interface AdminState {
  isAuthenticated: boolean;
  activeTab: AdminTab;
  loading: boolean;
  error: string | null;
  user?: AdminUser;
}

export type AdminTab = 'dashboard' | 'blog' | 'projects' | 'media' | 'settings';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: AdminRole;
  permissions: AdminPermission[];
}

export enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  AUTHOR = 'author'
}

export enum AdminPermission {
  MANAGE_BLOG = 'manage_blog',
  MANAGE_PROJECTS = 'manage_projects',
  MANAGE_MEDIA = 'manage_media',
  MANAGE_USERS = 'manage_users',
  MANAGE_SETTINGS = 'manage_settings',
  PUBLISH_CONTENT = 'publish_content',
  DELETE_CONTENT = 'delete_content'
}

// Content form states
export interface ContentForm<T> {
  data: T;
  validation: ValidationResult;
  isDirty: boolean;
  isSubmitting: boolean;
  submissionState: FormSubmissionState;
  autoSave: AutoSaveState;
}

export interface AutoSaveState {
  enabled: boolean;
  lastSaved?: Date;
  isSaving: boolean;
  interval: number; // milliseconds
}

// Blog management types
export interface BlogManagementState {
  posts: BlogPost[];
  selectedPosts: string[];
  filters: BlogFilters;
  sorting: SortingOptions;
  pagination: PaginationState;
  bulkActions: BulkActionState;
}

export interface BlogFilters {
  status?: string[];
  categories?: string[];
  authors?: string[];
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
}

// Project management types
export interface ProjectManagementState {
  projects: Project[];
  selectedProjects: string[];
  filters: ProjectFilters;
  sorting: SortingOptions;
  pagination: PaginationState;
  bulkActions: BulkActionState;
}

export interface ProjectFilters {
  status?: string[];
  categories?: string[];
  technologies?: string[];
  clients?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
}

// Common admin types
export interface SortingOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface BulkActionState {
  selectedItems: string[];
  availableActions: BulkAction[];
  isExecuting: boolean;
  lastAction?: {
    type: string;
    itemCount: number;
    timestamp: Date;
  };
}

export interface BulkAction {
  id: string;
  label: string;
  icon?: string;
  confirmationRequired: boolean;
  confirmationMessage?: string;
  destructive?: boolean;
}

// Media management types
export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  caption?: string;
  uploadedAt: Date;
  uploadedBy: string;
  usageCount: number;
  tags: string[];
}

export interface MediaUploadState {
  files: File[];
  uploading: boolean;
  progress: number;
  completed: MediaItem[];
  errors: string[];
}

// Dashboard analytics types
export interface DashboardStats {
  overview: {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
  };
  recentActivity: ActivityItem[];
  popularContent: PopularContentItem[];
  systemHealth: SystemHealthMetrics;
}

export interface ActivityItem {
  id: string;
  type: 'blog_created' | 'blog_updated' | 'blog_published' | 'project_created' | 'project_updated' | 'project_completed';
  title: string;
  description: string;
  timestamp: Date;
  user: string;
  metadata?: any;
}

export interface PopularContentItem {
  id: string;
  title: string;
  type: 'blog' | 'project';
  views: number;
  engagement: number;
  url: string;
}

export interface SystemHealthMetrics {
  status: 'healthy' | 'warning' | 'error';
  uptime: number;
  lastBackup?: Date;
  storageUsed: number;
  storageLimit: number;
  errors: SystemError[];
}

export interface SystemError {
  id: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

// Settings types
export interface AdminSettings {
  site: SiteSettings;
  blog: BlogSettings;
  projects: ProjectSettings;
  media: MediaSettings;
  seo: SEOSettings;
  security: SecuritySettings;
}

export interface SiteSettings {
  title: string;
  description: string;
  url: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface BlogSettings {
  postsPerPage: number;
  enableComments: boolean;
  enableNewsletter: boolean;
  defaultAuthor: string;
  defaultCategory: string;
  autoSaveInterval: number;
}

export interface ProjectSettings {
  projectsPerPage: number;
  enableInquiries: boolean;
  defaultCategory: string;
  showClientLogos: boolean;
}

export interface MediaSettings {
  maxFileSize: number;
  allowedTypes: string[];
  imageQuality: number;
  generateThumbnails: boolean;
  thumbnailSizes: number[];
}

export interface SEOSettings {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  ogImage?: string;
  twitterHandle?: string;
}

export interface SecuritySettings {
  sessionTimeout: number;
  maxLoginAttempts: number;
  requireStrongPasswords: boolean;
  enableTwoFactor: boolean;
}