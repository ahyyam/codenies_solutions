// Search and filtering hook
import { useState, useMemo, useCallback } from 'react';
import { useDebounce } from './useDebounce';
import { FilterOptions, SearchParams } from '../types/common';

interface UseSearchOptions<T> {
  items: T[];
  searchFields: (keyof T)[];
  filterFunctions?: Record<string, (item: T, value: any) => boolean>;
  debounceMs?: number;
  caseSensitive?: boolean;
}

export function useSearch<T>(options: UseSearchOptions<T>) {
  const {
    items,
    searchFields,
    filterFunctions = {},
    debounceMs = 300,
    caseSensitive = false
  } = options;

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const debouncedQuery = useDebounce(query, debounceMs);

  // Search function
  const searchItems = useCallback((items: T[], searchQuery: string): T[] => {
    if (!searchQuery.trim()) return items;

    const normalizedQuery = caseSensitive ? searchQuery : searchQuery.toLowerCase();

    return items.filter(item => {
      return searchFields.some(field => {
        const fieldValue = item[field];
        if (fieldValue == null) return false;

        const stringValue = String(fieldValue);
        const normalizedValue = caseSensitive ? stringValue : stringValue.toLowerCase();

        return normalizedValue.includes(normalizedQuery);
      });
    });
  }, [searchFields, caseSensitive]);

  // Filter function
  const filterItems = useCallback((items: T[], activeFilters: Record<string, any>): T[] => {
    return items.filter(item => {
      return Object.entries(activeFilters).every(([filterKey, filterValue]) => {
        if (filterValue == null || filterValue === '' || 
            (Array.isArray(filterValue) && filterValue.length === 0)) {
          return true;
        }

        const filterFunction = filterFunctions[filterKey];
        if (filterFunction) {
          return filterFunction(item, filterValue);
        }

        // Default filtering logic
        const itemValue = item[filterKey as keyof T];
        
        if (Array.isArray(filterValue)) {
          return filterValue.includes(itemValue);
        }
        
        return itemValue === filterValue;
      });
    });
  }, [filterFunctions]);

  // Sort function
  const sortItems = useCallback((items: T[], sortField: keyof T | null, order: 'asc' | 'desc'): T[] => {
    if (!sortField) return items;

    return [...items].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return order === 'asc' ? 1 : -1;
      if (bValue == null) return order === 'asc' ? -1 : 1;

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return order === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        const comparison = aValue.getTime() - bValue.getTime();
        return order === 'asc' ? comparison : -comparison;
      }

      // Fallback to string comparison
      const aString = String(aValue);
      const bString = String(bValue);
      const comparison = aString.localeCompare(bString);
      return order === 'asc' ? comparison : -comparison;
    });
  }, []);

  // Processed results
  const results = useMemo(() => {
    let processedItems = [...items];

    // Apply search
    processedItems = searchItems(processedItems, debouncedQuery);

    // Apply filters
    processedItems = filterItems(processedItems, filters);

    // Apply sorting
    processedItems = sortItems(processedItems, sortBy, sortOrder);

    return processedItems;
  }, [items, debouncedQuery, filters, sortBy, sortOrder, searchItems, filterItems, sortItems]);

  // Update search query
  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  // Update filters
  const updateFilter = useCallback((filterKey: string, filterValue: any) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: filterValue
    }));
  }, []);

  // Remove filter
  const removeFilter = useCallback((filterKey: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterKey];
      return newFilters;
    });
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Update sorting
  const updateSort = useCallback((field: keyof T, order?: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(order || (sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc'));
  }, [sortBy, sortOrder]);

  // Clear sorting
  const clearSort = useCallback(() => {
    setSortBy(null);
    setSortOrder('asc');
  }, []);

  // Reset all search state
  const reset = useCallback(() => {
    setQuery('');
    setFilters({});
    setSortBy(null);
    setSortOrder('asc');
  }, []);

  // Get search statistics
  const stats = useMemo(() => {
    return {
      totalItems: items.length,
      filteredItems: results.length,
      hasQuery: Boolean(debouncedQuery.trim()),
      hasFilters: Object.keys(filters).length > 0,
      hasSorting: Boolean(sortBy),
      isFiltered: results.length !== items.length
    };
  }, [items.length, results.length, debouncedQuery, filters, sortBy]);

  // Get active filters summary
  const activeFilters = useMemo(() => {
    return Object.entries(filters)
      .filter(([_, value]) => value != null && value !== '' && 
              (!Array.isArray(value) || value.length > 0))
      .map(([key, value]) => ({ key, value }));
  }, [filters]);

  return {
    // Current state
    query,
    debouncedQuery,
    filters,
    sortBy,
    sortOrder,
    results,
    stats,
    activeFilters,

    // Actions
    updateQuery,
    updateFilter,
    removeFilter,
    clearFilters,
    updateSort,
    clearSort,
    reset,

    // Utilities
    searchItems,
    filterItems,
    sortItems
  };
}