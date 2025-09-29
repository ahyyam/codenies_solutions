import { Page, expect } from '@playwright/test';

/**
 * Helper functions for E2E tests
 */

/**
 * Wait for page to be fully loaded including all network requests
 */
export async function waitForPageLoad(page: Page, timeout = 30000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Create a test blog post via the admin interface
 */
export async function createTestBlogPost(page: Page, title = 'Test Blog Post') {
  await page.goto('/admin');
  await page.getByRole('tab', { name: 'Blog Management' }).click();
  await page.getByText('Add New Post').click();
  
  await page.getByLabel('Title').fill(title);
  await page.getByLabel('Excerpt').fill('This is a test excerpt that meets the minimum length requirements for validation.');
  await page.getByLabel('Content').fill('This is the test blog post content that is long enough to meet the minimum requirements for validation. It contains multiple sentences to ensure it meets the length requirements and provides valuable information to readers.');
  
  await page.getByRole('button', { name: 'Create Post' }).click();
  await expect(page.getByText('Blog post created successfully')).toBeVisible();
}

/**
 * Create a test project via the admin interface
 */
export async function createTestProject(page: Page, title = 'Test Project') {
  await page.goto('/admin');
  await page.getByRole('tab', { name: 'Project Management' }).click();
  await page.getByText('Add New Project').click();
  
  await page.getByLabel('Title').fill(title);
  await page.getByLabel('Description').fill('This is a test project description that meets the minimum length requirements for validation.');
  
  // Fill other required fields if they exist
  const categorySelect = page.getByLabel('Category');
  if (await categorySelect.isVisible()) {
    await categorySelect.selectOption({ index: 1 });
  }
  
  await page.getByRole('button', { name: 'Create Project' }).click();
  await expect(page.getByText('Project created successfully')).toBeVisible();
}

/**
 * Check if element is visible in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

/**
 * Scroll element into view
 */
export async function scrollIntoView(page: Page, selector: string) {
  await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, selector);
}

/**
 * Get performance metrics
 */
export async function getPerformanceMetrics(page: Page) {
  return await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
    };
  });
}

/**
 * Check if page has proper meta tags
 */
export async function checkMetaTags(page: Page) {
  const title = await page.title();
  const description = await page.getAttribute('meta[name="description"]', 'content');
  const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
  const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
  
  return {
    title,
    description,
    ogTitle,
    ogDescription,
    hasTitle: title.length > 0,
    hasDescription: description !== null && description.length > 0,
    hasOgTitle: ogTitle !== null && ogTitle.length > 0,
    hasOgDescription: ogDescription !== null && ogDescription.length > 0,
  };
}

/**
 * Test responsive behavior at different breakpoints
 */
export async function testResponsiveBreakpoints(page: Page, url: string) {
  const breakpoints = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1024, height: 768 },
    { name: 'large', width: 1920, height: 1080 },
  ];
  
  const results = [];
  
  for (const breakpoint of breakpoints) {
    await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
    await page.goto(url);
    await waitForPageLoad(page);
    
    const isContentVisible = await page.getByRole('heading', { level: 1 }).isVisible();
    const isNavVisible = await page.getByRole('navigation').isVisible();
    
    results.push({
      breakpoint: breakpoint.name,
      contentVisible: isContentVisible,
      navVisible: isNavVisible,
      width: breakpoint.width,
      height: breakpoint.height,
    });
  }
  
  return results;
}

/**
 * Check for console errors
 */
export async function checkConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  return errors;
}

/**
 * Test keyboard navigation
 */
export async function testKeyboardNavigation(page: Page, expectedFocusableElements = 5) {
  const focusedElements: string[] = [];
  
  // Start from the beginning
  await page.keyboard.press('Tab');
  
  for (let i = 0; i < expectedFocusableElements; i++) {
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.split(' ').join('.') : ''}` : 'none';
    });
    
    focusedElements.push(focusedElement);
    await page.keyboard.press('Tab');
  }
  
  return focusedElements;
}

/**
 * Simulate slow network conditions
 */
export async function simulateSlowNetwork(page: Page) {
  const client = await page.context().newCDPSession(page);
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5 Mbps
    uploadThroughput: 750 * 1024 / 8, // 750 Kbps
    latency: 40, // 40ms
  });
}

/**
 * Reset network conditions
 */
export async function resetNetworkConditions(page: Page) {
  const client = await page.context().newCDPSession(page);
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: -1,
    uploadThroughput: -1,
    latency: 0,
  });
}