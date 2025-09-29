// Blog data service with enhanced functionality
import { BlogPost, CreateBlogPostInput, UpdateBlogPostInput } from '../types/blog';
import { storageService } from './storage-service';
import { ContentValidator } from '../utils/validation';
import { AppErrorHandler } from '../utils/error-handling';

const BLOG_STORAGE_KEY = 'blog_posts';
const BLOG_CATEGORIES_KEY = 'blog_categories';
const BLOG_TAGS_KEY = 'blog_tags';

export class BlogService {
  private static instance: BlogService;

  private constructor() {}

  static getInstance(): BlogService {
    if (!BlogService.instance) {
      BlogService.instance = new BlogService();
    }
    return BlogService.instance;
  }

  // Get all blog posts
  getAllPosts(): BlogPost[] {
    return storageService.getItem<BlogPost[]>(BLOG_STORAGE_KEY, []) || [];
  }

  // Get post by ID
  getPostById(id: string): BlogPost | null {
    const posts = this.getAllPosts();
    return posts.find(post => post.id === id) || null;
  }

  // Get post by slug
  getPostBySlug(slug: string): BlogPost | null {
    const posts = this.getAllPosts();
    return posts.find(post => post.slug === slug) || null;
  }

  // Create new post
  async createPost(input: CreateBlogPostInput): Promise<BlogPost> {
    try {
      // Validate input
      const validation = ContentValidator.validateBlogPost(input);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
      }

      const posts = this.getAllPosts();
      const now = new Date();

      // Generate unique ID and slug
      const id = crypto.randomUUID();
      const slug = this.generateUniqueSlug(input.title, posts);

      const newPost: BlogPost = {
        id,
        title: input.title,
        slug,
        excerpt: input.excerpt,
        content: input.content,
        author: {
          id: input.authorId,
          name: 'Admin' // This would come from user service
        },
        publishedAt: input.publishedAt || now,
        updatedAt: now,
        createdAt: now,
        readTime: ContentValidator.calculateReadTime(input.content),
        category: {
          id: input.categoryId,
          name: 'General', // This would come from category service
          slug: input.categoryId
        },
        tags: input.tagIds?.map(id => ({ id, name: id, slug: id })) || [],
        featuredImage: {
          id: input.featuredImageId || '',
          url: '',
          alt: input.title
        },
        featured: input.featured || false,
        status: input.status || 'draft',
        seo: {
          title: input.seo?.title || input.title,
          description: input.seo?.description || input.excerpt,
          keywords: input.seo?.keywords || [],
          ogImage: input.seo?.ogImage,
          canonicalUrl: input.seo?.canonicalUrl
        },
        analytics: {
          views: 0,
          likes: 0,
          shares: 0,
          comments: 0,
          readingTime: {
            average: ContentValidator.calculateReadTime(input.content),
            completion: 0
          }
        },
        settings: {
          allowComments: input.settings?.allowComments ?? true,
          showAuthor: input.settings?.showAuthor ?? true,
          showReadTime: input.settings?.showReadTime ?? true,
          showSocialShare: input.settings?.showSocialShare ?? true,
          newsletter: input.settings?.newsletter ?? false
        }
      };

      const updatedPosts = [newPost, ...posts];
      storageService.setItem(BLOG_STORAGE_KEY, updatedPosts);

      return newPost;
    } catch (error) {
      throw AppErrorHandler.createError(
        'CREATE_POST_ERROR',
        `Failed to create blog post: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { input, error }
      );
    }
  }

  // Update existing post
  async updatePost(input: UpdateBlogPostInput): Promise<BlogPost> {
    try {
      const posts = this.getAllPosts();
      const existingPostIndex = posts.findIndex(post => post.id === input.id);

      if (existingPostIndex === -1) {
        throw new Error('Post not found');
      }

      // Validate input
      const validation = ContentValidator.validateBlogPost(input);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
      }

      const existingPost = posts[existingPostIndex];
      const updatedPost: BlogPost = {
        ...existingPost,
        ...input,
        updatedAt: new Date(),
        slug: input.title && input.title !== existingPost.title 
          ? this.generateUniqueSlug(input.title, posts.filter(p => p.id !== input.id))
          : existingPost.slug,
        readTime: input.content ? ContentValidator.calculateReadTime(input.content) : existingPost.readTime,
        seo: {
          ...existingPost.seo,
          ...input.seo,
          keywords: input.seo?.keywords || existingPost.seo.keywords
        },
        settings: {
          ...existingPost.settings,
          ...input.settings,
          allowComments: input.settings?.allowComments ?? existingPost.settings.allowComments,
          showAuthor: input.settings?.showAuthor ?? existingPost.settings.showAuthor,
          showReadTime: input.settings?.showReadTime ?? existingPost.settings.showReadTime,
          showSocialShare: input.settings?.showSocialShare ?? existingPost.settings.showSocialShare,
          newsletter: input.settings?.newsletter ?? existingPost.settings.newsletter
        }
      };

      posts[existingPostIndex] = updatedPost;
      storageService.setItem(BLOG_STORAGE_KEY, posts);

      return updatedPost;
    } catch (error) {
      throw AppErrorHandler.createError(
        'UPDATE_POST_ERROR',
        `Failed to update blog post: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { input, error }
      );
    }
  }

  // Delete post
  async deletePost(id: string): Promise<void> {
    try {
      const posts = this.getAllPosts();
      const filteredPosts = posts.filter(post => post.id !== id);

      if (filteredPosts.length === posts.length) {
        throw new Error('Post not found');
      }

      storageService.setItem(BLOG_STORAGE_KEY, filteredPosts);
    } catch (error) {
      throw AppErrorHandler.createError(
        'DELETE_POST_ERROR',
        `Failed to delete blog post: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { id, error }
      );
    }
  }

  // Get published posts
  getPublishedPosts(): BlogPost[] {
    return this.getAllPosts().filter(post => post.status === 'published');
  }

  // Get featured posts
  getFeaturedPosts(): BlogPost[] {
    return this.getAllPosts().filter(post => post.featured);
  }

  // Search posts
  searchPosts(query: string): BlogPost[] {
    const posts = this.getAllPosts();
    const lowercaseQuery = query.toLowerCase();

    return posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.name.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Get posts by category
  getPostsByCategory(categoryId: string): BlogPost[] {
    return this.getAllPosts().filter(post => post.category.id === categoryId);
  }

  // Get posts by tag
  getPostsByTag(tagId: string): BlogPost[] {
    return this.getAllPosts().filter(post => 
      post.tags.some(tag => tag.id === tagId)
    );
  }

  // Generate unique slug
  private generateUniqueSlug(title: string, existingPosts: BlogPost[]): string {
    let baseSlug = ContentValidator.generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (existingPosts.some(post => post.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  // Get blog statistics
  getStats() {
    const posts = this.getAllPosts();
    
    return {
      totalPosts: posts.length,
      publishedPosts: posts.filter(p => p.status === 'published').length,
      draftPosts: posts.filter(p => p.status === 'draft').length,
      featuredPosts: posts.filter(p => p.featured).length,
      totalViews: posts.reduce((sum, post) => sum + post.analytics.views, 0),
      totalLikes: posts.reduce((sum, post) => sum + post.analytics.likes, 0)
    };
  }

  // Export blog data
  exportData() {
    return {
      posts: this.getAllPosts(),
      categories: storageService.getItem(BLOG_CATEGORIES_KEY, []),
      tags: storageService.getItem(BLOG_TAGS_KEY, [])
    };
  }

  // Import blog data
  importData(data: { posts?: BlogPost[], categories?: any[], tags?: any[] }) {
    if (data.posts) {
      storageService.setItem(BLOG_STORAGE_KEY, data.posts);
    }
    if (data.categories) {
      storageService.setItem(BLOG_CATEGORIES_KEY, data.categories);
    }
    if (data.tags) {
      storageService.setItem(BLOG_TAGS_KEY, data.tags);
    }
  }
}

// Export singleton instance
export const blogService = BlogService.getInstance();