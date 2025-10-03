import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

interface IntersectionObserverReturn {
  setRef: (element: Element | null) => void;
  isIntersecting: boolean;
}

/**
 * Custom hook for intersection observer
 * Optimizes lazy loading and performance monitoring
 */
export function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}): IntersectionObserverReturn {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<Element | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip if already visible and freezeOnceVisible is true
    if (freezeOnceVisible && isIntersecting) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isIntersecting]);

  const setRef = (element: Element | null) => {
    elementRef.current = element;
  };

  return { setRef, isIntersecting };
}

/**
 * Hook specifically for lazy loading components
 */
export function useLazyLoading(threshold = 0.1) {
  return useIntersectionObserver({
    threshold,
    rootMargin: '50px',
    freezeOnceVisible: true,
  });
}
