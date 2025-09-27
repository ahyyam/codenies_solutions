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

export const projectsData: Project[] = []

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
  const nextId = projectsData.length === 0 ? 1 : Math.max(...projectsData.map(p => p.id)) + 1
  const newProject: Project = { ...project, id: nextId }
  projectsData.push(newProject)
  return newProject
}

export function removeProject(id: number): boolean {
  const index = projectsData.findIndex(p => p.id === id)
  if (index !== -1) {
    projectsData.splice(index, 1)
    return true
  }
  return false
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
