'use client';

import { BlogPost } from "@/lib/types/blog";
import { BlogCard } from "./BlogCard";

interface BlogGridProps {
  posts: BlogPost[];
  showFeatured?: boolean;
  className?: string;
}

export function BlogGrid({ posts, showFeatured = true, className = "" }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <svg
              className="w-12 h-12 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse all articles.
          </p>
        </div>
      </div>
    );
  }

  // Separate featured and regular posts
  const featuredPosts = showFeatured ? posts.filter(post => post.featured) : [];
  const regularPosts = showFeatured ? posts.filter(post => !post.featured) : posts;

  return (
    <div className={`space-y-12 ${className}`}>
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Featured Articles</h2>
            <p className="text-muted-foreground">
              Our most popular and impactful content
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                variant="featured"
              />
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts Section */}
      {regularPosts.length > 0 && (
        <section>
          {featuredPosts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Latest Articles</h2>
              <p className="text-muted-foreground">
                Stay updated with our newest insights and tutorials
              </p>
            </div>
          )}
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                variant="default"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}