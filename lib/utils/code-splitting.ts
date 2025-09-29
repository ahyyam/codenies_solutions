import { lazy, ComponentType, LazyExoticComponent } from 'react';

/**
 * Code splitting utilities for better performance
 */

// Cache for lazy components to prevent re-creation
const componentCache = new Map<string, LazyExoticComponent<any>>();

/**
 * Create a lazy component with caching
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  componentName?: string
): LazyExoticComponent<T> {
  const cacheKey = componentName || importFunc.toString();
  
  if (componentCache.has(cacheKey)) {
    return componentCache.get(cacheKey) as LazyExoticComponent<T>;
  }

  const LazyComponent = lazy(importFunc);
  componentCache.set(cacheKey, LazyComponent);
  
  return LazyComponent;
}

/**
 * Preload a component for better UX
 */
export function preloadComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): Promise<{ default: T }> {
  return importFunc();
}

/**
 * Create a lazy component with preloading capability
 */
export function createPreloadableLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  componentName?: string
) {
  const LazyComponent = createLazyComponent(importFunc, componentName);
  
  return {
    Component: LazyComponent,
    preload: () => preloadComponent(importFunc)
  };
}

/**
 * Route-based code splitting configuration
 */
export const lazyRoutes = {
  // Admin routes (heavy components)
  AdminLayout: createPreloadableLazyComponent(
    () => import('@/components/admin/AdminLayout').then(module => ({ default: module.AdminLayout })),
    'AdminLayout'
  ),
  BlogManagement: createPreloadableLazyComponent(
    () => import('@/components/admin/BlogManagement').then(module => ({ default: module.BlogManagement })),
    'BlogManagement'
  ),
  ProjectManagement: createPreloadableLazyComponent(
    () => import('@/components/admin/ProjectManagement').then(module => ({ default: module.ProjectManagement })),
    'ProjectManagement'
  ),
  
  // Blog components
  BlogGrid: createPreloadableLazyComponent(
    () => import('@/components/blog/BlogGrid').then(module => ({ default: module.BlogGrid })),
    'BlogGrid'
  ),
  BlogFilter: createPreloadableLazyComponent(
    () => import('@/components/blog/BlogFilter').then(module => ({ default: module.BlogFilter })),
    'BlogFilter'
  ),
  
  // Project components
  ProjectGrid: createPreloadableLazyComponent(
    () => import('@/components/projects/ProjectGrid').then(module => ({ default: module.ProjectGrid })),
    'ProjectGrid'
  ),
  ProjectModal: createPreloadableLazyComponent(
    () => import('@/components/projects/ProjectModal').then(module => ({ default: module.ProjectModal })),
    'ProjectModal'
  ),
  
  // Form components (used in admin)
  BlogPostForm: createPreloadableLazyComponent(
    () => import('@/components/admin/BlogPostForm').then(module => ({ default: module.BlogPostForm })),
    'BlogPostForm'
  ),
  ProjectForm: createPreloadableLazyComponent(
    () => import('@/components/admin/ProjectForm').then(module => ({ default: module.ProjectForm })),
    'ProjectForm'
  )
};

/**
 * Preload components based on route
 */
export function preloadRouteComponents(route: string): void {
  const preloadMap: Record<string, () => void> = {
    '/admin': () => {
      lazyRoutes.AdminLayout.preload();
      lazyRoutes.BlogManagement.preload();
      lazyRoutes.ProjectManagement.preload();
    },
    '/blog': () => {
      lazyRoutes.BlogGrid.preload();
      lazyRoutes.BlogFilter.preload();
    },
    '/work': () => {
      lazyRoutes.ProjectGrid.preload();
      lazyRoutes.ProjectModal.preload();
    }
  };

  const preloadFunc = preloadMap[route];
  if (preloadFunc) {
    // Preload after a short delay to not block initial render
    setTimeout(preloadFunc, 100);
  }
}

/**
 * Preload components on hover (for better UX)
 */
export function createHoverPreloader(route: string) {
  return {
    onMouseEnter: () => preloadRouteComponents(route),
    onFocus: () => preloadRouteComponents(route)
  };
}

/**
 * Bundle analysis utilities
 */
export class BundleAnalyzer {
  private static loadedChunks: Set<string> = new Set();
  private static chunkSizes: Map<string, number> = new Map();

  static trackChunkLoad(chunkName: string, size?: number): void {
    this.loadedChunks.add(chunkName);
    if (size) {
      this.chunkSizes.set(chunkName, size);
    }
  }

  static getLoadedChunks(): string[] {
    return Array.from(this.loadedChunks);
  }

  static getTotalBundleSize(): number {
    return Array.from(this.chunkSizes.values()).reduce((total, size) => total + size, 0);
  }

  static getChunkInfo(): Array<{ name: string; size: number }> {
    return Array.from(this.chunkSizes.entries()).map(([name, size]) => ({
      name,
      size
    }));
  }
}

/**
 * Dynamic import with error handling and retry
 */
export async function dynamicImport<T>(
  importFunc: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < retries; i++) {
    try {
      return await importFunc();
    } catch (error) {
      lastError = error as Error;
      
      if (i < retries - 1) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError!;
}

/**
 * Intersection Observer based lazy loading for components
 */
export function createIntersectionLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: IntersectionObserverInit = {}
) {
  return lazy(() => {
    return new Promise<{ default: T }>((resolve) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.disconnect();
              importFunc().then(resolve);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
          ...options
        }
      );

      // Create a temporary element to observe
      const tempElement = document.createElement('div');
      tempElement.style.position = 'absolute';
      tempElement.style.top = '0';
      tempElement.style.left = '0';
      tempElement.style.width = '1px';
      tempElement.style.height = '1px';
      tempElement.style.opacity = '0';
      tempElement.style.pointerEvents = 'none';
      
      document.body.appendChild(tempElement);
      observer.observe(tempElement);

      // Cleanup after 10 seconds if not intersected
      setTimeout(() => {
        observer.disconnect();
        if (document.body.contains(tempElement)) {
          document.body.removeChild(tempElement);
        }
        importFunc().then(resolve);
      }, 10000);
    });
  });
}

/**
 * Resource hints for better loading performance
 */
export function addResourceHints(): void {
  if (typeof window === 'undefined') return;

  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://api.fontshare.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // DNS prefetch for other domains
  const dnsPrefetchDomains = [
    '//cdnjs.cloudflare.com',
    '//unpkg.com'
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
}

/**
 * Initialize code splitting optimizations
 */
export function initializeCodeSplitting(): void {
  if (typeof window === 'undefined') return;

  // Add resource hints
  addResourceHints();

  // Track initial bundle load
  BundleAnalyzer.trackChunkLoad('main');

  // Preload critical routes based on current path
  const currentPath = window.location.pathname;
  preloadRouteComponents(currentPath);
}