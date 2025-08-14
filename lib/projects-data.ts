// Project data structure - easy to add new projects
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  results: string[];
  link: string;
  featured: boolean;
  client: string;
  duration: string;
  teamSize: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "CloudSync SaaS Platform",
    category: "SaaS Development",
    description: "A comprehensive cloud storage and collaboration platform serving 10,000+ users with real-time sync and AI-powered file organization.",
    image: "/modern-saas-dashboard.png",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "AWS", "AI Integration"],
    results: ["300% increase in user productivity", "99.9% uptime", "50% reduction in storage costs"],
    link: "#",
    featured: true,
    client: "TechCorp Inc.",
    duration: "6 months",
    teamSize: "8 developers"
  },
  {
    id: 2,
    title: "EcoMart E-commerce",
    category: "E-commerce",
    description: "Sustainable products marketplace with advanced filtering, AI recommendations, and integrated payment processing.",
    image: "/modern-ecommerce-green.png",
    technologies: ["React", "Node.js", "Stripe", "MongoDB", "Machine Learning"],
    results: ["$2M+ in sales", "40% conversion rate", "25,000+ active users"],
    link: "#",
    featured: true,
    client: "EcoMart",
    duration: "4 months",
    teamSize: "6 developers"
  },
  {
    id: 3,
    title: "FitTracker Mobile App",
    category: "Mobile Application",
    description: "Cross-platform fitness tracking app with social features, workout plans, and nutrition tracking.",
    image: "/placeholder-vnct0.png",
    technologies: ["React Native", "Firebase", "AI Analytics", "HealthKit"],
    results: ["100K+ downloads", "4.8 App Store rating", "80% user retention"],
    link: "#",
    featured: false,
    client: "FitTech Solutions",
    duration: "5 months",
    teamSize: "5 developers"
  },
  {
    id: 4,
    title: "MedConnect Telemedicine",
    category: "Healthcare SaaS",
    description: "HIPAA-compliant telemedicine platform connecting patients with healthcare providers through secure video calls.",
    image: "/placeholder-qvoz2.png",
    technologies: ["Next.js", "WebRTC", "PostgreSQL", "HIPAA Compliance"],
    results: ["50,000+ consultations", "95% patient satisfaction", "60% cost reduction"],
    link: "#",
    featured: true,
    client: "HealthConnect",
    duration: "8 months",
    teamSize: "10 developers"
  },
  {
    id: 5,
    title: "AI Content Studio",
    category: "AI Integration",
    description: "Content creation platform powered by AI for generating marketing copy, images, and social media posts.",
    image: "/ai-content-dashboard.png",
    technologies: ["Python", "OpenAI API", "React", "Redis", "Docker"],
    results: ["10x faster content creation", "500+ businesses served", "90% time savings"],
    link: "#",
    featured: false,
    client: "ContentAI",
    duration: "3 months",
    teamSize: "4 developers"
  },
  {
    id: 6,
    title: "RestaurantOS",
    category: "Restaurant Management",
    description: "Complete restaurant management system with POS, inventory tracking, and customer analytics.",
    image: "/modern-restaurant-pos.png",
    technologies: ["Vue.js", "Laravel", "MySQL", "Payment Integration"],
    results: ["200+ restaurants", "30% revenue increase", "50% order accuracy improvement"],
    link: "#",
    featured: false,
    client: "RestaurantTech",
    duration: "7 months",
    teamSize: "7 developers"
  },
]

// Categories for easy filtering
export const projectCategories = [
  { id: "all", name: "All Projects", count: projectsData.length },
  { id: "saas", name: "SaaS Development", count: projectsData.filter(p => p.category.includes("SaaS")).length },
  { id: "ecommerce", name: "E-commerce", count: projectsData.filter(p => p.category.includes("E-commerce")).length },
  { id: "mobile", name: "Mobile Apps", count: projectsData.filter(p => p.category.includes("Mobile")).length },
  { id: "ai", name: "AI Integration", count: projectsData.filter(p => p.category.includes("AI")).length },
  { id: "healthcare", name: "Healthcare", count: projectsData.filter(p => p.category.includes("Healthcare")).length },
  { id: "restaurant", name: "Restaurant", count: projectsData.filter(p => p.category.includes("Restaurant")).length },
]

// Helper function to add new projects
export function addProject(project: Omit<Project, 'id'>): Project {
  const newProject: Project = {
    ...project,
    id: Math.max(...projectsData.map(p => p.id)) + 1
  }
  projectsData.push(newProject)
  return newProject
}

// Helper function to get projects by category
export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projectsData
  return projectsData.filter(project => 
    project.category.toLowerCase().includes(category.toLowerCase())
  )
}

// Helper function to search projects
export function searchProjects(query: string): Project[] {
  const lowercaseQuery = query.toLowerCase()
  return projectsData.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery)) ||
    project.client.toLowerCase().includes(lowercaseQuery)
  )
}
