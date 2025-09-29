// Enhanced BlogPost interface with UUID, SEO metadata, and analytics
import { Author, Category, Tag, Image, SEOMetadata, Status } from './common';

export interface BlogPost {
  id: string;                    // UUID instead of number
  title: string;
  slug: string;                  // Auto-generated from title
  excerpt: string;
  content: string;               // Rich text content
  author: Author;                // Author object instead of string
  publishedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  readTime: number;              // Calculated read time in minutes
  category: Category;
  tags: Tag[];
  featuredImage: Image;
  images?: Image[];              // Additional images in content
  featured: boolean;
  status: Status;
  seo: SEOMetadata;
  analytics: BlogAnalytics;
  settings: BlogPostSettings;
}

export interface BlogAnalytics {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  readingTime: {
    average: number;
    completion: number; // Percentage of users who read to the end
  };
}

export interface BlogPostSettings {
  allowComments: boolean;
  showAuthor: boolean;
  showReadTime: boolean;
  showSocialShare: boolean;
  newsletter: boolean;
}

// Form types for creating/editing blog posts
export interface CreateBlogPostInput {
  title: string;
  excerpt: string;
  content: string;
  authorId: string;
  categoryId: string;
  tagIds: string[];
  featuredImageId?: string;
  featured?: boolean;
  status?: Status;
  seo?: Partial<SEOMetadata>;
  settings?: Partial<BlogPostSettings>;
  publishedAt?: Date;
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {
  id: string;
}

// Blog-specific filter and search types
export interface BlogFilterOptions {
  categories?: string[];
  tags?: string[];
  authors?: string[];
  status?: Status[];
  featured?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface BlogSearchParams {
  query?: string;
  filters?: BlogFilterOptions;
  sortBy?: 'publishedAt' | 'updatedAt' | 'views' | 'likes' | 'title';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Blog statistics and analytics
export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  totalLikes: number;
  averageReadTime: number;
  topCategories: Array<{
    category: Category;
    count: number;
  }>;
  topTags: Array<{
    tag: Tag;
    count: number;
  }>;
  recentActivity: Array<{
    type: 'created' | 'updated' | 'published';
    postId: string;
    postTitle: string;
    timestamp: Date;
  }>;
}

// Blog configuration
export interface BlogConfig {
  postsPerPage: number;
  enableComments: boolean;
  enableNewsletter: boolean;
  enableSocialShare: boolean;
  defaultAuthor: string;
  defaultCategory: string;
  seoDefaults: {
    titleTemplate: string;
    descriptionTemplate: string;
    keywords: string[];
  };
}