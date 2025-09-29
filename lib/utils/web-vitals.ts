/**
 * Simple Web Vitals implementation without external dependencies
 */

export interface Metric {
  name: string;
  value: number;
  id: string;
  delta: number;
  entries: PerformanceEntry[];
}

type ReportHandler = (metric: Metric) => void;

/**
 * Get Cumulative Layout Shift (CLS)
 */
export function getCLS(onReport: ReportHandler): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  let clsValue = 0;
  let clsEntries: PerformanceEntry[] = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
        clsEntries.push(entry);
      }
    }

    onReport({
      name: 'CLS',
      value: clsValue,
      id: generateUniqueId(),
      delta: clsValue,
      entries: clsEntries
    });
  });

  observer.observe({ type: 'layout-shift', buffered: true });
}

/**
 * Get First Input Delay (FID)
 */
export function getFID(onReport: ReportHandler): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const fidValue = (entry as any).processingStart - entry.startTime;
      
      onReport({
        name: 'FID',
        value: fidValue,
        id: generateUniqueId(),
        delta: fidValue,
        entries: [entry]
      });
    }
  });

  observer.observe({ type: 'first-input', buffered: true });
}

/**
 * Get First Contentful Paint (FCP)
 */
export function getFCP(onReport: ReportHandler): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        onReport({
          name: 'FCP',
          value: entry.startTime,
          id: generateUniqueId(),
          delta: entry.startTime,
          entries: [entry]
        });
      }
    }
  });

  observer.observe({ type: 'paint', buffered: true });
}

/**
 * Get Largest Contentful Paint (LCP)
 */
export function getLCP(onReport: ReportHandler): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  let lcpValue = 0;
  let lcpEntries: PerformanceEntry[] = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      lcpValue = entry.startTime;
      lcpEntries = [entry];
    }

    onReport({
      name: 'LCP',
      value: lcpValue,
      id: generateUniqueId(),
      delta: lcpValue,
      entries: lcpEntries
    });
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });
}

/**
 * Get Time to First Byte (TTFB)
 */
export function getTTFB(onReport: ReportHandler): void {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (navigationEntry) {
    const ttfbValue = navigationEntry.responseStart - navigationEntry.requestStart;
    
    onReport({
      name: 'TTFB',
      value: ttfbValue,
      id: generateUniqueId(),
      delta: ttfbValue,
      entries: [navigationEntry]
    });
  }
}

/**
 * Get Interaction to Next Paint (INP) - experimental
 */
export function getINP(onReport: ReportHandler): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  let maxDuration = 0;
  let inpEntries: PerformanceEntry[] = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > maxDuration) {
        maxDuration = entry.duration;
        inpEntries = [entry];
      }
    }

    onReport({
      name: 'INP',
      value: maxDuration,
      id: generateUniqueId(),
      delta: maxDuration,
      entries: inpEntries
    });
  });

  try {
    observer.observe({ type: 'event', buffered: true });
  } catch (e) {
    // Event timing not supported
  }
}

/**
 * Generate a unique ID for metrics
 */
function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get all Core Web Vitals
 */
export function getAllWebVitals(onReport: ReportHandler): void {
  getCLS(onReport);
  getFID(onReport);
  getFCP(onReport);
  getLCP(onReport);
  getTTFB(onReport);
  getINP(onReport);
}

/**
 * Performance monitoring utility
 */
export class WebVitalsMonitor {
  private metrics: Map<string, Metric> = new Map();
  private handlers: Set<ReportHandler> = new Set();

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    const reportHandler: ReportHandler = (metric) => {
      this.metrics.set(metric.name, metric);
      this.handlers.forEach(handler => handler(metric));
    };

    getAllWebVitals(reportHandler);
  }

  public onReport(handler: ReportHandler): void {
    this.handlers.add(handler);
  }

  public removeHandler(handler: ReportHandler): void {
    this.handlers.delete(handler);
  }

  public getMetric(name: string): Metric | undefined {
    return this.metrics.get(name);
  }

  public getAllMetrics(): Metric[] {
    return Array.from(this.metrics.values());
  }

  public getMetricsSummary(): Record<string, number> {
    const summary: Record<string, number> = {};
    this.metrics.forEach((metric, name) => {
      summary[name] = metric.value;
    });
    return summary;
  }
}

export const webVitalsMonitor = new WebVitalsMonitor();