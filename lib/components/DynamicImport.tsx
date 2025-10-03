import React, { Suspense, ComponentType, lazy } from 'react';

interface DynamicImportProps {
  fallback?: React.ReactNode;
  delay?: number;
}

/**
 * Higher-order component for dynamic imports with optimized loading
 */
export function createDynamicComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: DynamicImportProps = {}
) {
  const { fallback = <DefaultFallback />, delay = 200 } = options;
  
  const LazyComponent = lazy(
    () => 
      new Promise<{ default: T }>((resolve) => 
        setTimeout(() => importFn().then(resolve), delay)
      )
  );

  return function DynamicComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Default loading fallback component
 */
function DefaultFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

/**
 * Optimized lazy loading wrapper for heavy components
 */
export function lazyLoadComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
): ComponentType<React.ComponentProps<T>> {
  const LazyComponent = lazy(importFn);
  
  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback || <DefaultFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Intersection-based lazy loading component
 */
export function IntersectionLazyComponent<T extends ComponentType<any>>({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { setRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  if (!isIntersecting) {
    return <div ref={setRef}>{fallback || <DefaultFallback />}</div>;
  }

  return <>{children}</>;
}

function useIntersectionObserver(options: { threshold: number; rootMargin: string }) {
  // This would import from the hook we created earlier
  // For now, providing a simple implementation
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsIntersecting(entries[0].isIntersecting);
        }
      },
      options
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return {
    setRef: ref,
    isIntersecting,
  };
}
