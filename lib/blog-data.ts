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

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of SaaS Development: Trends to Watch in 2024",
    excerpt: "Explore the latest trends shaping the SaaS landscape, from AI integration to micro-services architecture.",
    content: "Full blog post content would go here...",
    author: "Sarah Johnson",
    authorAvatar: "/placeholder-user.jpg",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "SaaS",
    tags: ["SaaS", "AI", "Microservices", "2024 Trends"],
    image: "/modern-saas-dashboard.png",
    featured: true,
    slug: "future-saas-development-trends-2024",
    views: 1250,
    likes: 89
  },
  {
    id: 2,
    title: "Building Scalable E-commerce Platforms: Best Practices",
    excerpt: "Learn how to create e-commerce solutions that can handle millions of transactions while maintaining performance.",
    content: "Full blog post content would go here...",
    author: "Mike Chen",
    authorAvatar: "/placeholder-user.jpg",
    date: "Dec 12, 2024",
    readTime: "12 min read",
    category: "E-commerce",
    tags: ["E-commerce", "Scalability", "Performance", "Best Practices"],
    image: "/modern-ecommerce-website.png",
    featured: true,
    slug: "building-scalable-ecommerce-platforms",
    views: 980,
    likes: 67
  },
  {
    id: 3,
    title: "AI Integration in Mobile Apps: A Complete Guide",
    excerpt: "Discover how to seamlessly integrate artificial intelligence features into your mobile applications.",
    content: "Full blog post content would go here...",
    author: "Alex Rodriguez",
    authorAvatar: "/placeholder-user.jpg",
    date: "Dec 10, 2024",
    readTime: "10 min read",
    category: "AI & Mobile",
    tags: ["AI", "Mobile Apps", "Machine Learning", "Integration"],
    image: "/ai-mobile-app.png",
    featured: false,
    slug: "ai-integration-mobile-apps-guide",
    views: 756,
    likes: 45
  },
  {
    id: 4,
    title: "UI/UX Design Principles That Convert Users",
    excerpt: "Master the art of creating user interfaces that not only look great but also drive business results.",
    content: "Full blog post content would go here...",
    author: "Emma Thompson",
    authorAvatar: "/placeholder-user.jpg",
    date: "Dec 8, 2024",
    readTime: "6 min read",
    category: "Design",
    tags: ["UI/UX", "Design", "Conversion", "User Experience"],
    image: "/modern-ui-ux-mockup.png",
    featured: false,
    slug: "ui-ux-design-principles-convert-users",
    views: 1120,
    likes: 78
  },
  {
    id: 5,
    title: "Microservices vs Monolith: Choosing the Right Architecture",
    excerpt: "A comprehensive comparison to help you decide the best architectural approach for your next project.",
    content: "Full blog post content would go here...",
    author: "David Park",
    authorAvatar: "/placeholder-user.jpg",
    date: "Dec 5, 2024",
    readTime: "15 min read",
    category: "Architecture",
    tags: ["Microservices", "Monolith", "Architecture", "Comparison"],
    image: "/software-architecture-diagram.png",
    featured: true,
    slug: "microservices-vs-monolith-architecture",
    views: 890,
    likes: 56
  },
  {
    id: 6,
    title: "Security Best Practices for Modern Web Applications",
    excerpt: "Essential security measures every developer should implement to protect user data and prevent breaches.",
    content: "Full blog post content would go here...",
    author: "Lisa Wang",
    authorAvatar: "/placeholder-user.jpg",
    date: "Dec 3, 2024",
    readTime: "11 min read",
    category: "Security",
    tags: ["Security", "Web Apps", "Best Practices", "Data Protection"],
    image: "/placeholder-ng7p9.png",
    featured: false,
    slug: "security-best-practices-web-applications",
    views: 645,
    likes: 34
  },
]

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
  const newPost: BlogPost = {
    ...post,
    id: Math.max(...blogPosts.map(p => p.id)) + 1,
    slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    views: 0,
    likes: 0
  }
  blogPosts.push(newPost)
  return newPost
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
