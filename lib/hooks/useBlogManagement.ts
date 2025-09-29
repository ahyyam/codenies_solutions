// Blog management hook for admin interface
import { useState, useCallback, useMemo } from 'react';
import { BlogPost, CreateBlogPostInput, UpdateBlogPostInput } from '../types/blog';
import { BlogManagementState } from '../types/admin';
import { useLocalStorage } from './useLocalStorage';
import { useSearch } from './useSearch';
import { usePagination } from './usePagination';
import { ContentValidator } from '../utils/validation';
import { AppErrorHandler } from '../utils/error-handling';

const STORAGE_KEY = 'blog_posts';

export function useBlogManagement() {
  const [posts, setPosts] = useLocalStorage<BlogPost[]>(STORAGE_KEY, []);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search and filter functionality
  const {
    query,
    filters,
    results: filteredPosts,
    updateQuery,
    updateFilter,
    clearFilters,
    reset: resetSearch
  } = useSearch({
    items: posts,
    searchFields: ['title', 'excerpt', 'content'],
    filterFunctions: {
      status: (post, value) => Array.isArray(value) ? value.includes(post.status) : post.status === value,
      category: (post, value) => Array.isArray(value) ? value.includes(post.category.id) : post.category.id === value,
      featured: (post, value) => post.featured === value,
      author: (post, value) => Array.isArray(value) ? value.includes(post.author.id) : post.author.id === value,
      'author.name': (post, value) => post.author.name.toLowerCase().includes(value.toLowerCase())
    }
  });

  // Pagination
  const pagination = usePagination({
    totalItems: filteredPosts.length,
    initialLimit: 10
  });

  // Get paginated posts
  const paginatedPosts = useMemo(() => {
    return pagination.paginateArray(filteredPosts);
  }, [filteredPosts, pagination]);

  // Generate unique ID
  const generateId = useCallback(() => {
    return crypto.randomUUID();
  }, []);

  // Generate slug from title
  const generateSlug = useCallback((title: string, existingPosts: BlogPost[] = posts) => {
    let baseSlug = ContentValidator.generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (existingPosts.some(post => post.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }, [posts]);

  // Create blog post
  const createPost = useCallback(async (input: CreateBlogPostInput): Promise<BlogPost> => {
    setLoading(true);
    setError(null);

    try {
      // Validate input
      const validation = ContentValidator.validateBlogPost(input);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
      }

      const now = new Date();
      const newPost: BlogPost = {
        id: generateId(),
        title: input.title,
        slug: generateSlug(input.title),
        excerpt: input.excerpt,
        content: input.content,
        author: {
          id: input.authorId,
          name: 'Admin', // This would come from user data in a real app
        },
        publishedAt: input.publishedAt || now,
        updatedAt: now,
        createdAt: now,
        readTime: ContentValidator.calculateReadTime(input.content),
        category: {
          id: input.categoryId,
          name: 'General', // This would come from category data
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
          ogImage: input.seo?.ogImage
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

      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      const error = AppErrorHandler.createError(
        'CREATE_POST_ERROR',
        `Failed to create blog post: ${err instanceof Error ? err.message : 'Unknown error'}`,
        { input, error: err }
      );
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [generateId, generateSlug, setPosts]);

  // Update blog post
  const updatePost = useCallback(async (input: UpdateBlogPostInput): Promise<BlogPost> => {
    setLoading(true);
    setError(null);

    try {
      const existingPost = posts.find(post => post.id === input.id);
      if (!existingPost) {
        throw new Error('Post not found');
      }

      // Validate input
      const validation = ContentValidator.validateBlogPost(input);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
      }

      const updatedPost: BlogPost = {
        ...existingPost,
        ...input,
        updatedAt: new Date(),
        slug: input.title && input.title !== existingPost.title 
          ? generateSlug(input.title, posts.filter(p => p.id !== input.id))
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

      setPosts(prev => prev.map(post => post.id === input.id ? updatedPost : post));
      return updatedPost;
    } catch (err) {
      const error = AppErrorHandler.createError(
        'UPDATE_POST_ERROR',
        `Failed to update blog post: ${err instanceof Error ? err.message : 'Unknown error'}`,
        { input, error: err }
      );
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [posts, generateSlug, setPosts]);

  // Delete blog post
  const deletePost = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const postExists = posts.some(post => post.id === id);
      if (!postExists) {
        throw new Error('Post not found');
      }

      setPosts(prev => prev.filter(post => post.id !== id));
      setSelectedPosts(prev => prev.filter(postId => postId !== id));
    } catch (err) {
      const error = AppErrorHandler.createError(
        'DELETE_POST_ERROR',
        `Failed to delete blog post: ${err instanceof Error ? err.message : 'Unknown error'}`,
        { id, error: err }
      );
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [posts, setPosts]);

  // Bulk delete posts
  const bulkDeletePosts = useCallback(async (ids: string[]): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      setPosts(prev => prev.filter(post => !ids.includes(post.id)));
      setSelectedPosts([]);
    } catch (err) {
      const error = AppErrorHandler.createError(
        'BULK_DELETE_ERROR',
        `Failed to delete blog posts: ${err instanceof Error ? err.message : 'Unknown error'}`,
        { ids, error: err }
      );
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setPosts]);

  // Toggle post selection
  const togglePostSelection = useCallback((id: string) => {
    setSelectedPosts(prev => 
      prev.includes(id) 
        ? prev.filter(postId => postId !== id)
        : [...prev, id]
    );
  }, []);

  // Select all posts
  const selectAllPosts = useCallback(() => {
    setSelectedPosts(paginatedPosts.map(post => post.id));
  }, [paginatedPosts]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedPosts([]);
  }, []);

  // Get post by ID
  const getPostById = useCallback((id: string): BlogPost | undefined => {
    return posts.find(post => post.id === id);
  }, [posts]);

  // Get post by slug
  const getPostBySlug = useCallback((slug: string): BlogPost | undefined => {
    return posts.find(post => post.slug === slug);
  }, [posts]);

  // Get posts statistics
  const stats = useMemo(() => {
    const totalPosts = posts.length;
    const publishedPosts = posts.filter(post => post.status === 'published').length;
    const draftPosts = posts.filter(post => post.status === 'draft').length;
    const featuredPosts = posts.filter(post => post.featured).length;

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      featuredPosts,
      totalViews: posts.reduce((sum, post) => sum + post.analytics.views, 0),
      totalLikes: posts.reduce((sum, post) => sum + post.analytics.likes, 0)
    };
  }, [posts]);

  return {
    // Data
    posts: paginatedPosts,
    allPosts: posts,
    filteredPosts,
    selectedPosts,
    stats,

    // State
    loading,
    error,
    query,
    filters,

    // Pagination
    pagination,

    // Actions
    createPost,
    updatePost,
    deletePost,
    bulkDeletePosts,

    // Selection
    togglePostSelection,
    selectAllPosts,
    clearSelection,

    // Search and filter
    updateQuery,
    updateFilter,
    clearFilters,
    resetSearch,

    // Utilities
    getPostById,
    getPostBySlug,
    generateSlug,

    // Helpers
    clearError: () => setError(null)
  };
}