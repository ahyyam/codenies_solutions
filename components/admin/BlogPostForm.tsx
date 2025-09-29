'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useForm } from '@/lib/hooks/useForm';
import { useAutoSave } from '@/lib/hooks/useAutoSave';
import { useValidation } from '@/lib/hooks/useValidation';
import { BlogPost } from '@/lib/types/blog';
import { Status } from '@/lib/types/common';
import { generateUUID } from '@/lib/utils/uuid';

interface BlogPostFormProps {
  post?: Partial<BlogPost>;
  onSave: (post: Partial<BlogPost>) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  featuredImage: string;
  featured: boolean;
  status: Status;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export function BlogPostForm({ post, onSave, onCancel, isEditing = false }: BlogPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const initialData: BlogPostFormData = {
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category?.name || '',
    tags: post?.tags?.map(t => t.name).join(', ') || '',
    featuredImage: post?.featuredImage?.url || '',
    featured: post?.featured || false,
    status: post?.status || 'draft',
    seoTitle: post?.seo?.title || '',
    seoDescription: post?.seo?.description || '',
    seoKeywords: post?.seo?.keywords?.join(', ') || '',
  };

  const { values: formData, setFieldValue: updateField, reset: resetForm, isDirty } = useForm({
    initialValues: initialData
  });
  
  const validationRules = [
    { field: 'title', validator: (value: string) => value.length >= 3, message: 'Title must be at least 3 characters' },
    { field: 'excerpt', validator: (value: string) => value.length >= 10, message: 'Excerpt must be at least 10 characters' },
    { field: 'content', validator: (value: string) => value.length >= 50, message: 'Content must be at least 50 characters' },
    { field: 'category', validator: (value: string) => value.length > 0, message: 'Category is required' },
  ];

  const { errors, validateField, validateAll } = useValidation({
    initialValues: formData,
    validationRules: validationRules.reduce((acc, rule) => {
      acc[rule.field] = {
        required: true,
        customValidator: rule.validator
      };
      return acc;
    }, {} as any)
  });

  // Auto-save functionality
  const { lastSaved, saveStatus } = useAutoSave({
    data: formData,
    saveFunction: async (data: BlogPostFormData) => {
      if (isDirty && data.title && data.content) {
        await onSave({
          ...convertFormDataToBlogPost(data),
          status: 'draft'
        });
      }
    },
    interval: 5000, // Auto-save every 5 seconds
    enabled: isDirty
  });

  // Generate slug from title
  useEffect(() => {
    if (formData.title && !isEditing) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      updateField('slug', slug);
    }
  }, [formData.title, isEditing, updateField]);

  // Auto-generate SEO title if not set
  useEffect(() => {
    if (formData.title && !formData.seoTitle) {
      updateField('seoTitle', formData.title);
    }
  }, [formData.title, formData.seoTitle, updateField]);

  // Auto-generate SEO description from excerpt
  useEffect(() => {
    if (formData.excerpt && !formData.seoDescription) {
      updateField('seoDescription', formData.excerpt.substring(0, 160));
    }
  }, [formData.excerpt, formData.seoDescription, updateField]);

  const convertFormDataToBlogPost = (data: BlogPostFormData): Partial<BlogPost> => {
    return {
      id: post?.id || generateUUID(),
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      category: { id: generateUUID(), name: data.category, slug: data.category.toLowerCase().replace(/\s+/g, '-') },
      tags: data.tags.split(',').map(tag => ({ id: generateUUID(), name: tag.trim(), slug: tag.trim().toLowerCase().replace(/\s+/g, '-') })).filter(tag => tag.name),
      featuredImage: data.featuredImage ? { id: generateUUID(), url: data.featuredImage, alt: data.title } : undefined,
      featured: data.featured,
      status: data.status,
      author: post?.author || { id: generateUUID(), name: 'Admin', avatar: '', bio: '' },
      publishedAt: data.status === 'published' ? new Date() : post?.publishedAt,
      updatedAt: new Date(),
      readTime: Math.ceil(data.content.split(' ').length / 200), // Estimate reading time
      seo: {
        title: data.seoTitle || data.title,
        description: data.seoDescription || data.excerpt,
        keywords: data.seoKeywords.split(',').map(k => k.trim()).filter(Boolean),
        ogImage: data.featuredImage,
      },
      analytics: post?.analytics || { 
        views: 0, 
        likes: 0, 
        shares: 0, 
        comments: 0, 
        readingTime: { average: 0, completion: 0 } 
      },
    };
  };

  const handleSubmit = async (status: Status) => {
    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      const blogPostData = convertFormDataToBlogPost({ ...formData, status });
      await onSave(blogPostData);
    } catch (error) {
      console.error('Failed to save blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      // For now, we'll use a placeholder URL
      // In a real implementation, you'd upload to a service like Cloudinary or AWS S3
      const imageUrl = URL.createObjectURL(file);
      updateField('featuredImage', imageUrl);
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setImageUploading(false);
    }
  };

  const calculateReadTime = (content: string) => {
    const words = content.split(' ').length;
    return Math.ceil(words / 200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            {isDirty && (
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Unsaved changes
              </span>
            )}
            {lastSaved && (
              <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
            )}
            <span>Status: {saveStatus}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>

      {previewMode ? (
        /* Preview Mode */
        <Card className="p-6">
          <div className="prose max-w-none">
            <h1>{formData.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span>By Admin</span>
              <span>•</span>
              <span>{calculateReadTime(formData.content)} min read</span>
              <span>•</span>
              <Badge variant="outline">{formData.category}</Badge>
            </div>
            {formData.featuredImage && (
              <img 
                src={formData.featuredImage} 
                alt={formData.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <p className="text-lg text-muted-foreground mb-4">{formData.excerpt}</p>
            <div className="whitespace-pre-wrap">{formData.content}</div>
          </div>
        </Card>
      ) : (
        /* Edit Mode */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    onBlur={() => validateField('title', formData.title)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Enter blog post title..."
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 mt-1">{errors.title[0]}</p>
                  )}
                </div>

                {/* Slug */}
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <input
                    id="slug"
                    type="text"
                    value={formData.slug}
                    onChange={(e) => updateField('slug', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="url-friendly-slug"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => updateField('excerpt', e.target.value)}
                    onBlur={() => validateField('excerpt', formData.excerpt)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    rows={3}
                    placeholder="Brief description of the blog post..."
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-red-600 mt-1">{errors.excerpt[0]}</p>
                  )}
                </div>

                {/* Content */}
                <div>
                  <Label htmlFor="content">Content *</Label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => updateField('content', e.target.value)}
                    onBlur={() => validateField('content', formData.content)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    rows={15}
                    placeholder="Write your blog post content here..."
                  />
                  {errors.content && (
                    <p className="text-sm text-red-600 mt-1">{errors.content[0]}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.content.split(' ').length} words • {calculateReadTime(formData.content)} min read
                  </p>
                </div>
              </div>
            </Card>

            {/* SEO Settings */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <input
                    id="seoTitle"
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => updateField('seoTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="SEO optimized title..."
                  />
                </div>
                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => updateField('seoDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    rows={2}
                    placeholder="SEO meta description..."
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.seoDescription.length}/160 characters
                  </p>
                </div>
                <div>
                  <Label htmlFor="seoKeywords">SEO Keywords</Label>
                  <input
                    id="seoKeywords"
                    type="text"
                    value={formData.seoKeywords}
                    onChange={(e) => updateField('seoKeywords', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Publish</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => updateField('status', e.target.value as Status)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => updateField('featured', e.target.checked)}
                    className="rounded border-border"
                  />
                  <Label htmlFor="featured">Featured post</Label>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Button
                  onClick={() => handleSubmit('draft')}
                  variant="outline"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  Save Draft
                </Button>
                <Button
                  onClick={() => handleSubmit('published')}
                  disabled={isSubmitting || !validateAll()}
                  className="w-full"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish'}
                </Button>
              </div>
            </Card>

            {/* Category & Tags */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Categories & Tags</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <input
                    id="category"
                    type="text"
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    onBlur={() => validateField('category', formData.category)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="e.g., Technology, Design"
                  />
                  {errors.category && (
                    <p className="text-sm text-red-600 mt-1">{errors.category[0]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <input
                    id="tags"
                    type="text"
                    value={formData.tags}
                    onChange={(e) => updateField('tags', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="tag1, tag2, tag3"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Separate tags with commas
                  </p>
                </div>
              </div>
            </Card>

            {/* Featured Image */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Featured Image</h3>
              <div className="space-y-4">
                {formData.featuredImage && (
                  <div className="relative">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => updateField('featuredImage', '')}
                      className="absolute top-2 right-2"
                    >
                      Remove
                    </Button>
                  </div>
                )}
                <div>
                  <Label htmlFor="featuredImage">Image URL</Label>
                  <input
                    id="featuredImage"
                    type="text"
                    value={formData.featuredImage}
                    onChange={(e) => updateField('featuredImage', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="imageUpload">Upload Image</Label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                  {imageUploading && (
                    <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}