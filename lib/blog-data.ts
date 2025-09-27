// Blog post data structure - easy to add new posts
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  slug: string;
  views?: number;
  likes?: number;
}

export const blogPosts: BlogPost[] = []

// Blog categories for easy filtering
export const blogCategories = [
  { id: "all", name: "All Posts", count: blogPosts.length },
  { id: "saas", name: "SaaS", count: blogPosts.filter(p => p.category === "SaaS").length },
  { id: "ecommerce", name: "E-commerce", count: blogPosts.filter(p => p.category === "E-commerce").length },
  { id: "ai", name: "AI & Mobile", count: blogPosts.filter(p => p.category === "AI & Mobile").length },
  { id: "design", name: "Design", count: blogPosts.filter(p => p.category === "Design").length },
  { id: "architecture", name: "Architecture", count: blogPosts.filter(p => p.category === "Architecture").length },
  { id: "security", name: "Security", count: blogPosts.filter(p => p.category === "Security").length },
]

// Popular tags for easy discovery
export const popularTags = [
  "AI", "SaaS", "E-commerce", "Mobile Apps", "Design", "Architecture", 
  "Security", "Performance", "Scalability", "Best Practices", "Trends"
]

// Helper function to add new blog posts
export function addBlogPost(post: Omit<BlogPost, 'id' | 'slug'>): BlogPost {
  const nextId = blogPosts.length === 0 ? 1 : Math.max(...blogPosts.map(p => p.id)) + 1
  const newPost: BlogPost = {
    ...post,
    id: nextId,
    slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    views: 0,
    likes: 0
  }
  blogPosts.push(newPost)
  return newPost
}

export function removeBlogPost(id: number): boolean {
  const index = blogPosts.findIndex(p => p.id === id)
  if (index !== -1) {
    blogPosts.splice(index, 1)
    return true
  }
  return false
}

// Helper function to get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "all") return blogPosts
  return blogPosts.filter(post => 
    post.category.toLowerCase().includes(category.toLowerCase())
  )
}

// Helper function to search blog posts
export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase()
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.author.toLowerCase().includes(lowercaseQuery)
  )
}

// Helper function to get featured posts
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured)
}

// Helper function to get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

// Helper function to get related posts
export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit)
}
