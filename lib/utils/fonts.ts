/**
 * Font optimization utilities for better performance
 */

// Font preloading configuration
export const fontConfig = {
  // Primary fonts
  geistSans: {
    family: 'GeistSans',
    weights: [400, 500, 600, 700],
    display: 'swap',
    preload: true
  },
  touvlo: {
    family: 'Touvlo',
    weights: [400, 500, 700],
    display: 'swap',
    preload: true
  },
  // Fallback fonts
  systemFonts: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif'
  ]
};

/**
 * Generate font-face CSS with font-display: swap
 */
export function generateFontFaceCSS(fontFamily: string, fontWeight: number, fontStyle: string = 'normal'): string {
  return `
    @font-face {
      font-family: '${fontFamily}';
      font-style: ${fontStyle};
      font-weight: ${fontWeight};
      font-display: swap;
      src: local('${fontFamily}');
    }
  `;
}

/**
 * Generate preload links for critical fonts
 */
export function generateFontPreloadLinks(): Array<{
  href: string;
  as: string;
  type: string;
  crossOrigin: string;
}> {
  const preloadLinks = [];
  
  // Preload Geist Sans (primary font)
  preloadLinks.push({
    href: '/fonts/geist-sans-400.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  });
  
  preloadLinks.push({
    href: '/fonts/geist-sans-600.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  });
  
  return preloadLinks;
}

/**
 * Generate CSS for font optimization
 */
export function generateFontOptimizationCSS(): string {
  return `
    /* Font optimization */
    html {
      font-family: ${fontConfig.geistSans.family}, ${fontConfig.systemFonts.join(', ')};
    }
    
    /* Prevent layout shift during font loading */
    .font-loading {
      visibility: hidden;
    }
    
    .font-loaded {
      visibility: visible;
    }
    
    /* Font display optimization */
    @font-face {
      font-family: 'GeistSans';
      font-display: swap;
    }
    
    @font-face {
      font-family: 'Touvlo';
      font-display: swap;
    }
    
    /* Reduce font loading impact */
    body {
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `;
}

/**
 * Font loading strategy for better performance
 */
export class FontLoader {
  private static instance: FontLoader;
  private loadedFonts: Set<string> = new Set();
  private loadingPromises: Map<string, Promise<void>> = new Map();

  static getInstance(): FontLoader {
    if (!FontLoader.instance) {
      FontLoader.instance = new FontLoader();
    }
    return FontLoader.instance;
  }

  /**
   * Load a font with proper error handling
   */
  async loadFont(fontFamily: string, fontWeight: number = 400, fontStyle: string = 'normal'): Promise<void> {
    const fontKey = `${fontFamily}-${fontWeight}-${fontStyle}`;
    
    if (this.loadedFonts.has(fontKey)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(fontKey)) {
      return this.loadingPromises.get(fontKey)!;
    }

    const loadingPromise = this.loadFontInternal(fontFamily, fontWeight, fontStyle);
    this.loadingPromises.set(fontKey, loadingPromise);

    try {
      await loadingPromise;
      this.loadedFonts.add(fontKey);
    } catch (error) {
      console.warn(`Failed to load font: ${fontKey}`, error);
    } finally {
      this.loadingPromises.delete(fontKey);
    }
  }

  private async loadFontInternal(fontFamily: string, fontWeight: number, fontStyle: string): Promise<void> {
    if (typeof window === 'undefined' || !('FontFace' in window)) {
      return Promise.resolve();
    }

    const fontFace = new FontFace(
      fontFamily,
      `url(/fonts/${fontFamily.toLowerCase()}-${fontWeight}.woff2) format('woff2')`,
      {
        weight: fontWeight.toString(),
        style: fontStyle,
        display: 'swap'
      }
    );

    await fontFace.load();
    document.fonts.add(fontFace);
  }

  /**
   * Preload critical fonts
   */
  async preloadCriticalFonts(): Promise<void> {
    const criticalFonts = [
      { family: 'GeistSans', weight: 400 },
      { family: 'GeistSans', weight: 600 },
      { family: 'Touvlo', weight: 400 }
    ];

    const loadPromises = criticalFonts.map(font => 
      this.loadFont(font.family, font.weight)
    );

    await Promise.allSettled(loadPromises);
  }

  /**
   * Check if font is loaded
   */
  isFontLoaded(fontFamily: string, fontWeight: number = 400, fontStyle: string = 'normal'): boolean {
    const fontKey = `${fontFamily}-${fontWeight}-${fontStyle}`;
    return this.loadedFonts.has(fontKey);
  }

  /**
   * Get loaded fonts
   */
  getLoadedFonts(): string[] {
    return Array.from(this.loadedFonts);
  }
}

/**
 * React hook for font loading
 */
export function useFontLoader() {
  const fontLoader = FontLoader.getInstance();
  
  return {
    loadFont: fontLoader.loadFont.bind(fontLoader),
    preloadCriticalFonts: fontLoader.preloadCriticalFonts.bind(fontLoader),
    isFontLoaded: fontLoader.isFontLoaded.bind(fontLoader),
    getLoadedFonts: fontLoader.getLoadedFonts.bind(fontLoader)
  };
}

/**
 * Initialize font loading optimization
 */
export function initializeFontOptimization(): void {
  if (typeof window === 'undefined') return;

  // Add font loading class to document
  document.documentElement.classList.add('font-loading');

  // Load critical fonts
  const fontLoader = FontLoader.getInstance();
  fontLoader.preloadCriticalFonts().then(() => {
    document.documentElement.classList.remove('font-loading');
    document.documentElement.classList.add('font-loaded');
  });

  // Add font optimization CSS
  const style = document.createElement('style');
  style.textContent = generateFontOptimizationCSS();
  document.head.appendChild(style);
}

export const fontLoader = FontLoader.getInstance();