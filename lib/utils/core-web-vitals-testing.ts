/**
 * Core Web Vitals testing and optimization utilities
 * Provides automated testing and recommendations for the new design system
 */

interface WebVitalsThresholds {
  lcp: { good: number; needsImprovement: number };
  fid: { good: number; needsImprovement: number };
  cls: { good: number; needsImprovement: number };
  fcp: { good: number; needsImprovement: number };
  ttfb: { good: number; needsImprovement: number };
}

interface WebVitalsResult {
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  recommendation?: string;
}

interface DesignSystemOptimizations {
  criticalCSS: boolean;
  fontOptimization: boolean;
  imageOptimization: boolean;
  animationOptimization: boolean;
  gradientOptimization: boolean;
}

// Web Vitals thresholds based on Google's recommendations
const WEB_VITALS_THRESHOLDS: WebVitalsThresholds = {
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  fcp: { good: 1800, needsImprovement: 3000 },
  ttfb: { good: 800, needsImprovement: 1800 }
};

/**
 * Core Web Vitals testing class
 */
export class CoreWebVitalsTest {
  private results: WebVitalsResult[] = [];
  private optimizations: DesignSystemOptimizations = {
    criticalCSS: false,
    fontOptimization: false,
    imageOptimization: false,
    animationOptimization: false,
    gradientOptimization: false
  };

  /**
   * Run comprehensive Core Web Vitals test
   */
  public async runTest(): Promise<WebVitalsResult[]> {
    this.results = [];

    if (typeof window === 'undefined') {
      console.warn('Core Web Vitals test can only run in browser environment');
      return this.results;
    }

    // Test LCP
    await this.testLCP();
    
    // Test FID
    await this.testFID();
    
    // Test CLS
    await this.testCLS();
    
    // Test FCP
    await this.testFCP();
    
    // Test TTFB
    await this.testTTFB();

    // Analyze design system optimizations
    this.analyzeDesignSystemOptimizations();

    return this.results;
  }

  /**
   * Test Largest Contentful Paint (LCP)
   */
  private async testLCP(): Promise<void> {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          const lcp = lastEntry.renderTime || lastEntry.loadTime;
          
          const rating = this.getRating('lcp', lcp);
          const result: WebVitalsResult = {
            metric: 'LCP',
            value: lcp,
            rating,
            recommendation: this.getLCPRecommendation(lcp, rating)
          };
          
          this.results.push(result);
          observer.disconnect();
          resolve();
        });
        
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        
        // Fallback timeout
        setTimeout(() => {
          observer.disconnect();
          resolve();
        }, 5000);
      } else {
        resolve();
      }
    });
  }

  /**
   * Test First Input Delay (FID)
   */
  private async testFID(): Promise<void> {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime;
            const rating = this.getRating('fid', fid);
            
            const result: WebVitalsResult = {
              metric: 'FID',
              value: fid,
              rating,
              recommendation: this.getFIDRecommendation(fid, rating)
            };
            
            this.results.push(result);
          });
          
          observer.disconnect();
          resolve();
        });
        
        observer.observe({ type: 'first-input', buffered: true });
        
        // FID requires user interaction, so we'll timeout after 10 seconds
        setTimeout(() => {
          observer.disconnect();
          resolve();
        }, 10000);
      } else {
        resolve();
      }
    });
  }

  /**
   * Test Cumulative Layout Shift (CLS)
   */
  private async testCLS(): Promise<void> {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
        });
        
        observer.observe({ type: 'layout-shift', buffered: true });
        
        // Measure CLS for 5 seconds
        setTimeout(() => {
          const rating = this.getRating('cls', clsValue);
          const result: WebVitalsResult = {
            metric: 'CLS',
            value: clsValue,
            rating,
            recommendation: this.getCLSRecommendation(clsValue, rating)
          };
          
          this.results.push(result);
          observer.disconnect();
          resolve();
        }, 5000);
      } else {
        resolve();
      }
    });
  }

  /**
   * Test First Contentful Paint (FCP)
   */
  private async testFCP(): Promise<void> {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              const fcp = entry.startTime;
              const rating = this.getRating('fcp', fcp);
              
              const result: WebVitalsResult = {
                metric: 'FCP',
                value: fcp,
                rating,
                recommendation: this.getFCPRecommendation(fcp, rating)
              };
              
              this.results.push(result);
            }
          });
          
          observer.disconnect();
          resolve();
        });
        
        observer.observe({ type: 'paint', buffered: true });
        
        setTimeout(() => {
          observer.disconnect();
          resolve();
        }, 3000);
      } else {
        resolve();
      }
    });
  }

  /**
   * Test Time to First Byte (TTFB)
   */
  private async testTTFB(): Promise<void> {
    return new Promise((resolve) => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', () => {
          const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
          if (navigationEntries.length > 0) {
            const entry = navigationEntries[0];
            const ttfb = entry.responseStart - entry.requestStart;
            const rating = this.getRating('ttfb', ttfb);
            
            const result: WebVitalsResult = {
              metric: 'TTFB',
              value: ttfb,
              rating,
              recommendation: this.getTTFBRecommendation(ttfb, rating)
            };
            
            this.results.push(result);
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * Get rating for a metric value
   */
  private getRating(metric: keyof WebVitalsThresholds, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = WEB_VITALS_THRESHOLDS[metric];
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Analyze design system optimizations
   */
  private analyzeDesignSystemOptimizations(): void {
    // Check if critical CSS is implemented
    this.optimizations.criticalCSS = !!document.getElementById('critical-css');
    
    // Check font optimization
    const fontPreloads = document.querySelectorAll('link[rel="preload"][as="font"]');
    this.optimizations.fontOptimization = fontPreloads.length > 0;
    
    // Check image optimization
    const images = document.querySelectorAll('img');
    let optimizedImages = 0;
    images.forEach(img => {
      if (img.loading === 'lazy' || img.getAttribute('sizes') || img.srcset) {
        optimizedImages++;
      }
    });
    this.optimizations.imageOptimization = optimizedImages / images.length > 0.5;
    
    // Check animation optimization
    const animatedElements = document.querySelectorAll('[style*="transform"], [class*="animate"]');
    this.optimizations.animationOptimization = animatedElements.length > 0;
    
    // Check gradient optimization
    const gradientElements = document.querySelectorAll('[style*="gradient"], [class*="gradient"]');
    this.optimizations.gradientOptimization = gradientElements.length > 0;
  }

  /**
   * Generate LCP recommendations
   */
  private getLCPRecommendation(value: number, rating: string): string {
    if (rating === 'good') return 'LCP is performing well! 🎉';
    
    const recommendations = [
      'Optimize images with proper sizing and modern formats (WebP, AVIF)',
      'Implement critical CSS inlining for faster rendering',
      'Use font-display: swap for web fonts',
      'Preload important resources',
      'Optimize server response times'
    ];
    
    if (!this.optimizations.criticalCSS) {
      return 'Consider implementing critical CSS inlining to improve LCP';
    }
    
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  }

  /**
   * Generate FID recommendations
   */
  private getFIDRecommendation(value: number, rating: string): string {
    if (rating === 'good') return 'FID is performing well! 🎉';
    
    return 'Reduce JavaScript execution time and break up long tasks to improve FID';
  }

  /**
   * Generate CLS recommendations
   */
  private getCLSRecommendation(value: number, rating: string): string {
    if (rating === 'good') return 'CLS is performing well! 🎉';
    
    const recommendations = [
      'Add size attributes to images and videos',
      'Reserve space for dynamic content',
      'Avoid inserting content above existing content',
      'Use CSS aspect-ratio for responsive images'
    ];
    
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  }

  /**
   * Generate FCP recommendations
   */
  private getFCPRecommendation(value: number, rating: string): string {
    if (rating === 'good') return 'FCP is performing well! 🎉';
    
    if (!this.optimizations.criticalCSS) {
      return 'Implement critical CSS inlining to improve FCP';
    }
    
    return 'Optimize render-blocking resources and reduce server response times';
  }

  /**
   * Generate TTFB recommendations
   */
  private getTTFBRecommendation(value: number, rating: string): string {
    if (rating === 'good') return 'TTFB is performing well! 🎉';
    
    return 'Optimize server response times, use CDN, and implement caching strategies';
  }

  /**
   * Generate comprehensive performance report
   */
  public generateReport(): string {
    const goodMetrics = this.results.filter(r => r.rating === 'good').length;
    const totalMetrics = this.results.length;
    const score = Math.round((goodMetrics / totalMetrics) * 100);
    
    let report = `
Core Web Vitals Report - Design System Performance
================================================

Overall Score: ${score}% (${goodMetrics}/${totalMetrics} metrics passing)

Metrics:
`;

    this.results.forEach(result => {
      const emoji = result.rating === 'good' ? '✅' : result.rating === 'needs-improvement' ? '⚠️' : '❌';
      report += `${emoji} ${result.metric}: ${result.value.toFixed(2)}${result.metric === 'CLS' ? '' : 'ms'} (${result.rating})\n`;
      if (result.recommendation) {
        report += `   💡 ${result.recommendation}\n`;
      }
    });

    report += `
Design System Optimizations:
${this.optimizations.criticalCSS ? '✅' : '❌'} Critical CSS Inlining
${this.optimizations.fontOptimization ? '✅' : '❌'} Font Optimization
${this.optimizations.imageOptimization ? '✅' : '❌'} Image Optimization
${this.optimizations.animationOptimization ? '✅' : '❌'} Animation Optimization
${this.optimizations.gradientOptimization ? '✅' : '❌'} Gradient Optimization
`;

    return report;
  }

  /**
   * Get optimization suggestions
   */
  public getOptimizationSuggestions(): string[] {
    const suggestions: string[] = [];
    
    if (!this.optimizations.criticalCSS) {
      suggestions.push('Implement critical CSS inlining for faster initial rendering');
    }
    
    if (!this.optimizations.fontOptimization) {
      suggestions.push('Add font preloading and use font-display: swap');
    }
    
    if (!this.optimizations.imageOptimization) {
      suggestions.push('Optimize images with proper sizing, lazy loading, and modern formats');
    }
    
    const poorMetrics = this.results.filter(r => r.rating === 'poor');
    if (poorMetrics.length > 0) {
      suggestions.push(`Focus on improving: ${poorMetrics.map(m => m.metric).join(', ')}`);
    }
    
    return suggestions;
  }
}

/**
 * Run automated Core Web Vitals test
 */
export async function runCoreWebVitalsTest(): Promise<WebVitalsResult[]> {
  const test = new CoreWebVitalsTest();
  return await test.runTest();
}

/**
 * Generate performance report
 */
export async function generatePerformanceReport(): Promise<string> {
  const test = new CoreWebVitalsTest();
  await test.runTest();
  return test.generateReport();
}

/**
 * Get optimization suggestions
 */
export async function getOptimizationSuggestions(): Promise<string[]> {
  const test = new CoreWebVitalsTest();
  await test.runTest();
  return test.getOptimizationSuggestions();
}

/**
 * Initialize automated testing on page load
 */
export function initializeAutomatedTesting(): void {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', async () => {
      // Wait a bit for everything to settle
      setTimeout(async () => {
        try {
          const report = await generatePerformanceReport();
          console.log(report);
          
          // Store results for debugging
          sessionStorage.setItem('core-web-vitals-report', report);
        } catch (error) {
          console.warn('Core Web Vitals testing error:', error);
        }
      }, 2000);
    });
  }
}