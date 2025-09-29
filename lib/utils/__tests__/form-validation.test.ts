import { ContentValidator } from '../validation'
import { useFormValidation, blogPostValidationSchema, projectValidationSchema } from '../form-validation'
import { renderHook, act } from '@testing-library/react'

describe('Form Validation', () => {
  describe('useFormValidation hook', () => {
    it('should initialize with default values', () => {
      const initialData = { title: '', content: '' }
      const { result } = renderHook(() => 
        useFormValidation(initialData, blogPostValidationSchema)
      )
      
      expect(result.current.data).toEqual(initialData)
      expect(result.current.isValid).toBe(false)
      expect(result.current.isDirty).toBe(false)
    })

    it('should update field values', () => {
      const initialData = { title: '', content: '' }
      const { result } = renderHook(() => 
        useFormValidation(initialData, blogPostValidationSchema)
      )
      
      act(() => {
        result.current.updateField('title', 'Test Title')
      })
      
      expect(result.current.data.title).toBe('Test Title')
      expect(result.current.isDirty).toBe(true)
      expect(result.current.touched.title).toBe(true)
    })

    it('should validate required fields', async () => {
      const initialData = { title: '', content: '' }
      const { result } = renderHook(() => 
        useFormValidation(initialData, blogPostValidationSchema)
      )
      
      act(() => {
        result.current.updateField('title', '')
      })
      
      // Wait for debounced validation
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 400))
      })
      
      expect(result.current.hasFieldError('title')).toBe(true)
    })

    it('should reset form to initial state', () => {
      const initialData = { title: '', content: '' }
      const { result } = renderHook(() => 
        useFormValidation(initialData, blogPostValidationSchema)
      )
      
      act(() => {
        result.current.updateField('title', 'Test Title')
      })
      
      act(() => {
        result.current.reset()
      })
      
      expect(result.current.data).toEqual(initialData)
      expect(result.current.isDirty).toBe(false)
      expect(result.current.touched).toEqual({})
    })
  })

  describe('ContentValidator integration', () => {
    it('should validate blog post data', () => {
      const blogPost = {
        title: 'Test Blog Post',
        excerpt: 'This is a test excerpt that is long enough to meet the minimum requirements for validation.',
        content: 'This is the test blog post content that is long enough to meet the minimum requirements for validation. It contains multiple sentences to ensure it meets the length requirements.',
        authorId: '550e8400-e29b-41d4-a716-446655440000',
        categoryId: '550e8400-e29b-41d4-a716-446655440001',
      }
      
      const result = ContentValidator.validateBlogPost(blogPost)
      expect(result.isValid).toBe(true)
    })

    it('should validate project data', () => {
      const project = {
        title: 'Test Project',
        description: 'This is a test project description that is long enough to meet the minimum requirements.',
        categoryId: '550e8400-e29b-41d4-a716-446655440000',
        clientId: '550e8400-e29b-41d4-a716-446655440001',
        timeline: {
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-03-01'),
        },
        technologyIds: ['550e8400-e29b-41d4-a716-446655440002'],
        imageIds: ['550e8400-e29b-41d4-a716-446655440003'],
      }
      
      const result = ContentValidator.validateProject(project)
      expect(result.isValid).toBe(true)
    })

    it('should validate email addresses', () => {
      expect(ContentValidator.validateEmail('test@example.com')).toBe(true)
      expect(ContentValidator.validateEmail('invalid-email')).toBe(false)
    })

    it('should validate URLs', () => {
      expect(ContentValidator.validateUrl('https://example.com')).toBe(true)
      expect(ContentValidator.validateUrl('not-a-url')).toBe(false)
    })
  })

  describe('validation schemas', () => {
    it('should have proper blog post validation schema', () => {
      expect(blogPostValidationSchema.title.required).toBe(true)
      expect(blogPostValidationSchema.title.minLength).toBe(3)
      expect(blogPostValidationSchema.title.maxLength).toBe(100)
      
      expect(blogPostValidationSchema.content.required).toBe(true)
      expect(blogPostValidationSchema.content.minLength).toBe(100)
    })

    it('should have proper project validation schema', () => {
      expect(projectValidationSchema.title.required).toBe(true)
      expect(projectValidationSchema.title.minLength).toBe(3)
      expect(projectValidationSchema.title.maxLength).toBe(100)
      
      expect(projectValidationSchema.description.required).toBe(true)
      expect(projectValidationSchema.description.minLength).toBe(50)
    })
  })
})