/**
 * Critical CSS utilities for the new design system
 * Inlines essential color system and typography for optimal performance
 */

// Critical CSS for the Minimal Tech-Innovation Palette
export const criticalColorSystem = `
  :root {
    /* Primary Brand Colors */
    --color-primary: #5A00D2;
    --color-accent: #E60073;
    --color-secondary: #007BFF;
    
    /* Neutral Colors */
    --color-text-primary: #111111;
    --color-background: #FFFFFF;
    --color-background-subtle: #F2F2F2;
    
    /* Semantic Colors */
    --color-heading: var(--color-primary);
    --color-text: var(--color-text-primary);
    --color-highlight: var(--color-accent);
    --color-tech-accent: var(--color-secondary);
    
    /* Gradient Definitions */
    --gradient-innovation: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
    --gradient-tech: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    --gradient-hover: linear-gradient(135deg, var(--color-accent) 0%, var(--color-secondary) 100%);
    
    /* Spacing System */
    --space-xs: 0.5rem;
    --space-sm: 1rem;
    --space-md: 1.5rem;
    --space-lg: 2rem;
    --space-xl: 3rem;
    --space-2xl: 4rem;
    --space-3xl: 6rem;
  }
`;

// Critical typography system
export const criticalTypography = `
  /* Typography System */
  .heading-1 {
    color: var(--color-primary);
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .heading-2 {
    color: var(--color-primary);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 600;
    line-height: 1.2;
  }

  .heading-3 {
    color: var(--color-primary);
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 600;
    line-height: 1.3;
  }

  .body-text {
    color: var(--color-text);
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.6;
    font-weight: 400;
  }

  .highlight-text {
    color: var(--color-accent);
    font-weight: 500;
  }

  .tech-accent {
    color: var(--color-secondary);
    font-weight: 500;
  }
`;

// Critical button system
export const criticalButtons = `
  /* Button System */
  .btn-primary {
    background: var(--color-primary);
    color: white;
    padding: 0.875rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .btn-primary:hover {
    background: var(--gradient-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(90, 0, 210, 0.3);
  }

  .btn-primary:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .btn-secondary {
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    padding: 0.75rem 1.875rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .btn-secondary:hover {
    background: var(--color-primary);
    color: white;
    transform: translateY(-1px);
  }
`;

// Critical layout system
export const criticalLayout = `
  /* Layout System */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-md);
  }

  .section-primary {
    background: var(--color-background);
    padding: clamp(3rem, 8vw, 6rem) 0;
  }

  .section-contrast {
    background: var(--color-text-primary);
    color: white;
    padding: clamp(3rem, 8vw, 6rem) 0;
  }

  .section-subtle {
    background: var(--color-background-subtle);
    padding: clamp(2rem, 6vw, 4rem) 0;
  }

  .content-spacing > * + * {
    margin-top: var(--space-lg);
  }
`;

// Critical hero section styles
export const criticalHero = `
  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, 
      rgba(90, 0, 210, 0.05) 0%, 
      rgba(255, 255, 255, 1) 50%,
      rgba(0, 123, 255, 0.05) 100%);
    padding: clamp(4rem, 12vw, 8rem) 0;
    text-align: center;
  }

  .hero-title {
    background: var(--gradient-innovation);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: var(--space-lg);
  }

  /* Fallback for browsers that don't support background-clip */
  @supports not (-webkit-background-clip: text) {
    .hero-title {
      color: var(--color-primary);
      background: none;
      -webkit-text-fill-color: unset;
    }
  }
`;

// Combine all critical CSS
export const criticalCSS = `
  ${criticalColorSystem}
  ${criticalTypography}
  ${criticalButtons}
  ${criticalLayout}
  ${criticalHero}
`;

/**
 * Generate critical CSS for specific page types
 */
export function getCriticalCSSForPage(pageType: 'home' | 'blog' | 'service' | 'project' | 'about'): string {
  let pageCriticalCSS = criticalCSS;

  switch (pageType) {
    case 'home':
      pageCriticalCSS += `
        /* Homepage specific critical styles */
        .hero-gradient-text {
          background: var(--gradient-innovation);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `;
      break;
    case 'blog':
      pageCriticalCSS += `
        /* Blog specific critical styles */
        .blog-card {
          background: white;
          border-radius: 1rem;
          padding: var(--space-xl);
          box-shadow: 0 4px 20px rgba(17, 17, 17, 0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(90, 0, 210, 0.1);
        }
      `;
      break;
    case 'service':
      pageCriticalCSS += `
        /* Service page critical styles */
        .service-highlight {
          background: var(--gradient-tech);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `;
      break;
    case 'project':
      pageCriticalCSS += `
        /* Project page critical styles */
        .project-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(17, 17, 17, 0.08);
          transition: all 0.3s ease;
        }
      `;
      break;
  }

  return pageCriticalCSS;
}

/**
 * Minify CSS for production
 */
export function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
    .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
    .replace(/;\s*/g, ';') // Remove spaces after semicolon
    .replace(/,\s*/g, ',') // Remove spaces after comma
    .trim();
}

/**
 * Generate critical CSS script tag for inlining
 */
export function generateCriticalCSSScript(pageType: 'home' | 'blog' | 'service' | 'project' | 'about'): string {
  const css = minifyCSS(getCriticalCSSForPage(pageType));
  return `<style id="critical-css">${css}</style>`;
}

/**
 * Check if critical CSS should be inlined based on page type and user agent
 */
export function shouldInlineCriticalCSS(userAgent?: string): boolean {
  // Always inline for better performance, but could add logic for specific cases
  return true;
}

/**
 * Generate preload hints for non-critical CSS
 */
export function generateCSSPreloadHints(): string[] {
  return [
    '<link rel="preload" href="/css/animations.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">',
    '<link rel="preload" href="/css/components.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">',
    '<link rel="preload" href="/css/utilities.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
  ];
}

/**
 * Performance monitoring for CSS loading
 */
export function trackCSSPerformance() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Track when critical CSS is applied
    const criticalCSSElement = document.getElementById('critical-css');
    if (criticalCSSElement) {
      performance.mark('critical-css-loaded');
    }

    // Track when all CSS is loaded
    window.addEventListener('load', () => {
      performance.mark('all-css-loaded');
      
      // Measure the difference
      try {
        performance.measure('css-loading-time', 'critical-css-loaded', 'all-css-loaded');
        const measure = performance.getEntriesByName('css-loading-time')[0];
        
        // Log performance data (could be sent to analytics)
        console.log('CSS Loading Performance:', {
          criticalCSSTime: measure.startTime,
          totalCSSTime: measure.duration,
          improvement: `${((measure.duration / measure.startTime) * 100).toFixed(2)}% faster`
        });
      } catch (error) {
        console.warn('Could not measure CSS performance:', error);
      }
    });
  }
}