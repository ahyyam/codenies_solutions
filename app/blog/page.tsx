'use client';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User, Clock, Award, Zap, Star, Sparkles, BookOpen, Mail, Search, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { blogPosts, blogCategories, popularTags, type BlogPost } from "@/lib/blog-data"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || 
      post.category.toLowerCase().includes(selectedCategory.toLowerCase())
    
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-primary/10 text-primary">
            <Award className="w-3 h-3 mr-2" />
            Insights & Knowledge
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
            Our Blog
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Stay updated with the latest trends, best practices, and insights from the world of software development,
            design, and technology innovation.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3"
            >
              <Link href="/consultation">
                <Zap className="w-4 h-4 mr-2" />
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-border hover:border-primary text-foreground hover:text-primary px-6 py-3"
            >
              <Link href="#blog-posts">
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 px-4 border-b border-border">
        <div className="container mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-background text-foreground"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={
                selectedCategory === "all"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 bg-transparent"
              }
            >
              All Categories
            </Button>
            {blogCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 bg-transparent"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section id="blog-posts" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground text-center">
              {filteredPosts.length === 0 ? 'No Articles Found' : `All Articles (${filteredPosts.length})`}
            </h2>
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No articles found matching your criteria.</p>
                <Button 
                  onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  View All Articles
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your ideas to life with our expertise in software development.
          </p>
          <Link href="/consultation">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 px-6 py-3 text-base group hover:scale-105 transition-all duration-300">
              <Zap className="w-4 h-4 mr-2" />
              Get Free Strategy Session
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

// Clean Blog Post Card Component
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group cursor-pointer">
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                 <div className="aspect-video bg-muted overflow-hidden relative">
           <Image
             src={post.image || "/placeholder.svg"}
             alt={post.title}
             width={400}
             height={250}
             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
           />
           <div className="absolute top-4 left-4">
             <Badge className="bg-primary text-primary-foreground shadow-lg">
               {post.category}
             </Badge>
           </div>
         </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="border-border text-muted-foreground text-xs">
              {post.category}
            </Badge>
            <div className="flex items-center text-muted-foreground text-sm">
              <Clock className="w-3 h-3 mr-1" />
              {post.readTime}
            </div>
          </div>
          
          <h3 className="text-foreground group-hover:text-primary transition-colors line-clamp-2 text-lg font-semibold mb-3">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
            {post.excerpt}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-border text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {post.readTime}
            </div>
          </div>
          
          {/* Stats */}
          {(post.views || post.likes) && (
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
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
          )}
        </div>
      </div>
    </article>
  )
}
