import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AppProviders } from '@/components/providers/AppProviders'

// Global test types
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R
    }
  }
}

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <AppProviders>{children}</AppProviders>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Common test utilities
export const createMockProject = (overrides = {}) => ({
  id: 'test-project-1',
  title: 'Test Project',
  slug: 'test-project',
  category: 'web-development' as const,
  description: 'A test project description',
  images: [
    {
      src: '/test-image.jpg',
      alt: 'Test image',
      width: 800,
      height: 600,
    },
  ],
  technologies: ['React', 'TypeScript'],
  features: ['Feature 1', 'Feature 2'],
  challenges: ['Challenge 1'],
  results: [
    {
      metric: 'Performance',
      value: '50% faster',
      description: 'Improved loading speed',
    },
  ],
  client: {
    name: 'Test Client',
    industry: 'Technology',
  },
  timeline: {
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-01'),
    duration: '2 months',
  },
  team: [
    {
      name: 'John Doe',
      role: 'Developer',
      avatar: '/avatar.jpg',
    },
  ],
  status: 'completed' as const,
  featured: false,
  links: {
    live: 'https://example.com',
    github: 'https://github.com/example/repo',
  },
  seo: {
    title: 'Test Project SEO Title',
    description: 'Test project SEO description',
    keywords: ['test', 'project'],
  },
  ...overrides,
})

export const createMockBlogPost = (overrides = {}) => ({
  id: 'test-blog-1',
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  excerpt: 'A test blog post excerpt',
  content: 'This is the test blog post content.',
  author: {
    id: 'author-1',
    name: 'John Doe',
    avatar: '/avatar.jpg',
  },
  publishedAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  readTime: 5,
  category: {
    id: 'tech',
    name: 'Technology',
    slug: 'technology',
  },
  tags: [
    { id: 'react', name: 'React', slug: 'react' },
    { id: 'typescript', name: 'TypeScript', slug: 'typescript' },
  ],
  featuredImage: {
    src: '/test-featured.jpg',
    alt: 'Test featured image',
    width: 1200,
    height: 630,
  },
  featured: false,
  status: 'published' as const,
  seo: {
    title: 'Test Blog Post SEO Title',
    description: 'Test blog post SEO description',
    keywords: ['test', 'blog'],
  },
  analytics: {
    views: 100,
    likes: 10,
    shares: 5,
  },
  ...overrides,
})

// Accessibility testing helper
export const axeTest = async (container: Element) => {
  const { axe, toHaveNoViolations } = await import('jest-axe')
  
  // Extend expect with jest-axe matchers
  const expectGlobal = (global as any).expect
  if (expectGlobal && expectGlobal.extend) {
    expectGlobal.extend(toHaveNoViolations)
    const results = await axe(container)
    expectGlobal(results).toHaveNoViolations()
  } else {
    // Fallback for environments where expect is not available
    const results = await axe(container)
    if (results.violations.length > 0) {
      throw new Error(`Accessibility violations found: ${results.violations.length}`)
    }
  }
}

// Mock form data for testing
export const createMockFormData = (data: Record<string, any>) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, typeof value === 'string' ? value : JSON.stringify(value))
    }
  })
  return formData
}

// Wait for async operations in tests
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0))