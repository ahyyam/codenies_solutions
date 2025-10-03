/**
 * Accessibility utilities for WCAG 2.1 AA compliance
 * Provides color contrast checking, focus management, and accessibility helpers
 */

// Color contrast ratios for WCAG compliance
export const WCAG_CONTRAST_RATIOS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3.0,
  AAA_NORMAL: 7.0,
  AAA_LARGE: 4.5,
} as const;

// Design system colors for contrast checking
export const DESIGN_COLORS = {
  primary: '#5A00D2',      // Deep Purple
  accent: '#E60073',       // Magenta Pink
  secondary: '#007BFF',    // Electric Blue
  textPrimary: '#111111',  // Charcoal Black
  background: '#FFFFFF',   // White
  backgroundSubtle: '#F2F2F2', // Light Gray
} as const;

/**
 * Convert hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 specification
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format. Please use hex colors.');
  }
  
  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 */
export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? WCAG_CONTRAST_RATIOS.AA_LARGE : WCAG_CONTRAST_RATIOS.AA_NORMAL;
  return ratio >= requiredRatio;
}

/**
 * Check if color combination meets WCAG AAA standards
 */
export function meetsWCAGAAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? WCAG_CONTRAST_RATIOS.AAA_LARGE : WCAG_CONTRAST_RATIOS.AAA_NORMAL;
  return ratio >= requiredRatio;
}

/**
 * Validate all design system color combinations
 */
export function validateDesignSystemContrast(): {
  valid: boolean;
  results: Array<{
    combination: string;
    ratio: number;
    meetsAA: boolean;
    meetsAAA: boolean;
    isLargeText?: boolean;
  }>;
} {
  const combinations = [
    // Text on backgrounds
    { fg: DESIGN_COLORS.textPrimary, bg: DESIGN_COLORS.background, name: 'Text on White' },
    { fg: DESIGN_COLORS.background, bg: DESIGN_COLORS.textPrimary, name: 'White on Charcoal' },
    { fg: DESIGN_COLORS.textPrimary, bg: DESIGN_COLORS.backgroundSubtle, name: 'Text on Light Gray' },
    
    // Brand colors on backgrounds
    { fg: DESIGN_COLORS.primary, bg: DESIGN_COLORS.background, name: 'Purple on White' },
    { fg: DESIGN_COLORS.background, bg: DESIGN_COLORS.primary, name: 'White on Purple' },
    { fg: DESIGN_COLORS.accent, bg: DESIGN_COLORS.background, name: 'Magenta on White' },
    { fg: DESIGN_COLORS.background, bg: DESIGN_COLORS.accent, name: 'White on Magenta' },
    { fg: DESIGN_COLORS.secondary, bg: DESIGN_COLORS.background, name: 'Blue on White' },
    { fg: DESIGN_COLORS.background, bg: DESIGN_COLORS.secondary, name: 'White on Blue' },
    
    // Brand colors on subtle background
    { fg: DESIGN_COLORS.primary, bg: DESIGN_COLORS.backgroundSubtle, name: 'Purple on Light Gray' },
    { fg: DESIGN_COLORS.accent, bg: DESIGN_COLORS.backgroundSubtle, name: 'Magenta on Light Gray' },
    { fg: DESIGN_COLORS.secondary, bg: DESIGN_COLORS.backgroundSubtle, name: 'Blue on Light Gray' },
  ];

  const results = combinations.map(({ fg, bg, name }) => {
    const ratio = getContrastRatio(fg, bg);
    return {
      combination: name,
      ratio: Math.round(ratio * 100) / 100,
      meetsAA: meetsWCAGAA(fg, bg),
      meetsAAA: meetsWCAGAAA(fg, bg),
    };
  });

  const allMeetAA = results.every(result => result.meetsAA);

  return {
    valid: allMeetAA,
    results,
  };
}

/**
 * Focus management utilities
 */
export class FocusManager {
  private static focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');

  /**
   * Get all focusable elements within a container
   */
  static getFocusableElements(container: Element): HTMLElement[] {
    return Array.from(container.querySelectorAll(this.focusableSelectors)) as HTMLElement[];
  }

  /**
   * Trap focus within a container (useful for modals)
   */
  static trapFocus(container: Element): () => void {
    const focusableElements = this.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }

  /**
   * Restore focus to a previously focused element
   */
  static restoreFocus(element: HTMLElement | null): void {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  }
}

/**
 * Screen reader utilities
 */
export class ScreenReaderUtils {
  /**
   * Announce text to screen readers
   */
  static announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;

    document.body.appendChild(announcer);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  /**
   * Create visually hidden text for screen readers
   */
  static createScreenReaderText(text: string): HTMLSpanElement {
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    return span;
  }
}

/**
 * Keyboard navigation utilities
 */
export class KeyboardNavigation {
  /**
   * Handle arrow key navigation for a list of elements
   */
  static handleArrowNavigation(
    elements: HTMLElement[],
    currentIndex: number,
    key: string
  ): number {
    let newIndex = currentIndex;

    switch (key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % elements.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = elements.length - 1;
        break;
    }

    if (newIndex !== currentIndex) {
      elements[newIndex]?.focus();
    }

    return newIndex;
  }

  /**
   * Add keyboard navigation to a group of elements
   */
  static addArrowNavigation(container: Element, itemSelector: string): () => void {
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const items = Array.from(container.querySelectorAll(itemSelector)) as HTMLElement[];
      
      if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
        currentIndex = this.handleArrowNavigation(items, currentIndex, e.key);
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }
}

/**
 * Motion preferences utilities
 */
export class MotionPreferences {
  /**
   * Check if user prefers reduced motion
   */
  static prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Apply motion preferences to animations
   */
  static respectMotionPreferences(element: HTMLElement, animationClass: string): void {
    if (this.prefersReducedMotion()) {
      element.classList.add('motion-reduce');
    } else {
      element.classList.add(animationClass);
    }
  }

  /**
   * Create a media query listener for motion preferences
   */
  static onMotionPreferenceChange(callback: (prefersReduced: boolean) => void): () => void {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      callback(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Return cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }
}

/**
 * High contrast mode utilities
 */
export class HighContrastMode {
  /**
   * Check if user prefers high contrast
   */
  static prefersHighContrast(): boolean {
    return window.matchMedia('(prefers-contrast: high)').matches;
  }

  /**
   * Apply high contrast styles
   */
  static applyHighContrastStyles(element: HTMLElement): void {
    if (this.prefersHighContrast()) {
      element.classList.add('high-contrast');
    }
  }

  /**
   * Create a media query listener for contrast preferences
   */
  static onContrastPreferenceChange(callback: (prefersHigh: boolean) => void): () => void {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      callback(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Return cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }
}

/**
 * Accessibility testing utilities for development
 */
export class AccessibilityTesting {
  /**
   * Run basic accessibility checks on an element
   */
  static async runBasicChecks(element: Element): Promise<{
    hasAltText: boolean;
    hasProperHeadings: boolean;
    hasSkipLinks: boolean;
    hasFocusIndicators: boolean;
    meetsContrastRequirements: boolean;
  }> {
    const images = element.querySelectorAll('img');
    const hasAltText = Array.from(images).every(img => 
      img.hasAttribute('alt') || img.hasAttribute('aria-label')
    );

    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const hasProperHeadings = headings.length > 0;

    const skipLinks = element.querySelectorAll('a[href^="#"]');
    const hasSkipLinks = skipLinks.length > 0;

    const focusableElements = FocusManager.getFocusableElements(element);
    const hasFocusIndicators = focusableElements.length > 0;

    // Basic contrast check (would need more sophisticated implementation for full validation)
    const meetsContrastRequirements = validateDesignSystemContrast().valid;

    return {
      hasAltText,
      hasProperHeadings,
      hasSkipLinks,
      hasFocusIndicators,
      meetsContrastRequirements,
    };
  }

  /**
   * Log accessibility issues to console (development only)
   */
  static logAccessibilityIssues(element: Element): void {
    if (process.env.NODE_ENV !== 'development') return;

    this.runBasicChecks(element).then(results => {
      const issues = Object.entries(results)
        .filter(([, passed]) => !passed)
        .map(([check]) => check);

      if (issues.length > 0) {
        console.warn('Accessibility issues found:', issues);
      } else {
        console.log('✅ Basic accessibility checks passed');
      }
    });
  }
}