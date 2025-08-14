'use client';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User, Clock, Award, Zap, Star, Sparkles, BookOpen, Mail, Filter, Search, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { blogPosts, blogCategories, popularTags, type BlogPost } from "@/lib/blog-data"

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  // Filter posts based on category, search, and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || 
      post.category.toLowerCase().includes(selectedCategory.toLowerCase())
    
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTag = selectedTag === "" || 
      post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
    
    return matchesCategory && matchesSearch && matchesTag
  })

  // Featured posts for hero section
  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gray-900 text-white px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>

      {/* Enhanced Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-20 min-h-screen flex items-center" aria-labelledby="blog-hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30 shadow-lg mb-6">
            <Award className="w-4 h-4" />
            <span className="font-semibold">Insights & Knowledge</span>
            <span className="animate-pulse">📚</span>
          </div>
          
          <h1 id="blog-hero-heading" className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-elegant font-bold text-gray-900 mb-6 leading-tight">
            Our Blog
          </h1>
          
          <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto font-cursive">
            Stay updated with the latest trends, best practices, and insights from the world of software development,
            design, and technology innovation.
          </p>

          {/* Enhanced CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              asChild 
              size="lg" 
              className="btn-hero-primary text-lg px-8 py-4 group hover:scale-105 transition-all duration-300"
            >
              <Link href="/consultation">
                <Zap className="w-5 h-5 mr-2" />
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="btn-secondary text-lg px-6 py-4 group hover:scale-105 transition-all duration-300 border-2 hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="#blog-posts">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Articles
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <span className="group-hover:text-primary transition-colors">Expert Insights</span>
            </div>
            <div className="flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <span className="group-hover:text-primary transition-colors">Latest Trends</span>
            </div>
            <div className="flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="group-hover:text-primary transition-colors">Proven Strategies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Preview */}
      <section className="py-16 px-4 bg-white" aria-labelledby="featured-heading">
        <div className="container mx-auto">
          <h2 id="featured-heading" className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-gray-100">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    width={400} 
                    height={250} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">{post.category}</Badge>
                  </div>
                  {post.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-yellow-500 text-white">Featured</Badge>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Filter & Search Section */}
      <section className="py-8 px-4 border-b border-gray-200 bg-white" aria-label="Blog filtering and search">
        <div className="container mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search articles, authors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            {blogCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    : "border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 bg-transparent"
                }
              >
                {category.name}
                <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">{category.count}</span>
              </Button>
            ))}
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {popularTags.slice(0, 10).map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                className={
                  selectedTag === tag
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 bg-transparent"
                }
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4" aria-labelledby="blog-posts-heading">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 id="blog-posts-heading" className="text-3xl font-bold text-gray-900">
              All Articles ({filteredPosts.length})
            </h2>
            <p className="text-gray-600">Showing {filteredPosts.length} of {blogPosts.length} articles</p>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
              <Button 
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); setSelectedTag(""); }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white" aria-labelledby="newsletter-heading">
        <div className="container mx-auto text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30 shadow-lg mb-6">
            <Mail className="w-4 h-4" />
            <span className="font-semibold">Stay Updated</span>
          </div>
          
          <h2 id="newsletter-heading" className="text-3xl font-bold text-gray-900 mb-4">Get Expert Insights Delivered</h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter and get the latest trends, best practices, and insights delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            />
            <Button className="btn-hero-primary px-6 py-3 group hover:scale-105 transition-all duration-300">
              <Mail className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary/90" aria-labelledby="blog-cta-heading">
        <div className="container mx-auto text-center">
          <h2 id="blog-cta-heading" className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your ideas to life with our expertise in software development.
          </p>
          <Link href="/consultation">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg group hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <Zap className="w-5 h-5 mr-2" />
              Get Free Strategy Session
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

// Blog Post Card Component - Easy to customize
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer rounded-lg overflow-hidden bg-white hover:scale-105">
      <div className="aspect-video bg-gray-100 overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          width={400}
          height={250}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-white shadow-lg">{post.category}</Badge>
        </div>
        {post.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-yellow-500 text-white shadow-lg">Featured</Badge>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="border-gray-300 text-gray-700 text-xs">
            {post.category}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime}
          </div>
        </div>
        
        <h3 className="text-gray-900 group-hover:text-primary transition-colors line-clamp-2 text-lg font-semibold mb-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-gray-200 text-gray-600">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {post.date}
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
          {post.views && (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {post.views.toLocaleString()}
            </span>
          )}
          {post.likes && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {post.likes}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
