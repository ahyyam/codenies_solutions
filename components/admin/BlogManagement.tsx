'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBlogManagement } from '@/lib/hooks/useBlogManagement';
import { useAdminLayout } from './AdminLayout';
import { BlogPostForm } from './BlogPostForm';
import { BlogPost } from '@/lib/types/blog';

interface BlogManagementProps {
  onAddPost?: (post: Partial<BlogPost>) => void;
  onRemovePost?: (id: string) => void;
}

export function BlogManagement({ onAddPost, onRemovePost }: BlogManagementProps) {
  const { setIsLoading } = useAdminLayout();
  const {
    posts,
    loading: blogLoading,
    error,
    createPost,
    deletePost,
    clearError
  } = useBlogManagement();

  const [showForm, setShowForm] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsLoading(blogLoading);
  }, [blogLoading, setIsLoading]);

  const handleAddPost = async (postData: Partial<BlogPost>) => {
    try {
      // Convert partial blog post to CreateBlogPostInput format
      const createInput = {
        title: postData.title || '',
        excerpt: postData.excerpt || '',
        content: postData.content || '',
        authorId: postData.author?.id || 'admin',
        categoryId: postData.category?.id || 'general',
        tagIds: postData.tags?.map(tag => tag.id) || [],
        featuredImageId: postData.featuredImage?.id,
        featured: postData.featured || false,
        status: postData.status || 'draft',
        publishedAt: postData.publishedAt,
        seo: postData.seo,
        settings: {
          allowComments: true,
          showAuthor: true,
          showReadTime: true,
          showSocialShare: true,
          newsletter: false
        }
      };
      
      await createPost(createInput);
      onAddPost?.(postData);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add post:', err);
    }
  };

  const handleRemovePost = async (id: string) => {
    if (confirm('Are you sure you want to remove this blog post?')) {
      try {
        await deletePost(id);
        onRemovePost?.(id);
      } catch (err) {
        console.error('Failed to remove post:', err);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPosts.size === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedPosts.size} blog posts?`)) {
      try {
        setIsLoading(true);
        for (const id of selectedPosts) {
          await deletePost(id);
        }
        setSelectedPosts(new Set());
      } catch (err) {
        console.error('Failed to bulk delete posts:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const togglePostSelection = (id: string) => {
    const newSelection = new Set(selectedPosts);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedPosts(newSelection);
  };

  const selectAllPosts = () => {
    if (selectedPosts.size === posts.length) {
      setSelectedPosts(new Set());
    } else {
      setSelectedPosts(new Set(posts.map(p => p.id)));
    }
  };

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-600">
          <p>Error loading blog posts: {error}</p>
          <Button onClick={clearError} className="mt-2">
            Clear Error
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <p className="text-muted-foreground">
            Manage your blog content ({posts.length} posts)
          </p>
        </div>
        <div className="flex gap-2">
          {selectedPosts.size > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete Selected ({selectedPosts.size})
            </Button>
          )}
          <Button onClick={() => setShowForm(true)}>
            Add New Post
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {posts.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPosts.size === posts.length && posts.length > 0}
                onChange={selectAllPosts}
                className="rounded border-border"
              />
              <span className="text-sm">
                Select All ({selectedPosts.size} selected)
              </span>
            </label>
            {selectedPosts.size > 0 && (
              <Badge variant="secondary">
                {selectedPosts.size} posts selected
              </Badge>
            )}
          </div>
        </Card>
      )}

      {/* Blog Posts List */}
      <div className="grid gap-4">
        {posts.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground">
              <svg
                className="w-12 h-12 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <p className="text-lg font-medium mb-2">No blog posts yet</p>
              <p className="mb-4">Create your first blog post to get started</p>
              <Button onClick={() => setShowForm(true)}>
                Create First Post
              </Button>
            </div>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="p-4">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedPosts.has(post.id)}
                  onChange={() => togglePostSelection(post.id)}
                  className="mt-1 rounded border-border"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 truncate">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>By {post.author.name}</span>
                        <span>•</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {post.category.name}
                        </Badge>
                        {post.featured && (
                          <>
                            <span>•</span>
                            <Badge variant="secondary" className="text-xs">
                              Featured
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemovePost(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Post Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen p-4">
            <Card className="w-full max-w-6xl mx-auto">
              <div className="p-6">
                <BlogPostForm
                  onSave={handleAddPost}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}