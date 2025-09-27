'use client';

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  projectsData,
  addProject,
  removeProject,
  type Project,
} from '@/lib/projects-data'
import {
  blogPosts,
  addBlogPost,
  removeBlogPost,
  type BlogPost,
} from '@/lib/blog-data'

const ADMIN_PASSWORD = 'AhyamEmad@315'

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [password, setPassword] = useState('')

  const [projectForm, setProjectForm] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    technologiesCsv: '',
    resultsCsv: '',
    link: '',
    featured: false,
    client: '',
    duration: '',
    teamSize: '',
  })

  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    date: '',
    readTime: '5 min read',
    category: '',
    tagsCsv: '',
    image: '',
    featured: false,
  })

  const [projects, setProjects] = useState<Project[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('admin_auth')
    if (saved === '1') setIsAuthed(true)
    try {
      const stored = localStorage.getItem('projects')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          // sync in-memory data store for consistency
          projectsData.splice(0, projectsData.length, ...parsed)
          setProjects(parsed)
        } else {
          setProjects([...projectsData])
        }
      } else {
        setProjects([...projectsData])
      }
    } catch {
      setProjects([...projectsData])
    }
    setPosts([...blogPosts])
  }, [])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true)
      localStorage.setItem('admin_auth', '1')
    } else {
      alert('Incorrect password')
    }
  }

  function handleLogout() {
    localStorage.removeItem('admin_auth')
    setIsAuthed(false)
  }

  function onAddProject(e: React.FormEvent) {
    e.preventDefault()
    if (!projectForm.title || !projectForm.category) {
      alert('Title and Category are required')
      return
    }
    const newProject = addProject({
      title: projectForm.title,
      category: projectForm.category,
      description: projectForm.description || '',
      image: projectForm.image || '/placeholder.svg',
      technologies: projectForm.technologiesCsv
        ? projectForm.technologiesCsv.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
      results: projectForm.resultsCsv
        ? projectForm.resultsCsv.split(',').map((r) => r.trim()).filter(Boolean)
        : [],
      link: projectForm.link || '#',
      featured: !!projectForm.featured,
      client: projectForm.client || '',
      duration: projectForm.duration || '',
      teamSize: projectForm.teamSize || '',
    })
    setProjects([...projectsData])
    try {
      localStorage.setItem('projects', JSON.stringify(projectsData))
    } catch {}
    setProjectForm({
      title: '',
      category: '',
      description: '',
      image: '',
      technologiesCsv: '',
      resultsCsv: '',
      link: '',
      featured: false,
      client: '',
      duration: '',
      teamSize: '',
    })
  }

  function onRemoveProject(id: number) {
    if (confirm('Remove this project?')) {
      removeProject(id)
      setProjects([...projectsData])
      try {
        localStorage.setItem('projects', JSON.stringify(projectsData))
      } catch {}
    }
  }

  function onAddBlog(e: React.FormEvent) {
    e.preventDefault()
    if (!blogForm.title || !blogForm.category) {
      alert('Title and Category are required')
      return
    }
    addBlogPost({
      title: blogForm.title,
      excerpt: blogForm.excerpt || '',
      content: blogForm.content || '',
      author: blogForm.author || 'Admin',
      date: blogForm.date || new Date().toISOString().slice(0, 10),
      readTime: blogForm.readTime || '5 min read',
      category: blogForm.category,
      tags: blogForm.tagsCsv
        ? blogForm.tagsCsv.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
      image: blogForm.image || '/placeholder.svg',
      featured: !!blogForm.featured,
    })
    setPosts([...blogPosts])
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      date: '',
      readTime: '5 min read',
      category: '',
      tagsCsv: '',
      image: '',
      featured: false,
    })
  }

  function onRemoveBlog(id: number) {
    if (confirm('Remove this post?')) {
      removeBlogPost(id)
      setPosts([...blogPosts])
    }
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="text-center">
            <Badge className="mb-2">Admin</Badge>
            <h1 className="text-xl font-semibold">Enter Password</h1>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full">Unlock</Button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 pt-20 pb-10">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Badge className="mr-2">Admin</Badge>
            <span className="text-sm text-muted-foreground">Manage Portfolio and Blog</span>
          </div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>

        {/* Projects */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Projects ({projects.length})</h2>
          <form onSubmit={onAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card border border-border rounded-lg p-4 mb-4">
            <div>
              <Label>Title</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
            </div>
            <div>
              <Label>Category</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <textarea className="w-full px-3 py-2 border border-border rounded-md bg-background" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
            </div>
            <div>
              <Label>Image URL</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={projectForm.image} onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })} />
            </div>
            <div>
              <Label>Project URL</Label>
              <input
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="https://example.com"
                value={projectForm.link}
                onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
              />
            </div>
            <div>
              <Label>Technologies (comma separated)</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={projectForm.technologiesCsv} onChange={(e) => setProjectForm({ ...projectForm, technologiesCsv: e.target.value })} />
            </div>
            <div>
              <Label>Results (comma separated)</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={projectForm.resultsCsv} onChange={(e) => setProjectForm({ ...projectForm, resultsCsv: e.target.value })} />
            </div>
            <div>
              <Label>Client</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={projectForm.client} onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })} />
            </div>
            <div>
              <Label>Duration</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={projectForm.duration} onChange={(e) => setProjectForm({ ...projectForm, duration: e.target.value })} />
            </div>
            <div>
              <Label>Team Size</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={projectForm.teamSize} onChange={(e) => setProjectForm({ ...projectForm, teamSize: e.target.value })} />
            </div>
            <div>
              <Label>Featured</Label>
              <input type="checkbox" className="ml-2" checked={projectForm.featured} onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Add Project</Button>
            </div>
          </form>

          {projectForm.link && (
            <div className="bg-card border border-border rounded-lg p-3 mb-6">
              <div className="text-sm text-muted-foreground mb-2">Preview</div>
              <div className="aspect-video bg-muted rounded overflow-hidden">
                <iframe
                  src={projectForm.link.startsWith('http') ? projectForm.link : `https://${projectForm.link}`}
                  className="w-full h-full"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                />
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                If the site blocks embedding, the preview may be empty. Open the link directly to verify.
              </div>
            </div>
          )}

          <div className="grid gap-3">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-card border border-border rounded-lg p-3">
                <div className="text-sm">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-muted-foreground">{p.category}</div>
                </div>
                <Button variant="outline" onClick={() => onRemoveProject(p.id)}>Remove</Button>
              </div>
            ))}
            {projects.length === 0 && (
              <div className="text-sm text-muted-foreground">No projects yet.</div>
            )}
          </div>
        </section>

        {/* Blog */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Blog Posts ({posts.length})</h2>
          <form onSubmit={onAddBlog} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card border border-border rounded-lg p-4 mb-4">
            <div>
              <Label>Title</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} />
            </div>
            <div>
              <Label>Category</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={blogForm.category} onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Excerpt</Label>
              <textarea className="w-full px-3 py-2 border border-border rounded-md bg-background" value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Content</Label>
              <textarea className="w-full px-3 py-2 border border-border rounded-md bg-background" rows={5} value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} />
            </div>
            <div>
              <Label>Author</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={blogForm.author} onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })} />
            </div>
            <div>
              <Label>Read Time</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={blogForm.readTime} onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })} />
            </div>
            <div>
              <Label>Tags (comma separated)</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={blogForm.tagsCsv} onChange={(e) => setBlogForm({ ...blogForm, tagsCsv: e.target.value })} />
            </div>
            <div>
              <Label>Image URL</Label>
              <input className="w-full px-3 py-2 border border-border rounded-md bg-background" value={blogForm.image} onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })} />
            </div>
            <div>
              <Label>Featured</Label>
              <input type="checkbox" className="ml-2" checked={blogForm.featured} onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Add Post</Button>
            </div>
          </form>

          <div className="grid gap-3">
            {posts.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-card border border-border rounded-lg p-3">
                <div className="text-sm">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-muted-foreground">{p.category}</div>
                </div>
                <Button variant="outline" onClick={() => onRemoveBlog(p.id)}>Remove</Button>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="text-sm text-muted-foreground">No posts yet.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}


