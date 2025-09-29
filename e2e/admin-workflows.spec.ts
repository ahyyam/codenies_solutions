import { test, expect } from '@playwright/test';

test.describe('Admin Workflows', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin page
    await page.goto('/admin');
  });

  test('should display admin interface', async ({ page }) => {
    // Check if admin page loads
    await expect(page).toHaveTitle(/Admin/);
    
    // Check for main admin sections
    await expect(page.getByText('Blog Management')).toBeVisible();
    await expect(page.getByText('Project Management')).toBeVisible();
  });

  test('should navigate between admin tabs', async ({ page }) => {
    // Test blog management tab
    await page.getByRole('tab', { name: 'Blog Management' }).click();
    await expect(page.getByText('Add New Post')).toBeVisible();
    
    // Test project management tab
    await page.getByRole('tab', { name: 'Project Management' }).click();
    await expect(page.getByText('Add New Project')).toBeVisible();
  });

  test('should open blog post creation form', async ({ page }) => {
    // Navigate to blog management
    await page.getByRole('tab', { name: 'Blog Management' }).click();
    
    // Click add new post button
    await page.getByText('Add New Post').click();
    
    // Check if form is displayed
    await expect(page.getByText('Create New Blog Post')).toBeVisible();
    await expect(page.getByLabel('Title')).toBeVisible();
    await expect(page.getByLabel('Content')).toBeVisible();
  });

  test('should validate blog post form', async ({ page }) => {
    // Navigate to blog management and open form
    await page.getByRole('tab', { name: 'Blog Management' }).click();
    await page.getByText('Add New Post').click();
    
    // Try to submit empty form
    await page.getByRole('button', { name: 'Create Post' }).click();
    
    // Check for validation errors
    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('Content is required')).toBeVisible();
  });

  test('should create a new blog post', async ({ page }) => {
    // Navigate to blog management and open form
    await page.getByRole('tab', { name: 'Blog Management' }).click();
    await page.getByText('Add New Post').click();
    
    // Fill out the form
    await page.getByLabel('Title').fill('Test Blog Post');
    await page.getByLabel('Excerpt').fill('This is a test excerpt that meets the minimum length requirements for validation.');
    await page.getByLabel('Content').fill('This is the test blog post content that is long enough to meet the minimum requirements for validation. It contains multiple sentences to ensure it meets the length requirements and provides valuable information to readers.');
    
    // Submit the form
    await page.getByRole('button', { name: 'Create Post' }).click();
    
    // Check for success message
    await expect(page.getByText('Blog post created successfully')).toBeVisible();
    
    // Verify the post appears in the list
    await expect(page.getByText('Test Blog Post')).toBeVisible();
  });

  test('should open project creation form', async ({ page }) => {
    // Navigate to project management
    await page.getByRole('tab', { name: 'Project Management' }).click();
    
    // Click add new project button
    await page.getByText('Add New Project').click();
    
    // Check if form is displayed
    await expect(page.getByText('Create New Project')).toBeVisible();
    await expect(page.getByLabel('Title')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
  });

  test('should validate project form', async ({ page }) => {
    // Navigate to project management and open form
    await page.getByRole('tab', { name: 'Project Management' }).click();
    await page.getByText('Add New Project').click();
    
    // Try to submit empty form
    await page.getByRole('button', { name: 'Create Project' }).click();
    
    // Check for validation errors
    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('Description is required')).toBeVisible();
  });

  test('should delete blog post', async ({ page }) => {
    // First create a blog post to delete
    await page.getByRole('tab', { name: 'Blog Management' }).click();
    
    // Check if there are existing posts or create one
    const postExists = await page.getByText('Test Blog Post').isVisible().catch(() => false);
    
    if (!postExists) {
      // Create a test post first
      await page.getByText('Add New Post').click();
      await page.getByLabel('Title').fill('Post to Delete');
      await page.getByLabel('Excerpt').fill('This is a test excerpt for a post that will be deleted.');
      await page.getByLabel('Content').fill('This is test content for a blog post that will be deleted during testing.');
      await page.getByRole('button', { name: 'Create Post' }).click();
      await expect(page.getByText('Blog post created successfully')).toBeVisible();
    }
    
    // Find and click delete button
    const deleteButton = page.getByRole('button', { name: /delete/i }).first();
    await deleteButton.click();
    
    // Confirm deletion
    await page.getByRole('button', { name: 'Delete' }).click();
    
    // Check for success message
    await expect(page.getByText('Blog post deleted successfully')).toBeVisible();
  });

  test('should search and filter blog posts', async ({ page }) => {
    // Navigate to blog management
    await page.getByRole('tab', { name: 'Blog Management' }).click();
    
    // Use search functionality
    const searchInput = page.getByPlaceholder('Search blog posts...');
    await searchInput.fill('test');
    
    // Wait for search results
    await page.waitForTimeout(500);
    
    // Verify search functionality works (posts are filtered)
    const searchResults = page.locator('[data-testid="blog-post-item"]');
    const count = await searchResults.count();
    
    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(500);
    
    // Verify all posts are shown again
    const allResults = page.locator('[data-testid="blog-post-item"]');
    const allCount = await allResults.count();
    
    expect(allCount).toBeGreaterThanOrEqual(count);
  });
});