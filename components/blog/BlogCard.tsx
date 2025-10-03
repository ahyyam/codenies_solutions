'use client';

import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye, Heart, User } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/types/blog";
import { BlogImage } from "@/components/common/OptimizedImage";

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  showStats?: boolean;
}

export function BlogCard({ post, variant = 'default', showStats = true }: BlogCardProps) {
  const cardClasses = {
    default: "group cursor-pointer h-full",
    featured: "group cursor-pointer h-full md:col-span-2 lg:col-span-2",
    compact: "group cursor-pointer h-full"
  };

  const imageClasses = {
    default: "aspect-[16/10]",
    featured: "aspect-[16/9]",
    compact: "aspect-[16/9]"
  };

  const titleClasses = {
    default: "text-xl font-bold mb-3 leading-tight",
    featured: "text-2xl lg:text-3xl font-bold mb-4 leading-tight",
    compact: "text-lg font-semibold mb-2 leading-tight"
  };

  return (
    <article className={cardClasses[variant]}>
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="blog-card h-full flex flex-col">
          {/* Image Container */}
          <div className={`blog-card-image ${imageClasses[variant]} bg-muted relative`}>
            <BlogImage
              src={post.featuredImage?.url || "/placeholder.svg"}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              lazy={variant !== 'featured'}
              priority={variant === 'featured'}
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge 
                className="bg-primary/90 backdrop-blur-sm text-primary-foreground shadow-lg border-0 font-medium"
              >
                {post.category.name}
              </Badge>
            </div>

            {/* Featured Badge */}
            {post.featured && (
              <div className="absolute top-4 right-4">
                <Badge 
                  variant="secondary" 
                  className="bg-yellow-500/90 backdrop-blur-sm text-yellow-900 shadow-lg border-0 font-medium"
                >
                  Featured
                </Badge>
              </div>
            )}
          </div>
          
          {/* Content Container */}
          <div className="blog-card-content flex-1 flex flex-col">
            {/* Meta Information */}
            <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt.toISOString()}>
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }).format(new Date(post.publishedAt))}
                  </time>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            {/* Title */}
            <h3 className={`blog-card-title ${titleClasses[variant]} group-hover:text-accent transition-colors line-clamp-2`}>
              {post.title}
            </h3>
            
            {/* Excerpt */}
            <p className={`blog-card-excerpt mb-6 flex-1 ${
              variant === 'featured' ? 'text-base line-clamp-3' : 
              variant === 'compact' ? 'text-sm line-clamp-2' : 
              'text-sm line-clamp-3'
            }`}>
              {post.excerpt}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, variant === 'featured' ? 4 : 3).map((tag) => (
                <Badge 
                  key={tag.id} 
                  variant="outline" 
                  className="text-xs border-border/60 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {tag.name}
                </Badge>
              ))}
              {post.tags.length > (variant === 'featured' ? 4 : 3) && (
                <Badge 
                  variant="outline" 
                  className="text-xs border-border/60 text-muted-foreground"
                >
                  +{post.tags.length - (variant === 'featured' ? 4 : 3)} more
                </Badge>
              )}
            </div>
            
            {/* Stats */}
            {showStats && (post.analytics.views > 0 || post.analytics.likes > 0) && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/50">
                {post.analytics.views > 0 && (
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.analytics.views.toLocaleString()} views</span>
                  </div>
                )}
                {post.analytics.likes > 0 && (
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    <span>{post.analytics.likes} likes</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}