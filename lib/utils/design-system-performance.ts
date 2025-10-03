/**
 * Performance monitoring utilities for the new design system
 * Tracks Core Web Vitals and design system specific metrics
 */

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  cssLoadTime?: number;
  fontLoadTime?: number;
  animationFrameRate?: number;
}

interface DesignSystemMetrics {
  criticalCSSTime: number;
  totalCSSTime: number;
  fontLoadTime: number;
  gradientRenderTime: number;
  animationPerformance: {
    averageFrameTime: number;
    droppedFrames: number;
    smoothness: number;
  };
}

/**
 * Core Web Vitals monitoring
 */
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
          this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
          this.reportMetric('LCP', this.metrics.lcp);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (error) {
        console.warn('LCP observer not supported:', error);
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.metrics.fid = entry.processingStart - entry.startTime;
            this.reportMetric('FID', this.metrics.fid);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (error) {
        console.warn('FID observer not supported:', error);
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.cls = clsValue;
          this.reportMetric('CLS', this.metrics.cls);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (error) {
        console.warn('CLS observer not supported:', error);
      }

      // First Contentful Paint (FCP)
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime;
              this.reportMetric('FCP', this.metrics.fcp);
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);
      } catch (error) {
        console.warn('FCP observer not supported:', error);
      }
    }

    // Time to First Byte (TTFB)
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
          const entry = navigationEntries[0];
          this.metrics.ttfb = entry.responseStart - entry.requestStart;
          this.reportMetric('TTFB', this.metrics.ttfb);
        }
      });
    }
  }

  /**
   * Monitor design system specific performance
   */
  public monitorDesignSystemPerformance(): DesignSystemMetrics {
    const metrics: Partial<DesignSystemMetrics> = {};

    // Monitor CSS loading performance
    if ('performance' in window) {
      // Critical CSS timing
      const criticalCSSMark = performance.getEntriesByName('critical-css-loaded')[0];
      if (criticalCSSMark) {
        metrics.criticalCSSTime = criticalCSSMark.startTime;
      }

      // Total CSS timing
      const allCSSMark = performance.getEntriesByName('all-css-loaded')[0];
      if (allCSSMark) {
        metrics.totalCSSTime = allCSSMark.startTime;
      }

      // Font loading timing
      const fontsMark = performance.getEntriesByName('fonts-loaded')[0];
      if (fontsMark) {
        metrics.fontLoadTime = fontsMark.startTime;
      }
    }

    // Monitor animation performance
    metrics.animationPerformance = this.monitorAnimationPerformance();

    return metrics as DesignSystemMetrics;
  }

  /**
   * Monitor animation performance and frame rates
   */
  private monitorAnimationPerformance() {
    let frameCount = 0;
    let totalFrameTime = 0;
    let droppedFrames = 0;
    let lastFrameTime = performance.now();

    const measureFrame = (currentTime: number) => {
      const frameTime = currentTime - lastFrameTime;
      totalFrameTime += frameTime;
      frameCount++;

      // Consider frames over 16.67ms (60fps) as dropped
      if (frameTime > 16.67) {
        droppedFrames++;
      }

      lastFrameTime = currentTime;

      // Continue measuring for 5 seconds
      if (frameCount < 300) {
        requestAnimationFrame(measureFrame);
      } else {
        const averageFrameTime = totalFrameTime / frameCount;
        const smoothness = ((frameCount - droppedFrames) / frameCount) * 100;
        
        this.reportMetric('Animation Performance', {
          averageFrameTime,
          droppedFrames,
          smoothness: Math.round(smoothness * 100) / 100
        });
      }
    };

    requestAnimationFrame(measureFrame);

    return {
      averageFrameTime: totalFrameTime / frameCount || 0,
      droppedFrames,
      smoothness: ((frameCount - droppedFrames) / frameCount) * 100 || 0
    };
  }

  /**
   * Monitor gradient rendering performance
   */
  public monitorGradientPerformance() {
    const startTime = performance.now();
    
    // Create a test gradient element
    const testElement = document.createElement('div');
    testElement.style.cssText = `
      position: absolute;
      top: -9999px;
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, #5A00D2 0%, #E60073 100%);
    `;
    
    document.body.appendChild(testElement);
    
    // Force a reflow to measure rendering time
    testElement.offsetHeight;
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    document.body.removeChild(testElement);
    
    this.reportMetric('Gradient Render Time', renderTime);
    return renderTime;
  }

  /**
   * Report performance metrics
   */
  private reportMetric(name: string, value: number | object) {
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}:`, value);
    }

    // In production, you could send to analytics service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to analytics
      // analytics.track('performance_metric', { name, value });
    }

    // Store in session storage for debugging
    try {
      const existingMetrics = JSON.parse(sessionStorage.getItem('performance_metrics') || '{}');
      existingMetrics[name] = value;
      sessionStorage.setItem('performance_metrics', JSON.stringify(existingMetrics));
    } catch (error) {
      console.warn('Could not store performance metrics:', error);
    }
  }

  /**
   * Get current performance metrics
   */
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Generate performance report
   */
  public generateReport(): string {
    const metrics = this.getMetrics();
    const designMetrics = this.monitorDesignSystemPerformance();

    const report = `
Performance Report - Design System
==================================

Core Web Vitals:
- LCP (Largest Contentful Paint): ${metrics.lcp?.toFixed(2) || 'N/A'}ms
- FID (First Input Delay): ${metrics.fid?.toFixed(2) || 'N/A'}ms
- CLS (Cumulative Layout Shift): ${metrics.cls?.toFixed(4) || 'N/A'}
- FCP (First Contentful Paint): ${metrics.fcp?.toFixed(2) || 'N/A'}ms
- TTFB (Time to First Byte): ${metrics.ttfb?.toFixed(2) || 'N/A'}ms

Design System Performance:
- Critical CSS Load Time: ${designMetrics.criticalCSSTime?.toFixed(2) || 'N/A'}ms
- Total CSS Load Time: ${designMetrics.totalCSSTime?.toFixed(2) || 'N/A'}ms
- Font Load Time: ${designMetrics.fontLoadTime?.toFixed(2) || 'N/A'}ms
- Animation Smoothness: ${designMetrics.animationPerformance?.smoothness?.toFixed(2) || 'N/A'}%
- Dropped Frames: ${designMetrics.animationPerformance?.droppedFrames || 'N/A'}

Recommendations:
${this.generateRecommendations(metrics, designMetrics)}
    `;

    return report.trim();
  }

  /**
   * Generate performance recommendations
   */
  private generateRecommendations(metrics: PerformanceMetrics, designMetrics: DesignSystemMetrics): string {
    const recommendations: string[] = [];

    if (metrics.lcp && metrics.lcp > 2500) {
      recommendations.push('- Consider optimizing images and reducing render-blocking resources to improve LCP');
    }

    if (metrics.fid && metrics.fid > 100) {
      recommendations.push('- Reduce JavaScript execution time to improve FID');
    }

    if (metrics.cls && metrics.cls > 0.1) {
      recommendations.push('- Add size attributes to images and reserve space for dynamic content to reduce CLS');
    }

    if (designMetrics.animationPerformance?.smoothness < 90) {
      recommendations.push('- Consider reducing animation complexity or using CSS transforms for better performance');
    }

    if (designMetrics.fontLoadTime > 1000) {
      recommendations.push('- Optimize font loading with better preload strategies or font-display: swap');
    }

    return recommendations.length > 0 ? recommendations.join('\n') : '- Performance looks good! 🎉';
  }

  /**
   * Cleanup observers
   */
  public cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

/**
 * Initialize performance monitoring for the design system
 */
export function initializeDesignSystemPerformanceMonitoring() {
  if (typeof window !== 'undefined') {
    const monitor = new PerformanceMonitor();
    
    // Monitor gradient performance after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        monitor.monitorGradientPerformance();
      }, 1000);
    });

    // Generate report after 10 seconds
    setTimeout(() => {
      const report = monitor.generateReport();
      console.log(report);
    }, 10000);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      monitor.cleanup();
    });

    return monitor;
  }
  return null;
}

/**
 * Utility to check if performance API is supported
 */
export function isPerformanceAPISupported(): boolean {
  return typeof window !== 'undefined' && 
         'performance' in window && 
         'PerformanceObserver' in window;
}

/**
 * Get performance budget recommendations for the design system
 */
export function getPerformanceBudget() {
  return {
    lcp: 2500, // ms
    fid: 100,  // ms
    cls: 0.1,  // score
    fcp: 1800, // ms
    ttfb: 600, // ms
    criticalCSS: 500, // ms
    fontLoad: 1000, // ms
    animationSmoothness: 90 // percentage
  };
}