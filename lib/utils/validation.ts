// Content validation utilities
import { 
  ValidationResult, 
  ValidationError, 
  ValidationRule, 
  ValidationSchema,
  ValidationErrorCode,
  ContentValidationRules,
  AsyncValidationResult
} from '../types/validation';
import { BlogPost, CreateBlogPostInput } from '../types/blog';
import { Project, CreateProjectInput } from '../types/project';

// Default validation rules
export const DEFAULT_VALIDATION_RULES: ContentValidationRules = {
  title: {
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-_.,!?()]+$/
  },
  slug: {
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    reservedSlugs: ['admin', 'api', 'blog', 'work', 'about', 'contact', 'privacy', 'terms']
  },
  excerpt: {
    minLength: 50,
    maxLength: 300
  },
  content: {
    minLength: 100,
    maxLength: 50000,
    allowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre'],
    forbiddenWords: []
  },
  seo: {
    titleMaxLength: 60,
    descriptionMaxLength: 160,
    keywordsMaxCount: 10
  }
};

// Core validation class
export class ContentValidator {
  private static rules = DEFAULT_VALIDATION_RULES;

  static validateBlogPost(post: Partial<CreateBlogPostInput>): ValidationResult {
    const errors: ValidationError[] = [];

    // Title validation
    if (!post.title) {
      errors.push({
        field: 'title',
        message: 'Title is required',
        code: ValidationErrorCode.REQUIRED
      });
    } else {
      if (post.title.length < this.rules.title.minLength) {
        errors.push({
          field: 'title',
          message: `Title must be at least ${this.rules.title.minLength} characters`,
          code: ValidationErrorCode.TOO_SHORT,
          value: post.title.length
        });
      }
      if (post.title.length > this.rules.title.maxLength) {
        errors.push({
          field: 'title',
          message: `Title must not exceed ${this.rules.title.maxLength} characters`,
          code: ValidationErrorCode.TOO_LONG,
          value: post.title.length
        });
      }
      if (this.rules.title.pattern && !this.rules.title.pattern.test(post.title)) {
        errors.push({
          field: 'title',
          message: 'Title contains invalid characters',
          code: ValidationErrorCode.INVALID_FORMAT,
          value: post.title
        });
      }
    }

    // Excerpt validation
    if (!post.excerpt) {
      errors.push({
        field: 'excerpt',
        message: 'Excerpt is required',
        code: ValidationErrorCode.REQUIRED
      });
    } else {
      if (post.excerpt.length < this.rules.excerpt.minLength) {
        errors.push({
          field: 'excerpt',
          message: `Excerpt must be at least ${this.rules.excerpt.minLength} characters`,
          code: ValidationErrorCode.TOO_SHORT,
          value: post.excerpt.length
        });
      }
      if (post.excerpt.length > this.rules.excerpt.maxLength) {
        errors.push({
          field: 'excerpt',
          message: `Excerpt must not exceed ${this.rules.excerpt.maxLength} characters`,
          code: ValidationErrorCode.TOO_LONG,
          value: post.excerpt.length
        });
      }
    }

    // Content validation
    if (!post.content) {
      errors.push({
        field: 'content',
        message: 'Content is required',
        code: ValidationErrorCode.REQUIRED
      });
    } else {
      if (post.content.length < this.rules.content.minLength) {
        errors.push({
          field: 'content',
          message: `Content must be at least ${this.rules.content.minLength} characters`,
          code: ValidationErrorCode.TOO_SHORT,
          value: post.content.length
        });
      }
      if (post.content.length > this.rules.content.maxLength) {
        errors.push({
          field: 'content',
          message: `Content must not exceed ${this.rules.content.maxLength} characters`,
          code: ValidationErrorCode.TOO_LONG,
          value: post.content.length
        });
      }
    }

    // Author validation
    if (!post.authorId) {
      errors.push({
        field: 'authorId',
        message: 'Author is required',
        code: ValidationErrorCode.REQUIRED
      });
    }

    // Category validation
    if (!post.categoryId) {
      errors.push({
        field: 'categoryId',
        message: 'Category is required',
        code: ValidationErrorCode.REQUIRED
      });
    }

    // SEO validation
    if (post.seo) {
      if (post.seo.title && post.seo.title.length > this.rules.seo.titleMaxLength) {
        errors.push({
          field: 'seo.title',
          message: `SEO title must not exceed ${this.rules.seo.titleMaxLength} characters`,
          code: ValidationErrorCode.TOO_LONG,
          value: post.seo.title.length
        });
      }
      if (post.seo.description && post.seo.description.length > this.rules.seo.descriptionMaxLength) {
        errors.push({
          field: 'seo.description',
          message: `SEO description must not exceed ${this.rules.seo.descriptionMaxLength} characters`,
          code: ValidationErrorCode.TOO_LONG,
          value: post.seo.description.length
        });
      }
      if (post.seo.keywords && post.seo.keywords.length > this.rules.seo.keywordsMaxCount) {
        errors.push({
          field: 'seo.keywords',
          message: `SEO keywords must not exceed ${this.rules.seo.keywordsMaxCount} items`,
          code: ValidationErrorCode.TOO_LONG,
          value: post.seo.keywords.length
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateProject(project: Partial<CreateProjectInput>): ValidationResult {
    const errors: ValidationError[] = [];

    // Title validation
    if (!project.title) {
      errors.push({
        field: 'title',
        message: 'Title is required',
        code: ValidationErrorCode.REQUIRED
      });
    } else {
      if (project.title.length < this.rules.title.minLength) {
        errors.push({
          field: 'title',
          message: `Title must be at least ${this.rules.title.minLength} characters`,
          code: ValidationErrorCode.TOO_SHORT,
          value: project.title.length
        });
      }
      if (project.title.length > this.rules.title.maxLength) {
        errors.push({
          field: 'title',
          message: `Title must not exceed ${this.rules.title.maxLength} characters`,
          code: ValidationErrorCode.TOO_LONG,
          value: project.title.length
        });
      }
    }

    // Description validation
    if (!project.description) {
      errors.push({
        field: 'description',
        message: 'Description is required',
        code: ValidationErrorCode.REQUIRED
      });
    } else {
      if (project.description.length < this.rules.excerpt.minLength) {
        errors.push({
          field: 'description',
          message: `Description must be at least ${this.rules.excerpt.minLength} characters`,
          code: ValidationErrorCode.TOO_SHORT,
          value: project.description.length
        });
      }
    }

    // Category validation
    if (!project.categoryId) {
      errors.push({
        field: 'categoryId',
        message: 'Category is required',
        code: ValidationErrorCode.REQUIRED
      });
    }

    // Client validation
    if (!project.clientId) {
      errors.push({
        field: 'clientId',
        message: 'Client is required',
        code: ValidationErrorCode.REQUIRED
      });
    }

    // Timeline validation
    if (!project.timeline) {
      errors.push({
        field: 'timeline',
        message: 'Timeline is required',
        code: ValidationErrorCode.REQUIRED
      });
    } else {
      if (!project.timeline.startDate) {
        errors.push({
          field: 'timeline.startDate',
          message: 'Start date is required',
          code: ValidationErrorCode.REQUIRED
        });
      }
      if (project.timeline.endDate && project.timeline.startDate && 
          new Date(project.timeline.endDate) < new Date(project.timeline.startDate)) {
        errors.push({
          field: 'timeline.endDate',
          message: 'End date must be after start date',
          code: ValidationErrorCode.INVALID_RANGE
        });
      }
    }

    // Technologies validation
    if (!project.technologyIds || project.technologyIds.length === 0) {
      errors.push({
        field: 'technologyIds',
        message: 'At least one technology is required',
        code: ValidationErrorCode.REQUIRED
      });
    }

    // Images validation
    if (!project.imageIds || project.imageIds.length === 0) {
      errors.push({
        field: 'imageIds',
        message: 'At least one image is required',
        code: ValidationErrorCode.REQUIRED
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateSlug(slug: string, existingSlugs: string[] = []): ValidationResult {
    const errors: ValidationError[] = [];

    if (!slug) {
      errors.push({
        field: 'slug',
        message: 'Slug is required',
        code: ValidationErrorCode.REQUIRED
      });
    } else {
      if (!this.rules.slug.pattern.test(slug)) {
        errors.push({
          field: 'slug',
          message: 'Slug must contain only lowercase letters, numbers, and hyphens',
          code: ValidationErrorCode.INVALID_FORMAT,
          value: slug
        });
      }
      if (this.rules.slug.reservedSlugs.includes(slug)) {
        errors.push({
          field: 'slug',
          message: 'This slug is reserved and cannot be used',
          code: ValidationErrorCode.INVALID_SLUG,
          value: slug
        });
      }
      if (existingSlugs.includes(slug)) {
        errors.push({
          field: 'slug',
          message: 'This slug is already in use',
          code: ValidationErrorCode.DUPLICATE_VALUE,
          value: slug
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static async validateSlugAsync(slug: string): Promise<AsyncValidationResult> {
    // Simulate async validation (e.g., checking against database)
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = !this.rules.slug.reservedSlugs.includes(slug);
        resolve({
          isValid,
          error: isValid ? undefined : 'This slug is reserved',
          suggestions: isValid ? undefined : [`${slug}-1`, `${slug}-2`, `my-${slug}`]
        });
      }, 300);
    });
  }

  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  static calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  static sanitizeContent(content: string): string {
    // Basic HTML sanitization (in a real app, use a library like DOMPurify)
    const allowedTags = this.rules.content.allowedTags;
    // This is a simplified version - use a proper sanitization library in production
    return content;
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static validateUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}