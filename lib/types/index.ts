// Central export for all type definitions
export * from './blog';
export * from './project';
export * from './common';
export * from './validation';
export * from './content';

// Admin types with explicit exports to avoid conflicts
export type {
  AdminState,
  AdminTab,
  AdminUser,
  AdminRole,
  AdminPermission,
  ContentForm,
  AutoSaveState,
  BlogManagementState,
  ProjectManagementState,
  SortingOptions,
  PaginationState,
  BulkActionState,
  BulkAction,
  MediaItem,
  MediaUploadState,
  DashboardStats,
  ActivityItem,
  PopularContentItem,
  SystemHealthMetrics,
  SystemError,
  AdminSettings,
  SiteSettings,
  BlogSettings as AdminBlogSettings,
  ProjectSettings as AdminProjectSettings,
  MediaSettings,
  SEOSettings,
  SecuritySettings
} from './admin';